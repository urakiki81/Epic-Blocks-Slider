import "./style.editor.scss";
import { registerBlockType } from "@wordpress/blocks";
const { __ } = wp.i18n;
import Edit from "./edit";
import classnames from "classnames";
import buttonIcon from "../icons/button-icon";
const {  RichText, getColorClassName } = wp.blockEditor;
const attributes = {
    content: {
        type: "string",
        source: "html",
        selector: "p"
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
    borderColor:{
        type: "string"
    },
    buttonAnimtion: {
        type: "string",
        default: "button-one"        
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
    appURL: {
        type: 'string',
        source: 'attribute',
        attribute: 'href',
        selector: 'a'
    }
};

registerBlockType("epicslider-blocks/epicsliderbutton", {
    title: __("Epic Button", "epicslider-blocks"),
    description: __("Epic Button Block For Epic Sliders", "epicslider-blocks"),
    category: "epicslider-category",
    icon: buttonIcon.epic,
    keywords: [__("photo", "epicslider-blocks"), __("image", "epicslider-blocks")],

    parent: ["epicslider-blocks/firstslider"],

    styles: [
        {
            name: "Squared",
            label: __("squared", "epicslider-blocks"),
        },
        {
            name: "Rounded",
            label: __("rounded", "epicslider-blocks")
        },
        {
            name: "Outline",
            label: __("Outline", "epicslider-blocks")
        },
        {
            name: "border-r",
            label: __("border round", "epicslider-blocks")
        },
        {
            name: "border",
            label: __("border squared", "epicslider-blocks")
        },
        {
            name: "wave",
            label: __("Wave", "epicslider-blocks")
        },
        {
            name: "pluse",
            label: __("pluse", "epicslider-blocks")
        },

        {
            name: "Shine",
            label: __("shine", "epicslider-blocks")
        },
        {
            name: "Gradient",
            label: __("Gradient", "epicslider-blocks")
        },
        {
            name: "Gradient__round",
            label: __("Gradient Round", "epicslider-blocks")
        },
        {
            name: "Strip",
            label: __("Gradient with Border", "epicslider-blocks")
        },


        
    ],

    attributes,

    edit: Edit,
    save: ({ attributes, className }) => {
        const {
            content,
            backgroundColor,
            textColor,
            customBackgroundColor,
            customTextColor,
            shadow,
            shadowOpacity,
            SlideInAnimtion,
            appURL,
            delayAnimtion,
            animtion,
            borderColor
        } = attributes;

        const backgroundClass = getColorClassName(
            "background-color",
            backgroundColor
        );
        const borderClass = getColorClassName(
            "borderColor",
            borderColor
        );
        const textClass = getColorClassName("color", textColor);

        const classes = classnames(className,{
            [backgroundClass]: backgroundClass,
            [textClass]: textClass,
            [borderColor]: borderColor,
            "has-shadow": shadow,
            [`shadow-opacity-${shadowOpacity * 100}`]: shadowOpacity
        });
        // const buttonHover = classnames( {
        //     [buttonAnimtion]: buttonAnimtion          
        // });
        const animation = classnames( {
            "animation": animtion,
            [`${SlideInAnimtion}`]: SlideInAnimtion,
            [`animationDelay-${delayAnimtion * 100}`]: delayAnimtion,           
        });

        return (
            <div className={`${animation} ${classes}`}
                style={{
                    backgroundColor: backgroundClass
                    ? undefined
                    : customBackgroundColor,
                    borderColor: borderClass
                    ? undefined
                    : customBackgroundColor,
                            }}
            >
                    <a href={appURL}>
                        
                            <RichText.Content
                                tagName="p"
                                value={content}
                                style={{
                                    color: textClass ? undefined : customTextColor
                                }}
                            />
                        
                        </a>
                </div>
        );
    }
});
