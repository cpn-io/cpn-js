export default function StateProvider(elementRegistry) {
  console.log('StateProvider()');

  this._elementRegistry = elementRegistry;

  this.clear();
}

StateProvider.$inject = [
  'elementRegistry',
];

StateProvider.prototype.clear = function () {
  this._errors = {};
  this._warnings = {};
  this._ready = {};
}

StateProvider.prototype.getReadyState = function (id) {
  return false;
}
StateProvider.prototype.getWarningState = function (id) {
  return false;
}
StateProvider.prototype.getErrorState = function (id) {
  return (id in this._errors);
}

StateProvider.prototype.setReadyState = function (ready) {
  this._ready = ready;
}
StateProvider.prototype.setWarningState = function (warnings) {
  this._warnings = warnings;
}
StateProvider.prototype.setErrorState = function (errors) {
  this._errors = errors;
}
