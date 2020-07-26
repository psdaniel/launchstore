const nodemailer = require('nodemailer')


module.exports = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "313d25e52db14d",
      pass: "00dd6e2a1c65d5"
    }
  })