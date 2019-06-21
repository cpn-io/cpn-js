export class CpnServerUrl {
  static url = '';
  // static url = 'http://95.161.178.222:42020';

  static set(url) {
    this.url = url;
  }

  static get() {
    return this.url;
  }
}
