/**
 * Is an element of the given BPMN type?
 *
 * @param  {djs.model.Base|ModdleElement} element
 * @param  {String} type
 *
 * @return {Boolean}
 */
export function is(element, type) {
  // var bo = element; // getBusinessObject(element);
  //
  // return bo && (typeof bo.$instanceOf === 'function') && bo.$instanceOf(type);

  return element && element.type && element.type === type;
}

export function isCpn(element) {
  return element && element.type && /^cpn/.test(element.type);
}

/**
 * Return the business object for a given element.
 *
 * @param  {djs.model.Base|ModdleElement} element
 *
 * @return {ModdleElement}
 */
export function getBusinessObject(element) {
  return (element && element.businessObject) || element;
}
