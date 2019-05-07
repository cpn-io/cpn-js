import {
  forEach,
  filter
} from 'min-dash';
import { is, CPN_PLACE, CPN_TRANSITION } from '../../util/ModelUtil';

/**
 * This module is an element agnostic replace menu provider for the popup menu.
 */
export default function CpnPopupMenuProvider(
  popupMenu, modeling, connect, rules, translate) {

  this._popupMenu = popupMenu;
  this._modeling = modeling;
  this._connect = connect;
  this._rules = rules;
  this._translate = translate;

  this.register();
}

CpnPopupMenuProvider.$inject = [
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

  console.log('CpnPopupMenuProvider.prototype.getEntries, element = ', element);

  var menuEntry, entries = [];

  var createPlaceMenuEntry = {
    id: '_menuItem_createPlace',
    label: 'Create place',
    action: function () { alert('Create place'); }
  };

  var createTransitionMenuEntry = {
    id: '_menuItem_createTransition',
    label: 'Create transition',
    action: function () { alert('Create transition'); }
  };


  var deleteMenuEntry = {
    id: '_menuItem_delete',
    label: 'Delete',
    className: 'popup-menu-icon-delete',
    action: function () {
      // alert('Delete Place');
      self._popupMenu.close();
      self._modeling.removeElements([element]);
    }
  };

  var connectMenuEntry = {
    id: '_menuItem_connect',
    label: 'Connect',
    className: 'popup-menu-icon-connect',
    action: function () {
      self._popupMenu.close();
      self._connect.start(event, element);
    }
  };

  if (element.id === '__implicitroot') {
    entries.push(createPlaceMenuEntry);
    entries.push(createTransitionMenuEntry);
  }

  if (is(element, CPN_PLACE)) {
    entries.push(createTransitionMenuEntry);
    entries.push(connectMenuEntry);
    entries.push(deleteMenuEntry);
  }

  if (is(element, CPN_TRANSITION)) {
    entries.push(createPlaceMenuEntry);
    entries.push(connectMenuEntry);
    entries.push(deleteMenuEntry);
  }

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
