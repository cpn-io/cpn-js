import {
  assign,
  map
} from 'min-dash';

import {
  is,
  isCpn,
  CPN_PLACE,
  CPN_TRANSITION,
  CPN_CONNECTION,
  CPN_LABEL,
  CPN_TOKEN_LABEL,
  CPN_MARKING_LABEL,
  CPN_TEXT_ANNOTATION
} from '../util/ModelUtil';

import {
  isLabelExternal,
  getExternalLabelBounds
} from '../util/LabelUtil';

import {
  getMid
} from 'diagram-js/lib/layout/LayoutUtil';

import {
  elementToString
} from './Util';


function elementData(semantic, attrs) {
  return assign({
    id: semantic.id,
    type: semantic.$type,
    businessObject: semantic
  }, attrs);
}

function collectWaypoints(waypoints) {
  return map(waypoints, function (p) {
    return { x: p.x, y: p.y };
  });
}

function notYetDrawn(translate, semantic, refSemantic, property) {
  return new Error(translate('element {element} referenced by {referenced}#{property} not yet drawn', {
    element: elementToString(refSemantic),
    referenced: elementToString(semantic),
    property: property
  }));
}


/**
 * An importer that adds cpn elements to the canvas
 *
 * @param {EventBus} eventBus
 * @param {Canvas} canvas
 * @param {ElementFactory} elementFactory
 * @param {ElementRegistry} elementRegistry
 * @param {Function} translate
 * @param {TextRenderer} textRenderer
 */
export default function CpnImporter(modeling, eventBus, canvas, elementFactory,
  elementRegistry, translate, textRenderer) {

  this._modeling = modeling;
  this._eventBus = eventBus;
  this._canvas = canvas;
  this._elementFactory = elementFactory;
  this._elementRegistry = elementRegistry;
  this._translate = translate;
  this._textRenderer = textRenderer;
}

CpnImporter.$inject = [
  'modeling',
  'eventBus',
  'canvas',
  'elementFactory',
  'elementRegistry',
  'translate',
  'textRenderer'
];


/**
 * Add cpn element (cpnElement) to the canvas onto the
 * specified parent shape.
 */
CpnImporter.prototype.add = function (pageObject, cpnElement, type) {

  console.log('CpnImporter.prototype.add, cpnElement = ', cpnElement, ', type = ', type);

  var element, label, attrs,
    translate = this._translate,
    hidden;

  const root = this._canvas.getRootElement();

  // Place object
  if (type === CPN_PLACE) {
    attrs = this._modeling.getPlaceAttrs(cpnElement, type);
    element = this._elementFactory.createShape(attrs);
    this._canvas.addShape(element, root);

    for (var key of ['type', 'initmark', 'port']) {
      if (cpnElement[key]) {
        attrs = this._modeling.getLabelAttrs(element, cpnElement[key], key);
        label = this._elementFactory.createLabel(attrs);
        this._canvas.addShape(label, element);
      }
    }

    // add token label
    if (cpnElement.token) {
      attrs = this._modeling.getTokenLabelAttrs(element, cpnElement.token, 'token');
      var tokenLabel = this._elementFactory.createLabel(attrs);
      this._canvas.addShape(tokenLabel, element);

      // add marking label
      if (cpnElement.marking) {
        attrs = this._modeling.getMarkingLabelAttrs(tokenLabel, cpnElement.marking, 'marking');
        var markingLabel = this._elementFactory.createLabel(attrs);
        this._canvas.addShape(markingLabel, tokenLabel);
      }
    }

  }

  // Transition object
  if (type === CPN_TRANSITION) {
    attrs = this._modeling.getTransAttrs(cpnElement, type);
    element = this._elementFactory.createShape(attrs);
    this._canvas.addShape(element, root);

    for (var key of ['cond', 'time', 'code', 'priority', 'subst']) {
      if (cpnElement[key]) {
        const e = key === 'subst' ? cpnElement[key].subpageinfo : cpnElement[key];
        attrs = this._modeling.getLabelAttrs(element, e, key);
        label = this._elementFactory.createLabel(attrs);
        this._canvas.addShape(label, element);
      }
    }
  }

  // Arc object
  if (type === CPN_CONNECTION) {
    const placeShape = this._modeling.getElementById(cpnElement.placeend._idref);
    const transShape = this._modeling.getElementById(cpnElement.transend._idref);

    console.log('CpnImporter.prototype.add, connection, place = ', placeShape);
    console.log('CpnImporter.prototype.add, connection, trans = ', transShape);

    if (placeShape && transShape) {
      const data = this._modeling.getArcData(pageObject, cpnElement, type, placeShape, transShape);
      if (data) {
        element = this._modeling.connect(data.source, data.target, data.attrs, null);

        for (var key of ['annot']) {
          if (cpnElement[key]) {
            attrs = this._modeling.getLabelAttrs(element, cpnElement[key], key);
            label = this._elementFactory.createLabel(attrs);
            this._canvas.addShape(label, element);
          }
        }
      }
    }
  }

  // Transition object
  if (type === CPN_TEXT_ANNOTATION) {
    attrs = this._modeling.getLabelAttrs(undefined, cpnElement, 'aux');
    label = this._elementFactory.createLabel(attrs);
    this._canvas.addShape(label, root);
  }


  this._eventBus.fire('cpnElement.added', { element: element });

  return element;
};


