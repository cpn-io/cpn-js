import {CPN_CONNECTION, CPN_PLACE, CPN_TRANSITION, is} from '../../util/ModelUtil';

/**
 * A example context pad provider.
 */
export default function CpnContextPadProvider(connect, contextPad, modeling, popupMenu) {
  this._connect = connect;
  this._modeling = modeling;
  this._popupMenu = popupMenu;

  contextPad.registerProvider(this);
}

CpnContextPadProvider.$inject = [
  'connect',
  'contextPad',
  'modeling',
  'popupMenu'
];


CpnContextPadProvider.prototype.getContextPadEntries = function (element) {
  var connect = this._connect,
    modeling = this._modeling,
    popupMenu = this._popupMenu;

  function removeElement() {
    modeling.removeElements([element]);
  }

  function startConnect(event, element, autoActivate) {
    connect.start(event, element, autoActivate);
  }


  if (is(element, CPN_CONNECTION))
    return {
      'delete': {
        group: 'edit',
        className: 'context-pad-icon-remove',
        title: 'Remove',
        action: {
          click: removeElement,
          dragstart: removeElement
        }
      }
    };

  if (is(element, CPN_PLACE) || is(element, CPN_TRANSITION))
    return {
      'delete': {
        group: 'edit',
        className: 'context-pad-icon-remove',
        title: 'Remove',
        action: {
          click: removeElement,
          dragstart: removeElement
        }
      },
      'connect': {
        group: 'edit',
        className: 'context-pad-icon-connect',
        title: 'Connect',
        action: {
          click: startConnect,
          dragstart: startConnect
        }
      },

      'replace': {
        group: 'edit',
        className: 'context-pad-icon-connect',
        title: 'Popup',
        action: {
          click: function (event, element) {
            console.log('CpnContextPadProvider(), POPUP, {cursor: { x: event.x, y: event.y }} = ', {cursor: { x: event.x, y: event.y }});
            console.log('CpnContextPadProvider(), POPUP, {cursor: { x: element.x, y: element.y }} = ', {cursor: { x: element.x, y: element.y }});

            var position = {cursor: { x: event.x, y: event.y }};
            // var position = {cursor: { x: element.x, y: element.y }};
            popupMenu.open(element, 'cpnPopupMenu', position);
          }
        }
      }

    };

  return null;
};
