<?php
/**
 * Registers the <%= post_type_class %> post type.
 *
 * @link       <%= project_url %>
 * @since      <%= version %>
 *
 * @package    <%= vendor_name %>
 */

namespace <%= namespace %>;

use <%= namespace %>\Plugin; //<%= namespace %>\Plugin( '<%= text_domain %>', '<%= version %>' );
use <%= namespace %>\Plugin\PostType;

/**
 * Registers the <%= post_type_class %> post type.
 *
 * @since      <%= version %>
 * @package    <%= vendor_name %>
 * @author     log.OSCON, Lda. <engenharia@log.pt>
 */
class <%= post_type_class %> extends PostType {

	/**
	 * Getter for post type arguments.
	 *
	 * @since  <%= version %>
	 * @return array
	 */
	public function get_args() {

		$labels = array(
			'add_new'               => \__( 'Add New <%= post_type_singular_name %>', '<%= namespace %>' ),
			'add_new_item'          => \__( 'Add New <%= post_type_singular_name %>', '<%= namespace %>' ),
			'all_items'             => \__( 'All <%= post_type_plural_name %>', '<%= namespace %>' ),
			'edit_item'             => \__( 'Edit <%= post_type_singular_name %>', '<%= namespace %>' ),
			'items_list'            => \__( '<%= post_type_plural_name %> list', '<%= namespace %>' ),
			'items_list_navigation' => \__( '<%= post_type_plural_name %> list navigation', '<%= namespace %>' ),
			'menu_name'             => \__( '<%= post_type_plural_name %>', '<%= namespace %>' ),
			'name'                  => \_x( '<%= post_type_plural_name %>', 'Post Type General Name', '<%= namespace %>' ),
			'new_item'              => \__( 'Add New <%= post_type_singular_name %>', '<%= namespace %>' ),
			'not_found'             => \__( 'Not Found', '<%= namespace %>' ),
			'not_found_in_trash'    => \__( 'Not Found', '<%= namespace %>' ),
			'parent_item_colon'     => \__( 'Parent <%= post_type_singular_name %>:', '<%= namespace %>' ),
			'search_items'          => \__( 'Search <%= post_type_plural_name %>', '<%= namespace %>' ),
			'singular_name'         => \_x( '<%= post_type_singular_name %>', 'Post Type Singular Name', '<%= namespace %>' ),
			'update_item'           => \__( 'Update <%= post_type_singular_name %>', '<%= namespace %>' ),
			'view_item'             => \__( 'View <%= post_type_singular_name %>', '<%= namespace %>' ),
			'view_items'            => \__( 'View all <%= post_type_plural_name %>', '<%= namespace %>' ),
		);

		$capabilities = array(
			'delete_posts' => 'manage_<%= post_type_slug %>s',
		);

		return array(
			'label'               => __( '<%= post_type_slug %>', '<%= namespace %>' ),
			'description'         => __( '<%= post_type_singular_name %>', '<%= namespace %>' ),
			'labels'              => $labels,
			'supports'            => array( 'title', 'editor', 'revisions' ),
			'hierarchical'        => <%= post_type_args.indexOf( 'hierarchical' ) != -1 %>,
			'public'              => <%= post_type_args.indexOf( 'public' ) != -1 %>,
			'show_ui'             => <%= post_type_args.indexOf( 'show_ui' ) != -1 %>,
			'show_in_menu'        => <%= post_type_args.indexOf( 'show_in_menu' ) != -1 %>,
			'show_in_admin_bar'   => <%= post_type_args.indexOf( 'show_in_admin_bar' ) != -1 %>,
			'show_in_nav_menus'   => <%= post_type_args.indexOf( 'show_in_nav_menus' ) != -1 %>,
			'show_in_rest'        => <%= post_type_args.indexOf( 'show_in_rest' ) != -1 %>,
			'can_export'          => <%= post_type_args.indexOf( 'can_export' ) != -1 %>,
			'has_archive'         => <%= post_type_args.indexOf( 'has_archive' ) != -1 %>,
			'exclude_from_search' => <%= post_type_args.indexOf( 'exclude_from_search' ) != -1 %>,
			'publicly_queryable'  => <%= post_type_args.indexOf( 'publicly_queryable' ) != -1 %>,
			'capability_type'     => '<%= post_type_singular_name %>',
			'capabilities'        => $capabilities,
		);
	}

	/**
	 * Register custom post type.
	 *
	 * @since <%= version %>
	 */
	public function register() {

		if ( \post_type_exists( $this->slug ) ) {
			throw new \Exception( "Post Type `{$this->slug}` already exists." );
		}

		\register_post_type( $this->slug, $this->get_args() );
	}

	/**
	 * Register hooks.
	 *
	 * @since <%= version %>
	 */
	public function register_hooks() {
		// Use for needed customization through hooks
	}
}
