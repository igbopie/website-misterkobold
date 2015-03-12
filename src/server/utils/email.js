var nodemailer = require('nodemailer');
var mg = require('nodemailer-mailgun-transport');

// This is your API key that you retrieve from www.mailgun.com/cp (free up to 10K monthly emails)
var auth = {
  auth: {
    api_key: 'key-275a9e1af0dcb1697b6687f14a9eb4d2',
    domain: 'sandbox38d5e69b89534c07a52f1af49d882b2a.mailgun.org'
  }
}


var transporter = nodemailer.createTransport(mg(auth));

exports.sendContact = function (email, name, phone, comments, callback) {
  transporter.sendMail({
    from: 'misterkobold@gmail.com',
    to: 'misterkobold@gmail.com',
    subject: 'Contacto',
    text: "Nombre: "+name+"\nTelefono: "+phone+"\nEmail: "+email+"\nComentarios: "+comments
  }, callback);
}
exports.sendReclamations = function (email, name, phone, comments, callback) {
  transporter.sendMail({
    from: 'misterkobold@gmail.com',
    to: 'misterkobold@gmail.com',
    subject: 'Reclamacion',
    text: "Nombre: "+name+"\nTelefono: "+phone+"\nEmail: "+email+"\nMotivo de la reclamacion: "+comments
  }, callback);
}