import _regeneratorRuntime from "@babel/runtime/regenerator";

/**
 * WordPress dependencies
 */
import { select } from '@wordpress/data-controls';
/**
 * Higher-order function which invokes the given resolver only if it has not
 * already been resolved with the arguments passed to the enhanced function.
 *
 * This only considers resolution state, and notably does not support resolver
 * custom `isFulfilled` behavior.
 *
 * @param {Function} resolver     Original resolver.
 * @param {string}   selectorName Selector name associated with resolver.
 *
 * @return {Function} Enhanced resolver.
 */

var ifNotResolved = function ifNotResolved(resolver, selectorName) {
  return (
    /*#__PURE__*/

    /**
     * @param {...any} args Original resolver arguments.
     */
    _regeneratorRuntime.mark(function resolveIfNotResolved() {
      var _len,
          args,
          _key,
          hasStartedResolution,
          _args = arguments;

      return _regeneratorRuntime.wrap(function resolveIfNotResolved$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              for (_len = _args.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = _args[_key];
              }

              _context.next = 3;
              return select('core', 'hasStartedResolution', selectorName, args);

            case 3:
              hasStartedResolution = _context.sent;

              if (hasStartedResolution) {
                _context.next = 6;
                break;
              }

              return _context.delegateYield(resolver.apply(void 0, args), "t0", 6);

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, resolveIfNotResolved);
    })
  );
};

export default ifNotResolved;
//# sourceMappingURL=if-not-resolved.js.map