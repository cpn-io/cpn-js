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
  CPN_CONNECTION,
  CPN_TEXT_ANNOTATION,
  is,
  isCpn
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
  getStrokeWidth
} from './CpnRenderUtil';


var RENDERER_IDS = new Ids();

var ERROR_STROKE_COLOR = '#ff999966';
var ERROR_STROKE_THICK = 7;

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

    var ref = options.ref || {x: 0, y: 0};

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

    if (type === 'sequenceflow-end') {
      var sequenceflowEnd = svgCreate('path');
      svgAttr(sequenceflowEnd, {d: 'M 1 5 L 11 10 L 1 15 Z'});

      addMarker(id, {
        element: sequenceflowEnd,
        ref: {x: 11, y: 10},
        scale: 0.5,
        attrs: {
          fill: stroke,
          stroke: stroke
        }
      });
    }

    if (type === 'messageflow-start') {
      var messageflowStart = svgCreate('circle');
      svgAttr(messageflowStart, {cx: 6, cy: 6, r: 3.5});

      addMarker(id, {
        element: messageflowStart,
        attrs: {
          fill: fill,
          stroke: stroke
        },
        ref: {x: 6, y: 6}
      });
    }

    if (type === 'messageflow-end') {
      var messageflowEnd = svgCreate('path');
      svgAttr(messageflowEnd, {d: 'm 1 5 l 0 -3 l 7 3 l -7 3 z'});

      addMarker(id, {
        element: messageflowEnd,
        attrs: {
          fill: fill,
          stroke: stroke,
          strokeLinecap: 'butt'
        },
        ref: {x: 8.5, y: 5}
      });
    }

    if (type === 'association-start') {
      var associationStart = svgCreate('path');
      svgAttr(associationStart, {d: 'M 11 5 L 1 10 L 11 15'});

      addMarker(id, {
        element: associationStart,
        attrs: {
          fill: 'none',
          stroke: stroke,
          strokeWidth: 1.5
        },
        ref: {x: 1, y: 10},
        scale: 0.5
      });
    }

    if (type === 'association-end') {
      var associationEnd = svgCreate('path');
      svgAttr(associationEnd, {d: 'M 1 5 L 11 10 L 1 15'});

      addMarker(id, {
        element: associationEnd,
        attrs: {
          fill: 'none',
          stroke: stroke,
          strokeWidth: 1.5
        },
        ref: {x: 12, y: 10},
        scale: 0.5
      });
    }

    if (type === 'conditional-flow-marker') {
      var conditionalflowMarker = svgCreate('path');
      svgAttr(conditionalflowMarker, {d: 'M 0 10 L 8 6 L 16 10 L 8 14 Z'});

      addMarker(id, {
        element: conditionalflowMarker,
        attrs: {
          fill: fill,
          stroke: stroke
        },
        ref: {x: -1, y: 10},
        scale: 0.5
      });
    }

    if (type === 'conditional-default-flow-marker') {
      var conditionaldefaultflowMarker = svgCreate('path');
      svgAttr(conditionaldefaultflowMarker, {d: 'M 6 4 L 10 16'});

      addMarker(id, {
        element: conditionaldefaultflowMarker,
        attrs: {
          stroke: stroke
        },
        ref: {x: 0, y: 10},
        scale: 0.5
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
    svgAttr(path, {d: d});
    svgAttr(path, attrs);

    svgAppend(parentGfx, path);

    return path;
  }

  function drawMarker(type, parentGfx, path, attrs) {
    return drawPath(parentGfx, path, assign({'data-marker': type}, attrs));
  }

  function as(type) {
    return function (parentGfx, element) {
      return handlers[type](parentGfx, element);
    };
  }

  function renderer(type) {
    return handlers[type];
  }

  function renderLabel(parentGfx, label, options) {

    var text = textRenderer.createText(label || '', options);
    svgClasses(text).add('djs-label');
    svgAppend(parentGfx, text);

    // var rect = svgCreate('rect');
    // svgAttr(rect, {
    //   x: 0,
    //   y: 0,
    //   width: options.box.width,
    //   height: options.box.height,
    //   fill: 'transparent',
    //   strokeWidth: 1,
    //   strokeColor: 'black'
    // });
    // svgAppend(parentGfx, rect);

    return text;
  }

  function renderEmbeddedLabel(parentGfx, element) {
    const attrs = {
      box: element,
      align: 'center-middle',
      padding: 5,
      style: {
        fill: getStrokeColor(element)
      }
    };
    return renderLabel(parentGfx, element.name, attrs);
  }

  function renderExternalLabel(parentGfx, element) {
    return renderLabel(parentGfx, element.text, {
      box: element,
      align: 'center-middle',
      padding: 5,
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

    const cpnElement = element.cpnElement;

    var box = {
      x: parseFloat(element.x),
      y: parseFloat(element.y),
      w: parseFloat(element.width),
      h: parseFloat(element.height)
    };

    const cx = parseFloat(box.w / 2);
    const cy = parseFloat(box.h / 2);

    const strokeWidth = getStrokeWidth(element);

    // Draw error state
    var isError = element.iserror;
    isError = true;

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
      strokeWidth: getStrokeWidth(element),
    });
    svgAppend(parentGfx, ellipse);


    // // if Place is IN or OUT entry
    // if (element.cpnElement) {
    //   var isPort = element.cpnElement.port;
    //   isPort = true;
    //   if (isPort) {
    //     drawBottomTextLabel(parentGfx, textRenderer, 'Out', box);
    //   }
    // }

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

    const cpnElement = element.cpnElement;

    var box = {
      // x: parseFloat(cpnElement.posattr._x),
      // y: parseFloat(cpnElement.posattr._y * -1),
      // w: parseFloat(cpnElement.box._w),
      // h: parseFloat(cpnElement.box._h)
      x: parseFloat(element.x),
      y: parseFloat(element.y),
      w: parseFloat(element.width),
      h: parseFloat(element.height)
    };

    const strokeWidth = getStrokeWidth(element);

    // Draw error state
    var isError = element.iserror;
    isError = true;

    if (isError) {
      var rect = svgCreate('rect');
      svgAttr(rect, {
        x: -(ERROR_STROKE_THICK + strokeWidth) / 2,
        y: -(ERROR_STROKE_THICK + strokeWidth) / 2,
        width: box.w + (ERROR_STROKE_THICK + strokeWidth),
        height: box.h + (ERROR_STROKE_THICK + strokeWidth)
      });
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
      width: box.w,
      height: box.h
    });
    svgAttr(rect, {
      fill: getFillColor(element),
      stroke: getStrokeColor(element),
      strokeWidth: getStrokeWidth(element),
    });
    svgAppend(parentGfx, rect);

    // // if Place is IN or OUT entry
    // if (element.cpnElement) {
    //   var isPort = element.cpnElement.subst;
    //   isPort = true;
    //   if (isPort) {
    //     drawBottomTextLabel(parentGfx, textRenderer, 'Port', box);
    //     // drawBottomTextLink(parentGfx, textRenderer, 'Port', box);
    //   }
    // }

    return rect;
  }


  function drawArc(parentGfx, element, d) {
    console.log('drawArc(), element = ', element);

    const cpnElement = element.cpnElement;

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
      x: parentRect.w / 2 - textDim.width / 2,
      y: parentRect.h - textDim.height / 2,
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
      x: parentRect.w / 2 - textDim.width / 2 + 2.5,
      y: parentRect.h + 4
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
      x: parentRect.w / 2 - textDim.width / 2,
      y: parentRect.h - textDim.height / 2,
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
      x: parentRect.w / 2 - textDim.width / 2 + 2.5,
      y: parentRect.h + 4
    });
    text.textContent = s;
    svgAppend(a, text);

    svgAppend(parentGfx, a);
  }


  var handlers = this.handlers = {
    // CPN
    'cpn:Place': function (parentGfx, element) {
      var shape = drawPlace(parentGfx, textRenderer, element);
      renderEmbeddedLabel(parentGfx, element);
      attachTaskMarkers(parentGfx, element);
      return shape;
    },

    'cpn:Transition': function (parentGfx, element) {
      var shape = drawTransition(parentGfx, textRenderer, element);
      renderEmbeddedLabel(parentGfx, element);
      attachTaskMarkers(parentGfx, element);
      return shape;
    },

    'cpn:Connection': function (parentGfx, element) {
      var pathData = createPathFromConnection(element);
      var path = drawArc(parentGfx, element, pathData);
      return path;

      // var pathData = createPathFromConnection(element);
      //
      // var fill = getFillColor(element), stroke = getStrokeColor(element);
      //
      // var attrs = {
      //   strokeLinejoin: 'round',
      //   markerEnd: marker('sequenceflow-end', fill, stroke),
      //   stroke: getStrokeColor(element),
      //   strokeWidth: getStrokeWidth(element)
      // };
      //
      // if (element.iserror) {
      //   var attrsError = {
      //     strokeLinejoin: 'round',
      //     // markerEnd: marker('sequenceflow-end', fill, 1),
      //     stroke: 'red',
      //     strokeWidth: 7
      //   };
      //   var path = drawPath(parentGfx, pathData, attrsError);
      // }
      // var path = drawPath(parentGfx, pathData, attrs);
      //
      // return path;
    },

    // -------------------------------------------------

    'cpn:Label': function (parentGfx, element) {
      return renderExternalLabel(parentGfx, element);
    },

    'cpn:TextAnnotation': function (parentGfx, element) {
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

      var text = element.text || '';
      renderLabel(parentGfx, text, {
        box: element,
        align: 'left-top',
        padding: 5,
        style: {
          fill: getStrokeColor(element)
        }
      });

      return textElement;
    },
  };

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


inherits(CpnRenderer, BaseRenderer);

CpnRenderer.$inject = [
  'config.cpnRenderer',
  'eventBus',
  'styles',
  'pathMap',
  'canvas',
  'textRenderer'
];


CpnRenderer.prototype.canRender = function (element) {
  return isCpn(element);
  return true;
};

CpnRenderer.prototype.drawShape = function (parentGfx, element) {
  var type = element.type;
  var h = this.handlers[type];
  /* jshint -W040 */
  return h(parentGfx, element);
};

CpnRenderer.prototype.drawConnection = function (parentGfx, element) {
  var type = element.type;
  var h = this.handlers[type];
  /* jshint -W040 */
  return h(parentGfx, element);
};

CpnRenderer.prototype.getShapePath = function (element) {
  console.log('CpnRenderer.prototype.getShapePath(), element = ', element);

  if (is(element, CPN_PLACE))
    return getEllipsePath(element);

  return getRectPath(element);
};
