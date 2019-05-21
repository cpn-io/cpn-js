import {
  forEach,
  filter
} from 'min-dash';
import { is, CPN_PLACE, CPN_TRANSITION } from '../../util/ModelUtil';

/**
 * This module is an element agnostic replace menu provider for the popup menu.
 */
export default function CpnPortMenuProvider( popupMenu, canvas) {


  this._popupMenu = popupMenu;
  this._canvas = canvas
  this.register();

  this._element = undefined;
  this._position = undefined;
  this._portList = undefined;
  this._transEnd =  undefined;
  this._placeEnd = undefined;
}

CpnPortMenuProvider.$inject = [

  'popupMenu',
  'canvas'

];


/**
 * Register replace menu provider in the popup menu
 */
CpnPortMenuProvider.prototype.register = function () {
  this._popupMenu.registerProvider('cpnPortMenu', this);
};

CpnPortMenuProvider.prototype.open = function (target, position) {
  this._portList = target.list;
  this._transEnd =  target.trans;
  this._placeEnd =  target.place;
  this._element = this._canvas.getRootElement();
  this._position = position.cursor;
  this._popupMenu.open( this._element , 'cpnPortMenu', position);
};

CpnPortMenuProvider.prototype.close = function () {
  console.log('CpnPortMenuProvider.prototype.close');
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
CpnPortMenuProvider.prototype.getEntries = function (element) {

  const self = this;


  var entries = [];
  var event = new MouseEvent('contextmenu');

  var createPortMenuEntry;
  for (let port of this._portList) {
    createPortMenuEntry = {
        id: '_menuItem_createPlace' + port.id,
        label: 'Port ' + port.type + ' (' + port.id + ') - ' + port.name,
        className: 'bpmn-icon-start-event-none',
        action: function () { self._changePortSock(port, self._transEnd, self._placeEnd) }
      };
    entries.push(createPortMenuEntry);
  }

  // var createPlaceMenuEntry = {
  //   id: '_menuItem_createPlace',
  //   label: 'New Place',
  //   className: 'bpmn-icon-start-event-none',
  //   action: function () { }
  // };
  //
  // var createTransitionMenuEntry = {
  //   id: '_menuItem_createTransition',
  //   label: 'New Transition',
  //   className: 'bpmn-icon-start-event-none\'',
  //   action: function () { }
  // };
  //
  // var createSubpageMenuEntry = {
  //   id: '_menuItem_createSubpage',
  //   label: 'New Subpage',
  //   className: 'bpmn-icon-start-event-none',
  //   action: function () {  }
  // };

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


    // entries.push(createPlaceMenuEntry);
    // entries.push(createTransitionMenuEntry);
    // entries.push(createSubpageMenuEntry);


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
CpnPortMenuProvider.prototype.getHeaderEntries = function (element) {
  return [];
};

CpnPortMenuProvider.prototype._changePortSock = function(port, transEnd, placeEnd) {
  transEnd.cpnElement.subst._portsock =  transEnd.cpnElement.subst._portsock + '(' + port.id + ', '+ placeEnd.id +')';
  console.log('CpnPortMenuProvider._changePortSock -  ', transEnd);
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

