"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _blockEditor = require("@wordpress/block-editor");

var _button = require("../button/");

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var ALLOWED_BLOCKS = [_button.name];
var BUTTONS_TEMPLATE = [['core/button']]; // Inside buttons block alignment options are not supported.

var alignmentHooksSetting = {
  isEmbedButton: true
};

function ButtonsEdit() {
  return (0, _element.createElement)(_blockEditor.__experimentalBlock.div, null, (0, _element.createElement)(_blockEditor.__experimentalAlignmentHookSettingsProvider, {
    value: alignmentHooksSetting
  }, (0, _element.createElement)(_blockEditor.InnerBlocks, {
    allowedBlocks: ALLOWED_BLOCKS,
    template: BUTTONS_TEMPLATE,
    orientation: "horizontal"
  })));
}

var _default = ButtonsEdit;
exports.default = _default;
//# sourceMappingURL=edit.js.map