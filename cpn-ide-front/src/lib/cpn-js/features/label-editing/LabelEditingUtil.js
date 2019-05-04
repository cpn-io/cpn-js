import { getText } from "../../draw/CpnRenderUtil";

export function getLabel(element) {
   return getText(element);
}

export function setLabel(element, text, isExternal) {
  if (element.text)
    element.text = text;
  if (element.name)
    element.name = text;
  return element;
}
