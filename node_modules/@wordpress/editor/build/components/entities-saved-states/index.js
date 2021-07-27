"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = EntitiesSavedStates;

var _element = require("@wordpress/element");

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _lodash = require("lodash");

var _components = require("@wordpress/components");

var _i18n = require("@wordpress/i18n");

var _data = require("@wordpress/data");

var _icons = require("@wordpress/icons");

var _entityTypeList = _interopRequireDefault(require("./entity-type-list"));

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var ENTITY_NAMES = {
  wp_template_part: function wp_template_part(number) {
    return (0, _i18n._n)('template part', 'template parts', number);
  },
  wp_template: function wp_template(number) {
    return (0, _i18n._n)('template', 'templates', number);
  },
  post: function post(number) {
    return (0, _i18n._n)('post', 'posts', number);
  },
  page: function page(number) {
    return (0, _i18n._n)('page', 'pages', number);
  },
  site: function site(number) {
    return (0, _i18n._n)('site', 'sites', number);
  }
};
var PLACEHOLDER_PHRASES = {
  // 0 is a back up, but should never be observed.
  0: (0, _i18n.__)('There are no changes.'),

  /* translators: placeholders represent pre-translated singular/plural entity names (page, post, template, site, etc.) */
  1: (0, _i18n.__)('Changes have been made to your %s.'),

  /* translators: placeholders represent pre-translated singular/plural entity names (page, post, template, site, etc.) */
  2: (0, _i18n.__)('Changes have been made to your %1$s and %2$s.'),

  /* translators: placeholders represent pre-translated singular/plural entity names (page, post, template, site, etc.) */
  3: (0, _i18n.__)('Changes have been made to your %1$s, %2$s, and %3$s.'),

  /* translators: placeholders represent pre-translated singular/plural entity names (page, post, template, site, etc.) */
  4: (0, _i18n.__)('Changes have been made to your %1$s, %2$s, %3$s, and %4$s.'),

  /* translators: placeholders represent pre-translated singular/plural entity names (page, post, template, site, etc.) */
  5: (0, _i18n.__)('Changes have been made to your %1$s, %2$s, %3$s, %4$s, and %5$s.')
};

function EntitiesSavedStates(_ref) {
  var isOpen = _ref.isOpen,
      close = _ref.close;

  var _useSelect = (0, _data.useSelect)(function (select) {
    return {
      dirtyEntityRecords: select('core').__experimentalGetDirtyEntityRecords()
    };
  }, []),
      dirtyEntityRecords = _useSelect.dirtyEntityRecords;

  var _useDispatch = (0, _data.useDispatch)('core'),
      saveEditedEntityRecord = _useDispatch.saveEditedEntityRecord; // To group entities by type.


  var partitionedSavables = Object.values((0, _lodash.groupBy)(dirtyEntityRecords, 'name')); // Get labels for text-prompt phrase.

  var entityNamesForPrompt = [];
  partitionedSavables.forEach(function (list) {
    if (ENTITY_NAMES[list[0].name]) {
      entityNamesForPrompt.push(ENTITY_NAMES[list[0].name](list.length));
    }
  }); // Get text-prompt phrase based on number of entity types changed.

  var placeholderPhrase = PLACEHOLDER_PHRASES[entityNamesForPrompt.length] || // Fallback for edge case that should not be observed (more than 5 entity types edited).
  (0, _i18n.__)('Changes have been made to multiple entity types.'); // eslint-disable-next-line @wordpress/valid-sprintf

  var promptPhrase = _i18n.sprintf.apply(void 0, [placeholderPhrase].concat(entityNamesForPrompt)); // Unchecked entities to be ignored by save function.


  var _useState = (0, _element.useState)([]),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      unselectedEntities = _useState2[0],
      _setUnselectedEntities = _useState2[1];

  var setUnselectedEntities = function setUnselectedEntities(_ref2, checked) {
    var kind = _ref2.kind,
        name = _ref2.name,
        key = _ref2.key;

    if (checked) {
      _setUnselectedEntities(unselectedEntities.filter(function (elt) {
        return elt.kind !== kind || elt.name !== name || elt.key !== key;
      }));
    } else {
      _setUnselectedEntities([].concat((0, _toConsumableArray2.default)(unselectedEntities), [{
        kind: kind,
        name: name,
        key: key
      }]));
    }
  };

  var saveCheckedEntities = function saveCheckedEntities() {
    var entitiesToSave = dirtyEntityRecords.filter(function (_ref3) {
      var kind = _ref3.kind,
          name = _ref3.name,
          key = _ref3.key;
      return !(0, _lodash.some)(unselectedEntities, function (elt) {
        return elt.kind === kind && elt.name === name && elt.key === key;
      });
    });
    close(entitiesToSave);
    entitiesToSave.forEach(function (_ref4) {
      var kind = _ref4.kind,
          name = _ref4.name,
          key = _ref4.key;
      saveEditedEntityRecord(kind, name, key);
    });
  };

  var _useState3 = (0, _element.useState)(false),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      isReviewing = _useState4[0],
      setIsReviewing = _useState4[1];

  var toggleIsReviewing = function toggleIsReviewing() {
    return setIsReviewing(function (value) {
      return !value;
    });
  }; // Explicitly define this with no argument passed.  Using `close` on
  // its own will use the event object in place of the expected saved entities.


  var dismissPanel = (0, _element.useCallback)(function () {
    return close();
  }, [close]);
  return isOpen ? (0, _element.createElement)("div", {
    className: "entities-saved-states__panel"
  }, (0, _element.createElement)("div", {
    className: "entities-saved-states__panel-header"
  }, (0, _element.createElement)(_components.Button, {
    isPrimary: true,
    disabled: dirtyEntityRecords.length - unselectedEntities.length === 0,
    onClick: saveCheckedEntities,
    className: "editor-entities-saved-states__save-button"
  }, (0, _i18n.__)('Save')), (0, _element.createElement)(_components.Button, {
    onClick: dismissPanel,
    icon: _icons.close,
    label: (0, _i18n.__)('Close panel')
  })), (0, _element.createElement)("div", {
    className: "entities-saved-states__text-prompt"
  }, (0, _element.createElement)("strong", null, (0, _i18n.__)('Are you ready to save?')), (0, _element.createElement)("p", null, promptPhrase), (0, _element.createElement)("p", null, (0, _element.createElement)(_components.Button, {
    onClick: toggleIsReviewing,
    isLink: true,
    className: "entities-saved-states__review-changes-button"
  }, isReviewing ? (0, _i18n.__)('Hide changes.') : (0, _i18n.__)('Review changes.')))), isReviewing && partitionedSavables.map(function (list) {
    return (0, _element.createElement)(_entityTypeList.default, {
      key: list[0].name,
      list: list,
      closePanel: dismissPanel,
      unselectedEntities: unselectedEntities,
      setUnselectedEntities: setUnselectedEntities
    });
  })) : null;
}
//# sourceMappingURL=index.js.map