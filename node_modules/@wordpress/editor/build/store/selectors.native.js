"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  isPostTitleSelected: true,
  isEditedPostAutosaveable: true,
  getClipboard: true,
  getNotices: true
};
exports.isPostTitleSelected = isPostTitleSelected;
exports.getClipboard = getClipboard;
exports.getNotices = getNotices;
exports.isEditedPostAutosaveable = void 0;

var _data = require("@wordpress/data");

var _selectors = require("./selectors.js");

Object.keys(_selectors).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _selectors[key];
    }
  });
});

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */

/**
 * Returns true if post title is selected.
 *
 * @param {Object} state Global application state.
 *
 * @return {boolean} Whether current post title is selected.
 */
function isPostTitleSelected(state) {
  return state.postTitle.isSelected;
}
/**
 * Returns true if the post can be autosaved, or false otherwise.
 *
 * @param {Object} state    Global application state.
 * @param {Object} autosave A raw autosave object from the REST API.
 *
 * @return {boolean} Whether the post can be autosaved.
 */


var isEditedPostAutosaveable = (0, _data.createRegistrySelector)(function () {
  return function (state) {
    // A post must contain a title, an excerpt, or non-empty content to be valid for autosaving.
    if (!(0, _selectors.isEditedPostSaveable)(state)) {
      return false;
    } // To avoid an expensive content serialization, use the content dirtiness
    // flag in place of content field comparison against the known autosave.
    // This is not strictly accurate, and relies on a tolerance toward autosave
    // request failures for unnecessary saves.


    if ((0, _selectors.hasChangedContent)(state)) {
      return true;
    }

    if ((0, _selectors.isEditedPostDirty)(state)) {
      return true;
    }

    return false;
  };
});
/**
 * Returns the current clipboard data.
 *
 * @param {Object} state Global application state.
 *
 * @return {Object} Current clipboard data.
 */

exports.isEditedPostAutosaveable = isEditedPostAutosaveable;

function getClipboard(state) {
  return state.clipboard;
}
/**
 * Returns the current notice data.
 *
 * @param {Object} state Global application state.
 *
 * @return {Object} Current notice data.
 */


function getNotices(state) {
  return state.notices;
}
//# sourceMappingURL=selectors.native.js.map