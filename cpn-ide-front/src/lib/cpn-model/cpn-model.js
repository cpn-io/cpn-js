export class Place {
  // posattr;

  constructor(position = undefined) {
    this.posattr = new Posattr(position);
  }
}

export class Posattr {
  // _x;
  // _y;

  constructor(position = undefined) {
    if (position) {
      this._x = (position.x).toString();
      this._y = (-1 * position.y).toString();
    } else {
      this._x = (0).toString();
      this._y = (0).toString();
    };
  }
}
