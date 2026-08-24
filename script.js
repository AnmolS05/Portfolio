document.addEventListener('DOMContentLoaded', () => {
    // Navigation Logic
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section-block');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all
            navLinks.forEach(l => l.classList.remove('active'));
            // Smooth scroll to section
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Load Data if available
    if (typeof portfolioData !== 'undefined') {
        loadProjects(portfolioData.projects);
        loadCertificates(portfolioData.certificates);
    }

    // Typewriter effect
    typeWriter();

    // Dynamic Greeting
    setDynamicGreeting();

    // Chatbot Initialization
    initChatbot();

    // 3D Tilt Effect
    initTilt();

    // Boot Sequence
    initBootSequence();

    // Particle Canvas
    initParticles();
});

function setDynamicGreeting() {
    const welcomeTitle = document.getElementById('welcome-title');
    if (welcomeTitle) {
        const hour = new Date().getHours();
        let greeting = 'Good evening';
        if (hour < 12) greeting = 'Good morning';
        else if (hour < 18) greeting = 'Good afternoon';
        
        welcomeTitle.innerText = `${greeting}. Welcome to my universe.`;
    }
}

// Chatbot Logic
function initChatbot() {
    const toggleBtn = document.getElementById('chat-toggle');
    const chatWindow = document.getElementById('chat-window');
    const chatScreen = document.getElementById('chat-screen');
    const chatInput = document.getElementById('chat-input');
    const sendMsgBtn = document.getElementById('send-msg-btn');
    const chatHistory = document.getElementById('chat-history');
    
    let isFirstOpen = true;

    toggleBtn.addEventListener('click', () => {
        chatWindow.style.display = chatWindow.style.display === 'none' ? 'flex' : 'none';
        if (chatWindow.style.display === 'flex' && isFirstOpen) {
            isFirstOpen = false;
            addMessage("Hi there! I'm an AI assistant based on Anmol's portfolio. Ask me anything about his projects, skills, or experience!", 'ai');
        }
    });

    async function handleSend() {
        const msg = chatInput.value.trim();
        if (!msg) return;

        addMessage(msg, 'user');
        chatInput.value = '';

        const apiKey = 'AIzaSyDjuT3RC52SsilpdxgHyJksl3o216Yv8Tw';
        if (!apiKey) return;

        const typingId = "typing-" + Date.now();
        addTypingIndicator(typingId);

        try {
            const sysContext = "You are an AI representing Anmol S Poojary. Answer questions based on this data: " + JSON.stringify(portfolioData) + ". Keep answers brief, professional, and friendly.";
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key=${apiKey}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: sysContext + "\nUser question: " + msg }] }]
                })
            });
            const data = await response.json();
            
            removeTypingIndicator(typingId);
            
            if (data.error) {
                addMessage("Error: " + data.error.message, 'ai');
                return;
            }

            const aiText = data.candidates[0].content.parts[0].text;
            addMessage(aiText, 'ai');
        } catch (error) {
            removeTypingIndicator(typingId);
            addMessage("Sorry, I encountered an error connecting to the API.", 'ai');
        }
    }

    sendMsgBtn.addEventListener('click', handleSend);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSend();
    });

    function addMessage(text, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `chat-message ${sender}`;
        msgDiv.innerText = text;
        chatHistory.appendChild(msgDiv);
        chatHistory.scrollTop = chatHistory.scrollHeight;
    }

    function addTypingIndicator(id) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `chat-message ai`;
        msgDiv.id = id;
        msgDiv.innerHTML = `<div class="typing-indicator"><span></span><span></span><span></span></div>`;
        chatHistory.appendChild(msgDiv);
        chatHistory.scrollTop = chatHistory.scrollHeight;
    }

    function removeTypingIndicator(id) {
        const el = document.getElementById(id);
        if (el) el.remove();
    }
    
    // Animated Chat Placeholder
    const placeholders = [
        "Ask me about Anmol's projects...",
        "What is his tech stack?",
        "Does Anmol know React?",
        "Tell me about his internship."
    ];
    let phIndex = 0;
    let phCharIndex = 0;
    let isDeleting = false;
    
    function animatePlaceholder() {
        const currentPh = placeholders[phIndex];
        if (isDeleting) {
            chatInput.setAttribute('placeholder', currentPh.substring(0, phCharIndex - 1));
            phCharIndex--;
        } else {
            chatInput.setAttribute('placeholder', currentPh.substring(0, phCharIndex + 1));
            phCharIndex++;
        }
        
        let typingSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && phCharIndex === currentPh.length) {
            typingSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && phCharIndex === 0) {
            isDeleting = false;
            phIndex = (phIndex + 1) % placeholders.length;
            typingSpeed = 500; // Pause before new word
        }
        
        setTimeout(animatePlaceholder, typingSpeed);
    }
    
    // Start animation if chat input exists
    if(chatInput) {
        animatePlaceholder();
    }
}

