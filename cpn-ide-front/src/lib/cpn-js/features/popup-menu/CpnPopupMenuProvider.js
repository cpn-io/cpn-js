import { forEach, filter } from "min-dash";
import {
  is,
  CPN_PLACE,
  CPN_TRANSITION,
  CPN_TEXT_ANNOTATION,
  CPN_LABEL,
} from "../../util/ModelUtil";
import { getNextId } from "../modeling/CpnElementFactory";

import { event as domEvent } from "min-dom";

CpnPopupMenuProvider.$inject = [
  "create",
  "cpnFactory",
  "canvas",
  "popupMenu",
  "modeling",
  "connect",
  "rules",
  "translate",
  "eventBus",
  "copyPaste",
  "elementRegistry",
];

/**
 * This module is an element agnostic replace menu provider for the popup menu.
 */
export default function CpnPopupMenuProvider(
  create,
  cpnFactory,
  canvas,
  popupMenu,
  modeling,
  connect,
  rules,
  translate,
  eventBus,
  copyPaste,
  elementRegistry
) {
  this._create = create;
  this._cpnFactory = cpnFactory;
  this._canvas = canvas;
  this._popupMenu = popupMenu;
  this._modeling = modeling;
  this._connect = connect;
  this._rules = rules;
  this._translate = translate;
  this._eventBus = eventBus;
  this._elementRegistry = elementRegistry;
  this._copyPaste = copyPaste;

  this.register();

  this._element = undefined;
  this._position = undefined;
  this._editable = undefined;

  this._offsetY = 90;

  // domEvent.bind(container, 'mousedown', function (event) {
  //   console.log('CpnPopupMenuProvider(), mousedown ', event);
  // });
}

/**
 * Register replace menu provider in the popup menu
 */
CpnPopupMenuProvider.prototype.register = function () {
  this._popupMenu.registerProvider("cpnPopupMenu", this);
};

CpnPopupMenuProvider.prototype.open = function (element, position) {
  this._element = element;
  this._position = position.cursor;
  this._editable = position.editable;

  console.log(
    "CpnPopupMenuProvider, open(), element, _position = ",
    element,
    position
  );

  if (element.id.includes("root")) {
    position.cursor.y += 110;
  } else {
    position.cursor.y += 40;
  }

  this._popupMenu.open(element, "cpnPopupMenu", position);
};

