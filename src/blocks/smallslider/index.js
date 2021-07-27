import "./styles.editor.scss";
import { registerBlockType } from "@wordpress/blocks";
const { __ } = wp.i18n;

import smallblocks from '../icons/small-slider'
import classnames from 'classnames';

const { BlockControls, InnerBlocks } = wp.blockEditor;


registerBlockType("epicslider-blocks/smallslider", {
    title: __("Small slider", "epicslider-blocks"),

    description: __("Block Small Slider to if into other blocks.", "epicslider-blocks"),

    icon: smallblocks.epic,

    category: "epicslider-category",

    supports: {
        html: false,
    },





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
            <div className={`epic-slider_container-small ${classes}`}>
                <div className={`epic-slider_small stick-dots `}> 
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
            <div className="epic-slider_container-small">
                <div className={`epic-slider_small stick-dots `}>          
                    <InnerBlocks.Content />
                </div>
           </div>
        );
    }
});