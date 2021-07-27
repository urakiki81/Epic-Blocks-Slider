/**
 * External dependencies
 */
import Cropper from 'react-easy-crop';
import classnames from 'classnames';
import { get, pick, last } from 'lodash';

/**
 * WordPress dependencies
 */
import {  useEffect, useState } from "@wordpress/element";
import { getBlobByURL, isBlobURL, revokeBlobURL } from '@wordpress/blob';

const {
	useSelect, useDispatch 
} = wp.data;
const { __ ,sprintf} = wp.i18n;
import { getPath } from '@wordpress/url';
/**
 * Internal dependencies
 */
const {	Spinner, withNotices, ToolbarGroup, ToolbarButton, RangeControl, Dropdown, Button, PanelBody, TextareaControl, ExternalLink, SelectControl,
 } = wp.components;
const { MediaPlaceholder, BlockControls, MediaUpload, MediaUploadCheck, InspectorControls, InnerBlocks} = wp.blockEditor;
const { apiFetch }= wp;

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
} ) {
	const {
		url = '',
		alt,
		id,
		linkDestination,	
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
		const [ aspect ] = useState( 16 / 9 );
		const editedWidth = 1000;
		let editedHeight = 1000 || ( clientWidth * naturalHeight ) / naturalWidth;


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


		let additionalAttributes;

		if ( ! media.id || media.id !== id ) {
			additionalAttributes = {
				width: undefined,
				height: undefined,
				sizeSlug: DEFAULT_SIZE_SLUG,
			};
		} else {

			additionalAttributes = { url };
		}

		if ( linkDestination === LINK_DESTINATION_MEDIA ) {
			// Update the media link.
			mediaAttributes.href = media.url;
		}

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
	
	
		useEffect( () => {
			if ( ! isSelected ) {
				setIsEditingImage( false );
			}
		}, [ isSelected ] );

	
	let img = (

		<>
			<img
                src={url} alt={ defaultedAlt } />
                {isBlobURL(url) && <Spinner />}
		</>
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
					aspect={ aspect  }
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
	




	const key = !! url;


	return (
		<>
            <div className={`wp-block-epic-slider-imgage-text-slide`} id={"image-wrapper"} key={ key }> 
					<div className={"wp-block-epic-slider-imgage-text-grid"}>
                    <div className={`epic-slider-imgage-text_text `}>
                        <div className={`caption`}>
                            <InnerBlocks
                            	allowedBlocks={false}
                                        template={[
                                            ["epicslider-blocks/epictext"]
                                        ]}
                                    />  
                        </div>
                    </div>

                    <div className={`epic-slider-imgage-text_image`}> 
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
				</div>
            </div>
		</>
	);
}

export default withNotices( ImageEdit );