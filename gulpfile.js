/**
 * Created by igbopie on 1/30/15.
 */
var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var del = require('del');
var uglify = require('gulp-uglify');
var htmlSnapshots = require('html-snapshots');
var buffer = require('vinyl-buffer');
var exec = require('child_process').exec;
var phantom = require('phantom');


gulp.task('default', ['clean', 'browserify', 'files:server', 'files:static', 'files:frontend', 'files:components:fa', 'files:components:bs'], function () {
    require('./build/app');
});

gulp.task('clean', function () {
    return del(['build']);
});

gulp.task('files:server', ['clean'], function () {
    return gulp.src('./src/server/**/*')
        .pipe(gulp.dest('./build/'));
});

gulp.task('files:components:fa', ['clean'], function () {
    return gulp.src(['./node_modules/font-awesome/**/*'])
        .pipe(gulp.dest('./build/public/lib/font-awesome'));
});

gulp.task('files:components:bs', ['clean'], function () {
    return gulp.src(['./node_modules/bootstrap/dist/**/*'])
        .pipe(gulp.dest('./build/public/lib/bootstrap'));
});

gulp.task('files:static', ['clean'], function () {
    return gulp.src('./static/**/*')
        .pipe(gulp.dest('./build/public/'));
});

gulp.task('files:frontend', ['clean'], function () {
    return gulp.src(['./src/frontend/**/*', '!./src/frontend/js/**'])
        .pipe(gulp.dest('./build/public/'));
});


gulp.task('browserify', ['clean'], function () {
    return browserify('./src/frontend/js/main.js')
        .bundle()
        //Pass desired output filename to vinyl-source-stream
        .pipe(source('bundle.js'))
        // Start piping stream to tasks!
        .pipe(gulp.dest('./build/public/'));
});

gulp.task('prod', ['gen-snapshots']);


gulp.task('prod:build', ['clean', 'browserify-prod', 'files:server', 'files:static', 'files:frontend', 'files:components:fa', 'files:components:bs']);


gulp.task('browserify-prod', ['clean'], function () {
    return browserify('./src/frontend/js/main.js')
        .bundle()
        //Pass desired output filename to vinyl-source-stream
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(uglify())
        // Start piping stream to tasks!
        .pipe(gulp.dest('./build/public/'));
});

gulp.task('gen-snapshots', ['prod:build'], function (cb) {
    var serverProcess = exec('node build/app', function (err, stdout, stderr) {
        cb();
    });


    setTimeout(function () {
        getUrls(function(config){
            var result = htmlSnapshots.run(config, function(){
                serverProcess.kill();
            });
        });
        //
    }, 1000)

});

var getUrls = function (done) {
    var config = {
        outputDir: 'build/public/snapshots/',
        msWaitForPages: 1000,
        snapshotScript: {
            script: "removeScripts"
        },
        input: "array",
        source: [
        ]
    };

    var sitepage = null;
    var phInstance = null;
    phantom.create()
        .then(function (ph) {
            phInstance = ph;
            return ph.createPage();
        }).then(function (page) {
        sitepage = page;
        var visited = {};
        var queue = [{url: "/"}];

        var addQueue = function (page, from) {
            if (page.indexOf("http") === 0) {
                //console.log("NOT LOCAL");
            } else if (visited[page]) {
                //console.log("VISITED:" + page);
            } else {
                //console.log("NOT VISITED:" + page);
                queue.push({url: page, from: from});
            }
        };

        var processNext = function () {
            // console.log("processNext " + queue.length);
            if (queue.length == 0) {
                config.source = Object.keys(visited).map(function(string){
                    return "http://127.0.0.1:3000" + string;
                });

                sitepage.close();
                phInstance.exit();
                done(config);
            } else {
                var next = queue.pop();
                crawlPage(next, processNext);
            }
        };

        var crawlPage = function (pageObject, callback) {
            var pageUrl = pageObject.url;
            if (visited[pageUrl]) {
                return callback()
            }
            visited[pageUrl] = pageObject;
            pageUrl = pageUrl.replace(/\/#!\//g, '/');

            console.log(pageUrl);
            var url = "http://127.0.0.1:3000" + pageUrl;
            page.open(url).then(function (status) {
                console.log("opened", status);
                setTimeout(function () {
                    page.evaluate(function () {
                        return [].map.call(document.querySelectorAll('a'), function (link) {
                            return link.getAttribute('href');
                        });
                    }).then(function (result) {

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
};