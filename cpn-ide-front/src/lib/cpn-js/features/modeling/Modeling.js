import inherits from 'inherits';

import BaseModeling from 'diagram-js/lib/features/modeling/Modeling';

import UpdateLabelHandler from '../label-editing/cmd/UpdateLabelHandler';

import LabelEditingProvider from '../label-editing/LabelEditingProvider'

import {
  CPN_LABEL,
  CPN_TOKEN_LABEL,
  CPN_MARKING_LABEL,
  isCpn,
  is,
  CPN_PLACE,
  CPN_TRANSITION,
  CPN_CONNECTION,
  isAny,
} from '../../util/ModelUtil';

import { getText, getBox } from '../../draw/CpnRenderUtil';

/**
 * CPN modeling features activator
 *
 * @param {EventBus} eventBus
 * @param {ElementFactory} elementFactory
 * @param {CommandStack} commandStack
 * @param {CpnRules} cpnRules
 */
export default function Modeling(eventBus, elementFactory, elementRegistry, commandStack, cpnRules, textRenderer, canvas) {
  console.log('Modeling()');

  BaseModeling.call(this, eventBus, elementFactory, commandStack);

  this._eventBus = eventBus;
  this._elementFactory = elementFactory;
  this._elementRegistry = elementRegistry;
  this._cpnRules = cpnRules;
  this._textRenderer = textRenderer;
  this._canvas = canvas;

  this._defaultValues = [];
}

inherits(Modeling, BaseModeling);

Modeling.$inject = [
  'eventBus',
  'elementFactory',
  'elementRegistry',
  'commandStack',
  'cpnRules',
  'textRenderer',
  'canvas'
];


Modeling.prototype.getHandlers = function () {
  console.log('Modeling().getHandlers()');

  var handlers = BaseModeling.prototype.getHandlers.call(this);

  handlers['element.updateLabel'] = UpdateLabelHandler;

  return handlers;
};


/**
 * Setting CPN element status (one of 'clear', 'process', 'error', 'warning', 'ready')
 *
 * @param {*} event - json object, example:
 *    { clear: '*' } or
 *    { process: '*' } or
 *    { error: ['ID1412328424'], ready: ['ID1412328496'] }
 */
Modeling.prototype.setCpnStatus = function (event) {
  for (const key of Object.keys(this._elementRegistry._elements)) {
    const element = this._elementRegistry._elements[key].element;

    if (isAny(element, [CPN_PLACE, CPN_TRANSITION]) && element.cpnElement) {
      for (var status of ['clear', 'process', 'error', 'warning', 'ready']) {
        // console.log('Modeling.prototype.setCpnStatus(), status, event = ', status, event);
        // console.log('Modeling.prototype.setCpnStatus(), event[status] = ', event[status]);

        if (event[status] && (event[status] === '*' || event[status].includes(element.cpnElement._id))) {
          element.cpnStatus = status;
        }
      }
      this.updateElement(element);
    }
  }
}


Modeling.prototype.updateLabel = function (element, newLabel, newBounds, hints) {
  console.log('Modeling().updateLabel(), newBounds = ', newBounds);
  if (newBounds.width < 10)
    newBounds.width = 10;

  this._commandStack.execute('element.updateLabel', {
    element: element,
    newLabel: newLabel,
    newBounds: newBounds,
    hints: hints || {}
  });
};

Modeling.prototype.updateElement = function (element) {
  // console.log('Modeling().updateElement(), element = ', element);
  if (element.labels) {
    for (const lb of element.labels) {
      this.updateElement(lb);
    }
  }
  if (element) {
    updateShapeByCpnElement(element, this._canvas, this._eventBus);
<<<<<<< HEAD

    this._eventBus.fire('element.changed', { element: element });
=======
     this._eventBus.fire('element.changed', { element: element });
>>>>>>> 54cbe55583ee13533f709384eb84a3ad69adab65
  }
};

Modeling.prototype.updateElementBounds = function(element) {
  if(element.labels){
    for (const l of element.labels) {
      if(l.type !== CPN_TOKEN_LABEL && l.type !== CPN_MARKING_LABEL && (l.text || l.name)) {
        let newBounds = this._textRenderer.getExternalLabelBounds(l, l.text || l.name);
        this.updateLabel(l, l.text || l.name, newBounds);
      }
    }
  }
}

function isString(v) {
  return (typeof v === 'string' || v instanceof String);
}

/**
 *
 * @param {*} element
 */
