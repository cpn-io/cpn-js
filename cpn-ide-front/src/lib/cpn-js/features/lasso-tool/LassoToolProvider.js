import { values } from 'min-dash';

import { getEnclosedElements } from 'diagram-js/lib/util/Elements';
import { isAny, CPN_PLACE, CPN_TRANSITION } from '../../util/ModelUtil';

export default function LassoToolProvider(eventBus, elementRegistry, selection, selectionProvider) {

  this._eventBus = eventBus;
  this._elementRegistry = elementRegistry;
  this._selection = selection;
  this._selectionProvider = selectionProvider;

  var self = this;

  eventBus.on('lasso.end', function (event) {

    console.log('LassoToolProvider. lasso.end, event = ', event);

    // var bbox = toBBox(event);

    // self.select(elements, bbox);
    self.deselect();
  });

}

LassoToolProvider.$inject = [
  'eventBus',
  'elementRegistry',
  'selection',
  'selectionProvider'
];

LassoToolProvider.prototype.select = function (elements, bbox) {
  var selectedElements = getEnclosedElements(elements, bbox);

  this._selection.select(values(selectedElements));
};

LassoToolProvider.prototype.deselect = function () {
  // console.log('LassoToolProvider. deselect, this._selection.get() = ', this._selection.get());

  const selectedElements = [];
  for (const e of this._selection.get()) {
    selectedElements.push(e);
  }

  this._selectionProvider.deselectAll();
  this._selectionProvider.selectElements(selectedElements, true);
};

function toBBox(event) {

  var start = {

    x: event.x - event.dx,
    y: event.y - event.dy
  };

  var end = {
    x: event.x,
    y: event.y
  };

  var bbox;

  if ((start.x <= end.x && start.y < end.y) ||
    (start.x < end.x && start.y <= end.y)) {

    bbox = {
      x: start.x,
      y: start.y,
      width: end.x - start.x,
      height: end.y - start.y
    };
  } else if ((start.x >= end.x && start.y < end.y) ||
    (start.x > end.x && start.y <= end.y)) {

    bbox = {
      x: end.x,
      y: start.y,
      width: start.x - end.x,
      height: end.y - start.y
    };
  } else if ((start.x <= end.x && start.y > end.y) ||
    (start.x < end.x && start.y >= end.y)) {

    bbox = {
      x: start.x,
      y: end.y,
      width: end.x - start.x,
      height: start.y - end.y
    };
  } else if ((start.x >= end.x && start.y > end.y) ||
    (start.x > end.x && start.y >= end.y)) {

    bbox = {
      x: end.x,
      y: end.y,
      width: start.x - end.x,
      height: start.y - end.y
    };
  } else {

    bbox = {
      x: end.x,
      y: end.y,
      width: 0,
      height: 0
    };
  }
  return bbox;
}
