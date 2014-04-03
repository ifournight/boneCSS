/*global module:false*/
module.exports = function(grunt) {








    // Project configuration.
    grunt.initConfig({

        // sass config
        sass: {
            dist: {
                options: {
                    style: "nested"
                },
                files: {
                    "boneCSS/style.css": "boneCSS/style.scss"
                }
            }
        },






        watch: {
            sass: {
                files: ["boneCSS/*.scss", "boneCSS/**/*.scss"],
                tasks: ["css"],
                options: {
                    livereload: true
                }
            }
        }

    });












    grunt.loadNpmTasks("grunt-contrib-sass");
    grunt.loadNpmTasks("grunt-contrib-watch");
        
    



    grunt.registerTask("css", ["sass"]);

};
