<?php

add_action("wp_enqueue_scripts", "traking_scripts");

function traking_scripts(){
    wp_register_style( 'accordion-css', 'https://unpkg.com/accordion-js@3.1.1/dist/accordion.min.css' );
    wp_register_style( 'traking-app-style', plugin_dir_url(__FILE__).'css/app.css', array('accordion-css') );

    wp_register_script( 'react-js', 'https://unpkg.com/react@16/umd/react.production.min.js' );
    wp_register_script( 'react-dom-js', 'https://unpkg.com/react-dom@16/umd/react-dom.production.min.js', array('react-js') );
    wp_register_script( 'accordion-js', 'https://unpkg.com/accordion-js@3.1.1/dist/accordion.min.js', array('react-dom-js') );
    wp_register_script( 'traking-app-js', plugin_dir_url(__FILE__).'app.js', array('react-dom-js'), '1.1.3' );

    $nonce = wp_create_nonce( 'wp_rest' );
    $site_info = array('site_url' => get_site_url(), 'traking_nonce' => $nonce);

    wp_localize_script( 'traking-app-js', 'site_info', $site_info );
}

function traking_codes(){
    wp_enqueue_script('react-js');
    wp_enqueue_script('react-dom-js');
    wp_enqueue_script('accordion-js');
    wp_enqueue_script('traking-app-js');

    wp_enqueue_style('accordion-css');
    wp_enqueue_style('traking-app-style');

    return '<div id="traking-app"></div>';
}

add_shortcode( 'traking_codes', 'traking_codes' );

function traking_codes_modify_script_tags( $html, $handle ) {

    /** Add script attribute **/
    if( 'react-js' === $handle || 'react-dom-js' ===  $handle) {

        /* Add `crossorigin` attribute */
        $html = str_replace(
            '<script',
            '<script crossorigin',
            $html
        );
    }

    return $html;

}
add_filter( 'script_loader_tag', 'traking_codes_modify_script_tags', 10, 2 );