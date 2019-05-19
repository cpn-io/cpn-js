"use strict";
exports.__esModule = true;
var FooBar = (function () {
    function FooBar() {
        this.treeOptions = {
            idField: 'id',
            displayField: 'data.name',
            allowDrag: function (node) { return !node.isRoot; }
        };
    }
    return FooBar;
}());
exports["default"] = FooBar;
