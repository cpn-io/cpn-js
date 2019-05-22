import {
  forEach,
  filter
} from 'min-dash';
import { is, CPN_PLACE, CPN_TRANSITION } from '../../util/ModelUtil';
import {Message} from "../../../../app/common/message";

/**
 * This module is an element agnostic replace menu provider for the popup menu.
 */
export default function CpnPortMenuProvider( popupMenu, canvas, eventBus) {


  this._popupMenu = popupMenu;
  this._canvas = canvas;
  this._eventBus = eventBus;
  this.register();

  this._element = undefined;
  this._position = undefined;
  this._portList = undefined;
  this._transEnd =  undefined;
  this._placeEnd = undefined;
  this._createdArc  = undefined;
  this.changes =  undefined;
}

CpnPortMenuProvider.$inject = [

  'popupMenu',
  'canvas',
  'eventBus'

];


/**
 * Register replace menu provider in the popup menu
 */
CpnPortMenuProvider.prototype.register = function () {
  this._popupMenu.registerProvider('cpnPortMenu', this);

  this._eventBus.on('popupMenu.close', (event) => {
    console.log('popupMenu.close', this._popupMenu, event);
    if(this._popupMenu._current.className === 'cpnPortMenu'){
      if(this.changes){
        this.changes =  undefined;
      } else {
        if(this._createdArc)
          this._eventBus.fire('bind.port.cancel', {connection: this._createdArc});
      }
    }
  });
};

CpnPortMenuProvider.prototype.open = function (target, position) {
  this._portList = target.list;
  this._transEnd =  target.trans;
  this._placeEnd =  target.place;
  this._createdArc =  target.arc;
  this._element = this._canvas.getRootElement();
  this._position = toGlobalPoint(this._canvas, position.cursor);
  this._popupMenu.open( this._element , 'cpnPortMenu', {cursor: this._position});
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
  this.changes =  transEnd.cpnElement.subst._portsock;
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

function toGlobalPoint(canvas, localPosition ){
  var viewbox = canvas.viewbox();
  var clientRect = canvas._container.getBoundingClientRect();
  return {
    x:  viewbox.scale * ( localPosition.x - viewbox.x) + clientRect.left,
    y:  viewbox.scale * ( localPosition.y - viewbox.y) + clientRect.top,
  };
}

