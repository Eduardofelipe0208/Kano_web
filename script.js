document.addEventListener('DOMContentLoaded', () => {
    
    // 1. SCROLL REVEAL (Aparición suave de elementos)
    // ---------------------------------------------
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 150; // Píxeles antes de que entre totalmente
        
        revealElements.forEach((element) => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    };
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger inicial por si hay elementos ya visibles

    // 2. STICKY NAVBAR EFFECT
    // ---------------------------------------------
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. ACCORDION FAQ LOGIC
    // ---------------------------------------------
    const accordionItems = document.querySelectorAll('.accordion__item');
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion__header');
        
        header.addEventListener('click', () => {
            // Cerrar otros abiertos (Opcional, estilo "Solo uno abierto")
            accordionItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.accordion__body').style.maxHeight = null;
                }
            });

            // Toggle actual
            item.classList.toggle('active');
            
            const body = item.querySelector('.accordion__body');
            if (item.classList.contains('active')) {
                body.style.maxHeight = body.scrollHeight + "px";
            } else {
                body.style.maxHeight = null;
            }
        });
    });

    // 4. SMOOTH SCROLL PARA ANCLAS
    // ---------------------------------------------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if(target){
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});