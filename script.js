document.addEventListener('DOMContentLoaded', () => {
    const scrollBtn = document.getElementById('scroll-down');
    const dateSection = document.getElementById('date-calculator');
    const bgm = document.getElementById('bgm');

    scrollBtn.addEventListener('click', () => {

        // Scroll ke Jejak Langkahmu
        dateSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });

        // Putar musik
        bgm.volume = 0.4;
        bgm.play().catch(err => console.log(err));

    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const cards = document.querySelectorAll('.gallery-card, .message-box, .surprise-box, .date-container');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'all 0.8s ease-out';
        observer.observe(card);
    });

    // Date Calculator Logic
    const calcDateBtn = document.getElementById('calc-date-btn');
    const dateInput = document.getElementById('anniversary-date');
    const dateResult = document.getElementById('date-result');
    const daysCount = document.getElementById('days-count');

    calcDateBtn.addEventListener('click', () => {
        if (!dateInput.value) {
            alert('Pilih tanggal lahirmu dulu ya sayang ❤️');
            return;
        }

        const startDate = new Date(dateInput.value);
        const today = new Date();
        
        // Menghitung selisih waktu dalam milidetik
        const timeDiff = today.getTime() - startDate.getTime();
        
        // Mengubah milidetik ke hari (1 hari = 1000ms * 60s * 60m * 24h)
        const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
        
        if (daysDiff < 0) {
            alert('Tanggalnya tidak boleh di masa depan dong 🤭');
            return;
        }

        // Animasi angka
        dateResult.classList.remove('hidden');
        dateResult.style.height = 'auto';
        let currentCount = 0;
        const targetCount = daysDiff;
        const duration = 2000; // 2 seconds
        const increment = Math.max(1, Math.floor(targetCount / (duration / 16))); // 60 FPS
        
        const counterInterval = setInterval(() => {
            currentCount += increment;
            if (currentCount >= targetCount) {
    currentCount = targetCount;
    clearInterval(counterInterval);

    // Confetti muncul setelah selesai menghitung
    fireConfetti();
}
            daysCount.textContent = currentCount.toLocaleString('id-ID');
        }, 16);
    });

    const surpriseBtn = document.getElementById('surprise-btn');
    const modal = document.getElementById('modal');
    const closeModal = document.getElementById('close-modal');

    const fireConfetti = () => {

    confetti({
        particleCount: 180,
        spread: 120,
        origin: { y: 0.6 }
    });

    setTimeout(() => {
        confetti({
            particleCount: 120,
            angle: 60,
            spread: 70,
            origin: { x: 0 }
        });

        confetti({
            particleCount: 120,
            angle: 120,
            spread: 70,
            origin: { x: 1 }
        });
    }, 400);

};

    surpriseBtn.addEventListener('click', () => {
        modal.classList.add('show');
        fireConfetti();
    });

    closeModal.addEventListener('click', () => {
        modal.classList.remove('show');
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
        }
    });

});
