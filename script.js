
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

const languageSwitch = document.querySelector('.language-switch-input');
const translatedElements = document.querySelectorAll('[data-pt][data-en]');

function setLanguage(language) {
    document.documentElement.lang = language === 'pt' ? 'pt-BR' : 'en';

    translatedElements.forEach((element) => {
    const text = element.dataset[language];
    if (text) element.innerHTML = text;
    });

    if (languageSwitch) {
    languageSwitch.checked = language === 'en';
    languageSwitch.setAttribute('aria-label', language === 'pt'
        ? 'Alternar para ingles'
        : 'Alternar para portugues');
    }

    localStorage.setItem('portfolio-language', language);
}

if (languageSwitch) {
    languageSwitch.addEventListener('change', () => {
    setLanguage(languageSwitch.checked ? 'en' : 'pt');
    });
}

const savedLanguage = localStorage.getItem('portfolio-language') || 'pt';
setLanguage(savedLanguage);
 
