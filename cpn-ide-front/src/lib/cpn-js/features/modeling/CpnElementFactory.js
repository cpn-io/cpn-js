import { assign } from "min-dash";

let defaultValues = [];

let lastId = 0;

export function getNextId() {
  let id = new Date().getTime();
  while (id <= lastId) {
    id++;
  }
  lastId = id;
  // console.log('test11: ' + "ID" + (id).toString().substr((id).toString().length - 10));
  return "ID" + id.toString().substr(id.toString().length - 10);
}

export function setDefaultValue(key, value) {
  defaultValues[key] = value;
}

export function getDefaultValue(key) {
  return defaultValues[key];
}

export function getDefPosattr(position = undefined) {
  // Use the same format as the updater (CpnUpdater.js) does.
  // This prevents unnecessary differences due to updates.
  return position
    ? {
        _x: Math.round(position.x).toFixed(6),
        _y: Math.round(-1 * position.y).toFixed(6),
      }
    : {
        _x: (0).toFixed(6),
        _y: (0).toFixed(6),
      };
}

export function getDefTokenattr(position = undefined) {
  // Use the same format as the updater (CpnUpdater.js) does, and add an empty text.
  // This prevents unnecessary differences due to updates.
  return position
    ? {
        _x: Math.round(position.x).toFixed(6),
        _y: Math.round(-1 * position.y).toFixed(6),
        text: "",
      }
    : {
        _x: (0).toFixed(6),
        _y: (0).toFixed(6),
        text: "",
      };
}

export function getDefSizeAttr(size = undefined) {
  // Use the same format as the updater (CpnUpdater.js) does.
  // This prevents unnecessary differences due to updates.
  return size
    ? {
        _w: Math.round(size.w || size.width).toFixed(6),
        _h: Math.round(size.h || size.height).toFixed(6),
      }
    : {
        _w: (70).toFixed(6),
        _h: (40).toFixed(6),
      };
}

export function getDefFillattr() {
  return {
    _colour: "White",
    _pattern: "Solid",
    _filled: "false",
  };
}

export function getDefLineattr() {
  return {
    _colour: "Black",
    _thick: "1",
    _type: "Solid",
  };
}

export function getDefTextattr() {
  return {
    _colour: "Black",
    _bold: "false",
  };
}

export function getDefText(text = "") {
  return {
    _tool: "CPN Tools",
    _version: "4.0.1",
    __text: text || "",
  };
}

export function getDefMarking() {
  // Use the same format as the updater (CpnUpdater.js) does, and add an empty text.
  // This prevents unnecessary differences due to updates.
  return {
    snap: {
      _snap_id: "0",
      "_anchor.horizontal": "0",
      "_anchor.vertical": "0",
    },
    _x: (0).toFixed(6),
    _y: (0).toFixed(6),
    _hidden: "false",
    text: "",
  };
}

export function getDefPlace(
  name = undefined,
  position = undefined,
  size = undefined
) {
  let id = getNextId();

  // Use getDefTokenattr for tokens, as this will add an empty text..
  let attrs = {
    posattr: getDefPosattr(position),
    fillattr: getDefFillattr(),
    lineattr: getDefLineattr(),
    textattr: getDefTextattr(),
    text: name || "P",
    ellipse: getDefSizeAttr(size),
    token: getDefTokenattr(),
    marking: getDefMarking(),
  };

  const idPostfix = { type: "a", initmark: "b" };
  for (const type of ["type", "initmark"]) {
    attrs[type] = {
      posattr: getDefPosattr(position),
      fillattr: getDefFillattr(),
      lineattr: getDefLineattr(),
      textattr: getDefTextattr(),
      // text: getDefText(getDefaultValue(type) || type),
      text: getDefText(""),
      _id: id + idPostfix[type],
    };
    if (type === "type") {
      attrs[type].text = getDefText(getDefaultValue(type));
    }
  }

  attrs._id = id;

  return attrs;
}

export function getDefTransition(
  name = undefined,
  position = undefined,
  size = undefined
) {
  let id = getNextId();

  let attrs = {
    posattr: getDefPosattr(position),
    fillattr: getDefFillattr(),
    lineattr: getDefLineattr(),
    textattr: getDefTextattr(),
    text: name || "T",
    box: getDefSizeAttr(size),
  };

  const idPostfix = { cond: "a", time: "b", code: "c", priority: "d" };
  for (const type of ["cond", "time", "code", "priority"]) {
    attrs[type] = {
      posattr: getDefPosattr(position),
      fillattr: getDefFillattr(),
      lineattr: getDefLineattr(),
      textattr: getDefTextattr(),
      // text: getDefText(getDefaultValue(type) || type),
      text: getDefText(""),
      _id: id + idPostfix[type],
    };
  }

  attrs._id = id;

  return attrs;
}

