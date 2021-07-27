import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import { createElement } from "@wordpress/element";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * External dependencies
 */
import { pickBy, mapValues, isEmpty, mapKeys } from 'lodash';
/**
 * WordPress dependencies
 */

import { select as globalSelect, useSelect } from '@wordpress/data';
import { useEntityProp } from '@wordpress/core-data';
import { useMemo } from '@wordpress/element';
import { createHigherOrderComponent } from '@wordpress/compose';
import { addFilter } from '@wordpress/hooks';
/** @typedef {import('@wordpress/compose').WPHigherOrderComponent} WPHigherOrderComponent */

/** @typedef {import('@wordpress/blocks').WPBlockSettings} WPBlockSettings */

/**
 * Object whose keys are the names of block attributes, where each value
 * represents the meta key to which the block attribute is intended to save.
 *
 * @see https://developer.wordpress.org/reference/functions/register_meta/
 *
 * @typedef {Object<string,string>} WPMetaAttributeMapping
 */

/**
 * Given a mapping of attribute names (meta source attributes) to their
 * associated meta key, returns a higher order component that overrides its
 * `attributes` and `setAttributes` props to sync any changes with the edited
 * post's meta keys.
 *
 * @param {WPMetaAttributeMapping} metaAttributes Meta attribute mapping.
 *
 * @return {WPHigherOrderComponent} Higher-order component.
 */

var createWithMetaAttributeSource = function createWithMetaAttributeSource(metaAttributes) {
  return createHigherOrderComponent(function (BlockEdit) {
    return function (_ref) {
      var attributes = _ref.attributes,
          _setAttributes = _ref.setAttributes,
          props = _objectWithoutProperties(_ref, ["attributes", "setAttributes"]);

      var postType = useSelect(function (select) {
        return select('core/editor').getCurrentPostType();
      }, []);

      var _useEntityProp = useEntityProp('postType', postType, 'meta'),
          _useEntityProp2 = _slicedToArray(_useEntityProp, 2),
          meta = _useEntityProp2[0],
          setMeta = _useEntityProp2[1];

      var mergedAttributes = useMemo(function () {
        return _objectSpread({}, attributes, {}, mapValues(metaAttributes, function (metaKey) {
          return meta[metaKey];
        }));
      }, [attributes, meta]);
      return createElement(BlockEdit, _extends({
        attributes: mergedAttributes,
        setAttributes: function setAttributes(nextAttributes) {
          var nextMeta = mapKeys( // Filter to intersection of keys between the updated
          // attributes and those with an associated meta key.
          pickBy(nextAttributes, function (value, key) {
            return metaAttributes[key];
          }), // Rename the keys to the expected meta key name.
          function (value, attributeKey) {
            return metaAttributes[attributeKey];
          });

          if (!isEmpty(nextMeta)) {
            setMeta(nextMeta);
          }

          _setAttributes(nextAttributes);
        }
      }, props));
    };
  }, 'withMetaAttributeSource');
};
/**
 * Filters a registered block's settings to enhance a block's `edit` component
 * to upgrade meta-sourced attributes to use the post's meta entity property.
 *
 * @param {WPBlockSettings} settings Registered block settings.
 *
 * @return {WPBlockSettings} Filtered block settings.
 */


function shimAttributeSource(settings) {
  /** @type {WPMetaAttributeMapping} */
  var metaAttributes = mapValues(pickBy(settings.attributes, {
    source: 'meta'
  }), 'meta');

  if (!isEmpty(metaAttributes)) {
    settings.edit = createWithMetaAttributeSource(metaAttributes)(settings.edit);
  }

  return settings;
}

addFilter('blocks.registerBlockType', 'core/editor/custom-sources-backwards-compatibility/shim-attribute-source', shimAttributeSource); // The above filter will only capture blocks registered after the filter was
// added. There may already be blocks registered by this point, and those must
// be updated to apply the shim.
//
// The following implementation achieves this, albeit with a couple caveats:
// - Only blocks registered on the global store will be modified.
// - The block settings are directly mutated, since there is currently no
//   mechanism to update an existing block registration. This is the reason for
//   `getBlockType` separate from `getBlockTypes`, since the latter returns a
//   _copy_ of the block registration (i.e. the mutation would not affect the
//   actual registered block settings).
//
// `getBlockTypes` or `getBlockType` implementation could change in the future
// in regards to creating settings clones, but the corresponding end-to-end
// tests for meta blocks should cover against any potential regressions.
//
// In the future, we could support updating block settings, at which point this
// implementation could use that mechanism instead.

globalSelect('core/blocks').getBlockTypes().map(function (_ref2) {
  var name = _ref2.name;
  return globalSelect('core/blocks').getBlockType(name);
}).forEach(shimAttributeSource);
//# sourceMappingURL=custom-sources-backwards-compatibility.js.map