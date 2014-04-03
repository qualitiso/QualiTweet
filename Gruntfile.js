function requireDeps(grunt) {
    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);
}

function initConfig(grunt) {
    'use strict';

    var JS_SRC = ['src/scripts/**/*.js'],
        SASS_FILES = {
            'dist/stylesheets/menu.css': 'src/stylesheets/menu.scss',
            'dist/stylesheets/page.css': 'src/stylesheets/page.scss',
            'dist/stylesheets/filters.css': 'src/stylesheets/filters.scss'
        };

    grunt.initConfig({

        watch: {
            js: {
                files: JS_SRC,
                tasks: ['jshint','clean:js','browserify']
            },

            sass: {
                files: 'src/stylesheets/**/*.scss',
                tasks: ['scsslint', 'clean:sass','sass:dev']
            }
        },

        jshint: {
            files: {
                src: JS_SRC
            },
            options: {
                jshintrc: '.jshintrc'
            }
        },

        clean: {
            js: ["dist/scripts/*"],
            sass: ["dist/stylesheets/"]
        },

        browserify: {
            dist: {
                files: {
                    'dist/scripts/page.js': 'src/scripts/page/page.js',
                    'dist/scripts/background.js': 'src/scripts/background/background.js',
                    'dist/scripts/menu.js': 'src/scripts/menu/menu.js'
                },
                options: {
                    debug: true
                }
            }
        },

        scsslint: {
            allFiles: [
                'src/stylesheets/*.scss'
            ],
            options: {
                config: './.scss-lint.yml'
            }
        },

        sass: {
            dev: {
                options: {
                    sourcemap: true,
                    lineNumbers: true
                },
                files: SASS_FILES
            },
            prod: {
                options: {
                    style: 'compressed'
                },
                files: SASS_FILES
            }
        },

        uglify: {
            main: {
                files: {
                    'dist/scripts/background.js': ['dist/scripts/background.js'],
                    'dist/scripts/page.js': ['dist/scripts/page.js'],
                    'dist/scripts/menu.js': ['dist/scripts/menu.js']
                }
            }
        }
    });
}

function registerTasks(grunt) {
    grunt.registerTask('quality', ['scsslint', 'jshint']);
    grunt.registerTask('build-dev', ['quality', 'clean', 'sass:dev', 'browserify']);
    grunt.registerTask('build-prod', ['quality', 'clean', 'sass:prod', 'browserify', 'uglify']);
    grunt.registerTask('default', ['build-dev', 'watch']);
}

module.exports = function(grunt) {
    requireDeps(grunt);
    initConfig(grunt);
    registerTasks(grunt);
};