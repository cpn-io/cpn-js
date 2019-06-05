import { CPN_PLACE, CPN_TRANSITION } from "../../util/ModelUtil";

/**
 * A example palette provider.
 */
export default function CpnPaletteProvider(create, elementFactory, cpnFactory, lassoTool,
  globalConnect, palette, eventBus, modeling, dragging) {
  this._create = create;
  this._elementFactory = elementFactory;
  this._cpnFactory = cpnFactory;
  this._lassoTool = lassoTool;
  this._globalConnect = globalConnect;
  this._palette = palette;
  this._dragging = dragging;
  this._modeling = modeling;

  palette.registerProvider(this);
}

CpnPaletteProvider.$inject = [
  'create',
  'elementFactory',
  'cpnFactory',
  'lassoTool',
  'globalConnect',
  'palette',
  'eventBus',
  'modeling',
  'dragging'
];


CpnPaletteProvider.prototype.getPaletteEntries = function () {
  var create = this._create,
    elementFactory = this._elementFactory,
    globalConnect = this._globalConnect,
    lassoTool = this._lassoTool;

  const self = this;

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
        click: function (event) {
        }
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
        click: function (event) {
        }
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
