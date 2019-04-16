import DirectEditingModule from '../diagram-js-direct-editing';
import ContextPadModule from 'diagram-js/lib/features/context-pad';
import SelectionModule from 'diagram-js/lib/features/selection';
import ConnectModule from 'diagram-js/lib/features/connect';
import CreateModule from 'diagram-js/lib/features/create';
import PopupMenuModule from '../popup-menu';
import ContextPad from './ContextPad';
import ContextPadProvider from './ContextPadProvider';
import InteractionEventsModule from "diagram-js/lib/features/interaction-events";
import OverlaysModule from "diagram-js/lib/features/overlays";

export default {
  __depends__: [
    DirectEditingModule,
    ContextPadModule,
    SelectionModule,
    ConnectModule,
    CreateModule,
    PopupMenuModule,
    InteractionEventsModule,
    OverlaysModule
  ],
  contextPad: [ 'type', ContextPad ],
  __init__: [ 'contextPadProvider' ],
  contextPadProvider: [ 'type', ContextPadProvider ]
};
