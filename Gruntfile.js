module.exports = function(grunt) {
  var path = require("path");

  grunt.registerTask('pack', 'pack task.', function() {
          console.log(path.resolve(__dirname));
          grunt.file.expand({filter:'isDirectory'}, 'grunt/**').forEach(grunt.loadTasks);
          grunt.log.writeln("Working in '%s'", grunt.config('deploy_dir'));
  });

  console.log(path.resolve(__dirname));
  grunt.initConfig({
    pkg: require('./package.json'),
    absolute_root : path.resolve(__dirname),
    deploy_dir : 'release',
  });


  grunt.file.expand({filter:'isDirectory'}, 'grunt/**').forEach(grunt.loadTasks);
  grunt.log.writeln("Working in '%s'", grunt.config('deploy_dir'));

};
