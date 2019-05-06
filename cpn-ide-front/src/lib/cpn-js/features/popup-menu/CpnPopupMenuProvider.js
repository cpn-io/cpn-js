import {
  forEach,
  filter
} from 'min-dash';

/**
 * This module is an element agnostic replace menu provider for the popup menu.
 */
export default function CpnPopupMenuProvider(
  popupMenu, modeling, rules, translate) {

  this._popupMenu = popupMenu;
  this._modeling = modeling;
  this._rules = rules;
  this._translate = translate;

  this.register();
}

CpnPopupMenuProvider.$inject = [
  'popupMenu',
  'modeling',
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

  console.log('CpnPopupMenuProvider.prototype.getEntries, element = ', element);

  var entries = [];

  const menuEntry = {
    id: '_createPlace',
    label: 'Create Place',
    // className: 'context-pad-icon-connect',
    action: function () { alert('aaaaaaaaaaaaa'); }
  };

  entries.push(menuEntry);

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

  console.log('CpnPopupMenuProvider.prototype.getHeaderEntries, element = ', element);

  var headerEntries = [];

  // const menuEntry = {
  //   id: '_createPlace_2',
  //   label: 'Create Place 2',
  //   action: function () { alert('aaaaaaaaaaaaa'); }
  // };
  // headerEntries.push(menuEntry);

  return headerEntries;
};
