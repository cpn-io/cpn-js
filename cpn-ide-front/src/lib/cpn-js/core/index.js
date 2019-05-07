import CommandModule from 'diagram-js/lib/command';
import SelectionModule from 'diagram-js/lib/features/selection';
import ZoomScrollModule from 'diagram-js/lib/navigation/zoomscroll';
import MoveCanvasModule from 'diagram-js/lib/navigation/movecanvas';
import ModelingModule from 'diagram-js/lib/features/modeling';
import MoveModule from 'diagram-js/lib/features/move';
import OutlineModule from 'diagram-js/lib/features/outline';
import LassoToolModule from 'diagram-js/lib/features/lasso-tool';
import PaletteModule from 'diagram-js/lib/features/palette';
import CreateModule from 'diagram-js/lib/features/create';
import ContextPadModule from 'diagram-js/lib/features/context-pad';
import PopupMenuModule from 'diagram-js/lib/features/popup-menu';
import ConnectModule from 'diagram-js/lib/features/connect';
import SnappingModule from 'diagram-js/lib/features/snapping';
import BendpointsModule from 'diagram-js/lib/features/bendpoints';
import AttachSupportModule from 'diagram-js/lib/features/attach-support';

import CroppingConnectionDocking from 'diagram-js/lib/layout/CroppingConnectionDocking';

import CpnPaletteProvider from '../features/palette/CpnPaletteProvider';
import CpnRulesModule from '../features/rules';
import CpnResizeModule from '../features/resize';

import CpnContextPadProvider from '../features/context-pad/CpnContextPadProvider';
import CpnPopupMenuProvider from '../features/popup-menu/CpnPopupMenuProvider';

import CpnSnappingModule from '../features/snapping';
import CpnModelingModule from '../features/modeling';
import CpnImportModule from '../import';

import DirectEditingModule from '../features/direct-editing';
import LabelEditingModule from '../features/label-editing';
import DrawModule from '../draw';

export default {
  __depends__: [
    CommandModule,
    SelectionModule,
    ZoomScrollModule,
    MoveCanvasModule,
    ModelingModule,
    MoveModule,
    OutlineModule,
    LassoToolModule,
    PaletteModule,
    CreateModule,
    ContextPadModule,
    PopupMenuModule,
    ConnectModule,
    SnappingModule,
    BendpointsModule,
    AttachSupportModule,

    CroppingConnectionDocking,

    // Cpn
    CpnModelingModule,
    CpnSnappingModule,
    CpnRulesModule,
    CpnResizeModule,
    CpnImportModule,

    // Custom
    DrawModule,
    DirectEditingModule,
    LabelEditingModule,
  ],
  __init__: [
    'contextPadProvider',
    'popupMenuProvider',
    'paletteProvider',
  ],
  connectionDocking: ['type', CroppingConnectionDocking],
  contextPadProvider: ['type', CpnContextPadProvider],
  popupMenuProvider: ['type', CpnPopupMenuProvider],
  paletteProvider: ['type', CpnPaletteProvider],
};
