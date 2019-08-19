/**
 * Convert json node to array
 * @param node - json node
 */
export function nodeToArray(node) {
  if (!node) {
    return [];
  }
  return node instanceof Array ? node : [node];
}
