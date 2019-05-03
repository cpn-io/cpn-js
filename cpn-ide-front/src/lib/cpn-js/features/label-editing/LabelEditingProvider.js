import {
  assign
} from 'min-dash';

import {
  getLabel
} from './LabelEditingUtil';

import {CPN_CONNECTION, CPN_TEXT_ANNOTATION, is, isCpn, isAny, CPN_LABEL} from '../../util/ModelUtil';

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
  this._eventBus = eventBus;
  this._directEditing = directEditing;

  directEditing.registerProvider(this);

  // listen to edit event
  eventBus.on('element.edit', function (event) {
    activateDirectEdit(event.element, true);
  });

  // listen to direct editing event
  // eventBus.on('element.dblclick', function (event) {
  eventBus.on('element.click', function (event) {
    if (event.element.type === CPN_CONNECTION) {
      if (event.element.labels > 0) {
        event.element = event.element.labels[0];
      } else {
        return;
      }
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
    if (force || isCpn(element)) {
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
  if (is(element, CPN_LABEL)) {
    assign(options, {
      centerVertically: false,
      centerHorizontally: false,
    });
  } else
  if (isCpn(element)) {
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
  if (is(element, CPN_TEXT_ANNOTATION)) {
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

  assign(bounds, {
    width: bbox.width,
    height: bbox.height
  });

  assign(style, {
    fontSize: defaultFontSize + 'px',
    lineHeight: defaultLineHeight,
    // paddingTop: (7 * zoom) + 'px',
    // paddingBottom: (7 * zoom) + 'px',
    // paddingLeft: (5 * zoom) + 'px',
    // paddingRight: (5 * zoom) + 'px'
  });

  return {bounds: bounds, style: style};
};


LabelEditingProvider.prototype.update = function (
  element, newLabel,
  activeContextText, bounds) {

  console.log('LabelEditingProvider.prototype.update(), element = ', element);
  console.log('LabelEditingProvider.prototype.update(), newLabel = ', newLabel);
  console.log('LabelEditingProvider.prototype.update(), activeContextText = ', activeContextText);

  var newBounds,
    bbox;

  element.name = newLabel;
  element.text = newLabel;

  this._eventBus.fire('element.changed', {element: element});
};

LabelEditingProvider.prototype.gotoNext = function (element) {
  console.log('LabelEditingProvider.prototype.gotoNext(), element = ', element);

  if (!element) {
    return;
  }

  let nextElement;

  if (element.labels && element.labels.length > 0) {
    // if element is shape
    nextElement = element.labels[0];
  } else {
    // if element is label
    if (element.labelTarget) {
      const parentElement = element.labelTarget;
      const labels = parentElement.labels;

      let n = 0;
      // find index of current label
      for (n = 0; n < labels.length; n++) {
        if (labels[n] === element) {
          break;
        }
      }

      if (n < labels.length - 1)
        nextElement = labels[n + 1];
      else
        nextElement = parentElement;
    }
  }

  if (nextElement)
    this._directEditing.activate(nextElement);
}

// helpers //////////////////////

function isEmptyText(label) {
  return !label || !label.trim();
}
