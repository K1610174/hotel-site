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
                    margin: 0;
                    font-family: 'Inter', sans-serif;
                    background-color: var(--dusk-slate);
                    color: var(--off-white);
                    line-height: 1.6;
                    overflow-x: hidden;
                    scroll-behavior: smooth;
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
                    padding: 1.5rem 5%;
                    background: rgba(26, 26, 26, 0.95); backdrop-filter: blur(10px);
                    border-bottom: 1px solid #333;
                }
                .logo { font-family: 'Playfair Display', serif; font-size: 1.8rem; color: var(--apollo-red); text-decoration: none; text-transform: uppercase; }
                .nav-links a { color: var(--white); text-decoration: none; margin-left: 30px; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 2px; transition: 0.3s; }
                .nav-links a:hover { color: var(--apollo-orange); }
                .nav-links .btn-book { border: 1px solid var(--apollo-green); padding: 8px 20px; margin-left: 40px; box-shadow: 0 0 10px var(--apollo-green); }
                .nav-links .btn-book:hover { border-color: var(--apollo-orange); box-shadow: 0 0 15px var(--apollo-orange); }
                
                .hero {
                    height: 70vh; display: flex; justify-content: center; align-items: center;
                    text-align: center; background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/hero.jpg');
                    background-size: cover; background-position: center;
                }
                .hero h1 { font-family: 'Playfair Display', serif; font-size: 5rem; margin: 0; color: white; }
                .hero p { color: var(--apollo-orange); text-transform: uppercase; letter-spacing: 5px; font-size: 1rem; }

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
                .bento-label { position: absolute; bottom: 20px; left: 20px; z-index: 2; }
                .bento-label h3 { margin: 0; font-size: 1.2rem; color: var(--white); }
                .bento-label p { margin: 5px 0 0; font-size: 0.7rem; color: var(--apollo-red); text-transform: uppercase; letter-spacing: 2px; }
                .bento-item.outdoor .bento-label p { color: var(--apollo-green); }
                .suite-info { flex: 1; text-align: center; }

                .section-title { text-align: center; padding: 120px 0 60px; font-size: 2.5rem; text-transform: uppercase; }

                @media (max-width: 900px) {
                    nav { padding: 1rem 5%; }
                    .logo-img { height: 80px; }
                    .suites-grid, .apollo-6-grid { grid-template-columns: 1fr; grid-template-areas: none; grid-auto-rows: 350px; }
                    .hero h1 { font-size: 3rem; }
                }
            </style>
        </head>
        <body>
            <nav id="top">
                <a href="#" class="logo-link"><img src='/logo.jpg' class="logo-img" alt="Apollo Inn Logo"></a>
                <div class="nav-links">
                    <a href="#top">Home</a>
                    <a href="#suites">Suites</a>
                    <a href="#contact-section">Contact</a>
                    <a href="#" class="btn-book-nav">Book Now</a>
                </div>
            </nav>

            <header class="hero">
                <div class="hero-content">
                    <p>Modern Sanctuary</p>
                    <h1>APOLLO INN</h1>
                </div>
            </header>

            <div class="booking-bar">
                <div class="booking-field"><label>Check In</label><input type="date"></div>
                <div class="booking-field"><label>Check Out</label><input type="date"></div>
                <div class="booking-field"><label>Guests</label><input type="number" placeholder="2"></div>
                <button class="btn-check">Check Availability</button>
            </div>

            <section id="suites" class="suites-section">
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
            <section class="bento-grid">
                <div class="bento-item">
                    <img src="/bar.jpg" alt="The Obsidian Bar">
                    <div class="bento-label" id="bar">
                        <h3>The Obsidian Bar</h3>
                        <p>A sanctuary of shadow and gold</p>
                    </div>
                </div>
                <div class="bento-item">
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
            </section>
        </body>
        </html>
    `);
});

app.listen(PORT, () => console.log('Apollo Inn Mission Control active on port ' + PORT));