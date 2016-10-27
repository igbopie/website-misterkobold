/**
 * Created by igbopie on 3/13/15.
 */
var Browser = require('zombie'),
  url     = require('url'),
  fs      = require('fs'),
  saveDir = __dirname + '/snapshots';

var scriptTagRegex = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;

var stripScriptTags = function(html) {
  return html.replace(scriptTagRegex, '');
}

var browserOpts = {
  waitFor: 2000,
  loadCSS: false,
  runScripts: true
}

var saveSnapshot = function(uri, body) {
  var lastIdx = uri.lastIndexOf('#/');

  if (lastIdx < 0) {
    // If we're using html5mode
    path = url.parse(uri).pathname;
  } else {
    // If we're using hashbang mode
    path =
      uri.substring(lastIdx + 1, uri.length);
  }

  if (path === '/') path = "/index.html";

  if (path.indexOf('.html') == -1)
    path += ".html";

  var filename = saveDir + path;
  fs.open(filename, 'w', function(e, fd) {
    if (e) return;
    fs.write(fd, body);
  });
};

var crawlPage = function(idx, arr) {
  // location = window.location
  if (idx < arr.length) {
    var uri = arr[idx];
    /*var browser = new Browser(browserOpts);
    var promise = browser.visit(uri, {}, function(err){
      console.log(err);
      console.log(arguments);

    });*/

    console.log('Loading a web page');
    require('webpage')
    var page = require('webpage').create();
    var url = 'http://phantomjs.org/';
    page.open(url, function (status) {
      //Page is loaded!
      phantom.exit();
    });
  }
}

crawlPage(0, ["http://localhost:3000"]);
