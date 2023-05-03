const cron = require('node-cron');
const nodemailer = require('nodemailer');

// cron.schedule('* * * * *', () => {
//     console.log('Tasked scheduled with 1 minute interval');
// })

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

    transporter.sendMail(mailOptions, (error, info) => {
        if(error) {
            console.log(error)
        } else {
            console.log(`Email sent: ` + info.response)
            // Set new Date and update count(to count times topic was already sent to user)
        }
    })
}

module.exports = {
    sendEmailWithTopic,
}