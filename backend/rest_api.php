<?php
add_action( 'rest_api_init', function () {
  register_rest_route( 'traking/v1', '/get-codes', array(
    'methods' => 'POST',
    'callback' => 'getCodesByCi',
    'permission_callback' => 'nonceCheck'
  ) );

  register_rest_route( 'traking/v1', '/track-codes', array(
    'methods' => 'POST',
    'callback' => 'trackByCodeAndYear',
    'permission_callback' => 'nonceCheck'  
  ) );
} );

function nonceCheck(WP_REST_Request $request){
    //return wp_verify_nonce( $request['nonce'], 'wp_rest_traking_nonce' );
    return true;
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
            ORDER BY create_at DESC
        "
    );

    if( count($codes) > 0 ){
        return json_encode(array("susses" => "true", "data" => $codes));
    }else{
        return json_encode( array("susses" => "false", "message" => "No se encontraron registros") );
    }
}

function trackByCodeAndYear(WP_REST_Request $request){
    $parameters = $request->get_json_params();

    $response = wp_remote_get( 'http://www.correos.cu/wp-json/correos-api/envios/'. $parameters['cp'] .'/'. 2021 .'/web/' );
        
    if($response->errors){
        return json_encode( array("susses" => "false", "message" => 'error') );
    }else{
        return json_encode(array("susses" => "true", "data" => $response ));
    }
    
}