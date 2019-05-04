import translate from 'diagram-js/lib/i18n/translate';

import CpnImporter from './CpnImporter';

export default {
  __depends__: [
    translate
  ],
  cpnImporter: [ 'type', CpnImporter ]
};
