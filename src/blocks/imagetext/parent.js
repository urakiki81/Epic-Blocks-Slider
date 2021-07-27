
import { registerBlockType } from "@wordpress/blocks";
const { __ } = wp.i18n;
import classnames from 'classnames';
import imageTextblocks from "../icons/Image-text"

const { BlockControls, InnerBlocks } = wp.blockEditor;




registerBlockType("epicslider-blocks/imagetext", {
    title: __("Image and Text", "epicslider-blocks"),

    description: __("Block With off set text and image .", "epicslider-blocks"),

    icon: imageTextblocks.epic,

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
            <div className={`wp-block-epic-slider-image-text ${classes}`}>
                <div className="wp-block-epic-slider-image-text-container">
                    <div className="wp-block-epic-slider-image-text-container__grid">
                            <InnerBlocks
                                allowedBlocks={["epicslider-blocks/imagetextslide"]}
                                template={[
                                    ["epicslider-blocks/imagetextslide"],
                                    ["epicslider-blocks/imagetextslide"]
                                ]}
                            />    
                    </div>
                </div>
            </div>
            </>
        );
    },

    save() {
       
 
        return (
            <div className="wp-block-epic-slider-image-text">
                <div className="wp-block-epic-slider-image-text-container">
                    <div className="wp-block-epic-slider-image-text-container__grid">          
                        <InnerBlocks.Content />          
                    </div>
                </div>
            </div>
        );
    }
});