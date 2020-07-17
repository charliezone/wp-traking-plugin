<?php

/**
 * Plugin Name: Traking
 * Description: Create a traking system.
 * Version: 1.0
 * Author: Carlos Rafael
 * Author URI: https://www.linkedin.com/in/carlos-rafael-gonzalez-perdomo-457351146
 * License: GPL2
 */

function traking_install() {
	global $wpdb;

	$table_name = $wpdb->prefix . 'traking_codes';
	
	$charset_collate = $wpdb->get_charset_collate();

	$sql = "CREATE TABLE $table_name (
        cp varchar(15) NOT NULL,
        ci varchar(15) NOT NULL,
		create_at datetime DEFAULT CURRENT_TIMESTAMP NOT NULL,
		PRIMARY KEY  (cp)
	) $charset_collate;";

	require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );
	dbDelta( $sql );
}

register_activation_hook( __FILE__, 'traking_install' );

require_once(dirname(__FILE__).'/backend/admin.php');

