/* ================================================================
   ZENITH — engine.js
   Renders all dynamic page sections from data.js content.
   Called by each page after DOM load.
================================================================ */

/* ---- NAV ---- */
function renderNav(activePage) {
  const nav = document.getElementById('nav');
  if (!nav) return;
  const lang = getLang();
  const data = loadSiteData();

  const links = [
    { key: 'nav_about',   href: (activePage === 'index' ? '#about'     : 'index.html#about') },
    { key: 'nav_circuits',href: (activePage === 'index' ? '#circuits'   : 'index.html#circuits') },
    { key: 'nav_grouped', href: (activePage === 'index' ? '#organised'  : 'index.html#organised') },
    { key: 'nav_services',href: (activePage === 'index' ? '#services'   : 'index.html#services') },
    { key: 'nav_reviews', href: (activePage === 'index' ? '#temoignages': 'index.html#temoignages') },
    { key: 'nav_contact', href: (activePage === 'index' ? '#contact'    : 'index.html#contact') },
  ];

  const linksHTML = links.map(l =>
    `<li><a href="${l.href}">${t(l.key)}</a></li>`
  ).join('');

  const contactHref = activePage === 'index' ? '#contact' : 'index.html#contact';

  // Language switcher
  const langs = ['fr', 'en', 'mg'];
  const langHTML = langs.map(l =>
    `<button class="lang-btn ${l === lang ? 'active' : ''}" data-lang="${l}">${l.toUpperCase()}</button>`
  ).join('');

  nav.querySelector('.nav-wrap').innerHTML = `
    <a href="index.html" class="nav-logo">
      <img class="nav-logo-img" src="${activePage === 'index' ? '' : ''}logo.jpg" alt="Zenith"
           style="height:48px;width:auto;object-fit:contain;mix-blend-mode:screen;filter:brightness(1.1)" />
      <div class="logo-text-wrap"><b>Zenith</b><small>Travel and Tours</small></div>
    </a>
    <ul class="nav-links">${linksHTML}</ul>
    <div class="lang-switcher">${langHTML}</div>
    <a href="${contactHref}" class="btn btn-gold nav-cta-btn" style="flex-shrink:0">
      <i class="fas fa-paper-plane"></i> ${t('nav_quote')}
    </a>
    <button class="hamburger" id="burger" aria-label="Menu">
      <span></span><span></span><span></span>
    </button>
  `;

  // Mobile nav
  const mobileNav = document.getElementById('mobileNav');
  if (mobileNav) {
    mobileNav.innerHTML = links.map(l =>
      `<a href="${l.href}">${t(l.key)}</a>`
    ).join('') +
    `<a href="${contactHref}" class="btn btn-gold" style="margin-top:1rem">${t('nav_quote')}</a>` +
    `<div class="lang-switcher" style="margin-top:1.5rem">${langHTML}</div>`;
  }

  // Bind lang buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      setLang(btn.dataset.lang);
      window.location.reload();
    });
  });

  // Re-bind hamburger (freshly rendered)
  const burger = document.getElementById('burger');
  if (burger && mobileNav) {
    burger.addEventListener('click', () => {
      const open = mobileNav.classList.toggle('open');
      burger.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    mobileNav.querySelectorAll('a, .btn').forEach(a => {
      a.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        burger.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }
}

/* ---- FOOTER ---- */
function renderFooter() {
  const footer = document.querySelector('footer');
  if (!footer) return;
  const data = loadSiteData();

  const circuits = data.circuits.map(c =>
    `<li><a href="circuit.html?id=${c.id}">${tField(c, 'name')}</a></li>`
  ).join('');

  footer.innerHTML = `
    <div class="container">
      <div class="footer-main">
        <div class="footer-brand">
          <a href="index.html" class="nav-logo">
            <img src="logo.jpg" alt="Zenith" style="height:44px;width:auto;object-fit:contain;mix-blend-mode:screen;filter:brightness(1.1)" />
            <div class="logo-text-wrap"><b>Zenith</b><small>Travel and Tours</small></div>
          </a>
          <p>${t('footer_tagline')}</p>
          <div class="social-row">
            <a href="${data.meta.facebook}" class="soc"><i class="fab fa-facebook-f"></i></a>
            <a href="${data.meta.instagram}" class="soc"><i class="fab fa-instagram"></i></a>
            <a href="https://wa.me/${data.meta.whatsapp}" class="soc"><i class="fab fa-whatsapp"></i></a>
            <a href="${data.meta.tripadvisor}" class="soc"><i class="fab fa-tripadvisor"></i></a>
          </div>
        </div>
        <div class="footer-col">
          <h5>${t('footer_circuits')}</h5>
          <ul>${circuits}</ul>
        </div>
        <div class="footer-col">
          <h5>${t('footer_info')}</h5>
          <ul>
            <li><a href="index.html#about">${t('nav_about')}</a></li>
            <li><a href="index.html#organised">${t('nav_grouped')}</a></li>
            <li><a href="index.html#temoignages">${t('nav_reviews')}</a></li>
            <li><a href="index.html#contact">${t('nav_contact')}</a></li>
            <li><a href="mentions-legales.html">${t('footer_ml')}</a></li>
            <li><a href="cgv.html">${t('footer_cgv')}</a></li>
            <li><a href="confidentialite.html">${t('footer_conf')}</a></li>
          </ul>
        </div>
        <div class="footer-col footer-newsletter">
          <h5>${t('footer_nl_h')}</h5>
          <p>${t('footer_nl_p')}</p>
          <div class="nl-form">
            <input type="email" placeholder="${t('footer_nl_ph')}" aria-label="Email" />
            <button type="button"><i class="fas fa-arrow-right"></i></button>
          </div>
          <p style="font-size:0.7rem;color:var(--gray);margin-top:0.5rem">
            <i class="fas fa-lock" style="font-size:0.65rem"></i> ${getLang() === 'fr' ? 'Aucun spam' : getLang() === 'en' ? 'No spam' : 'Tsy misy spam'}
          </p>
        </div>
      </div>
    </div>
    <div class="footer-bottom-bar">
      <div class="container">
        <p>${t('copyright')}</p>
        <div class="footer-legal">
          <a href="mentions-legales.html">${t('footer_ml')}</a>
          <a href="cgv.html">${t('footer_cgv')}</a>
          <a href="confidentialite.html">${t('footer_conf')}</a>
        </div>
      </div>
    </div>
  `;

  // Newsletter button
  const nlForm = footer.querySelector('.nl-form');
  if (nlForm) {
    const btn = nlForm.querySelector('button');
    const inp = nlForm.querySelector('input');
    btn.addEventListener('click', () => {
      if (inp.value.includes('@')) {
        btn.innerHTML = '✓'; btn.style.background = 'var(--green)';
        inp.value = ''; inp.placeholder = getLang() === 'fr' ? 'Merci !' : getLang() === 'en' ? 'Thank you!' : 'Misaotra!';
      }
    });
  }
}

/* ---- HERO (index only) ---- */
function renderHero() {
  const hero = document.getElementById('hero');
  if (!hero) return;
  hero.querySelector('.hero-eyebrow').textContent = t('hero_tag');
  const h1 = hero.querySelector('.hero-h1');
  if (h1) h1.innerHTML = `${t('hero_h1a')}<br><em>${t('hero_h1b')}</em><br>${t('hero_h1c')}`;
  const sub = hero.querySelector('.hero-sub');
  if (sub) sub.textContent = t('hero_sub');
  const cta1 = hero.querySelector('.hero-cta1');
  const cta2 = hero.querySelector('.hero-cta2');
  if (cta1) cta1.innerHTML = `<i class="fas fa-paper-plane"></i> ${t('hero_cta1')}`;
  if (cta2) cta2.innerHTML = `<i class="fas fa-route"></i> ${t('hero_cta2')}`;

  // Stats
  const stats = ['1','2','3','4'];
  stats.forEach(n => {
    const el = hero.querySelector(`.stat-n-${n}`);
    const ll = hero.querySelector(`.stat-l-${n}`);
    if (el) el.textContent = t(`stat${n}_n`);
    if (ll) ll.textContent = t(`stat${n}_l`);
  });
}

/* ---- CIRCUITS GRID (index) ---- */
function renderCircuitsGrid() {
  const grid = document.getElementById('circuitsGrid');
  if (!grid) return;
  const data = loadSiteData();

  // Section head
  const tag = document.getElementById('circuits_tag');
  const h2  = document.getElementById('circuits_h2');
  const sub = document.getElementById('circuits_sub');
  if (tag) tag.textContent = t('circuits_tag');
  if (h2)  h2.textContent  = t('circuits_h2');
  if (sub) sub.textContent = t('circuits_sub');

  grid.innerHTML = data.circuits.map((c, i) => {
    const delay = ['','d1','d2','','d1','d2'][i] || '';
    return `
    <div class="c-card reveal ${delay}">
      <div class="c-img">
        <img src="${c.image}" alt="${tField(c,'name')}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=700&q=80'" />
        <div class="c-pill">${tField(c,'pill')}</div>
      </div>
      <div class="c-body">
        <div class="c-meta">
          <span><i class="fas fa-clock"></i> ${c.duration_days} ${getLang() === 'fr' ? 'jours' : getLang() === 'mg' ? 'andro' : 'days'}</span>
          <span><i class="fas fa-map-pin"></i> ${tField(c,'location')}</span>
        </div>
        <h3>${tField(c,'name')}</h3>
        <p>${tField(c,'desc')}</p>
        <div class="c-foot">
          <div class="c-price">
            <div class="from">${t('from_label')}</div>
            <div class="amt">${c.price.toLocaleString('fr-FR')} €</div>
            <div class="per">${t('per_person')}</div>
          </div>
          <a href="circuit.html?id=${c.id}" class="btn btn-gold">${t('see_circuit')}</a>
        </div>
      </div>
    </div>`;
  }).join('');

  // Re-observe reveals
  if (window._revealObserver) {
    grid.querySelectorAll('.reveal').forEach(el => window._revealObserver.observe(el));
  }
}

/* ---- GROUPED TRIPS (index) ---- */
function renderGrouped() {
  const grid = document.getElementById('groupedGrid');
  if (!grid) return;
  const data = loadSiteData();

  const tag = document.getElementById('grouped_tag');
  const h2  = document.getElementById('grouped_h2');
  const sub = document.getElementById('grouped_sub');
  if (tag) tag.textContent = t('grouped_tag');
  if (h2)  h2.textContent  = t('grouped_h2');
  if (sub) sub.textContent = t('grouped_sub');

  const contactHref = 'index.html#contact';
  grid.innerHTML = data.grouped.map((g, i) => {
    const left = g.max_places - g.taken;
    const pct  = Math.round((g.taken / g.max_places) * 100);
    const leftLabel = left <= 3
      ? `<span style="color:#e05555">⚠ ${left} ${t('places_few')}${left > 1 ? 's' : ''}</span>`
      : `${left} ${t('places_left')}`;
    const delay = i % 2 === 1 ? 'd1' : '';
    return `
    <div class="org-card reveal ${delay}">
      <div class="org-img">
        <img src="${g.image}" alt="${tField(g,'name')}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=700&q=80'" />
        <div class="org-date-badge">
          <div class="day">${g.day}</div>
          <div class="month">${tField(g,'month')}</div>
        </div>
      </div>
      <div class="org-body">
        <h3>${tField(g,'name')}</h3>
        <div class="org-sub"><i class="fas fa-clock" style="color:var(--gold);margin-right:.3em"></i>${tField(g,'duration')} · ${getLang() === 'fr' ? 'départ' : getLang() === 'en' ? 'departure' : 'fandehanan'} ${tField(g,'month')}</div>
        <div class="places-bar">
          <div class="bar-track"><div class="bar-fill" style="width:${pct}%"></div></div>
          <div class="bar-label">${leftLabel}</div>
        </div>
        <div class="org-footer">
          <div>
            <div class="org-price">
              <div class="from">${t('group_price')}</div>
              <div class="amt">${g.price.toLocaleString('fr-FR')} €</div>
              <div class="per">${t('per_person')} · ${t('group_incl')}</div>
            </div>
            <div class="org-info">${tField(g,'incl')}</div>
          </div>
          <a href="#contact" class="btn btn-gold">${t('book_now')}</a>
        </div>
      </div>
    </div>`;
  }).join('');

  const alsoP  = document.getElementById('grouped_also_p');
  const alsoBtn = document.getElementById('grouped_also_btn');
  if (alsoP)   alsoP.textContent   = t('grouped_also');
  if (alsoBtn) alsoBtn.textContent = t('grouped_also_btn');

  if (window._revealObserver) {
    grid.querySelectorAll('.reveal').forEach(el => window._revealObserver.observe(el));
  }
}

/* ---- ABOUT ---- */
function renderAbout() {
  const section = document.getElementById('about');
  if (!section) return;
  const keys = ['about_tag','about_h2a','about_h2b','about_h2c','about_p1','about_p2','about_quote','about_cite',
    'val1_title','val1_sub','val2_title','val2_sub','val3_title','val3_sub','val4_title','val4_sub'];
  keys.forEach(k => {
    const el = section.querySelector(`[data-t="${k}"]`);
    if (el) el.textContent = t(k);
  });
}

/* ---- SERVICES ---- */
function renderServices() {
  const section = document.getElementById('services');
  if (!section) return;
  ['services_tag','services_h2','services_sub',
   'svc1_h','svc1_p','svc2_h','svc2_p','svc3_h','svc3_p','svc4_h','svc4_p'].forEach(k => {
    const el = section.querySelector(`[data-t="${k}"]`);
    if (el) el.textContent = t(k);
  });
}

/* ---- TESTIMONIALS ---- */
function renderTestimonials() {
  const grid = document.getElementById('temoGrid');
  if (!grid) return;
  const data = loadSiteData();
  const lang = getLang();

  document.querySelector('[data-t="reviews_tag"]') && (document.querySelector('[data-t="reviews_tag"]').textContent = t('reviews_tag'));
  document.querySelector('[data-t="reviews_h2"]')  && (document.querySelector('[data-t="reviews_h2"]').textContent  = t('reviews_h2'));

  grid.innerHTML = data.testimonials.map((tm, i) => {
    const delay = ['','d1','d2'][i] || '';
    return `
    <div class="temo reveal ${delay}">
      <div class="temo-stars">${'★'.repeat(tm.stars)}</div>
      <div class="temo-quote">"</div>
      <p class="temo-text">${tm['text_' + lang] || tm.text_fr}</p>
      <div class="temo-author">
        <div class="temo-avatar"><img src="${tm.avatar}" alt="${tm.name}" /></div>
        <div>
          <span class="temo-name">${tm.name}</span>
          <span class="temo-origin">${tm['origin_' + lang] || tm.origin_fr}</span>
        </div>
      </div>
    </div>`;
  }).join('');

  if (window._revealObserver) {
    grid.querySelectorAll('.reveal').forEach(el => window._revealObserver.observe(el));
  }
}

/* ---- CTA BAND ---- */
function renderCTA() {
  const band = document.querySelector('.cta-band');
  if (!band) return;
  const h2  = band.querySelector('[data-t="cta_h2"]');
  const sub = band.querySelector('[data-t="cta_sub"]');
  const btn = band.querySelector('[data-t="cta_btn"]');
  if (h2)  h2.textContent  = t('cta_h2');
  if (sub) sub.textContent = t('cta_sub');
  if (btn) btn.innerHTML   = `<i class="fas fa-paper-plane"></i> ${t('cta_btn')}`;
}

/* ---- CONTACT FORM ---- */
function renderContactForm() {
  const section = document.getElementById('contact');
  if (!section) return;
  const data = loadSiteData();

  section.querySelector('[data-t="contact_tag"]')  && (section.querySelector('[data-t="contact_tag"]').textContent  = t('contact_tag'));
  section.querySelector('[data-t="contact_h2a"]')  && (section.querySelector('[data-t="contact_h2a"]').textContent  = t('contact_h2a'));
  section.querySelector('[data-t="contact_h2b"]')  && (section.querySelector('[data-t="contact_h2b"]').textContent  = t('contact_h2b'));
  section.querySelector('[data-t="contact_sub"]')  && (section.querySelector('[data-t="contact_sub"]').textContent  = t('contact_sub'));
  section.querySelector('[data-t="form_h3"]')      && (section.querySelector('[data-t="form_h3"]').textContent      = t('form_h3'));
  section.querySelector('[data-t="form_intro"]')   && (section.querySelector('[data-t="form_intro"]').textContent   = t('form_intro'));

  // Labels & placeholders
  const fields = [
    ['f_name', 'nom', true], ['f_email', 'email', true],
    ['f_phone', 'tel', false], ['f_travelers', 'voyageurs', true],
    ['f_date', 'depart', false], ['f_duration', 'duree', false],
    ['f_circuit', 'circuit', false], ['f_pref', null, true], ['f_message', 'message', false]
  ];
  fields.forEach(([key, id, req]) => {
    const lbl = section.querySelector(`label[for="${id}"]`);
    if (lbl) lbl.innerHTML = t(key) + (req ? ' <span class="req-star">*</span>' : '');
  });

  // Placeholder texts
  const npEl = section.querySelector('#nom');   if (npEl) npEl.placeholder = t('f_name_ph');
  const epEl = section.querySelector('#email'); if (epEl) epEl.placeholder = t('f_email_ph');
  const tpEl = section.querySelector('#tel');   if (tpEl) tpEl.placeholder = t('f_phone_ph');
  const mpEl = section.querySelector('#message'); if (mpEl) mpEl.placeholder = t('f_message_ph');

  // Submit button
  const sub = section.querySelector('.f-submit');
  if (sub) sub.innerHTML = `<i class="fas fa-paper-plane"></i> ${t('f_submit')}`;

  // Contact pref labels
  const ep = section.querySelector('label[for="pref-email"]'); if (ep) ep.innerHTML = `<i class="fas fa-envelope"></i> ${t('f_pref_email')}`;
  const wp = section.querySelector('label[for="pref-wa"]');    if (wp) wp.innerHTML = `<i class="fab fa-whatsapp"></i> ${t('f_pref_wa')}`;
  const cp = section.querySelector('label[for="pref-call"]');  if (cp) cp.innerHTML = `<i class="fas fa-phone"></i> ${t('f_pref_call')}`;

  // Contact info
  const ph = section.querySelector('.ci-phone'); if (ph) ph.href = `tel:${data.meta.phone.replace(/\s/g,'')}`;
  const phTxt = section.querySelector('.ci-phone-txt'); if (phTxt) phTxt.textContent = data.meta.phone;
  const em = section.querySelector('.ci-email'); if (em) { em.href = `mailto:${data.meta.email}`; em.textContent = data.meta.email; }

  // Success msg
  const okh = section.querySelector('[data-t="f_success_h"]'); if (okh) okh.textContent = t('f_success_h');
  const okp = section.querySelector('[data-t="f_success_p"]'); if (okp) okp.textContent = t('f_success_p');

  // Ci label texts
  section.querySelectorAll('[data-t]').forEach(el => {
    const key = el.dataset.t;
    if (key) el.textContent = t(key);
  });
}

/* ---- CIRCUIT DETAIL PAGE ---- */
function renderCircuitPage() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const data = loadSiteData();
  const lang = getLang();
  const circuit = data.circuits.find(c => c.id === id);

  if (!circuit) {
    document.body.innerHTML = `<div style="padding:8rem 2rem;text-align:center;font-family:sans-serif;color:#fff;background:#1a1a2e">
      <h1>Circuit introuvable</h1><p><a href="index.html" style="color:#F5A623">← Retour</a></p></div>`;
    return;
  }

  document.title = `${tField(circuit,'name')} — Zenith Travel and Tours`;

  // Hero
  const heroEl = document.querySelector('.c-hero-bg');
  if (heroEl) heroEl.style.backgroundImage = `url('${circuit.hero_image}')`;

  const eyebrow = document.querySelector('.c-hero-eyebrow');
  if (eyebrow) eyebrow.textContent = tField(circuit,'pill');

  const h1 = document.querySelector('.c-hero-h1');
  if (h1) h1.textContent = tField(circuit,'name');

  // Chips
  const chips = document.querySelector('.c-chips');
  if (chips) {
    chips.innerHTML = `
      <div class="chip"><i class="fas fa-clock"></i> ${circuit.duration_days} ${lang === 'fr' ? 'jours / '+(circuit.duration_days-1)+' nuits' : lang === 'mg' ? 'andro' : 'days / '+(circuit.duration_days-1)+' nights'}</div>
      <div class="chip"><i class="fas fa-map-pin"></i> ${tField(circuit,'location')}</div>
      <div class="chip"><i class="fas fa-truck-monster"></i> ${tField(circuit,'transport')}</div>
      <div class="chip"><i class="fas fa-leaf"></i> ${lang==='fr'?'Tourisme responsable':lang==='mg'?'Fizahantany mendrika':'Responsible tourism'}</div>
    `;
  }

  // Breadcrumb
  const bc = document.querySelector('.c-breadcrumb-name');
  if (bc) bc.textContent = tField(circuit,'name');

  // Back link
  document.querySelectorAll('[data-t="back_circuits"]').forEach(el => el.textContent = t('back_circuits'));

  // Intro text
  const introH = document.querySelector('.c-intro-h');
  if (introH) introH.textContent = tField(circuit,'name');
  const introP1 = document.querySelector('.c-intro-p1');
  if (introP1) introP1.textContent = tField(circuit,'desc');

  // Gallery
  const gallery = document.querySelector('.c-gallery');
  if (gallery && circuit.gallery) {
    gallery.innerHTML = circuit.gallery.map((src, i) =>
      `<div class="${i === 0 ? 'g0' : ''}"><img src="${src}" alt="${tField(circuit,'name')} ${i+1}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=700&q=80'" /></div>`
    ).join('');
  }

  // Itinerary
  const itinerary = document.querySelector('.itinerary');
  const daysKey = 'days_' + lang;
  const days = circuit[daysKey] || circuit.days_fr || [];
  if (itinerary) {
    itinerary.innerHTML = days.map((d, i) => `
      <div class="day">
        <div class="day-num">${d.num}</div>
        <div class="day-content"><b>${d.title}</b><span>${d.desc}</span></div>
      </div>`
    ).join('');
  }

  // Included / excluded
  const inclEl  = document.querySelector('.incl-yes ul');
  const exclEl  = document.querySelector('.incl-no ul');
  const inclKey = 'incl_' + lang;
  const exclKey = 'excl_' + lang;
  const incl = circuit[inclKey] || circuit.incl_fr || [];
  const excl = circuit[exclKey] || circuit.excl_fr || [];
  if (inclEl) inclEl.innerHTML = incl.map(i => `<li><i class="fas fa-check-circle"></i> ${i}</li>`).join('');
  if (exclEl) exclEl.innerHTML = excl.map(i => `<li><i class="fas fa-times-circle"></i> ${i}</li>`).join('');

  // Incl/excl headings
  const inclH = document.querySelector('.incl-yes h4');
  const exclH = document.querySelector('.incl-no h4');
  if (inclH) inclH.innerHTML = `<i class="fas fa-check"></i> ${lang==='fr'?'Inclus':lang==='mg'?'Aniana':'Included'}`;
  if (exclH) exclH.innerHTML = `<i class="fas fa-times"></i> ${lang==='fr'?'Non inclus':lang==='mg'?'Tsy aniana':'Not included'}`;

  // Sidebar price card
  const bigPrice = document.querySelector('.price-card .big');
  if (bigPrice) bigPrice.textContent = circuit.price.toLocaleString('fr-FR') + ' €';
  const perP = document.querySelector('.price-card .per-p');
  if (perP) perP.textContent = `${t('per_person')} · ${circuit.duration_days} ${lang==='fr'?'jours':lang==='mg'?'andro':'days'}`;

  const pcbRows = document.querySelectorAll('.pcb-row');
  if (pcbRows.length >= 5) {
    const labels = lang==='fr'
      ? ['Durée','Difficulté','Groupe max.','Meilleure période','Transport']
      : lang==='mg'
      ? ['Faharetan','Sarotra','Vondron\'olona','Fe-potoana tsara','Fitaovana']
      : ['Duration','Difficulty','Max. group','Best period','Transport'];
    const vals = [
      `${circuit.duration_days} ${lang==='fr'?'jours':lang==='mg'?'andro':'days'}`,
      tField(circuit,'difficulty'),
      `${circuit.max_group} ${lang==='fr'?'personnes':lang==='mg'?'olona':'people'}`,
      tField(circuit,'best_period'),
      tField(circuit,'transport')
    ];
    pcbRows.forEach((row, i) => {
      if (labels[i]) {
        const spans = row.querySelectorAll('span');
        if (spans[0]) spans[0].textContent = labels[i];
        if (spans[1]) spans[1].textContent = vals[i];
      }
    });
  }

  // Sidebar buttons
  const sideDevis = document.querySelector('.sidebar-devis-btn');
  if (sideDevis) sideDevis.innerHTML = `<i class="fas fa-paper-plane"></i> ${t('nav_quote')}`;
  const waBtn = document.querySelector('.whatsapp-btn');
  const waText = encodeURIComponent(`Bonjour, je suis intéressé(e) par le circuit ${tField(circuit,'name')}`);
  if (waBtn) waBtn.href = `https://wa.me/${data.meta.whatsapp}?text=${waText}`;

  // Other circuits section
  const othersGrid = document.getElementById('othersGrid');
  if (othersGrid) {
    othersGrid.innerHTML = data.circuits
      .filter(c => c.id !== id)
      .map(c => `<a href="circuit.html?id=${c.id}" class="btn btn-dark">${tField(c,'name')}</a>`)
      .join('');
    document.querySelectorAll('[data-t="discover_also"]').forEach(el => el.textContent = t('discover_also'));
    document.querySelectorAll('[data-t="other_circuits"]').forEach(el => el.textContent = t('other_circuits'));
  }

  // Heading translations
  document.querySelectorAll('[data-t]').forEach(el => {
    const k = el.dataset.t;
    if (k) el.textContent = t(k);
  });
}

/* ---- INIT for index ---- */
function initIndex() {
  renderNav('index');
  renderHero();
  renderAbout();
  renderCircuitsGrid();
  renderGrouped();
  renderServices();
  renderTestimonials();
  renderCTA();
  renderContactForm();
  renderFooter();
  initReveal();
  initFormSubmit();
  initNavScroll();
}

/* ---- INIT for circuit page ---- */
function initCircuitPage() {
  renderNav('circuit');
  renderCircuitPage();
  renderFooter();
  initReveal();
  initNavScroll();
}

/* ---- SHARED INIT ---- */
function initReveal() {
  const ro = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); ro.unobserve(e.target); } });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  window._revealObserver = ro;
  document.querySelectorAll('.reveal').forEach(el => ro.observe(el));
}

function initNavScroll() {
  const nav = document.getElementById('nav');
  if (!nav) return;
  const fn = () => nav.classList.toggle('scrolled', window.scrollY > 60);
  window.addEventListener('scroll', fn, { passive: true });
  fn();
}

function initFormSubmit() {
  const form = document.getElementById('devisForm');
  if (!form) return;
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ${getLang()==='fr'?'Envoi…':getLang()==='mg'?'Alefa…':'Sending…'}`;
    try {
      const resp = await fetch(form.action, { method:'POST', body: new FormData(form), headers:{'Accept':'application/json'} });
      if (resp.ok) {
        document.getElementById('formBody').style.display = 'none';
        document.getElementById('formOk').style.display = 'block';
      } else {
        btn.disabled = false;
        btn.innerHTML = `<i class="fas fa-paper-plane"></i> ${t('f_submit')}`;
        alert(getLang()==='fr' ? 'Erreur d\'envoi. Veuillez réessayer.' : 'Send error. Please retry.');
      }
    } catch { btn.disabled = false; btn.innerHTML = `<i class="fas fa-paper-plane"></i> ${t('f_submit')}`; }
  });
}
