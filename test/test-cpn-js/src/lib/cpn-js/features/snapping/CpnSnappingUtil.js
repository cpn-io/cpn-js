import {
  getOrientation
} from 'diagram-js/lib/layout/LayoutUtil';


export function getBoundaryAttachment(position, targetBounds) {
  var orientation = getOrientation(position, targetBounds, -15);

  if (orientation !== 'intersect') {
    return orientation;
  } else {
    return null;
  }
}


// participant snapping box implementation //////////////////////

import {
  asTRBL
} from 'diagram-js/lib/layout/LayoutUtil';

var abs = Math.abs,
    min = Math.min,
    max = Math.max;

function addToTrbl(trbl, attr, value, choice) {

  var current = trbl[attr];

  // make sure to set the value if it does not exist
  // or apply the correct value by comparing against
  // choice(value, currentValue)
  trbl[attr] = current === undefined ? value : choice(value, current);
}

function addMin(trbl, attr, value) {
  return addToTrbl(trbl, attr, value, min);
}

function addMax(trbl, attr, value) {
  return addToTrbl(trbl, attr, value, max);
}
