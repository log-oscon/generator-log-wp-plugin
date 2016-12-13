<?php

/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * Dashboard. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              <%= project_url %>
 * @since             1.0.0
 * @package           <%= vendor_name %>
 *
 * @wordpress-plugin
 * Plugin Name:       <%= plugin_name %>
 * Plugin URI:        <%= plugin_url %>
 * Description:       <%= plugin_description %>
 * Version:           1.0.0
 * Author:            log.OSCON, Lda.
 * Author URI:        http://log.pt/
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       <%= text_domain %>
 * Domain Path:       /languages
 */

if ( file_exists( dirname( __FILE__ ) . '/vendor/autoload.php' ) ) {
  require_once dirname( __FILE__ ) . '/vendor/autoload.php';
}

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
  die;
}

/**
 * The code that runs during plugin activation.
 * This action is documented in lib/Activator.php
 */
\register_activation_hook( __FILE__, '<%= namespace %>Activator::activate' );

/**
 * The code that runs during plugin deactivation.
 * This action is documented in lib/Deactivator.php
 */
\register_deactivation_hook( __FILE__, '<%= namespace %>Deactivator::deactivate' );

/**
 * Begins execution of the plugin.
 *
 * @since    0.0.1
 */
\add_action( 'plugins_loaded', function () {
  $plugin = new <%= namespace %>Plugin( '<%= text_domain %>', '1.0.0' );
  $plugin->run();
} );
