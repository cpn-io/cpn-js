
let lastId = 0;
export function getNextId() {
  let id = new Date().getTime();
  if (id <= lastId) {
    id++;
  }
  lastId = id;
  return "ID" + (id).toString().substr((id).toString().length - 10);
}

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

export function arrayToNode(array) {
  if (!array) {
    return undefined;
  }
  return array.length === 1 ? array[0] : array;
}

export function addNode(parent, type, node) {
  const list = nodeToArray(parent[type]);
  list.push(node);
  parent[type] = list.length === 1 ? list[0] : list;
  return parent;
}

export function cloneObject(object) {
  return JSON.parse(JSON.stringify(object || {}));
}

export function objectsEqual(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

/**
 * Clear array without destroy array object
 * @param array 
 */
export function clearArray(array) {
  while (array.length) {
    array.pop();
  }
}
