
/**
 * WordPress dependencies
 */

const { InnerBlocks } = wp.blockEditor;
export default function save( { attributes } ) {
	const {
		url,
		alt,
		id,
		width,
		height,

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


	return (
        <div className={`wp-block-epic-slider-imgage-text-slide`} id={"image-wrapper"}>
			<div className={"wp-block-epic-slider-imgage-text-grid"}>
				<div className={`epic-slider-imgage-text_text `}>
					<div className={`caption`}>
						<InnerBlocks.Content />
					</div>
				</div>

				<div className={`epic-slider-imgage-text_image `}> 
					{ figure }
				</div>
			</div>
        </div>
    )
}