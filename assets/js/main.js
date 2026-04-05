
// 1. State Management
let currentChannel = 0;
let isPowerOn = true;
let knobRotation = 0;

// 2. Select DOM Elements
const screen = document.getElementById('screen');
const contentArea = document.getElementById('content-area');
const channelNum = document.getElementById('channel-num');
const staticNoise = document.getElementById('static');
const knob = document.getElementById('channel-knob');
const powerBtn = document.getElementById('power-btn');
const nextBtn = document.getElementById('next-channel');
const prevBtn = document.getElementById('prev-channel');

// 3. Core Functions

function renderProject() {
    if (!isPowerOn) return;

    const p = projects[currentChannel];
    contentArea.innerHTML = `
        <div class="tv-project-title">${p.title}</div>
        <div class="tv-tech-stack">${p.tech}</div>
        <p class="tv-project-desc">${p.desc}</p>
        <a href="${p.link}" class="btn" style="font-size: 1rem; padding: 5px 15px;">EXECUTE</a>
    `;
    channelNum.innerText = `CH 0${currentChannel + 1}`;
}

function renderArchives() {
    const shelf = document.getElementById('vhs-shelf');
    if (!shelf) return; 
    
    
    shelf.innerHTML = archives.map(tape => {
    
        const labelStyle = tape.color ? `style="background-color: ${tape.color};"` : "";
        
        return `
            <div class="vhs-tape">
                <div class="vhs-label" ${labelStyle}>${tape.label}</div>
                <div class="vhs-info">
                    <h4>${tape.title}</h4>
                    <p>${tape.desc}</p>
                    <div class="vhs-links">
                        ${tape.links.map(link => `<a href="${link.url}" class="vhs-btn">${link.name}</a>`).join('')}
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function switchChannelEffect() {
    if (!isPowerOn) return;

    staticNoise.classList.add('full-static');
    contentArea.style.opacity = '0';

    setTimeout(() => {
        renderProject();
    }, 300);

    setTimeout(() => {
        staticNoise.classList.remove('full-static');
        contentArea.style.opacity = '1';
    }, 600);
}

function nextChannel() {
    if (!isPowerOn) return;
    currentChannel = (currentChannel + 1) % projects.length;
    knobRotation += 45;
    knob.style.transform = `rotate(${knobRotation}deg)`;
    switchChannelEffect();
}

function prevChannel() {
    if (!isPowerOn) return;
    currentChannel = (currentChannel - 1 + projects.length) % projects.length;
    knobRotation -= 45;
    knob.style.transform = `rotate(${knobRotation}deg)`;
    switchChannelEffect();
}

function togglePower() {
    isPowerOn = !isPowerOn;
    if (isPowerOn) {
        screen.classList.remove('crt-off');
        screen.classList.add('crt-on');
        powerBtn.classList.add('on');
        setTimeout(() => renderProject(), 1200);
    } else {
        screen.classList.remove('crt-on');
        screen.classList.add('crt-off');
        powerBtn.classList.remove('on');
    }
}
function renderSocials() {
    const list = document.getElementById('social-list');
    if (!list) return;
    list.innerHTML = socials.map(s => {
        
        const isImage = s.icon.includes('/') || s.icon.includes('.');
        
        const iconHtml = isImage 
            ? `<img src="${s.icon}" alt="${s.platform}" class="social-icon-img">`
            : `<i class="${s.icon}"></i>`;

        return `
            <a href="${s.url}" target="_blank" class="social-link" style="--hover-color: ${s.color}">
                ${iconHtml}
                <span>${s.platform}</span>
            </a>
        `;
    }).join('');
}

function renderTechStack() {
    const rack = document.getElementById('tech-rack');
    if (!rack) return;

    rack.innerHTML = techStack.map(item => `
        <div class="rack-unit">
            <div class="rack-bolts">
                <div class="bolt"></div>
                <div class="bolt"></div>
            </div>
            <div class="rack-content">
                <div class="rack-title">${item.id}</div>
                <div class="rack-details">
                    ${item.techs.map(t => `<span>${t}</span>`).join(' ')}
                </div>
            </div>
            <div class="rack-status">
                ${item.leds.map(color => `<div class="led ${color}"></div>`).join('')}
            </div>
        </div>
    `).join('');
}
// 4. Theme Toggle Logic
function initThemeToggle() {
    const toggleBtn = document.getElementById('theme-toggle');
    if (!toggleBtn) return;

    let currentTheme = localStorage.getItem('analog-theme') || 'phosphor';

    const applyTheme = (themeKey) => {
        const theme = themes[themeKey];
        Object.keys(theme.colors).forEach(property => {
            document.documentElement.style.setProperty(property, theme.colors[property]);
        });
        toggleBtn.innerText = `// MODE: ${theme.label}`;
        localStorage.setItem('analog-theme', themeKey);
    };
    applyTheme(currentTheme);

    toggleBtn.addEventListener('click', () => {
        currentTheme = currentTheme === 'phosphor' ? 'amber' : 'phosphor';
        applyTheme(currentTheme);
    });
}


// 4. Contact Form Logic

function initContactForm() {
    const publicKey = window.env?.PUBLIC_KEY || ""; 
    const serviceID = window.env?.SERVICE_ID || "";
    const templateID = window.env?.TEMPLATE_ID || "";

    const form = document.getElementById('contact-form');
    const btn = document.getElementById('send-btn');
    const status = document.getElementById('form-status');
    const mathLabel = document.getElementById('math-label');
    const mathInput = document.getElementById('math-answer');

    if (!form) return;

    // 1. Generate Retro Math Challenge
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const correctAnswer = num1 + num2;
    if (mathLabel) mathLabel.innerText = `RETRO_AUTH_CHECK: ${num1} + ${num2} = ?`;

    if (!publicKey || !serviceID || !templateID) {
        console.warn("Signal Lost: EmailJS credentials missing. Form is in offline mode.");
        return;
    }

    emailjs.init(publicKey);

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // 2. Honeypot check
        const hp = form.querySelector('input[name="hp_full_name"]');
        if (hp && hp.value !== "") {
            if (status) {
                status.style.color = "var(--alert-red)";
                status.innerText = "> ERROR: UNAUTHORIZED DATA INJECTION DETECTED.";
            }
            return;
        }

        // 3. Rate-limiting check (2 minute cooldown)
        const lastSent = localStorage.getItem('contact_cooldown');
        const now = Date.now();
        if (lastSent && (now - lastSent < 120000)) {
            if (status) {
                status.style.color = "var(--alert-red)";
                const wait = Math.ceil((120000 - (now - lastSent)) / 1000);
                status.innerText = `> ERROR: FREQUENCY LIMIT EXCEEDED. RETRY IN ${wait}s.`;
            }
            return;
        }

        // 4. Math Check
        if (parseInt(mathInput.value) !== correctAnswer) {
            if (status) {
                status.style.color = "var(--alert-red)";
                status.innerText = "> ERROR: AUTHENTICATION FAILED. INCORRECT PAYLOAD SUM.";
            }
            return;
        }

        // 5. Basic Sanitization & Regex
        const email = form.querySelector('input[name="reply_to"]').value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            if (status) {
                status.style.color = "var(--alert-red)";
                status.innerText = "> ERROR: INVALID SIGNAL SOURCE (EMAIL).";
            }
            return;
        }

        if (btn) {
            btn.innerText = "TRANSMITTING...";
            btn.disabled = true;
        }
        if (status) {
            status.style.color = "var(--accent-glow)";
            status.innerText = "> INITIALIZING UPLINK...";
        }

        emailjs.sendForm(serviceID, templateID, form)
            .then(() => {
                localStorage.setItem('contact_cooldown', Date.now());
                if (btn) btn.innerText = "TRANSMISSION SUCCESS";
                if (status) {
                    status.style.color = "var(--accent-glow)";
                    status.innerText = "> SIGNAL RECEIVED. ENCRYPTED RESPONSE PENDING.";
                }
                form.reset();
                
                setTimeout(() => { 
                    if (btn) {
                        btn.innerText = "SEND TRANSMISSION"; 
                        btn.disabled = false; 
                    }
                    if (status) status.innerText = "";
                }, 5000);
            })
            .catch((err) => {
                if (btn) {
                    btn.innerText = "TRANSMISSION FAILED";
                    btn.disabled = false;
                }
                if (status) {
                    status.style.color = "var(--alert-red)";
                    status.innerText = "> ERROR: SIGNAL LOST. RETRY REQUIRED.";
                }
                console.error("Uplink Error:", err);
            });
    });
}
// 5. Initialize Event Listeners
if (nextBtn) nextBtn.addEventListener('click', nextChannel);
if (prevBtn) prevBtn.addEventListener('click', prevChannel);
if (knob) knob.addEventListener('click', nextChannel);
if (powerBtn) powerBtn.addEventListener('click', togglePower);

