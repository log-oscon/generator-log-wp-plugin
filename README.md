# Plugin Boilerplate Generator #

##Contributors:
log.OSCON <engenharia@log.pt>

##License: 
[GPLv2 or later](http://www.gnu.org/licenses/gpl-2.0.html)

## What it is ##

It will generate a base WordPress Plugin project with PHPUnit, WP_Mocks and Gulp tasks.

## Instalation ##

Please read [Yeoman docs](http://yeoman.io) for Yeoman installation.  

Run `generator-log-wp-plugin` from `npm`:  
`npm install -g generator-log-wp-plugin`

## Bootstrap ##
`yo log-wp-plugin` will generate a `package.json` and a `composer.php` with the specified dependencies, an `.editorconfig`, a `.gitignore`, a `phpunit.xml` and a `{plugin_name}.php`, and will create the following directories and files:

* languages/
* lib/
	* `Activator.php`
	* `Deactivator.php`
	* `I18n.php`
	* `index.php`
	* `Plugin.php`
* src/
	* scripts/
	* styles/
* templates/
* test/
	* phpunit/
		* `sample.test.php`


## Generators:
== TODO ==

## Where can I report bugs? ##
[Git issues](https://github.com/log-oscon/generator-log-wp-plugin/issues)  

## How can I contribute? ##

## Changelog ##

= 1.0.0 =
* Initial release.


## ROADMAP ##