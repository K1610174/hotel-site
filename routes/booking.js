const express = require('express');
const router = express.Router();

// This route processes the booking form
router.post('/reserve', (req, res) => {
    const { guestName, checkIn, checkOut, suiteType, guests } = req.body;
    
    // Mission Intel Construction
    const message = `MISSION RESERVATION:
    Guest: ${guestName}
    Suite: ${suiteType}
    Stay: ${checkIn} to ${checkOut}
    Personnel: ${guests}`;

    console.log("New Reservation Received:", message);

    // For v1.1, we return a success status. 
    // In v1.2, we can connect this to an Email API like SendGrid.
    res.json({ 
        success: true, 
        message: "Intel Received. The Apollo Inn is preparing for your arrival.",
        redirect: `https://wa.me/256762239099?text=${encodeURIComponent(message)}`
    });
});

module.exports = router;