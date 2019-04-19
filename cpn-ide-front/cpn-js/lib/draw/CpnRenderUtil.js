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

/**
 * Draw CPN place element
 *
 * @param {*} parentGfx
 * @param {*} element
 */
export function drawPlace(parentGfx, element, textRenderer) {

  const cpnElement = element.cpnElement;

  const x = cpnElement.posattr._x;
  const y = cpnElement.posattr._y * -1;
  const w = cpnElement.ellipse._w;
  const h = cpnElement.ellipse._h;

  const cx = Math.round(w / 2);
  const cy = Math.round(h / 2);

  const attrs = {
    fill: cpnElement.fillattr._colour,
    stroke: cpnElement.lineattr._colour,
    strokeWidth: cpnElement.lineattr._thick
  };

  var ellipse = svgCreate('ellipse');
  svgAttr(ellipse, {
    cx: cx,
    cy: cy,
    rx: cx,
    ry: cy
  });
  svgAttr(ellipse, attrs);
  svgAppend(parentGfx, ellipse);


  // if Place is IN or OUT entry

  const textDim = textRenderer.getTextUtil().getDimensions('In/Out', {});
  // textDim.width += 10;
  // textDim.height += 4;

  // if (element.cpnElement.port) {
    var rect = svgCreate('rect');
    svgAttr(rect, {
      x: w/2 - textDim.width/2,
      y: h - textDim.height/2,
      width: textDim.width,
      height: textDim.height
    });
    svgAttr(rect, {
      fill: '#ffe',
      stroke: '#000',
      strokeWidth: 1
      });
    svgAppend(parentGfx, rect);

    var text = svgCreate('text');
    svgAttr(text, {
      x: w/2 - textDim.width/2 + 1,
      y: h + 5,
      width: textDim.width,
      height: textDim.height
    });
    svgAppend(parentGfx, text);

    var tspan = svgCreate('tspan');
    // svgAttr(tspan, { x: x, y: y });
    tspan.textContent = 'In/Out';
    svgAppend(text, tspan);

  // }


//   var textRect = {
//     x: x,
//     y: y + h,
//     width: w,
//     height: h
//   };

//   var options = {
//     x: x,
//     y: y + h,
//     box: textRect,
//     align: 'center-middle',
//     padding: 5,
//     style: {
//       fill: cpnElement.lineattr._colour
//     }
//   };
//   options = assign({
//     size: {
//       width: 100
//     }
//   }, options);
//   var text = textRenderer.createText('In/Out', options);
//   svgClasses(text).add('djs-label');
//   svgAttr(text, {
//     x: w/2,
//     y: h,
//     width: w/4,
//     height: 10
//   });
// svgAppend(parentGfx, text);

  return ellipse;
}



/**
 * Draw CPN transition element
 *
 * @param {*} parentGfx
 * @param {*} element
 */
export function drawTransition(parentGfx, element) {

  const cpnElement = element.cpnElement;

  const x = cpnElement.posattr._x;
  const y = cpnElement.posattr._y * -1;
  const w = cpnElement.box._w;
  const h = cpnElement.box._h;

  const cx = Math.round(w / 2);
  const cy = Math.round(h / 2);

  // if (element.iserror) {
  //   var rect2 = svgCreate('rect');
  //   svgAttr(rect2, {
  //     x: offset,
  //     y: offset,
  //     width: width - offset * 2,
  //     height: height - offset * 2,
  //     rx: r,
  //     ry: r
  //   });
  //   var attrs2 = {
  //     stroke: '#ff9999',
  //     strokeWidth: 8
  //   };
  //   svgAttr(rect2, attrs2);

  //   svgAppend(parentGfx, rect2);
  // }

  const attrs = {
    fill: cpnElement.fillattr._colour,
    stroke: cpnElement.lineattr._colour,
    strokeWidth: cpnElement.lineattr._thick
  };

  var rect = svgCreate('rect');
  svgAttr(rect, {
    x: 0,
    y: 0,
    width: w,
    height: h,
    rx: 0,
    ry: 0
  });
  svgAttr(rect, attrs);

  svgAppend(parentGfx, rect);

  return rect;
}

