import { createElement, Fragment } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { withSelect } from '@wordpress/data';
/**
 * Internal dependencies
 */

import ReusableBlockConvertButton from './reusable-block-convert-button';
import ReusableBlockDeleteButton from './reusable-block-delete-button';

function ReusableBlocksButtons(_ref) {
  var clientIds = _ref.clientIds;
  return createElement(Fragment, null, createElement(ReusableBlockConvertButton, {
    clientIds: clientIds
  }), clientIds.length === 1 && createElement(ReusableBlockDeleteButton, {
    clientId: clientIds[0]
  }));
}

export default withSelect(function (select) {
  var _select = select('core/block-editor'),
      getSelectedBlockClientIds = _select.getSelectedBlockClientIds;

  return {
    clientIds: getSelectedBlockClientIds()
  };
})(ReusableBlocksButtons);
//# sourceMappingURL=index.js.map