<?php
/**
 * Registers the <%= taxonomy_class %> taxonomy.
 *
 * @link       <%= project_url %>
 * @since      <%= version %>
 *
 * @package    <%= vendor_name %>
 */

namespace <%= namespace %>;

use \<%= namespace %>\Plugin; //<%= namespace %>\Plugin( '<%= text_domain %>', '<%= version %>' );
use \<%= namespace %>\Plugin\Taxonomy;

/**
 * Registers the <%= taxonomy_class %> taxonomy.
 *
 * @since      <%= version %>
 * @package    <%= vendor_name %>
 * @author     log.OSCON, Lda. <engenharia@log.pt>
 */
class <%= taxonomy_class %> extends Taxonomy {

	/**
	 * Getter for taxonomy capabilities
	 *
	 * @since  <%= version %>
	 * @return array
	 */
	public function get_args() {

		$labels = array(
			'name'                       => \_x( '<%= taxonomy_plural_name %>', 'Taxonomy General Name', '<%= namespace %>' ),
			'singular_name'              => \_x( '<%= taxonomy_singular_name %>', 'Taxonomy Singular Name', '<%= namespace %>' ),
			'menu_name'                  => \__( '<%= taxonomy_plural_name %>', '<%= namespace %>' ),
			'all_items'                  => \__( 'All <%= taxonomy_plural_name %>', '<%= namespace %>' ),
			'parent_item'                => \__( 'Parent <%= taxonomy_singular_name %>', '<%= namespace %>' ),
			'parent_item_colon'          => \__( 'Parent <%= taxonomy_singular_name %>:', '<%= namespace %>' ),
			'new_item_name'              => \__( 'New <%= taxonomy_singular_name %>', '<%= namespace %>' ),
			'add_new_item'               => \__( 'Add New <%= taxonomy_singular_name %>', '<%= namespace %>' ),
			'edit_item'                  => \__( 'Edit <%= taxonomy_singular_name %>', '<%= namespace %>' ),
			'update_item'                => \__( 'Update <%= taxonomy_singular_name %>', '<%= namespace %>' ),
			'view_item'                  => \__( 'View <%= taxonomy_singular_name %>', '<%= namespace %>' ),
			'separate_items_with_commas' => \__( 'Separate <%= taxonomy_plural_name %> with commas', '<%= namespace %>' ),
			'add_or_remove_items'        => \__( 'Add or remove <%= taxonomy_plural_name %>', '<%= namespace %>' ),
			'choose_from_most_used'      => \__( 'Choose from the most used', '<%= namespace %>' ),
			'popular_items'              => \__( 'Popular <%= taxonomy_plural_name %>', '<%= namespace %>' ),
			'search_items'               => \__( 'Search <%= taxonomy_plural_name %>', '<%= namespace %>' ),
			'not_found'                  => \__( 'Not Found', '<%= namespace %>' ),
			'no_terms'                   => \__( 'No <%= taxonomy_plural_name %>', '<%= namespace %>' ),
			'items_list'                 => \__( '<%= taxonomy_plural_name %> list', '<%= namespace %>' ),
			'items_list_navigation'      => \__( '<%= taxonomy_plural_name %> list navigation', '<%= namespace %>' ),
		);

		$capabilities = array(
			'assign_terms' => 'edit_posts',
			'manage_terms' => 'manage_categories',
			'edit_terms'   => 'manage_categories',
			'delete_terms' => 'manage_categories',
		);

		return array(
			'labels'            => $labels,
			'hierarchical'      => <%= taxonomy_args.indexOf('hierarchical') !== -1 %>,
			'public'            => <%= taxonomy_args.indexOf('public') !== -1 %>,
			'show_ui'           => <%= taxonomy_args.indexOf('show_ui') !== -1 %>,
			'show_admin_column' => <%= taxonomy_args.indexOf('show_admin_column') !== -1 %>,
			'show_in_nav_menus' => <%= taxonomy_args.indexOf('show_in_nav_menus') !== -1 %>,
			'show_tagcloud'     => <%= taxonomy_args.indexOf('show_tagcloud') !== -1 %>,
			'show_in_rest'      => <%= taxonomy_args.indexOf('show_in_rest') !== -1 %>,
			'capabilities'      => $capabilities,
		);
	}

	/**
	 * Register custom taxonomy.
	 *
	 * @since <%= version %>
	 */
	public function register() {

		if ( \taxonomy_exists( $this->slug ) ) {
			throw new \Exception( "Taxonomy `{$this->slug}` already exists." );
		}

		\register_taxonomy( $this->slug, null, $this->get_args() );
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
