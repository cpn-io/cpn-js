import inherits from 'inherits';

import CommandInterceptor from 'diagram-js/lib/command/CommandInterceptor';
import {CPN_PLACE} from "../../util/ModelUtil";

inherits(CpnFactory, CommandInterceptor);

export default function CpnFactory(eventBus, elementFactory) {
  CommandInterceptor.call(this, eventBus);
  this.executed([
    'shape.create',
  ], createShape);


  function createShape(e) {
    console.log('CpnFactory - Event ', e)
    this.createElement();
  }

}

CpnFactory.$inject = [
  'eventBus',
  'elementFactory',

];




CpnFactory.prototype.createElement = function () {

}






