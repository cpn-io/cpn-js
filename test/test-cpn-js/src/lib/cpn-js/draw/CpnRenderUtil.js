import {
  every,
  some
} from 'min-dash';

import {
  componentsToPath
} from 'diagram-js/lib/util/RenderUtil';

// color access //////////////////////

export function getFillColor(element) {
  if (element.cpnElement && cpnElement.fillattr)
    return cpnElement.fillattr._colour || 'white';
  return element.fill || 'white';
}

export function getStrokeColor(element) {
  if (element.cpnElement && cpnElement.lineattr)
    return cpnElement.lineattr._colour || 'black';
  return element.stroke || 'black';
}

export function getStrokeWidth(element) {
  if (element.cpnElement && cpnElement.lineattr)
    return cpnElement.lineattr._thick || 2;
  return element.strokeWidth || 2;
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
