/* Stéphane Verfaillie · effets propres au site (direction « Ça repart »).
   Le socle gère l'ouverture, le voile, l'en-tête, les mesures et la bibliothèque d'effets posés par attributs.
   Ici : l'intro (le bouton marche/arrêt s'allume et glisse jusqu'à l'objet de la page), le statut « joignable »
   à l'heure de Paris, la pastille (badge), les coches (coche), la carte des 30 km (zone), le prix géant (prix-geant),
   la ligne de balayage des pros (balayage), la frise du rendez-vous (etapes), le filtre des tarifs, l'estimateur
   (ticket) et le formulaire de rendez-vous (module formulaire-par-etapes de la bibliothèque). */
import { demarrer, versObjet, quand } from './socle/index.js?v=2';
import { preparer as lireHoraires, maintenant, statut as statutDe, jour, ajouter, jourDe, JOURS } from './modules/horaires-calcul.js?v=2';
import { init as initFormulaire } from './modules/formulaire-par-etapes.js?v=2';

const gsap = window.gsap;
const ST = window.ScrollTrigger;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const sansAccent = (t) => String(t || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[-'’\s]+/g, ' ').trim();
const euros = (n) => `${n} €`;
const fourchette = (a, b) => (a === b ? euros(a) : `${a} à ${b} €`);

/* ---------- Statut « joignable maintenant » (heure de Paris, jours fériés : aucun statut) ---------- */
let horaires = null;
try { horaires = lireHoraires(JSON.parse($('[data-horaires]')?.textContent || 'null')); } catch { horaires = null; }
function statutDuMoment() {
  if (!horaires) return null;
  const a = horaires.adresses[0], n = maintenant(horaires.fuseau);
  if (a.feries.some((f) => f.date === n.iso)) return null;
  const s = statutDe(a, n, horaires.seuil);
  if (s.etat === 'ouvert') return { ouvert: true, texte: `Joignable maintenant · jusqu'à ${s.texte.split('à ').pop()}` };
  if (s.etat === 'bientot') return { ouvert: true, texte: `Joignable encore ${s.reste} min` };
  /* Fermé : formulé en positif (« Joignable demain dès 8 h »). */
  const quand = s.texte.replace(/^Fermé · /, '').replace(/^r?ouvre /, '').replace(/^à /, 'dès ').replace(/ à (\d)/, ' dès $1');
  return { ouvert: false, texte: s.prochaine ? `Joignable ${quand}` : s.texte };
}
function majStatut() {
  const s = statutDuMoment();
  $$('[data-statut]').forEach((p) => {
    if (!s) { if (p.classList.contains('pied-statut')) p.hidden = true; return; }
    p.hidden = false;
    const t = $('[data-statut-texte]', p); if (t) t.textContent = s.texte;
    $$('.voyant', p).forEach((v) => v.classList.toggle('voyant--eteint', !s.ouvert));
  });
  const v = $('[data-statut-voyant]'); if (v) v.classList.toggle('voyant--eteint', !!s && !s.ouvert);
}
majStatut();
setTimeout(() => { majStatut(); setInterval(majStatut, 60000); }, (60 - new Date().getSeconds()) * 1000);

/* ---------- Pastille et pictogrammes : effets au défilement ---------- */
function pastille() {
  const p = $('.pastille-texte'); if (!p || !ST) return;
  gsap.to(p, { rotation: 540, ease: 'none', scrollTrigger: { trigger: document.documentElement, start: 0, end: 'max', scrub: 0.6 } });
}
function coches() {
  $$('[data-coche]').forEach((li, i) => {
    const svg = $('.coche', li), traits = $$('circle, path', svg);
    ST.create({ trigger: li, start: 'top 88%', once: true, onEnter: () => {
      const tl = gsap.timeline({ delay: (i % 3) * 0.06 });
      tl.fromTo(li, { opacity: 0.35 }, { opacity: 1, duration: 0.4 }, 0)
        .fromTo(svg, { scale: 0.6 }, { scale: 1, duration: 0.5, ease: 'back.out(2)', transformOrigin: '50% 50%' }, 0)
        .fromTo(traits[0], { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.5, ease: 'power2.out' }, 0)
        .fromTo(traits[1], { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.35, ease: 'power2.out' }, 0.3);
    } });
  });
}

/* ---------- Appel final : le bouton marche/arrêt se trace puis s'allume ---------- */
function anneaux() {
  $$('.appel-anneau').forEach((a) => {
    const arc = $('.anneau-arc', a), trait = $('.anneau-trait', a);
    const tl = gsap.timeline({ scrollTrigger: { trigger: a, start: 'top 85%', end: 'center 55%', scrub: 0.5 } });
    tl.fromTo(arc, { strokeDashoffset: 1 }, { strokeDashoffset: 0, ease: 'none', duration: 1 }, 0)
      .fromTo(trait, { strokeDashoffset: 1 }, { strokeDashoffset: 0, ease: 'none', duration: 0.5 }, 0.5);
    ST.create({ trigger: a, start: 'center 58%', onEnter: () => a.classList.add('est-allume'), onLeaveBack: () => a.classList.remove('est-allume') });
  });
}

/* ---------- Carte des 30 km ---------- */
function zones() {
  $$('section.zone').forEach((sec) => {
    const cercle = $('.zone-cercle', sec);
    gsap.fromTo(cercle, { strokeDashoffset: 1 }, { strokeDashoffset: 0, ease: 'none', scrollTrigger: { trigger: $('.zone-carte', sec), start: 'top 85%', end: 'center 55%', scrub: 0.5 } });
    gsap.fromTo($$('.zone-villes g, .zone-atelier, .zone-molsheim', sec), { opacity: 0 }, { opacity: 1, stagger: 0.06, duration: 0.5, scrollTrigger: { trigger: $('.zone-carte', sec), start: 'top 70%', once: true } });
    let communes = {};
    try { communes = JSON.parse($('[data-communes]', sec).textContent); } catch {}
    const index = Object.fromEntries(Object.keys(communes).map((n) => [sansAccent(n), n]));
    const form = $('[data-zone-form]', sec), champ = $('input', form), res = $('[data-zone-resultat]', sec), choix = $('[data-zone-choix]', sec);
    const ligne = $('line', choix), point = $('circle', choix), lien = $('[data-zone-lien]', sec);
    const verifier = () => {
      const brut = champ.value.trim(); if (!brut) { res.textContent = ''; choix.classList.remove('est-visible'); return; }
      const nom = index[sansAccent(brut)];
      if (nom) {
        const [km, x, y] = communes[nom];
        res.textContent = res.dataset.dedans.replace('{commune}', nom).replace('{km}', String(km).replace('.', ','));
        res.classList.add('est-dedans');
        gsap.to(ligne, { attr: { x2: x, y2: y }, duration: 0.5, ease: 'power3.out' });
        gsap.to(point, { attr: { cx: x, cy: y }, duration: 0.5, ease: 'power3.out' });
        choix.classList.add('est-visible');
        if (lien) { lien.hidden = false; lien.textContent = lien.dataset.modele.replace('{commune}', nom); lien.setAttribute('href', lien.getAttribute('href').split('?')[0] + '?lieu=domicile&commune=' + encodeURIComponent(nom)); }
      } else {
        if (lien) lien.hidden = true;
        res.textContent = res.dataset.dehors.replace('{commune}', brut);
        res.classList.remove('est-dedans');
        choix.classList.remove('est-visible');
      }
    };
    form.addEventListener('submit', (e) => { e.preventDefault(); verifier(); });
    champ.addEventListener('change', verifier);
  });
}

/* ---------- Services : filtres (gardés dans l'adresse) et estimateur ---------- */
function filtres() {
  const zone = $('[data-filtres]'); if (!zone) return;
  const boutons = $$('[data-filtre]', zone), familles = $$('[data-famille]'), compte = $('[data-filtres-compte]');
  const appliquer = (id, pousser) => {
    if (!boutons.some((b) => b.dataset.filtre === id)) id = 'tout';
    boutons.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.filtre === id)));
    let n = 0;
    familles.forEach((f) => {
      const voir = id === 'tout' || f.dataset.famille === id;
      f.classList.toggle('est-cachee', !voir);
      if (voir) { n += $$('tbody tr', f).length; gsap.fromTo(f, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: 'power2.out', clearProps: 'opacity' }); }
    });
    compte.textContent = compte.dataset.modele.replace('{n}', n);
    if (pousser && ST) ST.refresh();
    if (pousser) { const u = new URL(location.href); if (id === 'tout') u.searchParams.delete('famille'); else u.searchParams.set('famille', id); history.replaceState(history.state, '', u); }
  };
  boutons.forEach((b) => b.addEventListener('click', () => appliquer(b.dataset.filtre, true)));
  appliquer(new URLSearchParams(location.search).get('famille') || 'tout', false);
}
function estimateur() {
  const form = $('[data-estimer]'); if (!form) return;
  const lignes = $('[data-ticket-lignes]'), total = $('[data-ticket-total]'), lien = $('[data-ticket-lien]'), ticket = $('[data-ticket]');
  const calculer = (anime) => {
    const f = $('input[name="formule"]:checked', form);
    const prix = +f.dataset.prix, depl = f.dataset.deplacement === '1';
    let min = prix, max = prix;
    const ls = [[f.closest('label').querySelector('span').textContent, euros(prix)]];
    if (depl) { min += 5; max += 25; ls.push([lignes.dataset.deplacement, '5 à 25 €']); }
    $$('input[name="option"]:checked', form).forEach((o) => { min += +o.dataset.min; max += +o.dataset.max; ls.push([o.dataset.nom, fourchette(+o.dataset.min, +o.dataset.max)]); });
    lignes.innerHTML = ls.map(([a, b]) => `<li><span>${a}</span><b>${b.replace(/ /g, ' ')}</b></li>`).join('');
    total.textContent = fourchette(min, max).replace(/ (€|à)/g, ' $1');
    lien.href = lien.href.split('?')[0] + '?lieu=' + (f.value.startsWith('atelier') ? 'atelier' : 'domicile');
    if (anime) gsap.fromTo(ticket, { scale: 0.985 }, { scale: 1, duration: 0.4, ease: 'back.out(3)' });
  };
  form.addEventListener('change', () => calculer(true));
  calculer(false);
}

