import AutoResize from 'diagram-js/lib/features/auto-resize/AutoResize';

import inherits from 'inherits';
import {isCpn} from "../../util/ModelUtil";

/**
 * Sub class of the AutoResize module which implements a CPN
 * specific resize function.
 */
export default function CpnAutoResize(injector) {

  injector.invoke(AutoResize, this);
}

CpnAutoResize.$inject = [
  'injector'
];

inherits(CpnAutoResize, AutoResize);


/**
 * Resize shapes
 *
 * @param  {djs.model.Shape} target
 * @param  {Object} newBounds
 */
CpnAutoResize.prototype.resize = function (target, newBounds) {
  console.log('CpnAutoResize.prototype.resize, target = ', target);
  console.log('CpnAutoResize.prototype.resize, newBounds = ', newBounds);

  if (!isCpn(target)) {
    // this._modeling.resizeShape(target, newBounds);
    newBounds = {
      x: target.x,
      y: target.y,
      width: target.width,
      height: target.height,
    };
  }

};
