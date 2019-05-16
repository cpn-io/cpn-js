import {
  every,
  some
} from 'min-dash';

import {
  componentsToPath
} from 'diagram-js/lib/util/RenderUtil';

// color access //////////////////////

const TRANSLATE_COLOR = {
  'Fucia': '#f0f'
};

export function getText(element) {
  // console.log('getText(), element = ', element);
  return element.name || element.text || '';
}

export function getFillColor(element) {
  if (element.cpnElement && element.cpnElement.fillattr)
    return TRANSLATE_COLOR[element.cpnElement.fillattr._colour] || element.cpnElement.fillattr._colour || 'white';
  return element.fill || 'white';
}

export function getStrokeColor(element) {
  if (element.cpnElement && element.cpnElement.lineattr)
    return TRANSLATE_COLOR[element.cpnElement.lineattr._colour] || element.cpnElement.lineattr._colour || 'black';
  return element.stroke || 'black';
}

export function getStrokeWidth(element) {
  if (element.cpnElement && element.cpnElement.lineattr)
    return parseInt(element.cpnElement.lineattr._thick) || 1;
  return parseInt(element.strokeWidth) || 1;
}

export function getBox(element) {
  const cpnElement = element.cpnElement;

  // if element is Place object
  if (cpnElement && cpnElement.posattr && cpnElement.ellipse) {
    return {
      x: parseFloat(cpnElement.posattr._x),
      y: parseFloat(cpnElement.posattr._y) * -1,
      width: parseFloat(cpnElement.ellipse._w),
      height: parseFloat(cpnElement.ellipse._h)
    };
  }

  // if element is Transition object
  if (cpnElement && cpnElement.posattr && cpnElement.box) {
    return {
      x: parseFloat(cpnElement.posattr._x),
      y: parseFloat(cpnElement.posattr._y) * -1,
      width: parseFloat(cpnElement.box._w),
      height: parseFloat(cpnElement.box._h)
    };
  }

  return {
    x: parseFloat(element.x),
    y: parseFloat(element.y) * -1,
    width: parseFloat(element.width),
    height: parseFloat(element.height)
  };
}

// cropping path customizations //////////////////////

export function getEllipsePath(shape) {

  const cx = shape.x + shape.width / 2,
    cy = shape.y + shape.height / 2,
    rx = shape.width / 2,
    ry = shape.height / 2;

  const circlePath = [
    ['M', cx, cy],
    ['m', 0, -ry],
    ['a', rx, ry, 0, 1, 1, 0, 2 * ry],
    ['a', rx, ry, 0, 1, 1, 0, -2 * ry],
    ['z']
  ];

  return componentsToPath(circlePath);
}

export function getRectPath(shape) {
  var x = shape.x,
    y = shape.y,
    width = shape.width,
    height = shape.height;

  var rectPath = [
    ['M', x, y],
    ['l', width, 0],
    ['l', 0, height],
    ['l', -width, 0],
    ['z']
  ];

  return componentsToPath(rectPath);
}
