import { Component } from "@wordpress/element";
const { __ } = wp.i18n;
import { RangeControl, PanelBody, SelectControl } from "@wordpress/components";
import classnames from "classnames";
const { RichText, BlockControls, InspectorControls, PanelColorSettings, withColors, ContrastChecker,} = wp.blockEditor;
class Edit extends Component {
    onChangeContent = content => {
        this.props.setAttributes({ content });
    };

    toggleShadow = () => {
        this.props.setAttributes({ shadow: !this.props.attributes.shadow });
    };

    onChangeShadowOpacity = shadowOpacity => {
        this.props.setAttributes({ shadowOpacity });
    };
    onChangeFontSize = newFontSize => {
        this.props.setAttributes( { fontSize: newFontSize } );
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
    onChangefontSize = fontSize => {
        this.props.setAttributes({ fontSize });
    };

    render() {
        //console.log(this.props);
        const {
            className,
            attributes,
            setTextColor,
            setBackgroundColor,
            backgroundColor,
            textColor
        } = this.props;

        const { content, shadow, shadowOpacity, fontSize, animtion, SlideInAnimtion, delayAnimtion } = attributes;
        const classes = classnames(className, {
            "has-shadow": shadow,
            [`shadow-opacity-${shadowOpacity * 100}`]: shadowOpacity,
            "animation": animtion,
            [`${SlideInAnimtion}`]: SlideInAnimtion,
            [`animationDelay-${delayAnimtion * 100}`]: delayAnimtion, 
        });
        const EpicFontS = classnames(className, {
            [`F-${fontSize}`]: fontSize
        });
        return (
            <>
                <InspectorControls>
                <PanelBody>
                        {content && (
                            <RangeControl
                                label={__("Title Font Size", "themename-blocks")}
                                value={fontSize}
                                onChange={this.onChangefontSize}
                                min={10}
                                max={70}
                                step={2}
                            />
                        )}
                    </PanelBody>
                    <PanelBody title={__("Setting", "mytheme-blocks")}>
                        {shadow && (
                            <RangeControl
                                label={__("Shadow Opacity", "mytheme-blocks")}
                                value={shadowOpacity}
                                onChange={this.onChangeShadowOpacity}
                                min={0.1}
                                max={0.4}
                                step={0.1}
                            />
                        )}
                    </PanelBody>
                    <PanelColorSettings
                        title={__("Panel", "mytheme-blocks")}
                        colorSettings={[
                            {
                                value: backgroundColor.color,
                                onChange: setBackgroundColor,
                                label: __("Backgorund Colour", "mytheme-blocks")
                            },
                            {
                                value: textColor.color,
                                onChange: setTextColor,
                                label: __("Text Colour", "mytheme-blocks")
                            }
                        ]}
                    >
                        <ContrastChecker
                            textColor={textColor.color}
                            backgroundColor={backgroundColor.color}
                        />
                    </PanelColorSettings>

                    <PanelBody title={__("Animtion Setting", "themename-blocks")}>
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
                                    label={__("Animtion Delay", "themename-blocks")}
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
                            icon: "cloud",
                            title: __("Shadow", "mytheme-blocks"),
                            onClick: this.toggleShadow,
                            isActive: shadow
                        }
                    ]}
                >
                </BlockControls>
                <BlockControls
                    controls={[
                        {
                            icon: "editor-video",
                            title: __("Slide In Animtion", "themename-blocks"),
                            onClick: this.toggleAnimtion,
                            isActive: animtion
                        }
                    ]}
    
                ></BlockControls>
                <RichText
                    tagName="h4"
                    className={`${classes} ${EpicFontS}`}
                    onChange={this.onChangeContent}
                    value={content}
                    allowedFormats={["bold"]}
                    style={{
                        backgroundColor: backgroundColor.color,
                        color: textColor.color,
                    }}
                />
            </>
        );
    }
}

export default withColors("backgroundColor", { textColor: "color" })(Edit);