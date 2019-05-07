export default function TokenProvider(elementRegistry) {
  console.log('TokenProvider()');

  this._elementRegistry = elementRegistry;
}

TokenProvider.$inject = [
  'elementRegistry',
];

TokenProvider.prototype.getTokens = function (id) {
  return {
    count: 15,
    marking: '2`0@0,0\n2`0@0,0\n2`0@0,0\n2`0@0,0'
  };
}
