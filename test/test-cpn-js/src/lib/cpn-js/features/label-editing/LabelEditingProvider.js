import {
  assign
} from 'min-dash';

import {
  getLabel
} from './LabelEditingUtil';

import {is, isAny} from '../../util/ModelUtil';

import {
  getExternalLabelMid,
  isLabelExternal,
  hasExternalLabel,
  isLabel
} from '../../util/LabelUtil';


export default function LabelEditingProvider(
  eventBus, canvas, directEditing,
  modeling, resizeHandles, textRenderer) {

  this._canvas = canvas;
  this._modeling = modeling;
  this._textRenderer = textRenderer;

  directEditing.registerProvider(this);

  // listen to edit event
  eventBus.on('element.edit', function (event) {
    activateDirectEdit(event.element, true);
  });

  // listen to direct editing event
  // eventBus.on('element.dblclick', function (event) {
  eventBus.on('element.click', function (event) {
    if (event.element.type === 'cpn:Connection' && event.element.labels[0]) {
      event.element = event.element.labels[0];
    }
    activateDirectEdit(event.element, true);
  });

  eventBus.on('element.tab', function (event, context) {
    if (directEditing.isActive()) {
      directEditing.complete();
      console.log('tabFlag')
    }
    activateDirectEdit(context.element, true);
  });


  // complete on followup canvas operation
  eventBus.on([
    'element.mousedown',
    'drag.init',
    'canvas.viewbox.changing',
    'autoPlace',
    'popupMenu.open'
  ], function (event) {

    if (directEditing.isActive()) {
      directEditing.complete();
    }
  });

  // cancel on command stack changes
  eventBus.on(['commandStack.changed'], function (e) {
    if (directEditing.isActive()) {
      directEditing.cancel();
    }
  });


  eventBus.on('directEditing.activate', function (event) {
    resizeHandles.removeResizers();
  });

  eventBus.on('create.end', 500, function (event) {

    var element = event.shape,
      canExecute = event.context.canExecute,
      isTouch = event.isTouch;

    // TODO(nikku): we need to find a way to support the
    // direct editing on mobile devices; right now this will
    // break for desworkflowediting on mobile devices
    // as it breaks the user interaction workflow

    // TODO(nre): we should temporarily focus the edited element
    // here and release the focused viewport after the direct edit
    // operation is finished
    if (isTouch) {
      return;
    }

    if (!canExecute) {
      return;
    }

    activateDirectEdit(element);
  });

  eventBus.on('autoPlace.end', 500, function (event) {
    activateDirectEdit(event.shape);
  });


  function activateDirectEdit(element, force) {
    if (force ||
      isAny(element, ['cpn:TextAnnotation', 'cpn:Place', 'cpn:Transition', 'cpn:Label']) ||
      isCollapsedSubProcess(element)) {

      directEditing.activate(element);
    }
  }

}

LabelEditingProvider.$inject = [
  'eventBus',
  'canvas',
  'directEditing',
  'modeling',
  'resizeHandles',
  'textRenderer'
];


/**
 * Activate direct editing for activities and text annotations.
 *
 * @param  {djs.model.Base} element
 *
 * @return {Object} an object with properties bounds (position and size), text and options
 */
LabelEditingProvider.prototype.activate = function (element) {

  console.log('LabelEditingProvider.activate(), element = ', element);

  // text
  var text = getLabel(element);
  if (element.type === 'cpn:Transition') {
    text = element.name;
  }
  // if(element.type === 'cpn:Connection') {
  //   element = element.labels[0];
  // }

  if (text === undefined) {
    return;
  }

  var context = {
    text: text
  };

  // bounds
  var bounds = this.getEditingBBox(element);

  assign(context, bounds);

  var options = {};

  // tasks
  if (
    isAny(element, [
      'cpn:Place',
      'cpn:Transition',
      'cpn:Connection',
      'cpn:Label',
    ])
  ) {
    assign(options, {
      centerVertically: true,
      centerHorizontally: true,
    });
  }

  // external labels
  if (isLabelExternal(element)) {
    assign(options, {
      autoResize: true
    });
  }

  // text annotations
  if (is(element, 'cpn:TextAnnotation')) {
    assign(options, {
      resizable: true,
      autoResize: true
    });
  }

  assign(context, {
    options: options
  });

  return context;
};


/**
 * Get the editing bounding box based on the element's size and position
 *
 * @param  {djs.model.Base} element
 *
 * @return {Object} an object containing information about position
 *                  and size (fixed or minimum and/or maximum)
 */