/* ---------- Ouvertures des pages intérieures ---------- */
function prixGeant(delai = 0) {
  const p = $('.rouleau-piste'); if (!p) return;
  gsap.fromTo(p, { y: '-3em' }, { y: 0, duration: 1.1, ease: 'power3.inOut', delay: delai });
}
function balayage(delai = 0) {
  const b = $('.pros-balayage'); if (!b) return;
  const w = () => document.documentElement.clientWidth;
  const tl = gsap.timeline({ repeat: -1, repeatDelay: 5, delay: delai });
  tl.fromTo(b, { x: 0, opacity: 0 }, { x: () => w() * 0.55, opacity: 1, duration: 0.9, ease: 'power1.in' })
    .to(b, { x: () => w(), opacity: 0, duration: 0.9, ease: 'power1.out' });
  ST.create({ trigger: '.pros-tete', start: 'top bottom', end: 'bottom top', onToggle: (e) => (e.isActive ? tl.play() : tl.pause()) });
  document.addEventListener('visibilitychange', () => (document.hidden ? tl.pause() : tl.play()));
  gsap.to($('.pros-tete-media img'), { scale: 1.08, ease: 'none', scrollTrigger: { trigger: '.pros-tete', start: 'top top', end: 'bottom top', scrub: 0.4 } });
}
function frise(delai = 0) {
  const f = $('.frise'); if (!f) return;
  const etapes = $$('.frise-etape', f);
  gsap.fromTo($('.frise-trait path', f), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.2, ease: 'power2.inOut', delay: delai });
  etapes.forEach((e, i) => gsap.delayedCall(delai + 0.15 + i * 0.22, () => e.classList.add('est-allumee')));
  gsap.delayedCall(delai + 1.6, () => etapes.forEach((e, i) => e.classList.toggle('est-allumee', i === 0)));
}

