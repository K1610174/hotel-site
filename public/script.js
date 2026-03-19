const suiteIntel = {
    'The Atelier': { price: 120, img: '/images/suite1.jpg', desc: 'Designed for the visionary traveler. A spacious creative hub with unmatched natural light.', features: ['Queen Bed', 'Fiber WiFi', 'Mini Bar', 'Workstation', 'AC Unit'] },
    'The Studio': { price: 100, img: '/images/suite2.jpg', desc: 'Minimalist luxury at its finest. High-end finishes meet modern efficiency.', features: ['Full Bed', 'Smart TV', 'City View', 'Fiber WiFi', 'Glass Shower'] },
    'The Loft': { price: 150, img: '/images/suite3.jpg', desc: 'The summit of Apollo Inn. Elevated views and expansive private living space.', features: ['King Bed', 'Private Balcony', 'Bath Tub', 'Coffee Lounge', 'Vaulted Ceilings'] }
};

const sSel = document.getElementById('sSel');
if (sSel) {
    Object.keys(suiteIntel).forEach(s => {
        let opt = document.createElement('option');
        opt.value = s; opt.innerText = `${s.toUpperCase()} — $${suiteIntel[s].price} / NIGHT`;
        sSel.appendChild(opt);
    });
}

function openM(n = 'The Atelier') {
    const modal = document.getElementById('bookModal');
    modal.style.display = 'flex';
    document.getElementById('sSel').value = n;
    updateHighlight();
}

function closeM(shouldReset = false) { 
    document.getElementById('bookModal').style.display = 'none'; 
    if(shouldReset) {
        document.getElementById('bookForm').reset();
        document.getElementById('status').innerText = "";
        document.getElementById('sBtn').innerText = "CONFIRM MISSION";
    }
}

function updateHighlight() {
    const s = document.getElementById('sSel').value;
    const data = suiteIntel[s];
    document.getElementById('highlightImg').src = data.img;
    document.getElementById('highlightTitle').innerText = s;
    document.getElementById('highlightDesc').innerText = data.desc;
    
    const fList = document.getElementById('highlightFeatures');
    fList.innerHTML = '';
    data.features.forEach(f => {
        let li = document.createElement('li'); li.innerText = f;
        fList.appendChild(li);
    });
    calc();
}

function calc() {
    const s = document.getElementById('sSel').value;
    const cin = document.getElementById('cin').value;
    const cout = document.getElementById('cout').value;
    const btn = document.getElementById('sBtn');
    if(cin && cout) {
        const days = (new Date(cout) - new Date(cin)) / 86400000;
        if(days > 0) {
            btn.innerText = `CONFIRM MISSION — $${days * suiteIntel[s].price}`;
            return;
        }
    }
    btn.innerText = "CONFIRM MISSION";
}

document.getElementById('bookForm').onsubmit = async (e) => {
    e.preventDefault();
    const status = document.getElementById('status');
    status.innerText = "TRANSMITTING DATA...";
    
    const res = await fetch('/reserve', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            guestName: document.getElementById('gName').value,
            gEmail: document.getElementById('gEmail').value, // This must exist in HTML
            suiteType: document.getElementById('sSel').value,
            checkIn: document.getElementById('cin').value,
            checkOut: document.getElementById('cout').value
        })
    });
    const result = await res.json();
    if(result.success) {
        status.innerText = "MISSION CONFIRMED. PREPARING ARRIVAL.";
        status.style.color = "var(--apollo-orange)";
        setTimeout(() => closeM(true), 2500);
    }
};

document.getElementById('contactForm').onsubmit = async (e) => {
    e.preventDefault();
    const s = document.getElementById('cStatus');
    s.innerText = "SENDING TRANSMISSION...";
    const res = await fetch('/contact', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            name: document.getElementById('cName').value,
            email: document.getElementById('cEmail').value,
            message: document.getElementById('cMsg').value
        })
    });
    const result = await res.json();
    if(result.success) {
        s.innerText = "TRANSMISSION RECEIVED.";
        document.getElementById('contactForm').reset();
    }
};

/* --- NEW ADDITION: CALENDAR LOCKDOWN LOGIC --- */
document.addEventListener('DOMContentLoaded', () => {
    const cin = document.getElementById('cin');
    const cout = document.getElementById('cout');
    const btn = document.getElementById('sBtn');
    const warn = document.createElement('div');
    warn.id = 'date-warning';
    warn.className = 'm-warning';
    
    // Inject warning box above the button
    btn.parentNode.insertBefore(warn, btn);

    // 1. Lockdown: No Past Dates
    const today = new Date().toISOString().split('T')[0];
    cin.setAttribute('min', today);
    cout.setAttribute('min', today);

    // 2. Logic: Overlap & Sequence Check
    const validate = () => {
        warn.innerText = "";
        btn.disabled = false;

        if (cin.value && cout.value) {
            if (cout.value <= cin.value) {
                warn.innerText = "MISSION ERROR: CHECK-OUT MUST BE AFTER CHECK-IN";
                btn.disabled = true;
            }
            // Note: Add MongoDB overlap check here later if needed
        }
    };

    cin.addEventListener('change', validate);
    cout.addEventListener('change', validate);
});