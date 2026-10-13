// PORTIFÓLIO - main.js

document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfólio carregado');

    // Animação suave nas barras de progresso
    const progressBars = document.querySelectorAll('progress');
    progressBars.forEach(bar => {
        const targetValue = parseInt(bar.getAttribute('value')) || 0;
        bar.value = 0;
        animateProgress(bar, targetValue);
    });

    // Smooth scroll para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Destaque do link ativo na navegação
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('nav a').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('ativo');
        }
    });
});

function animateProgress(bar, target, duration = 1000) {
    let start = 0;
    const startTime = performance.now();

    function step(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        bar.value = Math.floor(progress * target);
        if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
}