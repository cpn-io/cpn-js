'use strict';

var repeat = require('repeat-string');

var splitOnTags = function splitOnTags(str) {
  return str.split(/(<\/?[^>]+>)/g).filter(function (line) {
    return line.trim() !== '';
  });
};
var isTag = function isTag(str) {
  return (/<[^>!]+>/.test(str)
  );
};
var isXMLDeclaration = function isXMLDeclaration(str) {
  return (/<\?[^?>]+\?>/.test(str)
  );
};
var isClosingTag = function isClosingTag(str) {
  return (/<\/+[^>]+>/.test(str)
  );
};
var isSelfClosingTag = function isSelfClosingTag(str) {
  return (/<[^>]+\/>/.test(str)
  );
};
var isOpeningTag = function isOpeningTag(str) {
  return isTag(str) && !isClosingTag(str) && !isSelfClosingTag(str) && !isXMLDeclaration(str);
};

export function xmlBeautify(xml, indent) {
  var depth = 0;
  indent = indent || '    ';

  return splitOnTags(xml).map(function (item) {
    if (isClosingTag(item)) {
      depth--;
    }

    var line = repeat(indent, depth) + item;

    if (isOpeningTag(item)) {
      depth++;
    }

    return line;
  }).join('\n');
};
