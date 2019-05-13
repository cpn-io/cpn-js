import inherits from 'inherits';

import CommandInterceptor from 'diagram-js/lib/command/CommandInterceptor';

import {
  toPoint
} from 'diagram-js/lib/util/Event';

import {
  closest as domClosest
} from 'min-dom';

function getGfx(target) {
  var node = domClosest(target, 'svg, .djs-element', true);
  return node;
}

inherits(CpnUpdater, CommandInterceptor);

import { CPN_CONNECTION, CPN_LABEL, CPN_PLACE, is, isCpn, CPN_TOKEN_LABEL, CPN_MARKING_LABEL } from '../../util/ModelUtil';

CpnUpdater.$inject = [
  'eventBus',
  'modeling',
  'elementRegistry',
  'connectionDocking',
  'selection',
  'popupMenuProvider',
  'canvas'
];

import {
  event as domEvent
} from 'min-dom';

/**
 * A handler responsible for updating
 * once changes on the diagram happen
 */
export default function CpnUpdater(eventBus, modeling, elementRegistry,
  connectionDocking, selection, popupMenuProvider, canvas) {

  console.log('CpnUpdater()');

  CommandInterceptor.call(this, eventBus);

  this.executed([
    'connection.create',
  ], updateNewConnection);

  this.executed([
    'connection.create',
    'connection.layout',
    'connection.reconnectEnd',
    'connection.reconnectStart'
  ], cropConnection);

  this.executed([
    'shape.create',
  ], updateNewShape);

  // this.reverted(['connection.layout'], function (e) {
  //   delete e.context.cropped;
  // });

  eventBus.on('shape.changed', function (e) {
    updateLabel(e);
    updateCpnElement(e);
  });

  eventBus.on('element.hover', function (event) {
    var element = event.element;

    console.log('CpnUpdater(), element.hover, element = ', element);

    // eventBus.fire('element.click', { element: element });
    if (isCpn(element) && !is(element, CPN_LABEL) && !is(element, CPN_CONNECTION)) {
      selection.select(element);
    }
  });

  eventBus.on('element.click', function (event) {
    console.log('CpnUpdater(), element.click, event = ', event);

    if (event.element && is(event.element, CPN_TOKEN_LABEL))
      showHideMarking(event.element);
  });

  eventBus.on('popupMenu.open', function (event) {
    console.log('CpnUpdater(), popupMenu.open, event = ', event);
  });

  eventBus.on('element.mousedown', function (event) {
    console.log('CpnUpdater(), element.mousedown, event = ', event);
  });

  domEvent.bind(document, 'mousedown', function (event) {
    console.log('CpnUpdater(), domEvent, mousedown, event = ', event);

    if (event.button === 2) {
      event.stopPropagation();
      event.preventDefault();

      console.log('CpnUpdater(), domEvent, mousedown, popup menu, x,y = ', event.x, event.y);

      const position = toPoint(event);

      // damn expensive operation, ouch!
      const target = document.elementFromPoint(position.x, position.y);
      const gfx = getGfx(target);

      var element;

      if (gfx) {
        element = elementRegistry.get(gfx);
      }

      if (element) {
        console.log('CpnUpdater(), domEvent, mousedown, popup menu, element = ', element);

        popupMenuProvider.open(element, { cursor: { x: position.x, y: position.y } });
      }
    }
  });


  function showHideMarking(tokenElement) {
    if (!tokenElement || !tokenElement.label || !is(tokenElement.label, CPN_MARKING_LABEL))
      return;

    tokenElement.label.hidden = !tokenElement.label.hidden;
    modeling.updateElement(tokenElement.label);
  }

  // crop connection ends during create/update
  function cropConnection(e) {
    console.log('CpnUpdater(), cropConnection(e), e = ', e);

    // const context = e.context;
    // if (!context.cropped) {

    const connection = e.context.connection;
    // connection.waypoints = connectionDocking.getCroppedWaypoints(connection);

    if (connection.source && connection.target && connection.waypoints)
      connection.waypoints = connectionDocking.getCroppedWaypoints(connection);

    //   context.cropped = true;
    // }
  }

  function updateNewConnection(e) {
    console.log('CpnUpdater(), updateNewConnection(e), e = ', e);
    const context = e.context;
    const connection = context.connection;
    connection.type = CPN_CONNECTION;
  }

  function updateNewShape(e) {
    console.log('CpnUpdater(), updateNewShape(e), e = ', e);
    /* const context = e.context;
     const shape = context.shape;
     shape.type = CPN_PLACE;*/
  }

  // update bounds
  function updateBounds(e) {
    var shape = e.context.shape;

    var target = shape;
    var bounds = target.bounds;

    assign(bounds, {
      x: shape.x,
      y: shape.y,
      width: shape.width,
      height: shape.height
    });
  }

  function updateLabel(e) {
    // console.log('CpnUpdater(), updateLabel(), e = ', e);
    var shape = e.element;

    // if (shape.labelTarget) {
    //   shape.parent = shape.labelTarget;
    // }
  }

  function updateCpnElement(e) {

    console.log('CpnUpdater().updateCpnElement(), e = ', e);

    var shape = e.element;

    const cpnElement = shape.cpnElement;

    // if element is Place object
    if (cpnElement && cpnElement.posattr && cpnElement.ellipse) {
      cpnElement.posattr._x = shape.x;
      cpnElement.posattr._y = shape.y * -1;
      cpnElement.ellipse._w = shape.width;
      cpnElement.ellipse._h = shape.height;
    }

    // if element is Transition object
    if (cpnElement && cpnElement.posattr && cpnElement.box) {
      cpnElement.posattr._x = shape.x;
      cpnElement.posattr._y = shape.y * -1;
      cpnElement.box._w = shape.width;
      cpnElement.box._h = shape.height;
    }
  }
}

