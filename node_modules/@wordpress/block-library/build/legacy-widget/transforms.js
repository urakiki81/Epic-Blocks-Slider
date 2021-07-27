"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _blocks = require("@wordpress/blocks");

/**
 * WordPress dependencies
 */
var legacyWidgetTransforms = [{
  block: 'core/calendar',
  widget: 'WP_Widget_Calendar'
}, {
  block: 'core/search',
  widget: 'WP_Widget_Search'
}, {
  block: 'core/html',
  widget: 'WP_Widget_Custom_HTML',
  transform: function transform(_ref) {
    var content = _ref.content;
    return {
      content: content
    };
  }
}, {
  block: 'core/archives',
  widget: 'WP_Widget_Archives',
  transform: function transform(_ref2) {
    var count = _ref2.count,
        dropdown = _ref2.dropdown;
    return {
      displayAsDropdown: !!dropdown,
      showPostCounts: !!count
    };
  }
}, {
  block: 'core/latest-posts',
  widget: 'WP_Widget_Recent_Posts',
  transform: function transform(_ref3) {
    var displayPostDate = _ref3.show_date,
        number = _ref3.number;
    return {
      displayPostDate: !!displayPostDate,
      postsToShow: number
    };
  }
}, {
  block: 'core/latest-comments',
  widget: 'WP_Widget_Recent_Comments',
  transform: function transform(_ref4) {
    var number = _ref4.number;
    return {
      commentsToShow: number
    };
  }
}, {
  block: 'core/tag-cloud',
  widget: 'WP_Widget_Tag_Cloud',
  transform: function transform(_ref5) {
    var taxonomy = _ref5.taxonomy,
        count = _ref5.count;
    return {
      showTagCounts: !!count,
      taxonomy: taxonomy
    };
  }
}, {
  block: 'core/categories',
  widget: 'WP_Widget_Categories',
  transform: function transform(_ref6) {
    var count = _ref6.count,
        dropdown = _ref6.dropdown,
        hierarchical = _ref6.hierarchical;
    return {
      displayAsDropdown: !!dropdown,
      showPostCounts: !!count,
      showHierarchy: !!hierarchical
    };
  }
}, {
  block: 'core/audio',
  widget: 'WP_Widget_Media_Audio',
  transform: function transform(_ref7) {
    var url = _ref7.url,
        preload = _ref7.preload,
        loop = _ref7.loop,
        id = _ref7.attachment_id;
    return {
      src: url,
      id: id,
      preload: preload,
      loop: loop
    };
  }
}, {
  block: 'core/video',
  widget: 'WP_Widget_Media_Video',
  transform: function transform(_ref8) {
    var url = _ref8.url,
        preload = _ref8.preload,
        loop = _ref8.loop,
        id = _ref8.attachment_id;
    return {
      src: url,
      id: id,
      preload: preload,
      loop: loop
    };
  }
}, {
  block: 'core/image',
  widget: 'WP_Widget_Media_Image',
  transform: function transform(_ref9) {
    var alt = _ref9.alt,
        id = _ref9.attachment_id,
        caption = _ref9.caption,
        height = _ref9.height,
        linkClass = _ref9.link_classes,
        rel = _ref9.link_rel,
        targetBlack = _ref9.link_target_blank,
        linkDestination = _ref9.link_type,
        link = _ref9.link_url,
        sizeSlug = _ref9.size,
        url = _ref9.url,
        width = _ref9.width;
    return {
      alt: alt,
      caption: caption,
      height: height,
      id: id,
      link: link,
      linkClass: linkClass,
      linkDestination: linkDestination,
      linkTarget: targetBlack ? '_blank' : undefined,
      rel: rel,
      sizeSlug: sizeSlug,
      url: url,
      width: width
    };
  }
}, {
  block: 'core/gallery',
  widget: 'WP_Widget_Media_Gallery',
  transform: function transform(_ref10) {
    var ids = _ref10.ids,
        linkTo = _ref10.link_type,
        size = _ref10.size,
        number = _ref10.number;
    return {
      ids: ids,
      columns: number,
      linkTo: linkTo,
      sizeSlug: size,
      images: ids.map(function (id) {
        return {
          id: id
        };
      })
    };
  }
}, {
  block: 'core/rss',
  widget: 'WP_Widget_RSS',
  transform: function transform(_ref11) {
    var url = _ref11.url,
        displayAuthor = _ref11.show_author,
        displayDate = _ref11.show_date,
        displayExcerpt = _ref11.show_summary,
        items = _ref11.items;
    return {
      feedURL: url,
      displayAuthor: !!displayAuthor,
      displayDate: !!displayDate,
      displayExcerpt: !!displayExcerpt,
      itemsToShow: items
    };
  }
}].map(function (_ref12) {
  var block = _ref12.block,
      widget = _ref12.widget,
      _transform = _ref12.transform;
  return {
    type: 'block',
    blocks: [block],
    isMatch: function isMatch(_ref13) {
      var widgetClass = _ref13.widgetClass;
      return widgetClass === widget;
    },
    transform: function transform(_ref14) {
      var instance = _ref14.instance;
      var transformedBlock = (0, _blocks.createBlock)(block, _transform ? _transform(instance) : undefined);

      if (!instance || !instance.title) {
        return transformedBlock;
      }

      return [(0, _blocks.createBlock)('core/heading', {
        content: instance.title
      }), transformedBlock];
    }
  };
});
var transforms = {
  to: legacyWidgetTransforms
};
var _default = transforms;
exports.default = _default;
//# sourceMappingURL=transforms.js.map