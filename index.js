require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { Resend } = require('resend'); // High-speed HTTP Email API
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const resend = new Resend(process.env.RESEND_API_KEY);

// --- 1. DATABASE CONNECTION (THE BRAIN) ---
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("--- 🛰️ APOLLO DATABASE LINKED ---"))
    .catch(err => console.error("--- ⚠️ DATABASE OFFLINE:", err));

// --- 2. BOOKING SCHEMA ---
const bookingSchema = new mongoose.Schema({
    guestName: String,
    gEmail: String,
    suiteType: String,
    checkIn: Date,
    checkOut: Date,
    totalPrice: Number,
    status: { type: String, default: 'pending' }, 
    createdAt: { type: Date, default: Date.now }
});
const Booking = mongoose.model('Booking', bookingSchema);

// --- 3. MIDDLEWARE ---
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// --- 4. ROUTES ---

// NEW: Calendar Intelligence (Fetch blocked dates for frontend)
app.get('/booked-dates', async (req, res) => {
    try {
        const bookings = await Booking.find({ status: { $ne: 'cancelled' } });
        const blocked = bookings.map(b => ({
            start: b.checkIn.toISOString().split('T')[0],
            end: b.checkOut.toISOString().split('T')[0]
        }));
        res.json(blocked);
    } catch (e) {
        res.status(500).json([]);
    }
});

// UPDATED: Reserve Suite (Instant Response + Background Email)
app.post('/reserve', async (req, res) => {
    const { guestName, gEmail, suiteType, checkIn, checkOut } = req.body;
    
    // Pricing logic
    const pricing = { 'The Atelier': 120, 'The Studio': 100, 'The Loft': 150 };
    const nights = Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)) || 0;
    const total = (nights > 0 ? nights : 1) * (pricing[suiteType] || 0);

    try {
        // A. SAVE TO MONGODB (Instant)
        const newBooking = new Booking({
            guestName, gEmail, suiteType,
            checkIn: new Date(checkIn),
            checkOut: new Date(checkOut),
            totalPrice: total
        });
        await newBooking.save();

        // B. RESPOND TO FRONTEND IMMEDIATELY (No waiting!)
        res.json({ success: true, bookingId: newBooking._id });

        // C. PREPARE EMAIL CONTENT
        const mailtoLink = `mailto:${gEmail}?subject=Booking%20Confirmed%20-%20Apollo%20Inn&body=Hello%20${guestName},%0D%0A%0D%0AConfirmed:%20${suiteType}%0D%0ADates:%20${checkIn}%20to%20${checkOut}%0D%0ATotal:%20$${total}`;

        const htmlMissionBrief = `
            <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #333; background-color: #fff;">
                <div style="background-color: #050505; color: #FF8800; padding: 20px; text-align: center;">
                    <h1 style="margin: 0; letter-spacing: 2px;">APOLLO INN</h1>
                    <p style="margin: 5px 0 0; font-size: 10px; color: #EAE9E4; text-transform: uppercase;">Reservation Mission Brief</p>
                </div>
                <div style="padding: 30px;">
                    <h3>GUEST INTEL</h3>
                    <p><strong>NAME:</strong> ${guestName.toUpperCase()}</p>
                    <p><strong>EMAIL:</strong> ${gEmail}</p>
                    <hr>
                    <h3>STAY DETAILS</h3>
                    <p><strong>SUITE:</strong> ${suiteType}</p>
                    <p><strong>DATES:</strong> ${checkIn} to ${checkOut}</p>
                    <p style="font-size: 20px; color: #FF8800;"><strong>TOTAL: $${total}</strong></p>
                    <div style="margin-top: 25px; text-align: center;">
                        <a href="${mailtoLink}" style="background-color: #FF8800; color: #000; padding: 15px 25px; text-decoration: none; font-weight: bold; border-radius: 4px; display: inline-block;">✅ APPROVE & REPLY</a>
                    </div>
                </div>
                <div style="background-color: #050505; color: #fff; padding: 10px; text-align: center; font-size: 10px;">TITAN V1.1 PIPELINE ACTIVE | ID: ${newBooking._id}</div>
            </div>
        `;

        // D. FIRE-AND-FORGET EMAIL (Bypasses Render's SMTP blocks)
        resend.emails.send({
            from: 'Apollo Inn <onboarding@resend.dev>', // Replace with your domain later if you have one
            to: 'mandiek028@gmail.com',
            subject: `🚨 NEW MISSION: $${total} - ${guestName}`,
            html: htmlMissionBrief
        }).then(() => console.log("--- ✅ EMAIL TRANSMITTED VIA API ---"))
          .catch(err => console.error("--- ❌ EMAIL API ERROR:", err));

    } catch (e) {
        console.error("BOOKING LOGIC ERROR:", e);
        res.status(500).json({ success: false });
    }
});

// Simple Contact Route (Backgrounded)
app.post('/contact', (req, res) => {
    res.json({ success: true });
    resend.emails.send({
        from: 'Apollo Inn <onboarding@resend.dev>',
        to: 'mandiek028@gmail.com',
        subject: `✉️ MESSAGE: ${req.body.name}`,
        text: `From: ${req.body.name}\nEmail: ${req.body.email}\n\n${req.body.message}`
    }).catch(e => console.error(e));
});

/* --- NEW ADDITION: SERVER-SIDE VALIDATION --- */
app.use('/reserve', (req, res, next) => {
    if (req.method === 'POST') {
        const { checkIn, checkOut } = req.body;
        if (new Date(checkOut) <= new Date(checkIn)) {
            return res.status(400).json({ success: false, message: "Invalid Date Sequence" });
        }
    }
    next();
});

app.listen(PORT, '0.0.0.0', () => console.log(`--- 🚀 TITAN V1.1 ACTIVE ON PORT ${PORT} ---`));