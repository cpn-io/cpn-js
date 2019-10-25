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
  // var node = domClosest(target, 'rect, .djs-hit', true);
  return node;
}

inherits(CpnUpdater, CommandInterceptor);

import {
  is, isCpn, isAny,
  CPN_CONNECTION, CPN_LABEL, CPN_PLACE, CPN_TOKEN_LABEL, CPN_MARKING_LABEL, CPN_TRANSITION, modelCase
} from '../../util/ModelUtil';

CpnUpdater.$inject = [
  'eventBus',
  'modeling',
  'elementRegistry',
  'connectionDocking',
  'selection',
  'popupMenuProvider',
  'contextPad',
  'canvas',
  'portMenuProvider',
  'bindingsMenuProvider',
  'layouter'
];

import {
  event as domEvent
} from 'min-dom';
import Modeling from "./Modeling";
import { assign } from 'min-dash';


import {
  getDefPosattr,
  getDefFillattr,
  getDefLineattr,
  getDefTextattr,
  getDefText,
  getNextId
} from './CpnElementFactory';
import { getDistance } from '../../draw/CpnRenderUtil';


/**
 * A handler responsible for updating
 * once changes on the diagram happen
 */
export default function CpnUpdater(eventBus, modeling, elementRegistry,
  connectionDocking, selection, popupMenuProvider, contextPad, canvas,
  portMenuProvider, bindingsMenuProvider, layouter) {

  this._canvas = canvas;
  this._modeling = modeling;
  this._elementRegistry = elementRegistry;

  const self = this;
  const container = self._canvas.getContainer();

  // console.log('CpnUpdater()');

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

  let animateArcIdList = [];

  eventBus.on('token.animate', function (event) {
    animateArcIdList = [];

    if (event.arcIdList) {
      animateArcIdList = event.arcIdList;
    }

    animateArc(animateArcIdList);
  });

  eventBus.on('token.animate.complete', () => {
    if (animateArcIdList.length > 1) {
      animateArcIdList.shift();
      animateArc(animateArcIdList);
    } else {
      self._eventBus.fire('token.animate.complete.all');
    }
  });

  function animateArc(arcIdList) {
    if (arcIdList.length > 0) {
      const arcId = arcIdList[0];
      const element = modeling.getElementById(arcId);
      if (element) {
        element.animate = { tokens: 1 };
        modeling.repaintElement(element);
      } else {
        self._eventBus.fire('token.animate.complete');
      }
    }
  }

  eventBus.on('shape.changed', function (event) {
    // updateLabels(e.element);
    // console.log('CpnUpdater(), shape.changed, event.element = ', event.element);
    // updateBounds({ context: { shape: event.element } });

    updateCpnElement(event.element);
  });

  eventBus.on('connection.changed', function (event) {
    // console.log('CpnUpdater(), connection.changed, event = ', event);
    // layouter.layoutConnections();

    updateCpnElement(event.element);
  });

  // eventBus.on([
  //   'shape.move.end',
  //   'create.end',
  //   'connect.end',
  //   'resize.end',
  //   'bendpoint.move.end',
  //   'connectionSegment.move.end',
  //   'directEditing.complete',
  //   'shape.delete'
  // ],
  //   (event) => {
  //     console.log(self.constructor.name, 'change events, event = ', event);

  //     let element = event.element || event.shape;
  //     if (event.active && event.active.element) {
  //       element = event.active.element;
  //     }

  //     if (element) {
  //       updateCpnElement(element);
  //     }
  //   });



  eventBus.on('shape.create.end', (event) => {
    // console.log('CpnUpdater(), shape.create.end, event = ', event);

    // updateCpnElement(event.element);
    // layouter.layoutConnections();

    modeling.updateElement(event.element, true);
  });
  eventBus.on('connection.create', (event) => {
    // console.log('CpnUpdater(), connection.create, event = ', event);
    // updateCpnElement(event.element);
  });

  eventBus.on('element.hover', function (event) {
    var element = event.element;
    // console.log('CpnUpdater(), element.hover, element = ', element);

    // eventBus.fire('element.click', { element: element });
    if (isCpn(element) && !is(element, CPN_LABEL) && !is(element, CPN_CONNECTION)) {
      popupMenuProvider.close();

      selection.select(element);
    }
  });

  eventBus.on('element.click', function (event) {
    // console.log('CpnUpdater(), element.click, event = ', event);

    const element = event.element;

    if (element && is(element, CPN_TOKEN_LABEL)) {
      showHideMarking(event.element);
    }

    // test bindings menu
    // if (element && is(element, CPN_TRANSITION)) {
    //   const position = { x: element.x - 2, y: element.y - 5 };

    //   bindingsMenuProvider.open(element, { cursor: { x: position.x, y: position.y } });
    // }
  });

  eventBus.on('popupMenu.open', function (event) {
    // console.log('CpnUpdater(), popupMenu.open, event = ', event);
  });

  eventBus.on('element.mousedown', function (event) {
    // console.log('CpnUpdater(), element.mousedown, event = ', event);
  });

  // domEvent.bind(document, 'mouseup', function (event) {
  //   console.log('CpnUpdater(), domEvent, mouseup, event = ', event);
  // });

  // object.addEventListener("click", myScript);

  domEvent.bind(container, 'mousedown', function (event) {
    console.log('CpnUpdater()', event);
    // console.log('CpnUpdater(), domEvent, mousedown, event = ', event);
    // console.log('CpnUpdater(), mousedown, container = ', container);

    if (event.button === 2) {
      const position = toPoint(event);
      const target = document.elementFromPoint(position.x, position.y);
      const gfx = getGfx(target);
      var element;
      if (gfx) {
        element = elementRegistry.get(gfx);
      }

      console.log('CpnUpdater(), domEvent, mousedown, target = ', target);
      console.log('CpnUpdater(), domEvent, mousedown, gfx = ', gfx);
      console.log('CpnUpdater(), mousedown, element = ', element);

      if (element && element === canvas.getRootElement()) {
        popupMenuProvider.close();
        contextPad.close();
        portMenuProvider.close();
        bindingsMenuProvider.close();
      }

      event.stopPropagation();
      event.preventDefault();

      popupMenuProvider.close();
      portMenuProvider.close();
      bindingsMenuProvider.close();

      // console.log('CpnUpdater(), domEvent, mousedown, popup menu, x,y = ', event.x, event.y);

      if (modeling.isEditable()) {
        if (element) {
          // console.log('CpnUpdater(), domEvent, mousedown, popup menu, element = ', element);

          if (isAny(element, [CPN_PLACE, CPN_TRANSITION, CPN_CONNECTION])) {
            popupMenuProvider.close();
            contextPad.open(element);
          } else {
            contextPad.close();
            popupMenuProvider.open(element, { cursor: { x: position.x, y: position.y + 90 } });
          }
        }
      }
    }
  });


  function showHideMarking(tokenElement) {
    // console.log('CpnUpdater(), showHideMarking(), tokenElement = ', tokenElement);

    if (!tokenElement || !tokenElement.label || !is(tokenElement.label, CPN_MARKING_LABEL))
      return;

    tokenElement.label.hidden = !tokenElement.label.hidden;
    // tokenElement.label.hidden = false;
    modeling.updateElement(tokenElement.label, true);

    if (!tokenElement.label.hidden) {
      modeling.moveShape(tokenElement.label, { x: 0, y: 0 }, tokenElement.label.parent, undefined, undefined);
    }
  }

  // crop connection ends during create/update
  function cropConnection(e) {
    // console.log('CpnUpdater(), cropConnection(e), e = ', e);

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
    // console.log('CpnUpdater(), updateNewConnection(e), e = ', e);
    const context = e.context;
    const connection = context.connection;
    connection.type = CPN_CONNECTION;
  }

  function updateNewShape(e) {
    // console.log('CpnUpdater(), updateNewShape(e), e = ', e);
    /* const context = e.context;
     const shape = context.shape;
     shape.type = CPN_PLACE;*/
  }

  // update bounds
  function updateBounds(e) {
    var shape = e.context.shape;

    var target = shape;
    var bounds = target.bounds || {};

    assign(bounds, {
      x: shape.x,
      y: shape.y,
      width: shape.width,
      height: shape.height
    });
  }

  function updateLabels(element) {
    // console.log('CpnUpdater(), updateLabel(), element = ', element);
    if (element.labels) {
      for (let label of element.labels) {
        updateCpnElement(label);
      }
    }

    // if (element.labelTarget) {
    //   element.parent = element.labelTarget;
    // }
  }



  function updateCpnElement(element) {
    // export  const modelCase = {
    //   'cpn:Place': { form: 'ellipse', entry: ['initmark', 'type'] },
    //   'cpn:Transition': { form: 'box', entry: ['time', 'code', 'priority', 'cond'] },
    //   'cpn:Connection': { entry: ['annot'] }
    // }

    // console.log('CpnUpdater().updateCpnElement(), element = ', element);

    var shape = element;
    let elemCase = modelCase[element.type];
    const cpnElement = shape.cpnElement;

    if (cpnElement) {

      // update shapes
      if (shape.x && shape.y && shape.width && shape.height) {
        // if element is any shape object
        if (cpnElement.posattr) {
          cpnElement.posattr._x = Math.round((shape.x + shape.width / 2)).toFixed(6); // .toString();
          cpnElement.posattr._y = Math.round((shape.y + shape.height / 2) * -1).toFixed(6); // .toString();
        }
        // if element is Place object
        if (cpnElement.ellipse) {
          cpnElement.ellipse._w = Math.round(shape.width).toFixed(6); // .toString();
          cpnElement.ellipse._h = Math.round(shape.height).toFixed(6); // .toString();
        }
        // if element is Transition object
        if (cpnElement.box) {
          cpnElement.box._w = Math.round(shape.width).toFixed(6); // .toString();
          cpnElement.box._h = Math.round(shape.height).toFixed(6); // .toString();
        }
      }

      // update connections
      if (shape.waypoints instanceof Array && shape.waypoints.length > 2) {
        // console.log('CpnUpdater().updateCpnElement(), connection, element = ', element);

        // let bendpoints = cpnElement.bendpoint || [];
        let bendpoints = [];
        for (let i = 1; i < shape.waypoints.length - 1; i++) {
          const wp = shape.waypoints[i];

          // if (!updateBendpoints(cpnElement, wp)) {
          // create new bendpoint item for cpnElement
          const position = {
            x: Math.round(wp.x).toFixed(6), // .toString(),
            y: Math.round(wp.y).toFixed(6), // .toString(),
          };

          bendpoints.push({
            posattr: getDefPosattr(position),
            fillattr: getDefFillattr(),
            lineattr: getDefLineattr(),
            textattr: getDefTextattr(),
            _id: getNextId(),
            _serial: (1).toString()
          });
          // }
        }


        if (bendpoints.length > 0) {

          const wp0 = shape.waypoints[0];

          let reverse = false;
          if (cpnElement._orientation && cpnElement._orientation == 'TtoP') {
            reverse = true;
          }

          // console.log('CpnUpdater().updateCpnElement(), connection, wp0 = ', JSON.stringify(wp0));
          // console.log('CpnUpdater().updateCpnElement(), connection, bendpoints (1) = ', JSON.stringify(bendpoints));

          // // sort by distance from first point
          bendpoints = bendpoints.sort((a, b) => {
            let d_a = getDistance(wp0, { x: a.posattr._x, y: -1 * a.posattr._y });
            let d_b = getDistance(wp0, { x: b.posattr._x, y: -1 * b.posattr._y });
            return reverse ? d_a - d_b : d_b - d_a;
          });

          // console.log('CpnUpdater().updateCpnElement(), connection, bendpoints (2) = ', JSON.stringify(bendpoints));

          cpnElement.bendpoint = bendpoints;
        }


      }


      let text = shape.text || shape.name || '';
      // let text = shape.text || shape.name;
      text = text.trim();
      // if (shape.defaultValue && text === shape.defaultValue) {
      //   text = '';
      // }

      if (typeof cpnElement.text === 'object') {
        cpnElement.text.__text = text;
      } else {
        cpnElement.text = text;
      }
    }

    updateLabels(element);
  }

  function updateBendpoints(cpnElement, shapeWaypoint) {
    let updated = false;
    if (cpnElement && cpnElement.bendpoints instanceof Array) {
      for (const bp of cpnElement.bendpoints) {
        if (bp._id === shapeWaypoint.id) {
          const position = {
            x: Math.round(shapeWaypoint.x).toFixed(6), // .toString(),
            y: Math.round(shapeWaypoint.y).toFixed(6), // .toString(),
          };
          bp.posattr = getDefPosattr(position);
          updated = true;
          break;
        }
      }
    }
    return updated;
  }
}

