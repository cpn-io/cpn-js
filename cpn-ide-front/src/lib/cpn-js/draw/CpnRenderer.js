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
  isCpnPortOrSubst
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
  getStrokeWidth, getBox, getText
} from './CpnRenderUtil';


var RENDERER_IDS = new Ids();

var ERROR_STROKE_COLOR = '#ff999966';
var ERROR_STROKE_THICK = 5;

var PORT_FILL_COLOR = '#e0e0fd';
var PORT_STROKE_COLOR = '#4c66cc';

var TOKEN_FILL_COLOR = '#6fe117';
var MARKING_FILL_COLOR = '#bcfd8b';

inherits(CpnRenderer, BaseRenderer);

CpnRenderer.$inject = [
  'config.cpnRenderer',
  'eventBus',
  'styles',
  'pathMap',
  'canvas',
  'textRenderer'
];

export default function CpnRenderer(
  config, eventBus, styles, pathMap,
  canvas, textRenderer, priority) {

  BaseRenderer.call(this, eventBus, priority);

  var rendererId = RENDERER_IDS.next();

  var markers = {};

  var computeStyle = styles.computeStyle;

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

  function marker(type, fill, stroke) {
    var id = type + '-' + fill + '-' + stroke + '-' + rendererId;

    if (!markers[id]) {
      createMarker(type, fill, stroke);
    }

    return 'url(#' + id + ')';
  }

  function createMarker(type, fill, stroke) {
    var id = type + '-' + fill + '-' + stroke + '-' + rendererId;

    if (type === 'connection-end') {
      var sequenceflowEnd = svgCreate('path');
      svgAttr(sequenceflowEnd, { d: 'M 1 5 L 11 10 L 1 15 Z' });

      addMarker(id, {
        element: sequenceflowEnd,
        ref: { x: 11, y: 10 },
        scale: 1.0,
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

    attrs = computeStyle(attrs, ['no-fill'], {
      strokeWidth: 2,
      stroke: 'black'
    });

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

    // render port label frame
    // ---------------------------------------------
    if (isCpnPortOrSubst(element)) {
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


    attrs.box.x += 1;
    attrs.box.y += 1;

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
        fill: getStrokeColor(element)
      }
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
    var waypoints = connection.waypoints;

    var pathData = 'm  ' + waypoints[0].x + ',' + waypoints[0].y;
    for (var i = 1; i < waypoints.length; i++) {
      pathData += 'L' + waypoints[i].x + ',' + waypoints[i].y + ' ';
    }
    return pathData;
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

    const strokeWidth = getStrokeWidth(element);

    // Draw error state
    var isError = element.iserror;
    // isError = true;

    if (isError) {
      var ellipse = svgCreate('ellipse');
      svgAttr(ellipse, {
        cx: cx,
        cy: cy,
        rx: cx + ERROR_STROKE_THICK / 2 + strokeWidth / 2,
        ry: cy + ERROR_STROKE_THICK / 2 + strokeWidth / 2
      });
      svgAttr(ellipse, {
        fill: 'transparent',
        stroke: ERROR_STROKE_COLOR,
        strokeWidth: ERROR_STROKE_THICK
      });
      svgAppend(parentGfx, ellipse);
    }

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
    svgAppend(parentGfx, ellipse);

    // Draw subst frame
    if (element.cpnElement && element.cpnElement.port && element.cpnElement.port._id) {
      ellipse = svgCreate('ellipse');
      svgAttr(ellipse, {
        cx: cx,
        cy: cy,
        rx: cx - strokeWidth * 3,
        ry: cy - strokeWidth * 3
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

    const strokeWidth = getStrokeWidth(element);

    // Draw error state
    var isError = element.iserror;
    // isError = true;

    if (isError) {
      var rect = svgCreate('rect');
      const b = {
        x: -(ERROR_STROKE_THICK + strokeWidth) / 2,
        y: -(ERROR_STROKE_THICK + strokeWidth) / 2,
        width: box.width + (ERROR_STROKE_THICK + strokeWidth),
        height: box.height + (ERROR_STROKE_THICK + strokeWidth)
      };
      console.log('drawTransition(), error, strokeWidth = ', strokeWidth);
      console.log('drawTransition(), error, ERROR_STROKE_THICK + strokeWidth = ', ERROR_STROKE_THICK + strokeWidth);
      console.log('drawTransition(), error, box = ', box);
      console.log('drawTransition(), error, b = ', b);

      svgAttr(rect, b);
      svgAttr(rect, {
        fill: 'transparent',
        stroke: ERROR_STROKE_COLOR,
        strokeWidth: ERROR_STROKE_THICK
      });
      svgAppend(parentGfx, rect);
    }

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
    svgAppend(parentGfx, rect);

    // Draw subst frame
    if (element.cpnElement && element.cpnElement.subst && element.cpnElement.subst._subpage) {
      rect = svgCreate('rect');
      svgAttr(rect, {
        x: strokeWidth * 3,
        y: strokeWidth * 3,
        width: box.width - strokeWidth * 6,
        height: box.height - strokeWidth * 6
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
    console.log('drawArc(), element = ', element);

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


  /**
   * Trying to draw hyperlink label
   */
  function drawBottomTextLink(parentGfx, textRenderer, s, parentRect) {
    const textDim = textRenderer.getTextUtil().getDimensions(s, {});
    textDim.width += 5;
    textDim.height += 1;

    var a = svgCreate('a');
    svgAttr(a, {
      // 'xlink:href': "http://www.opera.com/",
      'href': "http://www.opera.com/",
      target: "_blank"
    });

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
    svgAppend(a, rect);

    var text = svgCreate('text');
    svgAttr(text, {
      x: parentRect.width / 2 - textDim.width / 2 + 2.5,
      y: parentRect.height + 4
    });
    text.textContent = s;
    svgAppend(a, text);

    svgAppend(parentGfx, a);
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
      strokeLinejoin: 'round',
      markerEnd: marker('connection-end', fill, strokeColor),
      stroke: strokeColor,
      strokeWidth: getStrokeWidth(element)
    };

    if (element.iserror) {
      strokeColor = ERROR_STROKE_COLOR;

      var attrsError = {
        strokeLinejoin: 'round',
        markerEnd: marker('connection-end', fill, strokeColor),
        stroke: strokeColor,
        strokeWidth: 7
      };
      var path = drawPath(parentGfx, pathData, attrsError);
    }
    var path = drawPath(parentGfx, pathData, attrs);

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
