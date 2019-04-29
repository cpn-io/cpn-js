import CpnAutoResize from './CpnAutoResize';
import CpnAutoResizeProvider from './CpnAutoResizeProvider';

export default {
  __init__: [
    'cpnAutoResize',
    'cpnAutoResizeProvider'
  ],
  cpnAutoResize: [ 'type', CpnAutoResize ],
  cpnAutoResizeProvider: [ 'type', CpnAutoResizeProvider ]
};
