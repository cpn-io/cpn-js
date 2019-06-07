import { CPN_CONNECTION, CPN_PLACE, CPN_TRANSITION, is, isAny } from '../../util/ModelUtil';

/**
 * A example context pad provider.
 */
export default function CpnContextPadProvider(connect, contextPad, modeling, cpnFactory, eventBus) {
  this._connect = connect;
  this._contextPad = contextPad;
  this._cpnFactory = cpnFactory;
  this._modeling = modeling;
  this._eventBus = eventBus;

  this._currentElement = undefined;

  contextPad.registerProvider(this);

  eventBus.on('contextPad.close', (event) => {
    console.log('CpnContextPadProvider(), contextPad.close, event = ', event);

    this._currentElement = undefined;
  });
}

CpnContextPadProvider.$inject = [
  'connect',
  'contextPad',
  'modeling',
  'cpnFactory',
  'eventBus'
];


CpnContextPadProvider.prototype.getContextPadEntries = function (element) {
  const self = this;

  const connect = this._connect;
  const modeling = this._modeling;
  const contextPad = this._contextPad;

  this._currentElement = element;

  console.log('CpnPopupMenuProvider() CpnContextPadProvider.prototype.getContextPadEntries(), this._currentElement = ', this._currentElement);

  function removeElement() {
    contextPad.close();
    
    let forDelete = modeling.getShapeArcs(element);
    forDelete.push(element);
    modeling.removeElements(forDelete);
  }

  function startConnect(event, element, autoActivate) {
    contextPad.close();
    connect.start(event, element, autoActivate);
  }

  const deleteEntry = {
    group: 'delete',
    className: 'bpmn-icon-trash',
    title: 'Remove',
    action: {
      click: removeElement,
      dragstart: removeElement
    }
  };
  const connectEntry = {
    group: 'connect',
    className: 'bpmn-icon-connection',
    title: 'Connect',
    action: {
      click: startConnect,
      dragstart: startConnect
    }
  };
  const newPlaceEntry = {
    group: 'new-place',
    className: 'bpmn-icon-start-event-none',
    title: 'New Place',
    action: {
      click: function () { self._createShape(event, CPN_PLACE) },
    }
  };
  const newTransitionEntry = {
    group: 'new-transition',
    className: 'bpmn-icon-task',
    title: 'New Transition',
    action: {
      click: function () { self._createShape(event, CPN_TRANSITION) },
    }
  };


  if (is(element, CPN_CONNECTION))
    return {
      'delete': deleteEntry
    };

  if (is(element, CPN_PLACE))
    return {
      'new-transition': newTransitionEntry,
      'connect': connectEntry,
      'delete': deleteEntry,
    };

  if (is(element, CPN_TRANSITION))
    return {
      'new-place': newPlaceEntry,
      'connect': connectEntry,
      'delete': deleteEntry,
    };

  return null;
};

CpnContextPadProvider.prototype._createShape = function (event, type) {
  console.log('CpnPopupMenuProvider.prototype._createPlace, this.position = ', this._position);

  const contextPad = this._contextPad;
  const currentElement = this._currentElement;
  const modeling = this._modeling;

  contextPad.close();
  let arcElement = undefined;
  if (currentElement) {
    const position = {
      x: currentElement.x + currentElement.width + 150,
      y: currentElement.y + currentElement.height / 2,
    };
    const element = this._cpnFactory.createShape(undefined, undefined, type, position, true);

    var placeShape;
    var transShape;

    if (is(element, CPN_PLACE)) placeShape = element;
    if (is(element, CPN_TRANSITION)) transShape = element;
    if (is(currentElement, CPN_PLACE)) placeShape = currentElement;
    if (is(currentElement, CPN_TRANSITION)) transShape = currentElement;


    if (placeShape && transShape) {
      arcElement = modeling.createNewConnection(placeShape, transShape, type === CPN_PLACE ? 'TtoP' : 'PtoT');
    }

    let elemArr = [];
    elemArr.push(element);
    if (arcElement) elemArr.push(arcElement);

    this._eventBus.fire('shape.create.end', { elements: elemArr });
    this._eventBus.fire('shape.editing.activate', { shape: element });
    this._eventBus.fire('shape.contextpad.activate', { shape: element });
  }

  return arcElement;
}
