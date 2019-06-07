import { CPN_PLACE, CPN_TRANSITION, is } from "../../util/ModelUtil";

/**
 * A example palette provider.
 */
export default function CpnPaletteProvider(create, elementFactory, elementRegistry, cpnFactory, lassoTool,
  globalConnect, palette, eventBus, modeling, dragging) {
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
  'create',
  'elementFactory',
  'elementRegistry',
  'cpnFactory',
  'lassoTool',
  'globalConnect',
  'palette',
  'eventBus',
  'modeling',
  'dragging'
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
    const selectedElements = elementRegistry.filter(function (element) { return element.selected; });

    for (const element of selectedElements) {
      const forDelete = modeling.getShapeArcs(element);
      forDelete.push(element);
      modeling.removeElements(forDelete);
    }
  }

  function extractSubpage() {
    const selectedElements = elementRegistry.filter(function (element) { return element.selected; });
    if (selectedElements.length === 0) {
      return;
    }

    console.log(self.constructor.name, 'extractSubpage(), selectedElements = ', selectedElements);

    const position = {x: selectedElements[0].x , y: selectedElements[0].y };

    let cpnElement = modeling.createShapeCpnElement(position, CPN_TRANSITION);

    const subPageId = 'ID' + new Date().getTime();
    cpnElement = modeling.declareSubPage(cpnElement, 'Subpage', subPageId);

    const element = cpnFactory.createShape(undefined, cpnElement, CPN_TRANSITION, position, true);
    //this._modeling.updateElement(element, true);

    // eventBus.fire('shape.create.end', { elements: [element] });
    // eventBus.fire('shape.editing.activate', { shape: element });
    // eventBus.fire('shape.contextpad.activate', { shape: element });

    const places = [];
    const transitions = [];
    for (const e of selectedElements) {
      if (is(e, CPN_PLACE)) {
        places.push(e.cpnElement);
      }
      if (is(e, CPN_TRANSITION)) {
        transitions.push(e.cpnElement);
      }
    }

    eventBus.fire('extract.subpage', { subPageId: subPageId, places: places, transitions: transitions });

    eventBus.fire('shape.editing.activate', { shape: element });
    eventBus.fire('shape.contextpad.activate', { shape: element });
  }

  return {
    'lasso-tool': {
      group: 'tools',
      className: 'bpmn-icon-lasso-tool',
      title: 'Activate Lasso Tool',
      action: {
        click: function (event) {
          lassoTool.activateSelection(event);
        }
      }
    },

    // bpmn-icon-subprocess-expanded
    'subst-tool': {
      group: 'tools',
      className: 'bpmn-icon-subprocess-expanded',
      title: 'Move selected elements to subpage',
      action: {
        click: extractSubpage
      }
    },

    'tool-separator': {
      group: 'tools',
      separator: true
    },

    'delete-tool': {
      group: 'tools',
      className: 'bpmn-icon-trash',
      title: 'Remove selected elements',
      action: {
        click: removeElements
      }
    },

    // 'global-connect-tool': {
    //   group: 'tools',
    //   className: 'bpmn-icon-connection-multi',
    //   title: 'Activate Connection Tool',
    //   action: {
    //     click: function(event) {
    //       // globalConnect.toggle(event);
    //     }
    //   }
    // },

    // 'tool-separator': {
    //   group: 'tools',
    //   separator: true
    // },

    // 'create-place': {
    //   group: 'create',
    //   className: 'bpmn-icon-start-event-none',
    //   title: 'Create Place',
    //   action: function() { self._createPlace(event) }
    // },

    // 'create-transition': {
    //   group: 'create',
    //   className: 'bpmn-icon-task',
    //   title: 'Create Transition',
    //   action: function() { self._createTransition(event) }
    // },

    // 'tool-separator': {
    //   group: 'create',
    //   separator: true
    // },

  };
};

CpnPaletteProvider.prototype._createPlace = function (event) {
  const shape = this._cpnFactory.createShape(undefined, undefined, CPN_PLACE, undefined, false);
  this._create.start(event, shape);
}

CpnPaletteProvider.prototype._createTransition = function (event) {
  const shape = this._cpnFactory.createShape(undefined, undefined, CPN_TRANSITION, undefined, false);
  this._create.start(event, shape);
}
