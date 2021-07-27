import "./styles.editor.scss";
/**
 * WordPress dependencies
 */
import { registerBlockType } from "@wordpress/blocks";
const { __ } = wp.i18n;


/**
 * Internal dependencies
 */
import texticon from "../icons/text-icon"
import edit from './edit';
import save from './save';

const attributes = {
    content: {
        type: "string",
        source: "html",
        selector: "h4"
    },
    alignment: {
        type: "string"
    },
    textAlignment: {
        type: "string"
    },
    textColor: {
        type: "string"
    },
    backgroundColor: {
        type: "string"
    },
    customBackgroundColor: {
        type: "string"
    },
    customTextColor: {
        type: "string"
    },
    shadow: {
        type: "boolean",
        default: false
    },
    shadowOpactiy: {
        type: "number",
        default: 0.3
    },
    fontSize: {
        type: 'number',
        default: 28
    },
    delayAnimtion: {
        type: "number",
        default: 0
    },
    animtion: {
        type: "boolean",
        default: false
    },
    SlideInAnimtion: {
        type: "string",
        default: "wp-block-epicslider-blocks_bounceIn"
    },
};


registerBlockType("epicslider-blocks/epictext", {
    title: __("Epic Text", "epicslider-blocks"),
    description: __("Epic Text Block For Epic Sliders", "epicslider-blocks"),
    category: "epicslider-category",
    icon: texticon.epic,
    keywords: [__("Text For Epic Sliders", "epicslider-blocks")],
    parent: ["epicslider-blocks/firstslider"],
    attributes,
    edit,
    save
}
);