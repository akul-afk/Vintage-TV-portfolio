

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

    // 'projects' is globally available from data.js
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

// 4. Contact Form Logic
function initContactForm() {
    emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY); 

    const form = document.getElementById('contact-form');
    const btn = document.getElementById('send-btn');
    const status = document.getElementById('form-status');

    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault(); 

       
        if (btn) {
            btn.innerText = "TRANSMITTING...";
            btn.disabled = true;
        }
        if (status) {
            status.style.color = "var(--accent-glow)";
            status.innerText = "> INITIALIZING UPLINK...";
        }

        emailjs.sendForm(
            EMAILJS_CONFIG.SERVICE_ID, 
            EMAILJS_CONFIG.TEMPLATE_ID, 
            form
        )
        .then(() => {
        
            if (btn) btn.innerText = "TRANSMISSION SUCCESS";
            if (status) {
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
           
            if (btn) btn.innerText = "TRANSMISSION FAILED";
            if (btn) btn.disabled = false;
            
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

// 6. Bootstrap Application
window.addEventListener('DOMContentLoaded', () => {
    renderProject();
    renderArchives();
    initContactForm(); 
});