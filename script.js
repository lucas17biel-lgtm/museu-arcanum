const searchInput = document.getElementById('artifactSearch');
const filterButtons = [...document.querySelectorAll('.filter-chip')];
const cards = [...document.querySelectorAll('.artifact-card')];
const emptyState = document.getElementById('emptyState');
let activeFilter = 'todos';

function filterArtifacts() {
  const term = searchInput.value.toLocaleLowerCase('pt-BR').trim();
  let visible = 0;
  cards.forEach(card => {
    const matchesText = card.dataset.name.toLocaleLowerCase('pt-BR').includes(term) ||
      card.dataset.civilization.toLocaleLowerCase('pt-BR').includes(term);
    const matchesFilter = activeFilter === 'todos' || card.dataset.civilization === activeFilter;
    const show = matchesText && matchesFilter;
    card.hidden = !show;
    if (show) visible++;
  });
  emptyState.hidden = visible !== 0;
}
searchInput.addEventListener('input', filterArtifacts);
filterButtons.forEach(button => button.addEventListener('click', () => {
  activeFilter = button.dataset.filter;
  filterButtons.forEach(item => item.classList.toggle('active', item === button));
  filterArtifacts();
}));

const modal = document.getElementById('artifactModal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalCivilization = document.getElementById('modalCivilization');
const modalMeta = document.getElementById('modalMeta');
const modalDescription = document.getElementById('modalDescription');

function openArtifact(card) {
  modalTitle.textContent = card.dataset.name;
  modalCivilization.textContent = card.dataset.civilization.toUpperCase() + ' · ARTEFATO HISTÓRICO';
  modalMeta.textContent = `${card.dataset.period}  |  ${card.dataset.material}`;
  modalDescription.textContent = card.dataset.description;
  modalImage.style.backgroundImage = `url("${card.dataset.image}")`;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  document.querySelector('.modal-close').focus();
}
function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}
cards.forEach(card => {
  card.querySelector('.artifact-image').addEventListener('click', () => openArtifact(card));
  card.querySelector('.details-link').addEventListener('click', () => openArtifact(card));
});
modal.querySelectorAll('[data-close]').forEach(el => el.addEventListener('click', closeModal));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && modal.classList.contains('open')) closeModal();
});

const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');
menuToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});
mainNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  mainNav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));

const sections = [...document.querySelectorAll('main section[id]')];
const navLinks = [...document.querySelectorAll('.nav-link')];
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
      }
    });
  }, { rootMargin: '-35% 0px -55% 0px' });
  sections.forEach(section => observer.observe(section));
}
