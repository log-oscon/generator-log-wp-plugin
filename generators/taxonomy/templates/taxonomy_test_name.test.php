<?php

use <%= namespace %>\Plugin;
use <%= namespace %>\Taxonomy\<%= taxonomy_class %>;


class <%= taxonomy_test_name %> extends PHPUnit_Framework_TestCase {

	private $plugin;
	private $brand;
	private $slug = '<%= taxonomy_slug %>';

	public function setUp() {
		\WP_Mock::setUp();

		$this->plugin = new Plugin( 'name', 'version' );
		$this->brand  = new <%= taxonomy_class %>( $this->plugin, $this->slug );
	}

	public function tearDown() {
		\WP_Mock::tearDown();

		$this->plugin = null;
		$this->brand  = null;
	}

	/**
	 * @covers <%= taxonomy_class %>::get_args
	 */
	public function test_capabilities() {

		// Mock irrelevant functions.
		\WP_Mock::wpFunction( '\_x' );
		\WP_Mock::wpFunction( '\__' );

		$expected_args = array(
			'hierarchical'      => false,
			'public'            => true,
			'show_ui'           => true,
			'show_admin_column' => true,
			'show_in_nav_menus' => true,
			'show_tagcloud'     => false,
			'capabilities'      => array(
				'assign_terms' => 'edit_posts',
				'manage_terms' => 'manage_categories',
				'edit_terms'   => 'manage_categories',
				'delete_terms' => 'manage_categories',
			),
			'show_in_rest' => true,
		);
		$args = $this->brand->get_args();

		unset( $args['labels'] );

		$this->assertEquals( $args, $expected_args, 'Only roles above Editor can manage, edit and delete terms' );
	}

	/**
	 * @covers <%= taxonomy_class %>::register non-existent taxonomy
	 */
	public function test_register_taxonomy() {
		\WP_Mock::wpFunction( 'taxonomy_exists', array(
			'times'  => 1,
			'args'   => array( $this->slug ),
			'return' => false,
		) );

		\WP_Mock::wpFunction( 'register_taxonomy', array(
			'times' => 1,
			'args'  => array(
				$this->slug,
				null,
				$this->brand->get_args()
			),
		) );

		$this->assertEmpty( $this->brand->register() );
	}

	/**
	 * @covers                    <%= taxonomy_class %>::register duplicate taxonomy
	 * @expectedException         Exception
	 * @expectedExceptionMessage  "Taxonomy `<%= taxonomy_slug %>` already exists."
	 */
	public function test_register_existent_taxonomy() {

		\WP_Mock::wpFunction( 'taxonomy_exists', array(
			'times'  => 1,
			'args'   => array( $this->slug ),
			'return' => true,
		) );

		\WP_Mock::wpFunction( 'register_taxonomy', array(
			'times' => 0,
		) );

		$this->expectException( \Exception::class );
		$this->expectExceptionMessage( "Taxonomy `{$this->slug}` already exists." );
		$this->brand->register();
	}
}
