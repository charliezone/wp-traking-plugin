<?php
add_action( 'rest_api_init', function () {
  register_rest_route( 'traking/v1', '/get-codes', array(
    'methods' => 'POST',
    'callback' => 'getCodesByCi',
    'permission_callback' => 'nonceCheck'
  ) );
} );

function nonceCheck(WP_REST_Request $request){
    return wp_verify_nonce( $request['nonce'], 'wp_rest_traking_nonce' );
}

function getCodesByCi(WP_REST_Request $request){
    global $wpdb;
    $tablename = $wpdb->prefix."traking_codes";

    $parameters = $request->get_json_params();
    $ci = sanitize_text_field($parameters['ci']);

    $codes = $wpdb->get_results( 
        "
            SELECT cp, create_at 
            FROM $tablename
            WHERE ci = $ci
        "
    );

    if( count($codes) > 0 ){
        return json_encode(array("susses" => "true", "data" => $codes));
    }else{
        return json_encode( array("susses" => "false", "message" => "No se encontraron registros") );
    }
}