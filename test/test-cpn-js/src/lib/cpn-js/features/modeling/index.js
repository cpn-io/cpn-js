import translate from 'diagram-js/lib/i18n/translate';

import CommandModule from 'diagram-js/lib/command';
import ChangeSupportModule from 'diagram-js/lib/features/change-support';
import SelectionModule from 'diagram-js/lib/features/selection';
import RulesModule from 'diagram-js/lib/features/rules';

import Modeling from 'diagram-js/lib/features/modeling/Modeling';
import CpnLayouter from './CpnLayouter';
import CpnUpdater from './CpnUpdater';

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
  ],
  modeling: [ 'type', Modeling ],
  layouter: [ 'type', CpnLayouter ],
  cpnUpdater: [ 'type', CpnUpdater ]
};
