/**
 * Convert json node to array
 * @param node - json node
 */
export function nodeToArray(node) {
  return node instanceof Array ? node : [node];
}
