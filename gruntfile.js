'use strict';
module.exports = function (grunt) {
  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);
  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);
  // Define the configuration for all the tasks
  grunt.initConfig({

    // connect server
    connect: {
      options:{
        port: 9000,
        hostname: 'localhost',
        livereload: 35729,
      },
      livereload: {
        options: {
          open: true,
          base: [
            'public'
          ]
        }
      }
    },

    // concat js files

    less: {
      development: {
        files: {
          'public/production/production.css': 'less/main.less' 
        }
      }
    },

    // Prefixer

    autoprefixer: {
      options: {
        browsers: ['last 2 versions', 'ie 8', 'ie 9']
      },
      files: {
        src: 'public/production/production.css',
        dest: 'public/production/production.css'
      }
    },
    concat: {
      options: {
        separator: grunt.util.linefeed + ';' + grunt.util.linefeed,
      },
      dist: {
        src: [
          'bower_components/jquery/dist/jquery.min.js',
          'bower_components/bootstrap/dist/js/bootstrap.min.js',
          'js/script.js'
         ],
        dest: 'public/production/production.js',
      },
    },

    //minify css

    cssmin: {
      minify: {
        src: 'public/production/production.css',
        dest: 'public/production/production.css'
      }
    },

    // watch task

    watch: {
      livereload: {
        options: {
            livereload: '<%= connect.options.livereload %>'
        },
        files: [
            'public/{,*/}*.html',
            'js/{,*/}*.js',
            'less/{,*/}*.less'
        ]
      },
      scripts: {
        files: ['js/{,*/}*.js'],
        tasks: ['concat'],
        options: {
          spawn: false
        }
      },
      css: {
        files: ['less/{,*/}*.less'],
        tasks: ['less','autoprefixer']
      }
    }
  });

  grunt.registerTask('serve',[
    'connect',
    'watch'
  ]);
  grunt.registerTask('build', [
    'concat','less','autoprefixer','cssmin'
  ]);
};