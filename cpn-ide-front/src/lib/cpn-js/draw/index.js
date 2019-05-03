import CpnRenderer from './CpnRenderer';
import TextRenderer from './TextRenderer';
import PathMap from './PathMap';

export default {
  __init__: [
    'cpnRenderer',
  ],
  cpnRenderer: [ 'type', CpnRenderer ],
  textRenderer: [ 'type', TextRenderer ],
  pathMap: [ 'type', PathMap ]
};
