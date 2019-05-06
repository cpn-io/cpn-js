import {
  assign,
  map
} from 'min-dash';

import { CPN_PLACE, is, isCpn, CPN_TRANSITION, CPN_CONNECTION, CPN_LABEL, CPN_TEXT_ANNOTATION } from '../util/ModelUtil';

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
    const placeShape = this._getElementById(cpnElement.placeend._idref);
    const transShape = this._getElementById(cpnElement.transend._idref);

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


/**
 * add label for an element
 */
// CpnImporter.prototype.addLabel = function (semantic, element) {
//   var bounds,
//     text,
//     label;

//   bounds = getExternalLabelBounds(semantic, element);

//   text = semantic.name;

//   if (text) {
//     // get corrected bounds from actual layouted text
//     bounds = this._textRenderer.getExternalLabelBounds(bounds, text);
//   }

//   label = this._elementFactory.createLabel(elementData(semantic, {
//     id: semantic.id + '_label',
//     labelTarget: element,
//     type: 'label',
//     hidden: element.hidden || !semantic.name,
//     x: Math.round(bounds.x),
//     y: Math.round(bounds.y),
//     width: Math.round(bounds.width),
//     height: Math.round(bounds.height)
//   }));

//   return this._canvas.addShape(label, element.parent);
// };

/**
 * Return the drawn connection end based on the given side.
 *
 * @throws {Error} if the end is not yet drawn
 */
// CpnImporter.prototype._getEnd = function (semantic, side) {
//
//   var element,
//     refSemantic,
//     type = semantic.$type,
//     translate = this._translate;
//
//   refSemantic = semantic[side + 'Ref'];
//
//   // handle mysterious isMany DataAssociation#sourceRef
//   if (side === 'source' && type === 'cpn:DataInputAssociation') {
//     refSemantic = refSemantic && refSemantic[0];
//   }
//
//   // fix source / target for DataInputAssociation / DataOutputAssociation
//   if (side === 'source' && type === 'cpn:DataOutputAssociation' ||
//     side === 'target' && type === 'cpn:DataInputAssociation') {
//
//     refSemantic = semantic.$parent;
//   }
//
//   element = refSemantic && this._getElement(refSemantic);
//
//   if (element) {
//     return element;
//   }
//
//   if (refSemantic) {
//     throw notYetDrawn(translate, semantic, refSemantic, side + 'Ref');
//   } else {
//     throw new Error(translate('{semantic}#{side} Ref not specified', {
//       semantic: elementToString(semantic),
//       side: side
//     }));
//   }
// };

CpnImporter.prototype._getSource = function (semantic) {
  return this._getEnd(semantic, 'source');
};

CpnImporter.prototype._getTarget = function (semantic) {
  return this._getEnd(semantic, 'target');
};


CpnImporter.prototype._getElement = function (semantic) {
  return this._elementRegistry.get(semantic.id);
};

CpnImporter.prototype._getElementById = function (id) {
  return this._elementRegistry.get(id);
};


// helpers ////////////////////

// function isPointInsideBBox(bbox, point) {
//   var x = point.x,
//     y = point.y;
//
//   return x >= bbox.x &&
//     x <= bbox.x + bbox.width &&
//     y >= bbox.y &&
//     y <= bbox.y + bbox.height;
// }



