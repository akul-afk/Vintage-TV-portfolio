
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
    // --- LOCAL DEVELOPMENT OVERRIDE ---
    /*
    window.env = {
        PUBLIC_KEY: "",
        SERVICE_ID: "",
        TEMPLATE_ID: ""
    };
    */
    const publicKey = window.env?.PUBLIC_KEY || ""; 
    const serviceID = window.env?.SERVICE_ID || "";
    const templateID = window.env?.TEMPLATE_ID || "";

    if (!publicKey || !serviceID || !templateID) {
        console.warn("Signal Lost: EmailJS credentials missing. Form is in offline mode.");
        return;
    }

    emailjs.init(publicKey);

    const form = document.getElementById('contact-form');
    const btn = document.getElementById('send-btn');
    const status = document.getElementById('form-status');
    const honeypot = document.getElementById('honeypot');

    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (honeypot && honeypot.value !== "") {
            if (status) status.innerText = "> ERROR: UNAUTHORIZED ACCESS.";
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
                if (btn) btn.innerText = "TRANSMISSION SUCCESS";
                if (status) status.innerText = "> SIGNAL RECEIVED. ENCRYPTED RESPONSE PENDING.";
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

    document.querySelectorAll('section, .tv-set, .shelf-container').forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });
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
});