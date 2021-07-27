/**
 * External dependencies
 */
import Cropper from 'react-easy-crop';

import classnames from 'classnames';
import { get, pick, last } from 'lodash';

import {  useEffect, useState } from "@wordpress/element";
/**
 * WordPress dependencies
 */
import { getBlobByURL, isBlobURL, revokeBlobURL } from '@wordpress/blob';
const { __ , sprintf } = wp.i18n;
import { getPath } from '@wordpress/url';
/**
 * Internal dependencies
 */
const {	Spinner, withNotices, ToolbarGroup, ToolbarButton, RangeControl, Dropdown, Button, PanelBody, TextareaControl, ExternalLink, SelectControl,
	ToggleControl, } = wp.components;
const {MediaPlaceholder, BlockControls,	MediaUpload, MediaUploadCheck, InspectorControls, InnerBlocks} = wp.blockEditor;
const {	useSelect, useDispatch } = wp.data;
const { apiFetch } = wp;

export const pickRelevantMediaFiles = ( image ) => {
	const imageProps = pick( image, [ 'alt', 'id', 'link', 'caption' ] );
	imageProps.url =
		get( image, [ 'sizes', 'large', 'url' ] ) ||
		get( image, [ 'media_details', 'sizes', 'large', 'source_url' ] ) ||
		image.url;
	return imageProps;
};

const LINK_DESTINATION_ATTACHMENT = 'attachment';
const LINK_DESTINATION_MEDIA = 'media';
const DEFAULT_SIZE_SLUG = 'large';
const ALLOWED_MEDIA_TYPES = [ 'image' ];
const MIN_ZOOM = 100;
const MAX_ZOOM = 300;
const POPOVER_PROPS = {
	position: 'bottom right',
	isAlternate: true,
};

const isTemporaryImage = ( id, url ) => ! id && isBlobURL( url );
const isExternalImage = ( id, url ) => url && ! id && ! isBlobURL( url );
function getFilename( url ) {
	const path = getPath( url );
	if ( path ) {
		return last( path.split( '/' ) );
	}
}
/**
 * Is the url for the image hosted externally. An externally hosted image has no
 * id and is not a blob url.
 *
 * @param {number=} id  The id of the image.
 * @param {string=} url The url of the image.
 *
 * @return {boolean} Is the url an externally hosted url?
 */

