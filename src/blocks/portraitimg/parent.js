import { registerBlockType } from "@wordpress/blocks";
const { __ } = wp.i18n;
import classnames from 'classnames';
import centerblocks from "../icons/center-blcok"
const { BlockControls, InnerBlocks } = wp.blockEditor;

const attributes = {
    SlideInAnimtion: {
        type: "string",
        default: "fxSoftScale"
    },
};


registerBlockType("epicslider-blocks/three-img-center", {
    title: __("Center focus slider", "epicslider-blocks"),

    description: __("Image slider that shows their images with the center one as its focus.", "epicslider-blocks"),

    icon: centerblocks.epic,

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
            <div className={`epic-slider_container-center ${classes}`}>
                <div className={`epic-slider_center`}> 
                    <InnerBlocks
                        allowedBlocks={["epicslider-blocks/portraitimg"]}
                        template={[
                            ["epicslider-blocks/portraitimg"],
                            ["epicslider-blocks/portraitimg"]
                        ]}
                    />             
                </div>
            </div>
            </>
        );
    },

    save() { 
        return (
            <div className="epic-slider_container-center">
                <div className={`epic-slider_center`}>          
                    <InnerBlocks.Content />
                </div>
           </div>
        );
    }
});