

module.exports = function(grunt) {


  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/<%= pkg.name %>.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    },

    htmlSnapshot: {
      all: {
        options: {
          snapshotPath: 'src/public/snapshots/',
          sitePath: 'http://127.0.0.1:3000/',
          msWaitForPages: 1000,
          removeScripts: true,
          urls: [
            "/"
          ]
        }
      }
    }
  });

  grunt.registerTask('crawl', 'A sample task that logs stuff.', function() {
    var phantom = require('phantom');
    var done = this.async();


    phantom.create(function (ph) {
      ph.createPage(function (page) {

        var visited = {};
        var queue = [{url:"/"}];

        var addQueue = function (page, from) {
          if (page.indexOf("http") === 0) {
            //console.log("NOT LOCAL");
          } else if (visited[page]) {
            //console.log("VISITED:" + page);
          } else {
            //console.log("NOT VISITED:" + page);
            queue.push({url:page, from:from});
          }
        };

        var processNext = function () {
          console.log("processNext " + queue.length);
          if (queue.length == 0) {
            console.log(visited);
            var htmlSnapshot = grunt.config.get("htmlSnapshot");
            htmlSnapshot.all.options.urls = Object.keys(visited);
            console.log(htmlSnapshot);
            grunt.config.set("htmlSnapshot",htmlSnapshot);
            done();
          } else {
            var next = queue.pop();
            crawlPage(next, processNext);
          }
        };

        var crawlPage = function (pageObject, callback) {
          var pageUrl = pageObject.url;
          if (visited[pageUrl]){ return callback()};
          visited[pageUrl] = pageObject;
          pageUrl = pageUrl.replace(/\/#!\//g, '/');

          console.log(pageUrl);
          var url = "http://127.0.0.1:3000" + pageUrl;
          page.open(url, function (status) {
            console.log("opened", status);
            setTimeout(function () {
              page.evaluate(function () {
                return [].map.call(document.querySelectorAll('a'), function (link) {
                  return link.getAttribute('href');
                });
              }, function (result) {

                for (var i = 0; i < result.length; i++) {
                  addQueue(result[i], pageUrl);
                }
                console.log("Callback");
                callback();
              });
            }, 1000); // Change timeout as required to allow sufficient time
          });
        };

        processNext();
      });
    });
  });
//ph.exit();
  // Load the plugin that provides the "uglify" task.
  //grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.loadNpmTasks('grunt-html-snapshot');



  // Default task(s).
  grunt.registerTask('default', ['crawl','htmlSnapshot']);

};