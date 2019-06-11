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
  modelCase,
  CPN_TEXT_ANNOTATION,
} from '../../util/ModelUtil';

import { getText, getBox } from '../../draw/CpnRenderUtil';

import {
  getDefPosattr,
  getDefFillattr,
  getDefLineattr,
  getDefTextattr,
  getDefText,
  getNextId,
  getDefTransition,
  getDefAux,
  getDefPlace,
  updateLabelsPosition,
  setDefaultValue,
  getDefaultValue,
  getDefArc,
  getDefSubst
} from './CpnElementFactory';

/**
 * CPN modeling features activator
 *
 * @param {EventBus} eventBus
 * @param {ElementFactory} elementFactory
 * @param {CommandStack} commandStack
 * @param {CpnRules} cpnRules
 */
export default function Modeling(eventBus, elementFactory, elementRegistry, commandStack, cpnRules, textRenderer, canvas, portMenuProvider) {
  // console.log('Modeling()');

  BaseModeling.call(this, eventBus, elementFactory, commandStack);

  // eventBus.on('bind.port.cancel', (event) => {
  //   if (event.connection) {
  //       this.removeElements([event.connection]);
  //   }
  // });

  this._eventBus = eventBus;
  this._elementFactory = elementFactory;
  this._elementRegistry = elementRegistry;
  this._cpnRules = cpnRules;
  this._textRenderer = textRenderer;
  this._canvas = canvas;
  this._portMenuProvider = portMenuProvider;
}

inherits(Modeling, BaseModeling);

Modeling.$inject = [
  'eventBus',
  'elementFactory',
  'elementRegistry',
  'commandStack',
  'cpnRules',
  'textRenderer',
  'canvas',
  'portMenuProvider'
];


Modeling.prototype.getHandlers = function () {
  // console.log('Modeling().getHandlers()');

  var handlers = BaseModeling.prototype.getHandlers.call(this);

  handlers['element.updateLabel'] = UpdateLabelHandler;

  return handlers;
};

Modeling.prototype.updateLabel = function (element, newLabel, newBounds, hints) {
  // console.log('Modeling().updateLabel(), newBounds = ', newBounds);

  if (newBounds) {
    if (newBounds.width < 10)
      newBounds.width = 10;

    this._commandStack.execute('element.updateLabel', {
      element: element,
      newLabel: newLabel,
      newBounds: newBounds,
      hints: hints || {}
    });
  }
};

Modeling.prototype.updateElement = function (element, repaint = false) {
  // console.log('Modeling().updateElement(), element = ', element);

  if (element) {
    if (element.labels) {
      for (const lb of element.labels) {
        this.updateElement(lb, repaint);
      }
    }

    this.updateShapeByCpnElement(element, this._canvas, this._eventBus);

    if (repaint) {
      this.updateElementBounds(element);
      this.repaintElement(element);
    }
  }
};

Modeling.prototype.repaintElement = function (element) {
  this._eventBus.fire('element.changed', { element: element });
}

Modeling.prototype.repaintElements = function () {
  var elements = this._elementRegistry.filter(function (element) { return element; });
  for (const e of elements) {
    this.repaintElement(e);
  }
}


