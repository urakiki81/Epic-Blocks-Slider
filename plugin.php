<?php 
/**
 * Plugin name: epic block sliders
 * Plugin URI: https://codecanyon.net/user/urakiki81
 * description:Epic Block Sliders Image, Image slider
 * Author Cyrus Shahbazi
 * Author URI: https://codecanyon.net/user/urakiki81
 * License: GPLv2 or Later 
 * Text Domain: epicslider-blocks
 * Domain Path: languages
 */
/*
{epic block sliders} is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 2 of the License, or
any later version.
 
{epic block sliders} is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.
 
You should have received a copy of the GNU General Public License
along with {epic block sliders}. If not, see {URI to Plugin License}.
*/

 if( ! defined( 'ABSPATH')) {
     exit;
 }
 define( 'EPIC_BLOCKS_SLIDER_ESNEXT_VERSION', '1.0.0' );
 define( 'EPIC_BLOCK_SLIDER_DIR', dirname( __FILE__ ) );
 define( 'EPIC_BLOCK_SLIDER_PLUGIN_URL', plugin_dir_url( __FILE__ ) );

add_action( 'init', 'epicslider_blocks_init' );
 function epicslider_blocks_categories( $categories, $post ){
    return array_merge(
        $categories, 
        array(
            array(
                'slug' => 'epicslider-category',
                'title'=> __('Epic Slider', 'epicslider-blocks'),
                'icon' => 'icon'
            )
        )
            );
}
add_filter('block_categories','epicslider_blocks_categories',10,2);

function epicslider_blocks_register_block_type($block, $options = array ()) {
    if ( ! function_exists( 'register_block_type' ) ) {
		// Gutenberg is not active.
		return;
	}
    register_block_type(
        'epicslider-blocks/' .$block,
        array_merge(
            array(
                'editor_script' => 'epicslider-blocks-editor-script',
                'editor_style' => 'epicslider-blocks-editor-style',
                'script' => 'epicslider-blocks-script',
                'style' => 'epicslider-blocks-style'
            ),
            $options
        )
        

    );
}

function epicslider_blocks_register() { 
    if ( ! function_exists( 'register_block_type' ) ) {
		// Gutenberg is not active.
		return;
	}
    wp_register_script(
        'epicslider-blocks-editor-script',
        EPIC_BLOCK_SLIDER_PLUGIN_URL . 'dist/editor.js',
        ['wp-blocks', 'wp-i18n', 'wp-element', 'wp-components', 'wp-api-fetch',  'wp-blob', 'wp-data', 'wp-hooks', 'wp-editor', 'wp-compose',],
        EPIC_BLOCKS_SLIDER_ESNEXT_VERSION
    );

    wp_register_script(
        'epicslider-blocks-script',
        EPIC_BLOCK_SLIDER_PLUGIN_URL . 'dist/script.js',
        array('jquery' , 'wp-i18n'),
        EPIC_BLOCKS_SLIDER_ESNEXT_VERSION

    );

    wp_register_style(
        'epicslider-blocks-editor-style',
        EPIC_BLOCK_SLIDER_PLUGIN_URL . 'dist/editor.css',
        array('wp-edit-blocks'),
        EPIC_BLOCKS_SLIDER_ESNEXT_VERSION
    );

    wp_register_style(
        'epicslider-blocks-style',
        EPIC_BLOCK_SLIDER_PLUGIN_URL . 'dist/style.css',
        [],
        EPIC_BLOCKS_SLIDER_ESNEXT_VERSION
    );
        
                epicslider_blocks_register_block_type('firstslider');
                epicslider_blocks_register_block_type('epictext');
                epicslider_blocks_register_block_type('epicsliderbutton');
                epicslider_blocks_register_block_type('waveslider');
                epicslider_blocks_register_block_type('portraitimg');
                epicslider_blocks_register_block_type('smallslider');
                epicslider_blocks_register_block_type('imagetextslide');
            
            if ( function_exists( 'wp_set_script_translations' ) ) {
                wp_set_script_translations( 'epicslider-blocks-block', 'epicslider-blocks', EPIC_BLOCK_SLIDER_DIR . '/languages' );
            }
}

add_action('init', 'epicslider_blocks_register');
function custom_scripts() {
    wp_enqueue_style( 'owl-style' , 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.css' );
    }
    add_action( 'wp_enqueue_scripts', 'custom_scripts' );
    function epicslider_blocks_init() {
        load_plugin_textdomain( 'epicslider-blocks', false, EPIC_BLOCK_SLIDER_DIR . '/languages' );
    }
    