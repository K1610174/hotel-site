const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    guestName: String,
    gEmail: String,
    suiteType: String,
    checkIn: Date,
    checkOut: Date,
    totalPrice: Number,
    status: { type: String, default: 'pending' }, // 'pending', 'confirmed', or 'cancelled'
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', bookingSchema);