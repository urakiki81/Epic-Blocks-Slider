import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
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
 * External dependencies
 */
import Textarea from 'react-autosize-textarea';
import classnames from 'classnames';
/**
 * WordPress dependencies
 */

import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import { decodeEntities } from '@wordpress/html-entities';
import { ENTER } from '@wordpress/keycodes';
import { withSelect, withDispatch } from '@wordpress/data';
import { VisuallyHidden } from '@wordpress/components';
import { withInstanceId, compose } from '@wordpress/compose';
import { pasteHandler } from '@wordpress/blocks';
/**
 * Internal dependencies
 */

import PostTypeSupportCheck from '../post-type-support-check';
/**
 * Constants
 */

var REGEXP_NEWLINES = /[\r\n]+/g;

var PostTitle = /*#__PURE__*/function (_Component) {
  _inherits(PostTitle, _Component);

  var _super = _createSuper(PostTitle);

  function PostTitle() {
    var _this;

    _classCallCheck(this, PostTitle);

    _this = _super.apply(this, arguments);
    _this.onChange = _this.onChange.bind(_assertThisInitialized(_this));
    _this.onSelect = _this.onSelect.bind(_assertThisInitialized(_this));
    _this.onUnselect = _this.onUnselect.bind(_assertThisInitialized(_this));
    _this.onKeyDown = _this.onKeyDown.bind(_assertThisInitialized(_this));
    _this.onPaste = _this.onPaste.bind(_assertThisInitialized(_this));
    _this.state = {
      isSelected: false
    };
    return _this;
  }

  _createClass(PostTitle, [{
    key: "onSelect",
    value: function onSelect() {
      this.setState({
        isSelected: true
      });
      this.props.clearSelectedBlock();
    }
  }, {
    key: "onUnselect",
    value: function onUnselect() {
      this.setState({
        isSelected: false
      });
    }
  }, {
    key: "onChange",
    value: function onChange(event) {
      var newTitle = event.target.value.replace(REGEXP_NEWLINES, ' ');
      this.props.onUpdate(newTitle);
    }
  }, {
    key: "onKeyDown",
    value: function onKeyDown(event) {
      if (event.keyCode === ENTER) {
        event.preventDefault();
        this.props.onEnterPress();
      }
    }
  }, {
    key: "onPaste",
    value: function onPaste(event) {
      var _this$props = this.props,
          title = _this$props.title,
          onInsertBlockAfter = _this$props.onInsertBlockAfter,
          onUpdate = _this$props.onUpdate;
      var clipboardData = event.clipboardData;
      var plainText = '';
      var html = ''; // IE11 only supports `Text` as an argument for `getData` and will
      // otherwise throw an invalid argument error, so we try the standard
      // arguments first, then fallback to `Text` if they fail.

      try {
        plainText = clipboardData.getData('text/plain');
        html = clipboardData.getData('text/html');
      } catch (error1) {
        try {
          html = clipboardData.getData('Text');
        } catch (error2) {
          // Some browsers like UC Browser paste plain text by default and
          // don't support clipboardData at all, so allow default
          // behaviour.
          return;
        }
      } // Allows us to ask for this information when we get a report.


      window.console.log('Received HTML:\n\n', html);
      window.console.log('Received plain text:\n\n', plainText);
      var content = pasteHandler({
        HTML: html,
        plainText: plainText
      });

      if (typeof content !== 'string' && content.length) {
        event.preventDefault();

        var _content = _slicedToArray(content, 1),
            firstBlock = _content[0];

        if (!title && (firstBlock.name === 'core/heading' || firstBlock.name === 'core/paragraph')) {
          onUpdate(firstBlock.attributes.content);
          onInsertBlockAfter(content.slice(1));
        } else {
          onInsertBlockAfter(content);
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          hasFixedToolbar = _this$props2.hasFixedToolbar,
          isCleanNewPost = _this$props2.isCleanNewPost,
          isFocusMode = _this$props2.isFocusMode,
          instanceId = _this$props2.instanceId,
          placeholder = _this$props2.placeholder,
          title = _this$props2.title;
      var isSelected = this.state.isSelected; // The wp-block className is important for editor styles.
      // This same block is used in both the visual and the code editor.

      var className = classnames('wp-block editor-post-title editor-post-title__block', {
        'is-selected': isSelected,
        'is-focus-mode': isFocusMode,
        'has-fixed-toolbar': hasFixedToolbar
      });
      var decodedPlaceholder = decodeEntities(placeholder);
      return createElement(PostTypeSupportCheck, {
        supportKeys: "title"
      }, createElement("div", {
        className: className
      }, createElement(VisuallyHidden, {
        as: "label",
        htmlFor: "post-title-".concat(instanceId)
      }, decodedPlaceholder || __('Add title')), createElement(Textarea, {
        id: "post-title-".concat(instanceId),
        className: "editor-post-title__input",
        value: title,
        onChange: this.onChange,
        placeholder: decodedPlaceholder || __('Add title'),
        onFocus: this.onSelect,
        onBlur: this.onUnselect,
        onKeyDown: this.onKeyDown,
        onKeyPress: this.onUnselect,
        onPaste: this.onPaste
        /*
        	Only autofocus the title when the post is entirely empty.
        	This should only happen for a new post, which means we
        	focus the title on new post so the author can start typing
        	right away, without needing to click anything.
        */

        /* eslint-disable jsx-a11y/no-autofocus */
        ,
        autoFocus: (document.body === document.activeElement || !document.activeElement) && isCleanNewPost
        /* eslint-enable jsx-a11y/no-autofocus */

      })));
    }
  }]);

  return PostTitle;
}(Component);

var applyWithSelect = withSelect(function (select) {
  var _select = select('core/editor'),
      getEditedPostAttribute = _select.getEditedPostAttribute,
      isCleanNewPost = _select.isCleanNewPost;

  var _select2 = select('core/block-editor'),
      getSettings = _select2.getSettings;

  var _getSettings = getSettings(),
      titlePlaceholder = _getSettings.titlePlaceholder,
      focusMode = _getSettings.focusMode,
      hasFixedToolbar = _getSettings.hasFixedToolbar;

  return {
    isCleanNewPost: isCleanNewPost(),
    title: getEditedPostAttribute('title'),
    placeholder: titlePlaceholder,
    isFocusMode: focusMode,
    hasFixedToolbar: hasFixedToolbar
  };
});
var applyWithDispatch = withDispatch(function (dispatch) {
  var _dispatch = dispatch('core/block-editor'),
      insertDefaultBlock = _dispatch.insertDefaultBlock,
      clearSelectedBlock = _dispatch.clearSelectedBlock,
      insertBlocks = _dispatch.insertBlocks;

  var _dispatch2 = dispatch('core/editor'),
      editPost = _dispatch2.editPost;

  return {
    onEnterPress: function onEnterPress() {
      insertDefaultBlock(undefined, undefined, 0);
    },
    onInsertBlockAfter: function onInsertBlockAfter(blocks) {
      insertBlocks(blocks, 0);
    },
    onUpdate: function onUpdate(title) {
      editPost({
        title: title
      });
    },
    clearSelectedBlock: clearSelectedBlock
  };
});
export default compose(applyWithSelect, applyWithDispatch, withInstanceId)(PostTitle);
//# sourceMappingURL=index.js.map