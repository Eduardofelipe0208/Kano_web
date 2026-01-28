document.addEventListener('DOMContentLoaded', () => {
    
    // ---------------------------------------------------
    // 1. PARTICLES SYSTEM (Optimized Canvas)
    // ---------------------------------------------------
    const canvas = document.getElementById('particles-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particlesArray;
        
        // Ajustar canvas al tamaño de ventana
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', () => {
            resizeCanvas();
            initParticles();
        });
        resizeCanvas();

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2; 
                this.speedX = (Math.random() * 0.4) - 0.2; // Lento y suave
                this.speedY = (Math.random() * 0.4) - 0.2;
                this.color = 'rgba(34, 211, 238, 0.2)'; // Cyan
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                // Rebote suave
                if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
                if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;
            }
            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function initParticles() {
            particlesArray = [];
            // Menos partículas en móvil para rendimiento
            const numberOfParticles = window.innerWidth < 768 ? 30 : 80; 
            for (let i = 0; i < numberOfParticles; i++) {
                particlesArray.push(new Particle());
            }
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
                particlesArray[i].draw();
                
                // Conectar partículas cercanas
                for (let j = i; j < particlesArray.length; j++) {
                    const dx = particlesArray[i].x - particlesArray[j].x;
                    const dy = particlesArray[i].y - particlesArray[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(34, 211, 238, ${0.1 - distance/1000})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                        ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                        ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(animateParticles);
        }

        initParticles();
        animateParticles();
    }

    // ---------------------------------------------------
    // 2. HERO TILT EFFECT (3D Mouse movement)
    // ---------------------------------------------------
    const heroSection = document.querySelector('.hero');
    const tiltElement = document.getElementById('heroTilt');

    if (heroSection && tiltElement && window.innerWidth > 768) {
        heroSection.addEventListener('mousemove', (e) => {
            const x = (window.innerWidth / 2 - e.pageX) / 50;
            const y = (window.innerHeight / 2 - e.pageY) / 50;
            tiltElement.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
        });
        
        // Reset al salir
        heroSection.addEventListener('mouseleave', () => {
            tiltElement.style.transform = `rotateY(0deg) rotateX(0deg)`;
        });
    }

    // ---------------------------------------------------
    // 3. CALENDLY & MODALS
    // ---------------------------------------------------
    window.openCalendly = function() {
        // Enlace demo, el usuario debe poner el suyo
        Calendly.initPopupWidget({ url: 'https://calendly.com/eduardofelipe020800/30min' }); 
        return false;
    }

    // Lógica Modal Casos de Éxito
    const modal = document.getElementById('caseModal');
    const closeModalBtn = document.querySelector('.close-modal');
    
    window.openCaseStudy = function(type) {
        const title = document.getElementById('modalTitle');
        const desc = document.getElementById('modalDesc');
        const bars = document.querySelectorAll('.bar');
        
        // Contenido Dinámico
        if(type === 'dev') {
            title.innerText = "E-Commerce Ultra-Rápido";
            desc.innerText = "Migración a Next.js reduciendo la carga de 4s a 0.5s. Aumento del 40% en retención.";
        } else if (type === 'ai') {
            title.innerText = "Agente de Soporte IA";
            desc.innerText = "Implementación de chatbot con GPT-4. Resolución automática del 85% de tickets.";
        }
        
        modal.classList.add('active');
        
        // Animar gráfico al abrir
        setTimeout(() => {
            bars.forEach(bar => {
                // Forzar repintado para animación
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => bar.style.width = width, 50);
            });
        }, 100);
    };

    closeModalBtn.addEventListener('click', () => modal.classList.remove('active'));
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('active');
    });

    // ---------------------------------------------------
    // 4. FORM VALIDATION
    // ---------------------------------------------------
    const form = document.getElementById('leadForm');
    const emailInput = document.getElementById('emailInput');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailValue = emailInput.value.trim();

            if (!emailRegex.test(emailValue)) {
                emailInput.classList.add('invalid');
                emailInput.focus();
            } else {
                emailInput.classList.remove('invalid');
                // Simular envío
                const btn = form.querySelector('button');
                const originalText = btn.innerHTML;
                btn.innerHTML = "Enviado ✅";
                btn.style.background = "#10b981";
                
                setTimeout(() => {
                    openCalendly(); // Redirigir a agendar tras capturar lead
                    form.reset();
                    btn.innerHTML = originalText;
                    btn.style.background = "";
                }, 1500);
            }
        });

        emailInput.addEventListener('input', () => {
            if (emailInput.classList.contains('invalid')) {
                emailInput.classList.remove('invalid');
            }
        });
    }

    // ---------------------------------------------------
    // 5. COOKIES & SCROLL REVEAL
    // ---------------------------------------------------
    const cookieBanner = document.getElementById('cookieBanner');
    if (!localStorage.getItem('cookiesAccepted')) {
        setTimeout(() => cookieBanner.classList.add('show'), 2000);
    }
    
    document.getElementById('acceptCookies').addEventListener('click', () => {
        localStorage.setItem('cookiesAccepted', 'true');
        cookieBanner.classList.remove('show');
    });

    // Scroll Reveal (Aparición suave)
    const revealElements = document.querySelectorAll('.reveal');
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < windowHeight - 100) el.classList.add('active');
        });
    };
    
    // Navbar Sticky
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        revealOnScroll();
        if (window.scrollY > 50) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');
    });
    
    // Accordion Logic
    document.querySelectorAll('.accordion__header').forEach(button => {
        button.addEventListener('click', () => {
            const item = button.parentElement;
            const body = item.querySelector('.accordion__body');
            item.classList.toggle('active');
            if (item.classList.contains('active')) {
                body.style.maxHeight = body.scrollHeight + "px";
                button.querySelector('.icon').innerText = "-";
            } else {
                body.style.maxHeight = 0;
                button.querySelector('.icon').innerText = "+";
            }
        });
    });

    revealOnScroll(); // Trigger inicial
});