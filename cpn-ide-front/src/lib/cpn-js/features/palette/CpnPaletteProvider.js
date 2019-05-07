/**
 * A example palette provider.
 */
export default function CpnPaletteProvider(create, elementFactory, lassoTool, palette) {
  this._create = create;
  this._elementFactory = elementFactory;
  this._lassoTool = lassoTool;
  this._palette = palette;

  palette.registerProvider(this);
}

CpnPaletteProvider.$inject = [
  'create',
  'elementFactory',
  'lassoTool',
  'palette'
];


CpnPaletteProvider.prototype.getPaletteEntries = function() {
  var create = this._create,
      elementFactory = this._elementFactory,
      lassoTool = this._lassoTool;

  return {
    'lasso-tool': {
      group: 'tools',
      className: 'palette-icon-lasso-tool',
      title: 'Activate Lasso Tool',
      action: {
        click: function(event) {
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
        click: function() {
      /*    var shape = elementFactory.createShape({
            width: 100,
            height: 80
          });*/
        //  event.context.type = 'cpn:Transition';
          create.start(event, {width: 100,  height: 80});
        }
      }
    },
    'create-place': {
      group: 'create',
      className: 'bpmn-icon-start-event-none',
      title: 'Create Place',
      action: {
        click: function() {
          var shape = elementFactory.createShape({
            width: 100,
            height: 80
          });
         // event.context.type = 'cpn:Place';
          create.start(event, shape);
        }
      }
    }
  };
};
