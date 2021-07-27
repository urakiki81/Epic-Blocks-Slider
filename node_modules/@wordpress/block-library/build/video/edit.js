"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _blob = require("@wordpress/blob");

var _components = require("@wordpress/components");

var _blockEditor = require("@wordpress/block-editor");

var _i18n = require("@wordpress/i18n");

var _compose = require("@wordpress/compose");

var _data = require("@wordpress/data");

var _icons = require("@wordpress/icons");

var _blocks = require("@wordpress/blocks");

var _util = require("../embed/util");

var _editCommonSettings = _interopRequireDefault(require("./edit-common-settings"));

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var ALLOWED_MEDIA_TYPES = ['video'];
var VIDEO_POSTER_ALLOWED_MEDIA_TYPES = ['image'];

var VideoEdit = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(VideoEdit, _Component);

  var _super = _createSuper(VideoEdit);

  function VideoEdit() {
    var _this;

    (0, _classCallCheck2.default)(this, VideoEdit);
    _this = _super.apply(this, arguments);
    _this.videoPlayer = (0, _element.createRef)();
    _this.posterImageButton = (0, _element.createRef)();
    _this.onSelectURL = _this.onSelectURL.bind((0, _assertThisInitialized2.default)(_this));
    _this.onSelectPoster = _this.onSelectPoster.bind((0, _assertThisInitialized2.default)(_this));
    _this.onRemovePoster = _this.onRemovePoster.bind((0, _assertThisInitialized2.default)(_this));
    _this.onUploadError = _this.onUploadError.bind((0, _assertThisInitialized2.default)(_this));
    return _this;
  }

  (0, _createClass2.default)(VideoEdit, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props = this.props,
          attributes = _this$props.attributes,
          mediaUpload = _this$props.mediaUpload,
          noticeOperations = _this$props.noticeOperations,
          setAttributes = _this$props.setAttributes;
      var id = attributes.id,
          _attributes$src = attributes.src,
          src = _attributes$src === void 0 ? '' : _attributes$src;

      if (!id && (0, _blob.isBlobURL)(src)) {
        var file = (0, _blob.getBlobByURL)(src);

        if (file) {
          mediaUpload({
            filesList: [file],
            onFileChange: function onFileChange(_ref) {
              var _ref2 = (0, _slicedToArray2.default)(_ref, 1),
                  url = _ref2[0].url;

              setAttributes({
                src: url
              });
            },
            onError: function onError(message) {
              noticeOperations.createErrorNotice(message);
            },
            allowedTypes: ALLOWED_MEDIA_TYPES
          });
        }
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (this.props.attributes.poster !== prevProps.attributes.poster) {
        this.videoPlayer.current.load();
      }
    }
  }, {
    key: "onSelectURL",
    value: function onSelectURL(newSrc) {
      var _this$props2 = this.props,
          attributes = _this$props2.attributes,
          setAttributes = _this$props2.setAttributes;
      var src = attributes.src;

      if (newSrc !== src) {
        // Check if there's an embed block that handles this URL.
        var embedBlock = (0, _util.createUpgradedEmbedBlock)({
          attributes: {
            url: newSrc
          }
        });

        if (undefined !== embedBlock) {
          this.props.onReplace(embedBlock);
          return;
        }

        setAttributes({
          src: newSrc,
          id: undefined
        });
      }
    }
  }, {
    key: "onSelectPoster",
    value: function onSelectPoster(image) {
      var setAttributes = this.props.setAttributes;
      setAttributes({
        poster: image.url
      });
    }
  }, {
    key: "onRemovePoster",
    value: function onRemovePoster() {
      var setAttributes = this.props.setAttributes;
      setAttributes({
        poster: ''
      }); // Move focus back to the Media Upload button.

      this.posterImageButton.current.focus();
    }
  }, {
    key: "onUploadError",
    value: function onUploadError(message) {
      var noticeOperations = this.props.noticeOperations;
      noticeOperations.removeAllNotices();
      noticeOperations.createErrorNotice(message);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props$attribute = this.props.attributes,
          id = _this$props$attribute.id,
          caption = _this$props$attribute.caption,
          controls = _this$props$attribute.controls,
          poster = _this$props$attribute.poster,
          src = _this$props$attribute.src;
      var _this$props3 = this.props,
          instanceId = _this$props3.instanceId,
          isSelected = _this$props3.isSelected,
          noticeUI = _this$props3.noticeUI,
          attributes = _this$props3.attributes,
          setAttributes = _this$props3.setAttributes,
          insertBlocksAfter = _this$props3.insertBlocksAfter;

      var onSelectVideo = function onSelectVideo(media) {
        if (!media || !media.url) {
          // in this case there was an error
          // previous attributes should be removed
          // because they may be temporary blob urls
          setAttributes({
            src: undefined,
            id: undefined
          });
          return;
        } // sets the block's attribute and updates the edit component from the
        // selected media


        setAttributes({
          src: media.url,
          id: media.id
        });
      };

      if (!src) {
        return (0, _element.createElement)(_blockEditor.__experimentalBlock.div, null, (0, _element.createElement)(_blockEditor.MediaPlaceholder, {
          icon: (0, _element.createElement)(_blockEditor.BlockIcon, {
            icon: _icons.video
          }),
          onSelect: onSelectVideo,
          onSelectURL: this.onSelectURL,
          accept: "video/*",
          allowedTypes: ALLOWED_MEDIA_TYPES,
          value: this.props.attributes,
          notices: noticeUI,
          onError: this.onUploadError
        }));
      }

      var videoPosterDescription = "video-block__poster-image-description-".concat(instanceId);
      return (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(_blockEditor.BlockControls, null, (0, _element.createElement)(_blockEditor.MediaReplaceFlow, {
        mediaId: id,
        mediaURL: src,
        allowedTypes: ALLOWED_MEDIA_TYPES,
        accept: "video/*",
        onSelect: onSelectVideo,
        onSelectURL: this.onSelectURL,
        onError: this.onUploadError
      })), (0, _element.createElement)(_blockEditor.InspectorControls, null, (0, _element.createElement)(_components.PanelBody, {
        title: (0, _i18n.__)('Video settings')
      }, (0, _element.createElement)(_editCommonSettings.default, {
        setAttributes: setAttributes,
        attributes: attributes
      }), (0, _element.createElement)(_blockEditor.MediaUploadCheck, null, (0, _element.createElement)(_components.BaseControl, {
        className: "editor-video-poster-control"
      }, (0, _element.createElement)(_components.BaseControl.VisualLabel, null, (0, _i18n.__)('Poster image')), (0, _element.createElement)(_blockEditor.MediaUpload, {
        title: (0, _i18n.__)('Select poster image'),
        onSelect: this.onSelectPoster,
        allowedTypes: VIDEO_POSTER_ALLOWED_MEDIA_TYPES,
        render: function render(_ref3) {
          var open = _ref3.open;
          return (0, _element.createElement)(_components.Button, {
            isPrimary: true,
            onClick: open,
            ref: _this2.posterImageButton,
            "aria-describedby": videoPosterDescription
          }, !_this2.props.attributes.poster ? (0, _i18n.__)('Select') : (0, _i18n.__)('Replace'));
        }
      }), (0, _element.createElement)("p", {
        id: videoPosterDescription,
        hidden: true
      }, this.props.attributes.poster ? (0, _i18n.sprintf)(
      /* translators: %s: poster image URL. */
      (0, _i18n.__)('The current poster image url is %s'), this.props.attributes.poster) : (0, _i18n.__)('There is no poster image currently selected')), !!this.props.attributes.poster && (0, _element.createElement)(_components.Button, {
        onClick: this.onRemovePoster,
        isTertiary: true
      }, (0, _i18n.__)('Remove')))))), (0, _element.createElement)(_blockEditor.__experimentalBlock.figure, null, (0, _element.createElement)(_components.Disabled, null, (0, _element.createElement)("video", {
        controls: controls,
        poster: poster,
        src: src,
        ref: this.videoPlayer
      })), (!_blockEditor.RichText.isEmpty(caption) || isSelected) && (0, _element.createElement)(_blockEditor.RichText, {
        tagName: "figcaption",
        placeholder: (0, _i18n.__)('Write caption…'),
        value: caption,
        onChange: function onChange(value) {
          return setAttributes({
            caption: value
          });
        },
        inlineToolbar: true,
        __unstableOnSplitAtEnd: function __unstableOnSplitAtEnd() {
          return insertBlocksAfter((0, _blocks.createBlock)('core/paragraph'));
        }
      })));
    }
  }]);
  return VideoEdit;
}(_element.Component);

var _default = (0, _compose.compose)([(0, _data.withSelect)(function (select) {
  var _select = select('core/block-editor'),
      getSettings = _select.getSettings;

  var _getSettings = getSettings(),
      mediaUpload = _getSettings.mediaUpload;

  return {
    mediaUpload: mediaUpload
  };
}), _components.withNotices, _compose.withInstanceId])(VideoEdit);

exports.default = _default;
//# sourceMappingURL=edit.js.map