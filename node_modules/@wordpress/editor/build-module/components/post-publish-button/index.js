import _extends from "@babel/runtime/helpers/esm/extends";
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
import { noop, get, some } from 'lodash';
import classnames from 'classnames';
/**
 * WordPress dependencies
 */

import { Button } from '@wordpress/components';
import { Component, createRef } from '@wordpress/element';
import { withSelect, withDispatch } from '@wordpress/data';
import { compose } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
/**
 * Internal dependencies
 */

import PublishButtonLabel from './label';
export var PostPublishButton = /*#__PURE__*/function (_Component) {
  _inherits(PostPublishButton, _Component);

  var _super = _createSuper(PostPublishButton);

  function PostPublishButton(props) {
    var _this;

    _classCallCheck(this, PostPublishButton);

    _this = _super.call(this, props);
    _this.buttonNode = createRef();
    _this.createOnClick = _this.createOnClick.bind(_assertThisInitialized(_this));
    _this.closeEntitiesSavedStates = _this.closeEntitiesSavedStates.bind(_assertThisInitialized(_this));
    _this.state = {
      entitiesSavedStatesCallback: false
    };
    return _this;
  }

  _createClass(PostPublishButton, [{
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

          return noop;
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
        if (savedEntities && some(savedEntities, function (elt) {
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
          onSubmit = _this$props2$onSubmit === void 0 ? noop : _this$props2$onSubmit,
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
      var toggleChildren = isBeingScheduled ? __('Schedule…') : __('Publish');
      var buttonChildren = createElement(PublishButtonLabel, {
        forceIsSaving: forceIsSaving,
        hasNonPostEntityChanges: hasNonPostEntityChanges
      });
      var componentProps = isToggle ? toggleProps : buttonProps;
      var componentChildren = isToggle ? toggleChildren : buttonChildren;
      return createElement(Fragment, null, createElement(Button, _extends({
        ref: this.buttonNode
      }, componentProps, {
        className: classnames(componentProps.className, 'editor-post-publish-button__button', {
          'has-changes-dot': hasNonPostEntityChanges
        })
      }), componentChildren));
    }
  }]);

  return PostPublishButton;
}(Component);
export default compose([withSelect(function (select) {
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
    hasPublishAction: get(getCurrentPost(), ['_links', 'wp:action-publish'], false),
    postType: getCurrentPostType(),
    postId: getCurrentPostId(),
    hasNonPostEntityChanges: hasNonPostEntityChanges()
  };
}), withDispatch(function (dispatch) {
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
//# sourceMappingURL=index.js.map