if (screen) {
    screen.addEventListener('mousemove', (e) => {
        if (!isPowerOn) return;

        const rect = screen.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        staticNoise.style.setProperty('--x', `${x}px`);
        staticNoise.style.setProperty('--y', `${y}px`);
    });
}
// Social Panel Logic
function initSocialPanel() {
    const panel = document.getElementById('social-panel');
    const openBtn = document.getElementById('open-socials');
    if (!panel || !openBtn) return;
    openBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        panel.classList.toggle('active');
    });
    document.addEventListener('click', (e) => {
        if (panel.classList.contains('active') && 
            !panel.contains(e.target) && 
            !openBtn.contains(e.target)) {
            panel.classList.remove('active');
        }
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === "Escape" && panel.classList.contains('active')) {
            panel.classList.remove('active');
        }
    });
}
// 6. Bootstrap Application
function initScrollReveal() {
    const observerOptions = {
        threshold: 0.1 
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('section, .reveal, .scratch-reveal').forEach(el => {
        observer.observe(el);
    });
}

/**
 * PARALLAX ENGINE
 * Uses requestAnimationFrame for 60fps performance
 */
function initParallax() {
    const elements = document.querySelectorAll('[data-parallax]');
    if (elements.length === 0) return;

    let ticking = false;

    function updateParallax() {
        const scrolled = window.pageYOffset;
        
        elements.forEach(el => {
            const speed = parseFloat(el.getAttribute('data-speed')) || 0.1;
            const rect = el.getBoundingClientRect();
            const elementTop = rect.top + scrolled;
            
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const shift = (scrolled - elementTop + window.innerHeight / 2) * speed;
                el.style.transform = `translateY(${shift}px)`;
                
                if (el.classList.contains('tv-set')) {
                    const rotateX = 2 + (shift * 0.05);
                    el.style.transform = `translateY(${shift}px) rotateX(${rotateX}deg)`;
                }
            }
        });

        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });

    updateParallax();
}

