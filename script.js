document.addEventListener('DOMContentLoaded', () => {
    // Navigation Logic
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section-block');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all
            navLinks.forEach(l => l.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));

            // Add active class to clicked link
            link.classList.add('active');

            // Show corresponding section
            const targetId = link.getAttribute('href').substring(1);
            document.getElementById(targetId).classList.add('active');
        });
    });

    // Load Data if available
    if (typeof portfolioData !== 'undefined') {
        loadProjects(portfolioData.projects);
        loadCertificates(portfolioData.certificates);
    }

    // Typewriter effect
    typeWriter();

    // Chatbot Initialization
    initChatbot();
});

// Chatbot Logic
function initChatbot() {
    const toggleBtn = document.getElementById('chat-toggle');
    const chatWindow = document.getElementById('chat-window');
    const apiKeyScreen = document.getElementById('api-key-screen');
    const chatScreen = document.getElementById('chat-screen');
    const apiKeyInput = document.getElementById('api-key-input');
    const saveKeyBtn = document.getElementById('save-key-btn');
    const chatInput = document.getElementById('chat-input');
    const sendMsgBtn = document.getElementById('send-msg-btn');
    const chatHistory = document.getElementById('chat-history');

    toggleBtn.addEventListener('click', () => {
        chatWindow.style.display = chatWindow.style.display === 'none' ? 'flex' : 'none';
        checkApiKey();
    });

    function checkApiKey() {
        if (sessionStorage.getItem('gemini_api_key')) {
            apiKeyScreen.style.display = 'none';
            chatScreen.style.display = 'flex';
        } else {
            apiKeyScreen.style.display = 'flex';
            chatScreen.style.display = 'none';
        }
    }

    saveKeyBtn.addEventListener('click', () => {
        const key = apiKeyInput.value.trim();
        if (key) {
            sessionStorage.setItem('gemini_api_key', key);
            checkApiKey();
            addMessage("Hi there! I'm an AI assistant based on Anmol's portfolio. Ask me anything about his projects, skills, or experience!", 'ai');
        }
    });

    async function handleSend() {
        const msg = chatInput.value.trim();
        if (!msg) return;

        addMessage(msg, 'user');
        chatInput.value = '';

        const apiKey = sessionStorage.getItem('gemini_api_key');
        if (!apiKey) return;

        const typingId = "typing-" + Date.now();
        addTypingIndicator(typingId);

        try {
            const sysContext = "You are an AI representing Anmol S Poojary. Answer questions based on this data: " + JSON.stringify(portfolioData) + ". Keep answers brief, professional, and friendly.";
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
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
}

// Scroll Progress Logic
window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.getElementById('scroll-progress').style.width = scrolled + "%";
});

// Interactive Glass Glow
document.addEventListener('mousemove', e => {
    document.querySelectorAll('.glass-panel, .card').forEach(panel => {
        const rect = panel.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        panel.style.setProperty('--mouse-x', `${x}px`);
        panel.style.setProperty('--mouse-y', `${y}px`);
    });
});

// Typewriter Logic
const textToType = "Software Developer & Innovator";
let typeIndex = 0;
function typeWriter() {
    if (typeIndex < textToType.length) {
        document.getElementById("tagline-text").innerHTML += textToType.charAt(typeIndex);
        typeIndex++;
        setTimeout(typeWriter, 100);
    }
}
window.onload = typeWriter;

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

    projects.forEach(proj => {
        const card = document.createElement('div');
        card.className = 'card tilt-card fade-in-up';
        card.innerHTML = `
            <div class="glare"></div>
            <h3>${formatName(proj.name)}</h3>
            <p>${proj.description}</p>
            <div class="tags">
                ${proj.technologies.slice(0,3).map(t => `<span>${t}</span>`).join('')}
            </div>
        `;
        container.appendChild(card);
        observer.observe(card);
    });
}

function loadCertificates(certs) {
    const container = document.getElementById('certificates-container');
    container.innerHTML = '';

    if (!certs || certs.length === 0) {
        container.innerHTML = '<p>No certificates found.</p>';
        return;
    }

    certs.forEach(cert => {
        const card = document.createElement('div');
        card.className = 'card tilt-card fade-in-up';
        card.onclick = () => window.open(cert.path, '_blank');
        card.innerHTML = `
            <div class="glare"></div>
            <h3>${cert.name}</h3>
            <p>Click to view certificate.</p>
            <span class="cert-type">${cert.type}</span>
        `;
        container.appendChild(card);
        observer.observe(card);
    });
    
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
