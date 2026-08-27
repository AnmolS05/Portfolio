document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lenis Smooth Scrolling for buttery UX
    if (typeof Lenis !== 'undefined') {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smooth: true
        });
        
        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
        
        if (typeof ScrollTrigger !== 'undefined') {
            lenis.on('scroll', ScrollTrigger.update);
            gsap.ticker.add((time)=>{ lenis.raf(time * 1000) });
            gsap.ticker.lagSmoothing(0);
        }
    }

    initBootSequence();

    // Navigation Logic
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section-block');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Smooth scroll to section using GSAP
            const targetId = link.getAttribute('href');
            if (typeof gsap !== 'undefined') {
                gsap.to(window, {
                    duration: 1.2,
                    scrollTo: { y: targetId, offsetY: 20 },
                    ease: "power3.inOut"
                });
            } else {
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }
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

    // Boot Sequence
    initBootSequence();

    // Particle Canvas (WebGL Nebula)
    initParticles();

    // GSAP ScrollTrigger animations
    initGSAPAnimations();
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

        const typingId = "typing-" + Date.now();
        addTypingIndicator(typingId);

        try {
            // Sanitize data to avoid leaking local paths to visitors
            const sanitizedData = JSON.parse(JSON.stringify(portfolioData));
            if (sanitizedData.projects) sanitizedData.projects.forEach(p => delete p.path);
            if (sanitizedData.certificates) sanitizedData.certificates.forEach(c => delete c.path);
            
            const sysContext = "You are an AI representing Anmol S Poojary. Answer questions based on this data: " + JSON.stringify(sanitizedData) + ". Keep answers brief, professional, and friendly. Never mention internal system paths.";
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ msg, sysContext })
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
        
        let targetUrl = '';
        if (proj.live) {
            targetUrl = proj.live;
        } else {
            const repoName = proj.github || proj.name.replace(/\s+/g, '-');
            targetUrl = `https://github.com/AnmolS05/${repoName}`;
        }
        
        card.onclick = () => window.open(targetUrl, '_blank');
        card.style.cursor = 'pointer';
        card.innerHTML = `
            <div class="glare"></div>
            <h3>${formatName(proj.name)}</h3>
            <p>${proj.description}</p>
            <div class="tags">
                ${(proj.technologies || []).slice(0,5).map(t => {
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
                    else if (tech.includes('gemini') || tech.includes('ai')) { color = '#8b5cf6'; bg = 'rgba(139,92,246,0.1)'; }
                    else if (tech.includes('tailwind')) { color = '#38bdf8'; bg = 'rgba(56,189,248,0.1)'; }
                    
                    return `<span style="color: ${color}; background: ${bg}; border: 1px solid ${color}40">${t}</span>`;
                }).join('')}
            </div>
            <div class="hover-reveal"><span>${proj.live ? 'View Live App' : 'View Project'} &rarr;</span></div>
        `;
        container.appendChild(card);
        observer.observe(card);
        
        // Initialize VanillaTilt if available
        if (typeof VanillaTilt !== 'undefined') {
            VanillaTilt.init(card, {
                max: 15,
                speed: 400,
                glare: true,
                "max-glare": 0.05,
                scale: 1.05
            });
        }
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
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(cards, {
            max: 15,
            speed: 400,
            glare: true,
            'max-glare': 0.3,
            scale: 1.05,
            perspective: 1000,
            gyroscope: true
        });
    }
}

/**
 * Initializes GSAP ScrollTrigger-based reveal animations for sections,
 * cards, timeline items, skill bars, and text elements.
 */
function initGSAPAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    // Section titles — slide in from left with underline draw and scramble
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.from(title, {
            x: -60,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: title,
                start: 'top 85%',
                toggleActions: 'play none none none',
                onEnter: () => scrambleText(title)
            }
        });
    });

    // Cards — stagger animate from below
    gsap.utils.toArray('.grid-container').forEach(container => {
        const cards = container.querySelectorAll('.card');
        gsap.from(cards, {
            y: 60,
            opacity: 0,
            scale: 0.9,
            duration: 0.6,
            stagger: 0.1,
            ease: 'back.out(1.4)',
            scrollTrigger: {
                trigger: container,
                start: 'top 85%',
                toggleActions: 'play none none none'
            }
        });
    });

    // Timeline items — fade in from left
    gsap.utils.toArray('.timeline-item').forEach((item, i) => {
        gsap.from(item, {
            x: -40,
            opacity: 0,
            duration: 0.6,
            delay: i * 0.15,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: item,
                start: 'top 90%',
                toggleActions: 'play none none none'
            }
        });
    });

    // Skill bars — animate width when in view
    gsap.utils.toArray('.skill-bar-fill').forEach(bar => {
        const targetWidth = bar.style.width;
        bar.style.width = '0%';
        bar.style.animation = 'none';
        gsap.to(bar, {
            width: targetWidth,
            duration: 1.2,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: bar,
                start: 'top 90%',
                toggleActions: 'play none none none'
            }
        });
    });

    // Intro text — word-by-word fade in
    const introText = document.querySelector('.intro-text');
    if (introText) {
        const text = introText.textContent;
        const words = text.split(' ');
        introText.innerHTML = words.map(w => `<span class="word-reveal">${w}</span>`).join(' ');

        gsap.from('.word-reveal', {
            opacity: 0,
            y: 15,
            filter: 'blur(4px)',
            duration: 0.4,
            stagger: 0.03,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: introText,
                start: 'top 85%',
                toggleActions: 'play none none none'
            }
        });
    }

    // Dynamic Active Link Highlighting
    const sections = document.querySelectorAll('.section-block');
    const navLinks = document.querySelectorAll('.nav-link');

    sections.forEach(section => {
        ScrollTrigger.create({
            trigger: section,
            start: "top center",
            end: "bottom center",
            onToggle: self => {
                if(self.isActive) {
                    const id = section.getAttribute('id');
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        }
                    });
                }
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
    const progressFill = document.querySelector('.boot-progress-fill');
    
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
            // Re-trigger glitch animation
            bootText.style.animation = 'none';
            bootText.offsetHeight; // Force reflow
            bootText.style.animation = 'glitchText 0.3s ease-in-out';
            
            bootText.innerText = sequence[step];
            
            // Update progress bar
            if (progressFill) {
                const progress = ((step + 1) / sequence.length) * 100;
                progressFill.style.width = progress + '%';
            }
            
            step++;
            setTimeout(runSequence, 500);
        } else {
            setTimeout(() => {
                // Cinematic circular reveal exit
                bootSequence.classList.add('exit');
                setTimeout(() => {
                    bootSequence.style.display = 'none';
                }, 800);
            }, 400);
        }
    }
    
    runSequence();
}

