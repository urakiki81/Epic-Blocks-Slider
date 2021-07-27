"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _data = require("@wordpress/data");

/**
 * WordPress dependencies
 */
function PostTrashCheck(_ref) {
  var isNew = _ref.isNew,
      postId = _ref.postId,
      canUserDelete = _ref.canUserDelete,
      children = _ref.children;

  if (isNew || !postId || !canUserDelete) {
    return null;
  }

  return children;
}

var _default = (0, _data.withSelect)(function (select) {
  var _select = select('core/editor'),
      isEditedPostNew = _select.isEditedPostNew,
      getCurrentPostId = _select.getCurrentPostId,
      getCurrentPostType = _select.getCurrentPostType;

  var _select2 = select('core'),
      getPostType = _select2.getPostType,
      canUser = _select2.canUser;

  var postId = getCurrentPostId();
  var postType = getPostType(getCurrentPostType());
  var resource = (postType === null || postType === void 0 ? void 0 : postType['rest_base']) || '';
  return {
    isNew: isEditedPostNew(),
    postId: postId,
    canUserDelete: postId && resource ? canUser('delete', resource, postId) : false
  };
})(PostTrashCheck);

exports.default = _default;
//# sourceMappingURL=check.js.map