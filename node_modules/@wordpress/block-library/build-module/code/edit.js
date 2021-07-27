import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
/**
 * Internal dependencies
 */

import { PlainText, __experimentalBlock as Block } from '@wordpress/block-editor';
export default function CodeEdit(_ref) {
  var attributes = _ref.attributes,
      setAttributes = _ref.setAttributes;
  return createElement(Block.pre, null, createElement(PlainText, {
    __experimentalVersion: 2,
    tagName: "code",
    value: attributes.content,
    onChange: function onChange(content) {
      return setAttributes({
        content: content
      });
    },
    placeholder: __('Write code…'),
    "aria-label": __('Code')
  }));
}
//# sourceMappingURL=edit.js.map