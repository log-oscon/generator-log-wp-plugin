# Plugin Boilerplate Generator #

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


## Sub-Generators:
Aditional sub-generators to generate/update files to enhance your plugin.
### Taxonomy
`yo log-wp-plugin:taxonomy` will generate inside the plugin's `lib` folder the following files and directories:

* lib/
    * `Taxonomy.php`
    * Taxonomy/
       * `{taxonomy_class}.php`
* test/
    * phpunit/
        * `{taxonomy_test_name}.test.php`

It will be displayed the necessary code-block to be added in the Plugin to the correct taxonomy registry.

### Custom Post Type
`yo log-wp-plugin:cpt` will generate inside the plugin's `lib` folder the following files and directories:

* lib/
    * `PostType.php`
    * PostType/
       * `{post_type_class}.php`
* test/
    * phpunit/
        * `{post_type_test_name}.test.php`

It will be displayed the necessary code-block to be added in the Plugin to the correct taxonomy registry.

## Where can I report bugs? ##
[Git issues](https://github.com/log-oscon/generator-log-wp-plugin/issues)

## Changelog ##
* 1.0.0
	* Initial release;
    * Bootstrap of plugins structure;
	* Sub-generator for `Taxonomy`.
* 1.1.0
	* Sub-generator for `Custom Post Type`.

## ROADMAP ##
* Sub-generator for `Frontend` type files
* Sub-generator for `WP-API EndPoint`
* Sub-generator for `Widget`
* App prompting refactor and field validation


## Contributors: ##
* log.OSCON <engenharia@log.pt>
* [Edygar de Lima](https://github.com/edygar)
* [Ricardo Castelhano](https://github.com/RicCastelhano)
* [Rui Barbosa](https://github.com/narayon)

## License: ##
[GPL-2.0 or later](http://www.gnu.org/licenses/gpl-2.0.html)
