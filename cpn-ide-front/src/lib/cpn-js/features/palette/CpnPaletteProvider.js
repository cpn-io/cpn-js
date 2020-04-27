import { CPN_PLACE, CPN_TRANSITION, is } from "../../util/ModelUtil";
import { getNextId } from "../modeling/CpnElementFactory";

/**
 * A example palette provider.
 */
export default function CpnPaletteProvider(
  create,
  elementFactory,
  elementRegistry,
  cpnFactory,
  lassoTool,
  globalConnect,
  palette,
  eventBus,
  modeling,
  dragging
) {
  this._create = create;
  this._elementFactory = elementFactory;
  this._elementRegistry = elementRegistry;
  this._cpnFactory = cpnFactory;
  this._lassoTool = lassoTool;
  this._globalConnect = globalConnect;
  this._palette = palette;
  this._eventBus = eventBus;
  this._dragging = dragging;
  this._modeling = modeling;

  palette.registerProvider(this);
}

CpnPaletteProvider.$inject = [
  "create",
  "elementFactory",
  "elementRegistry",
  "cpnFactory",
  "lassoTool",
  "globalConnect",
  "palette",
  "eventBus",
  "modeling",
  "dragging",
];

CpnPaletteProvider.prototype.getPaletteEntries = function () {
  const self = this;

  const eventBus = this._eventBus;
  const lassoTool = this._lassoTool;
  const modeling = this._modeling;
  const elementRegistry = this._elementRegistry;
  const cpnFactory = this._cpnFactory;

  /**
   * Remove selected elements
   */
  function removeElements() {
    this._modeling.removeSelectedElements();
    // const selectedElements = elementRegistry.filter(function (element) {
    //   return element.selected;
    // });

    // for (const element of selectedElements) {
    //   const forDelete = modeling.getShapeArcs(element);
    //   forDelete.push(element);
    //   modeling.removeElements(forDelete);
    // }
  }

  function extractSubpage() {
    this._cpnFactory.extractSubpage();
  }

  const selectedElements = elementRegistry.filter(function (element) {
    return element.selected;
  });
  const hasSelectedItems = selectedElements && selectedElements.length > 0;

  if (!this._modeling.isEditable()) {
    return undefined;
  }

  const entries = {};
  entries["lasso-tool"] = {
    group: "tools",
    className: "bpmn-icon-lasso-tool",
    title: "Activate Lasso Tool",
    action: {
      click: function (event) {
        lassoTool.activateSelection(event);
      },
    },
  };

  // if (hasSelectedItems) {
  entries["subst-tool"] = {
    group: "tools",
    className: "bpmn-icon-subprocess-expanded",
    title: "Move selected elements to subpage",
    action: { click: extractSubpage },
  };
  entries["delete-tool"] = {
    group: "tools",
    className: "bpmn-icon-trash",
    title: "Remove selected elements",
    action: { click: removeElements },
  };
  // }

  return entries;
};

CpnPaletteProvider.prototype._createPlace = function (event) {
  const shape = this._cpnFactory.createShape(
    undefined,
    undefined,
    CPN_PLACE,
    undefined,
    false
  );
  this._create.start(event, shape);
};

CpnPaletteProvider.prototype._createTransition = function (event) {
  const shape = this._cpnFactory.createShape(
    undefined,
    undefined,
    CPN_TRANSITION,
    undefined,
    false
  );
  this._create.start(event, shape);
};
