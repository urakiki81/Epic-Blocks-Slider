import { Component } from "@wordpress/element";
const { __ } = wp.i18n;
import { RangeControl, PanelBody, SelectControl } from "@wordpress/components";
import classnames from "classnames";
const {RichText, BlockControls, InspectorControls, AlignmentToolbar, PanelColorSettings, withColors, ContrastChecker, URLInputButton} = wp.blockEditor;
class Edit extends Component {
    onChangeContent = content => {
        this.props.setAttributes({ content });
    };

    onChangeAlignment = textAlignment => {
        this.props.setAttributes({ textAlignment });
    };

    toggleShadow = () => {
        this.props.setAttributes({ shadow: !this.props.attributes.shadow });
    };

    onChangeShadowOpacity = shadowOpacity => {
        this.props.setAttributes({ shadowOpacity });
    };
    onChangeButtonAnimtion = buttonAnimtion => {
        this.props.setAttributes({ buttonAnimtion });
    };
    toggleAnimtion = () => {
        this.props.setAttributes({ animtion: !this.props.attributes.animtion });
    };
    onChangeSlideInAnimtion = SlideInAnimtion => {
        this.props.setAttributes({ SlideInAnimtion });
    };
    onChangeDelayAnimtion = delayAnimtion => {
        this.props.setAttributes({ delayAnimtion });
    };
    onChangeAppUrl = newURL => {
        this.props.setAttributes({ appURL : newURL})
    };

