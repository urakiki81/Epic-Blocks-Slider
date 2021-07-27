import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import { createElement, Fragment } from "@wordpress/element";

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

/**
 * External dependencies
 */
import { get } from 'lodash';
/**
 * WordPress dependencies
 */

import { PanelBody, Button, ClipboardButton, TextControl } from '@wordpress/components';
import { __, sprintf } from '@wordpress/i18n';
import { Component, createRef } from '@wordpress/element';
import { withSelect } from '@wordpress/data';
import { safeDecodeURIComponent } from '@wordpress/url';
import { decodeEntities } from '@wordpress/html-entities';
/**
 * Internal dependencies
 */

import PostScheduleLabel from '../post-schedule/label';
var POSTNAME = '%postname%';
/**
 * Returns URL for a future post.
 *
 * @param {Object} post         Post object.
 *
 * @return {string} PostPublish URL.
 */

var getFuturePostUrl = function getFuturePostUrl(post) {
  var slug = post.slug;

  if (post.permalink_template.includes(POSTNAME)) {
    return post.permalink_template.replace(POSTNAME, slug);
  }

  return post.permalink_template;
};

var PostPublishPanelPostpublish = /*#__PURE__*/function (_Component) {
  _inherits(PostPublishPanelPostpublish, _Component);

  var _super = _createSuper(PostPublishPanelPostpublish);

  function PostPublishPanelPostpublish() {
    var _this;

    _classCallCheck(this, PostPublishPanelPostpublish);

    _this = _super.apply(this, arguments);
    _this.state = {
      showCopyConfirmation: false
    };
    _this.onCopy = _this.onCopy.bind(_assertThisInitialized(_this));
    _this.onSelectInput = _this.onSelectInput.bind(_assertThisInitialized(_this));
    _this.postLink = createRef();
    return _this;
  }

  _createClass(PostPublishPanelPostpublish, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.focusOnMount) {
        this.postLink.current.focus();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      clearTimeout(this.dismissCopyConfirmation);
    }
  }, {
    key: "onCopy",
    value: function onCopy() {
      var _this2 = this;

      this.setState({
        showCopyConfirmation: true
      });
      clearTimeout(this.dismissCopyConfirmation);
      this.dismissCopyConfirmation = setTimeout(function () {
        _this2.setState({
          showCopyConfirmation: false
        });
      }, 4000);
    }
  }, {
    key: "onSelectInput",
    value: function onSelectInput(event) {
      event.target.select();
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          isScheduled = _this$props.isScheduled,
          post = _this$props.post,
          postType = _this$props.postType;
      var postLabel = get(postType, ['labels', 'singular_name']);
      var viewPostLabel = get(postType, ['labels', 'view_item']);
      var link = post.status === 'future' ? getFuturePostUrl(post) : post.link;
      var postPublishNonLinkHeader = isScheduled ? createElement(Fragment, null, __('is now scheduled. It will go live on'), ' ', createElement(PostScheduleLabel, null), ".") : __('is now live.');
      return createElement("div", {
        className: "post-publish-panel__postpublish"
      }, createElement(PanelBody, {
        className: "post-publish-panel__postpublish-header"
      }, createElement("a", {
        ref: this.postLink,
        href: link
      }, decodeEntities(post.title) || __('(no title)')), ' ', postPublishNonLinkHeader), createElement(PanelBody, null, createElement("p", {
        className: "post-publish-panel__postpublish-subheader"
      }, createElement("strong", null, __('What’s next?'))), createElement(TextControl, {
        className: "post-publish-panel__postpublish-post-address",
        readOnly: true,
        label: sprintf(
        /* translators: %s: post type singular name */
        __('%s address'), postLabel),
        value: safeDecodeURIComponent(link),
        onFocus: this.onSelectInput
      }), createElement("div", {
        className: "post-publish-panel__postpublish-buttons"
      }, !isScheduled && createElement(Button, {
        isSecondary: true,
        href: link
      }, viewPostLabel), createElement(ClipboardButton, {
        isSecondary: true,
        text: link,
        onCopy: this.onCopy
      }, this.state.showCopyConfirmation ? __('Copied!') : __('Copy Link')))), children);
    }
  }]);

  return PostPublishPanelPostpublish;
}(Component);

export default withSelect(function (select) {
  var _select = select('core/editor'),
      getEditedPostAttribute = _select.getEditedPostAttribute,
      getCurrentPost = _select.getCurrentPost,
      isCurrentPostScheduled = _select.isCurrentPostScheduled;

  var _select2 = select('core'),
      getPostType = _select2.getPostType;

  return {
    post: getCurrentPost(),
    postType: getPostType(getEditedPostAttribute('type')),
    isScheduled: isCurrentPostScheduled()
  };
})(PostPublishPanelPostpublish);
//# sourceMappingURL=postpublish.js.map