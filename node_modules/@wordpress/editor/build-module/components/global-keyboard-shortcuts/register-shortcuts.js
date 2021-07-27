import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { useEffect } from '@wordpress/element';
import { useDispatch } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { BlockEditorKeyboardShortcuts } from '@wordpress/block-editor';

function EditorKeyboardShortcutsRegister() {
  // Registering the shortcuts
  var _useDispatch = useDispatch('core/keyboard-shortcuts'),
      registerShortcut = _useDispatch.registerShortcut;

  useEffect(function () {
    registerShortcut({
      name: 'core/editor/save',
      category: 'global',
      description: __('Save your changes.'),
      keyCombination: {
        modifier: 'primary',
        character: 's'
      }
    });
    registerShortcut({
      name: 'core/editor/undo',
      category: 'global',
      description: __('Undo your last changes.'),
      keyCombination: {
        modifier: 'primary',
        character: 'z'
      }
    });
    registerShortcut({
      name: 'core/editor/redo',
      category: 'global',
      description: __('Redo your last undo.'),
      keyCombination: {
        modifier: 'primaryShift',
        character: 'z'
      }
    });
  }, [registerShortcut]);
  return createElement(BlockEditorKeyboardShortcuts.Register, null);
}

export default EditorKeyboardShortcutsRegister;
//# sourceMappingURL=register-shortcuts.js.map