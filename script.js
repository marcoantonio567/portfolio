
const revealElements = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
    if (entry.isIntersecting) {
        entry.target.classList.add('visible');
    }
    });
}, { threshold: 0.14 });

revealElements.forEach((element) => observer.observe(element));

document.querySelectorAll('.project-card').forEach((card) => {
    card.addEventListener('mousemove', (event) => {
    const rect = card.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--x', `${x}%`);
    card.style.setProperty('--y', `${y}%`);
    });
});

const languageButtons = document.querySelectorAll('.lang-btn');
const translatedElements = document.querySelectorAll('[data-pt][data-en]');

function setLanguage(language) {
    document.documentElement.lang = language === 'pt' ? 'pt-BR' : 'en';

    translatedElements.forEach((element) => {
    const text = element.dataset[language];
    if (text) element.innerHTML = text;
    });

    languageButtons.forEach((button) => {
    button.classList.toggle('active', button.dataset.lang === language);
    });

    localStorage.setItem('portfolio-language', language);
}

languageButtons.forEach((button) => {
    button.addEventListener('click', () => setLanguage(button.dataset.lang));
});

const savedLanguage = localStorage.getItem('portfolio-language') || 'pt';
setLanguage(savedLanguage);
 