import RulesModule from 'diagram-js/lib/features/rules';

import CpnRules from './CpnRules';

export default {
  __depends__: [
    RulesModule
  ],
  __init__: [ 'cpnRules' ],
  cpnRules: [ 'type', CpnRules ]
};
