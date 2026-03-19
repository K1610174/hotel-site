const suiteIntel = {
    'The Atelier': { price: 120, img: '/images/suite1.jpg', desc: 'A masterclass in space and light for creators.', features: ['Queen Bed', 'Fiber WiFi', 'Mini Bar', 'Workstation', 'AC'] },
    'The Studio': { price: 100, img: '/images/suite2.jpg', desc: 'Sleek, modern efficiency.', features: ['Full Bed', 'Smart TV', 'City View', 'Fiber WiFi', 'Shower'] },
    'The Loft': { price: 150, img: '/images/suite3.jpg', desc: 'Panoramic views and ultimate luxury.', features: ['King Bed', 'Private Balcony', 'Bath Tub', 'Coffee Lounge', 'Vaulted'] }
};

const sSel = document.getElementById('sSel');
Object.keys(suiteIntel).forEach(s => {
    let opt = document.createElement('option');
    opt.value = s; opt.innerText = `${s} - $${suiteIntel[s].price}/night`;
    sSel.appendChild(opt);
});

function openM(n = 'The Atelier') {
    document.getElementById('bookModal').style.display = 'flex';
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
            btn.innerText = `CONFIRM - $${days * suiteIntel[s].price}`;
            return;
        }
    }
    btn.innerText = "CONFIRM MISSION";
}

document.getElementById('bookForm').onsubmit = async (e) => {
    e.preventDefault();
    const status = document.getElementById('status');
    status.innerText = "TRANSMITTING DATA...";
    status.style.color = "var(--apollo-orange)";
    
    const res = await fetch('/reserve', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            guestName: document.getElementById('gName').value,
            suiteType: document.getElementById('sSel').value,
            checkIn: document.getElementById('cin').value,
            checkOut: document.getElementById('cout').value
        })
    });
    if((await res.json()).success) {
        status.innerText = "RESERVATION SUCCESSFUL.";
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
    if((await res.json()).success) {
        s.innerText = "MESSAGE SENT SUCCESSFULLY.";
        document.getElementById('contactForm').reset();
    }
};