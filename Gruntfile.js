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
            css: {
                src: CSS_SRC,
                dest: 'dist/css/main-bundle.css'
            }
        },

        uglify: {
            main: {
                files: {
                    'dist/js/menu-bundle.js': 'dist/js/menu-bundle.js',
                    'dist/js/background-bundle.js': 'dist/js/background-bundle.js'
                }
            }
        },

        cssmin: {
            target: {
                files: {
                    'dist/css/main.css': ['src/css/*.css']
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
    grunt.registerTask('build-prod', ['clean', 'jshint', 'browserify', 'uglify', 'cssmin']);
    grunt.registerTask('default', ['build-dev', 'watch']);
}

module.exports = function(grunt) {
    requireDeps(grunt);
    initConfig(grunt);
    registerTasks(grunt);
};