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

    onChange() {
        this.changed.emit(this._object[this._field]);
    }

    parseInt(x, base) {
        var parsed = parseInt(x, base);
        if (isNaN(parsed)) { return base; }
        return parsed;
    }
}