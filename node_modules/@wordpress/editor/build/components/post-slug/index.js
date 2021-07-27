"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.PostSlug = void 0;

var _element = require("@wordpress/element");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _data = require("@wordpress/data");

var _i18n = require("@wordpress/i18n");

var _compose = require("@wordpress/compose");

var _url = require("@wordpress/url");

var _check = _interopRequireDefault(require("./check"));

var _url2 = require("../../utils/url");

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var PostSlug = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(PostSlug, _Component);

  var _super = _createSuper(PostSlug);

  function PostSlug(_ref) {
    var _this;

    var postSlug = _ref.postSlug,
        postTitle = _ref.postTitle,
        postID = _ref.postID;
    (0, _classCallCheck2.default)(this, PostSlug);
    _this = _super.apply(this, arguments);
    _this.state = {
      editedSlug: (0, _url.safeDecodeURIComponent)(postSlug) || (0, _url2.cleanForSlug)(postTitle) || postID
    };
    _this.setSlug = _this.setSlug.bind((0, _assertThisInitialized2.default)(_this));
    return _this;
  }

  (0, _createClass2.default)(PostSlug, [{
    key: "setSlug",
    value: function setSlug(event) {
      var _this$props = this.props,
          postSlug = _this$props.postSlug,
          onUpdateSlug = _this$props.onUpdateSlug;
      var value = event.target.value;
      var editedSlug = (0, _url2.cleanForSlug)(value);

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
      return (0, _element.createElement)(_check.default, null, (0, _element.createElement)("label", {
        htmlFor: inputId
      }, (0, _i18n.__)('Slug')), (0, _element.createElement)("input", {
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
}(_element.Component);

exports.PostSlug = PostSlug;

var _default = (0, _compose.compose)([(0, _data.withSelect)(function (select) {
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
}), (0, _data.withDispatch)(function (dispatch) {
  var _dispatch = dispatch('core/editor'),
      editPost = _dispatch.editPost;

  return {
    onUpdateSlug: function onUpdateSlug(slug) {
      editPost({
        slug: slug
      });
    }
  };
}), _compose.withInstanceId])(PostSlug);

exports.default = _default;
//# sourceMappingURL=index.js.map