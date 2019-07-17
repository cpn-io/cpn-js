import {
  forEach,
  filter
} from 'min-dash';
import { is, CPN_PLACE, CPN_TRANSITION } from '../../util/ModelUtil';
import { Message } from "../../../../app/common/message";

/**
 * This module is an element agnostic replace menu provider for the popup menu.
 */
export default function CpnBindingsMenuProvider(modeling, popupMenu, canvas, eventBus) {
  this._modeling = modeling;
  this._popupMenu = popupMenu;
  this._canvas = canvas;
  this._eventBus = eventBus;
  this.register();

  this._element = undefined;
  this._position = undefined;

  const self = this;

  this._bindingsList = [
    { bind_id: 'x=1' },
    { bind_id: 'x=2' },
    { bind_id: 'x=3' },
  ];

  eventBus.on('element.click', function (event) {
    console.log('CpnBindingsMenuProvider(), element.click, event = ', event);

    self._element = event.element;
  });


  eventBus.on('bindingsMenu.open', function (event) {
    console.log('CpnUpdater(), bindingsMenu.open, event = ', event);

    self._bindingsList = event.data;
    const element = self._element;

    // bindings menu
    if (element && is(element, CPN_TRANSITION)) {
      const position = { x: element.x - 1, y: element.y - 5 };

      self.open(element, { cursor: { x: position.x, y: position.y } });
    }
  });

}

CpnBindingsMenuProvider.$inject = [
  'modeling',
  'popupMenu',
  'canvas',
  'eventBus'
];

/**
 * Register replace menu provider in the popup menu
 */
CpnBindingsMenuProvider.prototype.register = function () {
  this._popupMenu.registerProvider('cpnBindingsMenu', this);
};

CpnBindingsMenuProvider.prototype.open = function (element, position) {
  console.log('CpnBindingsMenuProvider.prototype.open(), element, position = ', element, position);

  this._element = element;
  this._position = toGlobalPoint(this._canvas, position.cursor);
  this._popupMenu.open(this._element, 'cpnBindingsMenu', { cursor: this._position });
};

CpnBindingsMenuProvider.prototype.close = function () {
  // console.log('CpnBindingsMenuProvider.prototype.close()');

  if (this._popupMenu._current && this._popupMenu._current.className === 'cpnBindingsMenu' && this._popupMenu.isOpen())
    this._popupMenu.close();
  if (this.changes) {
    this.changes = undefined;
  } else {
  }
};

/**
 * Get all entries from replaceOptions for the given element and apply filters
 * on them. Get for example only elements, which are different from the current one.
 *
 * @param {djs.model.Base} element
 *
 * @return {Array<Object>} a list of menu entry items
 */
CpnBindingsMenuProvider.prototype.getEntries = function (element) {
  const self = this;

  var entries = [];

  var createBindingsMenuEntry;
  for (let binding of this._bindingsList) {
    createBindingsMenuEntry = {
      id: '_menuItem_binding_' + binding.bind_id,
      label: binding.bind_id,
      // className: 'bpmn-icon-start-event-none',
      action: function () { self._selectBinding(binding) }
    };
    entries.push(createBindingsMenuEntry);
  }

  return entries;
};


/**
 * Get a list of header items for the given element. This includes buttons
 * for multi instance markers and for the ad hoc marker.
 * @param {djs.model.Base} element
 * @return {Array<Object>} a list of menu entry items
 */
CpnBindingsMenuProvider.prototype.getHeaderEntries = function (element) {
  return [];
};

CpnBindingsMenuProvider.prototype._selectBinding = function (binding) {
  console.log('CpnBindingsMenuProvider._selectBinding, binding = ', binding);
  this._eventBus.fire('bindingsMenu.select', { element: this._element, binding: binding });
  this.close();
}

/**
 * Convert a global event into local coordinates
 * @param {*} canvas
 * @param {*} globalPosition
 */
function toLocalPoint(canvas, globalPosition) {
  var viewbox = canvas.viewbox();
  var clientRect = canvas._container.getBoundingClientRect();
  return {
    x: viewbox.x + (globalPosition.x - clientRect.left) / viewbox.scale,
    y: viewbox.y + (globalPosition.y - clientRect.top) / viewbox.scale
  };
}

function toGlobalPoint(canvas, localPosition) {
  var viewbox = canvas.viewbox();
  var clientRect = canvas._container.getBoundingClientRect();
  return {
    x: viewbox.scale * (localPosition.x - viewbox.x) + clientRect.left,
    y: viewbox.scale * (localPosition.y - viewbox.y) + clientRect.top,
  };
}

