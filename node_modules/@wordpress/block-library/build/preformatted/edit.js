"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = PreformattedEdit;

var _element = require("@wordpress/element");

var _i18n = require("@wordpress/i18n");

var _blockEditor = require("@wordpress/block-editor");

/**
 * WordPress dependencies
 */
function PreformattedEdit(_ref) {
  var attributes = _ref.attributes,
      mergeBlocks = _ref.mergeBlocks,
      setAttributes = _ref.setAttributes,
      className = _ref.className,
      style = _ref.style;
  var content = attributes.content;
  return (0, _element.createElement)(_blockEditor.RichText, {
    tagName: _blockEditor.__experimentalBlock.pre,
    identifier: "content",
    preserveWhiteSpace: true,
    value: content,
    onChange: function onChange(nextContent) {
      setAttributes({
        content: nextContent
      });
    },
    placeholder: (0, _i18n.__)('Write preformatted text…'),
    className: className,
    style: style,
    onMerge: mergeBlocks
  });
}
//# sourceMappingURL=edit.js.map