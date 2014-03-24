/*global module:false*/
module.exports = function(grunt) {








  // Project configuration.
  grunt.initConfig({

    // sass config
    sass: {
      dist: {
        options: {
          style: "expanded"
        },
        files: {
          "css/grid.css": "_css/grid.scss",
          "css/grid-r.css": "_css/grid-r.scss",
          "css/btn.css": "_css/btn.scss",
          "css/form.css": "_css/form.scss",
          "css/menu.css": "_css/menu.scss",

          "css/dropdown-menu.css": "_css/dropdown-menu.scss",
          "css/style.css": "_css/style.scss"
        }
      }
    },






    watch: {
      sass: {
        files: "_css/*.scss",
        tasks: ["css"],
        options: {
          livereload: true
        }
      },
      html: {
        files: "*.html",
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
