import inherits from 'inherits';

import {
  isObject,
  assign,
  forEach
} from 'min-dash';

import BaseRenderer from 'diagram-js/lib/draw/BaseRenderer';

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
  query as domQuery, domify
} from 'min-dom';

import {
  append as svgAppend,
  remove as svgRemove,
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

var STATUS_STROKE_THICK = 5;
var STATUS_STROKE_COLOR_ERROR = '#ff666666';
var STATUS_STROKE_COLOR_WARNING = '#cccc3366';
var STATUS_STROKE_COLOR_READY = '#33cc3399';
var STATUS_STROKE_COLOR_FIRED = '#ff3333'; // '#ff33cc99';

var STATUS_TEXT_COLOR_ERROR = '#ff6666';
var STATUS_TEXT_COLOR_WARNING = '#cccc33';
var STATUS_TEXT_COLOR_READY = '#339933';
var STATUS_TEXT_COLOR_FIRED = '#ff6666'; // '#CC0099';

var SELECT_STROKE_COLOR = '#00cc00';
var SELECT_FILL_COLOR = '#00ff0011';
var SELECT_STROKE_THICK = 3;

var DEFAULT_LABEL_FILL_COLOR = '#ebebeb00';

var PORT_FILL_COLOR = '#e0e0fd';
var PORT_STROKE_COLOR = '#4c66cc';

var TOKEN_FILL_COLOR = '#00dd00'; // '#6fe117';
var MARKING_FILL_COLOR = '#99ff99'; // '#bcfd8b';

var TOKEN_BALL_FILL_COLOR = '#ff3333'; // '#00dd00';
var TOKEN_BALL_RADIUS = 9;

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

  this._eventBus = eventBus;
  this._stateProvider = stateProvider;
  this._canvas = canvas;

  const self = this;

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

  /**
   * Add CPN status shadow to svg element
   *
   * @param {*} element
   * @param {*} svgElement
   */
  function drawCpnStatus_Blured(element, svgElement) {
    if (element.cpnElement) {
      if (self._stateProvider.getReadyState(element.cpnElement._id)) {
        svgAttr(svgElement, { filter: shadow('shape', STATUS_STROKE_COLOR_READY), });
      }
      if (self._stateProvider.getWarningState(element.cpnElement._id)) {
        svgAttr(svgElement, { filter: shadow('shape', STATUS_STROKE_COLOR_WARNING), });
      }
      if (self._stateProvider.getErrorState(element.cpnElement._id)) {
        svgAttr(svgElement, { filter: shadow('shape', STATUS_STROKE_COLOR_ERROR), });
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

    // Draw element
    let ellipse = svgCreate('ellipse');
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
    // drawCpnStatus(element, ellipse);

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

    // Draw selected state
    drawSelectedStatus(parentGfx, element);

    // Draw cpn status (error, warning, ready)
    drawCpnStatus(parentGfx, element, 'ellipse');

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
    // drawCpnStatus_Blured(element, rect);

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

    // Draw selected state
    drawSelectedStatus(parentGfx, element);

    // Draw cpn status (error, warning, ready)
    drawCpnStatus(parentGfx, element, 'rect');

    return rect;
  }

  function drawSelectedStatus(parentGfx, element) {
    if (element.selected) {
      var box = getBox(element);

      const cx = parseFloat(box.width / 2);
      const cy = parseFloat(box.height / 2);

      const d = 16;

      const sel = svgCreate('rect');
      svgAttr(sel, {
        x: -d / 2,
        y: -d / 2,
        width: cx * 2 + d,
        height: cy * 2 + d
      });
      svgAttr(sel, {
        fill: SELECT_FILL_COLOR,
        stroke: SELECT_STROKE_COLOR,
        strokeWidth: SELECT_STROKE_THICK,
        strokeDasharray: "2,2"
      });
      svgAppend(parentGfx, sel);
    }
  }

  function drawCpnStatus(parentGfx, element, type) {
    const strokeWidth = getStrokeWidth(element) + 1;
    var box = getBox(element);
    const cx = parseFloat(box.width / 2);
    const cy = parseFloat(box.height / 2);
    var strokeColor = undefined;
    var textColor = undefined;

    if (element.cpnElement) {
      const readyState = self._stateProvider.getReadyState(element.cpnElement._id);
      const firedState = self._stateProvider.getFiredState(element.cpnElement._id);
      const warningState = self._stateProvider.getWarningState(element.cpnElement._id);
      const errorState = self._stateProvider.getErrorState(element.cpnElement._id);
      let stateText;
      if (readyState) {
        strokeColor = STATUS_STROKE_COLOR_READY;
        textColor = STATUS_TEXT_COLOR_READY;
        stateText = self._stateProvider.getReadyText(element.cpnElement._id);;
      }
      if (firedState) {
        strokeColor = STATUS_STROKE_COLOR_FIRED;
        textColor = STATUS_TEXT_COLOR_FIRED;
        stateText = self._stateProvider.getFiredText(element.cpnElement._id);;
      }
      if (warningState) {
        strokeColor = STATUS_STROKE_COLOR_WARNING;
        textColor = STATUS_TEXT_COLOR_WARNING;
        stateText = self._stateProvider.getWarningText(element.cpnElement._id);;
      }
      if (errorState) {
        strokeColor = STATUS_STROKE_COLOR_ERROR;
        textColor = STATUS_TEXT_COLOR_ERROR;
        stateText = self._stateProvider.getErrorText(element.cpnElement._id);;
      }

      if (strokeColor) {
        switch (type) {
          case 'rect': {
            var rect = svgCreate('rect');
            const b = {
              x: -(STATUS_STROKE_THICK + strokeWidth) / 2,
              y: -(STATUS_STROKE_THICK + strokeWidth) / 2,
              width: box.width + (STATUS_STROKE_THICK + strokeWidth),
              height: box.height + (STATUS_STROKE_THICK + strokeWidth)
            };

            svgAttr(rect, b);
            svgAttr(rect, {
              fill: 'transparent',
              stroke: strokeColor,
              strokeWidth: STATUS_STROKE_THICK
            });
            svgAppend(parentGfx, rect);
          } break;

          case 'ellipse': {
            let ellipse = svgCreate('ellipse');
            const b = {
              cx: cx,
              cy: cy,
              rx: cx + (strokeWidth + STATUS_STROKE_THICK) / 2,
              ry: cy + (strokeWidth + STATUS_STROKE_THICK) / 2
            };
            svgAttr(ellipse, b);

            svgAttr(ellipse, {
              fill: 'transparent',
              stroke: strokeColor,
              strokeWidth: STATUS_STROKE_THICK
            });
            svgAppend(parentGfx, ellipse);
          } break;

          case 'connection': {
            var pathData = self.createPathFromConnection(element);
            var attrs = {
              stroke: strokeColor,
              strokeWidth: getStrokeWidth(element) + (3 * STATUS_STROKE_THICK / 2),
            };
            // connection end markers
            drawPath(parentGfx, pathData, attrs);
            console.log('drawCpnStatus(), element = ', element);
            console.log('drawCpnStatus(), pathData = ', pathData);

            if (element.waypoints) {
              const p1 = element.waypoints[0];
              const p2 = element.waypoints[element.waypoints.length - 1];

              var text = svgCreate('text');
              svgAttr(text, {
                fill: textColor,
                // x: p1.x + (p2.x - p1.x) / 2 + 5,
                // y: p1.y + (p2.y - p1.y) / 2 + 15
                x: p1.x + 5,
                y: p1.y + 15
              });
              text.textContent = stateText;
              svgAppend(parentGfx, text);
            }

          } break;

        }

        if (['rect', 'ellipse'].includes(type)) {
          if (stateText) {
            var text = svgCreate('text');
            svgAttr(text, {
              fill: textColor,
              // stroke: textColor,
              x: - STATUS_STROKE_THICK,
              y: box.height + STATUS_STROKE_THICK * 2 + 10
            });
            text.textContent = stateText;
            svgAppend(parentGfx, text);
          }
        }

      }

    }

  }

  function drawArc(parentGfx, element) {
    var pathData = self.createPathFromConnection(element);
    var strokeColor = getStrokeColor(element);

    var attrs = {
      stroke: strokeColor,
      strokeWidth: getStrokeWidth(element)
    };

    // connection end markers
    attrs = assign(attrs, getConnectionEndMarkerAttrs(element));

    // spn status
    drawCpnStatus(parentGfx, element, 'connection');

    const path = drawPath(parentGfx, pathData, attrs);

    // token animation
    // drawArcAnimation(element);

    return path;
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
    var path = drawArc(parentGfx, element);
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

/**
 * Animate token movement for element (connection)
 */
CpnRenderer.prototype.drawArcAnimation = function (element, speedMs = 500) {

  const renderer = this;

  return new Promise(function (resolve, reject) {

    try {
      console.log('TEST ANIMATION, element = ', element);

      const viewbox = renderer._canvas.viewbox();
      const zoom = renderer._canvas.zoom();

      const offset = { x: viewbox.x * -1, y: viewbox.y * -1, }

      let pathValue = renderer.createPathFromConnection(element, offset);

      // console.log('TEST ANIMATION, viewbox = ', viewbox);
      // console.log('TEST ANIMATION, zoom = ', zoom);
      // console.log('TEST ANIMATION, path = ', path);
      // console.log('TEST ANIMATION, pathValue = ', pathValue);

      const container = renderer._canvas._svg;

      // reset animation time
      container.setCurrentTime(0);

      if (container) {
        let tokenG = domQuery('#tokenG', container);
        if (tokenG) {
          svgRemove(tokenG);
        }

        tokenG = svgCreate('g');
        svgAttr(tokenG, {
          id: 'tokenG',
          transform: 'scale(' + zoom + ', ' + zoom + ')',
          visibility: 'hidden'
        });

        const tokenGA = svgCreate('g');

        // const tokenBallShadow = svgCreate('circle');
        // svgAttr(tokenBallShadow, { r: TOKEN_BALL_RADIUS, fill: 'gray', cx: 1, cy: 1 });

        const tokenBall = svgCreate('circle');
        svgAttr(tokenBall, { r: TOKEN_BALL_RADIUS, fill: TOKEN_BALL_FILL_COLOR, cx: 0, cy: 0 });

        const tokenAnimation = svgCreate('animateMotion');
        svgAttr(tokenAnimation, {
          dur: (speedMs + 20) + 'ms',
          begin: '0s',
          repeatCount: 1,
          path: pathValue,
        });

        // svgAppend(tokenGA, tokenBallShadow);
        svgAppend(tokenGA, tokenBall);
        svgAppend(tokenGA, tokenAnimation);
        svgAppend(tokenG, tokenGA);
        svgAppend(container, tokenG);

        setTimeout(() => {
          svgAttr(tokenG, {
            visibility: 'visible'
          });
        }, 0);

        setTimeout(() => {
          svgRemove(tokenG);
          resolve();
        }, speedMs);
      }
    } catch (ex) {
      console.error('CpnRenderer.prototype.drawArcAnimation(), ex = ', ex);
      reject(ex);
    }
  });
}

CpnRenderer.prototype.createPathFromConnection = function (connection, offset = { x: 0, y: 0 }) {
  let waypoints = connection.waypoints;

  let D = 15;

  let prevPoint = waypoints[0];
  let pathData = 'm ' + (waypoints[0].x + offset.x) + ',' + (waypoints[0].y + offset.y);
  let prevWp;

  for (let i = 1; i < waypoints.length; i++) {

    // just draw line
    // pathData += 'L' + waypoints[i].x + ',' + waypoints[i].y + ' ';

    // draw spline angles
    let dx = waypoints[i].x - prevPoint.x;
    let dy = waypoints[i].y - prevPoint.y;
    let d = Math.sqrt(dx * dx + dy * dy);
    let DD = Math.min(D, d);

    let wp = { x: (prevPoint.x + DD * dx / d), y: (prevPoint.y + DD * dy / d) };

    if (prevWp) {
      pathData +=
        'Q' + (prevPoint.x + offset.x) + ' ' + (prevPoint.y + offset.y) +
        ', ' + (wp.x + offset.x) + ' ' + (wp.y + offset.y) + ' ';
    }

    let wp2 = waypoints[i];
    if (i < waypoints.length - 1) {
      wp2 = { x: (prevPoint.x + dx - DD * dx / d), y: (prevPoint.y + dy - DD * dy / d) };
    }

    pathData += 'L' + (wp2.x + offset.x) + ',' + (wp2.y + offset.y) + ' ';

    prevPoint = waypoints[i];
    prevWp = wp;
  }

  return pathData;
}
