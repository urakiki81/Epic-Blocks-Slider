import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import { createElement } from "@wordpress/element";

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

/**
 * WordPress dependencies
 */
import { withDispatch, withSelect } from '@wordpress/data';
import { Component } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { withInstanceId, compose } from '@wordpress/compose';
import { safeDecodeURIComponent } from '@wordpress/url';
/**
 * Internal dependencies
 */

import PostSlugCheck from './check';
import { cleanForSlug } from '../../utils/url';
export var PostSlug = /*#__PURE__*/function (_Component) {
  _inherits(PostSlug, _Component);

  var _super = _createSuper(PostSlug);

  function PostSlug(_ref) {
    var _this;

    var postSlug = _ref.postSlug,
        postTitle = _ref.postTitle,
        postID = _ref.postID;

    _classCallCheck(this, PostSlug);

    _this = _super.apply(this, arguments);
    _this.state = {
      editedSlug: safeDecodeURIComponent(postSlug) || cleanForSlug(postTitle) || postID
    };
    _this.setSlug = _this.setSlug.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(PostSlug, [{
    key: "setSlug",
    value: function setSlug(event) {
      var _this$props = this.props,
          postSlug = _this$props.postSlug,
          onUpdateSlug = _this$props.onUpdateSlug;
      var value = event.target.value;
      var editedSlug = cleanForSlug(value);

      if (editedSlug === postSlug) {
        return;
      }

      onUpdateSlug(editedSlug);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var instanceId = this.props.instanceId;
      var editedSlug = this.state.editedSlug;
      var inputId = 'editor-post-slug-' + instanceId;
      return createElement(PostSlugCheck, null, createElement("label", {
        htmlFor: inputId
      }, __('Slug')), createElement("input", {
        type: "text",
        id: inputId,
        value: editedSlug,
        onChange: function onChange(event) {
          return _this2.setState({
            editedSlug: event.target.value
          });
        },
        onBlur: this.setSlug,
        className: "editor-post-slug__input"
      }));
    }
  }]);

  return PostSlug;
}(Component);
export default compose([withSelect(function (select) {
  var _select = select('core/editor'),
      getCurrentPost = _select.getCurrentPost,
      getEditedPostAttribute = _select.getEditedPostAttribute;

  var _getCurrentPost = getCurrentPost(),
      id = _getCurrentPost.id;

  return {
    postSlug: getEditedPostAttribute('slug'),
    postTitle: getEditedPostAttribute('title'),
    postID: id
  };
}), withDispatch(function (dispatch) {
  var _dispatch = dispatch('core/editor'),
      editPost = _dispatch.editPost;

  return {
    onUpdateSlug: function onUpdateSlug(slug) {
      editPost({
        slug: slug
      });
    }
  };
}), withInstanceId])(PostSlug);
//# sourceMappingURL=index.js.map