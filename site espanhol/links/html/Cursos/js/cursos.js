 document.getElementById('year').textContent = new Date().getFullYear();

        // Carrossel 3D
        const container = document.getElementById('carouselContainer');
        const cards = document.querySelectorAll('.testimonial-card');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const indicatorsContainer = document.getElementById('indicators');
        
        let currentIndex = 0;
        const totalCards = cards.length;
        const angleStep = 360 / totalCards;

        // Criar indicadores
        for (let i = 0; i < totalCards; i++) {
            const indicator = document.createElement('div');
            indicator.classList.add('indicator');
            if (i === 0) indicator.classList.add('active');
            indicator.addEventListener('click', () => goToSlide(i));
            indicatorsContainer.appendChild(indicator);
        }

        function updateCarousel() {
            cards.forEach((card, index) => {
                const angle = angleStep * (index - currentIndex);
                const isActive = index === currentIndex;
                
                if (isActive) {
                    card.style.transform = `rotateY(${angle}deg) translateZ(300px) scale(1.05)`;
                    card.style.opacity = '1';
                    card.style.zIndex = '10';
                    card.style.filter = 'blur(0px)';
                } else {
                    card.style.transform = `rotateY(${angle}deg) translateZ(200px) scale(0.7)`;
                    card.style.opacity = '0.4';
                    card.style.zIndex = '1';
                    card.style.filter = 'blur(2px)';
                }
            });

            // Atualizar indicadores
            document.querySelectorAll('.indicator').forEach((indicator, index) => {
                indicator.classList.toggle('active', index === currentIndex);
            });
        }

        function goToSlide(index) {
            currentIndex = index;
            updateCarousel();
        }

        function nextSlide() {
            currentIndex = (currentIndex + 1) % totalCards;
            updateCarousel();
        }

        function prevSlide() {
            currentIndex = (currentIndex - 1 + totalCards) % totalCards;
            updateCarousel();
        }

        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);

        // Auto-rotate
        let autoRotate = setInterval(nextSlide, 4000);

        container.addEventListener('mouseenter', () => {
            clearInterval(autoRotate);
        });

        container.addEventListener('mouseleave', () => {
            autoRotate = setInterval(nextSlide, 4000);
        });

        // Inicializar
        updateCarousel();