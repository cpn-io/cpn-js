import Resize from 'diagram-js/lib/features/resize/Resize';

import inherits from 'inherits';

const DEFAULT_MIN_WIDTH = 10;

/**
 * Sub class of the Resize module which implements a CPN specific resize function.
 */
export default function CpnResize(injector) {
  console.log('CpnResize()');

  injector.invoke(Resize, this);
}

CpnResize.$inject = [
  'injector'
];

inherits(CpnResize, Resize);

CpnResize.prototype.computeMinResizeBox = function(context) {
  console.log('CpnResize.prototype.computeMinResizeBox(), context = ', context);

  var shape = context.shape,
    direction = context.direction,
    minDimensions,
    childrenBounds;

  // minDimensions = context.minDimensions || {
  //   width: 10,
  //   height: 10
  // };
  //
  // return minDimensions;

  var box = {
    x: shape.x,
    y: shape.y,
    width: 10,
    height: 10
  };

  return box;

};