function initParticles() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas || typeof THREE === 'undefined') return;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    
    // Change to PerspectiveCamera to support 3D floating particles
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const uniforms = {
        u_time: { value: 0.0 },
        u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
        u_clickPos: { value: new THREE.Vector2(-1.0, -1.0) },
        u_clickTime: { value: -10.0 }
    };

    const vertexShader = `
        void main() {
            // Force plane to fill entire screen in clip space
            gl_Position = vec4(position.xy, 1.0, 1.0);
        }
    `;

    const fragmentShader = `
        precision highp float;
        uniform float u_time;
        uniform vec2 u_resolution;
        uniform vec2 u_mouse;
        uniform vec2 u_clickPos;
        uniform float u_clickTime;

        // Simplex-style hash
        vec3 hash33(vec3 p) {
            p = fract(p * vec3(443.8975, 397.2973, 491.1871));
            p += dot(p, p.yxz + 19.19);
            return fract(vec3((p.x + p.y) * p.z, (p.x + p.z) * p.y, (p.y + p.z) * p.x));
        }

        float noise(vec3 p) {
            vec3 i = floor(p);
            vec3 f = fract(p);
            f = f * f * (3.0 - 2.0 * f);
            float n = mix(
                mix(mix(dot(hash33(i), f), dot(hash33(i + vec3(1,0,0)), f - vec3(1,0,0)), f.x),
                    mix(dot(hash33(i + vec3(0,1,0)), f - vec3(0,1,0)), dot(hash33(i + vec3(1,1,0)), f - vec3(1,1,0)), f.x), f.y),
                mix(mix(dot(hash33(i + vec3(0,0,1)), f - vec3(0,0,1)), dot(hash33(i + vec3(1,0,1)), f - vec3(1,0,1)), f.x),
                    mix(dot(hash33(i + vec3(0,1,1)), f - vec3(0,1,1)), dot(hash33(i + vec3(1,1,1)), f - vec3(1,1,1)), f.x), f.y), f.z);
            return n * 0.5 + 0.5;
        }

        float fbm(vec3 p) {
            float v = 0.0;
            float a = 0.5;
            for (int i = 0; i < 5; i++) {
                v += a * noise(p);
                p *= 2.0;
                a *= 0.5;
            }
            return v;
        }

        void main() {
            vec2 uv = gl_FragCoord.xy / u_resolution.xy;
            float t = u_time * 0.08;

            // Mouse influence
            vec2 mouse = u_mouse * 0.3;

            // Shockwave Distortion
            float timeSinceClick = u_time - u_clickTime;
            vec2 distortedUV = uv;
            if (timeSinceClick > 0.0 && timeSinceClick < 2.0) {
                float clickDist = distance(uv, u_clickPos);
                float radius = timeSinceClick * 1.5;
                float distFromRing = abs(clickDist - radius);
                if (distFromRing < 0.2) {
                    float wave = sin(distFromRing * 40.0 - timeSinceClick * 20.0);
                    float envelope = smoothstep(0.2, 0.0, distFromRing) * (1.0 - timeSinceClick * 0.5);
                    distortedUV += normalize(uv - u_clickPos) * wave * envelope * 0.05;
                }
            }

            // Layered noise for nebula effect
            vec3 p = vec3(distortedUV * 3.0 + mouse, t);
            float n1 = fbm(p);
            float n2 = fbm(p + vec3(1.7, 9.2, 1.3) + t * 0.5);
            float n3 = fbm(p + vec3(n1 * 0.5, n2 * 0.3, 0.0));

            // Color mixing — deep purple, electric cyan, magenta
            vec3 col = vec3(0.0);
            col += vec3(0.545, 0.361, 0.965) * n1 * 0.6;  // #8b5cf6 purple
            col += vec3(0.220, 0.741, 0.973) * n2 * 0.4;  // #38bdf8 cyan
            col += vec3(0.753, 0.149, 0.827) * n3 * 0.3;  // #c026d3 magenta

            // Darken edges with vignette
            float vignette = 1.0 - length((uv - 0.5) * 1.5);
            vignette = smoothstep(0.0, 0.7, vignette);
            col *= vignette;

            // Overall brightness control
            col *= 0.35;

            // Mix with dark navy base
            vec3 base = vec3(0.059, 0.090, 0.165); // #0f172a
            col = mix(base, col + base, 0.7);

            gl_FragColor = vec4(col, 1.0);
        }
    `;

    const material = new THREE.ShaderMaterial({
        uniforms,
        vertexShader,
        fragmentShader,
        depthWrite: false,
        depthTest: false
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    // Draw background behind everything
    mesh.renderOrder = -1;
    scene.add(mesh);

    // ==========================================
    // ADD 3D INTERACTIVE STARFIELD OVERLAY
    // ==========================================
    const starsGeometry = new THREE.BufferGeometry();
    const starsCount = 1500;
    const posArray = new Float32Array(starsCount * 3);
    const colorArray = new Float32Array(starsCount * 3);
    
    const colorOptions = [
        new THREE.Color(0x8b5cf6), // Purple
        new THREE.Color(0x38bdf8), // Cyan
        new THREE.Color(0xc026d3), // Magenta
        new THREE.Color(0xffffff)  // White
    ];

    for(let i = 0; i < starsCount * 3; i+=3) {
        // Spread particles in a large sphere
        posArray[i] = (Math.random() - 0.5) * 20;
        posArray[i+1] = (Math.random() - 0.5) * 20;
        posArray[i+2] = (Math.random() - 0.5) * 15 - 5; // Push slightly back

        const color = colorOptions[Math.floor(Math.random() * colorOptions.length)];
        colorArray[i] = color.r;
        colorArray[i+1] = color.g;
        colorArray[i+2] = color.b;
    }

    starsGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    starsGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));
    
    // Create soft glowing particles
    const starMaterial = new THREE.PointsMaterial({
        size: 0.05,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });
    
    const starMesh = new THREE.Points(starsGeometry, starMaterial);
    scene.add(starMesh);

    // ==========================================
    // ADD 3D FLOATING GEOMETRY
    // ==========================================
    const geoGroup = new THREE.Group();
    scene.add(geoGroup);
    
    const geometries = [
        new THREE.IcosahedronGeometry(0.8, 0),
        new THREE.OctahedronGeometry(0.6, 0),
        new THREE.TetrahedronGeometry(0.7, 0)
    ];
    
    const materials = colorOptions.map(color => new THREE.MeshBasicMaterial({
        color: color,
        wireframe: true,
        transparent: true,
        opacity: 0.15
    }));
    
    const shapes = [];
    for(let i = 0; i < 20; i++) {
        const geo = geometries[Math.floor(Math.random() * geometries.length)];
        const mat = materials[Math.floor(Math.random() * materials.length)];
        const shape = new THREE.Mesh(geo, mat);
        
        shape.position.x = (Math.random() - 0.5) * 20;
        shape.position.y = (Math.random() - 0.5) * 20;
        shape.position.z = (Math.random() - 0.5) * 10 - 2;
        
        shape.rotation.x = Math.random() * Math.PI;
        shape.rotation.y = Math.random() * Math.PI;
        
        const speed = {
            rx: (Math.random() - 0.5) * 0.01,
            ry: (Math.random() - 0.5) * 0.01,
            x: (Math.random() - 0.5) * 0.01,
            y: (Math.random() - 0.5) * 0.01
        };
        
        shapes.push({ mesh: shape, speed: speed });
        geoGroup.add(shape);
    }

    // Mouse & Scroll tracking
    let targetMouse = { x: 0.5, y: 0.5 };
    let scrollY = 0;

    window.addEventListener('mousemove', (e) => {
        targetMouse.x = e.clientX / window.innerWidth;
        targetMouse.y = 1.0 - e.clientY / window.innerHeight;
    });
    
    window.addEventListener('click', (e) => {
        uniforms.u_clickPos.value.x = e.clientX / window.innerWidth;
        uniforms.u_clickPos.value.y = 1.0 - e.clientY / window.innerHeight;
        uniforms.u_clickTime.value = uniforms.u_time.value;
    });

    window.addEventListener('scroll', () => {
        scrollY = window.scrollY;
    });

    // Resize handler
    window.addEventListener('resize', () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        uniforms.u_resolution.value.set(window.innerWidth, window.innerHeight);
    });

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        uniforms.u_time.value += 0.003; // SLOWED DOWN

        // Smooth mouse interpolation for shader
        uniforms.u_mouse.value.x += (targetMouse.x - uniforms.u_mouse.value.x) * 0.05;
        uniforms.u_mouse.value.y += (targetMouse.y - uniforms.u_mouse.value.y) * 0.05;

        // Rotate starfield slowly and based on mouse/scroll
        starMesh.rotation.y += 0.0002; // SLOWED DOWN
        starMesh.rotation.x = (targetMouse.y - 0.5) * 0.05 + scrollY * 0.0001; // FIXED: Vastly reduced mouse influence
        starMesh.rotation.y += (targetMouse.x - 0.5) * 0.01; // FIXED: Vastly reduced mouse influence

        // Animate floating geometry
        shapes.forEach(shapeObj => {
            shapeObj.mesh.rotation.x += shapeObj.speed.rx;
            shapeObj.mesh.rotation.y += shapeObj.speed.ry;
            shapeObj.mesh.position.x += shapeObj.speed.x;
            shapeObj.mesh.position.y += shapeObj.speed.y;
            
            // Bounce off boundaries
            if(Math.abs(shapeObj.mesh.position.x) > 12) shapeObj.speed.x *= -1;
            if(Math.abs(shapeObj.mesh.position.y) > 12) shapeObj.speed.y *= -1;
        });
        
        // Rotate geometry group based on mouse
        geoGroup.rotation.x += ( (targetMouse.y - 0.5) * 0.3 - geoGroup.rotation.x ) * 0.05;
        geoGroup.rotation.y += ( (targetMouse.x - 0.5) * 0.3 - geoGroup.rotation.y ) * 0.05;

        renderer.render(scene, camera);
    }

    animate();
}

