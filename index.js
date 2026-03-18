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
                    --charcoal: #1a1a1a;
                    --gold: #d4af37;
                    --gold-glow: rgba(212, 175, 55, 0.3);
                    --white: #ffffff;
                    --text-muted: #a0a0a0;
                    --transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
                }
                body {
                    margin: 0;
                    font-family: 'Inter', sans-serif;
                    background-color: var(--charcoal);
                    color: var(--white);
                    line-height: 1.6;
                    scroll-behavior: smooth;
                }
                h1, h2, h3 { font-family: 'Playfair Display', serif; font-weight: 400; color: var(--gold); letter-spacing: 2px; }
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
                    border-bottom: 1px solid rgba(212, 175, 55, 0.1);
                }
                .logo { font-family: 'Playfair Display', serif; font-size: 1.8rem; color: var(--gold); text-decoration: none; text-transform: uppercase; }
                .nav-links a { color: var(--white); text-decoration: none; margin-left: 30px; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 2px; transition: 0.3s; }
                .nav-links a:hover { color: var(--gold); }
                .nav-links .btn-book { border: 1px solid var(--gold); padding: 8px 20px; margin-left: 40px; }
                
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
                .hero-content p { font-size: 1.2rem; letter-spacing: 4px; text-transform: uppercase; color: var(--gold); }

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
                .btn-check { background: var(--gold); color: var(--charcoal); border: none; padding: 12px 30px; cursor: pointer; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; transition: 0.3s; height: 42px; }
                .btn-check:hover { background: #fff; }

                .suites-section { padding: 100px 5%; }
                .suite-card { display: flex; gap: 50px; margin-bottom: 80px; align-items: center; }
                .suite-card:nth-child(even) { flex-direction: row-reverse; }
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
                .bento-item:hover { border-color: var(--gold); box-shadow: 0 0 25px var(--gold-glow); }
                .bento-label { position: absolute; bottom: 20px; left: 20px; z-index: 2; }
                .bento-label h3 { margin: 0; font-size: 1.2rem; color: var(--white); }

                .section-title { text-align: center; padding: 100px 0 60px; font-size: 2.5rem; text-transform: uppercase; }

                @media (max-width: 768px) {
                    .booking-bar { position: fixed; bottom: 0; top: auto; flex-direction: column; width: 100%; box-sizing: border-box; padding: 15px; }
                    .hero-content h1 { font-size: 3rem; }
                    .suite-card { flex-direction: column !important; }
                    .bento-grid { grid-template-columns: 1fr 1fr; }
                }
            </style>
        </head>
        <body>
            <nav>
                <a href="#" class="logo">Apollo Inn</a>
                <div class="nav-links">
                    <a href="#suites">Suites</a><a href="#dining">Dining</a><a href="#bar">Bar</a><a href="#" class="btn-book">Book Now</a>
                </div>
            </nav>

            <header class="hero">
                <div class="hero-content">
                    <p>A Sanctuary of Refinement</p>
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

            <h2 class="section-title">The Amenity Collection</h2>
            <section class="bento-grid">
                <div class="bento-item" id="bar">
                    <img src="/bar.jpg" alt="The Obsidian Bar">
                    <div class="bento-label"><h3>The Obsidian Bar</h3></div>
                </div>
                <div class="bento-item" id="dining">
                    <img src="/dining.jpg" alt="The Apollo Dining Room">
                    <div class="bento-label"><h3>The Apollo Dining Room</h3></div>
                </div>
                <div class="bento-item">
                    <img src="/conference.jpg" alt="The Executive Atelier">
                    <div class="bento-label"><h3>The Executive Atelier</h3></div>
                </div>
                <div class="bento-item">
                    <img src="/pergola.jpg" alt="The Pergola Lounge">
                    <div class="bento-label"><h3>The Pergola Lounge</h3></div>
                </div>
            </section>
        </body>
        </html>
    `);
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});