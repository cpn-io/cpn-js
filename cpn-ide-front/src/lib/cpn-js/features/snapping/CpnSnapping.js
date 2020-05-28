import inherits from 'inherits';

import {
  forEach
} from 'min-dash';

import {
  getBBox as getBoundingBox
} from 'diagram-js/lib/util/Elements';

import Snapping from 'diagram-js/lib/features/snapping/Snapping';

import {
  mid,
  topLeft,
  bottomRight,
  isSnapped,
  setSnapped
} from 'diagram-js/lib/features/snapping/SnapUtil';

import {
  asTRBL
} from 'diagram-js/lib/layout/LayoutUtil';


import {
  getBoundaryAttachment
} from './CpnSnappingUtil';

var round = Math.round;

var HIGH_PRIORITY = 1500;

/**
 * CPN specific snapping functionality
 *
 *  * snap on process elements if a pool is created inside a
 *    process diagram
 *
 * @param {EventBus} eventBus
 * @param {Canvas} canvas
 */
export default function CpnSnapping(eventBus, canvas, cpnRuleProvider, elementRegistry) {

  // instantiate super
  Snapping.call(this, eventBus, canvas);

  // eventBus.on('create.start', function (event) {

  //   var context = event.context,
  //     shape = context.shape,
  //     rootElement = canvas.getRootElement();
  // });

  // eventBus.on(['create.move', 'create.end'], HIGH_PRIORITY, function (event) {
  //   var context = event.context,
  //     shape = context.shape;
  // });

  // eventBus.on('shape.move.start', function (event) {

  //   var context = event.context,
  //     shape = context.shape,
  //     rootElement = canvas.getRootElement();
  // });


  function canAttach(shape, target, position) {
    // return cpnRuleProvider.canAttach([shape], target, null, position) === 'attach';
    return true;
  }

  function canConnect(source, target) {
    // return cpnRuleProvider.canConnect(source, target);
    return true;
  }

  /**
   * Snap boundary events to elements border
   */
  // eventBus.on([
  //   'create.move',
  //   'create.end',
  //   'shape.move.move',
  //   'shape.move.end'
  // ], HIGH_PRIORITY, function (event) {

  //   var context = event.context,
  //     target = context.target,
  //     shape = context.shape;

  //   if (target && !isSnapped(event) && canAttach(shape, target, event)) {
  //     snapBoundaryEvent(event, shape, target);
  //   }
  // });

  // /**
  //  * Adjust parent for flowElements to the target participant
  //  * when droping onto lanes.
  //  */
  // eventBus.on([
  //   'shape.move.hover',
  //   'shape.move.move',
  //   'shape.move.end',
  //   'create.hover',
  //   'create.move',
  //   'create.end'
  // ], HIGH_PRIORITY, function (event) {
  //   var context = event.context,
  //     shape = context.shape,
  //     hover = event.hover;
  // });

  /**
   * Snap sequence flows.
   */


  eventBus.on([
    'connect.move',
    'connect.hover',
    'connect.end'
  ], HIGH_PRIORITY, function (event) {

    // console.log('CpnShaping.eventBus.on(), event = ', event);

    var context = event.context,
      source = context.source,
      target = context.target;

    var connection = canConnect(source, target) || {};

    if (!context.initialSourcePosition) {
      context.initialSourcePosition = context.sourcePosition;
    }

    // snap source
    context.sourcePosition = mid(source);

    // snap target
    snapToPosition(event, mid(target));
  });


  eventBus.on('resize.start', HIGH_PRIORITY, function (event) {
    var context = event.context,
      shape = context.shape;
  });

}

inherits(CpnSnapping, Snapping);

CpnSnapping.$inject = [
  'eventBus',
  'canvas',
  'cpnRuleProvider',
  'elementRegistry'
];


CpnSnapping.prototype.initSnap = function (event) {

  var context = event.context,
    shape = event.shape,
    shapeMid,
    shapeBounds,
    shapeTopLeft,
    shapeBottomRight,
    snapContext;


  snapContext = Snapping.prototype.initSnap.call(this, event);

  if (shape) {

    shapeMid = mid(shape, event);

    shapeBounds = {
      width: shape.width,
      height: shape.height,
      x: isNaN(shape.x) ? round(shapeMid.x - shape.width / 2) : shape.x,
      y: isNaN(shape.y) ? round(shapeMid.y - shape.height / 2) : shape.y
    };

    shapeTopLeft = topLeft(shapeBounds);
    shapeBottomRight = bottomRight(shapeBounds);

    snapContext.setSnapOrigin('top-left', {
      x: shapeTopLeft.x - event.x,
      y: shapeTopLeft.y - event.y
    });

    snapContext.setSnapOrigin('bottom-right', {
      x: shapeBottomRight.x - event.x,
      y: shapeBottomRight.y - event.y
    });

    forEach(shape.outgoing, function (c) {
      var docking = c.waypoints[0];

      docking = docking.original || docking;

      snapContext.setSnapOrigin(c.id + '-docking', {
        x: docking.x - event.x,
        y: docking.y - event.y
      });
    });

    forEach(shape.incoming, function (c) {
      var docking = c.waypoints[c.waypoints.length - 1];

      docking = docking.original || docking;

      snapContext.setSnapOrigin(c.id + '-docking', {
        x: docking.x - event.x,
        y: docking.y - event.y
      });
    });

  }

  var source = context.source;

  if (source) {
    snapContext.addDefaultSnap('mid', mid(source));
  }
};


CpnSnapping.prototype.addTargetSnaps = function (snapPoints, shape, target) {

  var siblings = this.getSiblings(shape, target) || [];

  forEach(siblings, function (sibling) {

    if (sibling.waypoints) {

      forEach(sibling.waypoints.slice(1, -1), function (waypoint, i) {
        var nextWaypoint = sibling.waypoints[i + 2],
          previousWaypoint = sibling.waypoints[i];

        if (!nextWaypoint || !previousWaypoint) {
          throw new Error('waypoints must exist');
        }

        if (nextWaypoint.x === waypoint.x ||
          nextWaypoint.y === waypoint.y ||
          previousWaypoint.x === waypoint.x ||
          previousWaypoint.y === waypoint.y) {
          snapPoints.add('mid', waypoint);
        }
      });

      return;
    }

    snapPoints.add('mid', mid(sibling));
  });

  forEach(shape.incoming, function (c) {

    if (siblings.indexOf(c.source) === -1) {
      snapPoints.add('mid', mid(c.source));
    }

    var docking = c.waypoints[0];
    snapPoints.add(c.id + '-docking', docking.original || docking);
  });

  forEach(shape.outgoing, function (c) {

    if (siblings.indexOf(c.target) === -1) {
      snapPoints.add('mid', mid(c.target));
    }

    var docking = c.waypoints[c.waypoints.length - 1];
    snapPoints.add(c.id + '-docking', docking.original || docking);
  });
};


// boundary event snapping //////////////////////

function snapBoundaryEvent(event, shape, target) {
  var targetTRBL = asTRBL(target);

  var direction = getBoundaryAttachment(event, target);

  if (/top/.test(direction)) {
    setSnapped(event, 'y', targetTRBL.top);
  } else if (/bottom/.test(direction)) {
    setSnapped(event, 'y', targetTRBL.bottom);
  }

  if (/left/.test(direction)) {
    setSnapped(event, 'x', targetTRBL.left);
  } else if (/right/.test(direction)) {
    setSnapped(event, 'x', targetTRBL.right);
  }
}


function snapToPosition(event, position) {
  if (position) {
    setSnapped(event, 'x', position.x);
    setSnapped(event, 'y', position.y);
  }
}
