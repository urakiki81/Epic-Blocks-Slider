"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.PostPublishButton = void 0;

var _element = require("@wordpress/element");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _lodash = require("lodash");

var _classnames = _interopRequireDefault(require("classnames"));

var _components = require("@wordpress/components");

var _data = require("@wordpress/data");

var _compose = require("@wordpress/compose");

var _i18n = require("@wordpress/i18n");

var _label = _interopRequireDefault(require("./label"));

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var PostPublishButton = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(PostPublishButton, _Component);

  var _super = _createSuper(PostPublishButton);

  function PostPublishButton(props) {
    var _this;

    (0, _classCallCheck2.default)(this, PostPublishButton);
    _this = _super.call(this, props);
    _this.buttonNode = (0, _element.createRef)();
    _this.createOnClick = _this.createOnClick.bind((0, _assertThisInitialized2.default)(_this));
    _this.closeEntitiesSavedStates = _this.closeEntitiesSavedStates.bind((0, _assertThisInitialized2.default)(_this));
    _this.state = {
      entitiesSavedStatesCallback: false
    };
    return _this;
  }

  (0, _createClass2.default)(PostPublishButton, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.focusOnMount) {
        this.buttonNode.current.focus();
      }
    }
  }, {
    key: "createOnClick",
    value: function createOnClick(callback) {
      var _this2 = this;

      return function () {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        var hasNonPostEntityChanges = _this2.props.hasNonPostEntityChanges;

        if (hasNonPostEntityChanges) {
          // The modal for multiple entity saving will open,
          // hold the callback for saving/publishing the post
          // so that we can call it if the post entity is checked.
          _this2.setState({
            entitiesSavedStatesCallback: function entitiesSavedStatesCallback() {
              return callback.apply(void 0, args);
            }
          }); // Open the save panel by setting its callback.
          // To set a function on the useState hook, we must set it
          // with another function (() => myFunction). Passing the
          // function on its own will cause an error when called.


          _this2.props.setEntitiesSavedStatesCallback(function () {
            return _this2.closeEntitiesSavedStates;
          });

          return _lodash.noop;
        }

        return callback.apply(void 0, args);
      };
    }
  }, {
    key: "closeEntitiesSavedStates",
    value: function closeEntitiesSavedStates(savedEntities) {
      var _this$props = this.props,
          postType = _this$props.postType,
          postId = _this$props.postId;
      var entitiesSavedStatesCallback = this.state.entitiesSavedStatesCallback;
      this.setState({
        entitiesSavedStatesCallback: false
      }, function () {
        if (savedEntities && (0, _lodash.some)(savedEntities, function (elt) {
          return elt.kind === 'postType' && elt.name === postType && elt.key === postId;
        })) {
          // The post entity was checked, call the held callback from `createOnClick`.
          entitiesSavedStatesCallback();
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          forceIsDirty = _this$props2.forceIsDirty,
          forceIsSaving = _this$props2.forceIsSaving,
          hasPublishAction = _this$props2.hasPublishAction,
          isBeingScheduled = _this$props2.isBeingScheduled,
          isOpen = _this$props2.isOpen,
          isPostSavingLocked = _this$props2.isPostSavingLocked,
          isPublishable = _this$props2.isPublishable,
          isPublished = _this$props2.isPublished,
          isSaveable = _this$props2.isSaveable,
          isSaving = _this$props2.isSaving,
          isToggle = _this$props2.isToggle,
          onSave = _this$props2.onSave,
          onStatusChange = _this$props2.onStatusChange,
          _this$props2$onSubmit = _this$props2.onSubmit,
          onSubmit = _this$props2$onSubmit === void 0 ? _lodash.noop : _this$props2$onSubmit,
          onToggle = _this$props2.onToggle,
          visibility = _this$props2.visibility,
          hasNonPostEntityChanges = _this$props2.hasNonPostEntityChanges;
      var isButtonDisabled = isSaving || forceIsSaving || !isSaveable || isPostSavingLocked || !isPublishable && !forceIsDirty;
      var isToggleDisabled = isPublished || isSaving || forceIsSaving || !isSaveable || !isPublishable && !forceIsDirty;
      var publishStatus;

      if (!hasPublishAction) {
        publishStatus = 'pending';
      } else if (visibility === 'private') {
        publishStatus = 'private';
      } else if (isBeingScheduled) {
        publishStatus = 'future';
      } else {
        publishStatus = 'publish';
      }

      var onClickButton = function onClickButton() {
        if (isButtonDisabled) {
          return;
        }

        onSubmit();
        onStatusChange(publishStatus);
        onSave();
      };

      var onClickToggle = function onClickToggle() {
        if (isToggleDisabled) {
          return;
        }

        onToggle();
      };

      var buttonProps = {
        'aria-disabled': isButtonDisabled && !hasNonPostEntityChanges,
        className: 'editor-post-publish-button',
        isBusy: isSaving && isPublished,
        isPrimary: true,
        onClick: this.createOnClick(onClickButton)
      };
      var toggleProps = {
        'aria-disabled': isToggleDisabled && !hasNonPostEntityChanges,
        'aria-expanded': isOpen,
        className: 'editor-post-publish-panel__toggle',
        isBusy: isSaving && isPublished,
        isPrimary: true,
        onClick: this.createOnClick(onClickToggle)
      };
      var toggleChildren = isBeingScheduled ? (0, _i18n.__)('Schedule…') : (0, _i18n.__)('Publish');
      var buttonChildren = (0, _element.createElement)(_label.default, {
        forceIsSaving: forceIsSaving,
        hasNonPostEntityChanges: hasNonPostEntityChanges
      });
      var componentProps = isToggle ? toggleProps : buttonProps;
      var componentChildren = isToggle ? toggleChildren : buttonChildren;
      return (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(_components.Button, (0, _extends2.default)({
        ref: this.buttonNode
      }, componentProps, {
        className: (0, _classnames.default)(componentProps.className, 'editor-post-publish-button__button', {
          'has-changes-dot': hasNonPostEntityChanges
        })
      }), componentChildren));
    }
  }]);
  return PostPublishButton;
}(_element.Component);

