module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                mangle: true,
                report: 'gzip',
                compress: {
                    drop_console: true
                }
            },
            home: {
                files: {
                    './build/minimasonry.min.js' : [
                        './src/minimasonry.js'
                    ]
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('compile', ['uglify']);
}
