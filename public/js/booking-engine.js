function openBookingModal(suiteName = 'The Atelier') {
    // We inject the modal into the body
    const modalHTML = `
        <div id="bookingModal" style="position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.9); z-index:5000; display:flex; align-items:center; justify-content:center; backdrop-filter:blur(10px);">
            <div style="background:#1A1A1A; border:1px solid #FF8800; padding:40px; width:90%; max-width:500px; position:relative;">
                <button onclick="closeModal()" style="position:absolute; top:10px; right:10px; background:none; border:none; color:#FF8800; font-size:1.5rem; cursor:pointer;">&times;</button>
                <h2 style="color:#FF8800; font-family:'Playfair Display'; text-transform:uppercase; margin-bottom:20px;">Reserve ${suiteName}</h2>
                <form id="reservationForm" style="display:flex; flex-direction:column; gap:15px;">
                    <input type="hidden" id="suiteType" value="${suiteName}">
                    <input type="text" id="guestName" placeholder="Full Name" required style="background:#050505; border:1px solid #333; color:white; padding:12px;">
                    <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
                        <input type="date" id="checkIn" required style="background:#050505; border:1px solid #333; color:white; padding:12px;">
                        <input type="date" id="checkOut" required style="background:#050505; border:1px solid #333; color:white; padding:12px;">
                    </div>
                    <select id="guests" style="background:#050505; border:1px solid #333; color:white; padding:12px;">
                        <option value="1">1 Guest</option>
                        <option value="2">2 Guests</option>
                        <option value="3+">3+ Guests</option>
                    </select>
                    <button type="submit" style="background:#FF8800; color:#050505; border:none; padding:15px; font-weight:800; text-transform:uppercase; cursor:pointer;">Confirm Reservation</button>
                </form>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    document.getElementById('reservationForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const data = {
            guestName: document.getElementById('guestName').value,
            checkIn: document.getElementById('checkIn').value,
            checkOut: document.getElementById('checkOut').value,
            suiteType: document.getElementById('suiteType').value,
            guests: document.getElementById('guests').value
        };

        // Send to our new route
        const response = await fetch('/booking/reserve', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        });
        const result = await response.json();
        if(result.success) {
            window.location.href = result.redirect; // Opens WhatsApp with the data pre-filled
        }
    });
}

function closeModal() {
    const modal = document.getElementById('bookingModal');
    if(modal) modal.remove();
}