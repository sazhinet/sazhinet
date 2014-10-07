'use strict';

module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.initConfig({
    clean: { dist: ['dist'] },
    copy: {
      pages: {
        cwd: 'app/',
        expand: true,
        src: '*.html',
        dest: 'dist/'
      }
    },
    watch: {
      main: {
        files: [
          'app/**/*.html',
          'app/images/*'
        ],
        tasks: ['build'],
        options: {
          events: ['changed', 'added'],
          nospawn: true
        }
      }
    },
    connect: {
      server: {
        options: {
          base: 'dist'
        }
      }
    }
  });

  grunt.registerTask('build', ['clean', 'copy']);
  grunt.registerTask('serve', ['connect:server', 'watch']);
  grunt.registerTask('test', ['build']);
  grunt.registerTask('all', ['build']);
};
