const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>The Apollo Inn | Boutique Luxury</title>
            <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@300;400;600&display=swap" rel="stylesheet">
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css">
            <script src="https://cdn.jsdelivr.net/npm/flatpickr"></script>
            <style>
                :root {
                    --charcoal: #050505;
                    --apollo-red: #FF8800;
                    --apollo-green: #00FF00;
                    --apollo-orange: #FF8800;
                    --gold-glow: rgba(196, 18, 48, 0.3);
                    --white: #ffffff;
                    --text-muted: #888888;
                    --transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
                }
                body {
                    margin: 0;
                    font-family: 'Inter', sans-serif;
                    background-color: var(--charcoal);
                    color: var(--white);
                    line-height: 1.6;
                    letter-spacing: 1px;
                    scroll-behavior: smooth;
                }
                h1, h2, h3 { font-family: 'Playfair Display', serif; font-weight: 400; color: var(--apollo-red); letter-spacing: 2px; }
                nav {
                    display: flex;
                    position: sticky;
                    top: 0;
                    z-index: 2000;
                    justify-content: space-between;
                    align-items: center;
                    padding: 1.2rem 5%;
                    background: rgba(26, 26, 26, 0.95);
                    backdrop-filter: blur(10px);
                    border-bottom: 1px solid var(--apollo-red);
                }
                .logo { font-family: 'Playfair Display', serif; font-size: 1.8rem; color: var(--apollo-red); text-decoration: none; text-transform: uppercase; }
                .nav-links a { color: var(--white); text-decoration: none; margin-left: 30px; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 2px; transition: 0.3s; }
                .nav-links a:hover { color: var(--apollo-orange); }
                .nav-links .btn-book { border: 1px solid var(--apollo-green); padding: 8px 20px; margin-left: 40px; box-shadow: 0 0 10px var(--apollo-green); }
                .nav-links .btn-book:hover { border-color: var(--apollo-orange); box-shadow: 0 0 15px var(--apollo-orange); }
                
                @keyframes pulse-orange {
                    0% { box-shadow: 0 0 0 0 rgba(255, 136, 0, 0.4); }
                    70% { box-shadow: 0 0 0 10px rgba(255, 136, 0, 0); }
                    100% { box-shadow: 0 0 0 0 rgba(255, 136, 0, 0); }
                }
                .btn-book {
                    animation: pulse-orange 3s infinite;
                }
                
                .hero {
                    height: 80vh;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    text-align: center;
                    background: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('/hero.jpg');
                    background-size: cover;
                    background-position: center;
                }
                .hero-content h1 { font-size: 5rem; margin: 0; color: var(--white); }
                .hero-content p { font-size: 1.2rem; letter-spacing: 4px; text-transform: uppercase; color: var(--apollo-red); }

                .booking-bar {
                    background: var(--charcoal);
                    padding: 20px 5%;
                    display: flex;
                    gap: 20px;
                    align-items: flex-end;
                    border-bottom: 1px solid var(--gold);
                    position: sticky;
                    top: 75px;
                    z-index: 1500;
                }
                .booking-field { display: flex; flex-direction: column; flex: 1; text-align: left; }
                .booking-field label { font-size: 0.7rem; text-transform: uppercase; color: var(--gold); margin-bottom: 8px; letter-spacing: 1px; }
                .booking-field input { background: transparent; border: 1px solid #444; color: white; padding: 10px; font-family: 'Inter'; }
                .btn-check { background: var(--apollo-green); color: var(--charcoal); border: none; padding: 12px 30px; cursor: pointer; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; transition: 0.3s; height: 42px; box-shadow: 0 0 15px var(--apollo-green); }
                .btn-check:hover { background: var(--apollo-orange); box-shadow: 0 0 20px var(--apollo-orange); }

                .suites-section { padding: 100px 5%; }
                .suite-card { display: flex; gap: 50px; margin-bottom: 80px; align-items: center; }
                .suite-card:nth-child(even) { flex-direction: row-reverse; text-align: center; }
                .suite-image { flex: 1.5; overflow: hidden; border: 1px solid rgba(212, 175, 55, 0.2); position: relative; }
                .suite-image img { width: 100%; height: 500px; object-fit: cover; transition: var(--transition); }
                .suite-image:hover img { transform: scale(1.05); filter: brightness(1.1); }
                .suite-image:hover { box-shadow: 0 0 30px var(--gold-glow); border-color: var(--gold); }
                .suite-info { flex: 1; }
                .suite-info p { color: var(--text-muted); font-size: 1.1rem; margin-bottom: 30px; }

                .bento-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    grid-template-rows: repeat(2, 250px);
                    gap: 20px;
                    padding: 0 5% 100px;
                }
                .bento-item { 
                    position: relative; 
                    overflow: hidden; 
                    background: #222;
                    border: 1px solid rgba(212, 175, 55, 0.2);
                    transition: var(--transition);
                }
                .bento-item img { width: 100%; height: 100%; object-fit: cover; opacity: 0.7; transition: var(--transition); }
                .bento-item:hover img { opacity: 0.4; transform: scale(1.1); }
                .bento-item:hover { border-color: var(--apollo-red); box-shadow: 0 0 25px var(--gold-glow); }
                .bento-item.glow-green:hover { border-color: var(--apollo-green); box-shadow: 0 0 25px rgba(0, 255, 0, 0.4); }
                .bento-label { position: absolute; bottom: 20px; left: 20px; z-index: 2; }
                .bento-label h3 { margin: 0; font-size: 1.2rem; color: var(--white); }
                .bento-label p { margin: 5px 0 0; font-size: 0.7rem; color: var(--apollo-red); text-transform: uppercase; letter-spacing: 2px; }
                .bento-item.outdoor .bento-label p { color: var(--apollo-green); }
                .suite-info { flex: 1; text-align: center; }

                .section-title { text-align: center; padding: 120px 0 60px; font-size: 2.5rem; text-transform: uppercase; }

                .reveal { opacity: 0; transform: translateY(20px); transition: all 0.8s ease-out; }
                .reveal.active { opacity: 1; transform: translateY(0); }
                html { scroll-behavior: smooth; }

                /* Flatpickr Custom Branding */
                .flatpickr-calendar { background: #0a0a0a !important; border: 1px solid var(--apollo-red) !important; box-shadow: 0 0 20px rgba(255,136,0,0.2) !important; }
                .flatpickr-day { color: #fff !important; }
                .flatpickr-day.selected, .flatpickr-day.startRange, .flatpickr-day.endRange, 
                .flatpickr-day.selected.inRange, .flatpickr-day.startRange.inRange, .flatpickr-day.endRange.inRange,
                .flatpickr-day.selected:focus, .flatpickr-day.selected:hover, .flatpickr-day.nextMonthDay.selected {
                    background: var(--apollo-orange) !important; border-color: var(--apollo-orange) !important;
                }
                .flatpickr-day.inRange { background: rgba(255, 136, 0, 0.2) !important; box-shadow: none !important; }
                .flatpickr-day.today { border-color: var(--apollo-green) !important; color: var(--apollo-green) !important; }
                .flatpickr-months .flatpickr-month, .flatpickr-current-month .flatpickr-monthDropdown-months, .flatpickr-weekday { fill: #fff !important; color: #fff !important; }
                
                .date-input-wrapper { position: relative; display: flex; align-items: center; }
                .btn-clear { position: absolute; right: 10px; background: transparent; border: none; color: var(--text-muted); cursor: pointer; font-size: 0.7rem; text-transform: uppercase; opacity: 0; transition: opacity 0.3s ease; }
                .date-input-wrapper:hover .btn-clear { opacity: 1; }
                
                .input-with-icon { position: relative; }
                .input-with-icon input { padding-left: 35px !important; width: 100%; box-sizing: border-box; }
                .input-with-icon::before { content: '📅'; position: absolute; left: 10px; top: 50%; transform: translateY(-50%); color: var(--apollo-orange); font-size: 0.9rem; z-index: 5; }

                @media (max-width: 768px) {
                    .booking-bar { position: fixed; bottom: 0; top: auto; flex-direction: column; width: 100%; box-sizing: border-box; padding: 15px; backdrop-filter: blur(10px); }
                    .hero-content h1 { font-size: 3rem; }
                    .suite-card { flex-direction: column !important; }
                    .bento-grid { grid-template-columns: 1fr 1fr; }
                }
            </style>
        </head>
        <body>
            <nav>
                <a href="#" class="logo"><img src='/logo.jpg' style='height: 50px; filter: contrast(1.2);'></a>
                <div class="nav-links">
                    <a href="#suites">Suites</a><a href="#dining">Dining</a><a href="#bar">Bar</a><a href="#" class="btn-book">Reserve Your Stay</a>
                </div>
            </nav>

            <header class="hero">
                <div class="hero-content">
                    <p>A Sanctuary of Refinement</p>
                    <h1>APOLLO INN</h1>
                </div>
            </header>

            <section style="background: #050505; padding: 40px 5%; border-bottom: 1px solid #222;">
                <div style="max-width: 1200px; margin: 0 auto; display: flex; gap: 20px; align-items: flex-end; flex-wrap: wrap;">
                    <div class="booking-field"><label>Arrival</label><input type="text" id="arrival" placeholder="DD-MM-YYYY" style="background: #0a0a0a; border: 1px solid #333; color: white; padding: 12px;"></div>
                    <div class="booking-field"><label>Departure</label><input type="text" id="departure" placeholder="DD-MM-YYYY" style="background: #0a0a0a; border: 1px solid #333; color: white; padding: 12px;"></div>
                    <div class="booking-field">
                        <label>Guests</label>
                        <select style="background: #0a0a0a; border: 1px solid #333; color: white; padding: 12px; height: 45px; appearance: none; -webkit-appearance: none;">
                            <option>1 Guest</option><option>2 Guests</option><option>3 Guests</option><option>4 Guests</option>
                        </select>
                    </div>
                    <button style="background: #00FF00; color: #000; border: none; padding: 0 40px; height: 45px; font-weight: 800; letter-spacing: 2px; cursor: pointer; box-shadow: 0 0 15px rgba(0,255,0,0.3);">RESERVE</button>
                </div>
            </section>

            <section id="suites" class="suites-section reveal">
                <h2 class="section-title">Suites & Sanctuaries</h2>
                
                <div class="suite-card">
                    <div class="suite-image"><img src="/suite1.jpg" alt="The Apollo Suite"></div>
                    <div class="suite-info">
                        <h3>The Apollo Suite</h3>
                        <p>Floor-to-ceiling city views and marble baths. Experience the pinnacle of urban luxury in our flagship residence.</p>
                    </div>
                </div>

                <div class="suite-card">
                    <div class="suite-image"><img src="/suite2.jpg" alt="The Artisan Studio"></div>
                    <div class="suite-info">
                        <h3>The Artisan Studio</h3>
                        <p>Hand-crafted furniture and a curated vinyl collection. A space designed for the creative soul seeking quiet inspiration.</p>
                    </div>
                </div>
            </section>

            <h2 class="section-title" id="amenities">The Amenity Collection</h2>
            <section class="bento-grid reveal">
                <div class="bento-item glow-green">
                    <img src="/bar.jpg" alt="The Obsidian Bar">
                    <div class="bento-label" id="bar">
                        <h3>The Obsidian Bar</h3>
                        <p>A sanctuary of shadow and gold</p>
                    </div>
                </div>
                <div class="bento-item glow-green">
                    <img src="/dining.jpg" alt="The Apollo Dining Room">
                    <div class="bento-label" id="dining"><h3>The Apollo Dining Room</h3></div>
                </div>
                <div class="bento-item">
                    <img src="/conference.jpg" alt="The Executive Atelier">
                    <div class="bento-label">
                        <h3>The Executive Atelier</h3>
                        <p>Where ambition meets absolute privacy</p>
                    </div>
                </div>
                <div class="bento-item outdoor">
                    <img src="/pergola.jpg" alt="The Pergola Lounge">
                    <div class="bento-label"><h3>The Pergola Lounge</h3></div>
                </div>
            </section>

            <section id="reservations" class="reveal" style="background: #111; padding: 100px 5%; border-top: 1px solid #222;">
                <h2 class="section-title" style="margin-top: 0;">Secure Your Sanctuary</h2>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 80px; max-width: 1200px; margin: 0 auto;">
                    <div>
                        <h3 style="color: var(--white); margin-bottom: 20px;">Get in Touch</h3>
                        <p style="color: var(--text-muted); font-size: 1.1rem;">1200 Apollo Way<br>San Francisco, CA 94105</p>
                        <p style="color: var(--apollo-red); font-size: 1.2rem; margin-top: 20px;">+1 (555) 010-8800</p>
                    </div>
                    <div>
                        <form style="display: flex; flex-direction: column; gap: 20px;">
                            <div class="booking-field"><label>Full Name</label><input type="text" placeholder="John Doe" style="border: 1px solid #333; outline: none; transition: 0.3s;" onfocus="this.style.borderColor='#FF8800'; this.style.boxShadow='0 0 10px #FF8800'" onblur="this.style.borderColor='#333'; this.style.boxShadow='none'"></div>
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                                <div class="booking-field"><label>Arrival</label><div class="input-with-icon"><input type="text" id="check-in" placeholder="Arrival Date" style="border: 1px solid #333; outline: none; transition: 0.3s; background: transparent; color: white; padding: 10px;" onfocus="this.style.borderColor='#FF8800'; this.style.boxShadow='0 0 10px #FF8800'" onblur="this.style.borderColor='#333'; this.style.boxShadow='none'"></div></div>
                                <div class="booking-field"><label>Departure</label><div class="input-with-icon"><input type="text" id="check-out" placeholder="Departure Date" style="border: 1px solid #333; outline: none; transition: 0.3s; background: transparent; color: white; padding: 10px;" onfocus="this.style.borderColor='#FF8800'; this.style.boxShadow='0 0 10px #FF8800'" onblur="this.style.borderColor='#333'; this.style.boxShadow='none'"></div></div>
                            </div>
                            <div class="booking-field"><label>Number of Guests</label><input type="number" placeholder="2" style="border: 1px solid #333; outline: none; transition: 0.3s;" onfocus="this.style.borderColor='#FF8800'; this.style.boxShadow='0 0 10px #FF8800'" onblur="this.style.borderColor='#333'; this.style.boxShadow='none'"></div>
                            <button type="button" style="background: #00FF00; color: #000; border: none; padding: 15px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; cursor: pointer; transition: transform 0.3s ease;" onmouseover="this.style.transform='scale(1.02)'" onmouseout="this.style.transform='scale(1)'">Request a Suite</button>
                        </form>
                    </div>
                </div>
            </section>

            <script>
                const observerOptions = { threshold: 0.1 };
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('active');
                        }
                    });
                }, observerOptions);

                document.querySelectorAll('.reveal').forEach(el => {
                    observer.observe(el);
                });

                const arrivalPicker = flatpickr("#arrival", {
                    dateFormat: "d-m-Y",
                    minDate: "today",
                    onChange: function(selectedDates, dateStr) { 
                        departurePicker.set("minDate", dateStr); 
                    }
                });
                const departurePicker = flatpickr("#departure", {
                    dateFormat: "d-m-Y",
                    minDate: "today"
                });

                const checkInPicker = flatpickr("#check-in", {
                    dateFormat: "Y-m-d",
                    minDate: "today",
                    minDate: "today"
                });

                document.querySelectorAll('.btn-clear').forEach((btn, i) => btn.addEventListener('click', () => Array.isArray(fps) ? fps[i].clear() : fps.clear()));
            </script>
        </body>
        </html>
    `);
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});