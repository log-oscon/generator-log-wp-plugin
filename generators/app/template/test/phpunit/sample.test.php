<?php

class SampleTest extends PHPUnit_Framework_TestCase {

	public function setUp() {
		\WP_Mock::setUp();
	}

	public function tearDown() {
		\WP_Mock::tearDown();
	}

	/**
	 * @covers SampleTest
	 */
	public function test_sample() {
		$this->assertTrue(true);
	}
}
