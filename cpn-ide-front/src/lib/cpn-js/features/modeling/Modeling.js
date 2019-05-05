import inherits from 'inherits';

import BaseModeling from 'diagram-js/lib/features/modeling/Modeling';

import UpdateLabelHandler from '../label-editing/cmd/UpdateLabelHandler';

import {
  isCpn,
} from '../../util/ModelUtil';

/**
 * CPN modeling features activator
 *
 * @param {EventBus} eventBus
 * @param {ElementFactory} elementFactory
 * @param {CommandStack} commandStack
 * @param {CpnRules} cpnRules
 */
export default function Modeling(eventBus, elementFactory, elementRegistry, commandStack, cpnRules) {
  console.log('Modeling()');

  BaseModeling.call(this, eventBus, elementFactory, commandStack);

  this._eventBus = eventBus;
  this._cpnRules = cpnRules;
  this._elementRegistry = elementRegistry;

  this._defaultValues = [];
}

inherits(Modeling, BaseModeling);

Modeling.$inject = [
  'eventBus',
  'elementFactory',
  'elementRegistry',
  'commandStack',
  'cpnRules'
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

