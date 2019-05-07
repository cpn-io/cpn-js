import inherits from 'inherits';

import BaseModeling from 'diagram-js/lib/features/modeling/Modeling';

import UpdateLabelHandler from '../label-editing/cmd/UpdateLabelHandler';

import {
  CPN_LABEL,
  CPN_TOKEN_LABEL,
  CPN_MARKING_LABEL,
  isCpn,
} from '../../util/ModelUtil';
import CpnImporter from "../../import/CpnImporter";

/**
 * CPN modeling features activator
 *
 * @param {EventBus} eventBus
 * @param {ElementFactory} elementFactory
 * @param {CommandStack} commandStack
 * @param {CpnRules} cpnRules
 */
export default function Modeling(eventBus, elementFactory, elementRegistry, commandStack, cpnRules, textRenderer ) {
  console.log('Modeling()');

  BaseModeling.call(this, eventBus, elementFactory, commandStack);

  this._eventBus = eventBus;
  this._cpnRules = cpnRules;
  this._elementRegistry = elementRegistry;
  this._textRenderer = textRenderer;
  this._defaultValues = [];
}

inherits(Modeling, BaseModeling);

Modeling.$inject = [
  'eventBus',
  'elementFactory',
  'elementRegistry',
  'commandStack',
  'cpnRules',
  'textRenderer'
];


Modeling.prototype.getHandlers = function() {
  console.log('Modeling().getHandlers()');

  var handlers = BaseModeling.prototype.getHandlers.call(this);

  handlers['element.updateLabel'] = UpdateLabelHandler;

  return handlers;
};


Modeling.prototype.updateLabel = function(element, newLabel, newBounds, hints) {
  console.log('Modeling().updateLabel(), newBounds = ', newBounds);

  this._commandStack.execute('element.updateLabel', {
    element: element,
    newLabel: newLabel,
    newBounds: newBounds,
    hints: hints || {}
  });
};

Modeling.prototype.updateElement = function(element) {
  console.log('Modeling().updateElement(), element = ', element);

  if (element) {
    this._eventBus.fire('element.changed', { element: element });
  }
};


Modeling.prototype.connect = function(source, target, attrs, hints) {
  var cpnRules = this._cpnRules;

  if (!attrs) {
    attrs = cpnRules.canConnect(source, target);
  }
  if (!attrs) {
    return;
  }

  // console.log('Modeling.prototype.connect()', source, target, attrs, source.parent, hints);
  return this.createConnection(source, target, attrs, source.parent, hints);
};

Modeling.prototype.setColor = function(elements, colors) {
  if (!elements.length) {
    elements = [ elements ];
  }

  this._commandStack.execute('element.setColor', {
    elements: elements,
    colors: colors
  });
};

Modeling.prototype.getElementById = function(id) {
  return this._elementRegistry.get(id);
};

Modeling.prototype.getElementByCpnElement = function(cpnElement) {
  var result;

  for (const key of Object.keys(this._elementRegistry._elements)) {
    const element = this._elementRegistry._elements[key].element;

    if (element && element.cpnElement === cpnElement) {
      result = element;
      break;
    }
  }

  return result;
};

Modeling.prototype.getElementByCpnElementId = function(cpnElementId) {
  var result;

  for (const key of Object.keys(this._elementRegistry._elements)) {
    const element = this._elementRegistry._elements[key].element;

    if (element && element.cpnElement && element.cpnElement._id === cpnElementId) {
      result = element;
      break;
    }
  }

  return result;
};

Modeling.prototype.clearErrorMarking = function() {
  for (const key of Object.keys(this._elementRegistry._elements)) {
    const element = this._elementRegistry._elements[key].element;

    if (isCpn(element)) {
      element.iserror = false;
      this.updateElement(element);
    }
  }
};


Modeling.prototype.setDefaultValue = function (key, value) {
  this._defaultValues[key] = value;
  console.log('Modeling.prototype.setDefaultValue(), this._defaultValues = ', this._defaultValues);
}

