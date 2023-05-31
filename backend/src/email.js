const nodemailer = require('nodemailer');
const Cron = require("croner");
const moment = require('moment');

const sendEmailWithTopic = (data) => {
    let mailOptions = {
        from: 'andrewdevvv@gmail.com',
        to: data.receiver,
        subject: data.subject,
        html: data.html ? data.html : '',
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
            }
        })
    }
    
    const date = new Date();
    // const timezoneName = Intl.DateTimeFormat().resolvedOptions().timeZone;

    // const tomorrow = addDays(date, 1)
    // const fourthDay = addDays(date, 3)
    // const seventhDay = addDays(date, 6)
    // const tomorrow = addMinutes(date, 1)

    // const tomorrow = moment(date).add(5, 'm').toDate();

    sendEmail()

    // Cron(tomorrow, { timezone: timezoneName }, () => {
    //     sendEmail()
    // });
}

module.exports = {
    sendEmailWithTopic,
}