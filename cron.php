<?php

function bl_cron_exec_traking(){
    global $wpdb;

    $table_name = $wpdb->prefix . 'traking_codes';

    $wpdb->query(
        "DELETE FROM $table_name WHERE create_at < NOW() - INTERVAL 30 DAY"
    );
}

add_action( 'bl_cron_traking', 'bl_cron_exec_traking' );

register_activation_hook(__FILE__, 'traking_activate_cron');

function traking_activate_cron(){
    if ( ! wp_next_scheduled( 'bl_cron_traking' ) ) {
        wp_schedule_event( time(), 'daily', 'bl_cron_traking' );
    }
}

register_deactivation_hook( __FILE__, 'bl_deactivate_cron_traking' ); 
 
function bl_deactivate_cron_traking() {
    $timestamp = wp_next_scheduled( 'bl_cron_traking' );
    wp_unschedule_event( $timestamp, 'bl_cron_traking' );
}


