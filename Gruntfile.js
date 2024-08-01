module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      build: {
        files: [{
          expand: true,
          cwd: '.',
          src: ['*.js', '!*.min.js', '!atomic.js', '!Gruntfile.js'],
          dest: '.',
          ext: '.min.js'
        }]
      }
    },
    cssmin: {
      build: {
        files: [{
          expand: true,
          cwd: '.',
          src: ['*.css', '!*.min.css'],
          dest: '.',
          ext: '.min.css'
        }]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.registerTask('build', ['uglify', 'cssmin']);

};
