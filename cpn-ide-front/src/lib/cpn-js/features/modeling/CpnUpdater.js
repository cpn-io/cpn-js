import inherits from "inherits";

import CommandInterceptor from "diagram-js/lib/command/CommandInterceptor";

import { toPoint } from "diagram-js/lib/util/Event";

import { closest as domClosest } from "min-dom";

function getGfx(target) {
  var node = domClosest(target, "svg, .djs-element", true);
  // var node = domClosest(target, 'rect, .djs-hit', true);
  return node;
}

inherits(CpnUpdater, CommandInterceptor);

import {
  is,
  isCpn,
  isAny,
  CPN_CONNECTION,
  CPN_LABEL,
  CPN_PLACE,
  CPN_TOKEN_LABEL,
  CPN_MARKING_LABEL,
  CPN_TRANSITION,
  modelCase,
} from "../../util/ModelUtil";

CpnUpdater.$inject = [
  "eventBus",
  "modeling",
  "elementRegistry",
  "connectionDocking",
  "selection",
  "popupMenuProvider",
  "contextPad",
  "canvas",
  "bindingsMenuProvider",
  "layouter",
  "cpnRenderer",
  "textRenderer",
];

import { event as domEvent } from "min-dom";

import Modeling from "./Modeling";
import { assign } from "min-dash";

import {
  getDefPosattr,
  getDefFillattr,
  getDefLineattr,
  getDefTextattr,
  getDefText,
  getNextId,
} from "./CpnElementFactory";
import { getDistance } from "../../draw/CpnRenderUtil";

/**
 * A handler responsible for updating
 * once changes on the diagram happen
 */