function initDebrisField() {
    const container = document.getElementById('debris-field');
    if (!container) return;

    // Fixed pathing and added 'game.png'
    const assets = [
        'assets/images/parallax/floppy.png',
        'assets/images/parallax/crt.png',
        'assets/images/parallax/game.png',
        'assets/images/parallax/vhs.png'
    ];

    const hardwareCount = 12;
    const pixelCount = 20;
    const debris = [];

    // Create Hardware Debris
    for (let i = 0; i < hardwareCount; i++) {
        const item = document.createElement('img');
        const assetIndex = i % assets.length;
        
        item.src = assets[assetIndex];
        item.className = 'debris-item';
        
        // Safety Catch: Hide broken images
        item.onerror = () => item.style.display = 'none';
        
        const depth = Math.random() * 0.8 + 0.1;
        const startX = Math.random() * 100;
        const startY = Math.random() * 300; 
        const scale = 0.5 + Math.random() * 1.5;
        const rotation = Math.random() * 360;

        item.style.left = `${startX}%`;
        item.style.top = `${startY}%`;
        item.style.transform = `scale(${scale}) rotate(${rotation}deg)`;
        item.style.opacity = (1 - depth) * 0.3 + 0.05;
        
        container.appendChild(item);
        
        debris.push({
            el: item,
            depth: depth,
            y: startY,
            rotation: rotation,
            isFragment: false
        });
    }

    // Create Digital Fragments (Pixels/Artifacts)
    for (let j = 0; j < pixelCount; j++) {
        const frag = document.createElement('div');
        frag.className = 'pixel-fragment';
        
        const depth = Math.random() * 0.5 + 0.2;
        const startX = Math.random() * 100;
        const startY = Math.random() * 400;
        const size = Math.random() * 6 + 2;

        frag.style.width = `${size}px`;
        frag.style.height = `${size}px`;
        frag.style.left = `${startX}%`;
        frag.style.top = `${startY}%`;
        frag.style.opacity = (1 - depth) * 0.4;
        
        container.appendChild(frag);
        
        debris.push({
            el: frag,
            depth: depth,
            y: startY,
            rotation: 0,
            isFragment: true
        });
    }

    function updateDebris() {
        const scrolled = window.pageYOffset;
        
        debris.forEach(obj => {
            const driftY = (scrolled * obj.depth * -0.5);
            const driftX = Math.sin(scrolled * 0.002 + obj.y) * 20;

            if (!obj.isFragment) {
                const tilt = Math.cos(scrolled * 0.001) * 15;
                obj.el.style.transform = `translate(${driftX}px, ${driftY}px) rotate(${obj.rotation + tilt}deg)`;
            } else {
                obj.el.style.transform = `translate(${driftX * 0.5}px, ${driftY}px)`;
            }
        });
    }

    window.addEventListener('scroll', () => {
        window.requestAnimationFrame(updateDebris);
    });

    updateDebris(); // Initial positions
}

window.addEventListener('DOMContentLoaded', () => {
    renderTechStack();
    renderProject();
    renderArchives();
    renderSocials(); 
    initSocialPanel();
    initContactForm(); 
    initThemeToggle();
    initScrollReveal();
    initParallax();
    initDebrisField();
});