function updateShapeByCpnElement(element, canvas, eventBus) {
  let form = element.cpnElement.ellipse ? 'ellipse' : 'box';

  // check for min values
  // if (element.cpnElement[form]) {
  //   if (element.cpnElement[form]._w < 20)
  //     element.cpnElement[form]._w = 20;
  //   if (element.cpnElement[form]._h < 20)
  //     element.cpnElement[form]._h = 20;
  // }

  const changeName = (cpnElement) => {
    if (cpnElement && cpnElement._name) {
      element.text = cpnElement._name;
      element.name = cpnElement._name;
    }
    // console.log('Modeling.updateShapeByCpnElement(), cpnElement.text instanceof String = ',  typeof cpnElement.text === 'string');

    if (cpnElement && isString(cpnElement.text)) {
      element.name = cpnElement.text;
      element.text = cpnElement.text;
    }

    if (cpnElement.text && cpnElement.text.__text) {
      element.text = cpnElement.text.__text;
    }
  };

  if (element.type === CPN_LABEL && (element.text || element.name)) {
    element.hidden = false;
  }
  const changePosition = (changingElement) => {
    let delta = [];
    let changingEntry = changingElement.cpnElement.posattr ? changingElement.cpnElement.posattr : changingElement.cpnElement;
    if ((changingElement.cpnElement.posattr)) {
      let x = Math.round(changingEntry._x);
      let y = Math.round(changingEntry._y) * -1;
      // if( isString(changingEntry._x) || isString(changingEntry._y)) {
      //   x -= w / 2;
      //   y -= h / 2;
      // }
      // element.x =  delta.x;
      //  element.y =  delta.y;
      delta.x = x - changingElement.x;
      delta.y = y - changingElement.y;
      // let gfx;
      for (let label of element.labels) {
        label.x += delta.x;
        label.y += delta.y;
      }
      changingElement.x = x;
      changingElement.y = y;
<<<<<<< HEAD
      if (delta.x !== 0 && delta.y !== 0) {
=======

      if(delta.x !== 0 || delta.y !== 0) {
        /*let changedEnd;
        for (const key of Object.keys(canvas._elementRegistry._elements)) {
          const el = canvas._elementRegistry._elements[key].element;
          if(el.type === CPN_CONNECTION) {
            if(el.cpnPlace === changingElement.id){
              changedEnd = el.cpnPlace;
            } else if( el.cpnTransition === changingElement.id){
              changedEnd = el.cpnTransition
            }
            if(changedEnd) {
              let wayPointIndex;
              if(changedEnd.type === CPN_PLACE) wayPointIndex = el.cpnElement.orientation === 'PtoT' ? 0 : el.waypoints.length;
              if(changedEnd.type === CPN_TRANSITION) wayPointIndex = el.cpnElement.orientation === 'TtoP' ? 0 : el.waypoints.length;
              el.waypoints[wayPointIndex].original.x = changedEnd.x;
              el.waypoints[wayPointIndex].original.y = changedEnd.y;
              el.waypoints[wayPointIndex].x += delta.x;
              el.waypoints[wayPointIndex].x += delta.y;
            }
          }
        }*/
>>>>>>> 54cbe55583ee13533f709384eb84a3ad69adab65
        let gfx = canvas._elementRegistry.getGraphics(changingElement);
        eventBus.fire('shape.changed', { element: changingElement, gfx: gfx, type: "shape.changed" })
      }

    }
  };

  const resize = (cpnElement) => {
    if (cpnElement.ellipse || cpnElement.box) {
      element.width = parseInt(cpnElement[form]._w, 10);
      element.height = parseInt(cpnElement[form]._h, 10);
    }
  }
  if (element.type === CPN_CONNECTION) {
    element.orientation = element.cpnElement._orientation;
  }
  changeName(element.cpnElement);
  resize(element.cpnElement);
  changePosition(element, undefined);
  /*if(delta && element.labels.length > 0) {
    for( let label of element.labels) {
      changePosition(label, delta)
    }
  }*/

  // this.moveShape(element, { x: 0, y: 0 }, element.parent, undefined, undefined);

  console.log('Modeling.updateShapeByCpnElement(), element = ', element);
}

Modeling.prototype.connect = function (source, target, attrs, hints) {

  // var cpnRules = this._cpnRules;
  // if (!attrs) {
  //   attrs = cpnRules.canConnect(source, target);
  // }

  if (attrs) {
    return this.createConnection(source, target, attrs, source.parent, hints);
  } else {
    var placeShape;
    var transShape;

    if (is(source, CPN_PLACE)) placeShape = source;
    if (is(target, CPN_PLACE)) placeShape = target;
    if (is(source, CPN_TRANSITION)) transShape = source;
    if (is(target, CPN_TRANSITION)) transShape = target;

    if (placeShape && transShape)
      return this.createNewConnection(placeShape, transShape);
  }

  return undefined;
};

Modeling.prototype.createNewConnection = function (placeShape, transShape) {
  console.log('Modeling.prototype.createNewConnection(), place = ', placeShape);
  console.log('Modeling.prototype.createNewConnection(), trans = ', transShape);

  var root = this._canvas.getRootElement();

  if (placeShape && transShape) {
    var pageObject = undefined;
    var cpnElement = this.createArcInModel(placeShape.cpnElement, transShape.cpnElement);

    const data = this.getArcData(pageObject, cpnElement, CPN_CONNECTION, placeShape, transShape);
    if (data) {
      var connection = this.connect(data.source, data.target, data.attrs, null);

      for (var key of ['annot']) {
        if (cpnElement[key]) {
          var attrs = this.getLabelAttrs(connection, cpnElement[key], key);
          var label = this._elementFactory.createLabel(attrs);
          this._canvas.addShape(label, root);
        }
      }

      return connection;
    }
  }

  return undefined;
}



Modeling.prototype.setColor = function (elements, colors) {
  if (!elements.length) {
    elements = [elements];
  }

  this._commandStack.execute('element.setColor', {
    elements: elements,
    colors: colors
  });
};

Modeling.prototype.getElementById = function (id) {
  return this._elementRegistry.get(id);
};

Modeling.prototype.getElementByCpnElement = function (cpnElement) {
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

Modeling.prototype.getElementByCpnElementId = function (cpnElementId) {
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

Modeling.prototype.getTokenLabelElement = function (element) {
  var result;

  if (element && element.labels) {
    for (const l of element.labels) {
      if (is(l, CPN_TOKEN_LABEL)) {
        result = l;
        break;
      }
    }
  }

  return result;
};

Modeling.prototype.getMarkingLabelElement = function (element) {
  var result;

  if (element && element.labels)
    for (const l of element.labels) {
      if (is(l, CPN_MARKING_LABEL)) {
        result = l;
        break;
      }
    }

  return result;
};


Modeling.prototype.clearErrorMarking = function () {
  const elements = this._canvas._elementRegistry._elements;
  console.log('Modeling.prototype.clearErrorMarking(), elements = ', elements);
  for (const key of Object.keys(elements)) {
    console.log('Modeling.prototype.clearErrorMarking(), key = ', key);
    console.log('Modeling.prototype.clearErrorMarking(), elements[key] = ', elements[key]);

    const element = elements[key].element;

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
  cpnPlaceElement.posattr._x = x;
  cpnPlaceElement.posattr._y = -1 * y;
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
  bounds = this._textRenderer.getExternalLabelBounds(bounds,
    defaultValue && text.trim() === '' ? defaultValue : text);

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

  if (text.trim() === '' || text === defaultValue)
    attrs.hidden = true;

  return attrs;
}

Modeling.prototype.getTokenLabelAttrs = function (labelTarget, cpnTokenLabelElement, labelType) {
  var x = Math.round(cpnTokenLabelElement._x);
  var y = Math.round(cpnTokenLabelElement._y) * -1;

  // var text = '8';
  var text = '';

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
    height: bounds.height,

    hidden: true
  };

  if (labelTarget) {
    attrs.labelTarget = labelTarget;
  }

  return attrs;
}

Modeling.prototype.getMarkingLabelAttrs = function (labelTarget, cpnMarkingLabelElement, labelType) {
  var x = Math.round(cpnMarkingLabelElement._x);
  var y = Math.round(cpnMarkingLabelElement._y) * -1;

  // var text = '2`0@0,0\n2`0@0,0\n2`0@0,0\n2`0@0,0';
  var text = '';

  var bounds = { x: x, y: y, width: 200, height: 20 };
  bounds = this._textRenderer.getExternalLabelBounds(bounds, text);

  y -= bounds.height / 2;

  x += Math.round(labelTarget.x + labelTarget.width * 3);
  y += Math.round(labelTarget.y + labelTarget.height / 2);

  var hidden = text === '' || !(cpnMarkingLabelElement._hidden === 'false');

  var attrs = {
    type: CPN_MARKING_LABEL,
    id: CPN_MARKING_LABEL + '_' + labelTarget.labelTarget.id,
    cpnElement: cpnMarkingLabelElement,
    text: text,

    x: x,
    y: y,
    width: bounds.width,
    height: bounds.height,

    hidden: hidden
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
  cpnTransElement.posattr._x = x;
  cpnTransElement.posattr._y = -1 * y;

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
Modeling.prototype.createElementInModel = function (position, type) {
  let formCase = [];
  formCase[CPN_PLACE] = { form: 'ellipse', entry: ['initmark', 'type'] };
  formCase[CPN_TRANSITION] = { form: 'box', entry: ['time', 'code', 'priority', 'cond'] };
  formCase[CPN_CONNECTION] = { entry: ['annot'] };


  let names = [];
  names[CPN_PLACE] = 'P';
  names[CPN_TRANSITION] = 'T';

  let bounds = {
    x: position.x,
    y: position.y,
    width: 80, // 90,
    height: 30,
  };

  bounds = this._textRenderer.getExternalLabelBounds(bounds, 'Default');
  const newElement = {
    posattr: {
      _x: position.x, // -294.000000
      _y: -1 * position.y  // 156.000000
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
    text: names[type],
    token: {
      _x: 0,
      _y: 0
    },
    marking: {
      snap: {
        _snap_id: 9,
        '_anchor.horizontal': 1,
        '_anchor.vertical': 3
      },
      _x: 0,
      _y: 0,
      _hidden: true
    },
    _id: getNextId()
  };

  var x = newElement.posattr._x;
  var y = newElement.posattr._y;
  var w = bounds.width;
  var h = bounds.height;

  const defPos = {
    _x: x,
    _y: y
  };

  let relPos = [];

  let elemType = formCase[type];
  if (elemType) {
    if (elemType.form) {

      w = this.getDefaultValue(elemType.form).w;
      h = this.getDefaultValue(elemType.form).h;

      newElement[elemType.form] = {
        _w: w,
        _h: h
      };
    }

    relPos['initmark'] = { _x: x + w, _y: y + h / 2 };
    relPos['type'] = { _x: x + w, _y: y - h / 2 };

    relPos['time'] = { _x: x + w, _y: y + h / 2 };
    relPos['code'] = { _x: x + w, _y: y - h / 2 };
    relPos['cond'] = { _x: x - w, _y: y + h / 2 };
    relPos['priority'] = { _x: x - w, _y: y - h / 2 };


    for (let label of elemType.entry) {
      newElement[label] = {
        posattr: relPos[label] || defPos,
        // posattr: {
        //   _x: position.x + Math.round(bounds.width) / 2 + 100,//+ element.width, /// 55.500000,
        //   _y: -1 * position.y - Math.round(bounds.height) / 2 + 80 / 4 ///+ element.height / 4 // 102.000000
        // },
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


Modeling.prototype.createArcInModel = function (placeCpnElement, transCpnElement) {
  var cpnArcElement =
  {
    posattr: getDefPosattr(),
    fillattr: getDefFillattr(),
    lineattr: getDefLineattr(),
    textattr: getDefTextattr(),
    arrowattr: {
      _headsize: 1,
      _currentcyckle: 2
    },
    transend: {
      _idref: transCpnElement._id
    },
    placeend: {
      _idref: placeCpnElement._id
    },
    // bendpoint: {
    //   posattr: getDefPosattr(),
    //   fillattr: getDefFillattr(),
    //   lineattr: getDefLineattr(),
    //   textattr: getDefTextattr(),
    //   _id: getNextId() + 'b',
    //   _serial: "1"
    // },
    annot: {
      posattr: getDefPosattr(),
      fillattr: getDefFillattr(),
      lineattr: getDefLineattr(),
      textattr: getDefTextattr(),
      text: getDefText(),
      _id: getNextId() + 'a'
    },
    _id: getNextId(),
    _orientation: "BOTHDIR",
    _order: 1
  };

  return cpnArcElement;
}

function getDefPosattr() {
  return {
    _x: 0,
    _y: 0
  };
}

function getDefFillattr() {
  return {
    _colour: "White",
    _pattern: "Solid",
    _filled: "false"
  };
}

function getDefLineattr() {
  return {
    _colour: "Black",
    _thick: "1",
    _type: "Solid"
  };
}

function getDefTextattr() {
  return {
    _colour: "Black",
    _bold: "false"
  };
}

function getDefText() {
  return {
    _tool: "CPN Tools",
    _version: "4.0.1"
  };
}

function getNextId() {
  return 'ID' + new Date().getTime();
}
