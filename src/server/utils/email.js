var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'misterkobold',
    pass: '54Trufa54'
  }
});

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