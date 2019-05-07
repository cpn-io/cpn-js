import inherits from 'inherits';

import CommandInterceptor from 'diagram-js/lib/command/CommandInterceptor';
import { CPN_PLACE, CPN_TRANSITION, CPN_CONNECTION } from "../../util/ModelUtil";

inherits(CpnFactory, CommandInterceptor);

export default function CpnFactory(eventBus, elementFactory, modeling, canvas) {
  CommandInterceptor.call(this, eventBus);

  this._modeling = modeling;
  this._canvas = canvas;
  this._elementFactory = elementFactory;

  // this.executed([
  //   'shape.create',
  // ], createShapeHandler);

  // function createShapeHandler(event) {
  //   const position = { x: event.context.position.x, y: event.context.position.y };
  //   const type = event.context.shape.type;

  //   this.createShape(position, type);
  // }

}

CpnFactory.$inject = [
  'eventBus',
  'elementFactory',
  'modeling',
  'canvas'
];

CpnFactory.prototype.createShape = function (position, type) {
  console.log('CpnPaletteProvider.prototype.createShape(), position, type =  ', position, type);

  let cpnElement = this._modeling.createElementInModel(position, type);
  let attrs;

  if (type === CPN_TRANSITION) {
    attrs = this._modeling.getTransAttrs(cpnElement, type);
  } else if (type === CPN_PLACE) {
    attrs = this._modeling.getPlaceAttrs(cpnElement, type);
  } else {
    attrs = this._modeling.getArcData(cpnElement, type);
  }

  const element = this._elementFactory.createShape(attrs);

  // this._canvas.addShape(element, this._canvas.getRootElement());

  // let label;
  /*for (var key of ['type', 'initmark', 'port']) {
    if (cpnElement[key]) {
      attrs = modeling.getLabelAttrs(element, cpnElement[key], key);
      label = elementFactory.createLabel(attrs);
      canvas.addShape(label, element);
    }

  }*/


  // Place object
  if (type === CPN_PLACE) {
    for (var key of ['type', 'initmark', 'port']) {
      if (cpnElement[key]) {
        attrs = this._modeling.getLabelAttrs(element, cpnElement[key], key);
        var label = this._elementFactory.createLabel(attrs);
        // this._canvas.addShape(label, element);
      }
    }

    // add token label
    if (cpnElement.token) {
      attrs = this._modeling.getTokenLabelAttrs(element, cpnElement.token, 'token');
      var tokenLabel = this._elementFactory.createLabel(attrs);
      // this._canvas.addShape(tokenLabel, element);

      // add marking label
      if (cpnElement.marking) {
        attrs = this._modeling.getMarkingLabelAttrs(tokenLabel, cpnElement.marking, 'marking');
        var markingLabel = this._elementFactory.createLabel(attrs);
        // this._canvas.addShape(markingLabel, tokenLabel);
      }
    }
  }


  // Transition object
  if (type === CPN_TRANSITION) {
    for (var key of ['cond', 'time', 'code', 'priority', 'subst']) {
      if (cpnElement[key]) {
        const e = key === 'subst' ? cpnElement[key].subpageinfo : cpnElement[key];
        attrs = this._modeling.getLabelAttrs(element, e, key);
        label = this._elementFactory.createLabel(attrs);
        // this._canvas.addShape(label, element);
      }
    }
  }

  return element;
}