/* =========================================================================
   Hacker Text Scramble Effect
   ========================================================================= */
function scrambleText(el) {
    const originalText = el.getAttribute('data-original-text') || el.innerText;
    if (!el.hasAttribute('data-original-text')) {
        el.setAttribute('data-original-text', originalText);
    }
    const chars = '!<>-_\\/[]{}—=+*^?#_';
    let iteration = 0;
    
    clearInterval(el.scrambleInterval);
    el.scrambleInterval = setInterval(() => {
        el.innerText = originalText
            .split("")
            .map((letter, index) => {
                if(index < iteration) return letter;
                if(letter === ' ') return ' ';
                return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("");
        
        if (iteration >= originalText.length) {
            clearInterval(el.scrambleInterval);
            el.innerText = originalText;
        }
        iteration += 1 / 2; // Controls decode speed
    }, 40);
}

/* =========================================================================
   Cursor Trail — Fading trail of dots behind custom cursor
   ========================================================================= */
(function initCursorTrail() {
    if (window.innerWidth < 768) return; // Skip on mobile

    const TRAIL_COUNT = 6;
    const trailDots = [];

    for (let i = 0; i < TRAIL_COUNT; i++) {
        const dot = document.createElement('div');
        dot.className = 'cursor-trail-dot';
        dot.style.opacity = (1 - i / TRAIL_COUNT) * 0.5;
        dot.style.width = (6 - i * 0.7) + 'px';
        dot.style.height = (6 - i * 0.7) + 'px';
        document.body.appendChild(dot);
        trailDots.push({ el: dot, x: 0, y: 0 });
    }

    let mouseX = 0, mouseY = 0;

    document.addEventListener('mousemove', e => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateTrail() {
        let prevX = mouseX, prevY = mouseY;
        trailDots.forEach((dot, i) => {
            const speed = 0.3 - i * 0.03;
            dot.x += (prevX - dot.x) * speed;
            dot.y += (prevY - dot.y) * speed;
            dot.el.style.left = dot.x + 'px';
            dot.el.style.top = dot.y + 'px';
            dot.el.style.opacity = (1 - i / TRAIL_COUNT) * 0.4;
            prevX = dot.x;
            prevY = dot.y;
        });
        requestAnimationFrame(animateTrail);
    }

    animateTrail();

    // ==========================================
    // TIMELINE ANIMATED GLOWING LINE
    // ==========================================
    gsap.utils.toArray('.timeline-list').forEach(list => {
        gsap.to(list, {
            '--timeline-progress': '1', // We will animate a custom property if we use CSS Variables, or we can animate the pseudo element via CSS variables. Wait, let's use a CSS variable for the scaleY.
            scrollTrigger: {
                trigger: list,
                start: "top 70%",
                end: "bottom 30%",
                scrub: 1
            },
            onUpdate: function() {
                list.style.setProperty('--progress', this.progress());
            }
        });
    });
})();

/* =========================================================================
   Button Ripple Effect — Material Design-style ripple on click
   ========================================================================= */
document.addEventListener('click', e => {
    const btn = e.target.closest('.btn');
    if (!btn) return;

    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
    ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
    btn.appendChild(ripple);

    ripple.addEventListener('animationend', () => ripple.remove());
});

// ==========================================
// SKILL CARD MOUSE TRACKING GLOW
// ==========================================
document.querySelectorAll('.skill-item').forEach(item => {
    item.addEventListener('mousemove', e => {
        const rect = item.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        item.style.setProperty('--mouse-x', `${x}px`);
        item.style.setProperty('--mouse-y', `${y}px`);
    });
});


/* =========================================================================
   Magnetic Hover Buttons
   ========================================================================= */
function initMagneticButtons() {
    const magneticElements = document.querySelectorAll('.nav-links a, .social-links a');
    
    magneticElements.forEach(elem => {
        elem.addEventListener('mousemove', (e) => {
            const rect = elem.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            // Pull the element towards the mouse
            elem.style.transform = "translate(" + (x * 0.3) + "px, " + (y * 0.3) + "px)";
            
            // If it's a social link, also pull the icon slightly more
            const icon = elem.querySelector('i');
            if(icon) {
                icon.style.transform = "translate(" + (x * 0.2) + "px, " + (y * 0.2) + "px)";
            }
        });
        
        elem.addEventListener('mouseleave', () => {
            elem.style.transform = 'translate(0px, 0px)';
            const icon = elem.querySelector('i');
            if(icon) {
                icon.style.transform = 'translate(0px, 0px)';
            }
        });
    });
}
document.addEventListener('DOMContentLoaded', initMagneticButtons);

/* =========================================================================
   Parallax Background Shapes
   ========================================================================= */
function initShapeParallax() {
    const shapes = document.querySelectorAll('.shape');
    if(shapes.length === 0) return;
    
    window.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth) - 0.5;
        const y = (e.clientY / window.innerHeight) - 0.5;
        
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 20;
            // Apply a soft translation based on mouse distance from center
            shape.style.transform = "translate(" + (x * speed) + "px, " + (y * speed) + "px)";
        });
    });
}
document.addEventListener('DOMContentLoaded', initShapeParallax);

