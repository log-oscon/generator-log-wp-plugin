<?php
/**
 * Taxonomy handler.
 *
 * @link       <%= project_url %>
 * @since      <%= version %>
 *
 * @package    <%= vendor_name %>
 */

namespace <%= namespace %>;

/**
 * Taxonomy handler.
 *
 * @since      <%= version %>
 * @package    <%= vendor_name %>
 * @author     log.OSCON, Lda. <engenharia@log.pt>
 */
abstract class Taxonomy {

	/**
	 * The plugin's instance.
	 *
	 * @since  <%= version %>
	 * @access protected
	 * @var    Plugin
	 */
	protected $plugin;

	/**
	 * The taxonomy slug.
	 *
	 * @since  <%= version %>
	 * @access protected
	 * @var string
	 */
	protected $slug;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since <%= version %>
	 * @param Plugin $plugin This plugin's instance.
	 * @param string $slug   The taxonomy slug.
	 */
	public function __construct( Plugin $plugin, $slug ) {
		$this->plugin = $plugin;
		$this->slug   = $slug;
	}

	/**
	 * Register custom taxonomy.
	 *
	 * @since <%= version %>
	 */
	abstract public function register();

	/**
	 * Register hooks.
	 *
	 * @since <%= version %>
	 */
	abstract public function register_hooks();
}