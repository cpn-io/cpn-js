import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-text-edit-row',
  templateUrl: './text-edit-row.html',
  styleUrls: ['./text-edit-row.scss']
})
export class TextEditRowComponent {
  @Input() type = 'text';
  @Input() name: string;
  @Input() object: object;
  @Input() field: string;
  @Input() colors = [];
  @Input() options = [];
  @Input() readonly = false;
  @Input() pre = true;

  @Output() changed = new EventEmitter();

  private colorNames = {
    'Fucia': '#ff00ff',
    'Maroon': '#800000',
    'Yellow': '#ffff00',
    'White': '#ffffff',
    'Red': '#ff0000',
    'Silver': '#c0c0c0',
    'Teal': '#008080',
    'Navy': '#000080',
    'Aqua': '#00ffff',
    'Black': '#000000',
    'Olive': '#808000',
    'Lime': '#00ff00',
    'Gray': '#808080',
    'Purple': '#800080',
    'Green': '#008000',
    'Blue': '#0000ff'
  };

  color2name(color) {
    for (const name of Object.keys(this.colorNames)) {
      if (this.colorNames[name] && this.colorNames[name].toLowerCase() === color.toLowerCase()) {
        return name;
      }
    }
    return color;
  }

  name2color(name) {
    return this.colorNames[name] || name;
  }

  onKeyDown(e) {
    if (!e) {
      e = window.event;
    }

    console.log('keydown, e = ', e);

    const keyCode = e.which || e.keyCode,
      target = e.target || e.srcElement;

    if (keyCode === 13 && !e.shiftKey) {
      // console.log('keydown. Just enter without shift key');

      if (e.preventDefault) {
        e.preventDefault();
      } else {
        e.returnValue = false;
      }

      this.onChange(e);
    }
  }

  onChange(event) {
    if (this.type === 'text') {
      this.object[this.field] = event.target.textContent;
    }
    if (this.type === 'ml') {
      this.object[this.field] = event.target.textContent;
    }
    if (this.type === 'int') {
      this.object[this.field] = parseInt(event.target.textContent, 0);
    }
    if (this.type === 'color') {
      this.object[this.field] = this.color2name(event.target.value);
    }
    if (this.type === 'select') {
      this.object[this.field] = event;
    }
    this.changed.emit(this.object[this.field]);
  }

  parseInt(x, base) {
    const parsed = parseInt(x, base);
    if (isNaN(parsed)) { return base; }
    return parsed;
  }


  // getPortObject(cpnElement, text) {
  //   const port = {
  //     fillattr: { _colour: 'White', _pattern: 'Solid', _filled: 'false' },
  //     lineattr: { _colour: 'Black', _thick: '0', _type: 'Solid' },
  //     posattr: { _x: cpnElement.posattr._x, _y: cpnElement.posattr._y - cpnElement.ellipse._h },
  //     _text: text,
  //     textattr: { _colour: 'Black', _bold: 'false' },
  //     _id: cpnElement._id + 'e',
  //     _type: text === 'In/Out' ? 'I/O' : text
  //   };
  //   return port;
  // }

  // getSubPage(cpnElement, name, pageId) {
  //   cpnElement['subst'] = {
  //     subpageinfo: {
  //       fillattr: { _colour: 'White', _pattern: 'Solid', _filled: 'false' },
  //       lineattr: { _colour: 'Black', _thick: '0', _type: 'Solid' },
  //       posattr: { _x: cpnElement.posattr._x, _y: cpnElement.posattr._y - cpnElement.box._h / 2 },
  //       textattr: { _colour: 'Black', _bold: 'false' },
  //       _id: cpnElement._id + 'e',
  //       _name: name
  //     },
  //     _portsock: '',
  //     _subpage: pageId
  //   };

  //   return cpnElement;
  // }

}
