/**
 * External dependencies
 */
import classnames from "classnames";

/**
 * WordPress dependencies
 */

const {InnerBlocks } = wp.blockEditor;
export default function save( { attributes, className } ) {
	const {
		url,
		alt,
		id,
		width,
		height,
		heightPostion,
		visibleOnOverlay,
		OverlayOpactiy
	} = attributes;

	const image = (
		<img
			src={ url }
			alt={ alt }
			className={ id ? `wp-image-${ id }` : null }
			width={ width }
			height={ height }
		/>
	);
	const figure = (
		<>
		
					{ image }
				

		</>
	);
	const classes = classnames(className, {
		[`caption postionX-${heightPostion}`]: heightPostion,
		
	});
	const opacity = classnames(className, {
		[`wp-block-epicslider-opacity-${OverlayOpactiy * 100}`]: OverlayOpactiy
	});
	return (
			<div className={"wp-block-epicslider-portrait"} >
				{visibleOnOverlay &&  (<div className={`wp-block-epicslider__overlay ${opacity}`}></div> )}
				{ figure }
				<div className={`${classes}`}>
					<InnerBlocks.Content />
				</div>
			</div>
	);
}