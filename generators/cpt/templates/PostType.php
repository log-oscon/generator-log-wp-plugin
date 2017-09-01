<?php
/**
 * Post type handler.
 *
 * @link       <%= project_url %>
 * @since      <%= version %>
 *
 * @package    <%= vendor_name %>
 */

namespace <%= namespace %>;

/**
 * Post type handler.
 *
 * @since      <%= version %>
 * @package    <%= vendor_name %>
 * @author     log.OSCON, Lda. <engenharia@log.pt>
 */
abstract class PostType {

	/**
	 * The plugin's instance.
	 *
	 * @since  <%= version %>
	 * @access protected
	 * @var    Plugin
	 */
	protected $plugin;

	/**
	 * The Post type slug.
	 *
	 * @since  <%= version %>
	 * @access protected
	 * @var    string
	 */
	protected $slug;

	/**
	 * A list of taxonomies associated with the custom post type.
	 *
	 * @since  0.0.1
	 * @access protected
	 * @var    array
	 */
	protected $taxonomies = array();

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since <%= version %>
	 * @param Plugin $plugin This plugin's instance.
	 * @param string $slug   The post type slug.
	 */
	public function __construct( Plugin $plugin, $slug, $taxonomies = array() ) {
		$this->plugin     = $plugin;
		$this->slug       = $slug;
		$this->taxonomies = $taxonomies;
	}

	/**
	 * Register custom post type.
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
