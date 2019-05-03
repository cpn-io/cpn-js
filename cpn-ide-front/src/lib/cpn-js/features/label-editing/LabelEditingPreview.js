import {
  append as svgAppend,
  attr as svgAttr,
  create as svgCreate,
  remove as svgRemove
} from 'tiny-svg';

import {
  CPN_TEXT_ANNOTATION,
  is,
  isCpn
} from '../../util/ModelUtil';

import {
  translate
} from 'diagram-js/lib/util/SvgTransformUtil';

var MARKER_HIDDEN = 'djs-element-hidden',
  MARKER_LABEL_HIDDEN = 'djs-label-hidden';


export default function LabelEditingPreview(eventBus, canvas, elementRegistry, pathMap) {

  var self = this;

  var defaultLayer = canvas.getDefaultLayer();

  var element, absoluteElementBBox, gfx;

  eventBus.on('directEditing.activate', function (context) {
    var activeProvider = context.active;

    element = activeProvider.element;

    // console.log('LabelEditingPreview, directEditing.activate, element = ', element);
    // console.log('LabelEditingPreview, directEditing.activate, isCpn(element) = ', isCpn(element));

    if (isCpn(element)) {
      canvas.addMarker(element, MARKER_LABEL_HIDDEN);
    }
  });

  eventBus.on('directEditing.resize', function (context) {

    // text annotation
    if (is(element, CPN_TEXT_ANNOTATION)) {
      var height = context.height,
        dy = context.dy;

      var newElementHeight = Math.max(element.height / absoluteElementBBox.height * (height + dy), 0);

      var textPathData = pathMap.getScaledPath('TEXT_ANNOTATION', {
        xScaleFactor: 1,
        yScaleFactor: 1,
        containerWidth: element.width,
        containerHeight: newElementHeight,
        position: {
          mx: 0.0,
          my: 0.0
        }
      });

      svgAttr(self.path, {
        d: textPathData
      });
    }
  });

  eventBus.on(['directEditing.complete', 'directEditing.cancel'], function (context) {
    var activeProvider = context.active;

    if (activeProvider) {
      canvas.removeMarker(activeProvider.element.label || activeProvider.element, MARKER_HIDDEN);
      canvas.removeMarker(element, MARKER_LABEL_HIDDEN);
    }

    element = undefined;
    absoluteElementBBox = undefined;

    if (gfx) {
      svgRemove(gfx);

      gfx = undefined;
    }
  });
}

LabelEditingPreview.$inject = [
  'eventBus',
  'canvas',
  'elementRegistry',
  'pathMap'
];


