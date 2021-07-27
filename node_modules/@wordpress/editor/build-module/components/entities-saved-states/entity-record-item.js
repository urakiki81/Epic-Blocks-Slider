import { createElement, Fragment } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { CheckboxControl, Button, PanelRow } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useSelect, useDispatch } from '@wordpress/data';
import { useCallback } from '@wordpress/element';
export default function EntityRecordItem(_ref) {
  var record = _ref.record,
      checked = _ref.checked,
      onChange = _ref.onChange,
      closePanel = _ref.closePanel;
  var name = record.name,
      kind = record.kind,
      title = record.title,
      key = record.key;
  var parentBlockId = useSelect(function (select) {
    var _blocks$;

    // Get entity's blocks.
    var _select$getEditedEnti = select('core').getEditedEntityRecord(kind, name, key),
        _select$getEditedEnti2 = _select$getEditedEnti.blocks,
        blocks = _select$getEditedEnti2 === void 0 ? [] : _select$getEditedEnti2; // Get parents of the entity's first block.


    var parents = select('core/block-editor').getBlockParents((_blocks$ = blocks[0]) === null || _blocks$ === void 0 ? void 0 : _blocks$.clientId); // Return closest parent block's clientId.

    return parents[parents.length - 1];
  }, []);
  var isSelected = useSelect(function (select) {
    var selectedBlockId = select('core/block-editor').getSelectedBlockClientId();
    return selectedBlockId === parentBlockId;
  }, [parentBlockId]);
  var isSelectedText = isSelected ? __('Selected') : __('Select');

  var _useDispatch = useDispatch('core/block-editor'),
      selectBlock = _useDispatch.selectBlock;

  var selectParentBlock = useCallback(function () {
    return selectBlock(parentBlockId);
  }, [parentBlockId]);
  var selectAndDismiss = useCallback(function () {
    selectBlock(parentBlockId);
    closePanel();
  }, [parentBlockId]);
  return createElement(PanelRow, null, createElement(CheckboxControl, {
    label: createElement("strong", null, title || __('Untitled')),
    checked: checked,
    onChange: onChange
  }), parentBlockId ? createElement(Fragment, null, createElement(Button, {
    onClick: selectParentBlock,
    className: "entities-saved-states__find-entity",
    disabled: isSelected
  }, isSelectedText), createElement(Button, {
    onClick: selectAndDismiss,
    className: "entities-saved-states__find-entity-small",
    disabled: isSelected
  }, isSelectedText)) : null);
}
//# sourceMappingURL=entity-record-item.js.map