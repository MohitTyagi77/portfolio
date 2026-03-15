/* ============================================
   PORTFOLIO JAVASCRIPT
   Features: Three.js 3D hero, GSAP animations, GitHub API, EmailJS, Vanilla Tilt
   ============================================ */

// ============================================
// INITIALIZATION & SETUP
// ============================================

// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// GitHub Configuration
const GITHUB_USERNAME = 'MohitTyagi77';
const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos`;

// EmailJS Configuration
const EMAILJS_SERVICE_ID = 'service_ytf5f1w';
const EMAILJS_TEMPLATE_ID = 'template_w593mo6';
const EMAILJS_PUBLIC_KEY = 'grQpWQEe7v9t1R491';

// ============================================
// NAVBAR FUNCTIONALITY
// ============================================

const navbar = document.getElementById('navbar');
const navMenu = document.getElementById('navMenu');
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelectorAll('.nav-link');

// Hamburger menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ============================================
// THREE.JS HERO ANIMATION
// ============================================

function initHeroAnimation() {
    const canvas = document.getElementById('heroCanvas');
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
        75,
        canvas.clientWidth / canvas.clientHeight,
        0.1,
        1000
    );
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });

    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0);

    camera.position.z = 50;

    // Create particle system
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 500;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i += 3) {
        posArray[i] = (Math.random() - 0.5) * 200;
        posArray[i + 1] = (Math.random() - 0.5) * 200;
        posArray[i + 2] = (Math.random() - 0.5) * 200;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.5,
        color: 0x00d9ff,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.8,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Create floating cubes
    const cubes = [];
    const cubeGeometry = new THREE.BoxGeometry(2, 2, 2);
    const cubeMaterial = new THREE.MeshPhongMaterial({
        color: 0xa855f7,
        emissive: 0x6b21a8,
        wireframe: true,
    });

    for (let i = 0; i < 3; i++) {
        const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        cube.position.x = (Math.random() - 0.5) * 60;
        cube.position.y = (Math.random() - 0.5) * 60;
        cube.position.z = (Math.random() - 0.5) * 60;
        cube.rotation.x = Math.random() * Math.PI;
        cube.rotation.y = Math.random() * Math.PI;
        cubes.push(cube);
        scene.add(cube);
    }

    // Add lighting
    const light = new THREE.PointLight(0x00d9ff, 1, 100);
    light.position.set(30, 30, 30);
    scene.add(light);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    // Animation loop
    let animationId;
    function animate() {
        animationId = requestAnimationFrame(animate);

        // Rotate particles
        particles.rotation.x += 0.0001;
        particles.rotation.y += 0.0001;

        // Animate cubes
        cubes.forEach((cube, index) => {
            cube.rotation.x += 0.005 + index * 0.001;
            cube.rotation.y += 0.005 + index * 0.001;
            cube.position.y += Math.sin(Date.now() * 0.0005 + index) * 0.05;
        });

        renderer.render(scene, camera);
    }

    animate();

    // Handle window resize
    window.addEventListener('resize', () => {
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    });

    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
        cancelAnimationFrame(animationId);
        renderer.dispose();
    });
}

// Initialize hero animation when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHeroAnimation);
} else {
    initHeroAnimation();
}

// ============================================
// GSAP SCROLL ANIMATIONS
// ============================================

function initScrollAnimations() {
    // Animate section titles
    gsap.utils.toArray('.section-title').forEach(element => {
        gsap.from(element, {
            scrollTrigger: {
                trigger: element,
                start: 'top 80%',
                end: 'top 20%',
                scrub: 1,
            },
            opacity: 0,
            y: 50,
            duration: 1,
        });
    });

    // Animate skill categories
    gsap.utils.toArray('.skill-category').forEach((element, index) => {
        gsap.from(element, {
            scrollTrigger: {
                trigger: element,
                start: 'top 85%',
            },
            opacity: 0,
            y: 30,
            duration: 0.8,
            delay: index * 0.1,
        });
    });

    // Animate experience cards
    gsap.utils.toArray('.experience-card').forEach((element, index) => {
        gsap.from(element, {
            scrollTrigger: {
                trigger: element,
                start: 'top 85%',
            },
            opacity: 0,
            x: index % 2 === 0 ? -50 : 50,
            duration: 0.8,
            delay: index * 0.1,
        });
    });

    // Animate about stats
    gsap.utils.toArray('.stat').forEach((element, index) => {
        gsap.from(element, {
            scrollTrigger: {
                trigger: element,
                start: 'top 85%',
            },
            opacity: 0,
            scale: 0.8,
            duration: 0.8,
            delay: index * 0.1,
        });
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollAnimations);
} else {
    initScrollAnimations();
}

// ============================================
// GITHUB REPOSITORIES FETCHING
// ============================================

async function fetchGitHubRepositories() {
    const repositoriesGrid = document.getElementById('repositoriesGrid');

    try {
        const response = await fetch(GITHUB_API_URL);
        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status}`);
        }

        let repos = await response.json();

        // Sort by updated_at (most recent first)
        repos.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

        // Clear loading state
        repositoriesGrid.innerHTML = '';

        if (repos.length === 0) {
            repositoriesGrid.innerHTML = '<p>No public repositories found.</p>';
            return;
        }

        // Create repo cards
        repos.forEach((repo, index) => {
            const card = createRepoCard(repo);
            repositoriesGrid.appendChild(card);

            // Animate card entrance
            gsap.from(card, {
                opacity: 0,
                y: 30,
                duration: 0.6,
                delay: index * 0.05,
            });
        });

        // Initialize Vanilla Tilt for cards
        VanillaTilt.init(document.querySelectorAll('.repo-card'), {
            max: 5,
            speed: 400,
            scale: 1.02,
        });

    } catch (error) {
        console.error('Error fetching repositories:', error);
        repositoriesGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 2rem;">
                <p style="color: #ef4444;">Error loading repositories. Please try again later.</p>
            </div>
        `;
    }
}

function createRepoCard(repo) {
    const card = document.createElement('div');
    card.className = 'repo-card';

    // Get language color
    const languageColor = getLanguageColor(repo.language);

    // Create card HTML
    card.innerHTML = `
        <div class="repo-header">
            <h3 class="repo-name">${escapeHtml(repo.name)}</h3>
        </div>
        <p class="repo-description">${escapeHtml(repo.description || 'No description provided')}</p>
        <div class="repo-meta">
            ${repo.language ? `
                <span class="repo-language">
                    <span class="repo-language-dot" style="background-color: ${languageColor};"></span>
                    ${escapeHtml(repo.language)}
                </span>
            ` : ''}
            ${repo.stargazers_count > 0 ? `
                <span class="repo-stars">
                    <i class="fas fa-star"></i>
                    ${repo.stargazers_count}
                </span>
            ` : ''}
        </div>
        <div class="repo-links">
            <a href="${repo.html_url}" target="_blank" class="repo-link">
                <i class="fab fa-github"></i> View
            </a>
            ${repo.homepage ? `
                <a href="${repo.homepage}" target="_blank" class="repo-link">
                    <i class="fas fa-globe"></i> Live
                </a>
            ` : ''}
        </div>
    `;

    return card;
}

function getLanguageColor(language) {
    const colors = {
        'Python': '#3776ab',
        'JavaScript': '#f7df1e',
        'TypeScript': '#3178c6',
        'C++': '#00599c',
        'Java': '#007396',
        'C': '#a8b9cc',
        'HTML': '#e34c26',
        'CSS': '#563d7c',
        'SQL': '#cc2927',
        'Go': '#00add8',
        'Rust': '#ce422b',
    };
    return colors[language] || '#00d9ff';
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Fetch repositories when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fetchGitHubRepositories);
} else {
    fetchGitHubRepositories();
}

// ============================================
// EMAILJS FORM HANDLING
// ============================================

function initEmailJS() {
    // Initialize EmailJS
    emailjs.init(EMAILJS_PUBLIC_KEY);

    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formMessage = document.getElementById('formMessage');
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;

        // Check if EmailJS is properly configured
        if (EMAILJS_PUBLIC_KEY === 'PUBLIC_KEY_HERE') {
            formMessage.textContent = '⚠️ EmailJS not configured. Please add your public key to script.js';
            formMessage.className = 'form-message error';
            return;
        }

        try {
            // Show loading state
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
            formMessage.className = 'form-message';
            formMessage.textContent = '';

            // Prepare form data
            const formData = {
                from_name: document.getElementById('name').value,
                from_email: document.getElementById('email').value,
                message: document.getElementById('message').value,
                to_email: 'mohit.tya998@gmail.com',
            };

            // Send email via EmailJS
            const response = await emailjs.send(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                formData
            );

            if (response.status === 200) {
                // Success
                formMessage.textContent = '✓ Message sent successfully! I\'ll get back to you soon.';
                formMessage.className = 'form-message success';
                contactForm.reset();

                // Hide message after 5 seconds
                setTimeout(() => {
                    formMessage.className = 'form-message';
                }, 5000);
            }
        } catch (error) {
            console.error('EmailJS error:', error);
            formMessage.textContent = '✗ Failed to send message. Please try again or email directly.';
            formMessage.className = 'form-message error';
        } finally {
            // Reset button state
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        }
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initEmailJS);
} else {
    initEmailJS();
}

// ============================================
// VANILLA TILT FOR EXPERIENCE CARDS
// ============================================

function initVanillaTilt() {
    // Initialize Vanilla Tilt for experience cards
    const experienceCards = document.querySelectorAll('.experience-card');
    if (experienceCards.length > 0) {
        VanillaTilt.init(experienceCards, {
            max: 5,
            speed: 400,
            scale: 1.02,
        });
    }

    // Initialize for education card
    const educationCard = document.querySelector('.education-card');
    if (educationCard) {
        VanillaTilt.init(educationCard, {
            max: 5,
            speed: 400,
            scale: 1.02,
        });
    }

    // Initialize for research card
    const researchCard = document.querySelector('.research-card');
    if (researchCard) {
        VanillaTilt.init(researchCard, {
            max: 5,
            speed: 400,
            scale: 1.02,
        });
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initVanillaTilt);
} else {
    initVanillaTilt();
}

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth',
            });
        }
    });
});

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================

// Lazy load images if needed
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Debounce function for resize events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ============================================
// CONSOLE MESSAGE
// ============================================

console.log(
    '%cMohit Tyagi Portfolio',
    'color: #00d9ff; font-size: 20px; font-weight: bold; text-shadow: 0 0 10px rgba(0, 217, 255, 0.5);'
);
console.log(
    '%cBuilt with Three.js, GSAP, and Vanilla JavaScript',
    'color: #a855f7; font-size: 14px;'
);
console.log(
    '%cGitHub: https://github.com/MohitTyagi77',
    'color: #00d9ff; font-size: 12px;'
);
