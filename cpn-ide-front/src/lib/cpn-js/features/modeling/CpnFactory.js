import inherits from 'inherits';

import CommandInterceptor from 'diagram-js/lib/command/CommandInterceptor';
import { CPN_PLACE, CPN_TRANSITION, CPN_CONNECTION, CPN_TEXT_ANNOTATION } from "../../util/ModelUtil";

inherits(CpnFactory, CommandInterceptor);

export default function CpnFactory(eventBus, elementFactory, modeling, canvas) {
  CommandInterceptor.call(this, eventBus);

  this._modeling = modeling;
  this._canvas = canvas;
  this._elementFactory = elementFactory;
  this._eventBus = eventBus
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

CpnFactory.prototype.createShape = function (pageObject, cpnElement, type, position, addToCanvas) {
  console.log('CpnFactory.prototype.createShape(), position, type =  ', position, type);

  if (!position) {
    position = { x: 0, y: 0 };
  }

  if (!cpnElement) {
    cpnElement = this._modeling.createShapeCpnElement(position, type);
  }

  let element, attrs, label;

  var root = getRootElement(this._canvas);

  // Place object
  if (type === CPN_PLACE) {
    attrs = this._modeling.getPlaceAttrs(cpnElement, type);

    // console.log('createShape(), CPN_PLACE, attrs.cpnElement = ', JSON.stringify(attrs.cpnElement));

    element = this._elementFactory.createShape(attrs);
    if (addToCanvas)
      this._canvas.addShape(element, root);

    for (var key of ['type', 'initmark', 'port']) {
      if (cpnElement[key]) {
        attrs = this._modeling.getLabelAttrs(element, cpnElement[key], key);
        label = this._elementFactory.createLabel(attrs);
        if (addToCanvas) {
          this._canvas.addShape(label, root);
          // this._modeling.moveShape(label, { x: 0, y: 0 });
        }
      }
    }

    // add token label
    if (cpnElement.token) {
      attrs = this._modeling.getTokenLabelAttrs(element, cpnElement.token, 'token');
      var tokenLabel = this._elementFactory.createLabel(attrs);
      if (addToCanvas) {
        this._canvas.addShape(tokenLabel, root);
      }

      // add marking label
      if (cpnElement.marking) {
        attrs = this._modeling.getMarkingLabelAttrs(tokenLabel, cpnElement.marking, 'marking');
        var markingLabel = this._elementFactory.createLabel(attrs);
        if (addToCanvas)
          this._canvas.addShape(markingLabel, tokenLabel);
      }
    }



  }

  // Transition object
  if (type === CPN_TRANSITION) {
    attrs = this._modeling.getTransAttrs(cpnElement, type);
    element = this._elementFactory.createShape(attrs);
    if (addToCanvas)
      this._canvas.addShape(element, root);

    for (var key of ['cond', 'time', 'code', 'priority', 'subst']) {
      if (cpnElement[key]) {
        const e = key === 'subst' ? cpnElement[key].subpageinfo : cpnElement[key];
        attrs = this._modeling.getLabelAttrs(element, e, key);
        label = this._elementFactory.createLabel(attrs);
        if (addToCanvas) {
          this._canvas.addShape(label, root);
          // this._modeling.moveShape(label, { x: 0, y: 0 });
        }
      }
    }
  }

  // Arc object
  if (type === CPN_CONNECTION) {
    const placeShape = this._modeling.getElementById(cpnElement.placeend._idref);
    const transShape = this._modeling.getElementById(cpnElement.transend._idref);

    // console.log('CpnImporter.prototype.add, connection, place = ', placeShape);
    // console.log('CpnImporter.prototype.add, connection, trans = ', transShape);

    if (placeShape && transShape) {
      const data = this._modeling.getArcData(pageObject, cpnElement, type, placeShape, transShape);
      if (data) {
        element = this._modeling.connect(data.source, data.target, data.attrs, null);
        // element = this._modeling.createConnection(placeShape, transShape);

        for (var key of ['annot']) {
          if (cpnElement[key]) {
            attrs = this._modeling.getLabelAttrs(element, cpnElement[key], key);
            label = this._elementFactory.createLabel(attrs);
            if (addToCanvas)
              this._canvas.addShape(label, root);
          }
        }
      }
    }
  }

  // Text annotation object
  if (type === CPN_TEXT_ANNOTATION) {
    attrs = this._modeling.getLabelAttrs(undefined, cpnElement, 'aux');
    element = this._elementFactory.createLabel(attrs);
    if (addToCanvas)
      this._canvas.addShape(element, root);
  }

  return element;
}

function getRootElement(canvas) {
  var root = canvas.getRootElement()

  // if (root.id !== 'root') {
  //   root = this._elementFactory.createRoot({ id: 'root' });
  //   try {
  //     this._canvas.setRootElement(root, true);
  //   } catch (error) {
  //     console.error('CREATE ROOT ELEMENT ERROR = ', error);
  //   }

  //   root = this._canvas.getRootElement();
  //   console.log('CREATE ROOT ELEMENT, root = ', root);
  // }
  // console.log('IMPORT ROOT ELEMENT, root = ', root);

  return root;
}








