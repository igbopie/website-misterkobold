var nodemailer = require('nodemailer');
var mg = require('nodemailer-mailgun-transport');

// This is your API key that you retrieve from www.mailgun.com/cp (free up to 10K monthly emails)
var auth = {
  auth: {
    api_key: process.env.NODEMAILER_API_KEY,
    domain: process.env.NODEMAILER_DOMAIN
  }
}


var transporter = nodemailer.createTransport(mg(auth));

exports.sendContact = function (email, name, phone, comments, callback) {
  transporter.sendMail({
    from: process.env.NODEMAILER_EMAIL,
    to: process.env.NODEMAILER_EMAIL,
    subject: 'Contacto',
    text: "Nombre: "+name+"\nTelefono: "+phone+"\nEmail: "+email+"\nComentarios: "+comments
  }, callback);
}
exports.sendReclamations = function (email, name, phone, comments, callback) {
  transporter.sendMail({
    from: process.env.NODEMAILER_EMAIL,
    to: process.env.NODEMAILER_EMAIL,
    subject: 'Reclamacion',
    text: "Nombre: "+name+"\nTelefono: "+phone+"\nEmail: "+email+"\nMotivo de la reclamacion: "+comments
  }, callback);
}
