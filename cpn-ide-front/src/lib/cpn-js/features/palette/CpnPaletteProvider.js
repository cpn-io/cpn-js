import { CPN_PLACE } from "../../util/ModelUtil";

/**
 * A example palette provider.
 */
export default function CpnPaletteProvider(create, elementFactory, cpnFactory, lassoTool, palette, eventBus, modeling, dragging) {
  this._create = create;
  this._elementFactory = elementFactory;
  this._cpnFactory = cpnFactory;
  this._lassoTool = lassoTool;
  this._palette = palette;
  this._dragging = dragging;
  this._modeling = modeling;

  palette.registerProvider(this);
}

CpnPaletteProvider.$inject = [
  'create',
  'elementFactory',
  'cpnFactory',
  'lassoTool',
  'palette',
  'eventBus',
  'modeling',
  'dragging'
];


CpnPaletteProvider.prototype.getPaletteEntries = function () {
  var create = this._create,
    elementFactory = this._elementFactory,
    lassoTool = this._lassoTool;

  const self = this;

  return {
    'lasso-tool': {
      group: 'tools',
      className: 'palette-icon-lasso-tool',
      title: 'Activate Lasso Tool',
      action: {
        click: function (event) {
          lassoTool.activateSelection(event);
        }
      }
    },

    'tool-separator': {
      group: 'tools',
      separator: true
    },

    'create-transition': {
      group: 'create',
      className: 'palette-icon-create-shape',
      title: 'Create Transition',
      action: {
        click: function () {

          var shape = elementFactory.createShape({
            /* var shape = elementFactory.createShape({
               width: 100,
               height: 80,
               type: 'cpn:Transition'
             });*/
            //  event.context.type = 'cpn:Transition';
            // create.start(event, {width: 100,  height: 80, type: 'cpn:Transition'});
            //  create.start(event, shape);

          });
        }
      }
    },

    'create-place': {
      group: 'create',
      className: 'bpmn-icon-start-event-none',
      title: 'Create Place',
      action: function() { self._createPlace(event) }
    }
  };
};


CpnPaletteProvider.prototype._createPlace = function (event) {
  console.log('CpnPaletteProvider.prototype._createPlace, event = ', event);

  const shape = this._cpnFactory.createShape({ x: 0, y: 0 }, CPN_PLACE);

  this._create.start(event, shape);
}
