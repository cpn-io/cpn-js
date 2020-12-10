import { values, assign } from "min-dash";

import { getEnclosedElements } from "diagram-js/lib/util/Elements";
import {isAny, is, CPN_PLACE, CPN_TRANSITION, CPN_CONNECTION} from "../../util/ModelUtil";
import { getNextId } from "../modeling/CpnElementFactory";

var LOW_PRIORITY = 500,
  MEDIUM_PRIORITY = 1250,
  HIGH_PRIORITY = 1500;

export default function SelectionProvider(
  eventBus,
  elementRegistry,
  modeling,
  selection,
  cpnFactory
) {
  this._eventBus = eventBus;
  this._elementRegistry = elementRegistry;
  this._modeling = modeling;
  this._selection = selection;
  this._cpnFactory = cpnFactory;

  var self = this;

  // move selected elements
  eventBus.on("shape.move.start", HIGH_PRIORITY, function (event) {
    var selectedElements = self._elementRegistry.filter(function (element) {
      return element.selected;
    });
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
      shape: shape,
    });
  });

  // switch selected status if mouse click with CTRL button pressed
  eventBus.on("element.click", function (event) {
    if (event.element && event.originalEvent && event.originalEvent.ctrlKey) {
      // console.log('SelectionProvider(), element.click, event.element = ', event.element);

      if (event.element.id && event.element.id.includes("root")) {
        self.deselectAll();
      } else {
        self.selectElement(event.element, !event.element.selected);
      }
    }
  });
}

SelectionProvider.$inject = [
  "eventBus",
  "elementRegistry",
  "modeling",
  "selection",
  "cpnFactory"
];

SelectionProvider.prototype.selectElement = function (element, selected) {
  if (isAny(element, [CPN_PLACE, CPN_TRANSITION, CPN_CONNECTION])) {
    if (element.selected !== selected || is(element, CPN_CONNECTION)) {
      if(!is(element, CPN_CONNECTION))
          element.selected = selected;
      this._eventBus.fire("element.changed", { element: element });
      this._eventBus.fire("element.selection.changed", {});
    }
  }
};

SelectionProvider.prototype.deselectAll = function () {
  var elements = this._elementRegistry.filter(function (element) {
    return element;
  });
  for (const e of elements) {
    this._selection.deselect(e);
    this.selectElement(e, undefined);
  }
};

SelectionProvider.prototype.selectElements = function (elements, selected) {
  for (const e of elements) {
    this.selectElement(e, selected);
  }
};

SelectionProvider.prototype.getSelectedElements = function () {
  var selectedElements = this._elementRegistry.filter(function (e) {
    return e.selected;
  });
  return selectedElements || [];
};

SelectionProvider.prototype.extractSubpage = function () {
  this._cpnFactory.extractSubpage();
};
