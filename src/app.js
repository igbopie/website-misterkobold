var express = require('express');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var index = require("./server/routes/index");
var _ = require('lodash');

//ROUTES

// all environments
// In our app.js configuration
app.use(function(req, res, next) {
  var fragment = req.query._escaped_fragment_;

  // If there is no fragment in the query params
  // then we're not serving a crawler
  if (!fragment) return next();

  // If the fragment is empty, serve the
  // index page
  if (fragment === "" || fragment === "/")
    fragment = "/.html";

  // If fragment does not start with '/'
  // prepend it to our fragment
  if (fragment.charAt(0) !== "/")
    fragment = '/' + fragment;

  // If fragment does not end with '.html'
  // append it to the fragment
  if (fragment.indexOf('.html') == -1)
    fragment += ".html";

  fragment = fragment.replace(/\//g, '_');

  // Serve the static html snapshot
  try {
    var file = __dirname + "/public/snapshots/snapshot_" + fragment;
    res.sendFile(file);
  } catch (err) {
    res.send(404);
  }
});
app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.use(express.static(path.join(__dirname, 'public')));


var dpdRoutes = [];
app.get('/[^\.]+$', function(req, res, next){
  // need to be inside app.get, as attach router init is very lazy now.
  //var dpdRoutes = _(process.server.resources).pluck('name').compact().value() ;
  var first_path = req.path.split('/');

  if(dpdRoutes.indexOf(first_path[1]) > -1) // dpd requests
  {
    return next();
  }
  else // angular requests
  {
    res.sendFile("index.html", { root: __dirname + '/public' });
  }

});

app.post('/contact', index.sendContact);
app.post('/reclamation', index.sendReclamations);


http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});