CpnPopupMenuProvider.prototype.close = function () {
  if (
    this._popupMenu._current &&
    this._popupMenu._current.className === "cpnPopupMenu"
  )
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
CpnPopupMenuProvider.prototype.getEntries = function (element) {
  const self = this;

  // console.log('CpnPopupMenuProvider.prototype.getEntries, element = ', element);

  var entries = [];
  var event = new MouseEvent("contextmenu");

  var createPlaceMenuEntry = {
    id: "_menuItem_createPlace",
    label: "New Place",
    className: "cpn-js-icon-place",
    action: function () {
      self._createShape(event, CPN_PLACE);
    },
  };

  var createTransitionMenuEntry = {
    id: "_menuItem_createTransition",
    label: "New Transition",
    className: "cpn-js-icon-transition",
    action: function () {
      self._createShape(event, CPN_TRANSITION);
    },
  };

  var createSubpageMenuEntry = {
    id: "_menuItem_createSubpage",
    label: "New Subpage",
    className: "cpn-js-icon-subpage",
    action: function () {
      self._createSubpage(event);
    },
  };

  var createAuxMenuEntry = {
    id: "_menuItem_createAux",
    label: "New Aux",
    className: "cpn-js-icon-aux",
    action: function () {
      self._createShape(event, CPN_TEXT_ANNOTATION);
    },
  };

  var createPasteMenuEntry = {
    id: "_menuItem_paste",
    label: "Paste",
    className: "cpn-js-icon-paste",
    action: function () {
      self._paste(event);
    },
  };

  var runScriptOnServer = {
    id: "_menuItem_script",
    label: "Run script",
    // className: 'fas fa-cogs',
    className: "cpn-js-icon-run",
    action: () => {
      self._popupMenu.close();
      console.log("TEXT ", this._element.text);
      this._eventBus.fire("aux.run", { script: this._element.text });
    },
  };

  var deleteMenuEntry = {
    id: "_menuItem_delete",
    label: "Delete",
    // className: 'popup-menu-icon-delete',
    className: "cpn-js-icon-trash",
    action: function () {
      self._popupMenu.close();
      self._modeling.removeElements([element]);
    },
  };


  var pastMenuEntry = {
    id: "_menuItem_past",
    label: "Past",
    // className: 'popup-menu-icon-delete',
    className: "fas fa-copy",
    action: function () {
      self._popupMenu.close();
      let elementToPast  =  JSON.parse(localStorage.getItem('clipboardElement'));
      console.log('Past ', elementToPast);
       localStorage.removeItem('clipboardElement')
      self._paste(event, elementToPast);

    },
  };

  // var connectMenuEntry = {
  //   id: '_menuItem_connect',
  //   label: 'Connect',
  //   className: 'popup-menu-icon-connect',
  //   action: function () {
  //     self._popupMenu.close();
  //     self._connect.start(event, element);
  //   }
  // };

  if (element.id === "__implicitroot" && this._editable) {
    entries.push(createPlaceMenuEntry);
    entries.push(createTransitionMenuEntry);
    entries.push(createSubpageMenuEntry);
    entries.push(createAuxMenuEntry);
    if(localStorage.getItem('clipboardElement')){
      entries.push(pastMenuEntry);
    }

    // entries.push(createPasteMenuEntry);
  }

  // if (is(element, CPN_PLACE)) {
  //   entries.push(createTransitionMenuEntry);
  //   entries.push(connectMenuEntry);
  //   entries.push(deleteMenuEntry);
  // }

  // if (is(element, CPN_TRANSITION)) {
  //   entries.push(createPlaceMenuEntry);
  //   entries.push(connectMenuEntry);
  //   entries.push(deleteMenuEntry);
  // }

  if (element.type === CPN_LABEL && element.labelType === "aux") {
    if (this._editable) {
      entries.push(deleteMenuEntry);
    } else {
      entries.push(runScriptOnServer);
    }
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
CpnPopupMenuProvider.prototype.getHeaderEntries = function (element) {
  return [];
};

CpnPopupMenuProvider.prototype._createShape = function (event, type) {
  // console.log('CpnPopupMenuProvider.prototype._createPlace, this.position = ', this._position);

  this._popupMenu.close();
  const position = toLocalPoint(this._canvas, this._position);
  position.y -= this._offsetY;

  let element = this._cpnFactory.createShape(
    undefined,
    undefined,
    type,
    position,
    true
  );

  setTimeout(() => {
    this._eventBus.fire("element.click", { element: element });
    this._eventBus.fire("shape.create.end", { elements: [element] });
    this._eventBus.fire("shape.editing.activate", { shape: element });
    this._eventBus.fire("shape.contextpad.activate", { shape: element });
  }, 1);
};

CpnPopupMenuProvider.prototype._createSubpage = function (event) {
  console.log(
    "CpnPopupMenuProvider.prototype._createSubpage, this.position = ",
    this._position
  );

  this._popupMenu.close();
  const position = toLocalPoint(this._canvas, this._position);

  let transCpnElement = this._modeling.createShapeCpnElement(
    position,
    CPN_TRANSITION
  );

  setTimeout(() => {
    transCpnElement = this._modeling.declareSubPage(
      transCpnElement,
      "Subpage",
      getNextId()
    );

    let element = this._cpnFactory.createShape(
      undefined,
      transCpnElement,
      CPN_TRANSITION,
      position,
      true
    );
    this._eventBus.fire("shape.create.end", { elements: [element] });
    this._eventBus.fire("shape.editing.activate", { shape: element });
    this._eventBus.fire("shape.contextpad.activate", { shape: element });

    this._modeling.removeEmptyConnections();
  }, 1);
};

// CpnPopupMenuProvider.prototype._paste = function (event) {
//   var root = this._canvas.getRootElement();
//
//   this._popupMenu.close();
//   const position = toLocalPoint(this._canvas, this._position);
//   position.y -= this._offsetY;
//
//   var selectedElements = this._elementRegistry.filter(function (element) {
//     return element.selected;
//   });
//
//   // console.log("paste, root.children.length = ", root.children.length);
//
//   selectedElements.forEach((element) => {
//     const newCpnElement = { ...element.cpnElement, _id: getNextId() };
//     console.log("paste, newCpnElement = ", newCpnElement);
//     const newElement = this._cpnFactory.createShape(
//       undefined,
//       newCpnElement,
//       element.type,
//       position,
//       true
//     );
//   });
// };


CpnPopupMenuProvider.prototype._paste = function (event, elementToPast) {
  var root = this._canvas.getRootElement();

  this._popupMenu.close();
  const position = toLocalPoint(this._canvas, this._position);
  position.y -= this._offsetY;

  // var selectedElements = this._elementRegistry.filter(function (elementToPast) {
  //   return elementToPast.selected;
  // });
  var selectedElements= [];
  if(elementToPast instanceof Array )
    selectedElements =  elementToPast;
  else
    selectedElements.push(elementToPast);
  var deltaPosition  =  undefined;
  let arcsForCopy = [];
  let copyOriginalMapping = new Map();
  let idObj =  undefined;
  selectedElements.forEach((element) => {
   // let originalElement = this._modeling.getElementById(element.cpnElement._id)
    let elementArcs = this._modeling.getShapeArcs(element);
    elementArcs.forEach((arc) => {
      if(!arcsForCopy.some(value => value.id === arc.id)) {
        arcsForCopy.push({
          id: arc.id,
          cpnPlaceId: arc.cpnPlace._id,
          cpnTransitionId: arc.cpnTransition._id,
          orient: arc.cpnElement._orientation,
          label: arc.labels[0]
        })
      }
    })


    let newCpnElement = element.cpnElement;//angular.copy({ ...element.cpnElement, _id: getNextId() };
    let id = Number.parseInt(getNextId().substr(2));
    idObj = {id: id};
    changeIdsForCopiedElement(newCpnElement, idObj, copyOriginalMapping);
    deltaPosition = deltaPosition || {
      x: position.x - Number.parseFloat(newCpnElement['posattr']['_x']),
      y: -position.y - Number.parseFloat(newCpnElement['posattr']['_y'])
    };
    changePositionForCopiedElement(newCpnElement, deltaPosition);
    console.log("paste, newCpnElement = ", newCpnElement);
    const newElement = this._cpnFactory.createShape(
      undefined,
      newCpnElement,
      element.type,
      position,
      true
    )

  });
  if(selectedElements.length > 1)
  arcsForCopy.forEach(arc => {
    let cpnPlace = this._modeling.getElementById(copyOriginalMapping.get(arc.cpnPlaceId));
    let cpnTransition = this._modeling.getElementById(copyOriginalMapping.get(arc.cpnTransitionId));
    let connect = this._modeling.createNewConnection(cpnPlace, cpnTransition, arc.orient);
    connect.cpnElement.annot.text = arc.label.text;
    this._eventBus.fire('element.changed', { element: connect });
  })
};


function changeIdsForCopiedElement( obj, idObj, copyOriginalMapping ) {
  for ( var prop in obj ) {
    if ( obj[prop] === Object(obj[prop]) ) changeIdsForCopiedElement( obj[prop], idObj, copyOriginalMapping);
    else if ( prop === '_id' ) {
        copyOriginalMapping.set(obj[prop], "ID" + idObj['id']);
        obj[prop] = "ID" + idObj['id'];
        idObj['id'] = idObj['id'] + 1;
    }
  }
};

function changePositionForCopiedElement( obj, deltaPos ) {
  for ( var prop in obj ) {
    if ( obj[prop] === Object(obj[prop]) && prop !== 'posattr' ) changePositionForCopiedElement( obj[prop], deltaPos);
    else if ( prop === 'posattr' ) {
      obj[prop]['_x'] = "" + (Number.parseFloat( obj[prop]['_x']) + deltaPos.x);
      obj[prop]['_y'] = "" +  (Number.parseFloat( obj[prop]['_y']) + deltaPos.y);
    }
  }
};


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
    y: viewbox.y + (globalPosition.y - clientRect.top) / viewbox.scale,
  };
}
