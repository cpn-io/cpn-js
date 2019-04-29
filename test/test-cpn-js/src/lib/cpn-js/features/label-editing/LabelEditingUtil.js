export function getLabel(element) {
   return element.text || element.name || 'undefined';
}

export function setLabel(element, text, isExternal) {
  if (element.text)
    element.text = text;
  if (element.name)
    element.name = text;

  return element;
}
