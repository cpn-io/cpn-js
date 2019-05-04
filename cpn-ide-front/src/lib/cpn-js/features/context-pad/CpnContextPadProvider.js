import {CPN_CONNECTION, CPN_PLACE, CPN_TRANSITION, is} from '../../util/ModelUtil';

/**
 * A example context pad provider.
 */
export default function CpnContextPadProvider(connect, contextPad, modeling) {
  this._connect = connect;
  this._modeling = modeling;

  contextPad.registerProvider(this);
}

CpnContextPadProvider.$inject = [
  'connect',
  'contextPad',
  'modeling'
];


CpnContextPadProvider.prototype.getContextPadEntries = function (element) {
  var connect = this._connect,
    modeling = this._modeling;

  function removeElement() {
    modeling.removeElements([element]);
  }

  function startConnect(event, element, autoActivate) {
    connect.start(event, element, autoActivate);
  }


  // if (is(element, CPN_CONNECTION))
  //   return {
  //     'delete': {
  //       group: 'edit',
  //       className: 'context-pad-icon-remove',
  //       title: 'Remove',
  //       action: {
  //         click: removeElement,
  //         dragstart: removeElement
  //       }
  //     }
  //   };
  //
  // if (is(element, CPN_PLACE) || is(element, CPN_TRANSITION))
  //   return {
  //     'delete': {
  //       group: 'edit',
  //       className: 'context-pad-icon-remove',
  //       title: 'Remove',
  //       action: {
  //         click: removeElement,
  //         dragstart: removeElement
  //       }
  //     },
  //     'connect': {
  //       group: 'edit',
  //       className: 'context-pad-icon-connect',
  //       title: 'Connect',
  //       action: {
  //         click: startConnect,
  //         dragstart: startConnect
  //       }
  //     }
  //   };

  return null;
};