/* ---------- Rendez-vous : jours, préremplissage, récapitulatif en direct ---------- */
async function rendezVous() {
  const racine = $('[data-rdv]'); if (!racine) return;
  const form = $('form', racine);
  /* Jours : les 14 prochains jours à l'heure de Paris ; dimanches et jours fériés grisés. */
  const jours = $('[data-jours]'), cache = $('input[name="jour"]', form);
  if (horaires && jours) {
    const a = horaires.adresses[0], n = maintenant(horaires.fuseau);
    const fmt = (iso, o) => new Intl.DateTimeFormat('fr-FR', { ...o, timeZone: 'UTC' }).format(new Date(iso + 'T12:00:00Z'));
    let html = '';
    for (let k = 0; k < 14; k++) {
      const iso = ajouter(n.iso, k), j = jour(a, iso), ferie = a.feries.some((f) => f.date === iso);
      const fini = k === 0 && j.creneaux.every((c) => c[1] <= n.min);
      const ferme = !j.creneaux.length || ferie || fini;
      html += `<button type="button" class="jour" data-iso="${iso}" aria-pressed="false"${ferme ? ' disabled' : ''}>${k === 0 ? 'Aujourd’hui' : fmt(iso, { weekday: 'short' })}<small>${fmt(iso, { day: 'numeric', month: 'short' })}</small></button>`;
    }
    jours.innerHTML = html;
    jours.addEventListener('click', (e) => {
      const b = e.target.closest('.jour'); if (!b || b.disabled) return;
      $$('.jour', jours).forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
      cache.value = fmt(b.dataset.iso, { weekday: 'long', day: 'numeric', month: 'long' });
      cache.dispatchEvent(new Event('change', { bubbles: true }));
    });
  }
  /* Préremplissage depuis l'adresse (?lieu=domicile, atelier, distance ou pro). */
  const lieu = new URLSearchParams(location.search).get('lieu');
  const radio = lieu && $(`input[name="lieu"][value="${CSS.escape(lieu)}"]`, form); if (radio) radio.checked = true;
  const communeUrl = new URLSearchParams(location.search).get('commune'); if (communeUrl) $('#rdv-commune').value = communeUrl.slice(0, 60);
  /* Commune : distance réelle. */
  let communes = {};
  try { communes = JSON.parse($('[data-communes]').textContent); } catch {}
  const index = Object.fromEntries(Object.keys(communes).map((n) => [sansAccent(n), n]));
  const aide = $('[data-commune-aide]'), texteAide = aide?.textContent;
  const communeLue = () => { const v = $('#rdv-commune').value.trim(), nom = index[sansAccent(v)]; return { v, nom, km: nom ? communes[nom][0] : null }; };
  /* Récapitulatif en direct et estimation. */
  const liste = $('[data-recap-liste]'), est = $('[data-recap-estimation]'), vide = liste.innerHTML, frisees = $$('.frise-etape');
  const lire = (nom) => $$(`[name="${nom}"]:checked`, form).map((i) => i.closest('label').querySelector('.fpe__carte-titre, span')?.textContent.trim());
  const maj = () => {
    const l = lire('lieu')[0], app = lire('appareil')[0], soucis = lire('souci'), moment = lire('moment')[0], c = communeLue();
    const items = [['Où', l], ['Appareil', app], ['Souci', soucis.join(', ')], ['Quand', [cache.value, moment].filter(Boolean).join(', ')], ['Commune', c.nom ? `${c.nom} (${String(c.km).replace('.', ',')} km de Molsheim)` : c.v]].filter(([, v]) => v);
    liste.innerHTML = items.length ? items.map(([k, v]) => `<div><dt>${k}</dt><dd>${v.replace(/[<>&]/g, '')}</dd></div>`).join('') : vide;
    const valeur = $('input[name="lieu"]:checked', form)?.value;
    let e = valeur === 'domicile' ? [35, 75] : valeur === 'atelier' ? [40, 40] : null;
    if (e && soucis.includes('Mes fichiers ont disparu')) e = [e[0] + 100, e[1] + 150];
    est.hidden = !valeur || valeur === 'distance';
    if (!est.hidden) $('strong', est).textContent = valeur === 'pro' ? 'Sur devis' : (e[0] === e[1] ? `dès ${e[0]} €` : `${e[0]} à ${e[1]} €`).replace(/ (€|à)/g, ' $1');
    if (aide) {
      if (c.nom) { aide.textContent = `${c.nom} : ${String(c.km).replace('.', ',')} km de Molsheim, dans la zone.`; aide.classList.add('est-dedans'); }
      else if (c.v) { aide.textContent = `Hors des 30 km autour de Molsheim : l'atelier ou le dépannage à distance restent possibles.`; aide.classList.remove('est-dedans'); }
      else { aide.textContent = texteAide; aide.classList.remove('est-dedans'); }
    }
  };
  form.addEventListener('change', maj); form.addEventListener('input', maj);
  const api = await initFormulaire(racine, { sujet: 'Demande de rendez-vous' });
  maj();
  /* La frise de l'ouverture suit l'étape du formulaire. */
  const etapes = $$('fieldset[data-etape]', form);
  new MutationObserver(() => { const n = etapes.findIndex((f) => !f.hidden); frisees.forEach((f, i) => f.classList.toggle('est-allumee', i <= n)); }).observe(form, { subtree: true, attributes: true, attributeFilter: ['hidden'] });
  racine.addEventListener('formulaire:envoye', () => { const fin = $('.fpe__fin', racine); setTimeout(() => { fin?.scrollIntoView({ block: 'center' }); fin?.focus({ preventScroll: true }); }, 60); });
  return api;
}

