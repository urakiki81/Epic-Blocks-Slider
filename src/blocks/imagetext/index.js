import "./style.editor.scss";
import "./parent";
/**
 * WordPress dependencies
 */
import { registerBlockType } from "@wordpress/blocks";
const { __ } = wp.i18n;


/**
 * Internal dependencies
 */
import epicblocks from "../icons/epic-blocks"
import edit from './edit';
import save from './save';

const attributes = {
	align: {
		type: "string"
	},
	url: {
		type: "string",
		source: "attribute",
		selector: "img",
		attribute: "src"
	},
	alt: {
		type: "string",
		source: "attribute",
		selector: "img",
		attribute: "alt",
		default: ""
	},
	caption: {
		type: "string",
		source: "html",
		selector: "figcaption"
	},
	title: {
		type: "string",
		source: "attribute",
		selector: "img",
		attribute: "title"
	},
	href: {
		type: "string",
		source: "attribute",
		selector: "figure > a",
		attribute: "href"
	},
	rel: {
		type: "string",
		source: "attribute",
		selector: "figure > a",
		attribute: "rel"
	},
	linkClass: {
		type: "string",
		source: "attribute",
		selector: "figure > a",
		attribute: "class"
	},
	id: {
		type: "number"
	},
	width: {
		type: "number",

	},
	height: {
		type: "number",
	
	},
	sizeSlug: {
		type: "string"
	},
	linkDestination: {
		type: "string"
	},
	linkTarget: {
		type: "string",
		source: "attribute",
		selector: "figure > a",
		attribute: "target"
	},
	heightPostion: {
        type: "number",
        default: 50
	},
	TextPostion: {
        type: "number",
        default: 50
	},

};


registerBlockType("epicslider-blocks/imagetextslide", {
    title: __("Image and text", "epicslider-blocks"),
	description: __("Inner block for image and text", "epicslider-blocks"),
    category: "epicslider-category",
    icon: epicblocks.epic,
	parent: ["epicslider-blocks/imagetext"],

	keywords: [__("photo", "epicslider-blocks"), __("image", "epicslider-blocks")],
	
	supports: {
		anchor: true,
		html: false,
	},


    attributes,
    edit,
    save
}
);