// Scroll Progress, Spy Logic & Scroll to Top
window.addEventListener('scroll', () => {
    // Progress Bar & Cursor Progress Ring
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolledPercentage = winScroll / height;
    
    document.getElementById('scroll-progress').style.width = (scrolledPercentage * 100) + "%";
    
    const cursorProgress = document.querySelector('.cursor-progress');
    if (cursorProgress) {
        const circumference = 113; // 2 * pi * 18
        const offset = circumference - (scrolledPercentage * circumference);
        cursorProgress.style.strokeDashoffset = offset;
    }
    
    // Scroll to Top Button
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (winScroll > 300) {
        scrollTopBtn.style.display = "block";
    } else {
        scrollTopBtn.style.display = "none";
    }

    // Scroll Spy
    let currentSection = '';
    const sections = document.querySelectorAll('section');
    sections.forEach(sec => {
        const sectionTop = sec.offsetTop;
        if (winScroll >= sectionTop - 150) {
            currentSection = sec.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === currentSection) {
            link.classList.add('active');
        }
    });
});

// Scroll to top functionality
document.getElementById('scrollTopBtn')?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Interactive Glass Glow & Cursor
const customCursor = document.getElementById('custom-cursor');
document.addEventListener('mousemove', e => {
    // Magic cursor logic
    if (customCursor) {
        customCursor.style.left = e.clientX + 'px';
        customCursor.style.top = e.clientY + 'px';
    }

    // Parallax background shapes
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    document.querySelectorAll('.shape').forEach((shape, index) => {
        const speed = (index + 1) * 30;
        const xOffset = (x - 0.5) * speed;
        const yOffset = (y - 0.5) * speed;
        shape.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
    });

    document.querySelectorAll('.glass-panel, .card').forEach(panel => {
        const rect = panel.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        panel.style.setProperty('--mouse-x', `${x}px`);
        panel.style.setProperty('--mouse-y', `${y}px`);
    });
});

// Cursor Hover Effects
document.querySelectorAll('a, button, .card').forEach(el => {
    el.addEventListener('mouseenter', () => customCursor?.classList.add('hovering'));
    el.addEventListener('mouseleave', () => customCursor?.classList.remove('hovering'));
});

// Hacker Text Scramble Effect
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const profileName = document.getElementById('profile-name');

if (profileName) {
    profileName.addEventListener('mouseover', event => {
        let iteration = 0;
        clearInterval(profileName.dataset.interval);
        
        profileName.dataset.interval = setInterval(() => {
            event.target.innerText = event.target.innerText
                .split("")
                .map((letter, index) => {
                    if(index < iteration) {
                        return event.target.dataset.value[index];
                    }
                    return letters[Math.floor(Math.random() * 26)];
                })
                .join("");
            
            if(iteration >= event.target.dataset.value.length){ 
                clearInterval(profileName.dataset.interval);
            }
            
            iteration += 1 / 3;
        }, 30);
    });
}

// Magnetic Links & Buttons
document.querySelectorAll('.nav-link, .btn-primary').forEach(link => {
    link.addEventListener('mousemove', e => {
        const rect = link.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) * 0.3;
        const y = (e.clientY - rect.top - rect.height / 2) * 0.3;
        link.style.transform = `translate(${x}px, ${y}px)`;
    });
    link.addEventListener('mouseleave', () => {
        link.style.transform = `translate(0px, 0px)`;
    });
});

// Typewriter Logic
const taglines = [
    "Software Developer & Innovator",
    "Full-Stack Engineer",
    "Applied AI Enthusiast",
    "Geospatial Data Visualizer"
];
let taglineIndex = 0;
let charIndex = 0;
let isDeletingTagline = false;

