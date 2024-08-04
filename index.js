const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'crossraise2024@gmail.com',
        pass: 'gfbu ffuw kvdx xaki'
    }
});

app.post('/contact', (req, res) => {
    const { name, company, email, phone, telegram, linkedin, type, message } = req.body;

    const mailOptions = {
        from: 'crossraise2024@gmail.com',
        to: 'crossraise2024@gmail.com',
        subject: 'New Contact Form Submission',
        text: `
            Name: ${name}
            Company: ${company}
            Email: ${email}
            Phone: ${phone}
            Telegram: ${telegram}
            LinkedIn: ${linkedin}
            Type: ${Array.isArray(type) ? type.join(', ') : type}
            Message: ${message}
        `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ message: 'Error sending message' });
        }
        res.status(200).json({ message: 'Message sent successfully' });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
