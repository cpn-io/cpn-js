import {
  forEach,
  filter
} from 'min-dash';
import { is, CPN_PLACE } from '../../util/ModelUtil';

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

  if (is(element, CPN_PLACE)) {
     menuEntry = {
      id: '_menuItem_createPlace',
      label: 'Create Transition',
      action: function () { alert('Create Transition'); }
    };
    entries.push(menuEntry);

    // menuEntry = {
    //   id: '_separator',
    //   label: 'Separator',
    //   className: 'popup-menu-separator'
    // };
    // entries.push(menuEntry);

    menuEntry = {
      id: '_menuItem_delete',
      label: 'Delete',
      className: 'popup-menu-icon-delete',
      action: function () { 
        // alert('Delete Place');
        self._popupMenu.close();
        self._modeling.removeElements([element]); 
      }
    };
    entries.push(menuEntry);

    menuEntry = {
      id: '_menuItem_connect',
      label: 'Connect',
      className: 'popup-menu-icon-connect',
      action: function () { 
        // alert('Connect Place'); 
        self._popupMenu.close();
        self._connect.start(event, element);
      }
    };
    entries.push(menuEntry);
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
