var emailSender = require("../utils/email");

exports.sendContact = function (req, res) {
  var email = req.body.email;
  var name = req.body.name;
  var phone = req.body.phone;
  var comments = req.body.comment;

  emailSender.sendContact(email,name, phone, comments, function(err) {
      if(err){
        console.error(err);
        res.status(500).send('Something broke!');
      } else {
        console.log("SENT");
        res.end('It worked!');
      }
    }
  );
};

exports.sendReclamations = function (req, res) {
  var email = req.body.email;
  var name = req.body.name;
  var phone = req.body.phone;
  var comments = req.body.comment;

  emailSender.sendReclamations(email,name, phone, comments, function(err) {
      if(err){
        console.error(err);
        res.status(500).send('Something broke!');
      } else {
        console.log("SENT");
        res.end('It worked!');
      }
    }
  );
};