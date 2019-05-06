import {
  some
} from 'min-dash';

export const CPN_TRANSITION = 'cpn:Transition';
export const CPN_PLACE = 'cpn:Place';
export const CPN_LABEL = 'cpn:Label';
export const CPN_TOKEN_LABEL = 'cpn:TokenLabel';
export const CPN_MARKING_LABEL = 'cpn:MarkingLabel';
export const CPN_CONNECTION = 'cpn:Connection';
export const CPN_TEXT_ANNOTATION = 'cpn:TextAnnotation';

/**
 * @param  element
 * @param  {String} type
 *
 * @return {Boolean}
 */
export function is(element, type) {
  return element.type && element.type === type;
}

export function isCpn(element) {
  return element && element.type && /^cpn/.test(element.type);
}

export function isCpnPortOrSubst(element) {
  return element && element.labelType && (element.labelType === 'port' || element.labelType === 'subst');
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
