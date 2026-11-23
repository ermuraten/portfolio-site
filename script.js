'use strict';

// Die Adresse wird erst im Browser zusammengesetzt.
const user = 'rn.murat';
const domain = 'googlemail.com';
for (const slot of document.querySelectorAll('.email-slot')) {
  const link = document.createElement('a');
  link.href = 'mailto:' + user + '@' + domain;
  link.textContent = user + '@' + domain;
  link.className = 'button primary';
  slot.replaceChildren(link);
}

const lightbox = document.querySelector('.lightbox');
if (lightbox && typeof lightbox.showModal === 'function') {
  const links = [...document.querySelectorAll('[data-lightbox]')];
  const picture = lightbox.querySelector('figure img');
  const caption = lightbox.querySelector('figcaption');
  let current = 0;

  function showImage(index) {
    current = (index + links.length) % links.length;
    picture.src = links[current].href;
    picture.alt = links[current].querySelector('img').alt;
    caption.textContent = picture.alt;
  }

  links.forEach((link, index) => {
    link.addEventListener('click', (event) => {
      // Modifizierte Klicks öffnen weiterhin die Bilddatei im Browser.
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      showImage(index);
      lightbox.showModal();
      document.body.classList.add('has-lightbox');
      lightbox.querySelector('[data-close]').focus();
    });
  });

  lightbox.querySelector('[data-prev]').addEventListener('click', () => showImage(current - 1));
  lightbox.querySelector('[data-next]').addEventListener('click', () => showImage(current + 1));
  lightbox.querySelector('[data-close]').addEventListener('click', () => lightbox.close());
  lightbox.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      showImage(current + (event.key === 'ArrowRight' ? 1 : -1));
    }
    // Escape und Fokusbegrenzung übernimmt das native Dialogelement.
  });
  lightbox.addEventListener('click', (event) => {
    const bounds = lightbox.getBoundingClientRect();
    if (event.target === lightbox && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) {
      lightbox.close();
    }
  });
  lightbox.addEventListener('close', () => {
    document.body.classList.remove('has-lightbox');
    picture.removeAttribute('src');
  });
}