export function getDefAux(text = undefined, position = undefined) {
  let id = getNextId();

  return {
    posattr: getDefPosattr(position),
    fillattr: getDefFillattr(),
    lineattr: getDefLineattr(),
    textattr: getDefTextattr(),
    label: "",
    text: text,
    _id: id,
  };
}

export function updateLabelsPosition(textRenderer, cpnElement) {
  var x = Number(cpnElement.posattr._x);
  var y = Number(cpnElement.posattr._y);
  var w = Number(
    cpnElement.ellipse
      ? cpnElement.ellipse._w
      : cpnElement.ellipse
      ? cpnElement.box._w
      : 10
  );
  var h = Number(
    cpnElement.ellipse
      ? cpnElement.ellipse._h
      : cpnElement.box
      ? cpnElement.box._h
      : 10
  );

  let pos = [];

  // for places
  // Use the same format as the updater (CpnUpdater.js) does.
  // This prevents unnecessary differences due to updates.
  pos["initmark"] = (tw, th) => {
    return {
      _x: Math.round(x + w / 2 + tw / 2).toFixed(6),
      _y: Math.round(y + h / 2 + th / 2).toFixed(6),
    };
  };
  pos["type"] = (tw, th) => {
    return {
      _x: Math.round(x + w / 2 + tw / 2).toFixed(6),
      _y: Math.round(y - h / 2 - th / 2).toFixed(6),
    };
  };

  // for transitions
  pos["time"] = (tw, th) => {
    return {
      _x: Math.round(x + w / 2 + tw / 2 + 5).toFixed(6),
      _y: Math.round(y + h / 2 + th / 2).toFixed(6),
    };
  };
  pos["code"] = (tw, th) => {
    return {
      _x: Math.round(x + w / 2 + tw / 2 + 5).toFixed(6),
      _y: Math.round(y - h / 2 - th / 2).toFixed(6),
    };
  };
  pos["cond"] = (tw, th) => {
    return {
      _x: Math.round(x - w / 2 - tw / 2 - 5).toFixed(6),
      _y: Math.round(y + h / 2 + th / 2).toFixed(6),
    };
  };
  pos["priority"] = (tw, th) => {
    return {
      _x: Math.round(x - w / 2 - tw / 2 - 5).toFixed(6),
      _y: Math.round(y - h / 2 - th / 2).toFixed(6),
    };
  };

  pos["subst"] = (tw, th) => {
    return { 
      _x: Math.round(x + w / 2).toFixed(6), 
      _y: Math.round(y + h).toFixed(6),
    };
  };

  for (const key of Object.keys(pos)) {
    if (cpnElement[key] && pos[key]) {
      let text = "empty";
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
  let id = getNextId();

  let position = { x: 0, y: 0 };
  if (placeCpnElement && transCpnElement) {
    const p1 = getMid(placeCpnElement);
    const p2 = getMid(transCpnElement);
    position.x = p1.x + (p2.x - p1.x) / 2;
    position.y = p1.y + (p2.y - p1.y) / 2;
    position.y *= -1;

    console.log("getDefArc(), p1, p2, position = ", p1, p2, position);
  }

  let attrs = {
    posattr: getDefPosattr(),
    fillattr: getDefFillattr(),
    lineattr: getDefLineattr(),
    textattr: getDefTextattr(),
    arrowattr: {
      _headsize: 1,
      _currentcyckle: 2,
    },
    transend: {
      _idref: transCpnElement._id,
    },
    placeend: {
      _idref: placeCpnElement._id,
    },
  };

  attrs.annot = {
    posattr: getDefPosattr(position),
    fillattr: getDefFillattr(),
    lineattr: getDefLineattr(),
    textattr: getDefTextattr(),
    text: getDefText(),
    _id: id + "a",
  };

  attrs._id = id;
  attrs._orientation = orientation || "BOTHDIR";
  attrs._order = "1";

  return attrs;
}

function getMid(cpnElement) {
  var x = Number(cpnElement.posattr._x);
  var y = Number(cpnElement.posattr._y);
  var w = Number(
    cpnElement.ellipse ? cpnElement.ellipse._w : cpnElement.box._w
  );
  var h = Number(
    cpnElement.ellipse ? cpnElement.ellipse._h : cpnElement.box._h
  );

  return { x: x + w / 2, y: y + h / 2 };
}

export function getDefSubst(transCpnElement, subPageName, subPageId) {
  let position = {
    x: transCpnElement.posattr._x,
    y: -transCpnElement.posattr._y + transCpnElement.box._h / 2,
  };

  let attrs = {
    subpageinfo: {
      fillattr: getDefFillattr(),
      lineattr: getDefLineattr(),
      posattr: getDefPosattr(position),
      textattr: getDefText(),
      _id: transCpnElement._id + "e",
      _name: subPageName,
    },
    _portsock: "",
    _subpage: subPageId,
  };

  return attrs;
}
