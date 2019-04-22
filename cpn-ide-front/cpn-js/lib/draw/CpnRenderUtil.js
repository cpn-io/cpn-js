import {
  isObject,
  assign,
  forEach
} from 'min-dash';

import {
  append as svgAppend,
  attr as svgAttr,
  create as svgCreate,
  classes as svgClasses
} from 'tiny-svg';

var errorThick = 6;
var errorStroke = '#ff999999';

/**
 * Draw CPN place element
 *
 * @param {*} parentGfx - parent svg graphics element
 * @param {*} element - place element
 */
export function drawPlace(parentGfx, textRenderer, element) {

  const cpnElement = element.cpnElement;

  var box = {
    // x: parseFloat(cpnElement.posattr._x),
    // y: parseFloat(cpnElement.posattr._y * -1),
    // w: parseFloat(cpnElement.ellipse._w),
    // h: parseFloat(cpnElement.ellipse._h)
    x: parseFloat(element.x),
    y: parseFloat(element.y),
    w: parseFloat(element.width),
    h: parseFloat(element.height)
  };

  const cx = parseFloat(box.w / 2);
  const cy = parseFloat(box.h / 2);

  // Draw error state
  var isError = element.iserror;
  isError = true;

  if (isError) {
    var ellipse = svgCreate('ellipse');
    svgAttr(ellipse, {
      cx: cx,
      cy: cy,
      rx: cx + errorThick / 2,
      ry: cy + errorThick / 2
    });
    svgAttr(ellipse, {
      stroke: errorStroke,
      strokeWidth: errorThick
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
    fill: cpnElement.fillattr._colour,
    stroke: cpnElement.lineattr._colour,
    strokeWidth: cpnElement.lineattr._thick
  });
  svgAppend(parentGfx, ellipse);


  // if Place is IN or OUT entry
  var isPort = element.cpnElement.port;
  isPort = true;
  if (isPort) {
    drawBottomTextLabel(parentGfx, textRenderer, 'Out', box);
  }

  return ellipse;
}



/**
 * Draw CPN transition element
 *
 * @param {*} parentGfx - parent svg graphics element
 * @param {*} element - transition element
 */
export function drawTransition(parentGfx, textRenderer, element) {
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

  // Draw error state
  var isError = element.iserror;
  isError = true;

  if (isError) {
    var rect = svgCreate('rect');
    svgAttr(rect, {
      x: -(errorThick / 4),
      y: -(errorThick / 4),
      width: box.w + errorThick / 2,
      height: box.h + errorThick / 2
    });
    svgAttr(rect, {
      stroke: errorStroke,
      strokeWidth: errorThick
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
    fill: cpnElement.fillattr._colour,
    stroke: cpnElement.lineattr._colour,
    strokeWidth: cpnElement.lineattr._thick
  });
  svgAppend(parentGfx, rect);

  // if Place is IN or OUT entry
  var isPort = element.cpnElement.subst;
  isPort = true;
  if (isPort) {
    drawBottomTextLabel(parentGfx, textRenderer, 'Port', box);
    // drawBottomTextLink(parentGfx, textRenderer, 'Port', box);
  }

  return rect;
}



export function drawArc(parentGfx, element, d) {
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
    stroke: cpnElement.lineattr._colour,
    strokeWidth: cpnElement.lineattr._thick
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
    refX: 20,
    refY: 10,
    markerWidth: 30,
    markerHeight: 20,
  });
  // marker path
  var path = svgCreate('path');
  svgAttr(path, {
    d: 'M0,0 L5,10 L0,20 L20,10 Z',
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
