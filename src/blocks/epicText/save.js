import classnames from "classnames";
const { RichText, getColorClassName} = wp.blockEditor;
export default function save( { attributes } ) {
    const {
        content,
        textAlignment,
        backgroundColor,
        textColor,
        customBackgroundColor,
        customTextColor,
        shadow,
        shadowOpacity,
        fontSize,
        animtion, 
        SlideInAnimtion, 
        delayAnimtion
    } = attributes;

    const backgroundClass = getColorClassName(
        "background-color",
        backgroundColor
    );
    const textClass = getColorClassName("color", textColor);

    const classes = classnames({
        [backgroundClass]: backgroundClass,
        [textClass]: textClass,
        "has-shadow": shadow,
        [`shadow-opacity-${shadowOpacity * 100}`]: shadowOpacity,
        "animation": animtion,
        [`${SlideInAnimtion}`]: SlideInAnimtion,
        [`animationDelay-${delayAnimtion * 100}`]: delayAnimtion,    
    });
    const EpicFontS = classnames( {
        [`F-${fontSize}`]: fontSize
    });
    return (
        <RichText.Content
            tagName="h4"
            className={`${classes} ${EpicFontS}`}
            allowedFormats={["bold"]}
            value={content}
            style={{
                textAlign: textAlignment,
                backgroundColor: backgroundClass
                    ? undefined
                    : customBackgroundColor,
                color: textClass ? undefined : customTextColor,
            }}
        />
    );
};