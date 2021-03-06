var express = require('express');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var index = require("./routes/index");
var _ = require('lodash');

//ROUTES

// all environments
// In our app.js configuration
app.use(function(req, res, next) {
  console.log(req.url);
  var fragment = req.query._escaped_fragment_;

  // If there is no fragment in the query params
  // then we're not serving a crawler
  if (!_.isString(fragment)) return next();


  if (fragment.charAt(0) !== "/") {
    fragment = "/" + fragment;
  }

  fragment = "#!" + fragment + "/index.html"

  // Serve the static html snapshot
  try {
    var file = __dirname + "/public/snapshots/" + fragment;
    console.log(file);
    res.sendFile(file, function(err){
      if (err) res.sendStatus(500);
    });
  } catch (err) {
    res.sendStatus(404);
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
  // html5 mode
  //res.sendFile("index.html", { root: __dirname + '/public' });
  res.writeHead(302, {
    'Location': '/#!'+req.path
    //add other headers here...
  });
  res.end();
});

app.post('/contact', index.sendContact);
app.post('/reclamation', index.sendReclamations);


http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});


