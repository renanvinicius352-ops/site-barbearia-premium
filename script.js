(() => {
  'use strict';
  const config = window.BARBER_CONFIG || {};
  const money = value => Number(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  const waUrl = message => `https://wa.me/${String(config.whatsapp || '').replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
  const serviceList = document.querySelector('#service-list');
  const serviceSelect = document.querySelector('#service-select');

  (config.services || []).forEach((service, index) => {
    const item = document.createElement('article');
    item.className = `service-row reveal${service.name === 'Corte + barba' ? ' service-highlight' : ''}`;
    item.innerHTML = `<span class="service-row-index">${String(index + 2).padStart(2, '0')}</span><div class="service-row-info"><h3></h3><p></p></div><strong class="service-row-price"></strong><button class="service-pick" type="button" aria-label="Agendar serviço">+</button>`;
    item.querySelector('h3').textContent = service.name;
    item.querySelector('p').textContent = service.description;
    item.querySelector('.service-row-price').textContent = money(service.price);
    item.querySelector('.service-pick').addEventListener('click', () => selectService(service.name));
    serviceList.append(item);
    let option = [...serviceSelect.options].find(item => item.value === service.name); if (!option) { option = document.createElement("option"); option.value = service.name; serviceSelect.append(option); } option.textContent = `${service.name} · ${money(service.price)}`;
  });
  function selectService(name) { serviceSelect.value = name; document.querySelector('#agendar').scrollIntoView({ behavior: 'smooth' }); serviceSelect.focus({ preventScroll: true }); serviceSelect.classList.add('field-selected'); setTimeout(() => serviceSelect.classList.remove('field-selected'), 1400); }
  document.querySelectorAll('.book-service').forEach(button => button.addEventListener('click', () => selectService(button.dataset.service)));

  const nav = document.querySelector('#main-nav');
  const menuToggle = document.querySelector('.menu-toggle');
  menuToggle.addEventListener('click', () => { const open = menuToggle.getAttribute('aria-expanded') !== 'true'; menuToggle.setAttribute('aria-expanded', String(open)); menuToggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu'); nav.classList.toggle('nav-open', open); document.body.classList.toggle('menu-open', open); });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { menuToggle.setAttribute('aria-expanded', 'false'); nav.classList.remove('nav-open'); document.body.classList.remove('menu-open'); }));

  document.querySelectorAll('[data-whatsapp]').forEach(link => { link.href = waUrl(`Olá! Gostaria de saber mais sobre os serviços da ${config.name || 'barbearia'}.`); link.target = '_blank'; link.rel = 'noopener noreferrer'; });
  document.querySelector('[data-address]').textContent = config.address || 'Endereço a configurar';
  document.querySelector('[data-phone]').textContent = config.phone || 'Telefone a configurar';
  document.querySelector('[data-hours]').innerHTML = (config.hours || []).map(hour => `<span>${escapeHtml(hour)}</span>`).join('<br>');
  const instagram = document.querySelector('[data-instagram]');
  if (config.instagram) { instagram.href = config.instagram; instagram.target = '_blank'; instagram.rel = 'noopener noreferrer'; } else { instagram.href = '#contato'; instagram.setAttribute('aria-label', 'Instagram a configurar'); }
  const map = document.querySelector('[data-map]');
  if (config.mapUrl) { map.href = config.mapUrl; map.target = '_blank'; map.rel = 'noopener noreferrer'; } else map.href = '#contato';
  const professionals = document.querySelector('#professional-select');
  (config.professionals || []).forEach(name => { const option = document.createElement('option'); option.value = name; option.textContent = name; professionals.append(option); });
  document.querySelector('#year').textContent = new Date().getFullYear();

  function escapeHtml(value) { return String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]); }
  const dateInput = document.querySelector('#booking-date');
  const localToday = new Date(); dateInput.min = `${localToday.getFullYear()}-${String(localToday.getMonth() + 1).padStart(2, '0')}-${String(localToday.getDate()).padStart(2, '0')}`;
  const form = document.querySelector('#booking-form');
  form.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(form);
    const required = ['name', 'phone', 'service', 'date', 'time'];
    const missing = required.find(key => !String(data.get(key) || '').trim());
    const error = document.querySelector('#form-error'); error.textContent = '';
    if (missing) { error.textContent = 'Preencha os campos obrigatórios para continuar.'; form.elements[missing].focus(); return; }
    if (data.get('phone').replace(/\D/g, '').length < 10) { error.textContent = 'Confira o telefone. Inclua DDD e número.'; form.elements.phone.focus(); return; }
    if (data.get('date') < dateInput.min) { error.textContent = 'Escolha hoje ou uma data futura.'; dateInput.focus(); return; }
    const date = new Date(`${data.get('date')}T12:00:00`).toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' });
    const message = [`Olá! Gostaria de solicitar um horário na ${config.name || 'barbearia'}.`, '', `Nome: ${data.get('name').trim()}`, `WhatsApp: ${data.get('phone').trim()}`, `Serviço: ${data.get('service')}`, `Profissional: ${data.get('professional') || 'Sem preferência'}`, `Data desejada: ${date}`, `Horário desejado: ${data.get('time')}`, data.get('notes').trim() ? `Observações: ${data.get('notes').trim()}` : '', '', 'Se possível, confirmem a disponibilidade. Obrigado!'].filter(Boolean).join('\n');
    document.querySelector('#booking-success').hidden = false;
    window.open(waUrl(message), '_blank', 'noopener,noreferrer');
  });

  const observer = 'IntersectionObserver' in window ? new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } }), { threshold: 0.12 }) : null;
  document.querySelectorAll('.reveal').forEach(element => observer ? observer.observe(element) : element.classList.add('is-visible'));
  const lightbox = document.querySelector('#lightbox');
  document.querySelectorAll('.gallery-item').forEach(button => button.addEventListener('click', () => { const img = lightbox.querySelector('img'); img.src = button.dataset.full; img.alt = button.querySelector('img').alt; lightbox.showModal(); }));
  lightbox.querySelector('.lightbox-close').addEventListener('click', () => lightbox.close());
  lightbox.addEventListener('click', event => { if (event.target === lightbox) lightbox.close(); });
})();
