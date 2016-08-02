/*
 * grunt-css-wrap
 * https://github.com/benignware/grunt-css-wrap
 *
 * Forked and enhanced
 * https://github.com/zanzamar/grunt-css-wrap
 *
 * Copyright (c) 2014 Rafael Nowrotek
 * Licensed under the MIT license.
 *
 * Copyright (c) 2014 Zanzamar 0.1.1
 *
 */

'use strict';

var css_wrap = require( 'css-wrap' );
var path = require('path');
var util = require('util');
var chalk = require('chalk');

module.exports = function (grunt) {
  var getAvailableFiles = function (filesArray) {
    return filesArray.filter(function (filepath) {
      if (!grunt.file.exists(filepath)) {
        grunt.log.warn('Source file ' + chalk.cyan(filepath) + ' not found');
        return false;
      }
      return true;
    });
  };

  grunt.registerMultiTask('css_wrap', 'Wrap CSS rules in a namespace', function () {
    var created = {
      files: 0
    };

    this.files.forEach(function (file) {
      var options = this.options({
        // defaults
        selector: ".css-wrap"
      });

      var availableFiles = getAvailableFiles(file.src);
      var wrappedCssString = '';

      var localoptions = options;

      if( typeof(options.selector) == 'function'){
          localoptions.selector = options.selector(file.src.toString());
      }

      try {
        wrappedCssString = css_wrap( availableFiles.toString(), localoptions  );

      } catch (err) {
        grunt.log.error(err);
        grunt.warn('CSS Wrap failed at ' + availableFiles + '.');
      }



      grunt.file.write(file.dest, wrappedCssString);
      created.files++;
      grunt.verbose.writeln('File ' + chalk.cyan(file.dest) + ' created ' );

    }, this);


    if (created.files > 0) {
      grunt.log.ok(created.files + ' ' + grunt.util.pluralize(this.files.length, 'file/files') + ' created.');
    } else {
      grunt.log.warn('No files created.');
    }
  });
};
