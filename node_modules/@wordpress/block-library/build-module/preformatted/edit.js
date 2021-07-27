import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { RichText, __experimentalBlock as Block } from '@wordpress/block-editor';
export default function PreformattedEdit(_ref) {
  var attributes = _ref.attributes,
      mergeBlocks = _ref.mergeBlocks,
      setAttributes = _ref.setAttributes,
      className = _ref.className,
      style = _ref.style;
  var content = attributes.content;
  return createElement(RichText, {
    tagName: Block.pre,
    identifier: "content",
    preserveWhiteSpace: true,
    value: content,
    onChange: function onChange(nextContent) {
      setAttributes({
        content: nextContent
      });
    },
    placeholder: __('Write preformatted text…'),
    className: className,
    style: style,
    onMerge: mergeBlocks
  });
}
//# sourceMappingURL=edit.js.map