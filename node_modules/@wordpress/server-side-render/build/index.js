"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _data = require("@wordpress/data");

var _deprecated = _interopRequireDefault(require("@wordpress/deprecated"));

var _serverSideRender = _interopRequireDefault(require("./server-side-render"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * Constants
 */
var EMPTY_OBJECT = {};
var ExportedServerSideRender = (0, _data.withSelect)(function (select) {
  var coreEditorSelect = select('core/editor');

  if (coreEditorSelect) {
    var currentPostId = coreEditorSelect.getCurrentPostId();

    if (currentPostId) {
      return {
        currentPostId: currentPostId
      };
    }
  }

  return EMPTY_OBJECT;
})(function (_ref) {
  var _ref$urlQueryArgs = _ref.urlQueryArgs,
      urlQueryArgs = _ref$urlQueryArgs === void 0 ? EMPTY_OBJECT : _ref$urlQueryArgs,
      currentPostId = _ref.currentPostId,
      props = (0, _objectWithoutProperties2.default)(_ref, ["urlQueryArgs", "currentPostId"]);
  var newUrlQueryArgs = (0, _element.useMemo)(function () {
    if (!currentPostId) {
      return urlQueryArgs;
    }

    return _objectSpread({
      post_id: currentPostId
    }, urlQueryArgs);
  }, [currentPostId, urlQueryArgs]);
  return (0, _element.createElement)(_serverSideRender.default, (0, _extends2.default)({
    urlQueryArgs: newUrlQueryArgs
  }, props));
});

if (window && window.wp && window.wp.components) {
  window.wp.components.ServerSideRender = (0, _element.forwardRef)(function (props, ref) {
    (0, _deprecated.default)('wp.components.ServerSideRender', {
      alternative: 'wp.serverSideRender'
    });
    return (0, _element.createElement)(ExportedServerSideRender, (0, _extends2.default)({}, props, {
      ref: ref
    }));
  });
}

var _default = ExportedServerSideRender;
exports.default = _default;
//# sourceMappingURL=index.js.map