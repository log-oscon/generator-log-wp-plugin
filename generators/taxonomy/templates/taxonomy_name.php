<?php
/**
 * Registers the <%= taxonomy_name %> taxonomy.
 *
 * @link       <%= project_url %>
 * @since      <%= version $>
 *
 * @package    <%= vendor_name %>
 */

namespace <%= namespace %>;

use \<%= namespace %>\Plugin; //<%= namespace %>\Plugin( '<%= text_domain %>', '1.0.0' );
use \<%= namespace %>\Plugin\Taxonomy;

/**
 * Registers the <%= taxonomy_name %> taxonomy.
 *
 * @since      <%= version %>
 * @package    <%= vendor_name %>
 * @author     log.OSCON, Lda. <engenharia@log.pt>
 */
class <%= taxonomy_name %> extends Taxonomy {

	/**
	 * Getter for taxonomy capabilities
	 *
	 * @since  1.0.0
	 * @return array
	 */
	public function get_args() {

		$labels = array(
			'name'                       => \_x( '<% Fill in %>', 'Taxonomy General Name', '<%= text_domain %>' ),
			'singular_name'              => \_x( '<% Fill in %>', 'Taxonomy Singular Name', '<%= text_domain %>' ),
			'menu_name'                  => \__( '<% Fill in %>', '<%= text_domain %>' ),
			'all_items'                  => \__( '<% Fill in %>', '<%= text_domain %>' ),
			'parent_item'                => \__( '<% Fill in %>', '<%= text_domain %>' ),
			'parent_item_colon'          => \__( '<% Fill in %>', '<%= text_domain %>' ),
			'new_item_name'              => \__( '<% Fill in %>', '<%= text_domain %>' ),
			'add_new_item'               => \__( '<% Fill in %>', '<%= text_domain %>' ),
			'edit_item'                  => \__( '<% Fill in %>', '<%= text_domain %>' ),
			'update_item'                => \__( '<% Fill in %>', '<%= text_domain %>' ),
			'view_item'                  => \__( '<% Fill in %>', '<%= text_domain %>' ),
			'separate_items_with_commas' => \__( '<% Fill in %>', '<%= text_domain %>' ),
			'add_or_remove_items'        => \__( '<% Fill in %>', '<%= text_domain %>' ),
			'choose_from_most_used'      => \__( '<% Fill in %>', '<%= text_domain %>' ),
			'popular_items'              => \__( '<% Fill in %>', '<%= text_domain %>' ),
			'search_items'               => \__( '<% Fill in %>', '<%= text_domain %>' ),
			'not_found'                  => \__( '<% Fill in %>', '<%= text_domain %>' ),
			'no_terms'                   => \__( '<% Fill in %>', '<%= text_domain %>' ),
			'items_list'                 => \__( '<% Fill in %>', '<%= text_domain %>' ),
			'items_list_navigation'      => \__( '<% Fill in %>', '<%= text_domain %>' ),
		);

		$capabilities = array(
			'assign_terms' => 'edit_posts',
			'manage_terms' => 'manage_categories',
			'edit_terms'   => 'manage_categories',
			'delete_terms' => 'manage_categories',
		);

		return array(
			'labels'            => $labels,
			'hierarchical'      => false,
			'public'            => true,
			'show_ui'           => true,
			'show_admin_column' => true,
			'show_in_nav_menus' => true,
			'show_tagcloud'     => false,
			'capabilities'      => $capabilities,
			'show_in_rest'      => true,
		);
	}

	/**
	 * Register custom taxonomy.
	 *
	 * @since 0.0.1
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
	 * @since 0.0.1
	 */
	public function register_hooks() {
		// Use for needed customization through hooks
	}
}