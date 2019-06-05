import { values, assign } from 'min-dash';

import { getEnclosedElements } from 'diagram-js/lib/util/Elements';
import { isAny, CPN_PLACE, CPN_TRANSITION } from '../../util/ModelUtil';

var LOW_PRIORITY = 500,
  MEDIUM_PRIORITY = 1250,
  HIGH_PRIORITY = 1500;

export default function SelectionProvider(eventBus, elementRegistry, selection) {

  this._eventBus = eventBus;
  this._elementRegistry = elementRegistry;
  this._selection = selection;

  var self = this;

  // move selected elements
  eventBus.on('shape.move.start', HIGH_PRIORITY, function (event) {
    var selectedElements = self._elementRegistry.filter(function (element) { return element.selected; });
    // console.log('shape.move.start, selectedElements = ', selectedElements);

    var context = event.context,
      shape = event.shape,
      shapes = selectedElements;

    // move only single shape if the dragged element
    // is not part of the current selection
    if (shapes.indexOf(shape) === -1) {
      shapes = [shape];
    }

    // ensure we remove nested elements in the collection
    // and add attachers for a proper dragger
    // shapes = removeNested(shapes);

    // attach shapes to drag context
    assign(context, {
      shapes: shapes,
      validatedShapes: shapes,
      shape: shape
    });
  });

  // switch selected status if mouse click with CTRL button pressed
  eventBus.on('element.click', function (event) {
    if (event.element && event.originalEvent && event.originalEvent.ctrlKey) {
      // console.log('SelectionProvider(), element.click, event.element = ', event.element);

      if (event.element.id && event.element.id.includes('root')) {
        self.deselectAll();
      } else {
        self.selectElement(event.element, !event.element.selected);
      }
    }
  });

}

SelectionProvider.$inject = [
  'eventBus',
  'elementRegistry',
  'selection'
];

SelectionProvider.prototype.selectElement = function (element, selected) {
  if (isAny(element, [CPN_PLACE, CPN_TRANSITION])) {
    element.selected = selected;
    this._eventBus.fire('element.changed', { element: element });
  }
}

SelectionProvider.prototype.deselectAll = function () {
  var elements = this._elementRegistry.filter(function (element) { return element; });
  for (const e of elements) {
    this._selection.deselect(e);
    this.selectElement(e, undefined);
  }
}

SelectionProvider.prototype.selectElements = function (elements, selected) {
  for (const e of elements) {
    this.selectElement(e, selected);
  }
};


