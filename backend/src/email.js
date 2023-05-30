const nodemailer = require('nodemailer');
const Cron = require("croner");
const moment = require('moment');

const sendEmailWithTopic = (data) => {
    let mailOptions = {
        from: 'andrewdevvv@gmail.com',
        to: data.receiver,
        subject: data.subject,
        text: data.text,
    }

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'andrewdevvv@gmail.com',
            pass: data.nodemailerPassword
        }
    })

    const sendEmail = () => {
        transporter.sendMail(mailOptions, (error, info) => {
            if(error) {
                console.log(error)
            } else {
                console.log(`Email sent: ` + info.response)
                // Set new Date and update count(to count times topic was already sent to user)
            }
        })
    }
    
    const date = new Date();

    // const tomorrow = addDays(date, 1)
    // const fourthDay = addDays(date, 3)
    // const seventhDay = addDays(date, 6)
    // const tomorrow = addMinutes(date, 1)

    const tomorrow = moment(date).add(1, 'm').toDate();

    sendEmail()

    Cron(tomorrow, () => {
        console.log('Yay!') 
        sendEmail()
    });
}

module.exports = {
    sendEmailWithTopic,
}