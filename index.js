require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { 
        user: process.env.GMAIL_USER || 'mandie028@gmail.com', 
        pass: process.env.GMAIL_PASS 
    }
});

app.post('/reserve', async (req, res) => {
    try {
        await transporter.sendMail({
            from: '"Apollo Mission Control" <mandie028@gmail.com>',
            to: 'mandie028@gmail.com',
            subject: `🚨 NEW BOOKING: ${req.body.guestName}`,
            text: JSON.stringify(req.body, null, 2)
        });
        res.json({ success: true });
    } catch (e) { res.json({ success: true }); }
});

app.post('/contact', async (req, res) => {
    try {
        await transporter.sendMail({
            from: '"Apollo Mission Control" <mandie028@gmail.com>',
            to: 'mandie028@gmail.com',
            subject: `✉️ MESSAGE: ${req.body.name}`,
            text: `From: ${req.body.name}\nEmail: ${req.body.email}\n\n${req.body.message}`
        });
        res.json({ success: true });
    } catch (e) { res.json({ success: true }); }
});

app.listen(PORT, '0.0.0.0', () => console.log(`Titan v1.1 Active: http://localhost:${PORT}`));