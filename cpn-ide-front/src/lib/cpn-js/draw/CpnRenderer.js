import inherits from 'inherits';

import {
  isObject,
  assign,
  forEach
} from 'min-dash';

import BaseRenderer from 'diagram-js/lib/draw/BaseRenderer';
import {
  createLine
} from 'diagram-js/lib/util/RenderUtil';

import {
  CPN_PLACE,
  CPN_TRANSITION,
  CPN_LABEL,
  CPN_TOKEN_LABEL,
  CPN_MARKING_LABEL,
  CPN_CONNECTION,
  CPN_TEXT_ANNOTATION,
  is,
  isCpn,
  isCpnPortOrSubst,
  getText
} from '../util/ModelUtil';

import {
  query as domQuery
} from 'min-dom';

import {
  append as svgAppend,
  attr as svgAttr,
  create as svgCreate,
  classes as svgClasses
} from 'tiny-svg';

import {
  rotate,
  transform,
  translate
} from 'diagram-js/lib/util/SvgTransformUtil';

import Ids from 'ids';

import {
  getEllipsePath,
  getRectPath,
  getFillColor,
  getStrokeColor,
  getStrokeWidth, getBox
} from './CpnRenderUtil';


var RENDERER_IDS = new Ids();

var ERROR_STROKE_COLOR = '#ff999966';
var ERROR_STROKE_THICK = 5;

var DEFAULT_LABEL_FILL_COLOR = '#ebebeb99';

var PORT_FILL_COLOR = '#e0e0fd';
var PORT_STROKE_COLOR = '#4c66cc';

var TOKEN_FILL_COLOR = '#6fe117';
var MARKING_FILL_COLOR = '#bcfd8b';

var ERROR_FILL_COLOR = '#cc0000';
var PROCESS_FILL_COLOR = '#999900';
var READY_FILL_COLOR = '#009900';

inherits(CpnRenderer, BaseRenderer);

CpnRenderer.$inject = [
  'config.cpnRenderer',
  'eventBus',
  'styles',
  'pathMap',
  'canvas',
  'textRenderer',
  'stateProvider'
];

