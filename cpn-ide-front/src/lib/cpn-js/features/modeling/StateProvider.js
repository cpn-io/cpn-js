export default function StateProvider(elementRegistry) {
  console.log('StateProvider()');

  this._elementRegistry = elementRegistry;
}

StateProvider.$inject = [
  'elementRegistry',
];

StateProvider.prototype.getErrorState = function (id) {
  return true;
}
