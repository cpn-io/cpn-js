 /**
 * An importer that adds cpn elements to the canvas
 *
  * @param {EventBus} eventBus
  * @param {CpnFactory} cpnFactory
  */
export default function CpnImporter(eventBus, cpnFactory) {
  this._eventBus = eventBus;
  this._cpnFactory = cpnFactory;
}

CpnImporter.$inject = [
  'eventBus',
  'cpnFactory',
];

/**
 * Add cpn element (cpnElement) to the canvas onto the
 * specified parent shape.
 */
CpnImporter.prototype.add = function (pageObject, cpnElement, type) {
  // console.log('CpnImporter.prototype.add, cpnElement = ', cpnElement, ', type = ', type);
  var element = this._cpnFactory.createShape(pageObject, cpnElement, type, undefined, true);
  this._eventBus.fire('cpnElement.added', { element: element });
  return element;
}