export function ImageEdit( {
	attributes,
	setAttributes,
	noticeUI,
	noticeOperations,
	naturalWidth,
	naturalHeight,
	clientWidth,
	isSelected,
	width,
	height,
	className
} ) {
	const {
		url = '',
		alt,
		id,
		linkDestination,
		heightPostion,
		visibleOnOverlay,
		OverlayOpactiy,
	
	} = attributes;

	const [ isEditingImage, setIsEditingImage ] = useState( false );
	const {
		imageEditing,
	} = useSelect( ( select ) => {
		const { getSettings } = select( 'core/block-editor' );
		return pick( getSettings(), [
			'imageEditing',

		] );
	} );
//crop

		const [ crop, setCrop ] = useState( null );
		const [ position, setPosition ] = useState( { x: 0, y: 0 } );
		const [ zoom, setZoom ] = useState( 100 );
		const { createErrorNotice } = useDispatch( 'core/notices' );
		const [ inProgress, setIsProgress ] = useState( false );
		const [ aspect ] = useState(  3 / 4 );
		//const [ rotation, setRotation ] = useState( 0 );
		//const [ editedUrl, setEditedUrl ] = useState();
		const editedWidth = 1000;
		let editedHeight = 1000 || ( clientWidth * naturalHeight ) / naturalWidth;
		//let naturalAspectRatio = naturalWidth / naturalHeight;
	
		// if ( rotation % 180 === 90 ) {
		// 	editedHeight = ( clientWidth * naturalWidth ) / naturalHeight;
		// 	naturalAspectRatio = naturalHeight / naturalWidth;
		// }
	

	const mediaUpload = useSelect( ( select ) => {
		const { getSettings } = select( 'core/block-editor' );
		return getSettings().mediaUpload;
	} );

	function onUploadError( message ) {
		noticeOperations.removeAllNotices();
		noticeOperations.createErrorNotice( message );
	}
	function updateAlt( newAlt ) {
		setAttributes( { alt: newAlt } );
	}
	function getImageSizes() {
        const { image, imageSizes } = this.props;
        if (!image) return [];
        let options = [];
        const sizes = image.media_details.sizes;
        for (const key in sizes) {
            const size = sizes[key];
            const imageSize = imageSizes.find(size => size.slug === key);
            if (imageSize) {
                options.push({
                    label: imageSize.name,
                    value: size.source_url
                });
            }
        }
        return options;
	}
	function onImageSizeChange(url) {
        this.props.setAttributes({
            url
        });
    };

    function onChangeHeightPostion (heightPostion) {
        setAttributes({ heightPostion });
	};
	
    function onChangeOverlayOpactiy (OverlayOpactiy) {
        setAttributes({ OverlayOpactiy });
    }
	function onSelectImage( media ) {
		if ( ! media || ! media.url ) {
			setAttributes( {
				url: undefined,
				alt: undefined,
				id: undefined,
				title: undefined,
				caption: undefined,
			} );
			return;
		}

	
;

		let mediaAttributes = pickRelevantMediaFiles( media );

		// If the current image is temporary but an alt text was meanwhile
		// written by the user, make sure the text is not overwritten.


		// If a caption text was meanwhile written by the user,
		// make sure the text is not overwritten by empty captions.

		let additionalAttributes;
		// Reset the dimension attributes if changing to a different image.
		if ( ! media.id || media.id !== id ) {
			additionalAttributes = {
				width: undefined,
				height: undefined,
				sizeSlug: DEFAULT_SIZE_SLUG,
			};
		} else {
			// Keep the same url when selecting the same file, so "Image Size"
			// option is not changed.
			additionalAttributes = { url };
		}

		// Check if the image is linked to it's media.
		if ( linkDestination === LINK_DESTINATION_MEDIA ) {
			// Update the media link.
			mediaAttributes.href = media.url;
		}

		// Check if the image is linked to the attachment page.
		if ( linkDestination === LINK_DESTINATION_ATTACHMENT ) {
			// Update the media link.
			mediaAttributes.href = media.link;
		}

		setAttributes( {
			...mediaAttributes,
			...additionalAttributes,
		} );
	}

	function onSelectURL( newURL ) {
		if ( newURL !== url ) {
			setAttributes( {
				url: newURL,
				id: undefined,
				sizeSlug: DEFAULT_SIZE_SLUG,
			} );
		}
	}



	const isTemp = isTemporaryImage( id, url );

	// Upload a temporary image on mount.
	useEffect( () => {
		if ( ! isTemp ) {
			return;
		}

		const file = getBlobByURL( url );

		if ( file ) {
			mediaUpload( {
				filesList: [ file ],
				onFileChange: ( [ img ] ) => {
					onSelectImage( img );
				},
				allowedTypes: ALLOWED_MEDIA_TYPES,
				onError: ( ) => {
						null
					 
				},
			} );
		}
	}, [] );

	// If an image is temporary, revoke the Blob url when it is uploaded (and is
	// no longer temporary).
	useEffect( () => {
		if ( ! isTemp ) {
			return;
		}

		return () => {
			revokeBlobURL( url );
		};
	}, [ isTemp ] );


	const isExternal = isExternalImage( id, url );

	const src = isExternal ? url : undefined;


	const mediaPlaceholder = (
		<MediaPlaceholder
			icon="format-image"
			onSelect={ onSelectImage }
			onSelectURL={ onSelectURL }
			notices={ noticeUI }
			onError={ onUploadError }
			accept="image/*"
			allowedTypes={ ALLOWED_MEDIA_TYPES }
			value={ { id, src } }
		/>
	);
	/* Crop Controls */
	const filename = getFilename( url );
	let defaultedAlt;

	if ( alt ) {
		defaultedAlt = alt;
	} else if ( filename ) {
		defaultedAlt = sprintf(
			/* translators: %s: file name */
			__( 'This image has an empty alt attribute; its file name is %s' ),
			filename
		);
	} else {
		defaultedAlt = __( 'This image has an empty alt attribute' );
	}
	const canEditImage = id && imageEditing;	
function apply() {
			setIsProgress( true );
	
			let attrs = {};
	
			// The crop script may return some very small, sub-pixel values when the image was not cropped.
			// Crop only when the new size has changed by more than 0.1%.
			if ( crop.width < 99.9 || crop.height < 99.9 ) {
				attrs = crop;
			}
	

			attrs.src = url;
	
			apiFetch( {
				path: `/wp/v2/media/${ id }/edit`,
				method: 'POST',
				data: attrs,
			} )
				.then( ( response ) => {
					setAttributes( {
						id: response.id,
						url: response.source_url,
						height: height && width ? width / aspect : undefined,
					} );
				} )
				.catch( ( error ) => {
					createErrorNotice(
						sprintf(
							/* translators: 1. Error message */
							__( 'Could not edit image. %s' ),
							error.message
						),
						{
							id: 'image-editing-error',
							type: 'snackbar',
						}
					);
				} )
				.finally( () => {
					setIsProgress( false );
					setIsEditingImage( false );
				} );
		}
	
		// function rotate() {
		// 	const angle = ( rotation + 90 ) % 360;
	
		// 	if ( angle === 0 ) {
		// 		setEditedUrl();
		// 		setRotation( angle );
		// 		aspect;
		// 		setPosition( {
		// 			x: -( position.y * naturalAspectRatio ),
		// 			y: position.x * naturalAspectRatio,
		// 		} );
		// 		return;
		// 	}
	
		// 	function editImage( event ) {
		// 		const canvas = document.createElement( 'canvas' );
	
		// 		let translateX = 0;
		// 		let translateY = 0;
	
		// 		if ( angle % 180 ) {
		// 			canvas.width = event.target.height;
		// 			canvas.height = event.target.width;
		// 		} else {
		// 			canvas.width = event.target.width;
		// 			canvas.height = event.target.height;
		// 		}
	
		// 		if ( angle === 90 || angle === 180 ) {
		// 			translateX = canvas.width;
		// 		}
	
		// 		if ( angle === 270 || angle === 180 ) {
		// 			translateY = canvas.height;
		// 		}
	
		// 		const context = canvas.getContext( '2d' );
	
		// 		context.translate( translateX, translateY );
		// 		context.rotate( ( angle * Math.PI ) / 180 );
		// 		context.drawImage( event.target, 0, 0 );
	
		// 		canvas.toBlob( ( blob ) => {
		// 			setEditedUrl( URL.createObjectURL( blob ) );
		// 			setRotation( angle );
		// 			aspect;
		// 			setPosition( {
		// 				x: -( position.y * naturalAspectRatio ),
		// 				y: position.x * naturalAspectRatio,
		// 			} );
		// 		} );
		// 	}
	
		// 	const el = new window.Image();
		// 	el.src = url;
		// 	el.onload = editImage;
		// }
		useEffect( () => {
			if ( ! isSelected ) {
				setIsEditingImage( false );
			}
		}, [ isSelected ] );

	
	let img = (
		// Disable reason: Image itself is not meant to be interactive, but
		// should direct focus to block.
		/* eslint-disable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events */
		<>
			<img
                src={url} alt={ defaultedAlt } />
                {isBlobURL(url) && <Spinner />}
		</>
		/* eslint-enable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events */
	);
	const controls = (
		<>
			<BlockControls>
			<ToolbarGroup>
					<ToolbarButton
						onClick={ () => setIsEditingImage( true ) }
						icon="image-crop"
						label={ __( 'Crop' ) }
					/>
				</ToolbarGroup>
				{id && (
                                <MediaUploadCheck>
                                    <MediaUpload
                                        onSelect={onSelectImage}
                                        allowedTypes={["image"]}
                                        value={id}
                                        render={({ open }) => {
                                            return (
                                                <Button
                                                    className="components-icon-button components-toolbar__control"
                                                    label={__(
                                                        "Edit Image",
                                                        "mytheme-blocks"
                                                    )}
                                                    onClick={open}
                                                    icon="edit"
                                                />
                                            );
                                        }}
                                    />
                                </MediaUploadCheck>
                            )}

			</BlockControls>
			<InspectorControls>
				<PanelBody title={ __( 'Image settings' ) }>
					<TextareaControl
						label={ __( 'Alt text (alternative text)' ) }
						value={ alt }
						onChange={ updateAlt }
						help={
							<>
								<ExternalLink href="https://www.w3.org/WAI/tutorials/images/decision-tree">
									{ __(
										'Describe the purpose of the image'
									) }
								</ExternalLink>
								{ __(
									'Leave empty if the image is purely decorative.'
								) }
							</>
						}
					/>
					 {id && (
                            <SelectControl
                                label={__("Image Size", "mytheme-blocks")}
                                options={getImageSizes}
                                onChange={onImageSizeChange}
                                value={url}
                            />
                        )}
						

				</PanelBody>
				<PanelBody>   

                            <RangeControl
                                label={__("Up Down", "themename-blocks")}
                                value={heightPostion}
                                onChange={onChangeHeightPostion}
                                min={10}
                                max={70}
                                step={10}
                            />
              			<ToggleControl
							label={ __( 'Overlay Control' ) }
							checked={ !! visibleOnOverlay }
							onChange={ () => setAttributes( {  visibleOnOverlay: ! visibleOnOverlay } ) }
							
						/>
						{visibleOnOverlay && (
                            <RangeControl
                                label={__("Shadow Opacity", "mytheme-blocks")}
                                value={OverlayOpactiy}
                                onChange={onChangeOverlayOpactiy}
                                min={0.1}
                                max={1}
                                step={0.1}
                            />
                        )}

              
                    </PanelBody>

			</InspectorControls>
		</>
	)


	if ( canEditImage && isEditingImage ) {
	 	img = (
			 <>

			 	<div
				className={ classnames( 'wp-block-image__crop-area', {
					'is-applying': inProgress,
				} ) }
				style={ {
					width: editedWidth,
					height: editedHeight,
				} }
			>
				<Cropper
					id={ id }
					image={ url }
					disabled={ inProgress }
					minZoom={ MIN_ZOOM / 100 }
					maxZoom={ MAX_ZOOM / 100 }
					crop={ position }
					zoom={ zoom / 100 }
					aspect={ aspect }
					onCropChange={ setPosition }
					onCropComplete={ ( newCropPercent ) => {
						setCrop( newCropPercent );
					} }
					onZoomChange={ ( newZoom ) => {
						setZoom( newZoom * 100 );
					} }
					clientWidth={ clientWidth }
					setIsEditingImage={ setIsEditingImage }
					setAttributes={ setAttributes }
				/>
				{ inProgress && <Spinner /> }
				</div>
			
				<BlockControls>

			

		
				<ToolbarGroup>
					<ToolbarButton onClick={ apply } disabled={ inProgress }>
						{ __( 'Apply' ) }
					</ToolbarButton>
					<ToolbarButton onClick={ () => setIsEditingImage( false ) }>
						{ __( 'Cancel' ) }
					</ToolbarButton>
					<Dropdown
						contentClassName="wp-block-image__zoom"
						popoverProps={ POPOVER_PROPS }
						renderToggle={ ( { isOpen, onToggle } ) => (
							<ToolbarButton
								icon="search"
								label={ __( 'Zoom' ) }
								onClick={ onToggle }
								aria-expanded={ isOpen }
								disabled={ inProgress }
							/>
						) }
						renderContent={ () => (
							<RangeControl
								min={ MIN_ZOOM }
								max={ MAX_ZOOM }
								value={ Math.round( zoom ) }
								onChange={ setZoom }
							/>
						) }
					/>
			</ToolbarGroup>
			</BlockControls>
		
		</>
		);
	}
	



	// Focussing the image caption after inserting an image relies on the
	// component remounting. This needs to be fixed.
	const key = !! url;
	const classes = classnames(className, {
		[`caption postionX-${heightPostion}`]: heightPostion,
	});
	const opacity = classnames(className, {
		[`wp-block-epicslider-opacity-${OverlayOpactiy * 100}`]: OverlayOpactiy
	});
	return (
		<>
		<div className={"wp-block-epicslider-portrait"} key={ key }>
		{visibleOnOverlay &&  (
			<div className={`wp-block-epicslider__overlay ${opacity}`}

			></div> )}
						<div className={`${classes}`}>
                            <InnerBlocks
                            	allowedBlocks={["epicslider-blocks/epictext", "epicslider-blocks/epicsliderbutton"]}
                                        template={[
                                            ["epicslider-blocks/epictext"]
                                        ]}
                                    />  
                        </div>
			{url ? (
						
                        <>
							{controls}
						
							{img}
						
                        </>

                    ) : (
						<>
							{ mediaPlaceholder }
						</>
                    )}

			</div>
		</>
	);
}

export default withNotices( ImageEdit );