/* =========================================================================
   Scroll Progress HUD Updater
   ========================================================================= */
function initScrollHUD() {
    const scrollProgress = document.getElementById('scroll-progress');
    if (!scrollProgress) return;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = scrollTop / docHeight;
        scrollProgress.style.height = (scrollPercent * 100) + '%';
    });
}
document.addEventListener('DOMContentLoaded', initScrollHUD);

/* =========================================================================
   Custom Sci-Fi Mouse Cursor Logic
   ========================================================================= */
function initCustomCursor() {
    const cursor = document.querySelector('.custom-cursor');
    const follower = document.querySelector('.custom-cursor-follower');
    if(!cursor || !follower) return;

    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        // The dot follows instantly
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });

    // The ring follows with a spring effect
    function animateCursor() {
        followerX += (mouseX - followerX) * 0.15;
        followerY += (mouseY - followerY) * 0.15;
        follower.style.left = followerX + 'px';
        follower.style.top = followerY + 'px';
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover effect on interactable elements
    const interactables = document.querySelectorAll('a, button, .card');
    interactables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            follower.classList.add('active');
            cursor.style.transform = 'translate(-50%, -50%) scale(0.5)';
        });
        el.addEventListener('mouseleave', () => {
            follower.classList.remove('active');
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });
}
document.addEventListener('DOMContentLoaded', initCustomCursor);

