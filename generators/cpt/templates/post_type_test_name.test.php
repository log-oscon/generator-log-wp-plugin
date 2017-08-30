<?php

use <%= namespace %>\Plugin;
use <%= namespace %>\PostType\<%= post_type_test_class %>;


class <%= post_type_test_class %> extends PHPUnit_Framework_TestCase {

	private $plugin;
	private $brand;
	private $slug = '<%= post_type_slug %>';

	public function setUp() {
		\WP_Mock::setUp();

		$this->plugin = new Plugin( 'name', 'version' );
		$this->brand  = new <%= post_type_class %>( $this->plugin, $this->slug );
	}

	public function tearDown() {
		\WP_Mock::tearDown();

		$this->plugin = null;
		$this->brand  = null;
	}

	/**
	 * @covers <%= post_type_class %>::get_args
	 */
	public function test_capabilities() {

		// Mock irrelevant functions.
		\WP_Mock::wpFunction( '\_x' );
		\WP_Mock::wpFunction( '\__' );

		$expected_args = array(
			'hierarchical'        => false,
			'public'              => true,
			'show_ui'             => true,
			'show_in_menu'        => true,
			'show_in_admin_bar'   => true,
			'show_in_nav_menus'   => true,
			'show_in_rest'        => true,
			'can_export'          => false,
			'has_archive'         => true,
			'exclude_from_search' => false,
			'publicly_queryable'  => true,
			'capabilities'        => array(
				'delete_posts'       => 'manage_<%= post_type_slug %>s',
			),
		);
		$args = $this->brand->get_args();

		unset( $args['labels'] );

		$this->assertEquals( $args, $expected_args, 'Only roles above Editor can manage, edit and delete terms' );
	}

	/**
	 * @covers <%= post_type_class %>::register non-existent post type
	 */
	public function test_register_post_type() {
		\WP_Mock::wpFunction( 'post_type_exists', array(
			'times'  => 1,
			'args'   => array( $this->slug ),
			'return' => false,
		) );

		\WP_Mock::wpFunction( 'register_post_type', array(
			'times' => 1,
			'args'  => array(
				$this->slug,
				$this->brand->get_args(),
			),
		) );

		$this->assertEmpty( $this->brand->register() );
	}

	/**
	 * @covers                    <%= post_type_class %>::register duplicate post type
	 * @expectedException         Exception
	 * @expectedExceptionMessage  "Post Type `<%= post_type_slug %>` already exists."
	 */
	public function test_register_existent_post_type() {

		\WP_Mock::wpFunction( 'post_type_exists', array(
			'times'  => 1,
			'args'   => array( $this->slug ),
			'return' => true,
		) );

		\WP_Mock::wpFunction( 'register_post_type', array(
			'times' => 0,
		) );

		$this->expectException( \Exception::class );
		$this->expectExceptionMessage( "Post Type `{$this->slug}` already exists." );
		$this->brand->register();
	}
}
