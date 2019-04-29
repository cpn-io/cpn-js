import inherits from 'inherits';

import CommandInterceptor from 'diagram-js/lib/command/CommandInterceptor';

inherits(CpnUpdater, CommandInterceptor);

import {is, isCpn} from '../../util/ModelUtil';

CpnUpdater.$inject = [
  'eventBus',
  'connectionDocking',
  'selection'
];

/**
 * A handler responsible for updating
 * once changes on the diagram happen
 */
export default function CpnUpdater(eventBus, connectionDocking, selection) {
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

  // this.executed([
  //   'shape.changed',
  // ], updateLabel);

  // this.reverted(['connection.layout'], function (e) {
  //   delete e.context.cropped;
  // });

  eventBus.on('shape.changed', function (e) {
    updateLabel(e);
  });

  eventBus.on('element.hover', function (event) {
    var element = event.element;

    console.log('CpnUpdater(), element.hover, element = ', element);

    // eventBus.fire('element.click', { element: element });
    if (isCpn(element))
      selection.select(element);
  });

  // eventBus.on('element.click', function(event) {
  //   console.log('CpnUpdater(), element.click, event = ', event);
  // });


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
    connection.type = 'cpn:Connection';
  }

  function updateNewShape(e) {
    console.log('CpnUpdater(), updateNewShape(e), e = ', e);
    const context = e.context;
    const shape = context.shape;
    shape.type = 'cpn:Place';
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
    if (is(shape, 'cpn:Label')) {
      shape.parent = shape.labelTarget;
    }
  }

}