function typeWriter() {
    const currentTagline = taglines[taglineIndex];
    const taglineElement = document.getElementById("tagline-text");
    
    if (taglineElement) {
        if (isDeletingTagline) {
            taglineElement.innerHTML = currentTagline.substring(0, charIndex - 1);
            charIndex--;
        } else {
            taglineElement.innerHTML = currentTagline.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeletingTagline ? 50 : 100;
        
        if (!isDeletingTagline && charIndex === currentTagline.length) {
            typeSpeed = 2000; // Pause at the end of the word
            isDeletingTagline = true;
        } else if (isDeletingTagline && charIndex === 0) {
            isDeletingTagline = false;
            taglineIndex = (taglineIndex + 1) % taglines.length;
            typeSpeed = 500; // Pause before typing next word
        }
        
        setTimeout(typeWriter, typeSpeed);
    }
}
// Remove window.onload since typeWriter is called in DOMContentLoaded

// Scroll Animation Observer
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

function loadProjects(projects) {
    const container = document.getElementById('projects-container');
    container.innerHTML = '';
    
    if (!projects || projects.length === 0) {
        container.innerHTML = '<p>No projects found.</p>';
        return;
    }

    projects.forEach((proj, index) => {
        const card = document.createElement('div');
        card.className = 'card tilt-card fade-in-up';
        card.style.transitionDelay = `${index * 0.1}s`;
        const repoName = proj.github || proj.name.replace(/\s+/g, '-');
        card.onclick = () => window.open(`https://github.com/AnmolS05/${repoName}`, '_blank');
        card.style.cursor = 'pointer';
        card.innerHTML = `
            <div class="glare"></div>
            <h3>${formatName(proj.name)}</h3>
            <p>${proj.description}</p>
            <div class="tags">
                ${(proj.technologies || []).slice(0,3).map(t => {
                    const tech = t.toLowerCase();
                    let color = '#fff';
                    let bg = 'rgba(255,255,255,0.1)';
                    if (tech.includes('react')) { color = '#61dafb'; bg = 'rgba(97,218,251,0.1)'; }
                    else if (tech.includes('python')) { color = '#ffdf76'; bg = 'rgba(255,223,118,0.1)'; }
                    else if (tech.includes('node')) { color = '#68a063'; bg = 'rgba(104,160,99,0.1)'; }
                    else if (tech.includes('js') || tech.includes('javascript')) { color = '#f7df1e'; bg = 'rgba(247,223,30,0.1)'; }
                    else if (tech.includes('css')) { color = '#264de4'; bg = 'rgba(38,77,228,0.1)'; }
                    else if (tech.includes('html')) { color = '#e34c26'; bg = 'rgba(227,76,38,0.1)'; }
                    else if (tech.includes('next')) { color = '#000000'; bg = 'rgba(255,255,255,0.8)'; }
                    
                    return `<span style="color: ${color}; background: ${bg}; border: 1px solid ${color}40">${t}</span>`;
                }).join('')}
            </div>
            <div class="hover-reveal"><span>View Project &rarr;</span></div>
        `;
        container.appendChild(card);
        observer.observe(card);
    });
    
    // Add Tooltip logic for tags
    const tooltip = document.getElementById('custom-tooltip');
    if (tooltip) {
        document.querySelectorAll('.tags span').forEach(tag => {
            tag.addEventListener('mouseenter', (e) => {
                const techName = e.target.innerText;
                tooltip.innerText = `Built with ${techName}`;
                tooltip.style.opacity = '1';
                tooltip.style.transform = `translate(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 150%)) scale(1.1)`;
            });
            tag.addEventListener('mousemove', (e) => {
                tooltip.style.left = e.clientX + 'px';
                tooltip.style.top = e.clientY + 'px';
            });
            tag.addEventListener('mouseleave', () => {
                tooltip.style.opacity = '0';
                tooltip.style.transform = `translate(-50%, -150%) scale(1)`;
            });
        });
    }
    

    
    // Update section title with count
    const title = document.querySelector('#projects .section-title');
    if (title && !title.innerText.includes('(')) {
        title.innerText = `Projects (${projects.length})`;
    }
}

function loadCertificates(certs) {
    const container = document.getElementById('certificates-container');
    container.innerHTML = '';

    if (!certs || certs.length === 0) {
        container.innerHTML = '<p>No certificates found.</p>';
        return;
    }

    certs.forEach((cert, index) => {
        const card = document.createElement('div');
        card.className = 'card tilt-card fade-in-up';
        card.style.transitionDelay = `${index * 0.1}s`;
        card.onclick = () => window.open(cert.path, '_blank');
        card.innerHTML = `
            <div class="glare"></div>
            <h3>${cert.name}</h3>
            <span class="cert-type">${cert.type}</span>
            <br>
            <div class="hover-reveal"><span>View Document &rarr;</span></div>
        `;
        container.appendChild(card);
        observer.observe(card);
    });
    
    // Update section title with count
    const title = document.querySelector('#certificates .section-title');
    if (title && !title.innerText.includes('(')) {
        title.innerText = `Certificates (${certs.length})`;
    }
    
    initTilt();
}

function initTilt() {
    const cards = document.querySelectorAll('.tilt-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            
            const glare = card.querySelector('.glare');
            if (glare) {
                glare.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255, 255, 255, 0.2), transparent 50%)`;
            }
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)`;
            const glare = card.querySelector('.glare');
            if (glare) {
                glare.style.background = `radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.2), transparent 50%)`;
            }
        });
    });
}

