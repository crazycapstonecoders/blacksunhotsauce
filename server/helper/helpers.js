const nodeMailer = require('nodemailer')

exports.sendEmail = emailData => {
    const transporter = nodeMailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    })
    return transporter.sendMail(emailData)
        .then(info => console.log(`Message send: ${info.response}`))
        .catch(error => console.log(`Problem sending email: ${error}`))
}