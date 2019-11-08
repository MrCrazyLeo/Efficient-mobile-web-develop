module.exports = function(grunt){
    grunt.initConfig({
        // inline插件，将index.html转换之后保存为dist文件夹下的index.html文件
        inline: {
          dist: {
            src: 'index.html',
            dest: 'dist/index.html'
          }
        },

        // uglify插件，压缩js文件
        uglify: {
            dist: {
                files: {
                    'dist/js/album.min.js': ['src/js/album.js']
                }
            }
        },


        cssmin: {
            dist: {
                files: {
                    'dist/css/reset.min.css': ['src/css/reset.css'],
                    'dist/css/album.min.css': ['src/css/album.css']
                }
            }
        },


        concat: {
            dist: {
                src: ['dist/css/reset.min.css', 'dist/css/album.min.css'],
                dest: 'dist/css/all.min.css'
            }
        }
      });

      // 加载插件
      grunt.loadNpmTasks('grunt-inline');
      grunt.loadNpmTasks('grunt-contrib-uglify');
      grunt.loadNpmTasks('grunt-contrib-cssmin');
      grunt.loadNpmTasks('grunt-contrib-concat');

      grunt.registerTask('default', ['inline', 'uglify', 'cssmin', 'concat']);
}