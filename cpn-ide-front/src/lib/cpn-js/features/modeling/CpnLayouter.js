import inherits from 'inherits';

import {
  assign
} from 'min-dash';

import {
  repairConnection,
  withoutRedundantPoints
} from 'diagram-js/lib/layout/ManhattanLayout';

import {
  getMid,
  getOrientation
} from 'diagram-js/lib/layout/LayoutUtil';


import CommandInterceptor from 'diagram-js/lib/command/CommandInterceptor';
import CpnRules from "../rules/CpnRules";

CpnLayouter.$inject = [
  'eventBus',
  'connectionDocking'
];

/**
 * A base connection layouter implementation
 * that layouts the connection by directly connecting
 * mid(source) + mid(target).
 */
export default function CpnLayouter(eventBus, connectionDocking) {
  // console.log('CpnLayouter()');

  this._eventBus = eventBus;
  this._connectionDocking = connectionDocking;
}

/**
 * Return the new layouted waypoints for the given connection.
 *
 * @param {djs.model.Connection} connection
 * @param {Object} [hints]
 * @param {Boolean} [hints.connectionStart]
 * @param {Boolean} [hints.connectionEnd]
 *
 * @return {Array<Point>} the layouted connection waypoints
 */
CpnLayouter.prototype.layoutConnection = function (connection, hints) {

  // console.log('CpnLayouter.prototype.layoutConnection(), connection = ', connection);
  // console.log('CpnLayouter.prototype.layoutConnection(), hints = ', hints);

  // if (!hints) {
  //   hints = {
  //     connectionStart: getMid(connection.source),
  //     connectionEnd: getMid(connection.target),
  //   }
  // }

  hints = hints || {};

  // console.log('CpnLayouter.prototype.layoutConnection(), hints = ', hints);

  // var startMid = hints.connectionStart || getMid(connection.source),
  //   endMid = hints.connectionEnd || getMid(connection.target);
  //
  // var start = {
  //   x: startMid.x + 50,
  //   y: startMid.y + 50,
  //   original: startMid
  // };
  //
  // var end = {
  //   x: endMid.x - 50,
  //   y: endMid.y - 50,
  //   original: endMid
  // };
  //
  // return [
  //   start,
  //   end
  // ];


  var source = connection.source,
    target = connection.target,
    waypoints = connection.waypoints,
    start = hints.connectionStart,
    end = hints.connectionEnd;

  // console.log('CpnLayouter.prototype.layoutConnection(), waypoints = ', waypoints);

  var manhattanOptions, updatedWaypoints;

  if (!start) {
    start = getConnectionDocking(waypoints && waypoints[0], source);
  }

  if (!end) {
    end = getConnectionDocking(waypoints && waypoints[waypoints.length - 1], target);
  }

  // start = getConnectionDocking(waypoints && waypoints[0], source);
  // end = getConnectionDocking(waypoints && waypoints[waypoints.length - 1], target);

  if (source === target) {
    manhattanOptions = {
      preferredLayouts: ['b:l']
    };
  } else {
    manhattanOptions = {
      preferredLayouts: ['h:h']
    };
  }

  if (waypoints && waypoints.length > 2) {
    if (manhattanOptions) {
      manhattanOptions = assign(manhattanOptions, hints);
      updatedWaypoints =
        withoutRedundantPoints(
          repairConnection(
            source, target,
            start, end,
            waypoints,
            manhattanOptions
          )
        );
    }
  }

  this.cropConnection(connection);

  // console.log('CpnLayouter.prototype.layoutConnection(), updatedWaypoints = ', updatedWaypoints);
  // console.log('CpnLayouter.prototype.layoutConnection(), [start, end] = ', [start, end]);

  return updatedWaypoints || [start, end];
};

// crop connection ends during create/update
CpnLayouter.prototype.cropConnection = function (connection) {
  // console.log('CpnLayouter.cropConnection(e), connection = ', connection);

  if (connection.source && connection.target && connection.waypoints)
    connection.waypoints = this._connectionDocking.getCroppedWaypoints(connection);
}


function getConnectionDocking(point, shape) {
  return point ? (point.original || point) : getMid(shape);
}


