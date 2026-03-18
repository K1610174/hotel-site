const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for Booking Logic
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Booking Endpoint: Formats Intel for WhatsApp Redirect
app.post('/reserve', (req, res) => {
    const { guestName, checkIn, checkOut, suiteType, guests } = req.body;
    const intel = `MISSION RESERVATION:%0A%0AGuest: ${guestName}%0ASuite: ${suiteType}%0ACheck-In: ${checkIn}%0ACheck-Out: ${checkOut}%0APersonnel: ${guests}`;
    
    // Test Number: +256741630342
    res.json({ 
        success: true, 
        url: `https://wa.me/256741630342?text=${intel}` 
    });
});

app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>The Apollo Inn | Modern Sanctuary</title>
            <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@300;400;600;800&display=swap" rel="stylesheet">
            <style>
                :root {
                    --dusk-slate: #1A1A1A;
                    --obsidian: #050505;
                    --apollo-orange: #FF8800;
                    --neon-green: #00FF00;
                    --off-white: #EAE9E4;
                    --transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
                }
                * { box-sizing: border-box; }
                body {
                    margin: 0; font-family: 'Inter', sans-serif;
                    background-color: var(--dusk-slate); color: var(--off-white);
                    line-height: 1.6; overflow-x: hidden; scroll-behavior: smooth;
                }
                /* Topographic Overlay */
                body::after {
                    content: ""; position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                    background-image: url('https://www.transparenttextures.com/patterns/topography.png');
                    filter: invert(48%) sepia(79%) saturate(2476%) hue-rotate(86deg) brightness(118%) contrast(119%);
                    opacity: 0.08; pointer-events: none; z-index: -1;
                }

                nav {
                    display: flex; position: sticky; top: 0; z-index: 2000;
                    justify-content: space-between; align-items: center;
                    padding: 1.5rem 5%; background: rgba(26, 26, 26, 0.95); backdrop-filter: blur(10px);
                    border-bottom: 1px solid #333;
                }
                .logo-img { height: 120px; width: auto; transition: 0.3s; }
                .nav-links { display: flex; align-items: center; gap: 30px; }
                .nav-links a { 
                    color: var(--apollo-orange); text-decoration: none; font-size: 0.85rem; 
                    text-transform: uppercase; font-weight: 600; letter-spacing: 2px; transition: 0.3s; 
                }
                .nav-links a:hover { color: var(--neon-green); }
                
                .btn-book-nav {
                    background: var(--apollo-orange); color: var(--obsidian) !important;
                    padding: 12px 24px; border-radius: 4px; font-weight: 800 !important;
                    cursor: pointer; border: none; text-transform: uppercase;
                }

                .hero {
                    height: 70vh; display: flex; justify-content: center; align-items: center;
                    text-align: center; background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/hero.jpg');
                    background-size: cover; background-position: center;
                }
                .hero h1 { font-family: 'Playfair Display', serif; font-size: 5rem; margin: 0; color: white; }
                .hero p { color: var(--apollo-orange); text-transform: uppercase; letter-spacing: 5px; font-size: 1rem; }

                .section-header { text-align: center; padding: 100px 0 50px; }
                .section-header h2 { font-family: 'Playfair Display', serif; font-size: 2.5rem; margin: 0; text-transform: uppercase; }
                .section-header .line { width: 50px; height: 2px; background: var(--apollo-orange); margin: 15px auto; }

                .grid-container { display: grid; gap: 20px; padding: 0 5% 100px; }
                .suites-grid {
                    grid-template-areas: "atelier studio" "atelier loft";
                    grid-template-columns: 1.3fr 1fr; grid-template-rows: 320px 320px;
                }
                .apollo-6-grid {
                    grid-template-columns: repeat(3, 1fr); grid-template-rows: repeat(2, 350px);
                }

                .card { position: relative; border: 1px solid #333; overflow: hidden; background: var(--obsidian); cursor: pointer; }
                .card img { width: 100%; height: 100%; object-fit: cover; transition: 0.6s ease; filter: grayscale(20%); }
                .card:hover img { transform: scale(1.05); filter: grayscale(0%); }

                .stealth-label {
                    position: absolute; bottom: 0; left: 0; background: var(--obsidian);
                    padding: 15px 25px; border-top: 1px solid #333; border-right: 1px solid #333; z-index: 10;
                }
                .stealth-label h3 { margin: 0; font-size: 1rem; color: var(--apollo-orange); text-transform: uppercase; }
                .stealth-label span { font-size: 0.65rem; color: var(--neon-green); display: block; margin-top: 5px; letter-spacing: 1px; }

                /* Booking Modal */
                #bookingModal {
                    display: none; position: fixed; top:0; left:0; width:100%; height:100%;
                    background: rgba(0,0,0,0.95); z-index: 5000; align-items:center; justify-content:center;
                    backdrop-filter: blur(10px);
                }
                .modal-content {
                    background: var(--dusk-slate); border: 1px solid var(--apollo-orange);
                    padding: 40px; width: 90%; max-width: 450px; position: relative;
                }
                .modal-content input, .modal-content select {
                    width: 100%; padding: 12px; margin: 10px 0; background: #000;
                    border: 1px solid #333; color: white; outline: none; font-family: inherit;
                }
                
                /* Advanced Date Picker Styling */
                .date-input-wrapper { position: relative; margin: 10px 0; }
                .date-input-wrapper label {
                    position: absolute; top: -8px; left: 10px; background: var(--dusk-slate);
                    padding: 0 5px; font-size: 0.65rem; color: var(--apollo-orange);
                    letter-spacing: 1px; z-index: 5; font-weight: 800;
                }
                input[type="date"] {
                    appearance: none; -webkit-appearance: none;
                }
                input[type="date"]::-webkit-calendar-picker-indicator {
                    filter: invert(53%) sepia(91%) saturate(2251%) hue-rotate(1deg) brightness(103%) contrast(106%);
                    cursor: pointer;
                }

                .modal-content button {
                    width: 100%; padding: 15px; background: var(--apollo-orange);
                    color: #000; border: none; font-weight: 800; cursor: pointer; margin-top: 10px;
                }

                /* Contact Hybrid Section */
                #contact-section { background: var(--obsidian); padding: 100px 5%; border-top: 1px solid #333; }
                .contact-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 60px; max-width: 1400px; margin: 0 auto; }
                .contact-column h3 { color: var(--apollo-orange); text-transform: uppercase; font-size: 1.2rem; margin-bottom: 25px; letter-spacing: 2px; }
                .info-item { margin-bottom: 20px; }
                .info-item h4 { color: var(--apollo-orange); margin: 0; font-size: 0.8rem; text-transform: uppercase; }
                .info-item p { margin: 5px 0; font-size: 0.9rem; color: var(--off-white); }
                
                .contact-form { display: flex; flex-direction: column; gap: 15px; }
                .contact-form input, .contact-form textarea { background: var(--dusk-slate); border: 1px solid #333; color: white; padding: 12px; outline: none; font-family: inherit; }
                .contact-form button { background: var(--apollo-orange); color: var(--obsidian); border: none; padding: 15px; font-weight: 800; text-transform: uppercase; cursor: pointer; transition: 0.3s; }
                .contact-form button:hover { background: var(--neon-green); }

                .map-container { min-height: 300px; border: 1px solid #333; background: #111; position: relative; }
                iframe { filter: invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%); }

                .reveal { opacity: 0; transform: translateY(30px); transition: all 0.8s ease-out; }
                .reveal.active { opacity: 1; transform: translateY(0); }

                @media (max-width: 900px) {
                    .logo-img { height: 80px; }
                    .suites-grid, .apollo-6-grid { grid-template-columns: 1fr; grid-template-areas: none; grid-auto-rows: 350px; }
                    .hero h1 { font-size: 3rem; }
                }
            </style>
        </head>
        <body>
            <nav id="top">
                <a href="#"><img src='/logo.jpg' class="logo-img"></a>
                <div class="nav-links">
                    <a href="#top">Home</a>
                    <a href="#suites">Suites</a>
                    <a href="#contact-section">Contact</a>
                    <button class="btn-book-nav" onclick="openBooking()">Book Now</button>
                </div>
            </nav>

            <header class="hero">
                <div class="hero-content">
                    <p>Modern Sanctuary</p>
                    <h1>APOLLO INN</h1>
                </div>
            </header>

            <div id="suites" class="section-header reveal">
                <h2>The Suite Collection</h2>
                <div class="line"></div>
            </div>

            <section class="grid-container suites-grid reveal">
                <div class="card" style="grid-area: atelier;" onclick="openBooking('The Atelier')">
                    <img src="/suite1.jpg">
                    <div class="stealth-label"><h3>The Atelier</h3><span>> RESERVE SPACE</span></div>
                </div>
                <div class="card" style="grid-area: studio;" onclick="openBooking('The Studio')">
                    <img src="/suite2.jpg">
                    <div class="stealth-label"><h3>The Studio</h3><span>> RESERVE SPACE</span></div>
                </div>
                <div class="card" style="grid-area: loft;" onclick="openBooking('The Loft')">
                    <img src="/suite3.jpg">
                    <div class="stealth-label"><h3>The Loft</h3><span>> RESERVE SPACE</span></div>
                </div>
            </section>

            <div class="section-header reveal">
                <h2 style="color: var(--apollo-orange)">Apollo Light</h2>
                <div class="line" style="background: var(--neon-green)"></div>
            </div>

            <section class="grid-container apollo-6-grid reveal">
                <div class="card"><img src="/bar.jpg"><div class="stealth-label"><h3>The Event Horizon</h3></div></div>
                <div class="card"><img src="/dining.jpg"><div class="stealth-label"><h3>Helios Refectory</h3></div></div>
                <div class="card"><img src="/conference.jpg"><div class="stealth-label"><h3>Zenith Atelier</h3></div></div>
                <div class="card"><img src="/pergola.jpg"><div class="stealth-label"><h3>The Pavilion</h3></div></div>
                <div class="card"><img src="/outdoor.jpg"><div class="stealth-label"><h3>The Sanctuary</h3></div></div>
                <div class="card"><img src="/city.jpg"><div class="stealth-label"><h3>The Mission</h3><span>5KM TO CENTER</span></div></div>
            </section>

            <div id="bookingModal">
                <div class="modal-content">
                    <h2 id="modalTitle" style="color:var(--apollo-orange); margin-top:0; font-family:'Playfair Display'; text-align:center;">RESERVE</h2>
                    <form id="bookForm">
                        <input type="hidden" id="suiteType">
                        <input type="text" id="guestName" placeholder="GUEST NAME" required>
                        
                        <div style="display:grid; grid-template-columns:1fr 1fr; gap:15px;">
                            <div class="date-input-wrapper">
                                <label>CHECK-IN</label>
                                <input type="date" id="checkIn" required>
                            </div>
                            <div class="date-input-wrapper">
                                <label>CHECK-OUT</label>
                                <input type="date" id="checkOut" required>
                            </div>
                        </div>

                        <select id="guests">
                            <option value="1">1 GUEST</option>
                            <option value="2">2 GUESTS</option>
                            <option value="3+">3+ GUESTS</option>
                        </select>
                        <button type="submit">TRANSMIT RESERVATION</button>
                        <button type="button" onclick="closeBooking()" style="background:none; color:#666; font-size:0.7rem; border:none; letter-spacing:1px;">CLOSE MISSION</button>
                    </form>
                </div>
            </div>

            <section id="contact-section" class="reveal">
                <div class="contact-grid">
                    <div class="contact-column">
                        <h3>Information Hub</h3>
                        <div class="info-item"><h4>Phone</h4><p>(+256) 762 239 099<br>(+256) 752 695 755</p></div>
                        <div class="info-item"><h4>Email</h4><p>apolloinnfortportal@gmail.com</p></div>
                        <div class="info-item"><h4>Location</h4><p>Bwanika, Saaka, Fort Portal, Uganda</p></div>
                        <div class="info-item"><h4>Working Time</h4><p>Everyday 24/7</p></div>
                    </div>
                    <div class="contact-column">
                        <h3>Get in Touch</h3>
                        <form class="contact-form">
                            <input type="text" placeholder="Name">
                            <input type="email" placeholder="Email">
                            <textarea placeholder="Message" rows="4"></textarea>
                            <button type="button">Send Mission Intel</button>
                        </form>
                    </div>
                    <div class="contact-column map-container">
                        <h3>Our Location</h3>
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15959.030564539665!2d30.25203525!3d0.6923838!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x176663dbb27be30b%3A0xc3f8e4e9f7336f73!2sFort%20Portal!5e0!3m2!1sen!2sug!4v1710795000000!5m2!1sen!2sug" width="100%" height="250" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
                    </div>
                </div>
            </section>

            <script>
                // 1. Scroll Reveal Observer
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('active'); });
                }, { threshold: 0.1 });
                document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

                // 2. Date Safety: Set "Check-in" minimum to Today
                const today = new Date().toISOString().split('T')[0];
                document.getElementById('checkIn').setAttribute('min', today);
                document.getElementById('checkOut').setAttribute('min', today);

                // 3. Modal Logic
                function openBooking(suite = 'The Atelier') {
                    document.getElementById('bookingModal').style.display = 'flex';
                    document.getElementById('modalTitle').innerText = 'RESERVE ' + suite.toUpperCase();
                    document.getElementById('suiteType').value = suite;
                }
                function closeBooking() { document.getElementById('bookingModal').style.display = 'none'; }

                // 4. Booking Form Submission
                document.getElementById('bookForm').onsubmit = async (e) => {
                    e.preventDefault();
                    
                    const checkIn = document.getElementById('checkIn').value;
                    const checkOut = document.getElementById('checkOut').value;

                    if (new Date(checkOut) <= new Date(checkIn)) {
                        alert("Mission Error: Check-out date must be after Check-in date.");
                        return;
                    }

                    const data = {
                        guestName: document.getElementById('guestName').value,
                        checkIn: checkIn,
                        checkOut: checkOut,
                        suiteType: document.getElementById('suiteType').value,
                        guests: document.getElementById('guests').value
                    };

                    const btn = e.target.querySelector('button[type="submit"]');
                    const originalText = btn.innerText;
                    btn.innerText = "TRANSMITTING...";
                    btn.style.background = "#00FF00";

                    const res = await fetch('/reserve', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify(data)
                    });
                    const result = await res.json();
                    
                    if(result.success) {
                        window.location.href = result.url;
                        // Reset button after redirect start
                        setTimeout(() => {
                            btn.innerText = originalText;
                            btn.style.background = "var(--apollo-orange)";
                        }, 2000);
                    }
                };
            </script>
        </body>
        </html>
    `);
});

app.listen(PORT, () => console.log('Apollo Inn Mission Control active on port ' + PORT));