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
                .logo-link { display: flex; align-items: center; }
                .logo-img { height: 120px; width: auto; transition: 0.3s; }
                
                .nav-links { display: flex; align-items: center; gap: 30px; }
                .nav-links a { 
                    color: var(--apollo-orange); text-decoration: none; 
                    font-size: 0.85rem; text-transform: uppercase; font-weight: 600; 
                    letter-spacing: 2px; transition: 0.3s; 
                }
                .nav-links a:hover { color: var(--neon-green); }
                
                .btn-book-nav {
                    background: var(--apollo-orange); color: var(--obsidian) !important;
                    padding: 12px 24px; border-radius: 4px; font-weight: 800 !important;
                    transition: var(--transition);
                    box-shadow: 0 0 10px rgba(255, 136, 0, 0.2);
                }
                .btn-book-nav:hover { 
                    background: var(--neon-green); 
                    box-shadow: 0 0 15px rgba(0, 255, 0, 0.4); 
                }

                .hero {
                    height: 70vh; display: flex; justify-content: center; align-items: center;
                    text-align: center; background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/hero.jpg');
                    background-size: cover; background-position: center;
                }
                .hero h1 { font-family: 'Playfair Display', serif; font-size: 5rem; margin: 0; color: white; }
                .hero p { color: var(--apollo-orange); text-transform: uppercase; letter-spacing: 5px; font-size: 1rem; }

                .section-header { text-align: center; padding: 100px 0 50px; }
                .section-header h2 { font-family: 'Playfair Display', serif; font-size: 2.5rem; margin: 0; color: var(--off-white); text-transform: uppercase; }
                .section-header .line { width: 50px; height: 2px; background: var(--apollo-orange); margin: 15px auto; }
                .section-header p { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 3px; color: #666; }

                .grid-container { display: grid; gap: 20px; padding: 0 5% 100px; }
                .suites-grid {
                    grid-template-areas: "atelier studio" "atelier loft";
                    grid-template-columns: 1.3fr 1fr; grid-template-rows: 320px 320px;
                }
                .apollo-6-grid {
                    grid-template-columns: repeat(3, 1fr);
                    grid-template-rows: repeat(2, 350px);
                }

                .card { position: relative; border: 1px solid #333; overflow: hidden; background: var(--obsidian); }
                .card img { 
                    width: 100%; height: 100%; object-fit: cover; 
                    transition: 0.6s ease; filter: grayscale(20%) contrast(1.1); 
                }
                .card:hover img { transform: scale(1.05); filter: grayscale(0%) contrast(1.1); }

                .stealth-label {
                    position: absolute; bottom: 0; left: 0;
                    background: var(--obsidian); padding: 15px 25px;
                    border-top: 1px solid #333; border-right: 1px solid #333; z-index: 10;
                }
                .stealth-label h3 { margin: 0; font-size: 1rem; color: var(--apollo-orange); text-transform: uppercase; }
                .stealth-label span { font-size: 0.65rem; color: var(--off-white); display: block; margin-top: 5px; letter-spacing: 1px; }

                #contact-section { background: var(--obsidian); padding: 100px 5%; border-top: 1px solid #333; }
                .contact-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 50px; max-width: 1300px; margin: 0 auto; }
                .contact-column h3 { color: var(--apollo-orange); text-transform: uppercase; font-size: 1.2rem; margin-bottom: 25px; letter-spacing: 2px; }
                .info-item { margin-bottom: 20px; }
                .info-item h4 { color: var(--apollo-orange); margin: 0; font-size: 0.8rem; text-transform: uppercase; }
                .info-item p { margin: 5px 0; color: var(--off-white); font-size: 0.9rem; }
                
                .contact-form { display: flex; flex-direction: column; gap: 20px; }
                .contact-form input, .contact-form textarea { background: var(--dusk-slate); border: 1px solid #333; color: white; padding: 12px; outline: none; font-family: inherit; }
                .contact-form button { background: var(--apollo-orange); color: var(--obsidian); border: none; padding: 15px; font-weight: 800; text-transform: uppercase; cursor: pointer; transition: 0.3s; }
                .contact-form button:hover { background: var(--neon-green); }

                .map-container { min-height: 300px; border: 1px solid #333; }
                iframe { filter: invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%); }

                .reveal { opacity: 0; transform: translateY(30px); transition: all 0.8s ease-out; }
                .reveal.active { opacity: 1; transform: translateY(0); }

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

            <div id="suites" class="section-header reveal">
                <h2>The Suite Collection</h2>
                <div class="line"></div>
                <p>Curated Comfort</p>
            </div>

            <section class="grid-container suites-grid reveal">
                <div class="card" style="grid-area: atelier;"><img src="/suite1.jpg"><div class="stealth-label"><h3>The Atelier</h3><span>> VIEW SPACE</span></div></div>
                <div class="card" style="grid-area: studio;"><img src="/suite2.jpg"><div class="stealth-label"><h3>The Studio</h3><span>> AVAILABLE</span></div></div>
                <div class="card" style="grid-area: loft;"><img src="/suite3.jpg"><div class="stealth-label"><h3>The Loft</h3><span>> VIEW SPACE</span></div></div>
            </section>

            <div class="section-header reveal">
                <h2 style="color: var(--apollo-orange)">Apollo Light</h2>
                <div class="line" style="background: var(--neon-green)"></div>
                <p>The Unified Experience</p>
            </div>

            <section class="grid-container apollo-6-grid reveal">
                <div class="card"><img src="/bar.jpg"><div class="stealth-label"><h3>The Event Horizon</h3><span>Evening Unwind</span></div></div>
                <div class="card"><img src="/dining.jpg"><div class="stealth-label"><h3>Helios Refectory</h3><span>Local Fusion</span></div></div>
                <div class="card"><img src="/conference.jpg"><div class="stealth-label"><h3>Zenith Atelier</h3><span>Productivity Hub</span></div></div>
                <div class="card"><img src="/pergola.jpg"><div class="stealth-label"><h3>The Pavilion</h3><span>Al-Fresco Rest</span></div></div>
                <div class="card"><img src="/outdoor.jpg"><div class="stealth-label"><h3>The Sanctuary</h3><span>Gated Security</span></div></div>
                <div class="card"><img src="/city.jpg"><div class="stealth-label"><h3>The Mission</h3><span>5km to Center</span></div></div>
            </section>

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
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15959.035418933256!2d30.2312683!3d0.692348!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x176467383796d841%3A0xc3f946e9ecb63116!2sFort%20Portal%2C%20Uganda!5e0!3m2!1sen!2suk!4v1710793000000!5m2!1sen!2suk" width="100%" height="250" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
                    </div>
                </div>
            </section>

            <script>
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('active'); });
                }, { threshold: 0.1 });
                document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
            </script>
        </body>
        </html>
    `);
});

app.listen(PORT, () => console.log('Apollo Inn Mission Control active on port ' + PORT));