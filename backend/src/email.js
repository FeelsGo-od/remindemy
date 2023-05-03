const nodemailer = require('nodemailer');
const schedule = require('node-schedule');

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

    const sendEmail = transporter.sendMail(mailOptions, (error, info) => {
        if(error) {
            console.log(error)
        } else {
            console.log(`Email sent: ` + info.response)
            // Set new Date and update count(to count times topic was already sent to user)
        }
    })

    sendEmail
      
    function addDays(date, days) {
        const dateCopy = new Date(date);
        dateCopy.setDate(date.getDay() + days);
    
        return dateCopy;
    }
    
    const date = new Date();

    const tomorrow = addDays(date, 1)
    const fourthDay = addDays(date, 3)
    const seventhDay = addDays(date, 6)
    
    const job = schedule.scheduleJob(tomorrow, () => {
        sendEmail
    })
    
    const job2 = schedule.scheduleJob(fourthDay, () => {
        sendEmail
    })
    
    const job3 = schedule.scheduleJob(seventhDay, () => {
        sendEmail
    })
}

module.exports = {
    sendEmailWithTopic,
}