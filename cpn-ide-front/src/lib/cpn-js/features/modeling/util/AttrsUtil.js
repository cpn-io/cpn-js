export function getDefPosattr(position = undefined) {
  return position
    ? {
      _x: position.x,
      _y: -1 * position.y
    }
    : {
      _x: 0,
      _y: 0
    };
}

export function getDefFillattr() {
  return {
    _colour: "White",
    _pattern: "Solid",
    _filled: "false"
  };
}

export function getDefLineattr() {
  return {
    _colour: "Black",
    _thick: "1",
    _type: "Solid"
  };
}

export function getDefTextattr() {
  return {
    _colour: "Black",
    _bold: "false"
  };
}

export function getDefText() {
  return {
    _tool: "CPN Tools",
    _version: "4.0.1"
  };
}

export function getNextId() {
  return 'ID' + new Date().getTime();
}
