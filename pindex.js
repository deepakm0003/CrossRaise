const express = require('express');
const multer = require('multer');
const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PINDEX_PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});
const upload = multer({ storage: storage });

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

app.post('/partners', upload.single('deck'), (req, res) => {
    const { name, company, website, email, linkedin, services = [], pricing, caseStudies, message, howFindUs = [] } = req.body;
    const deckFilePath = req.file ? req.file.path : null;

    console.log('Form Data:', req.body);
    if (deckFilePath) {
        console.log('Deck File Path:', deckFilePath);
    }

    const mailOptions = {
        from: email,
        to: 'crossraise2024@gmail.com',
        subject: 'New Partner Application',
        text: `
        Name: ${name}
        Company: ${company}
        Website: ${website}
        Email: ${email}
        LinkedIn: ${linkedin}
        Services: ${services.join(', ')}
        Pricing: ${pricing}
        ${caseStudies ? `Case Studies: ${caseStudies}` : ''}
        Message: ${message}
        How did you find us: ${howFindUs.join(', ')}
        `,
        attachments: deckFilePath ? [{ path: deckFilePath }] : [],
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).send('Error sending email');
        }
        console.log('Email sent:', info.response);
        res.status(200).send('Form submitted successfully');
    });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://0.0.0.0:${PORT}`);
});
