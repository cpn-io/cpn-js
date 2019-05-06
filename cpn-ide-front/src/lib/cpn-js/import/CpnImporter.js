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
    attrs = this.getPlaceAttrs(cpnElement, type);
    element = this._elementFactory.createShape(attrs);
    this._canvas.addShape(element, root);

    for (var key of ['type', 'initmark', 'port']) {
      if (cpnElement[key]) {
        attrs = this.getLabelAttrs(element, cpnElement[key], key);
        label = this._elementFactory.createLabel(attrs);
        this._canvas.addShape(label, element);
      }
    }

    // add token label
    if (cpnElement.token) {
      attrs = this.getTokenLabelAttrs(element, cpnElement.token, 'token');
      var tokenLabel = this._elementFactory.createLabel(attrs);
      this._canvas.addShape(tokenLabel, element);

      // add marking label
      if (cpnElement.marking) {
        attrs = this.getMarkingLabelAttrs(tokenLabel, cpnElement.marking, 'marking');
        var markingLabel = this._elementFactory.createLabel(attrs);
        this._canvas.addShape(markingLabel, tokenLabel);
      }
    }

  }

  // Transition object
  if (type === CPN_TRANSITION) {
    attrs = this.getTransAttrs(cpnElement, type);
    element = this._elementFactory.createShape(attrs);
    this._canvas.addShape(element, root);

    for (var key of ['cond', 'time', 'code', 'priority', 'subst']) {
      if (cpnElement[key]) {
        const e = key === 'subst' ? cpnElement[key].subpageinfo : cpnElement[key];
        attrs = this.getLabelAttrs(element, e, key);
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
      const data = this.getArcData(pageObject, cpnElement, type, placeShape, transShape);
      if (data) {
        element = this._modeling.connect(data.source, data.target, data.attrs, null);

        for (var key of ['annot']) {
          if (cpnElement[key]) {
            attrs = this.getLabelAttrs(element, cpnElement[key], key);
            label = this._elementFactory.createLabel(attrs);
            this._canvas.addShape(label, element);
          }
        }
      }
    }
  }

  // Transition object
  if (type === CPN_TEXT_ANNOTATION) {
    attrs = this.getLabelAttrs(undefined, cpnElement, 'aux');
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
CpnImporter.prototype._getEnd = function (semantic, side) {

  var element,
    refSemantic,
    type = semantic.$type,
    translate = this._translate;

  refSemantic = semantic[side + 'Ref'];

  // handle mysterious isMany DataAssociation#sourceRef
  if (side === 'source' && type === 'cpn:DataInputAssociation') {
    refSemantic = refSemantic && refSemantic[0];
  }

  // fix source / target for DataInputAssociation / DataOutputAssociation
  if (side === 'source' && type === 'cpn:DataOutputAssociation' ||
    side === 'target' && type === 'cpn:DataInputAssociation') {

    refSemantic = semantic.$parent;
  }

  element = refSemantic && this._getElement(refSemantic);

  if (element) {
    return element;
  }

  if (refSemantic) {
    throw notYetDrawn(translate, semantic, refSemantic, side + 'Ref');
  } else {
    throw new Error(translate('{semantic}#{side} Ref not specified', {
      semantic: elementToString(semantic),
      side: side
    }));
  }
};

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

function isPointInsideBBox(bbox, point) {
  var x = point.x,
    y = point.y;

  return x >= bbox.x &&
    x <= bbox.x + bbox.width &&
    y >= bbox.y &&
    y <= bbox.y + bbox.height;
}

CpnImporter.prototype.getPlaceAttrs = function (cpnPlaceElement, type) {
  var x = Math.round(cpnPlaceElement.posattr._x);
  var y = Math.round(cpnPlaceElement.posattr._y) * -1;
  var w = Math.round(cpnPlaceElement.ellipse._w);
  var h = Math.round(cpnPlaceElement.ellipse._h);
  x -= w / 2;
  y -= h / 2;

  var attrs = {
    type: type,
    id: cpnPlaceElement._id,
    cpnElement: cpnPlaceElement,
    text: cpnPlaceElement.text,
    x: x,
    y: y,
    width: w,
    height: h
  };

  return attrs;
}

CpnImporter.prototype.getLabelAttrs = function (labelTarget, cpnLabelElement, labelType) {
  var x = Math.round(cpnLabelElement.posattr._x);
  var y = Math.round(cpnLabelElement.posattr._y) * -1;

  var text, defaultValue;

  if (labelType === 'port') {
    text = cpnLabelElement._type; // for port label
    if (text === 'I/O') {
      text = 'In/Out';
    }
  }
  else if (labelType === 'subst')
    text = cpnLabelElement._name; // for subst label
  else if (labelType === 'aux')
    text = cpnLabelElement.text; // for aux label
  else
    text = cpnLabelElement.text.__text; // for shape external label

  console.log('CpnImporter.prototype.getLabelAttrs(), text = ', text);

  // if label is empty check for default values
  if (labelType) {
    defaultValue = this._modeling.getDefaultValue(labelType);
    console.log('CpnImporter.prototype.getLabelAttrs(), defualt text = ', defaultValue);
  }

  text = text || '';

  var bounds = { x: x, y: y, width: 200, height: 20 };
  bounds = this._textRenderer.getExternalLabelBounds(bounds, defaultValue && text.trim() === '' ? defaultValue : text);

  if (labelType !== 'aux') {
    x -= bounds.width / 2;
    y -= bounds.height / 2;
  }

  var attrs = {
    type: CPN_LABEL,
    id: cpnLabelElement._id,
    cpnElement: cpnLabelElement,
    labelType: labelType,
    text: text,
    x: x,
    y: y,
    width: bounds.width,
    height: bounds.height
  };

  if (labelTarget) {
    attrs.labelTarget = labelTarget;
  }
  if (defaultValue) {
    attrs.defaultValue = defaultValue;
  }

  return attrs;
}

CpnImporter.prototype.getTokenLabelAttrs = function (labelTarget, cpnTokenLabelElement, labelType) {
  var x = Math.round(cpnTokenLabelElement._x);
  var y = Math.round(cpnTokenLabelElement._y) * -1;

  var text = '8';

  var bounds = { x: x, y: y, width: 200, height: 20 };
  bounds = this._textRenderer.getExternalLabelBounds(bounds, text);

  if (x === 0) {
    x -= bounds.width / 2;
  }
  if (y === 0) {
    y -= bounds.height / 2;
  }

  x += Math.round(labelTarget.x + labelTarget.width);
  y += Math.round(labelTarget.y + labelTarget.height / 2);

  var attrs = {
    type: CPN_TOKEN_LABEL,
    id: CPN_TOKEN_LABEL + '_' + labelTarget.id,
    cpnElement: cpnTokenLabelElement,
    text: text,
    x: x,
    y: y,
    width: bounds.width,
    height: bounds.height
  };

  if (labelTarget) {
    attrs.labelTarget = labelTarget;
  }

  return attrs;
}

CpnImporter.prototype.getMarkingLabelAttrs = function (labelTarget, cpnMarkingLabelElement, labelType) {
  var x = Math.round(cpnMarkingLabelElement._x);
  var y = Math.round(cpnMarkingLabelElement._y) * -1;

  var text = '2`0@0,0\n2`0@0,0\n2`0@0,0\n2`0@0,0';

  var bounds = { x: x, y: y, width: 200, height: 20 };
  bounds = this._textRenderer.getExternalLabelBounds(bounds, text);

  y -= bounds.height / 2;

  x += Math.round(labelTarget.x + labelTarget.width * 3);
  y += Math.round(labelTarget.y + labelTarget.height / 2);

  var attrs = {
    type: CPN_MARKING_LABEL,
    id: CPN_MARKING_LABEL + '_' + labelTarget.id,
    cpnElement: cpnMarkingLabelElement,
    text: text,

    x: x,
    y: y,
    width: bounds.width,
    height: bounds.height,

    hidden: !(cpnMarkingLabelElement._hidden === 'false')
  };

  if (labelTarget) {
    attrs.labelTarget = labelTarget;
  }

  return attrs;
}


CpnImporter.prototype.getTransAttrs = function (cpnTransElement, type) {
  var x = Math.round(cpnTransElement.posattr._x);
  var y = Math.round(cpnTransElement.posattr._y) * -1;
  var w = Math.round(cpnTransElement.box._w);
  var h = Math.round(cpnTransElement.box._h);
  x -= w / 2;
  y -= h / 2;

  var attrs = {
    type: type,
    id: cpnTransElement._id,
    cpnElement: cpnTransElement,
    text: cpnTransElement.text,
    x: x,
    y: y,
    width: w,
    height: h
  };

  return attrs;
}

CpnImporter.prototype.getArcData = function (pageObject, cpnArcElement, type, placeShape, transShape) {
  let stroke = cpnArcElement.lineattr._colour || 'black';
  const strokeWidth = cpnArcElement.lineattr._thick || 1;

  // var orientation = arc["@attributes"].orientation;
  const orientation = cpnArcElement._orientation;
  let source = placeShape;
  let target = transShape;
  let reverse = false;
  if (orientation && orientation == 'TtoP') {
    source = transShape;
    target = placeShape;
    reverse = true;
  }

  let waypoints = [];
  waypoints.push({
    x: source.x + Math.abs(source.width / 2),
    y: source.y + Math.abs(source.height / 2),
    id: source.id
  });

  if (cpnArcElement.bendpoint) {
    if (cpnArcElement.bendpoint.posattr) {
      // @ts-ignore
      waypoints.push({
        x: 1 * cpnArcElement.bendpoint.posattr._x,
        y: -1 * cpnArcElement.bendpoint.posattr._y,
        id: cpnArcElement.bendpoint._id
      });
    }
    if (cpnArcElement.bendpoint instanceof Array) {
      const arr = cpnArcElement.bendpoint;
      if (!reverse) {
        arr.reverse();
      }
      arr.forEach(p => {
        waypoints.push({
          x: 1 * p.posattr._x,
          y: -1 * p.posattr._y,
          id: p._id
        });
      });
    }
  }

  waypoints.push({
    x: target.x + Math.abs(target.width / 2),
    y: target.y + Math.abs(target.height / 2),
    id: target.id
  });

  // выравнивание точек соединения по bendpoins
  const n = waypoints.length;
  if (n > 2) {

    // y
    if (Math.abs(waypoints[0].y - waypoints[1].y) < 20) {
      waypoints[0].y = waypoints[1].y;
    }
    if (Math.abs(waypoints[n - 1].y - waypoints[n - 2].y) < 20) {
      waypoints[n - 1].y = waypoints[n - 2].y;
    }

    // x
    if (Math.abs(waypoints[0].x - waypoints[1].x) < 20) {
      waypoints[0].x = waypoints[1].x;
    }
    if (Math.abs(waypoints[n - 1].x - waypoints[n - 2].x) < 20) {
      waypoints[n - 1].x = waypoints[n - 2].x;
    }

  }

  else if (pageObject) {

    for (const arc of pageObject.arc) {
      if (cpnArcElement._id !== arc._id &&
        ((cpnArcElement.placeend._idref === arc.transend._idref && cpnArcElement.transend._idref === arc.placeend._idref) ||
          (cpnArcElement.placeend._idref === arc.placeend._idref && cpnArcElement.transend._idref === arc.transend._idref))) {
        waypoints = optimiseEqualsArcsByWayoints(waypoints, source.width / 8);
      }
    }

  }

  if (source && target) {
    const attrs = {
      type: type,
      id: cpnArcElement._id,
      waypoints: waypoints,
      stroke: stroke,
      strokeWidth: strokeWidth,

      cpnElement: cpnArcElement,
      cpnPlace: placeShape.cpnElement,
      cpnTransition: transShape.cpnElement
    };
    return { source: source, target: target, attrs: attrs };
  }

  return undefined;
}

// Helpers
// ------------------------------------------------------------

function angle(cx, cy, ex, ey) {
  const dy = ey - cy;
  const dx = ex - cx;
  const theta = Math.atan2(dy, dx); // range (-PI, PI]
  // theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
  // if (theta < 0) theta = 360 + theta; // range [0, 360)
  return theta;
}

function optimiseEqualsArcsByWayoints(arc, delta) {
  const dx = Math.sin(angle(arc[0].x, arc[0].y, arc[1].x, arc[1].y) - Math.PI) * delta;
  const dy = Math.cos(angle(arc[0].x, arc[0].y, arc[1].x, arc[1].y) - Math.PI) * delta;

  arc[0].x = arc[0].x + dx;
  arc[0].y = arc[0].y + dy;

  arc[1].x = arc[1].x + dx;
  arc[1].y = arc[1].y + dy;

  return arc;
}

