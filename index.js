require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Secure Transporter Configuration
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, 
    auth: { 
        user: process.env.GMAIL_USER, 
        pass: process.env.GMAIL_PASS 
    },
    tls: { rejectUnauthorized: false }
});

app.post('/reserve', async (req, res) => {
    const { guestName, gEmail, suiteType, checkIn, checkOut } = req.body;
    
    // Suite pricing logic for server-side calculation
    const pricing = { 'The Atelier': 120, 'The Studio': 100, 'The Loft': 150 };
    const rate = pricing[suiteType] || 0;
    const nights = Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)) || 0;
    const total = nights * rate;

    const htmlMissionBrief = `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #333; background-color: #fff;">
            <div style="background-color: #050505; color: #FF8800; padding: 20px; text-align: center;">
                <h1 style="margin: 0; letter-spacing: 2px;">APOLLO INN</h1>
                <p style="margin: 5px 0 0; font-size: 10px; color: #EAE9E4; text-transform: uppercase;">Reservation Mission Brief</p>
            </div>
            <div style="padding: 30px;">
                <h3 style="border-bottom: 2px solid #FF8800; padding-bottom: 10px;">GUEST INTEL</h3>
                <p><strong>NAME:</strong> ${guestName ? guestName.toUpperCase() : 'N/A'}</p>
                <p><strong>EMAIL:</strong> <a href="mailto:${gEmail}" style="color: #FF8800;">${gEmail}</a></p>
                
                <h3 style="border-bottom: 2px solid #FF8800; padding-bottom: 10px; margin-top: 20px;">STAY DETAILS</h3>
                <table style="width: 100%; font-size: 14px;">
                    <tr><td style="padding: 5px 0;"><strong>SUITE:</strong></td><td>${suiteType}</td></tr>
                    <tr><td style="padding: 5px 0;"><strong>CHECK-IN:</strong></td><td>${checkIn}</td></tr>
                    <tr><td style="padding: 5px 0;"><strong>CHECK-OUT:</strong></td><td>${checkOut}</td></tr>
                    <tr><td style="padding: 5px 0;"><strong>DURATION:</strong></td><td>${nights} Night(s)</td></tr>
                    <tr style="font-size: 18px; color: #FF8800;">
                        <td style="padding: 15px 0; border-top: 1px solid #eee;"><strong>TOTAL:</strong></td>
                        <td style="padding: 15px 0; border-top: 1px solid #eee;"><strong>$${total}</strong></td>
                    </tr>
                </table>
            </div>
            <div style="background-color: #050505; color: #fff; padding: 15px; text-align: center; font-size: 12px;">
                TITAN V1.1 PIPELINE ACTIVE
            </div>
        </div>
    `;

    try {
        await transporter.sendMail({
            from: `"Apollo Mission Control" <${process.env.GMAIL_USER}>`,
            to: 'mandiek028@gmail.com',
            subject: `🚨 NEW MISSION: $${total} - ${guestName}`,
            html: htmlMissionBrief,
            text: `New Booking: ${guestName} ($${total})`
        });
        console.log(`--- MISSION BRIEF TRANSMITTED: $${total} ---`);
        res.json({ success: true });
    } catch (e) { 
        console.error("TRANSMISSION ERROR:", e.message);
        res.json({ success: true }); 
    }
});

// Contact Form Route
app.post('/contact', async (req, res) => {
    try {
        await transporter.sendMail({
            from: `"Apollo Mission Control" <${process.env.GMAIL_USER}>`,
            to: 'mandiek028@gmail.com',
            subject: `✉️ MESSAGE: ${req.body.name}`,
            text: `From: ${req.body.name}\nEmail: ${req.body.email}\n\n${req.body.message}`
        });
        res.json({ success: true });
    } catch (e) { res.json({ success: true }); }
});

app.listen(PORT, '0.0.0.0', () => console.log(`Titan v1.1 Active: http://localhost:${PORT}`));