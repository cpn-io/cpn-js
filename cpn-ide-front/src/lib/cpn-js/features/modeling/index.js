import translate from 'diagram-js/lib/i18n/translate';

import CommandModule from 'diagram-js/lib/command';
import ChangeSupportModule from 'diagram-js/lib/features/change-support';
import SelectionModule from 'diagram-js/lib/features/selection';
import RulesModule from 'diagram-js/lib/features/rules';

// import Modeling from 'diagram-js/lib/features/modeling/Modeling';
import Modeling from './Modeling';
import CpnLayouter from './CpnLayouter';
import CpnUpdater from './CpnUpdater';
import AdaptiveLabelPositioningBehavior from './AdaptiveLabelPositioningBehavior';
import CpnFactory from "./CpnFactory";

export default {
  __depends__: [
    translate,
    CommandModule,
    ChangeSupportModule,
    SelectionModule,
    RulesModule
  ],
  __init__: [
    'modeling',
    'layouter',
    'cpnUpdater',
    'adaptiveLabelPositioningBehavior',
    'cpnFactory',
  ],
  modeling: [ 'type', Modeling ],
  layouter: [ 'type', CpnLayouter ],
  cpnUpdater: [ 'type', CpnUpdater ],
  adaptiveLabelPositioningBehavior: [ 'type', AdaptiveLabelPositioningBehavior ],
  cpnFactory : [ 'type', CpnFactory],
};
