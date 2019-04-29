import { is } from '../../util/ModelUtil';

import inherits from 'inherits';

import { forEach } from 'min-dash';

import AutoResizeProvider from 'diagram-js/lib/features/auto-resize/AutoResizeProvider';


/**
 * This module is a provider for automatically resizing parent BPMN elements
 */
export default function CpnAutoResizeProvider(eventBus, modeling) {
  AutoResizeProvider.call(this, eventBus);

  // this._modeling = modeling;
  //
  // this.addRule('element.autoResize', function(context) {
  //   console.log('CpnAutoResizeProvider() RULE element.autoResize, context = ', context)
  //   return false;
  // });


  this.canResize = function(elements, target) {
    console.log('CpnAutoResizeProvider.canResize(), elements = ', elements);

    // return target.parent;
    return true;
  };

}

inherits(CpnAutoResizeProvider, AutoResizeProvider);

CpnAutoResizeProvider.$inject = [
  'eventBus',
  'modeling'
];


/**
 * Check if the given target can be expanded
 *
 * @param  {djs.model.Shape} target
 *
 * @return {boolean}
 */
CpnAutoResizeProvider.prototype.canResize = function(elements, target) {
  console.log('CpnAutoResizeProvider.prototype.canResize, elements = ', elements);

  const canResize = false;

  return canResize;
};
