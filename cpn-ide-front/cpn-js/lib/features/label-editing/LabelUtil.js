import { is } from '../../util/ModelUtil';

function getLabelAttr(semantic) {
  if (is(semantic, 'bpmn:FlowElement') ||
    is(semantic, 'bpmn:Participant') ||
    is(semantic, 'bpmn:Lane') ||
    is(semantic, 'bpmn:SequenceFlow') ||
    is(semantic, 'bpmn:MessageFlow')
    ||
    is(semantic, 'cpn:Place') ||
    is(semantic, 'bpmn:Transition') ||
    is(semantic, 'cpn:Transition')
  ) {
    return 'name';
  }

  if (is(semantic, 'bpmn:TextAnnotation')) {
    return 'text';
  }
}

export function getLabel(element) {

  var semantic = element.businessObject,
  attr = getLabelAttr(semantic);

  // CPN
  // -------------------------------------
  if (
    (is(semantic, 'cpn:Place') ||
      is(semantic, 'bpmn:Transition') || element.type === 'label')
    &&
    element.text
  ) {
    return element.text
  }
  // -------------------------------------

  if (attr) {
    return semantic[attr] || '';
  }
}


export function setLabel(element, text, isExternal) {
  var semantic = element.businessObject,
    attr = getLabelAttr(semantic);

  if (element.type !== 'label' && attr) {
    semantic[attr] = text;
  }

  return element;
}