exports.PostPublishButton = PostPublishButton;

var _default = (0, _compose.compose)([(0, _data.withSelect)(function (select) {
  var _select = select('core/editor'),
      isSavingPost = _select.isSavingPost,
      isEditedPostBeingScheduled = _select.isEditedPostBeingScheduled,
      getEditedPostVisibility = _select.getEditedPostVisibility,
      isCurrentPostPublished = _select.isCurrentPostPublished,
      isEditedPostSaveable = _select.isEditedPostSaveable,
      isEditedPostPublishable = _select.isEditedPostPublishable,
      isPostSavingLocked = _select.isPostSavingLocked,
      getCurrentPost = _select.getCurrentPost,
      getCurrentPostType = _select.getCurrentPostType,
      getCurrentPostId = _select.getCurrentPostId,
      hasNonPostEntityChanges = _select.hasNonPostEntityChanges;

  return {
    isSaving: isSavingPost(),
    isBeingScheduled: isEditedPostBeingScheduled(),
    visibility: getEditedPostVisibility(),
    isSaveable: isEditedPostSaveable(),
    isPostSavingLocked: isPostSavingLocked(),
    isPublishable: isEditedPostPublishable(),
    isPublished: isCurrentPostPublished(),
    hasPublishAction: (0, _lodash.get)(getCurrentPost(), ['_links', 'wp:action-publish'], false),
    postType: getCurrentPostType(),
    postId: getCurrentPostId(),
    hasNonPostEntityChanges: hasNonPostEntityChanges()
  };
}), (0, _data.withDispatch)(function (dispatch) {
  var _dispatch = dispatch('core/editor'),
      editPost = _dispatch.editPost,
      savePost = _dispatch.savePost;

  return {
    onStatusChange: function onStatusChange(status) {
      return editPost({
        status: status
      }, {
        undoIgnore: true
      });
    },
    onSave: savePost
  };
})])(PostPublishButton);

exports.default = _default;
//# sourceMappingURL=index.js.map