import {
  append as svgAppend,
  attr as svgAttr,
  create as svgCreate,
  remove as svgRemove
} from 'tiny-svg';

import {
  CPN_LABEL,
  CPN_TEXT_ANNOTATION,
  is,
  isCpn
} from '../../util/ModelUtil';

import {
  getStrokeColor
} from '../../draw/CpnRenderUtil';

import {
  translate
} from 'diagram-js/lib/util/SvgTransformUtil';

var MARKER_HIDDEN = 'djs-element-hidden',
  MARKER_LABEL_HIDDEN = 'djs-label-hidden';


export default function LabelEditingPreview(eventBus, canvas, modeling, elementRegistry, pathMap) {

  var self = this;

  var defaultLayer = canvas.getDefaultLayer();

  var element, absoluteElementBBox, gfx;

  this._modeling = modeling;

  eventBus.on('directEditing.activate', function (context) {
    var activeProvider = context.active;

    element = activeProvider.element;

    // console.log('LabelEditingPreview, directEditing.activate, element = ', element);
    // console.log('LabelEditingPreview, directEditing.activate, isCpn(element) = ', isCpn(element));

    // text annotation
    // if (is(element, CPN_LABEL) || is(element, CPN_TEXT_ANNOTATION)) {
    //   absoluteElementBBox = canvas.getAbsoluteBBox(element);
    //
    //   gfx = svgCreate('g');
    //
    //   var textPathData = pathMap.getScaledPath('TEXT_ANNOTATION', {
    //     xScaleFactor: 1,
    //     yScaleFactor: 1,
    //     containerWidth: element.width,
    //     containerHeight: element.height,
    //     position: {
    //       mx: 0.0,
    //       my: 0.0
    //     }
    //   });
    //
    //   var path = self.path = svgCreate('path');
    //
    //   svgAttr(path, {
    //     d: textPathData,
    //     strokeWidth: 2,
    //     stroke: getStrokeColor(element)
    //   });
    //
    //   svgAppend(gfx, path);
    //   svgAppend(defaultLayer, gfx);
    //   translate(gfx, element.x, element.y);
    // }

    if (isCpn(element)) {
      canvas.addMarker(element, MARKER_LABEL_HIDDEN);
    }
  });

  eventBus.on('directEditing.resize', function (context) {

    console.log('LabelEditiongPreview, directEditing.resize, context = ', context);

    // var newBounds = context.newBounds;
    // element.width = newBounds.width;
    // element.height = newBounds.height;

    // text label
    // if (is(element, CPN_LABEL)) {
    //   var textPathData = pathMap.getScaledPath('TEXT_ANNOTATION', {
    //     xScaleFactor: 1,
    //     yScaleFactor: 1,
    //     containerWidth: context.width,
    //     containerHeight: context.height,
    //     position: {
    //       mx: 0.0,
    //       my: 0.0
    //     }
    //   });
    //
    //   svgAttr(self.path, {
    //     d: textPathData
    //   });
    // }


    // text annotation
    // if (is(element, CPN_TEXT_ANNOTATION)) {
    //   var height = context.height,
    //     dy = context.dy;
    //
    //   var newElementHeight = Math.max(element.height / absoluteElementBBox.height * (height + dy), 0);
    //
    //   var textPathData = pathMap.getScaledPath('TEXT_ANNOTATION', {
    //     xScaleFactor: 1,
    //     yScaleFactor: 1,
    //     containerWidth: element.width,
    //     containerHeight: newElementHeight,
    //     position: {
    //       mx: 0.0,
    //       my: 0.0
    //     }
    //   });
    //
    //   svgAttr(self.path, {
    //     d: textPathData
    //   });
    // }
  });

  eventBus.on(['directEditing.complete', 'directEditing.cancel'], function (context) {

    console.log('LabelEditiongPreview, directEditing[.complete|.cancel], context = ', context);

    var activeProvider = context.active;

    if (activeProvider && element) {
      canvas.removeMarker(activeProvider.element.label || activeProvider.element, MARKER_HIDDEN);
      canvas.removeMarker(element, MARKER_LABEL_HIDDEN);
    }

    // element = undefined;
    // absoluteElementBBox = undefined;

    if (gfx) {
      svgRemove(gfx);

      gfx = undefined;
    }
  });
}

LabelEditingPreview.$inject = [
  'eventBus',
  'canvas',
  'modeling',
  'elementRegistry',
  'pathMap'
];


