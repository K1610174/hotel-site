require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER || 'mandie028@gmail.com',
        pass: process.env.GMAIL_PASS 
    }
});

const suiteData = {
    'The Atelier': { price: 120, img: '/suite1.jpg' },
    'The Studio': { price: 100, img: '/suite2.jpg' },
    'The Loft': { price: 150, img: '/suite3.jpg' }
};

app.post('/reserve', async (req, res) => {
    const { guestName, guestEmail, checkIn, checkOut, suiteType, total } = req.body;
    const hostMail = {
        from: '"Apollo Mission Control" <mandie028@gmail.com>',
        to: 'mandie028@gmail.com',
        subject: `🚨 NEW BOOKING: ${guestName}`,
        text: `MISSION INTEL:\n\nGuest: ${guestName}\nEmail: ${guestEmail}\nSuite: ${suiteType}\nDates: ${checkIn} to ${checkOut}\nTotal: ${total}`
    };
    try {
        await transporter.sendMail(hostMail);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false });
    }
});

app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>The Apollo Inn | Titan v1.1 Definitive</title>
            <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@300;400;600;800&display=swap" rel="stylesheet">
            <style>
                :root { --dusk-slate: #1A1A1A; --obsidian: #050505; --apollo-orange: #FF8800; --off-white: #EAE9E4; }
                * { box-sizing: border-box; scroll-behavior: smooth; }
                body { margin: 0; font-family: 'Inter', sans-serif; background-color: var(--dusk-slate); color: var(--off-white); line-height: 1.6; overflow-x: hidden; }
                
                body::after {
                    content: ""; position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                    background-image: url('https://www.transparenttextures.com/patterns/topography.png');
                    filter: invert(48%) sepia(79%) saturate(2476%) hue-rotate(86deg) brightness(118%) contrast(119%);
                    opacity: 0.08; pointer-events: none; z-index: -1;
                }

                nav { 
                    display: flex; justify-content: space-between; align-items: center;
                    padding: 0 5%; background: rgba(5, 5, 5, 0.9); 
                    backdrop-filter: blur(15px); border-bottom: 2px solid var(--apollo-orange);
                    position: sticky; top: 0; z-index: 5000; height: 160px;
                }
                .logo-titan { height: 120px; width: auto; }
                .nav-links { display: flex; gap: 40px; align-items: center; }
                .nav-links a { color: var(--off-white); text-decoration: none; font-weight: 600; font-size: 0.8rem; letter-spacing: 2px; text-transform: uppercase; transition: 0.3s; }
                .nav-links a:hover { color: var(--apollo-orange); }
                .btn-book-nav { background: var(--apollo-orange); color: #000; padding: 14px 28px; font-weight: 800; cursor: pointer; border: none; text-transform: uppercase; }

                .hero { height: 80vh; display: flex; justify-content: center; align-items: center; background: linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url('/hero.jpg'); background-size: cover; background-position: center; }
                .hero h1 { font-family: 'Playfair Display'; font-size: 6rem; letter-spacing: -3px; color: #fff; }

                .section-header { padding: 100px 5% 40px; text-align: center; }
                .section-header h2 { font-family: 'Playfair Display'; font-size: 3rem; text-transform: uppercase; margin: 0; }
                .orange-line { width: 80px; height: 4px; background: var(--apollo-orange); margin: 20px auto; }

                .suites-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 5px; padding: 0 5% 100px; }
                .suite-card { position: relative; height: 550px; overflow: hidden; background: #000; cursor: pointer; }
                .suite-card img { width: 100%; height: 100%; object-fit: cover; opacity: 0.5; transition: 1s ease; }
                .suite-card:hover img { opacity: 0.9; transform: scale(1.05); }
                .suite-label { position: absolute; bottom: 50px; left: 50px; }
                .suite-label h3 { font-family: 'Playfair Display'; font-size: 2rem; margin: 0; }
                .reserve-text { color: var(--apollo-orange); font-weight: 800; font-size: 0.8rem; letter-spacing: 3px; margin-top: 15px; display: block; }

                .light-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; padding: 0 5% 100px; }
                .light-tile { height: 400px; background: #111; border: 1px solid #222; position: relative; overflow: hidden; }
                .light-tile img { width: 100%; height: 100%; object-fit: cover; opacity: 0.2; filter: grayscale(1); transition: 0.6s; }
                .light-tile:hover img { opacity: 0.6; filter: grayscale(0); transform: scale(1.1); }
                .light-tag { position: absolute; top: 30px; left: 30px; color: var(--apollo-orange); font-weight: 800; font-size: 0.7rem; letter-spacing: 4px; text-transform: uppercase; z-index: 10; }
                .light-intel { position: absolute; bottom: 30px; left: 30px; right: 30px; z-index: 10; transform: translateY(20px); opacity: 0; transition: 0.4s; }
                .light-tile:hover .light-intel { transform: translateY(0); opacity: 1; }

                footer { background: var(--obsidian); display: grid; grid-template-columns: 1fr 1fr 1.5fr; border-top: 1px solid #333; }
                .f-col { padding: 80px 60px; border-right: 1px solid #222; }
                .f-col h4 { color: var(--apollo-orange); text-transform: uppercase; letter-spacing: 3px; margin-bottom: 40px; font-size: 1rem; }
                .f-form input, .f-form textarea { width: 100%; background: #000; border: 1px solid #333; padding: 18px; color: #fff; margin-bottom: 15px; }
                .f-form button { background: var(--apollo-orange); border: none; padding: 20px; width: 100%; font-weight: 800; cursor: pointer; }
                .f-map { filter: grayscale(1) invert(0.95); height: 100%; min-height: 500px; background: #000; }

                #bookModal { display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.98); z-index: 9999; align-items: center; justify-content: center; backdrop-filter: blur(20px); }
                .m-box { background: var(--dusk-slate); border: 1px solid var(--apollo-orange); padding: 50px; width: 95%; max-width: 480px; }
                .m-btn { width: 100%; padding: 22px; background: var(--apollo-orange); border: none; font-weight: 800; cursor: pointer; margin-top: 20px; }
                .abort { display: block; text-align: center; margin-top: 25px; color: #555; cursor: pointer; font-size: 0.75rem; text-decoration: underline; }

                @media (max-width: 1200px) { footer { grid-template-columns: 1fr; } .suites-grid, .light-grid { grid-template-columns: 1fr; } nav { height: auto; flex-direction: column; padding: 20px; } }
            </style>
        </head>
        <body>
            <nav>
                <img src="/logo.jpg" class="logo-titan">
                <div class="nav-links">
                    <a href="#suites">Suites</a>
                    <a href="#experience">Experience</a>
                    <a href="#contact">Contact</a>
                    <button class="btn-book-nav" onclick="openM()">Book Now</button>
                </div>
            </nav>

            <header class="hero"><h1>APOLLO INN</h1></header>

            <section id="suites" class="section-header"><h2>The Suite Collection</h2><div class="orange-line"></div></section>
            <section class="suites-grid">
                <div class="suite-card" onclick="openM('The Atelier')">
                    <img src="/suite1.jpg"><div class="suite-label"><h3>The Atelier</h3><span class="reserve-text">> RESERVE SPACE</span></div>
                </div>
                <div class="suite-card" onclick="openM('The Studio')">
                    <img src="/suite2.jpg"><div class="suite-label"><h3>The Studio</h3><span class="reserve-text">> RESERVE SPACE</span></div>
                </div>
                <div class="suite-card" onclick="openM('The Loft')">
                    <img src="/suite3.jpg"><div class="suite-label"><h3>The Loft</h3><span class="reserve-text">> RESERVE SPACE</span></div>
                </div>
            </section>

            <section id="experience" class="section-header"><h2>Experience Apollo</h2><div class="orange-line"></div></section>
            <section class="light-grid">
                <div class="light-tile"><img src="/dining.jpg"><span class="light-tag">Dining</span><div class="light-intel"><p>Delicious local cuisine by our master chefs.</p></div></div>
                <div class="light-tile"><img src="/bar.jpg"><span class="light-tag">The Bar</span><div class="light-intel"><p>Premium spirits in an intimate setting.</p></div></div>
                <div class="light-tile"><img src="/conference.jpg"><span class="light-tag">Conference</span><div class="light-intel"><p>WiFi and collaborative hub for digital nomads.</p></div></div>
                <div class="light-tile"><img src="/pergola.jpg"><span class="light-tag">The Pergola</span><div class="light-intel"><p>Outdoor escape for lounging and quiet drinks.</p></div></div>
                <div class="light-tile"><img src="/outdoor.jpg"><span class="light-tag">Outdoor Space</span><div class="light-intel"><p>Open-air grounds in the heart of Fort Portal.</p></div></div>
                <div class="light-tile"><img src="/city.jpg"><span class="light-tag">City Proximity</span><div class="light-intel"><p>Minutes from the vibrant city center hub.</p></div></div>
            </section>

            <footer id="contact">
                <div class="f-col">
                    <h4>Info Hub</h4>
                    <p><strong>Location:</strong> Fort Portal, Uganda</p>
                    <p><strong>Email:</strong> mandie028@gmail.com</p>
                    <p><strong>Phone:</strong> +256 000 000 000</p>
                </div>
                <div class="f-col">
                    <h4>Get In Touch</h4>
                    <form class="f-form">
                        <input type="text" placeholder="NAME">
                        <input type="email" placeholder="EMAIL">
                        <textarea placeholder="MESSAGE" rows="5"></textarea>
                        <button type="button">SEND TRANSMISSION</button>
                    </form>
                </div>
                <div class="f-map">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31913.38575001402!2d30.25268487910156!3d0.655820800000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1770938b81463177%3A0xc3f98a2873117498!2sFort%20Portal!5e0!3m2!1sen!2sug!4v1710777000000!5m2!1sen!2sug" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
                </div>
            </footer>

            <div id="bookModal">
                <div class="m-box">
                    <h2 style="color:var(--apollo-orange); text-align:center; font-family:'Playfair Display'; font-size:2.5rem;">RESERVATION</h2>
                    <form id="bookForm">
                        <select id="sSel" onchange="calc()">
                            <option value="The Atelier">The Atelier - $120/night</option>
                            <option value="The Studio">The Studio - $100/night</option>
                            <option value="The Loft">The Loft - $150/night</option>
                        </select>
                        <input type="text" id="gName" placeholder="GUEST NAME" required>
                        <input type="email" id="gEmail" placeholder="EMAIL ADDRESS" required>
                        <div style="display:flex; gap:15px;">
                            <input type="date" id="cin" required onchange="calc()" style="flex:1">
                            <input type="date" id="cout" required onchange="calc()" style="flex:1">
                        </div>
                        <button type="submit" id="sBtn" class="m-btn">TRANSMIT RESERVATION</button>
                        <a onclick="closeM()" class="abort">Abort Mission</a>
                        <div id="status" style="text-align:center; margin-top:25px; color:var(--apollo-orange); font-size:0.9rem; font-weight:800;"></div>
                    </form>
                </div>
            </div>

            <script>
                const suites = ${JSON.stringify(suiteData)};
                function openM(n = 'The Atelier') { document.getElementById('bookModal').style.display='flex'; document.getElementById('sSel').value = n; calc(); }
                function closeM() { document.getElementById('bookModal').style.display='none'; }
                function calc() {
                    const s = document.getElementById('sSel').value;
                    const cin = document.getElementById('cin').value;
                    const cout = document.getElementById('cout').value;
                    const btn = document.getElementById('sBtn');
                    if(cin && cout) {
                        const days = (new Date(cout) - new Date(cin)) / 86400000;
                        if(days > 0) { btn.innerText = "CONFIRM - $" + (days * suites[s].price); btn.dataset.total = "$" + (days * suites[s].price); return; }
                    }
                    btn.innerText = "TRANSMIT RESERVATION";
                }
                document.getElementById('bookForm').onsubmit = async (e) => {
                    e.preventDefault();
                    const status = document.getElementById('status');
                    status.innerText = "TRANSMITTING...";
                    const res = await fetch('/reserve', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            guestName: document.getElementById('gName').value,
                            guestEmail: document.getElementById('gEmail').value,
                            suiteType: document.getElementById('sSel').value,
                            checkIn: document.getElementById('cin').value,
                            checkOut: document.getElementById('cout').value,
                            total: document.getElementById('sBtn').dataset.total || "Quote Pending"
                        })
                    });
                    if((await res.json()).success) { status.innerText = "SUCCESSFUL."; setTimeout(closeM, 3000); }
                };
            </script>
        </body>
        </html>
    `);
});

app.listen(PORT, '0.0.0.0', () => console.log('Titan v1.1 Definitive Build Online'));