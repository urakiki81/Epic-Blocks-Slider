import { createElement } from "@wordpress/element";

/**
 * Internal dependencies
 */
import { escape } from './utils';
export default function save(_ref) {
  var attributes = _ref.attributes;
  return createElement("pre", null, createElement("code", null, escape(attributes.content)));
}
//# sourceMappingURL=save.js.map