LabelEditingProvider.prototype.getEditingBBox = function (element) {
  var canvas = this._canvas;

  console.log('LabelEditingProvider.prototype.getEditingBBox, element = ', element);

  // var target = element.label || element;
  var target = element;
  var bbox = canvas.getAbsoluteBBox(target);

  var mid = {
    x: bbox.x + bbox.width / 2,
    y: bbox.y + bbox.height / 2
  };

  // default position
  var bounds = {x: bbox.x, y: bbox.y};

  var zoom = canvas.zoom();

  var defaultStyle = this._textRenderer.getDefaultStyle(),
    externalStyle = this._textRenderer.getExternalStyle();

  // take zoom into account
  var externalFontSize = externalStyle.fontSize * zoom,
    externalLineHeight = externalStyle.lineHeight,
    defaultFontSize = defaultStyle.fontSize * zoom,
    defaultLineHeight = defaultStyle.lineHeight;

  var style = {
    fontFamily: this._textRenderer.getDefaultStyle().fontFamily,
    fontWeight: this._textRenderer.getDefaultStyle().fontWeight
  };

  // internal labels for tasks and collapsed call activities,
  // sub processes and participants
  // if (isCpn(element)) {

    assign(bounds, {
      width: bbox.width,
      height: bbox.height
    });

    assign(style, {
      fontSize: defaultFontSize + 'px',
      lineHeight: defaultLineHeight,
      paddingTop: (7 * zoom) + 'px',
      paddingBottom: (7 * zoom) + 'px',
      paddingLeft: (5 * zoom) + 'px',
      paddingRight: (5 * zoom) + 'px'
    });
  // }

  // var width = 90 * zoom,
  //   paddingTop = 7 * zoom,
  //   paddingBottom = 4 * zoom;
  //
  // // external labels for events, data elements, gateways and connections
  // if (target.labelTarget) {
  //   assign(bounds, {
  //     width: width,
  //     height: bbox.height + paddingTop + paddingBottom,
  //     x: mid.x - width / 2,
  //     y: bbox.y - paddingTop
  //   });
  //
  //   assign(style, {
  //     fontSize: externalFontSize + 'px',
  //     lineHeight: externalLineHeight,
  //     paddingTop: paddingTop + 'px',
  //     paddingBottom: paddingBottom + 'px'
  //   });
  // }
  //
  // // external label not yet created
  // if (isLabelExternal(target)
  //   && !hasExternalLabel(target)
  //   && !isLabel(target)) {
  //
  //   var externalLabelMid = getExternalLabelMid(element);
  //
  //   var absoluteBBox = canvas.getAbsoluteBBox({
  //     x: externalLabelMid.x,
  //     y: externalLabelMid.y,
  //     width: 0,
  //     height: 0
  //   });
  //
  //   var height = externalFontSize + paddingTop + paddingBottom;
  //
  //   assign(bounds, {
  //     width: width,
  //     height: height,
  //     x: absoluteBBox.x - width / 2,
  //     y: absoluteBBox.y - height / 2
  //   });
  //
  //   assign(style, {
  //     fontSize: externalFontSize + 'px',
  //     lineHeight: externalLineHeight,
  //     paddingTop: paddingTop + 'px',
  //     paddingBottom: paddingBottom + 'px'
  //   });
  // }
  //
  // // text annotations
  // if (is(element, 'cpn:TextAnnotation')) {
  //   assign(bounds, {
  //     width: bbox.width,
  //     height: bbox.height,
  //     minWidth: 30 * zoom,
  //     minHeight: 10 * zoom
  //   });
  //
  //   assign(style, {
  //     textAlign: 'left',
  //     paddingTop: (5 * zoom) + 'px',
  //     paddingBottom: (7 * zoom) + 'px',
  //     paddingLeft: (7 * zoom) + 'px',
  //     paddingRight: (5 * zoom) + 'px',
  //     fontSize: defaultFontSize + 'px',
  //     lineHeight: defaultLineHeight
  //   });
  // }

  // -----------------------------------------------
  // bounds = {
  //   x: element.x,
  //   y: element.y,
  //   width: element.width * zoom,
  //   height: element.height * zoom,
  // }

  return {bounds: bounds, style: style};
};


LabelEditingProvider.prototype.update = function (
  element, newLabel,
  activeContextText, bounds) {

  console.log('LabelEditingProvider.prototype.update(), element = ', element);

  var newBounds,
    bbox;

  if (is(element, 'cpn:TextAnnotation')) {
    bbox = this._canvas.getAbsoluteBBox(element);

    newBounds = {
      x: element.x,
      y: element.y,
      width: element.width / bbox.width * bounds.width,
      height: element.height / bbox.height * bounds.height
    };
  }

  if (element.name) element.name = newLabel;
  if (element.text) element.text = newLabel;
};

// helpers //////////////////////

function isEmptyText(label) {
  return !label || !label.trim();
}