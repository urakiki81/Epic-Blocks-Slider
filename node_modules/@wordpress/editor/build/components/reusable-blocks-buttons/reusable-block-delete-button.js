"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReusableBlockDeleteButton = ReusableBlockDeleteButton;
exports.default = void 0;

var _element = require("@wordpress/element");

var _compose = require("@wordpress/compose");

var _components = require("@wordpress/components");

var _i18n = require("@wordpress/i18n");

var _blocks = require("@wordpress/blocks");

var _data = require("@wordpress/data");

var _blockEditor = require("@wordpress/block-editor");

/**
 * WordPress dependencies
 */
function ReusableBlockDeleteButton(_ref) {
  var isVisible = _ref.isVisible,
      isDisabled = _ref.isDisabled,
      onDelete = _ref.onDelete;

  if (!isVisible) {
    return null;
  }

  return (0, _element.createElement)(_blockEditor.BlockSettingsMenuControls, null, function (_ref2) {
    var onClose = _ref2.onClose;
    return (0, _element.createElement)(_components.MenuItem, {
      disabled: isDisabled,
      onClick: function onClick() {
        var hasConfirmed = onDelete();

        if (hasConfirmed) {
          onClose();
        }
      }
    }, (0, _i18n.__)('Remove from Reusable blocks'));
  });
}

var _default = (0, _compose.compose)([(0, _data.withSelect)(function (select, _ref3) {
  var clientId = _ref3.clientId;

  var _select = select('core/block-editor'),
      getBlock = _select.getBlock;

  var _select2 = select('core'),
      canUser = _select2.canUser;

  var _select3 = select('core/editor'),
      getReusableBlock = _select3.__experimentalGetReusableBlock;

  var block = getBlock(clientId);
  var reusableBlock = block && (0, _blocks.isReusableBlock)(block) ? getReusableBlock(block.attributes.ref) : null;
  return {
    isVisible: !!reusableBlock && (reusableBlock.isTemporary || !!canUser('delete', 'blocks', reusableBlock.id)),
    isDisabled: reusableBlock && reusableBlock.isTemporary
  };
}), (0, _data.withDispatch)(function (dispatch, _ref4, _ref5) {
  var clientId = _ref4.clientId;
  var select = _ref5.select;

  var _dispatch = dispatch('core/editor'),
      deleteReusableBlock = _dispatch.__experimentalDeleteReusableBlock;

  var _select4 = select('core/block-editor'),
      getBlock = _select4.getBlock;

  return {
    onDelete: function onDelete() {
      // TODO: Make this a <Confirm /> component or similar
      // eslint-disable-next-line no-alert
      var hasConfirmed = window.confirm( // eslint-disable-next-line @wordpress/i18n-no-collapsible-whitespace
      (0, _i18n.__)('Are you sure you want to delete this Reusable Block?\n\n' + 'It will be permanently removed from all posts and pages that use it.'));

      if (hasConfirmed) {
        var block = getBlock(clientId);
        deleteReusableBlock(block.attributes.ref);
      }

      return hasConfirmed;
    }
  };
})])(ReusableBlockDeleteButton);

exports.default = _default;
//# sourceMappingURL=reusable-block-delete-button.js.map