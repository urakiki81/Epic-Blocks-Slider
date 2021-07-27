"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SocialLinksEdit = SocialLinksEdit;
exports.default = void 0;

var _element = require("@wordpress/element");

var _blockEditor = require("@wordpress/block-editor");

/**
 * WordPress dependencies
 */
var ALLOWED_BLOCKS = ['core/social-link']; // Template contains the links that show when start.

var TEMPLATE = [['core/social-link', {
  service: 'wordpress',
  url: 'https://wordpress.org'
}], ['core/social-link', {
  service: 'facebook'
}], ['core/social-link', {
  service: 'twitter'
}], ['core/social-link', {
  service: 'instagram'
}], ['core/social-link', {
  service: 'linkedin'
}], ['core/social-link', {
  service: 'youtube'
}]];

function SocialLinksEdit() {
  return (0, _element.createElement)(_blockEditor.InnerBlocks, {
    allowedBlocks: ALLOWED_BLOCKS,
    templateLock: false,
    template: TEMPLATE,
    orientation: "horizontal",
    __experimentalTagName: _blockEditor.__experimentalBlock.ul,
    __experimentalAppenderTagName: "li"
  });
}

var _default = SocialLinksEdit;
exports.default = _default;
//# sourceMappingURL=edit.js.map