document.getElementById('year').textContent = new Date().getFullYear();

const toggle = document.getElementById('nav-toggle');
const nav = document.getElementById('main-nav');

toggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', isOpen);
});

nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  });
});

// Check a template modal
const TEMPLATE_STYLES = [
  { slug: 'ats-simple', name: 'Classic Clean' },
  { slug: 'modern-minimal', name: 'Modern Minimal' },
  { slug: 'timeline', name: 'Traditional' },
  { slug: 'muted-sidebar', name: 'Soft Accent' },
  { slug: 'sidebar-banner', name: 'Bold Banner' },
  { slug: 'full-sidebar', name: 'Full Color' },
  { slug: 'diagonal-navy', name: 'Sharp & Structured' },
];
const TEMPLATE_COLORS = [
  { slug: 'navy-and-gold', name: 'Navy & Gold', base: '#1C2A42', accent: '#C9A227' },
  { slug: 'forest-and-copper', name: 'Forest & Copper', base: '#1F3327', accent: '#C17F42' },
  { slug: 'slate-and-teal', name: 'Slate & Teal', base: '#2E3440', accent: '#2E8E8E' },
  { slug: 'plum-and-mauve', name: 'Plum & Mauve', base: '#472039', accent: '#B5728F' },
  { slug: 'charcoal-and-copper', name: 'Charcoal & Copper', base: '#262220', accent: '#A8632E' },
  { slug: 'crimson-and-charcoal', name: 'Crimson & Charcoal', base: '#2B2320', accent: '#B23A2F' },
  { slug: 'ocean-and-sand', name: 'Ocean & Sand', base: '#123C4D', accent: '#D9A857' },
  { slug: 'olive-and-rust', name: 'Olive & Rust', base: '#3A3B2E', accent: '#BD6A3A' },
  { slug: 'indigo-and-rose', name: 'Indigo & Rose', base: '#262A52', accent: '#D97B9A' },
  { slug: 'burgundy-and-umber', name: 'Burgundy & Umber', base: '#3A1C22', accent: '#C4793F' },
  { slug: 'steel-blue-and-amber', name: 'Steel Blue & Amber', base: '#2B3A4A', accent: '#D98E3B' },
  { slug: 'emerald-and-ivory', name: 'Emerald & Ivory', base: '#173B2E', accent: '#C9A227' },
  { slug: 'black-and-white', name: 'Black & White', base: '#1A1A1A', accent: '#4A4A4A' },
];

const modal = document.getElementById('template-modal');
const openBtn = document.getElementById('open-template-check');
const closeBtn = document.getElementById('modal-close');
const previewImg = document.getElementById('modal-preview-img');
const layoutPills = document.getElementById('layout-pills');
const colorSwatches = document.getElementById('color-swatches');

let currentStyle = 'full-sidebar';
let currentColor = 'charcoal-and-copper';

function updatePreview() {
  previewImg.src = 'assets/matrix/' + currentStyle + '__' + currentColor + '.png';
  previewImg.alt = 'Resume preview in a selected layout and color';
  layoutPills.querySelectorAll('button').forEach(b => b.classList.toggle('active', b.dataset.style === currentStyle));
  colorSwatches.querySelectorAll('button').forEach(b => b.classList.toggle('active', b.dataset.color === currentColor));
}

TEMPLATE_STYLES.forEach(s => {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.textContent = s.name;
  btn.dataset.style = s.slug;
  btn.addEventListener('click', () => { currentStyle = s.slug; updatePreview(); });
  layoutPills.appendChild(btn);
});

TEMPLATE_COLORS.forEach(c => {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.title = c.name;
  btn.setAttribute('aria-label', c.name);
  btn.dataset.color = c.slug;
  btn.style.setProperty('--base', c.base);
  btn.style.setProperty('--accent-sw', c.accent);
  btn.addEventListener('click', () => { currentColor = c.slug; updatePreview(); });
  colorSwatches.appendChild(btn);
});

function openModal() {
  modal.hidden = false;
  updatePreview();
}
function closeModal() {
  modal.hidden = true;
}

if (openBtn) openBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !modal.hidden) closeModal(); });
