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
});

// Typewriter Logic
const textToType = "Software Developer & Innovator";
let typeIndex = 0;
function typeWriter() {
    const el = document.getElementById('tagline-text');
    if (el && typeIndex < textToType.length) {
        el.innerHTML += textToType.charAt(typeIndex);
        typeIndex++;
        setTimeout(typeWriter, 100);
    }
}

function loadProjects(projects) {
    const container = document.getElementById('projects-container');
    container.innerHTML = '';
    
    if (!projects || projects.length === 0) {
        container.innerHTML = '<p>No projects found.</p>';
        return;
    }

    projects.forEach(proj => {
        const card = document.createElement('div');
        card.className = 'card tilt-card';
        card.innerHTML = `
            <h3>${formatName(proj.name)}</h3>
            <p>${proj.description}</p>
            <span class="cert-type">Project</span>
        `;
        container.appendChild(card);
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
        card.className = 'card tilt-card';
        card.onclick = () => window.open(cert.path, '_blank');
        card.innerHTML = `
            <h3>${formatName(cert.name)}</h3>
            <p>Click to view certificate.</p>
            <span class="cert-type">${cert.type}</span>
        `;
        container.appendChild(card);
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
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
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
