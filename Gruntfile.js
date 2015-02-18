function requireDeps(grunt) {
    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);
}

function initConfig(grunt) {

    var JS_SRC = ['src/js/**/*'];
    var CSS_SRC = ['menu/src/css/*.css'];

    grunt.initConfig({

        browserify: {
            menu: {
                files: {
                    'dist/js/menu-bundle.js': 'src/js/menu.js'
                },
                options: {
                    transform: ['reactify']
                }
            },
            background: {
                files: {
                    'dist/js/background-bundle.js': 'src/js/background.js'
                }
            },
            page: {
                files: {
                    'dist/js/page-bundle.js': 'src/js/page.js'
                }
            },
            filters: {
                files: {
                    'dist/js/filters-bundle.js': 'src/js/filters.js'
                }
            }
        },

        clean : ['dist/js/*', 'dist/css/*'],

        watch: {
            jsmenu: {
                files: JS_SRC,
                tasks: ['build-dev']
            },
            cssmenu: {
                files: CSS_SRC,
                tasks: ['build-dev']
            }
        },

        concat: {
            menucss: {
                src: 'src/css/menu/*.css',
                dest: 'dist/css/menu-bundle.css'
            },
            filetrscss: {
                src: 'src/css/filters/*.css',
                dest: 'dist/css/filters-bundle.css'
            }
        },

        uglify: {
            main: {
                files: {
                    'dist/js/menu-bundle.js': 'dist/js/menu-bundle.js',
                    'dist/js/background-bundle.js': 'dist/js/background-bundle.js',
                    'dist/js/filters-bundle.js': 'dist/js/filters-bundle.js',
                    'dist/js/page-bundle.js': 'dist/js/page-bundle.js'
                }
            }
        },

        cssmin: {
            target: {
                files: {
                    'dist/css/menu-bundle.css': ['dist/css/menu-bundle.css'],
                    'dist/css/filters-bundle.css': ['dist/css/filters-bundle.css']
                }
            }
        },

        jshint: {
            files: {
                src: JS_SRC
            }
        }
    });
}

function registerTasks(grunt) {
    grunt.registerTask('build-dev', ['clean', 'jshint', 'browserify', 'concat']);
    grunt.registerTask('build-prod', ['clean', 'jshint', 'browserify', 'uglify', 'concat', 'cssmin']);
    grunt.registerTask('default', ['build-dev', 'watch']);
}

module.exports = function(grunt) {
    requireDeps(grunt);
    initConfig(grunt);
    registerTasks(grunt);
};