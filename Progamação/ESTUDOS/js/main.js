// ESTUDOS - main.js

document.addEventListener('DOMContentLoaded', () => {
    console.log('Página de Estudos carregada');

    // Syntax highlighting básico para blocos de código
    document.querySelectorAll('pre code').forEach(block => {
        highlightCode(block);
    });

    // Copiar código ao clicar
    document.querySelectorAll('pre code').forEach(block => {
        block.addEventListener('click', () => copyCode(block));
    });

    // Toggle de temas (se houver)
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    // Contador de tempo de estudo (localStorage)
    updateStudyTimer();
    setInterval(updateStudyTimer, 60000);
});

function highlightCode(block) {
    const text = block.textContent;
    const html = text
        .replace(/(<\/?[a-z]+>)/gi, '<span class="tag">$1</span>')
        .replace(/(".*?")/g, '<span class="string">$1</span>')
        .replace(/(\b\d+\b)/g, '<span class="number">$1</span>')
        .replace(/(\b(function|const|let|var|if|else|for|while|return|class|import|export)\b)/g, '<span class="keyword">$1</span>');
    block.innerHTML = html;
}

function copyCode(block) {
    navigator.clipboard.writeText(block.textContent).then(() => {
        const original = block.title;
        block.title = 'Copiado!';
        setTimeout(() => block.title = original || 'Clique para copiar', 1500);
    });
}

function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
}

function updateStudyTimer() {
    let minutes = parseInt(localStorage.getItem('studyMinutes') || '0');
    minutes++;
    localStorage.setItem('studyMinutes', minutes.toString());
    const display = document.getElementById('study-timer');
    if (display) {
        const h = Math.floor(minutes / 60);
        const m = minutes % 60;
        display.textContent = `${h}h ${m}m de estudo`;
    }
}

// Inicializa tema salvo
(function() {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') document.body.classList.add('dark-theme');
})();