Modeling.prototype.getDefaultValue = function (key) {
  console.log('Modeling.prototype.getDefaultValue(), this._defaultValues = ', this._defaultValues);
  return this._defaultValues[key];
}

























Modeling.prototype.getPlaceAttrs = function (cpnPlaceElement, type) {
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

Modeling.prototype.getLabelAttrs = function (labelTarget, cpnLabelElement, labelType) {
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

  console.log('Modeling.prototype.getLabelAttrs(), text = ', text);

  // if label is empty check for default values
  if (labelType) {
    defaultValue = this.getDefaultValue(labelType);
    console.log('Modeling.prototype.getLabelAttrs(), defualt text = ', defaultValue);
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

Modeling.prototype.getTokenLabelAttrs = function (labelTarget, cpnTokenLabelElement, labelType) {
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

Modeling.prototype.getMarkingLabelAttrs = function (labelTarget, cpnMarkingLabelElement, labelType) {
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
    id: CPN_MARKING_LABEL + '_' + labelTarget.labelTarget.id,
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

Modeling.prototype.getTransAttrs = function (cpnTransElement, type) {
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

Modeling.prototype.getArcData = function (pageObject, cpnArcElement, type, placeShape, transShape) {
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




/**
 * saving the created place in the model json
 *
 * @param element
 */
Modeling.prototype.createElementInModel = function(event, type) {
  let formCase = [];
  formCase['cpn:Place'] = {form: 'ellipse', entry:  ['initmark', 'type']};
  formCase['cpn:Transition'] = { form: 'box', entry: ['time', 'code', 'priority', 'cond']};
  formCase['cpn:Connection'] = { entry: ['annot']};
  let bounds = {
    width: 200, // 90,
    height: 30,
    x: event.context.position.x,
    y: event.context.position.y
  };


  bounds = this._textRenderer.getExternalLabelBounds(bounds, 'Default');
  const newElement = {
    posattr: {
      _x: event.context.position.x, // -294.000000
      _y: -1*event.context.position.y  // 156.000000
    },
    fillattr: {
      _colour: 'White',
      _pattern: '',
      _filled: false
    },
    lineattr: {
      _colour: 'Black',
      _thick: 1,
      _type: 'Solid'
    },
    textattr: {
      _colour: 'Black',
      _bold: false
    },
    text: '',
    token: {
      _x: event.context.position.x,
      _y: event.context.position.x
    },
    marking: {
      snap: {
        _snap_id: 9,
        '_anchor.horizontal': 1,
        '_anchor.vertical': 3
      },
      _x: event.context.position.x,
      _y: event.context.position.x,
      _hidden: false
    },
    _id: 'ID' + new Date().getTime()  // 'ID1412328424'
  };
  let elemType  = formCase[type];
  if(elemType) {
    if(elemType.form) {
      newElement[elemType.form] = {
        _w: this.getDefaultValue(elemType.form).w,//element.width,
        _h: this.getDefaultValue(elemType.form).h//element.height

      };
    }
    for(let label of elemType.entry) {
      newElement[label] = {
        posattr: {
          _x: event.context.position.x + Math.round(bounds.width) / 2 + 100,//+ element.width, /// 55.500000,
          _y: -1 * event.context.position.y - Math.round(bounds.height) / 2 + 80 /4 ///+ element.height / 4 // 102.000000
        },
        fillattr: {
          _colour: 'White',
          _pattern: 'Solid',
          _filled: false
        },
        lineattr: {
          _colour: 'Black',
          _thick: 0,
          _type: 'Solid'
        },
        textattr: {
          _colour: 'Black',
          _bold: false
        },
        text: {
          _tool: 'CPN Tools',
          _version: '4.0.1'
        },
        _id: newElement._id + '' + label


      }
    }
  }

  // this.modelUpdate();

  return newElement;
}







