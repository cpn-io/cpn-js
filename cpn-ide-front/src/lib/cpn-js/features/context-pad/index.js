import InteractionEventsModule from 'diagram-js/lib/features/interaction-events';
import OverlaysModule from 'diagram-js/lib/features/overlays';

import ContextPad from './ContextPad';
import CpnContextPadProvider from './CpnContextPadProvider';

export default {
  __depends__: [
    InteractionEventsModule,
    OverlaysModule
  ],
  __init__: [
    'contextPadProvider',
  ],
  contextPad: [ 'type', ContextPad ],
  contextPadProvider: ['type', CpnContextPadProvider],
};