/* ---------- Démarrage ---------- */
const accueil = () => !!$('.hero');
function arriveeAccueil(t0 = 0) {
  if (!accueil()) return;
  gsap.fromTo('.hero-ligne', { y: 0, yPercent: 135 }, { y: 0, yPercent: 0, duration: 0.85, stagger: 0.12, ease: 'power3.out', delay: t0 });
  gsap.fromTo('.hero-surtitre, .hero-intro, .hero-actions, .hero-bas', { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power3.out', delay: t0 + 0.12 });
  gsap.fromTo('.pastille-texte', { rotation: -90 }, { rotation: 0, duration: 1.2, ease: 'power3.out', delay: t0 });
}
function ouverturesInterieures(t0 = 0) { prixGeant(t0); balayage(t0); frise(t0); }

demarrer({
  preparer() {
    if (!gsap || !ST) return;
    pastille(); coches(); anneaux(); zones(); filtres(); estimateur();
    rendezVous();
  },
  /* Intro (2,3 s) : le bouton marche/arrêt se trace, le voyant s'allume, la barre se remplit, puis le bouton glisse
     jusqu'à l'objet d'ouverture de la page (pastille, prix, portrait, frise) et le panneau s'ouvre en cercle depuis lui. */
  jouer() {
    if (!gsap) return null;
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.fromTo('.om-anneau', { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.55, ease: 'power2.inOut' }, 0.05)
      .fromTo('.om-trait', { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.35, ease: 'power2.out' }, 0.3)
      .fromTo('.om-led', { opacity: 0, scale: 0.4, transformOrigin: '50% 50%' }, { opacity: 1, scale: 1, duration: 0.3, ease: 'back.out(3)' }, 0.62)
      .fromTo('.om-anneau, .om-trait', { stroke: '#eef2f0' }, { stroke: '#16c172', duration: 0.3 }, 0.66)
      .fromTo('.ouverture-trait', { scaleX: 0 }, { scaleX: 1, duration: 0.5, ease: 'power2.inOut' }, 0.45)
      .to('.ouverture-nom, .ouverture-ligne, .ouverture-trait', { opacity: 0, duration: 0.25 }, 0.95);
    versObjet(tl, { a: 1.0 });
    tl.call(() => { arriveeAccueil(0); ouverturesInterieures(0.1); }, null, 1.45);
    return tl;
  },
  etatFinal() {
    if (!gsap) return;
    gsap.set('.hero-ligne', { yPercent: 0, y: 0 });
    gsap.set('.hero-surtitre, .hero-intro, .hero-actions, .hero-bas', { opacity: 1, y: 0 });
    gsap.set('.rouleau-piste', { y: 0 });
    gsap.set('[data-coche]', { opacity: 1 });
    gsap.set('[data-coche] .coche circle, [data-coche] .coche path, .frise-trait path', { strokeDashoffset: 0 });
    $$('.appel-anneau').forEach((a) => { gsap.set($$('.anneau-arc, .anneau-trait', a), { strokeDashoffset: 0 }); a.classList.add('est-allume'); });
    $$('.frise-etape').forEach((e, i) => e.classList.toggle('est-allumee', i === 0));
  },
  arrivee() { if (!gsap) return; arriveeAccueil(0.1); ouverturesInterieures(0.15); },
});
quand('pret', () => { if (window.ScrollTrigger) window.ScrollTrigger.refresh(); });
