import {
  some
} from 'min-dash';

/**
 * @param  element
 * @param  {String} type
 *
 * @return {Boolean}
 */
export function is(element, type) {
  return element.type && element.type === type;
}

export function isAny(element, types) {
  return some(types, function(t) {
    return is(element, t);
  });
}


/**
 * Return the business object for a given element.
 *
 * @param  element
 * @return {ModdleElement}
 */
export function getBusinessObject(element) {
  return (element && element.businessObject) || element;
}
