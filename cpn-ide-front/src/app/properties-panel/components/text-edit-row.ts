import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
    selector: 'app-text-edit-row',
    templateUrl: './text-edit-row.html',
    styleUrls: ['./text-edit-row.scss']
})
export class TextEditRowComponent {
    @Input('type') _type = 'text';
    @Input('name') _name;
    @Input('object') _object;
    @Input('field') _field;
    @Input('colors') _colors = [];
    @Input('options') _options = [];

    @Output('changed') changed = new EventEmitter();

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

        var keyCode = e.which || e.keyCode,
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
        if (this._type === 'text')
            this._object[this._field] = event.target.textContent;
        if (this._type === 'int')
            this._object[this._field] = parseInt(event.target.textContent, 0);
        if (this._type === 'color')
            this._object[this._field] = this.color2name(event.target.value);
        if (this._type === 'select')
            this._object[this._field] = event;

        this.changed.emit(this._object[this._field]);
    }

    parseInt(x, base) {
        var parsed = parseInt(x, base);
        if (isNaN(parsed)) { return base; }
        return parsed;
    }
}