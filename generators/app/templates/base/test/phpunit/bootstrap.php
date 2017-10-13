<?php

// Mocks
$require = array();

gc_disable();

// First we need to load the composer autoloader so we can use WP Mock
require_once dirname( 2 ) . '/vendor/autoload.php';

foreach ( $require as $require_file ) {
	require_once __DIR__ . '/' . $require_file;
}

// Now call the bootstrap method of WP Mock
\WP_Mock::bootstrap();
