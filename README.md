# grunt-css-wrap-3

> Wrap CSS rules in a namespace

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-css-wrap-3 --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-css-wrap');
```

## The "css_wrap" task

### Overview
In your project's Gruntfile, add a section named `css_wrap` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  css_wrap: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.selector
Type: `String`
Default value: `''`

The selector of the css-wrapper

#### options.skip
Type: `regex`
Default value: `''`

### Usage Examples

#### Default Options
Wrap all rules in a css-file with a certain selector.

```js
css_wrap: {
  options: {
    selector: '.my-app'
  }
  files: [{
    src: 'src/styles.css',
    dest: 'build/styles.css',
  }]
}
```

#### Wrap all contents of a release directory and add a `.wrap.css` extension
### determine the selector based on a function of the filename
```js
css_wrap: {
  options: {
    selector: function(src){
        // if the file name is release/css/baseline.css
        // then the selector will be '#baseline'
        var split_src = src.split('/');
        var file_name_parts = split_src[3].split('.');
        return '#' + file_name_parts[0];
    }
  }
  files: [{
    expand: true,
    cwd: 'release/css',
    src: ['*.css', '!*.min.css'],
    dest: 'release/css',
    ext: '.wrap.css'
  }]
}
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
 -  0.2.0: Forked to a new home, add better file processing, function can be passed as selector
 -  0.1.3: Fixed wrong dependency for module css-wrap.
 -  0.1.2: Moved business to separate module [css-wrap](https://github.com/benignware/css-wrap)
 -  0.1.1: Updated to enable processing of media queries

