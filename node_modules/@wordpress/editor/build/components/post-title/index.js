"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _reactAutosizeTextarea = _interopRequireDefault(require("react-autosize-textarea"));

var _classnames = _interopRequireDefault(require("classnames"));

var _i18n = require("@wordpress/i18n");

var _htmlEntities = require("@wordpress/html-entities");

var _keycodes = require("@wordpress/keycodes");

var _data = require("@wordpress/data");

var _components = require("@wordpress/components");

var _compose = require("@wordpress/compose");

var _blocks = require("@wordpress/blocks");

var _postTypeSupportCheck = _interopRequireDefault(require("../post-type-support-check"));

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

/**
 * Constants
 */
var REGEXP_NEWLINES = /[\r\n]+/g;

var PostTitle = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(PostTitle, _Component);

  var _super = _createSuper(PostTitle);

  function PostTitle() {
    var _this;

    (0, _classCallCheck2.default)(this, PostTitle);
    _this = _super.apply(this, arguments);
    _this.onChange = _this.onChange.bind((0, _assertThisInitialized2.default)(_this));
    _this.onSelect = _this.onSelect.bind((0, _assertThisInitialized2.default)(_this));
    _this.onUnselect = _this.onUnselect.bind((0, _assertThisInitialized2.default)(_this));
    _this.onKeyDown = _this.onKeyDown.bind((0, _assertThisInitialized2.default)(_this));
    _this.onPaste = _this.onPaste.bind((0, _assertThisInitialized2.default)(_this));
    _this.state = {
      isSelected: false
    };
    return _this;
  }

  (0, _createClass2.default)(PostTitle, [{
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
      if (event.keyCode === _keycodes.ENTER) {
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
      var content = (0, _blocks.pasteHandler)({
        HTML: html,
        plainText: plainText
      });

      if (typeof content !== 'string' && content.length) {
        event.preventDefault();

        var _content = (0, _slicedToArray2.default)(content, 1),
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

      var className = (0, _classnames.default)('wp-block editor-post-title editor-post-title__block', {
        'is-selected': isSelected,
        'is-focus-mode': isFocusMode,
        'has-fixed-toolbar': hasFixedToolbar
      });
      var decodedPlaceholder = (0, _htmlEntities.decodeEntities)(placeholder);
      return (0, _element.createElement)(_postTypeSupportCheck.default, {
        supportKeys: "title"
      }, (0, _element.createElement)("div", {
        className: className
      }, (0, _element.createElement)(_components.VisuallyHidden, {
        as: "label",
        htmlFor: "post-title-".concat(instanceId)
      }, decodedPlaceholder || (0, _i18n.__)('Add title')), (0, _element.createElement)(_reactAutosizeTextarea.default, {
        id: "post-title-".concat(instanceId),
        className: "editor-post-title__input",
        value: title,
        onChange: this.onChange,
        placeholder: decodedPlaceholder || (0, _i18n.__)('Add title'),
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
}(_element.Component);

var applyWithSelect = (0, _data.withSelect)(function (select) {
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
var applyWithDispatch = (0, _data.withDispatch)(function (dispatch) {
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

var _default = (0, _compose.compose)(applyWithSelect, applyWithDispatch, _compose.withInstanceId)(PostTitle);

exports.default = _default;
//# sourceMappingURL=index.js.map