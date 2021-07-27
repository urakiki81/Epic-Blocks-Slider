import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import { createElement } from "@wordpress/element";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * WordPress dependencies
 */
import { useMemo, forwardRef } from '@wordpress/element';
import { withSelect } from '@wordpress/data';
import deprecated from '@wordpress/deprecated';
/**
 * Internal dependencies
 */

import ServerSideRender from './server-side-render';
/**
 * Constants
 */

var EMPTY_OBJECT = {};
var ExportedServerSideRender = withSelect(function (select) {
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
      props = _objectWithoutProperties(_ref, ["urlQueryArgs", "currentPostId"]);

  var newUrlQueryArgs = useMemo(function () {
    if (!currentPostId) {
      return urlQueryArgs;
    }

    return _objectSpread({
      post_id: currentPostId
    }, urlQueryArgs);
  }, [currentPostId, urlQueryArgs]);
  return createElement(ServerSideRender, _extends({
    urlQueryArgs: newUrlQueryArgs
  }, props));
});

if (window && window.wp && window.wp.components) {
  window.wp.components.ServerSideRender = forwardRef(function (props, ref) {
    deprecated('wp.components.ServerSideRender', {
      alternative: 'wp.serverSideRender'
    });
    return createElement(ExportedServerSideRender, _extends({}, props, {
      ref: ref
    }));
  });
}

export default ExportedServerSideRender;
//# sourceMappingURL=index.js.map