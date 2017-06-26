module.exports = function(grunt) {

    grunt.initConfig({

        clean: {
            dev: {
                src: ["src/css/*"]
            },
            prod: {
                src: ["build/*", "build/**/*"]
            }
        },
        jshint: {

            dev: {
                src: ["src/js/**/*.js", "!src/js/libs/*.js"],
                options: {
                    eqeqeq: true
                }
            }
        },
        sass: {
            dev: {
                outputStyle: 'expanded',
                files: {
                    'src/css/style.css': 'src/sass/style.scss' // 'destination': 'source'
                }
            }
        },
        autoprefixer: {
            dev: {
                options: {
                    browsers: ['last 5 versions']
                },
                src: "src/css/*.css"
            }
        },
        csslint: {

            dev: {
                src: "src/css/*.css"
            }

        },
        concat: {

            options: {
                separator: ";"
            },
            prod: {
                files: {
                    "build/js/scripts.js": "src/js/**/*.js"
                }
            }

        },
        uglify: {
            prod: {
                files: {
                    "build/js/scripts.min.js": "build/js/scripts.js"
                }
            }
        },
        cssmin: {
            options: {
                mergeIntoShorthands: false,
                roundingPrecision: -1
            },
            prod: {
                files: {
                    "build/css/style.min.css": "src/css/style.css"
                }
            }
        },
        htmlmin: {
            options: {
                removeComments: true,
                collapseWhitespace: true
            },
            prod: {
                files: {
                    "build/index.html": "src/index.html", // 'destination': 'source'
                }
            }
        },
        imagemin: {

            options: {
                optimizationLevel: 3
            },
            prod: {
                files: [{
                    expand: true,
                    cwd: "src/images/",
                    src: "*",
                    dest: "build/images/"
                }]

            }
        },

        watch: {
            dev: {
                files: ["src/**/*"],
                tasks: ["dev"],
                // you must install LiveReload (Chrome plugin) or create script in HTML:
                // <script src="//localhost:35729/livereload.js"></script>
                options: {
                    livereload: true,
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask("dev", ["clean", "jshint", "sass", "autoprefixer"]);
    grunt.registerTask("prod", ["concat", "uglify", "cssmin", "htmlmin", "imagemin"]);
    grunt.registerTask("default", ["dev"]);

    grunt.registerTask("build", ["dev", "prod"]);
};