function formatName(filename) {
    // Remove extension and replace dashes/underscores with spaces
    let name = filename.replace(/\.[^/.]+$/, "");
    name = name.replace(/[-_]/g, ' ');
    // Title case
    return name.replace(
        /\w\S*/g,
        function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}

function initBootSequence() {
    const bootSequence = document.getElementById('boot-sequence');
    const bootText = document.querySelector('.boot-text');
    
    if (!bootSequence || !bootText) return;
    
    if (sessionStorage.getItem('hasBooted')) {
        bootSequence.style.display = 'none';
        return;
    }
    
    sessionStorage.setItem('hasBooted', 'true');
    
    const sequence = [
        "Initializing system...",
        "Loading components...",
        "Establishing secure connection...",
        "Access granted. Welcome."
    ];
    
    let step = 0;
    
    function runSequence() {
        if (step < sequence.length) {
            bootText.innerText = sequence[step];
            step++;
            setTimeout(runSequence, 400); // 400ms per text
        } else {
            setTimeout(() => {
                bootSequence.style.opacity = '0';
                setTimeout(() => {
                    bootSequence.style.display = 'none';
                }, 500);
            }, 500);
        }
    }
    
    runSequence();
}

function initParticles() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particlesArray;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let mouse = {
        x: null,
        y: null,
        radius: (canvas.height/80) * (canvas.width/80)
    };

    window.addEventListener('mousemove', function(event) {
        mouse.x = event.x;
        mouse.y = event.y;
    });

    window.addEventListener('mouseout', function() {
        mouse.x = undefined;
        mouse.y = undefined;
    });

    class Particle {
        constructor(x, y, directionX, directionY, size, color) {
            this.x = x;
            this.y = y;
            this.directionX = directionX;
            this.directionY = directionY;
            this.size = size;
            this.color = color;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
        update() {
            if (this.x > canvas.width || this.x < 0) {
                this.directionX = -this.directionX;
            }
            if (this.y > canvas.height || this.y < 0) {
                this.directionY = -this.directionY;
            }
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx*dx + dy*dy);
            if (distance < mouse.radius + this.size) {
                if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
                    this.x += 10;
                }
                if (mouse.x > this.x && this.x > this.size * 10) {
                    this.x -= 10;
                }
                if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
                    this.y += 10;
                }
                if (mouse.y > this.y && this.y > this.size * 10) {
                    this.y -= 10;
                }
            }
            this.x += this.directionX;
            this.y += this.directionY;
            this.draw();
        }
    }

    function init() {
        particlesArray = [];
        let numberOfParticles = (canvas.height * canvas.width) / 15000;
        for (let i = 0; i < numberOfParticles; i++) {
            let size = (Math.random() * 2) + 1;
            let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
            let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
            let directionX = (Math.random() * 2) - 1;
            let directionY = (Math.random() * 2) - 1;
            let color = '#8b5cf6';
            particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
        }
    }

    function connect() {
        let opacityValue = 1;
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a; b < particlesArray.length; b++) {
                let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) + ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
                if (distance < (canvas.width/7) * (canvas.height/7)) {
                    opacityValue = 1 - (distance/20000);
                    ctx.strokeStyle = 'rgba(139, 92, 246,' + opacityValue + ')';
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, innerWidth, innerHeight);
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
        }
        connect();
    }

    window.addEventListener('resize', function() {
        canvas.width = innerWidth;
        canvas.height = innerHeight;
        mouse.radius = (canvas.height/80) * (canvas.width/80);
        init();
    });

    init();
    animate();
}
