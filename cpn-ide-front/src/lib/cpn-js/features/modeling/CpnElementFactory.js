import { assign } from "min-dash";

let defaultValues = [];

let lastId = 0;

export function getNextId() {
  const id = (new Date().getTime()).toString();
  if (id <= lastId) {
    id ++;
  }
  lastId = id;
  return "ID" + id.substr(id.length - 10);
}
export function setDefaultValue(key, value) {
  defaultValues[key] = value;
}

export function getDefaultValue(key) {
  return defaultValues[key];
}

export function getDefPosattr(position = undefined) {
  return position
    ? {
      _x: (position.x).toString(),
      _y: (-1 * position.y).toString()
    }
    : {
      _x: (0).toString(),
      _y: (0).toString()
    };
}

export function getDefSizeAttr(size = undefined) {
  return size
    ? {
      _w: (size.w || size.width).toString(),
      _h: (size.h || size.height).toString()
    }
    : {
      _w: (70).toString(),
      _h: (40).toString()
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

export function getDefText(text = '') {
  return {
    // _tool: "CPN Tools",
    // _version: "4.0.1",
    __text: (text || '')
  };
}

export function getDefMarking() {
  return {
    "snap": {
      "_snap_id": "0",
      "_anchor.horizontal": "0",
      "_anchor.vertical": "0"
    },
    "_x": "0.000000",
    "_y": "0.000000",
    "_hidden": "false"
  };
}


export function getDefPlace(name = undefined, position = undefined, size = undefined) {
  const id = getNextId();

  let attrs = {
    posattr: getDefPosattr(position),
    fillattr: getDefFillattr(),
    lineattr: getDefLineattr(),
    textattr: getDefTextattr(),
    text: name || 'P',
    ellipse: getDefSizeAttr(size),
    token: getDefPosattr(),
    marking: getDefMarking(),
  };

  const idPostfix = { 'type': 'a', 'initmark': 'b' };
  for (const type of ['type', 'initmark']) {
    attrs[type] = {
      posattr: getDefPosattr(position),
      fillattr: getDefFillattr(),
      lineattr: getDefLineattr(),
      textattr: getDefTextattr(),
      // text: getDefText(getDefaultValue(type) || type),
      text: getDefText(''),
      _id: id + idPostfix[type]
    };
  }

  attrs._id = id;

  return attrs;
};


export function getDefTransition(name = undefined, position = undefined, size = undefined) {
  const id = getNextId();

  let attrs = {
    posattr: getDefPosattr(position),
    fillattr: getDefFillattr(),
    lineattr: getDefLineattr(),
    textattr: getDefTextattr(),
    text: name || 'T',
    box: getDefSizeAttr(size)
  };

  const idPostfix = { 'cond': 'a', 'time': 'b', 'code': 'c', 'priority': 'd' };
  for (const type of ['cond', 'time', 'code', 'priority']) {
    attrs[type] = {
      posattr: getDefPosattr(position),
      fillattr: getDefFillattr(),
      lineattr: getDefLineattr(),
      textattr: getDefTextattr(),
      // text: getDefText(getDefaultValue(type) || type),
      text: getDefText(''),
      _id: id + idPostfix[type]
    };
  }

  attrs._id = id;

  return attrs;
};

export function getDefAux(text = undefined, position = undefined) {
  const id = getNextId();

  return {
    posattr: getDefPosattr(position),
    fillattr: getDefFillattr(),
    lineattr: getDefLineattr(),
    textattr: getDefTextattr(),
    label: '',
    text: text,
    _id: id
  };
}

export function updateLabelsPosition(textRenderer, cpnElement) {
  var x = Number(cpnElement.posattr._x);
  var y = Number(cpnElement.posattr._y);
  var w = Number(cpnElement.ellipse ? cpnElement.ellipse._w : cpnElement.box._w);
  var h = Number(cpnElement.ellipse ? cpnElement.ellipse._h : cpnElement.box._h);

  let pos = [];

  // for places
  pos['initmark'] = (tw, th) => { return { _x: (x + w / 2 + tw / 2).toString(), _y: (y + h / 2 + th / 2).toString() } };
  pos['type'] = (tw, th) => { return { _x: (x + w / 2 + tw / 2).toString(), _y: (y - h / 2 - th / 2).toString() } };

  // for transitions
  pos['time'] = (tw, th) => { return { _x: (x + w / 2 + tw / 2 + 5).toString(), _y: (y + h / 2 + th / 2).toString() } };
  pos['code'] = (tw, th) => { return { _x: (x + w / 2 + tw / 2 + 5).toString(), _y: (y - h / 2 - th / 2).toString() } };
  pos['cond'] = (tw, th) => { return { _x: (x - w / 2 - tw / 2 - 5).toString(), _y: (y + h / 2 + th / 2).toString() } };
  pos['priority'] = (tw, th) => { return { _x: (x - w / 2 - tw / 2 - 5).toString(), _y: (y - h / 2 - th / 2).toString() } };

  pos['subst'] = (tw, th) => { return { _x: (x + w / 2).toString(), _y: (y + h).toString() } };

  for (const key of Object.keys(pos)) {
    if (cpnElement[key] && pos[key]) {
      let text = 'empty';
      if (cpnElement[key].text && cpnElement[key].text.__text) {
        text = cpnElement[key].text.__text;
      }

      let bounds = { x: 0, y: 0, width: 0, height: 0 };
      bounds = textRenderer.getExternalLabelBounds(bounds, text);

      cpnElement[key].posattr = pos[key](bounds.width, bounds.height);
    }
  }
}


export function getDefArc(placeCpnElement, transCpnElement, orientation) {
  const id = getNextId();

  let position = { x: 0, y: 0 };
  if (placeCpnElement && transCpnElement) {
    const p1 = getMid(placeCpnElement);
    const p2 = getMid(transCpnElement);
    position.x = p1.x + (p2.x - p1.x) / 2;
    position.y = p1.y + (p2.y - p1.y) / 2;
    position.y *= -1;

    console.log('getDefArc(), p1, p2, position = ', p1, p2, position);
  }

  let attrs = {
    posattr: getDefPosattr(),
    fillattr: getDefFillattr(),
    lineattr: getDefLineattr(),
    textattr: getDefTextattr(),
    arrowattr: {
      _headsize: 1,
      _currentcyckle: 2
    },
    transend: {
      _idref: transCpnElement._id
    },
    placeend: {
      _idref: placeCpnElement._id
    },
  };

  attrs.annot = {
    posattr: getDefPosattr(position),
    fillattr: getDefFillattr(),
    lineattr: getDefLineattr(),
    textattr: getDefTextattr(),
    text: getDefText(),
    _id: id + 'a'
  };

  attrs._id = id;
  attrs._orientation = orientation || "BOTHDIR";
  attrs._order = "1";

  return attrs;
};

function getMid(cpnElement) {
  var x = Number(cpnElement.posattr._x);
  var y = Number(cpnElement.posattr._y);
  var w = Number(cpnElement.ellipse ? cpnElement.ellipse._w : cpnElement.box._w);
  var h = Number(cpnElement.ellipse ? cpnElement.ellipse._h : cpnElement.box._h);

  return { x: x + w / 2, y: y + h / 2 };
}

export function getDefSubst(transCpnElement, subPageName, subPageId) {

  let position = { x: transCpnElement.posattr._x, y: - transCpnElement.posattr._y + transCpnElement.box._h / 2 };

  let attrs = {
    subpageinfo: {
      fillattr: getDefFillattr(),
      lineattr: getDefLineattr(),
      posattr: getDefPosattr(position),
      textattr: getDefText(),
      _id: transCpnElement._id + 'e',
      _name: subPageName
    },
    _portsock: '',
    _subpage: subPageId
  };

  return attrs;
}
