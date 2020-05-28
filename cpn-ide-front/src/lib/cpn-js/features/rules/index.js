import RulesModule from 'diagram-js/lib/features/rules';

import CpnRuleProvider from './CpnRuleProvider';

export default {
  __depends__: [
    RulesModule
  ],
  __init__: [
    'cpnRuleProvider',
  ],
  cpnRuleProvider: [ 'type', CpnRuleProvider ],
};
