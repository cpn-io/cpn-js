import inherits from 'inherits';

import CommandInterceptor from 'diagram-js/lib/command/CommandInterceptor';
import {CPN_PLACE} from "../../util/ModelUtil";

inherits(CpnFactory, CommandInterceptor);




export default function CpnFactory(eventBus, elementFactory, modeling, canvas) {
  CommandInterceptor.call(this, eventBus);

  this.executed([
    'shape.create',
  ], createShape);


  function createShape(e) {
    console.log('CpnFactory - Event ', e)
    let cpnElement = modeling.createElementInModel(e, e.context.shape.type);
    let attrs;
    if(e.context.shape.type === 'cpn:Transition') {
      attrs = modeling.getTransAttrs(cpnElement, e.context.shape.type);
    } else if(e.context.shape.type === 'cpn:Place') {
      attrs = modeling.getPlaceAttrs(cpnElement, e.context.shape.type);
    } else {
      attrs = modeling.getArcData(cpnElement, e.context.shape.type);
    }

    let element = elementFactory.createShape(attrs);
    canvas.addShape(element, canvas.getRootElement());
    let label
    /*for (var key of ['type', 'initmark', 'port']) {
      if (cpnElement[key]) {
        attrs = modeling.getLabelAttrs(element, cpnElement[key], key);
        label = elementFactory.createLabel(attrs);
        canvas.addShape(label, element);
      }

    }*/
  }

}

CpnFactory.$inject = [
  'eventBus',
  'elementFactory',
  'modeling',
  'canvas'

];








