import inherits from 'inherits';

import CommandInterceptor from 'diagram-js/lib/command/CommandInterceptor';

inherits(CpnUpdater, CommandInterceptor);

CpnUpdater.$inject = [
  'eventBus',
  'connectionDocking',
];

/**
 * A handler responsible for updating
 * once changes on the diagram happen
 */
export default function CpnUpdater(eventBus, connectionDocking) {

  console.log('CpnUpdater()');

  this._connectionDocking = connectionDocking;

  CommandInterceptor.call(this, eventBus);

  var self = this;

  // connection cropping //////////////////////

  // crop connection ends during create/update
  function cropConnection(e) {
    console.log('CpnUpdater(), cropConnection(e), e = ', e);

    const context = e.context;
    var connection;

    if (!context.cropped) {
      connection = context.connection;
      // connection.waypoints = connectionDocking.getCroppedWaypoints(connection);

      self.cropConnection(connection);
      context.cropped = true;
    }
  }

  this.executed([
    'connection.create',
    'connection.layout',
    'connection.reconnectEnd',
    'connection.reconnectStart'
  ], cropConnection);

  this.reverted(['connection.layout'], function (e) {
    delete e.context.cropped;
  });
}

// crop connection ends during create/update
CpnUpdater.prototype.cropConnection = function (connection) {
  console.log('CpnUpdater.cropConnection(e), connection = ', connection);

  if (connection.source && connection.target && connection.waypoints)
    connection.waypoints = this._connectionDocking.getCroppedWaypoints(connection);
}
