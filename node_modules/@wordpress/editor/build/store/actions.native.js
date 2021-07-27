"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  togglePostTitleSelection: true,
  autosave: true,
  updateClipboard: true,
  createInfoNotice: true,
  removeAllNotices: true,
  removeNotice: true
};
exports.togglePostTitleSelection = togglePostTitleSelection;
exports.autosave = autosave;
exports.updateClipboard = updateClipboard;
exports.createInfoNotice = createInfoNotice;
exports.removeAllNotices = removeAllNotices;
exports.removeNotice = removeNotice;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _uuid = require("uuid");

var _reactNativeBridge = _interopRequireDefault(require("@wordpress/react-native-bridge"));

var _actions = require("./actions.js");

Object.keys(_actions).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _actions[key];
    }
  });
});

var _marked = /*#__PURE__*/_regenerator.default.mark(autosave);

/**
 * Returns an action object that enables or disables post title selection.
 *
 * @param {boolean} [isSelected=true] Whether post title is currently selected.
 *
 * @return {Object} Action object.
 */
function togglePostTitleSelection() {
  var isSelected = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  return {
    type: 'TOGGLE_POST_TITLE_SELECTION',
    isSelected: isSelected
  };
}
/**
 * Action generator used in signalling that the post should autosave.
 */


function autosave() {
  return _regenerator.default.wrap(function autosave$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _reactNativeBridge.default.editorDidAutosave();

        case 1:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}
/**
 * Returns an action object to set the clipboard data.
 *
 * @param {Object} clipboard Stored clipboard data.
 *
 * @return {Object} Action object.
 */


function updateClipboard(clipboard) {
  return {
    type: 'UPDATE_CLIPBOARD',
    clipboard: clipboard
  };
}
/**
 * Returns an action object to create an info notice.
 *
 * @param {Object} message The displayed message of the notice.
 *
 * @return {Object} Action object.
 */


function createInfoNotice(message) {
  var notice = {
    status: 'info',
    content: message,
    id: (0, _uuid.v4)()
  };
  return {
    type: 'CREATE_NOTICE',
    notice: notice
  };
}
/**
 * Returns an action object to remove all notices.
 *
 * @return {Object} Action object.
 */


function removeAllNotices() {
  return {
    type: 'REMOVE_ALL_NOTICES'
  };
}
/**
 * Returns an action object to remove a notice by id.
 *
 * @param {Object} id The id of the notice to remove.
 *
 * @return {Object} Action object.
 */


function removeNotice(id) {
  return {
    type: 'REMOVE_NOTICE',
    id: id
  };
}
//# sourceMappingURL=actions.native.js.map