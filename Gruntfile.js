/*global module:false*/
var LIVERELOAD_PORT = 35711;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    connect: {
      options: {
        port: 8080
      },
      server: {
        options: {
          port: 8080,
          hostname: '0.0.0.0'
        }
      },
      livereload: {
        options: {
          middleware: function (connect) {
            return [ lrSnippet, mountFolder(connect, 'app') ];
          }
        }
      }
    },

    //setup watch tasks
    watch: {
      options: {
        nospan: true,
        livereload: LIVERELOAD_PORT
      },
      livereload:{
        options: {
          livereload:LIVERELOAD_PORT
        },
        files:[
          'app/*.html',
          'app/styles/*.css'
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask('default', ['serve']);
  grunt.registerTask('serve', ['connect:livereload', 'watch']);
};