export default function CpnUpdater(
  eventBus,
  modeling,
  elementRegistry,
  connectionDocking,
  selection,
  popupMenuProvider,
  contextPad,
  canvas,
  bindingsMenuProvider,
  layouter,
  cpnRenderer,
  textRenderer
) {
  this._canvas = canvas;
  this._modeling = modeling;
  this._elementRegistry = elementRegistry;
  this._cpnRenderer = cpnRenderer;
  this._textRenderer = textRenderer;

  const self = this;
  const container = self._canvas.getContainer();

  // console.log('CpnUpdater()');

  CommandInterceptor.call(this, eventBus);

  this.executed(["connection.create"], updateNewConnection);

  this.executed(
    [
      "connection.create",
      "connection.layout",
      "connection.reconnectEnd",
      "connection.reconnectStart",
    ],
    cropConnection
  );

  this.executed(["shape.create"], updateNewShape);

  // this.reverted(['connection.layout'], function (e) {
  //   delete e.context.cropped;
  // });

  let animateArcIdList = [];

  eventBus.on("token.animate", function (event) {
    console.log(
      "TOKEN ANIMATION, token.animate, modeling.getInstanseId() = ",
      self._modeling.getInstanseId()
    );

    animateArcIdList = [];
    for (const arcId of event.arcIdList) {
      animateArcIdList.push(arcId);
    }

    console.log(
      "TOKEN ANIMATION, token.animate, animateArcIdList = ",
      animateArcIdList
    );

    animateArcList(animateArcIdList);
  });

  eventBus.on("shape.changed", function (event) {
    // updateLabels(e.element);
    // console.log('CpnUpdater(), shape.changed, event.element = ', event.element);
    // updateBounds({ context: { shape: event.element } });

    updateCpnElement(event.element);
  });

  eventBus.on("connection.changed", function (event) {
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

  // eventBus.on('directEditing.complete', (event) => {
  //   if (event && event.active && event.active.element) {
  //     const element = event.active.element;
  //     console.log('DIRECTEDITING.COMPLETE, element = ', element);
  //     if (element.labelType === "initmark") {
  //     }
  //   }
  // });

  eventBus.on("shape.create.end", (event) => {
    // console.log('CpnUpdater(), shape.create.end, event = ', event);

    // updateCpnElement(event.element);
    // layouter.layoutConnections();

    modeling.updateElement(event.element, true);
  });
  eventBus.on("connection.create", (event) => {
    // console.log('CpnUpdater(), connection.create, event = ', event);
    // updateCpnElement(event.element);
  });

  eventBus.on("element.hover", function (event) {
    var element = event.element;
    // console.log('CpnUpdater(), element.hover, element = ', element);

    // eventBus.fire('element.click', { element: element });
    if (
      isCpn(element) &&
      !is(element, CPN_LABEL) &&
      !is(element, CPN_CONNECTION)
    ) {
      popupMenuProvider.close();

      selection.select(element);
    }
  });

  eventBus.on("element.click", function (event) {
    // console.log('CpnUpdater(), element.click, event = ', event);

    popupMenuProvider.close();
    contextPad.close();
    bindingsMenuProvider.close();

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

  eventBus.on("popupMenu.open", function (event) {
    // console.log('CpnUpdater(), popupMenu.open, event = ', event);
  });

  eventBus.on("element.mousedown", function (event) {
    // console.log('CpnUpdater(), element.mousedown, event = ', event);
  });

  // domEvent.bind(document, 'mouseup', function (event) {
  //   console.log('CpnUpdater(), domEvent, mouseup, event = ', event);
  // });

  // object.addEventListener("click", myScript);

  domEvent.bind(container, "mousedown", function (event) {
    console.log("CpnUpdater(), mousedown ", event);
    // console.log('CpnUpdater(), domEvent, mousedown, event = ', event);
    // console.log('CpnUpdater(), mousedown, container = ', container);
    // console.log('CpnUpdater(), canvas.getRootElement() = ', canvas.getRootElement());

    if (event.button === 2) {
      const position = toPoint(event);
      const target = document.elementFromPoint(position.x, position.y);
      const gfx = getGfx(target);
      var element;
      if (gfx) {
        element = elementRegistry.get(gfx) || canvas.getRootElement();
      }

      // console.log('CpnUpdater(), domEvent, mousedown, target = ', target);
      // console.log('CpnUpdater(), domEvent, mousedown, gfx = ', gfx);
      console.log("CpnUpdater(), mousedown, element = ", element);

      if (element && element === canvas.getRootElement()) {
        popupMenuProvider.close();
        contextPad.close();
        bindingsMenuProvider.close();
      }

      event.stopPropagation();
      event.preventDefault();

      popupMenuProvider.close();
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
            popupMenuProvider.open(element, {
              cursor: { x: position.x, y: position.y },
              editable: true,
            });
          }
        }
      } else {
        if (element) {
          if (isAny(element, [CPN_PLACE, CPN_TRANSITION, CPN_CONNECTION])) {
            // popupMenuProvider.close();
            // contextPad.open(element);
          } else {
            contextPad.close();
            popupMenuProvider.open(element, {
              cursor: { x: position.x, y: position.y },
              editable: false,
            });
          }
        }
      }
    }
  });

  function showHideMarking(tokenElement) {
    console.log(
      "CpnUpdater(), showHideMarking(), tokenElement = ",
      tokenElement
    );

    if (
      !tokenElement ||
      !tokenElement.label ||
      !is(tokenElement.label, CPN_MARKING_LABEL)
    )
      return;

    const markingElement = tokenElement.label;

    markingElement.hidden = !markingElement.hidden;

    // if (!markingElement.hidden) {
    //   var newBounds = textRenderer.getExternalLabelBounds(markingElement, markingElement.text);
    //   if (newBounds.width < 10)
    //     newBounds.width = 10;
    //   modeling.resizeShape(markingElement, newBounds);
    //   modeling.moveShape(markingElement, { x: 0, y: 0 }, markingElement.parent, undefined, undefined);
    // }
    // modeling.moveShape(tokenElement, { x: 0, y: 0 }, tokenElement.parent, undefined, undefined);

    modeling.updateElement(markingElement, true);
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
      height: shape.height,
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

    console.log("CpnUpdater().updateCpnElement(), element = ", element);

    var shape = element;
    let elemCase = modelCase[element.type];
    const cpnElement = shape.cpnElement;

    if (cpnElement) {
      // update shapes
      if (shape.x && shape.y && shape.width && shape.height) {

        // if token label
        if (is(element, CPN_TOKEN_LABEL)) {
          const placeElement = element.labelTarget;
          if (placeElement && is(placeElement, CPN_PLACE)) {
            console.log(
              "CpnUpdater().updateCpnElement(), cpnElement._x,_y (0) = ",
              cpnElement._x, cpnElement._y
            );

            cpnElement._x = Math.round(shape.x - (placeElement.x + placeElement.width)).toFixed(6);
            cpnElement._y = Math.round(shape.y - (placeElement.y - placeElement.height/2)).toFixed(6);

            console.log(
              "CpnUpdater().updateCpnElement(), cpnElement._x,_y (1) = ",
              cpnElement._x, cpnElement._y
            );
          }
        }

        // if element is any shape object
        if (cpnElement.posattr) {
          cpnElement.posattr._x = Math.round(shape.x + shape.width / 2).toFixed(
            6
          ); // .toString();
          cpnElement.posattr._y = Math.round(
            (shape.y + shape.height / 2) * -1
          ).toFixed(6); // .toString();
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
            _serial: (1).toString(),
          });
          // }
        }

        if (bendpoints.length > 0) {
          const wp0 = shape.waypoints[0];

          let reverse = false;
          if (cpnElement._orientation && cpnElement._orientation == "TtoP") {
            reverse = true;
          }

          // console.log('CpnUpdater().updateCpnElement(), connection, wp0 = ', JSON.stringify(wp0));
          // console.log('CpnUpdater().updateCpnElement(), connection, bendpoints (1) = ', JSON.stringify(bendpoints));

          // // sort by distance from first point
          bendpoints = bendpoints.sort((a, b) => {
            let d_a = getDistance(wp0, {
              x: a.posattr._x,
              y: -1 * a.posattr._y,
            });
            let d_b = getDistance(wp0, {
              x: b.posattr._x,
              y: -1 * b.posattr._y,
            });
            return reverse ? d_a - d_b : d_b - d_a;
          });

          // console.log('CpnUpdater().updateCpnElement(), connection, bendpoints (2) = ', JSON.stringify(bendpoints));

          cpnElement.bendpoint = bendpoints;
        }
      }

      let text = shape.text || shape.name || "";
      // let text = shape.text || shape.name;
      text = text.trim();
      // if (shape.defaultValue && text === shape.defaultValue) {
      //   text = '';
      // }

      if (typeof cpnElement.text === "object") {
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

CpnUpdater.prototype.animateArcList = function (
  arcIdList,
  speedMs,
  income = true
) {
  const updater = this;
  const modeling = this._modeling;
  const renderer = this._cpnRenderer;

  return new Promise(function (resolve, reject) {
    let arcIdCount = arcIdList.length;
    if (arcIdCount === 0) {
      resolve();
    }

    for (const arcId of arcIdList) {
      const arc = modeling.getElementById(arcId);
      if (arc) {
        let reverse = false;

        // arc._orientation === 'BOTHDIR'

        if (income && is(arc.source, CPN_TRANSITION)) {
          reverse = true;
        }

        if (!income && is(arc.source, CPN_PLACE)) {
          reverse = true;
        }

        renderer.drawArcAnimation(arc, speedMs, reverse).then((result) => {
          console.log(
            "TOKEN ANIMATION COMPLETE, Promise complete!, result.id = ",
            result.id,
            arcIdCount
          );

          arcIdCount--;
          if (arcIdCount === 0) {
            console.log("TOKEN ANIMATION COMPLETE, RESOLVE ALL");
            resolve();
          }
        });
      }
    }
  });

  // return new Promise(function (resolve, reject) {

  //   if (arcIdList.length > 0) {
  //     const arcId = arcIdList[0];

  //     const element = modeling.getElementById(arcId);
  //     if (element) {

  //       renderer.drawArcAnimation(element, speedMs).then(() => {
  //         console.log('TOKEN ANIMATION, drawArcAnimation(), Promise complete!');

  //         if (arcIdList.length > 1) {
  //           arcIdList.shift();
  //           updater.animateArcList(arcIdList, speedMs).then(() => {
  //             resolve('complete');
  //           });
  //         } else {
  //           resolve('complete.all');
  //         }
  //       });

  //     } else {

  //       if (arcIdList.length > 1) {
  //         arcIdList.shift();
  //         updater.animateArcList(arcIdList).then(() => {
  //           resolve('complete');
  //         });
  //       } else {
  //         resolve('complete.all');
  //       }

  //     }
  //   }
  //   else {
  //     resolve('complete.all');
  //   }

  // });
};
