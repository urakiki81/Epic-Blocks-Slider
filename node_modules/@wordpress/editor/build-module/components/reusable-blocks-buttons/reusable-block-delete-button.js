import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { compose } from '@wordpress/compose';
import { MenuItem } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { isReusableBlock } from '@wordpress/blocks';
import { withSelect, withDispatch } from '@wordpress/data';
import { BlockSettingsMenuControls } from '@wordpress/block-editor';
export function ReusableBlockDeleteButton(_ref) {
  var isVisible = _ref.isVisible,
      isDisabled = _ref.isDisabled,
      onDelete = _ref.onDelete;

  if (!isVisible) {
    return null;
  }

  return createElement(BlockSettingsMenuControls, null, function (_ref2) {
    var onClose = _ref2.onClose;
    return createElement(MenuItem, {
      disabled: isDisabled,
      onClick: function onClick() {
        var hasConfirmed = onDelete();

        if (hasConfirmed) {
          onClose();
        }
      }
    }, __('Remove from Reusable blocks'));
  });
}
export default compose([withSelect(function (select, _ref3) {
  var clientId = _ref3.clientId;

  var _select = select('core/block-editor'),
      getBlock = _select.getBlock;

  var _select2 = select('core'),
      canUser = _select2.canUser;

  var _select3 = select('core/editor'),
      getReusableBlock = _select3.__experimentalGetReusableBlock;

  var block = getBlock(clientId);
  var reusableBlock = block && isReusableBlock(block) ? getReusableBlock(block.attributes.ref) : null;
  return {
    isVisible: !!reusableBlock && (reusableBlock.isTemporary || !!canUser('delete', 'blocks', reusableBlock.id)),
    isDisabled: reusableBlock && reusableBlock.isTemporary
  };
}), withDispatch(function (dispatch, _ref4, _ref5) {
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
      __('Are you sure you want to delete this Reusable Block?\n\n' + 'It will be permanently removed from all posts and pages that use it.'));

      if (hasConfirmed) {
        var block = getBlock(clientId);
        deleteReusableBlock(block.attributes.ref);
      }

      return hasConfirmed;
    }
  };
})])(ReusableBlockDeleteButton);
//# sourceMappingURL=reusable-block-delete-button.js.map