/* =========================================================================
   Scroll Spy (Active Section Highlighting)
   ========================================================================= */
function initScrollSpy() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    if(sections.length === 0 || navLinks.length === 0) return;

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5 // trigger when 50% of the section is visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove active class from all links
                navLinks.forEach(link => link.classList.remove('active-nav'));
                
                // Add active class to corresponding link
                const id = entry.target.getAttribute('id');
                const activeLink = document.querySelector(".nav-links a[href='#" + id + "']");
                if (activeLink) {
                    activeLink.classList.add('active-nav');
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
}
document.addEventListener('DOMContentLoaded', initScrollSpy);

/* =========================================================================
   Click Ripple Logic
   ========================================================================= */
function initClickRipple() {
    document.addEventListener('click', (e) => {
        const ripple = document.createElement('div');
        ripple.classList.add('click-ripple');
        
        // Base size
        const size = 30;
        ripple.style.width = size + 'px';
        ripple.style.height = size + 'px';
        
        // Position at click center
        ripple.style.left = (e.clientX - size / 2) + 'px';
        ripple.style.top = (e.clientY - size / 2) + 'px';
        
        document.body.appendChild(ripple);
        
        // Remove after animation finishes
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
}
document.addEventListener('DOMContentLoaded', initClickRipple);

/* =========================================================================
   Text Scramble on Hover
   ========================================================================= */
function initTextScramble() {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";
    const targets = document.querySelectorAll('.card h3');
    
    targets.forEach(target => {
        const originalText = target.innerText;
        target.dataset.value = originalText;
        
        target.closest('.card').addEventListener('mouseenter', () => {
            let iterations = 0;
            clearInterval(target.dataset.interval);
            
            target.dataset.interval = setInterval(() => {
                target.innerText = target.innerText
                    .split('')
                    .map((letter, index) => {
                        if(index < iterations) {
                            return target.dataset.value[index];
                        }
                        return letters[Math.floor(Math.random() * letters.length)];
                    })
                    .join('');
                    
                if(iterations >= target.dataset.value.length) {
                    clearInterval(target.dataset.interval);
                }
                
                iterations += 1/3;
            }, 30);
        });
    });
}

// Since cards are loaded dynamically in loadProjects and loadCertificates,
// we should wait a short time or hook it after those functions finish.
// Using a MutationObserver on the containers is the safest way to attach events
// to dynamically generated cards.
function observeAndAttachScramble() {
    const containers = [document.getElementById('projects-container'), document.getElementById('certificates-container')];
    containers.forEach(container => {
        if(!container) return;
        const observer = new MutationObserver(() => {
            initTextScramble();
        });
        observer.observe(container, { childList: true });
    });
}
document.addEventListener('DOMContentLoaded', observeAndAttachScramble);

/* =========================================================================
   Random Global CRT Glitch
   ========================================================================= */
function initRandomCRTGlitch() {
    const glitchOverlay = document.querySelector('.crt-glitch-overlay');
    if(!glitchOverlay) return;
    
    function triggerGlitch() {
        // Randomly trigger a glitch between every 3 to 15 seconds
        const nextTime = Math.random() * 12000 + 3000;
        
        setTimeout(() => {
            // Turn on glitch
            glitchOverlay.classList.add('active');
            
            // Turn off glitch quickly (50ms to 200ms)
            setTimeout(() => {
                glitchOverlay.classList.remove('active');
                triggerGlitch(); // Schedule next
            }, Math.random() * 150 + 50);
            
        }, nextTime);
    }
    
    triggerGlitch();
}
document.addEventListener('DOMContentLoaded', initRandomCRTGlitch);

/* =========================================================================
   Glitch Transition on Scroll Reveal
   ========================================================================= */
// Removed initGlitchReveal to fix GSAP conflict
