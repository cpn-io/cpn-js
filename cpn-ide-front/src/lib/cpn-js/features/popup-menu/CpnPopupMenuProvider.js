import {
  forEach,
  filter
} from 'min-dash';
import { is, CPN_PLACE, CPN_TRANSITION } from '../../util/ModelUtil';

/**
 * This module is an element agnostic replace menu provider for the popup menu.
 */
export default function CpnPopupMenuProvider(create, cpnFactory, canvas, popupMenu, modeling, connect, rules, translate) {

  this._create = create;
  this._cpnFactory = cpnFactory;
  this._canvas = canvas;
  this._popupMenu = popupMenu;
  this._modeling = modeling;
  this._connect = connect;
  this._rules = rules;
  this._translate = translate;

  this.register();

  this._element = undefined;
  this._position = undefined;
}

CpnPopupMenuProvider.$inject = [
  'create',
  'cpnFactory',
  'canvas',
  'popupMenu',
  'modeling',
  'connect',
  'rules',
  'translate'
];


/**
 * Register replace menu provider in the popup menu
 */
CpnPopupMenuProvider.prototype.register = function () {
  this._popupMenu.registerProvider('cpnPopupMenu', this);
};

CpnPopupMenuProvider.prototype.open = function (element, position) {
  this._element = element;
  this._position = position.cursor;

  this._popupMenu.open(element, 'cpnPopupMenu', position);
};

CpnPopupMenuProvider.prototype.close = function () {
  this._popupMenu.close();
};


/**
 * Get all entries from replaceOptions for the given element and apply filters
 * on them. Get for example only elements, which are different from the current one.
 *
 * @param {djs.model.Base} element
 *
 * @return {Array<Object>} a list of menu entry items
 */
CpnPopupMenuProvider.prototype.getEntries = function (element) {

  const self = this;

  // console.log('CpnPopupMenuProvider.prototype.getEntries, element = ', element);

  var entries = [];
  var event = new MouseEvent('contextmenu');

  var createPlaceMenuEntry = {
    id: '_menuItem_createPlace',
    label: 'New Place',
    className: 'bpmn-icon-start-event-none',
    action: function () { self._createShape(event, CPN_PLACE) }
  };

  var createTransitionMenuEntry = {
    id: '_menuItem_createTransition',
    label: 'New Transition',
    className: 'bpmn-icon-task',
    action: function () { self._createShape(event, CPN_TRANSITION) }
  };

  // var deleteMenuEntry = {
  //   id: '_menuItem_delete',
  //   label: 'Delete',
  //   className: 'popup-menu-icon-delete',
  //   action: function () {
  //     self._popupMenu.close();
  //     self._modeling.removeElements([element]);
  //   }
  // };

  // var connectMenuEntry = {
  //   id: '_menuItem_connect',
  //   label: 'Connect',
  //   className: 'popup-menu-icon-connect',
  //   action: function () {
  //     self._popupMenu.close();
  //     self._connect.start(event, element);
  //   }
  // };

  if (element.id === '__implicitroot') {
    entries.push(createPlaceMenuEntry);
    entries.push(createTransitionMenuEntry);
  }

  // if (is(element, CPN_PLACE)) {
  //   entries.push(createTransitionMenuEntry);
  //   entries.push(connectMenuEntry);
  //   entries.push(deleteMenuEntry);
  // }

  // if (is(element, CPN_TRANSITION)) {
  //   entries.push(createPlaceMenuEntry);
  //   entries.push(connectMenuEntry);
  //   entries.push(deleteMenuEntry);
  // }

  return entries;
};


/**
 * Get a list of header items for the given element. This includes buttons
 * for multi instance markers and for the ad hoc marker.
 *
 * @param {djs.model.Base} element
 *
 * @return {Array<Object>} a list of menu entry items
 */
CpnPopupMenuProvider.prototype.getHeaderEntries = function (element) {
  return [];
};

CpnPopupMenuProvider.prototype._createShape = function (event, type) {
  console.log('CpnPopupMenuProvider.prototype._createPlace, this.position = ', this._position);

  this._popupMenu.close();
  const position = toLocalPoint(this._canvas, this._position);
  this._cpnFactory.createShape(undefined, undefined, type, position, true);
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