export default function CpnRenderer(
  config, eventBus, styles, pathMap,
  canvas, textRenderer, stateProvider, priority) {

  BaseRenderer.call(this, eventBus, priority);

  var rendererId = RENDERER_IDS.next();

  var markers = {};
  var shadows = {};

  var computeStyle = styles.computeStyle;

  // ------------------------------------------------------------
  // shadows
  // ------------------------------------------------------------
  function shadow(type, fill) {
    var id = 'shadow-' + type + '-' + fill + '-' + rendererId;

    if (!shadows[id]) {
      if (type === 'blur')
        shadows[id] = createBlur(type, id);
      else
        shadows[id] = createShadow(type, id, fill);
    }

    return 'url(#' + id + ')';
  }

  function createShadow(type, id, fill) {
    var filter = svgCreate('filter');

    if (type === 'connection') {
      svgAttr(filter, {
        id: id,
        x: 0,
        y: 0,
        width: '200px',
        height: '200px'
      });
    } else {
      svgAttr(filter, {
        id: id,
        x: -0.3,
        y: -0.3,
        width: '200%',
        height: '200%'
      });
    }

    var feDropShadow = svgCreate('feDropShadow');
    svgAttr(feDropShadow, {
      dx: 0,
      dy: 0,
      stdDeviation: 5,
      'flood-color': fill,
      'flood-opacity': 1
    });
    svgAppend(filter, feDropShadow);

    var defs = domQuery('defs', canvas._svg);
    if (!defs) {
      defs = svgCreate('defs');
      svgAppend(canvas._svg, defs);
    }
    svgAppend(defs, filter);

    return filter;
  }

  function createBlur(type, id) {
    var filter = svgCreate('filter');

    svgAttr(filter, {
      id: id,
      x: -0.3,
      y: -0.3,
      width: '200%',
      height: '200%'
    });

    var feGaussianBlur = svgCreate('feGaussianBlur');
    svgAttr(feGaussianBlur, { stdDeviation: 1 });
    svgAppend(filter, feGaussianBlur);

    var defs = domQuery('defs', canvas._svg);
    if (!defs) {
      defs = svgCreate('defs');
      svgAppend(canvas._svg, defs);
    }
    svgAppend(defs, filter);

    return filter;
  }


  // ------------------------------------------------------------
  // markers
  // ------------------------------------------------------------

  function addMarker(id, options) {
    var attrs = assign({
      fill: 'black',
      strokeWidth: 1,
      strokeLinecap: 'round',
      strokeDasharray: 'none'
    }, options.attrs);

    var ref = options.ref || { x: 0, y: 0 };

    var scale = options.scale || 1;

    // fix for safari / chrome / firefox bug not correctly
    // resetting stroke dash array
    if (attrs.strokeDasharray === 'none') {
      attrs.strokeDasharray = [10000, 1];
    }

    var marker = svgCreate('marker');

    svgAttr(options.element, attrs);

    svgAppend(marker, options.element);

    svgAttr(marker, {
      id: id,
      viewBox: '0 0 20 20',
      refX: ref.x,
      refY: ref.y,
      markerWidth: 20 * scale,
      markerHeight: 20 * scale,
      orient: 'auto'
    });

    var defs = domQuery('defs', canvas._svg);

    if (!defs) {
      defs = svgCreate('defs');

      svgAppend(canvas._svg, defs);
    }

    svgAppend(defs, marker);

    markers[id] = marker;
  }

  function marker(type, fill, stroke, strokeWidth) {
    var id = type + '-' + fill + '-' + stroke + '-' + strokeWidth + '-' + rendererId;

    if (!markers[id]) {
      createMarker(id, type, fill, stroke, strokeWidth);
    }

    return 'url(#' + id + ')';
  }

  function createMarker(id, type, fill, stroke, strokeWidth) {
    if (type === 'connection-end') {
      var sequenceflowEnd = svgCreate('path');
      // svgAttr(sequenceflowEnd, { d: 'M 1 5 L 11 10 L 1 15 Z' });
      svgAttr(sequenceflowEnd, { d: 'M 11 5 L 1 9 L 3 5 L 1 1 Z' });

      var scale = 1.0;

      if (strokeWidth > 2) {
        scale = scale / strokeWidth * (strokeWidth - 2);
      } else if (strokeWidth > 1) {
        scale = scale / strokeWidth;
      }

      addMarker(id, {
        element: sequenceflowEnd,
        // ref: { x: 11, y: 10 },
        ref: { x: 11, y: 5 },
        scale: scale,
        attrs: {
          fill: stroke,
          stroke: stroke
        }
      });
    }

    if (type === 'connection-start') {
      var sequenceflowEnd = svgCreate('path');
      svgAttr(sequenceflowEnd, { d: 'M 1 5 L 11 9 L 9 5 L 11 1 Z' });

      addMarker(id, {
        element: sequenceflowEnd,
        ref: { x: 0, y: 5 },
        scale: scale,
        attrs: {
          fill: stroke,
          stroke: stroke
        }
      });
    }

  }

  function drawRect(parentGfx, width, height, r, offset, attrs) {

    if (isObject(offset)) {
      attrs = offset;
      offset = 0;
    }

    offset = offset || 0;

    attrs = computeStyle(attrs, {
      stroke: 'black',
      strokeWidth: 2,
      fill: 'white'
    });

    if (attrs.iserror) {
      var rect2 = svgCreate('rect');
      svgAttr(rect2, {
        x: offset,
        y: offset,
        width: width - offset * 2,
        height: height - offset * 2,
        rx: r,
        ry: r
      });
      var attrs2 = {
        stroke: '#ff9999',
        strokeWidth: 8
      };
      svgAttr(rect2, attrs2);

      svgAppend(parentGfx, rect2);

    }

    var rect = svgCreate('rect');
    svgAttr(rect, {
      x: offset,
      y: offset,
      width: width - offset * 2,
      height: height - offset * 2,
      rx: r,
      ry: r
    });
    svgAttr(rect, attrs);

    svgAppend(parentGfx, rect);


    return rect;
  }

  function drawPath(parentGfx, d, attrs) {
    // attrs = computeStyle(attrs, ['no-fill'], {
    //   strokeWidth: 2,
    //   stroke: 'black'
    // });

    var path = svgCreate('path');
    svgAttr(path, { d: d });
    svgAttr(path, attrs);

    svgAppend(parentGfx, path);

    return path;
  }

  function drawMarker(type, parentGfx, path, attrs) {
    return drawPath(parentGfx, path, assign({ 'data-marker': type }, attrs));
  }

  function as(type) {
    return function (parentGfx, element) {
      return handlers[type](parentGfx, element);
    };
  }

  function renderer(type) {
    return handlers[type];
  }

  function renderLabel(parentGfx, element, attrs) {

    var defaultLabel = true;

    // render port label frame
    // ---------------------------------------------
    if (isCpnPortOrSubst(element)) {
      defaultLabel = false;

      var rect = svgCreate('rect');
      svgAttr(rect, {
        x: -3,
        y: 0,
        width: attrs.box.width + 5,
        height: attrs.box.height - 1,
        fill: PORT_FILL_COLOR,
        stroke: PORT_STROKE_COLOR,
        strokeWidth: 1,
      });
      // console.log('renderLabel(), rect = ', rect);
      svgAppend(parentGfx, rect);

      attrs.style.fill = PORT_STROKE_COLOR;
    }

    // render token label frame
    // ---------------------------------------------
    if (is(element, CPN_TOKEN_LABEL)) {
      defaultLabel = false;

      var rectAttrs = {
        x: -6, y: -3,
        width: attrs.box.width + 9, height: attrs.box.height + 5,
        rx: 9, ry: 9,
      };

      var rect = svgCreate('rect');
      svgAttr(rect, assign({}, rectAttrs, { x: rectAttrs.x + 1, y: rectAttrs.y + 1, fill: 'grey' }));
      svgAppend(parentGfx, rect);

      rect = svgCreate('rect');
      svgAttr(rect, assign({}, rectAttrs, { fill: TOKEN_FILL_COLOR }));
      svgAppend(parentGfx, rect);

      attrs.style.fill = 'black';
    }

    // render marking label frame
    // ---------------------------------------------
    if (is(element, CPN_MARKING_LABEL)) {
      defaultLabel = false;

      var rectAttrs = {
        x: -6, y: -3,
        width: attrs.box.width + 10, height: attrs.box.height + 5,
      };

      var rect = svgCreate('rect');
      svgAttr(rect, assign({}, rectAttrs, { x: rectAttrs.x + 1, y: rectAttrs.y + 1, fill: 'grey' }));
      svgAppend(parentGfx, rect);

      rect = svgCreate('rect');
      svgAttr(rect, assign({}, rectAttrs, { fill: MARKING_FILL_COLOR }));
      svgAppend(parentGfx, rect);

      attrs.style.fill = 'black';
    }

    if (defaultLabel && attrs.external) {
      var rect = svgCreate('rect');
      svgAttr(rect, {
        x: 0,
        y: 0,
        width: attrs.box.width - 2,
        height: attrs.box.height - 1,
        fill: DEFAULT_LABEL_FILL_COLOR,
      });
      svgAppend(parentGfx, rect);
    }


    var text = textRenderer.createText(getText(element) || '', attrs);
    svgClasses(text).add('djs-label');
    svgAppend(parentGfx, text);

    return text;
  }

  function renderEmbeddedLabel(parentGfx, element) {
    const attrs = {
      box: element,
      align: 'center-middle',
      // padding: 5,
      style: {
        fill: getStrokeColor(element)
      }
    };
    return renderLabel(parentGfx, element, attrs);
  }

  function renderExternalLabel(parentGfx, element) {
    return renderLabel(parentGfx, element, {
      box: element,
      align: 'left-top',
      // padding: 5,
      style: {
        fill: getStrokeColor(element.labelTarget || element)
      },
      external: true,
    });
  }

  // function renderCpnLabel(parentGfx, element) {
  //   var box = {
  //     x: element.x,
  //     y: element.y,
  //     width: element.width,
  //     height: element.height
  //   };
  //
  //   var options = {
  //     box: box,
  //     fitBox: true,
  //     align: 'center-middle',
  //     style: assign(
  //       {},
  //       textRenderer.getExternalStyle(),
  //       {
  //         fill: getStrokeColor(element)
  //       }
  //     )
  //   };
  //
  //   options = assign({
  //     size: {
  //       width: box.width,
  //       height: box.height
  //     }
  //   }, options);
  //
  //   var text = textRenderer.createText(element.text || '', options);
  //
  //   svgClasses(text).add('djs-label');
  //   svgAppend(parentGfx, text);
  //
  //   return text;
  //
  // }

  function createPathFromConnection(connection) {
    let waypoints = connection.waypoints;

    let D = 15;

    let prevPoint = waypoints[0];
    let pathData = 'm  ' + waypoints[0].x + ',' + waypoints[0].y;
    let prevWp;

    for (let i = 1; i < waypoints.length; i++) {

        // just draw line
        // pathData += 'L' + waypoints[i].x + ',' + waypoints[i].y + ' ';

        // draw spline angles
        let dx = waypoints[i].x - prevPoint.x;
        let dy = waypoints[i].y - prevPoint.y;
        let d = Math.sqrt(dx * dx + dy * dy);

        let wp = { x: (prevPoint.x + D * dx / d), y: (prevPoint.y + D * dy / d) };

        if (prevWp) {
          pathData += 'Q' + prevPoint.x + ' ' + prevPoint.y + ', ' + wp.x + ' ' + wp.y + ' ';
        }

        let wp2 = waypoints[i];
        if (i < waypoints.length - 1) {
          wp2 = { x: (prevPoint.x + dx - D * dx / d), y: (prevPoint.y + dy - D * dy / d) };
        }

        pathData += 'L' + wp2.x + ',' + wp2.y + ' ';

        prevPoint = waypoints[i];
        prevWp = wp;

    }

    return pathData;
  }

  /**
   * Add CPN status shadow to svg element
   *
   * @param {*} element
   * @param {*} svgElement
   */
  function setCpnStatus(element, svgElement) {
    if (element.cpnStatus) {
      if (element.cpnStatus === 'process') {
        svgAttr(svgElement, { filter: shadow('shape', PROCESS_FILL_COLOR), });
      }
      if (element.cpnStatus === 'error') {
        svgAttr(svgElement, { filter: shadow('shape', ERROR_FILL_COLOR), });
      }
      if (element.cpnStatus === 'ready') {
        svgAttr(svgElement, { filter: shadow('shape', READY_FILL_COLOR), });
      }
    }
  }

  /**
   * Draw CPN place element
   *
   * @param {*} parentGfx - parent svg graphics element
   * @param {*} element - place element
   */
  function drawPlace(parentGfx, textRenderer, element) {
    var box = getBox(element);

    const cx = parseFloat(box.width / 2);
    const cy = parseFloat(box.height / 2);

    const strokeWidth = getStrokeWidth(element) + 1;

    // Draw error state
    var isError = element.iserror;
    // isError = true;

    // if (isError) {
    //   var ellipse = svgCreate('ellipse');
    //   svgAttr(ellipse, {
    //     cx: cx,
    //     cy: cy,
    //     rx: cx + ERROR_STROKE_THICK / 2 + strokeWidth / 2,
    //     ry: cy + ERROR_STROKE_THICK / 2 + strokeWidth / 2
    //   });
    //   svgAttr(ellipse, {
    //     fill: 'transparent',
    //     stroke: ERROR_STROKE_COLOR,
    //     strokeWidth: ERROR_STROKE_THICK
    //   });
    //   svgAppend(parentGfx, ellipse);
    // }

    // Draw element
    var ellipse = svgCreate('ellipse');
    svgAttr(ellipse, {
      cx: cx,
      cy: cy,
      rx: cx,
      ry: cy
    });
    svgAttr(ellipse, {
      fill: getFillColor(element),
      stroke: getStrokeColor(element),
      strokeWidth: strokeWidth,
    });

    // Add CPN status shadow
    setCpnStatus(element, ellipse);

    svgAppend(parentGfx, ellipse);

    // Draw subst frame
    if (element.cpnElement && element.cpnElement.port && element.cpnElement.port._id) {
      ellipse = svgCreate('ellipse');
      svgAttr(ellipse, {
        cx: cx,
        cy: cy,
        rx: cx - strokeWidth * 2,
        ry: cy - strokeWidth * 2
      });
      svgAttr(ellipse, {
        fill: 'transparent',
        stroke: getStrokeColor(element),
        strokeWidth: strokeWidth,
      });
      svgAppend(parentGfx, ellipse);
    }

    return ellipse;
  }


  /**
   * Draw CPN transition element
   *
   * @param {*} parentGfx - parent svg graphics element
   * @param {*} element - transition element
   */
  function drawTransition(parentGfx, textRenderer, element) {
    // console.log('drawTransition(), element = ', element);
    var box = getBox(element);

    const strokeWidth = getStrokeWidth(element) + 1;

    // Draw error state
    var isError = element.iserror;
    // isError = true;

    // if (isError) {
    //   var rect = svgCreate('rect');
    //   const b = {
    //     x: -(ERROR_STROKE_THICK + strokeWidth) / 2,
    //     y: -(ERROR_STROKE_THICK + strokeWidth) / 2,
    //     width: box.width + (ERROR_STROKE_THICK + strokeWidth),
    //     height: box.height + (ERROR_STROKE_THICK + strokeWidth)
    //   };
    //   console.log('drawTransition(), error, strokeWidth = ', strokeWidth);
    //   console.log('drawTransition(), error, ERROR_STROKE_THICK + strokeWidth = ', ERROR_STROKE_THICK + strokeWidth);
    //   console.log('drawTransition(), error, box = ', box);
    //   console.log('drawTransition(), error, b = ', b);

    //   svgAttr(rect, b);
    //   svgAttr(rect, {
    //     fill: 'transparent',
    //     stroke: ERROR_STROKE_COLOR,
    //     strokeWidth: ERROR_STROKE_THICK
    //   });
    //   svgAppend(parentGfx, rect);
    // }

    // Draw element
    var rect = svgCreate('rect');
    svgAttr(rect, {
      x: 0,
      y: 0,
      width: box.width,
      height: box.height
    });
    svgAttr(rect, {
      fill: getFillColor(element),
      stroke: getStrokeColor(element),
      strokeWidth: strokeWidth,
    });

    // Add CPN status shadow
    setCpnStatus(element, rect);

    svgAppend(parentGfx, rect);

    // Draw subst frame
    if (element.cpnElement && element.cpnElement.subst && element.cpnElement.subst._subpage) {
      rect = svgCreate('rect');
      svgAttr(rect, {
        x: strokeWidth * 2,
        y: strokeWidth * 2,
        width: box.width - strokeWidth * 4,
        height: box.height - strokeWidth * 4
      });
      svgAttr(rect, {
        fill: 'transparent',
        stroke: getStrokeColor(element),
        strokeWidth: strokeWidth,
      });
      svgAppend(parentGfx, rect);
    }

    return rect;
  }


  function drawArc(parentGfx, element, d) {
    // console.log('drawArc(), element = ', element);

    var endMrker = drawEndMarker(parentGfx);

    var path = svgCreate('path');
    svgAttr(path, {
      d: d,
      'marker-start': 'url(#startMarker)',
      'marker-end': 'url(#endMarker)'
    });
    svgAttr(path, {
      stroke: getStrokeColor(element),
      strokeWidth: getStrokeWidth(element),
    });
    svgAppend(parentGfx, path);

    // drawMarker(parentGfx, element);

    return path;
  }

  function drawEndMarker(parentGfx) {
    var marker = svgCreate('marker');
    svgAttr(marker, {
      id: 'endMarker',
      orient: 'auto',
      refX: 15,
      refY: 5,
      markerWidth: 15,
      markerHeight: 10,
    });
    // marker path
    var path = svgCreate('path');
    svgAttr(path, {
      d: 'M0,0 L2,5 L0,10 L15,5 Z',
      fill: 'black'
    });
    svgAppend(marker, path);
    // -----------------------------
    svgAppend(parentGfx, marker);

    return marker;
  }


  /**
   * Draw borttom text label
   *
   * @param {*} parentGfx - parent svg graphics element
   * @param {*} s - text
   * @param {*} parentRect - parent element rectangle
   */
  function drawBottomTextLabel(parentGfx, textRenderer, s, parentRect) {
    const textDim = textRenderer.getTextUtil().getDimensions(s, {});
    textDim.width += 5;
    textDim.height += 1;

    var rect = svgCreate('rect');
    svgAttr(rect, {
      x: parentRect.width / 2 - textDim.width / 2,
      y: parentRect.height - textDim.height / 2,
      width: textDim.width,
      height: textDim.height
    });
    svgAttr(rect, {
      fill: '#ffc',
      stroke: '#000',
      strokeWidth: 1
    });
    svgAppend(parentGfx, rect);

    var text = svgCreate('text');
    svgAttr(text, {
      x: parentRect.width / 2 - textDim.width / 2 + 2.5,
      y: parentRect.height + 4
    });
    text.textContent = s;
    svgAppend(parentGfx, text);
  }


  function getConnectionEndMarkerAttrs(element) {
    var attrs = {};

    var fill = getFillColor(element),
      strokeColor = getStrokeColor(element),
      strokeWidth = getStrokeWidth(element);

    if (element.cpnElement && element.cpnElement._orientation) {

      if (element.cpnElement._orientation === 'PtoT') {
        if (is(element.source, CPN_PLACE)) {
          attrs = assign(attrs, {
            markerEnd: marker('connection-end', fill, strokeColor, strokeWidth),
          });
        } else {
          attrs = assign(attrs, {
            markerStart: marker('connection-start', fill, strokeColor, strokeWidth),
          });
        }
      }

      if (element.cpnElement._orientation === 'TtoP') {
        if (is(element.source, CPN_TRANSITION)) {
          attrs = assign(attrs, {
            markerEnd: marker('connection-end', fill, strokeColor, strokeWidth),
          });
        } else {
          attrs = assign(attrs, {
            markerStart: marker('connection-start', fill, strokeColor, strokeWidth),
          });
        }
      }

      if (element.cpnElement._orientation === 'BOTHDIR') {
        attrs = assign(attrs, {
          markerStart: marker('connection-start', fill, strokeColor, strokeWidth),
          markerEnd: marker('connection-end', fill, strokeColor, strokeWidth),
        });
      }
    }

    return attrs;
  }

  var handlers = this.handlers = [];

  handlers[CPN_PLACE] = function (parentGfx, element) {
    var shape = drawPlace(parentGfx, textRenderer, element);
    renderEmbeddedLabel(parentGfx, element);
    attachTaskMarkers(parentGfx, element);
    return shape;
  };

  handlers[CPN_TRANSITION] = function (parentGfx, element) {
    var shape = drawTransition(parentGfx, textRenderer, element);
    renderEmbeddedLabel(parentGfx, element);
    attachTaskMarkers(parentGfx, element);
    return shape;
  };

  handlers[CPN_CONNECTION] = function (parentGfx, element) {
    var pathData = createPathFromConnection(element);
    // var path = drawArc(parentGfx, element, pathData);
    // return path;

    var pathData = createPathFromConnection(element);

    var fill = getFillColor(element), strokeColor = getStrokeColor(element);

    var attrs = {
      // strokeLinejoin: 'round',
      stroke: strokeColor,
      strokeWidth: getStrokeWidth(element)
    };


    // cpn status
    if (element.cpnStatus) {
      var color;

      if (element.cpnStatus === 'process') {
        color = PROCESS_FILL_COLOR;
      }
      if (element.cpnStatus === 'error') {
        color = ERROR_FILL_COLOR;
      }
      if (element.cpnStatus === 'ready') {
        color = READY_FILL_COLOR;
      }

      if (color) {
        var attrs2 = assign({}, attrs, {
          stroke: color + '33',
          strokeWidth: getStrokeWidth(element) + 8,
          // filter: shadow('blur', ERROR_FILL_COLOR),
        });
        drawPath(parentGfx, pathData, attrs2);
      }
    }

    // connection end markers
    attrs = assign(attrs, getConnectionEndMarkerAttrs(element));

    const path = drawPath(parentGfx, pathData, attrs);

    return path;
  };

  // -------------------------------------------------

  handlers[CPN_LABEL] = function (parentGfx, element) {
    return renderExternalLabel(parentGfx, element);
  };

  handlers[CPN_TOKEN_LABEL] = function (parentGfx, element) {
    return renderExternalLabel(parentGfx, element);
  };

  handlers[CPN_MARKING_LABEL] = function (parentGfx, element) {
    return renderExternalLabel(parentGfx, element);
  };

  handlers[CPN_TEXT_ANNOTATION] = function (parentGfx, element) {
    var style = {
      'fill': 'none',
      'stroke': 'none'
    };

    var textElement = drawRect(parentGfx, element.width, element.height, 0, 0, style);

    var textPathData = pathMap.getScaledPath('TEXT_ANNOTATION', {
      xScaleFactor: 1,
      yScaleFactor: 1,
      containerWidth: element.width,
      containerHeight: element.height,
      position: {
        mx: 0.0,
        my: 0.0
      }
    });

    drawPath(parentGfx, textPathData, {
      stroke: getStrokeColor(element)
    });

    renderLabel(parentGfx, element, {
      box: element,
      align: 'left-top',
      // padding: 5,
      style: {
        fill: getStrokeColor(element)
      }
    });

    return textElement;
  };

  // end handlers definitions

  function attachTaskMarkers(parentGfx, element, taskMarkers) {
    var obj = element;

    var subprocess = taskMarkers && taskMarkers.indexOf('SubProcessMarker') !== -1;
    var position;

    if (subprocess) {
      position = {
        seq: -21,
        parallel: -22,
        compensation: -42,
        loop: -18,
        adhoc: 10
      };
    } else {
      position = {
        seq: -3,
        parallel: -6,
        compensation: -27,
        loop: 0,
        adhoc: 10
      };
    }

    forEach(taskMarkers, function (marker) {
      renderer(marker)(parentGfx, element, position);
    });

    if (obj.isForCompensation) {
      renderer('CompensationMarker')(parentGfx, element, position);
    }

    var loopCharacteristics = obj.loopCharacteristics,
      isSequential = loopCharacteristics && loopCharacteristics.isSequential;

    if (loopCharacteristics) {

      if (isSequential === undefined) {
        renderer('LoopMarker')(parentGfx, element, position);
      }

      if (isSequential === false) {
        renderer('ParallelMarker')(parentGfx, element, position);
      }

      if (isSequential === true) {
        renderer('SequentialMarker')(parentGfx, element, position);
      }
    }
  }

  function renderDataItemCollection(parentGfx, element) {

    var yPosition = (element.height - 16) / element.height;

    var pathData = pathMap.getScaledPath('DATA_OBJECT_COLLECTION_PATH', {
      xScaleFactor: 1,
      yScaleFactor: 1,
      containerWidth: element.width,
      containerHeight: element.height,
      position: {
        mx: 0.451,
        my: yPosition
      }
    });

    /* collection path */
    drawPath(parentGfx, pathData, {
      strokeWidth: 2
    });
  }


  // extension API, use at your own risk
  this._drawPath = drawPath;

}

// Public methods
// ------------------------------------------------------------------

CpnRenderer.prototype.canRender = function (element) {
  return isCpn(element);
  return true;
};

CpnRenderer.prototype.drawShape = function (parentGfx, element) {
  var type = element.type;
  var h = this.handlers[type];
  /* jshint -W040 */
  if (h) {
    return h(parentGfx, element);
  }
  return undefined;
};

CpnRenderer.prototype.drawConnection = function (parentGfx, element) {
  var type = element.type;
  var h = this.handlers[type];
  /* jshint -W040 */
  return h(parentGfx, element);
};

CpnRenderer.prototype.getShapePath = function (element) {
  // console.log('CpnRenderer.prototype.getShapePath(), element = ', element);

  if (is(element, CPN_PLACE))
    return getEllipsePath(element);

  return getRectPath(element);
};
