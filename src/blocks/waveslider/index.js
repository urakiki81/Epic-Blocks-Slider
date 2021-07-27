import "./style.editor.scss";
import { registerBlockType } from "@wordpress/blocks";
const { __ } = wp.i18n;

import classnames from 'classnames';
import waveblocks from "../icons/wave-slider"



const { BlockControls, InnerBlocks } = wp.blockEditor;

registerBlockType("epicslider-blocks/waveslider", {
    title: __("Wave slider", "epicslider-blocks"),

    description: __("Hero Slider with Wave animation.", "epicslider-blocks"),

    icon: waveblocks.epic,

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

            <div className={`epic-slider_container-hero ${classes}`}>
                <div className={` slider stick-dots `}> 
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
                <div className={`epic-slider_slider stick-dots `}>          
                    <InnerBlocks.Content />
                </div>
                <div className="shape">
		            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 280" >
                        <path fill="#ffffff" >
                            <animate 
                                attributeName="d" 
                                dur="20000ms"
                                repeatCount="indefinite"
                                            values="M0,160L48,181.3C96,203,192,245,288,261.3C384,277,480,267,576,234.7C672,203,768,149,864,117.3C960,85,1056,75,1152,90.7C1248,107,1344,149,1392,170.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z; M0,160L48,181.3C96,203,192,245,288,234.7C384,224,480,160,576,133.3C672,107,768,117,864,138.7C960,160,1056,192,1152,197.3C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;												 M0,64L48,74.7C96,85,192,107,288,133.3C384,160,480,192,576,170.7C672,149,768,75,864,80C960,85,1056,171,1152,181.3C1248,192,1344,128,1392,96L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
                                                            M0,160L48,181.3C96,203,192,245,288,261.3C384,277,480,267,576,234.7C672,203,768,149,864,117.3C960,85,1056,75,1152,90.7C1248,107,1344,149,1392,170.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;"
                            />
                        </path>
			        </svg>

		        </div>	
           </div>
        );
    }
});