Modeling.prototype.updateElementBounds = function (element) {
  if (element && element.labels) {
    for (const l of element.labels) {
      if (l.type !== CPN_TOKEN_LABEL && l.type !== CPN_MARKING_LABEL && (l.text || l.name)) {
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
Modeling.prototype.updateShapeByCpnElement = function (element, canvas, eventBus) {

  // console.log('Modeling().updateShapeByCpnElement(), element = ', element);

  // Update port for Place
  if (is(element, CPN_PLACE)) {
    let portLabel;

    // try to find port label for Place
    for (let l of element.labels) {
      if (l.labelType === 'port') {
        portLabel = l;
        break;
      }
    }

    // console.log('updateShapeByCpnElement(CPN_PLACE), element = ', element);

    if (portLabel && !element.cpnElement.port) {
      // delete port label from element children
      this.removeElements([portLabel]);
    } else
      if (!portLabel && element.cpnElement.port) {
        // create port label for element
        const attrs = this.getLabelAttrs(element, element.cpnElement.port, 'port');

        // console.log('updateShapeByCpnElement(CPN_PLACE), element.cpnElement.port = ', element.cpnElement.port);

        const label = this._elementFactory.createLabel(attrs);
        this._canvas.addShape(label, this._canvas.getRootElement());
      }

    // try to find port label for Place
    // for (let l of element.labels) {
    //   this.updateShapeByCpnElement(l, canvas, eventBus);
    // }

  }

  // Update subst for Transition
  if (is(element, CPN_TRANSITION)) {
    let substLabel;

    // try to find subst label for transition
    for (let l of element.labels) {
      if (l.labelType === 'subst') {
        substLabel = l;
        break;
      }
    }

    if (substLabel && !element.cpnElement.subst) {
      // delete port label from element children
      this.removeElements([substLabel]);
    } else
      if (!substLabel && element.cpnElement.subst) {
        // create subst label for element
        const attrs = this.getLabelAttrs(element, element.cpnElement['subst'].subpageinfo, 'subst');
        const label = this._elementFactory.createLabel(attrs);
        this._canvas.addShape(label, this._canvas.getRootElement());
      }
  }



  const self = this;

  if (element.type === CPN_LABEL && (element.text || element.name)) {
    // element.hidden = false;
  }

  const changeName = (modeling, changingElement) => {
    if (!changingElement || !changingElement.cpnElement)
      return;

    const cpnElement = changingElement.cpnElement;

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

  const changePosition = (modeling, changingElement) => {

    if (!changingElement || !changingElement.cpnElement)
      return;
    if (!isAny(changingElement, [CPN_PLACE, CPN_TRANSITION, CPN_TEXT_ANNOTATION]))
      return;

    let delta = { x: 0, y: 0 };
    let changingCpnEntry = changingElement.cpnElement.posattr ? changingElement.cpnElement.posattr : changingElement.cpnElement;

    if (changingCpnEntry && changingCpnEntry._x && changingCpnEntry._y) {
      let x = 1 * (changingCpnEntry._x);
      let y = -1 * (changingCpnEntry._y);

      // if (is(changingElement, CPN_LABEL)) {
      //   var bounds = { x: x, y: y, width: 200, height: 20 };
      //   var text = changingElement.text;
      //   var defaultValue = changingElement.defaultValue;
      //   bounds = self._textRenderer.getExternalLabelBounds(bounds, defaultValue && text.trim() === '' ? defaultValue : text);

      //   x -= bounds.width / 2;
      //   y -= bounds.height / 2;
      // }

      delta.x = x - changingElement.x;
      delta.y = y - changingElement.y;

      if (!isNaN(delta.x) && !isNaN(delta.y) && (delta.x !== 0 || delta.y !== 0)) {
        for (let label of element.labels) {
          label.x += delta.x;
          label.y += delta.y;
        }

        // console.log('Modeling.updateShapeByCpnElement(), changePosition(), changingElement = ', changingElement, ', delta = ', delta);

        modeling.moveShape(changingElement, delta);
      }
    }
  };

  const changeSize = (modeling, changingElement) => {
    if (!changingElement || !changingElement.cpnElement)
      return;

    if (!isAny(changingElement, [CPN_PLACE, CPN_TRANSITION, CPN_TEXT_ANNOTATION]))
      return;

    // console.log('Modeling.updateShapeByCpnElement(), changeSize(), changingElement = ', changingElement);

    let delta = { dx: 0, dy: 0 };

    let changingCpnEntry = changingElement.cpnElement.ellipse ?
      changingElement.cpnElement.ellipse :
      changingElement.cpnElement.box;

    if (changingCpnEntry && changingCpnEntry._w && changingCpnEntry._h) {

      let w = 1 * (changingCpnEntry._w);
      let h = 1 * (changingCpnEntry._h);
      delta.dx = w - changingElement.width;
      delta.dy = h - changingElement.height;

      if (!isNaN(delta.dx) && !isNaN(delta.dy) && (delta.dx !== 0 || delta.dy !== 0)) {
        // for (let label of element.labels) {
        //   label.x += delta.x;
        //   label.y += delta.y;
        // }

        changingElement.width += delta.dx;
        changingElement.height += delta.dy;

        // console.log('Modeling.updateShapeByCpnElement(), changeSize(), changingElement = ', changingElement, ', delta = ', delta);

        modeling.moveShape(changingElement, { x: -delta.dx / 2, y: -delta.dy / 2 });
      }
    }


    // if (cpnElement.ellipse || cpnElement.box) {
    //   element.width = parseInt(cpnElement[form]._w, 10);
    //   element.height = parseInt(cpnElement[form]._h, 10);
    // }
  }

  if (element.type === CPN_CONNECTION) {
    element.orientation = element.cpnElement._orientation;
  }

  changeName(this, element);

  // changeSize(this, element);

  // changePosition(this, element);

  // console.log('Modeling.updateShapeByCpnElement(), element = ', element);
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

    // if (is(source, CPN_PLACE)) placeShape = source;
    // if (is(target, CPN_PLACE)) placeShape = target;
    // if (is(source, CPN_TRANSITION)) transShape = source;
    // if (is(target, CPN_TRANSITION)) transShape = target;

    var orientation;
    if (is(source, CPN_PLACE)) {
      placeShape = source;
      transShape = target;
      orientation = 'PtoT';
    } else {
      placeShape = target;
      transShape = source;
      orientation = 'TtoP';
    }

    if (placeShape && transShape) {
      const conElem = this.createNewConnection(placeShape, transShape, orientation);

      if (conElem) {
        this._eventBus.fire('shape.create.end', { elements: [conElem] });
      }

      // this._eventBus.fire('shape.editing.activate', {shape: conElem});
      // this._eventBus.fire('shape.contextpad.activate', {shape: conElem});

      //openPortProvider(this._portMenuProvider, transShape);
      //this._portMenuProvider.open(transShape, { cursor: { x: 609, y: 575 } });
      // openPortMenu(this._eventBus, transShape, placeShape, conElem, orientation);

      return conElem;
    }
  }

  return undefined;
};


function openPortMenu(eventBus, transShape, placeShape, conElem, orientation) {
  if (transShape.cpnElement.subst)
    eventBus.fire('portMenuProvider.open', {
      trans: transShape,
      place: placeShape,
      arc: conElem,
      portType: orientation === 'PtoT' ? 'In' : 'Out',
      position: {
        cursor: orientation === 'PtoT'
          ? { x: transShape.x, y: transShape.y }
          : { x: placeShape.x, y: placeShape.y }
      }
    });
}


function openPortProvider(portMenuProvider, trnsShape) {
  portMenuProvider.open(transShape, { cursor: { x: 609, y: 575 } });
}

Modeling.prototype.createNewConnection = function (placeShape, transShape, orientation) {
  // console.log('Modeling.prototype.createNewConnection(), place = ', placeShape);
  // console.log('Modeling.prototype.createNewConnection(), trans = ', transShape);

  const modeling = this;
  var root = this._canvas.getRootElement();

  if (placeShape && transShape && placeShape.cpnElement && transShape.cpnElement) {
    var pageObject = undefined;
    var cpnElement = this.createArcCpnElement(placeShape.cpnElement, transShape.cpnElement, orientation);
    console.log('createNewConnection(), getDefArc(), (1) cpnElement.annot = ', JSON.stringify(cpnElement.annot));

    const data = this.getArcData(pageObject, cpnElement, CPN_CONNECTION, placeShape, transShape);

    console.log('createNewConnection(), getDefArc(), (2) cpnElement.annot = ', JSON.stringify(cpnElement.annot));

    if (data) {
      var connection = this.connect(data.source, data.target, data.attrs, null);

      console.log('createNewConnection(), getDefArc(), (3) cpnElement.annot = ', JSON.stringify(cpnElement.annot));

      if (connection) {
        if (cpnElement.annot) {
          var attrs = this.getLabelAttrs(connection, cpnElement.annot, 'annot');

          console.log('createNewConnection(), getDefArc(), annot attrs = ', attrs);

          var label = this._elementFactory.createLabel(attrs);
          this._canvas.addShape(label, root);

          modeling.moveShape(label, { x: -35, y: 10 });
        }
      }

      // openPortMenu(this._eventBus, transShape, placeShape, connection, connection.cpnElement._orientation);

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

Modeling.prototype.getElementsByCpnElementIds = function (cpnElementIdList) {
  const result = [];

  for (const key of Object.keys(this._elementRegistry._elements)) {
    const element = this._elementRegistry._elements[key].element;

    if (element && element.cpnElement && cpnElementIdList.includes(element.cpnElement._id)) {
      result[element.cpnElement._id] = element;
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
  // console.log('Modeling.prototype.clearErrorMarking(), elements = ', elements);

  for (const key of Object.keys(elements)) {
    // console.log('Modeling.prototype.clearErrorMarking(), key = ', key);
    // console.log('Modeling.prototype.clearErrorMarking(), elements[key] = ', elements[key]);

    const element = elements[key].element;

    if (isCpn(element)) {
      element.iserror = false;
      this.updateElement(element);
    }
  }
};


Modeling.prototype.setDefaultValue = function (key, value) {
  // console.log('Modeling.prototype.setDefaultValue(), defaultValues = ', defaultValues);
  setDefaultValue(key, value);
}

Modeling.prototype.getDefaultValue = function (key) {
  // console.log('Modeling.prototype.getDefaultValue(), defaultValues = ', defaultValues);
  return getDefaultValue(key);
}

Modeling.prototype.getPlaceAttrs = function (cpnPlaceElement, type) {
  var x = 1 * (cpnPlaceElement.posattr._x);
  var y = -1 * (cpnPlaceElement.posattr._y);
  var w = 1 * (cpnPlaceElement.ellipse._w);
  var h = 1 * (cpnPlaceElement.ellipse._h);
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
  var x = 1 * (cpnLabelElement.posattr._x);
  var y = -1 * (cpnLabelElement.posattr._y);

  var text, defaultValue;

  // check if cpnLabelElement doesn't have text attr
  // console.log('Modeling.prototype.getLabelAttrs(), cpnLabelElement = ', cpnLabelElement);
  // if (!cpnLabelElement.text || !(typeof cpnLabelElement.text !== 'object')) {
  //   cpnLabelElement.text = getDefText('');
  // }

  if (labelType === 'port')
    text = (cpnLabelElement._type === 'I/O') ? 'In/Out' : cpnLabelElement._type;
  else if (labelType === 'subst')
    text = cpnLabelElement._name; // for subst label
  else if (labelType === 'aux')
    text = cpnLabelElement.text; // for aux label
  else if (cpnLabelElement.text)
    text = cpnLabelElement.text.__text; // for shape external label

  // console.log('Modeling.prototype.getLabelAttrs(), text = ', text);

  // if label is empty check for default values
  if (labelType) {
    defaultValue = this.getDefaultValue(labelType);
    // console.log('Modeling.prototype.getLabelAttrs(), defualt text = ', defaultValue);
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

  // if (labelType === 'port')
  //   console.log('Modeling.prototype.getLabelAttrs(), text = ', text);

  return attrs;
}

Modeling.prototype.getTokenLabelAttrs = function (labelTarget, cpnTokenLabelElement, labelType) {
  var x = 1 * (cpnTokenLabelElement._x);
  var y = -1 * (cpnTokenLabelElement._y);

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

  x += 1 * (labelTarget.x + labelTarget.width);
  y += 1 * (labelTarget.y + labelTarget.height / 2);

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
  var x = 1 * (cpnMarkingLabelElement._x);
  var y = -1 * (cpnMarkingLabelElement._y);

  // var text = '2`0@0,0\n2`0@0,0\n2`0@0,0\n2`0@0,0';
  var text = '';

  var bounds = { x: x, y: y, width: 200, height: 20 };
  bounds = this._textRenderer.getExternalLabelBounds(bounds, text);

  y -= bounds.height / 2;

  x += 1 * (labelTarget.x + labelTarget.width * 3);
  y += 1 * (labelTarget.y + labelTarget.height / 2);

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
  var x = 1 * (cpnTransElement.posattr._x);
  var y = -1 * (cpnTransElement.posattr._y);
  var w = 1 * (cpnTransElement.box._w);
  var h = 1 * (cpnTransElement.box._h);
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
        x: 1 * (cpnArcElement.bendpoint.posattr._x),
        y: -1 * (cpnArcElement.bendpoint.posattr._y),
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
          x: 1 * (p.posattr._x),
          y: -1 * (p.posattr._y),
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
  else if (this._elementRegistry) {

    for (const key of Object.keys(this._elementRegistry._elements)) {
      const element = this._elementRegistry._elements[key].element;
      if (element.type === CPN_CONNECTION && element.cpnElement) {
        const arc = element.cpnElement;
        if (cpnArcElement._id !== arc._id &&
          ((cpnArcElement.placeend._idref === arc.transend._idref && cpnArcElement.transend._idref === arc.placeend._idref) ||
            (cpnArcElement.placeend._idref === arc.placeend._idref && cpnArcElement.transend._idref === arc.transend._idref))) {
          waypoints = optimiseEqualsArcsByWayoints(waypoints, source.width / 8);
        }
      }
    }

  }


  //разделение совпадающих стрелок
  for (const key of Object.keys(this._elementRegistry._elements)) {
    const element = this._elementRegistry._elements[key].element;
    if (element.type === CPN_CONNECTION) {
      if (isEqualsWaypoints(element.waypoints, waypoints)) {
        for (let point of waypoints) {
          point.x = point.y + 15;
        }
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



function isEqualsWaypoints(exArcWapoints, newArcWaypoints) {
  const lenghtExArc = exArcWapoints.length - 1;
  const lenghtNewArc = newArcWaypoints.length - 1;
  return exArcWapoints[0].x === newArcWaypoints[0].x && exArcWapoints[0].y === newArcWaypoints[0].y && exArcWapoints[lenghtExArc].x === newArcWaypoints[lenghtNewArc].x && exArcWapoints[lenghtExArc].y === newArcWaypoints[lenghtNewArc].y ||
    exArcWapoints[0].x === newArcWaypoints[lenghtNewArc].x && exArcWapoints[0].y === newArcWaypoints[lenghtNewArc].y && exArcWapoints[lenghtExArc].x === newArcWaypoints[0].x && exArcWapoints[lenghtExArc].y === newArcWaypoints[0].y
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

Modeling.prototype.declareSubPage = function (cpnElement, name, pageId) {

  cpnElement.subst = getDefSubst(cpnElement, name, pageId);
  return cpnElement;
}

Modeling.prototype.changeTransitionSubPageLabel = function (id, name) {
  for (const key of Object.keys(this._elementRegistry._elements)) {
    if (this._elementRegistry._elements[key]) {
      const element = this._elementRegistry._elements[key].element;
      if (element.type === CPN_TRANSITION && element.cpnElement.subst && element.cpnElement.subst._subpage === id) {
        element.cpnElement.subst.subpageinfo._name = name;
        element.cpnElement.subst.subpageinfo.text = name;
        this.updateElement(element, true);
        break;
      }
    }
  }
}

/**
 * saving the created place in the model json
 *
 * @param element
 */
Modeling.prototype.createShapeCpnElement = function (position, type) {

  let newElement;

  switch (type) {
    case CPN_PLACE:
      newElement = getDefPlace('P', position);
      break;
    case CPN_TRANSITION:
      newElement = getDefTransition('T', position);
      break;
    case CPN_TEXT_ANNOTATION:
      newElement = getDefAux('Text', position);
      break;
  }

  updateLabelsPosition(this._textRenderer, newElement);

  return newElement;
}


Modeling.prototype.createArcCpnElement = function (placeCpnElement, transCpnElement, orientation) {
  return getDefArc(placeCpnElement, transCpnElement, orientation);
}

Modeling.prototype.reconnectEnd = function (connection, newTarget, dockingOrPoints) {
  console.log('Modeling.prototype.reconnectEnd ---')
  var context = {
    connection: connection,
    newTarget: newTarget,
    dockingOrPoints: dockingOrPoints
  };
  this.excuteReconectionCommand('connection.reconnectEnd', context)
};


Modeling.prototype.reconnectStart = function (connection, newSource, dockingOrPoints) {
  var context = {
    connection: connection,
    newTarget: newSource,
    dockingOrPoints: dockingOrPoints
  };

  this.excuteReconectionCommand('connection.reconnectStart', context);
};


Modeling.prototype.excuteReconectionCommand = function (command, context) {
  if (context.connection.cpnElement && context.newTarget.type === (context.connection.cpnElement._orientation === 'TtoP' ? CPN_PLACE : CPN_TRANSITION))
    this._commandStack.execute('connection.reconnectEnd', context);
  else this.updateElement(context.connection, true);
}


Modeling.prototype.removeElements = function (elements) {
  var context = {
    elements: elements
  };

  this._eventBus.fire('shape.delete', { elements: elements });
  this._commandStack.execute('elements.delete', context);
};


Modeling.prototype.deleteSubPageTrans = function(id){
    const trans = this.getTransitionByPage(id);
    if(trans) {
      delete trans.cpnElement.subst;
      this.updateElement(trans, true);
    }

}

Modeling.prototype.getShapeArcs = function (shape) {
  let arcs = [];
  for (const key of Object.keys(this._elementRegistry._elements)) {
    if (this._elementRegistry._elements[key]) {
      const element = this._elementRegistry._elements[key].element;
      if (element.type === CPN_CONNECTION && element.cpnElement) {
        if (element.cpnElement && element.cpnElement.transend._idref === shape.id || element.cpnElement.placeend._idref === shape.id) {
          arcs.push(element);
        }
      }
    }
  }
  return arcs;
}


Modeling.prototype.getTransitionByPage = function(id) {
  for (const key of Object.keys(this._elementRegistry._elements)) {
    if (this._elementRegistry._elements[key]) {
      const element = this._elementRegistry._elements[key].element;
      if (element.type === CPN_TRANSITION && element.cpnElement.subst && element.cpnElement.subst._subpage === id) {
          return element;
      }
    }
  }
}







