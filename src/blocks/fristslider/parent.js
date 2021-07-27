import { registerBlockType } from "@wordpress/blocks";
const { __ } = wp.i18n;
import heroblocks from "../icons/hero-slider.js";
import classnames from 'classnames';
const { BlockControls, InnerBlocks } = wp.blockEditor;
const attributes = {
    SlideInAnimtion: {
        type: "string",
        default: "fxSoftScale"
    },
};

registerBlockType("epicslider-blocks/herocontainer", {
    title: __("Hero slider", "epicslider-blocks"),

    description: __("Block showing Hero Slider.", "epicslider-blocks"),

    icon: heroblocks.epic,

    category: "epicslider-category",

    supports: {
        html: false,
        align: ["wide", "full"]
    },

    keywords: [
        __("team", "epicslider-blocks"),
        __("member", "epicslider-blocks"),
        __("person", "epicslider-blocks")
    ],

    attributes,


    edit( {className, attributes, setAttributes }) {
        const toggleMinimized = () => {
           setAttributes( {  minimized: ! minimized } )
        };
        const { minimized } = attributes;
        const classes = classnames(className, {
            "is-minimized": minimized
        });
        return (
            <>
                <BlockControls
                    controls={[
                        {   
                            icon: "editor-expand",
                            title: __("Collapse toggle", "epicslider-blocks"),
                            onClick: toggleMinimized,
                            isActive: minimized
                            
                        }
                    ]}
    
                ></BlockControls>

            <div className={`epic-slider_container-hero ${classes}`}>
                <div className={` slider stick-dots`}> 
                    <InnerBlocks
                        allowedBlocks={["epicslider-blocks/firstslider"]}
                        template={[
                            ["epicslider-blocks/firstslider"],
                            ["epicslider-blocks/firstslider"]
                        ]}
                    />             
                </div>
            </div>
            </>
        );
    },

    save() {

 
        return (
    
            <div className="epic-slider_container-hero">
                <div className={`epic-slider_slider stick-dots`}>          
                    <InnerBlocks.Content />
                    
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" 
                        style="display: none;"
                        viewBox="0 0 44 44" 
                        width="44px" height="44px" 
                        id="circle" 
                        fill="none" 
                        stroke="currentColor">
                    <circle r="20" cy="22" cx="22" id="test"/>
                 
                </svg>
           </div>

        
        );
    }
});