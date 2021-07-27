"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = EntityRecordItem;

var _element = require("@wordpress/element");

var _components = require("@wordpress/components");

var _i18n = require("@wordpress/i18n");

var _data = require("@wordpress/data");

/**
 * WordPress dependencies
 */
function EntityRecordItem(_ref) {
  var record = _ref.record,
      checked = _ref.checked,
      onChange = _ref.onChange,
      closePanel = _ref.closePanel;
  var name = record.name,
      kind = record.kind,
      title = record.title,
      key = record.key;
  var parentBlockId = (0, _data.useSelect)(function (select) {
    var _blocks$;

    // Get entity's blocks.
    var _select$getEditedEnti = select('core').getEditedEntityRecord(kind, name, key),
        _select$getEditedEnti2 = _select$getEditedEnti.blocks,
        blocks = _select$getEditedEnti2 === void 0 ? [] : _select$getEditedEnti2; // Get parents of the entity's first block.


    var parents = select('core/block-editor').getBlockParents((_blocks$ = blocks[0]) === null || _blocks$ === void 0 ? void 0 : _blocks$.clientId); // Return closest parent block's clientId.

    return parents[parents.length - 1];
  }, []);
  var isSelected = (0, _data.useSelect)(function (select) {
    var selectedBlockId = select('core/block-editor').getSelectedBlockClientId();
    return selectedBlockId === parentBlockId;
  }, [parentBlockId]);
  var isSelectedText = isSelected ? (0, _i18n.__)('Selected') : (0, _i18n.__)('Select');

  var _useDispatch = (0, _data.useDispatch)('core/block-editor'),
      selectBlock = _useDispatch.selectBlock;

  var selectParentBlock = (0, _element.useCallback)(function () {
    return selectBlock(parentBlockId);
  }, [parentBlockId]);
  var selectAndDismiss = (0, _element.useCallback)(function () {
    selectBlock(parentBlockId);
    closePanel();
  }, [parentBlockId]);
  return (0, _element.createElement)(_components.PanelRow, null, (0, _element.createElement)(_components.CheckboxControl, {
    label: (0, _element.createElement)("strong", null, title || (0, _i18n.__)('Untitled')),
    checked: checked,
    onChange: onChange
  }), parentBlockId ? (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(_components.Button, {
    onClick: selectParentBlock,
    className: "entities-saved-states__find-entity",
    disabled: isSelected
  }, isSelectedText), (0, _element.createElement)(_components.Button, {
    onClick: selectAndDismiss,
    className: "entities-saved-states__find-entity-small",
    disabled: isSelected
  }, isSelectedText)) : null);
}
//# sourceMappingURL=entity-record-item.js.map