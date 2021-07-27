"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _data = require("@wordpress/data");

var _i18n = require("@wordpress/i18n");

var _blockEditor = require("@wordpress/block-editor");

/**
 * WordPress dependencies
 */
function EditorKeyboardShortcutsRegister() {
  // Registering the shortcuts
  var _useDispatch = (0, _data.useDispatch)('core/keyboard-shortcuts'),
      registerShortcut = _useDispatch.registerShortcut;

  (0, _element.useEffect)(function () {
    registerShortcut({
      name: 'core/editor/save',
      category: 'global',
      description: (0, _i18n.__)('Save your changes.'),
      keyCombination: {
        modifier: 'primary',
        character: 's'
      }
    });
    registerShortcut({
      name: 'core/editor/undo',
      category: 'global',
      description: (0, _i18n.__)('Undo your last changes.'),
      keyCombination: {
        modifier: 'primary',
        character: 'z'
      }
    });
    registerShortcut({
      name: 'core/editor/redo',
      category: 'global',
      description: (0, _i18n.__)('Redo your last undo.'),
      keyCombination: {
        modifier: 'primaryShift',
        character: 'z'
      }
    });
  }, [registerShortcut]);
  return (0, _element.createElement)(_blockEditor.BlockEditorKeyboardShortcuts.Register, null);
}

var _default = EditorKeyboardShortcutsRegister;
exports.default = _default;
//# sourceMappingURL=register-shortcuts.js.map