    render() {
        const {
            className,
            attributes,
            setTextColor,
            setBackgroundColor,
            backgroundColor,
            textColor,
            setBorderColor,
            borderColor,
        } = this.props;
        const { content, textAlignment, shadow, shadowOpacity, buttonAnimtion, animtion, SlideInAnimtion, delayAnimtion, appURL } = attributes;
        const classes = classnames(className, {
            "has-shadow": shadow,
            [`shadow-opacity-${shadowOpacity * 100}`]: shadowOpacity
        });
        // const buttonHover = classnames(className, {
        //     [buttonAnimtion]: buttonAnimtion          
        // });
        const animation = classnames( {
            "animation": animtion,
            [`${SlideInAnimtion}`]: SlideInAnimtion,
            [`animationDelay-${delayAnimtion * 100}`]: delayAnimtion,           
        });
        return (
            <>
                <InspectorControls>
                    <PanelBody title={__("Setting", "epicslider-blocks")}>
                        {shadow && (
                            <RangeControl
                                label={__("Shadow Opacity", "epicslider-blocks")}
                                value={shadowOpacity}
                                onChange={this.onChangeShadowOpacity}
                                min={0.1}
                                max={0.4}
                                step={0.1}
                            />
                        )}
                    </PanelBody>
                    <PanelColorSettings
                        title={__("Panel", "epicslider-blocks")}
                        colorSettings={[
                            {
                                value: backgroundColor.color,
                                onChange: setBackgroundColor,
                                label: __("Backgorund Color", "epicslider-blocks")
                            },
                            {
                                value: textColor.color,
                                onChange: setTextColor,
                                label: __("Text Color", "epicslider-blocks")
                            },
                            {
                                value: borderColor.color,
                                onChange: setBorderColor,
                                label: __("Border Color", "epicslider-blocks")
                            }
                        ]}
                    >
                        <ContrastChecker
                            textColor={textColor.color}
                            backgroundColor={backgroundColor.color}
                        />
                    </PanelColorSettings>
                    <PanelBody title={__("Button Animtion Setting", "epicslider-blocks")}>
                    <SelectControl
                            label={__("Button Animtion", "epicslider-blocks")}
                            value={ buttonAnimtion }
                            options={ [
                                { label: __("Pop Up", "epicslider-blocks"), value: 'button-one' },
                                { label: __("Fill", "epicslider-blocks"), value: 'button-two' },
                                { label: __("Fill Center", "epicslider-blocks"), value: 'button-three' },
                                { label: __("Fill two Way", "epicslider-blocks"), value: 'button-five' },
                                { label: __("Big Border", "epicslider-blocks"), value: 'button-six' },

                            ] }
                                onChange={ this.onChangeButtonAnimtion }
                            />
                    </PanelBody>
                    <PanelBody title={__("Animtion Setting", "epicslider-blocks")}>
                        {animtion && (
                            <SelectControl
                            label="Animtion"
                            value={ SlideInAnimtion }
                            options={ [
                                { label: __("Bounce In", "themename-blocks"), value: 'wp-block-epicslider-blocks_bounceIn' },
                                { label: __("Fade In Down", "themename-blocks"), value: 'wp-block-epicslider-blocks_fadeInDown' },
                                { label: __("Fade In", "themename-blocks"), value: 'wp-block-epicslider-blocks_fadeIn' },
                                { label: __("Bounce In Left", "themename-blocks"), value: 'wp-block-epicslider-blocks_bounceInLeft' },
                                { label: __("Bounce In Right", "themename-blocks"), value: 'wp-block-epicslider-blocks_bounceInRight' },
                                { label: __("Fade In up", "themename-blocks"), value: 'wp-block-epicslider-blocks_fadeInUp' },
                                { label: __("Move Up", "themename-blocks"), value: 'wp-block-epicslider-blocks_moveUp' },
                                { label: __("Move Down", "themename-blocks"), value: 'wp-block-epicslider-blocks_moveDown' },
                                { label: __("Zoom In", "themename-blocks"), value: 'wp-block-epicslider-blocks_zoomIn' },
                                { label: __("Fade In Left", "themename-blocks"), value: 'wp-block-epicslider-blocks_fadeInLeft' },
                                { label: __("Fade In Right", "themename-blocks"), value: 'wp-block-epicslider-blocks_fadeInRight' },
                                { label: __("Flip In Y", "themename-blocks"), value: 'wp-block-epicslider-blocks_flipInY' },
                                { label: __("Flip In X", "themename-blocks"), value: 'wp-block-epicslider-blocks_flipInX'},
                                { label: __("Rotate In Down Left", "themename-blocks"), value: 'wp-block-epicslider-blocks_rotateInDownLeft' },
                                { label: __("Rotate In Down Right", "themename-blocks"), value: 'wp-block-epicslider-blocks_rotateInDownRight'},
                                { label: __("Rotate In Up Left", "themename-blocks"), value: 'wp-block-epicslider-blocks_rotateInUpLeft' },
                                { label: __("Rotate In Up Right", "themename-blocks"), value: 'wp-block-epicslider-blocks_rotateInUpRight'},
                                { label: __("Jello", "themename-blocks"), value: 'wp-block-epicslider-blocks_jello'},
                                { label: __("RubberBand", "themename-blocks"), value: 'wp-block-epicslider-blocks_rubberBand'},
                            ] }
                                onChange={ this.onChangeSlideInAnimtion }
                            />
                            
                        )}
                        {animtion &&(
                                <RangeControl
                                    label={__("Animtion Delay", "epicslider-blocks")}
                                    value={delayAnimtion}
                                    onChange={this.onChangeDelayAnimtion}
                                    min={0}
                                    max={0.9}
                                    step={0.1}
                                />
                        )

                        }
                    </PanelBody>
                </InspectorControls>
                <BlockControls
                    controls={[
                        {
                            icon: "editor-video",
                            title: __("Slide In Animtion", "epicslider-blocks"),
                            onClick: this.toggleAnimtion,
                            isActive: animtion
                        }
                    ]}
    
                >
                    <AlignmentToolbar
                        value={textAlignment}
                        onChange={this.onChangeAlignment}
                    />
                </BlockControls>
                <BlockControls
                    controls={[
                        {
                            icon: "cloud",
                            title: __("Shadow", "epicslider-blocks"),
                            onClick: this.toggleShadow,
                            isActive: shadow
                        }
                    ]}
    
                >
                    
                </BlockControls>
                <div className={`${animation} ${classes}`}                                        
                            style={{
                            textAlign: textAlignment,
                            backgroundColor: backgroundColor.color,
                            borderColor: borderColor.color
                            }}
                >
                    <a>
            
                            <RichText                            
                                onChange={this.onChangeContent}
                                value={content}
                                allowedFormats={["bold"]}
                                style={{
                                    color: textColor.color
                                }}
                            />
                    
                    </a>
                </div>
                            <URLInputButton
                                onChange={this.onChangeAppUrl}
                                url={appURL}
                            />
            </>
        );
    }
}

export default withColors({textColor: 'color', backgroundColor: 'background-color', borderColor: 'borderColor'})(Edit);
