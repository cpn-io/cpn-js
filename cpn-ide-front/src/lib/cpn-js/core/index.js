import CommandModule from 'diagram-js/lib/command';
import SelectionModule from 'diagram-js/lib/features/selection';
import CopyPasteModule from 'diagram-js/lib/features/copy-paste';
import ZoomScrollModule from 'diagram-js/lib/navigation/zoomscroll';
import MoveCanvasModule from 'diagram-js/lib/navigation/movecanvas';
import ModelingModule from 'diagram-js/lib/features/modeling';
import MoveModule from 'diagram-js/lib/features/move';
import OutlineModule from 'diagram-js/lib/features/outline';
import LassoToolModule from 'diagram-js/lib/features/lasso-tool';
// import PaletteModule from 'diagram-js/lib/features/palette';
import CreateModule from 'diagram-js/lib/features/create';
import PopupMenuModule from 'diagram-js/lib/features/popup-menu';
import ConnectModule from 'diagram-js/lib/features/connect';
import SnappingModule from 'diagram-js/lib/features/snapping';
import BendpointsModule from 'diagram-js/lib/features/bendpoints';
import AttachSupportModule from 'diagram-js/lib/features/attach-support';
import GlobalConnectModule from 'diagram-js/lib/features/global-connect';
import LabelSupportModule from 'diagram-js/lib/features/label-support';
// import ResizeModule from 'diagram-js/lib/features/resize/Resize';

import CroppingConnectionDocking from 'diagram-js/lib/layout/CroppingConnectionDocking';

import CpnPaletteProvider from '../features/palette/CpnPaletteProvider';
import CpnRulesModule from '../features/rules';
import CpnResizeModule from '../features/resize';

import CpnPopupMenuProvider from '../features/popup-menu/CpnPopupMenuProvider';
import CpnBindingsMenuProvider from '../features/bindings-menu/CpnBindingsMenuProvider';
import CpnOrderingProvider from '../features/ordering/CpnOrderingProvider';

import CpnSnappingModule from '../features/snapping';
import CpnModelingModule from '../features/modeling';
import CpnContextPadModule from '../features/context-pad';
import CpnImportModule from '../import';
import CpnLassoToolModule from '../features/lasso-tool';
import CpnSelectionModule from '../features/selection';

import DrawModule from '../draw';
import DirectEditingModule from '../features/direct-editing';
import LabelEditingModule from '../features/label-editing';


export default {
  __depends__: [
    CommandModule,
    SelectionModule,
    CopyPasteModule,
    ZoomScrollModule,
    MoveCanvasModule,
    ModelingModule,
    MoveModule,
    OutlineModule,
    LassoToolModule,
    // PaletteModule,
    CreateModule,
    PopupMenuModule,
    ConnectModule,
    SnappingModule,
    BendpointsModule,
    AttachSupportModule,
    GlobalConnectModule,
    LabelSupportModule,

    CroppingConnectionDocking,
    // ResizeModule,

    // Cpn
    CpnModelingModule,
    CpnSnappingModule,
    CpnRulesModule,
    CpnResizeModule,
    CpnImportModule,
    CpnContextPadModule,
    CpnLassoToolModule,
    CpnSelectionModule,

    // Custom
    DrawModule,
    DirectEditingModule,
    LabelEditingModule,
  ],
  __init__: [
    // 'resize',

    'popupMenuProvider',
    'bindingsMenuProvider',
    // 'paletteProvider',
    'cpnOrderingProvider'
  ],

  connectionDocking: ['type', CroppingConnectionDocking],
  popupMenuProvider: ['type', CpnPopupMenuProvider],
  bindingsMenuProvider: ['type', CpnBindingsMenuProvider],
  // paletteProvider: ['type', CpnPaletteProvider],
  cpnOrderingProvider: [ 'type', CpnOrderingProvider ]
};
