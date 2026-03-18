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

                .suites-grid {
                    display: grid;
                    grid-template-columns: repeat(6, 1fr);
                    grid-auto-rows: 300px;
                    gap: 20px;
                    padding: 0 5% 100px;
                }
                .suite-box { position: relative; overflow: hidden; border: 1px solid #222; }
                .suite-box img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s ease; }
                .suite-overlay {
                    position: absolute; top: 0; left: 0; width: 100%; height: 100%;
                    background: rgba(5, 5, 5, 0.8);
                    display: flex; flex-direction: column; justify-content: center; align-items: center;
                    opacity: 0; transition: var(--transition); text-align: center; padding: 20px; box-sizing: border-box;
                }
                .suite-box:hover img { transform: scale(1.05); }
                .suite-box:hover .suite-overlay { opacity: 1; }
                .suite-overlay h3 { color: var(--apollo-orange); margin: 0 0 10px 0; font-size: 1.5rem; }
                .suite-overlay p { color: var(--white); font-size: 0.8rem; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 20px; }
                .btn-view {
                    padding: 8px 20px;
                    border: 1px solid var(--apollo-green);
                    color: var(--white);
                    text-decoration: none;
                    font-size: 0.7rem;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    transition: 0.3s;
                }
                .btn-view:hover { background: var(--apollo-green); color: #000; }

                /* Bento Layout Logic */
                .suite-artisan { grid-column: span 4; grid-row: span 2; }
                .suite-pergola { grid-column: span 2; grid-row: span 1; }
                .suite-safari { grid-column: span 2; grid-row: span 1; }

                .suites-section { padding: 0 0 100px; }

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
                <div class="suites-grid">
                    <div class="suite-box suite-artisan">
                        <img src="/suite1.jpg" alt="The Artisan Studio">
                        <div class="suite-overlay">
                            <h3>The Artisan Studio</h3>
                            <p>King Bed | Garden View</p>
                            <a href="#" class="btn-view">View Details</a>
                        </div>
                    </div>
                    <div class="suite-box suite-pergola">
                        <img src="/suite2.jpg" alt="The Executive Pergola">
                        <div class="suite-overlay">
                            <h3>The Executive Pergola</h3>
                            <p>Private Terrace | City Skyline</p>
                            <a href="#" class="btn-view">View Details</a>
                        </div>
                    </div>
                    <div class="suite-box suite-safari">
                        <img src="/suite3.jpg" alt="The Safari Suite">
                        <div class="suite-overlay">
                            <h3>The Safari Suite</h3>
                            <p>Luxury Soaking Tub | Panoramic Views</p>
                            <a href="#" class="btn-view">View Details</a>
                        </div>
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

            <section id="reservations" class="reveal" style="background: #0a0a0a; padding: 80px 5%; border-top: 1px solid #222;">
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 40px; max-width: 1300px; margin: 0 auto;">
                    <!-- Column 1: Details -->
                    <div>
                        <h3 style="color: var(--apollo-orange); text-transform: uppercase; font-size: 1.2rem; margin-bottom: 25px;">Information Hub</h3>
                        <div style="margin-bottom: 20px;">
                            <h4 style="color: var(--apollo-orange); margin: 0; font-size: 0.8rem; text-transform: uppercase;">Phone</h4>
                            <p style="margin: 5px 0; color: #ccc;">(+256) 762 239 099<br>(+256) 752 695 755</p>
                        </div>
                        <div style="margin-bottom: 20px;">
                            <h4 style="color: var(--apollo-orange); margin: 0; font-size: 0.8rem; text-transform: uppercase;">Email</h4>
                            <p style="margin: 5px 0; color: #ccc;">apolloinnfortportal@gmail.com</p>
                        </div>
                        <div style="margin-bottom: 20px;">
                            <h4 style="color: var(--apollo-orange); margin: 0; font-size: 0.8rem; text-transform: uppercase;">Location</h4>
                            <p style="margin: 5px 0; color: #ccc;">Bwanika, Saaka, Fort Portal, Uganda</p>
                        </div>
                        <div>
                            <h4 style="color: var(--apollo-orange); margin: 0; font-size: 0.8rem; text-transform: uppercase;">Working Time</h4>
                            <p style="margin: 5px 0; color: #ccc;">Everyday 24/7</p>
                        </div>
                        <div style="margin-top: 25px; display: flex; flex-direction: column; gap: 12px;">
                            <a href="https://instagram.com/apolloinnfortportal" target="_blank" style="text-decoration: none; display: flex; align-items: center; gap: 10px; transition: 0.3s;" onmouseover="this.style.textShadow='0 0 8px var(--apollo-orange)'" onmouseout="this.style.textShadow='none'">
                                <svg style="width:18px; height:18px; fill:var(--apollo-green);" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                                <span style="color: var(--apollo-orange); font-size: 0.9rem;">@apolloinnfortportal</span>
                            </a>
                            <a href="https://tiktok.com/@apolloinnfortportal" target="_blank" style="text-decoration: none; display: flex; align-items: center; gap: 10px; transition: 0.3s;" onmouseover="this.style.textShadow='0 0 8px var(--apollo-orange)'" onmouseout="this.style.textShadow='none'">
                                <svg style="width:18px; height:18px; fill:var(--apollo-green);" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.59-1.01-.01 2.62-.02 5.24-.04 7.86-.02 2.04-.54 4.14-1.97 5.67-1.52 1.68-3.82 2.4-6.01 2.25-2.13-.11-4.21-1.17-5.33-3.01-1.17-1.88-1.38-4.39-.51-6.48.81-2.02 2.62-3.61 4.74-4.07.13-.03.26-.04.39-.06v4.29c-.12.04-.24.08-.36.13-.94.44-1.61 1.39-1.62 2.42-.01 1.1.6 2.16 1.59 2.64.9.47 2.02.46 2.9-.06.79-.44 1.28-1.31 1.3-2.22.02-4.43.01-8.86.02-13.29z"/></svg>
                                <span style="color: var(--apollo-orange); font-size: 0.9rem;">@apolloinnfortportal</span>
                            </a>
                        </div>
                    </div>

                    <!-- Column 2: The Form -->
                    <div>
                        <h3 style="color: var(--apollo-orange); text-transform: uppercase; font-size: 1.2rem; margin-bottom: 25px;">Get in Touch</h3>
                        <form style="display: flex; flex-direction: column; gap: 20px;">
                            <input type="text" placeholder="Name" style="background: transparent; border: 1px solid #FF8800; color: white; padding: 12px; outline: none;">
                            <input type="email" placeholder="Email" style="background: transparent; border: 1px solid #FF8800; color: white; padding: 12px; outline: none;">
                            <textarea placeholder="Message" rows="4" style="background: transparent; border: 1px solid #FF8800; color: white; padding: 12px; outline: none; font-family: inherit;"></textarea>
                            <button type="button" style="background: #00FF00; color: #000; border: none; padding: 15px; font-weight: 700; text-transform: uppercase; cursor: pointer;">Send</button>
                        </form>
                    </div>

                    <!-- Column 3: The Map -->
                    <div style="min-height: 300px;">
                        <h3 style="color: var(--apollo-orange); text-transform: uppercase; font-size: 1.2rem; margin-bottom: 25px;">Our Location</h3>
                        <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31915.16646879103!2d30.24864155!3d0.66077595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1761199370000001%3A0x673005663f203933!2sFort%20Portal!5e0!3m2!1sen!2sug!4v1710000000000!5m2!1sen!2sug" 
                            width="100%" height="100%" style="border:0; filter: invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%); min-height: 250px;" allowfullscreen="" loading="lazy">
                        </iframe>
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