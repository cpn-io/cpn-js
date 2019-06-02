import { values } from 'min-dash';

import { getEnclosedElements } from 'diagram-js/lib/util/Elements';
import { isAny, CPN_PLACE, CPN_TRANSITION } from '../../util/ModelUtil';

export default function LassoToolProvider(eventBus, elementRegistry, selection) {

  this._eventBus = eventBus;
  this._elementRegistry = elementRegistry;
  this._selection = selection;

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
  'selection'
];

LassoToolProvider.prototype.select = function (elements, bbox) {
  var selectedElements = getEnclosedElements(elements, bbox);

  this._selection.select(values(selectedElements));
};

LassoToolProvider.prototype.deselect = function () {
  // const selectedElements = this._selection.get();

  console.log('LassoToolProvider. deselect, this._selection.get() = ', this._selection.get());


  const selectedElements = [];
  for (const e of this._selection.get()) {
    selectedElements.push(e);
  }

  var elements = this._elementRegistry.filter(function (element) { return element; });
  for (const e of elements) {
    this._selection.deselect(e);
    if (isAny(e, [CPN_PLACE, CPN_TRANSITION])) {
      e.selected = undefined;
      this._eventBus.fire('element.changed', { element: e });
    }
  }

  for (const e of selectedElements) {
    if (isAny(e, [CPN_PLACE, CPN_TRANSITION])) {
      e.selected = true;
      this._eventBus.fire('element.changed', { element: e });
    }
  }

  console.log('LassoToolProvider. deselect, this._selection.get() = ', this._selection.get());
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
