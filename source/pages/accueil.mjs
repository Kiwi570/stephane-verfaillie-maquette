/* Accueil : « Ça repart ». Ouverture scindée (titre, grande photo verticale, pastille « dès 30 € » sur laquelle
   finit l'intro), puis les trois façons, la liste « prestations comprises », les pannes, Stéphane, la zone réelle
   des 30 km, les pros, les formations et le web, les avis et l'appel final. */
import { html } from '../../outils/gabarit.mjs';
import { icone, coche, marche } from '../gabarits/icones.mjs';
import { surtitre, statut, zone, avis, appel } from '../gabarits/composants.mjs';

export const page = { cle: 'accueil', fichier: 'index', imagePartage: 'grok/accueil-ouverture-784.webp' };

export default (c) => {
  const T = (k, v) => c.t(`accueil.${k}`, v);
  const tarifs = c.donnees.tarifs;
  return html`
<section class="hero" id="debut">
  <div class="hero-texte">
    <p class="surtitre hero-surtitre masque-ecran-tres-bas" data-anime="gsap"><span class="voyant" aria-hidden="true"></span>${T('hero.surtitre')}</p>
    <h1 class="hero-titre"><span class="ligne-masque"><span class="hero-ligne">${T('hero.titre1')}</span></span><span class="ligne-masque"><span class="hero-ligne"><em>${T('hero.titre2')}</em></span></span></h1>
    <p class="hero-intro masque-ecran-tres-bas" data-anime="gsap">${T('hero.texte')}</p>
    <p class="hero-actions" data-anime="gsap">
      ${c.lien('rendez-vous', { classe: 'bouton', texte: T('hero.rdv'), attrs: 'data-action-principale data-survol="magnetique"' })}
      <a class="bouton bouton--contour" href="tel:${c.site.contact.telephoneLien}" aria-label="${c.s('accueil.hero.appelerAria')}">${icone('telephone', { trace: false, classe: 'icone icone--bouton' })}${T('hero.appeler')}</a>
    </p>
    <ul class="hero-faits masque-ecran-bas" data-anime="gsap">${[['fait1', 'livre'], ['fait2', 'maison'], ['fait3', 'equipe']].map(([k, ic]) => html`<li>${icone(ic, { trace: false, classe: 'icone hero-fait-icone' })}${T(`hero.${k}`)}</li>`)}</ul>
    <div class="hero-bas" data-anime="gsap">
      ${statut(c, { info: true })}
      <div class="pastille" data-iris-centre="disque">
        <svg class="pastille-texte" viewBox="0 0 200 200" aria-hidden="true" data-effet="badge"><defs><path id="pastille-cercle" d="M100 100 m-77 0 a77 77 0 1 1 154 0 a77 77 0 1 1 -154 0"/></defs><text><textPath href="#pastille-cercle" textLength="482" lengthAdjust="spacing">${c.s('commun.pastille')}</textPath></text></svg>
        ${marche('pastille-marche')}
        <span class="pastille-led" aria-hidden="true" data-boucle-css></span>
        <span class="visuellement-cache">${c.t('commun.pastilleAria')}</span>
      </div>
    </div>
  </div>
  ${c.media({ nom: 'grok/accueil-ouverture', alt: c.s('accueil.hero.alt'), cadrage: '50% 50%', priorite: true, classe: 'hero-photo', sizes: '(max-width: 760px) 92vw, 42vw', attrs: 'data-fx="parallaxe" data-fx-force="6" data-boucle-css' })}
</section>

<section class="facons section" id="facons">
  <div class="conteneur">
    <div class="section-tete">
      ${surtitre(T('facons.surtitre'))}
      <h2 data-anime="lignes">${T('facons.titre')}</h2>
      <p data-anime>${T('facons.texte')}</p>
    </div>
    <div class="facons-grille rangee-tel" data-anime="cascade" tabindex="0" role="region" aria-label="${c.s('accueil.facons.surtitre')}">
      ${[['domicile', ['domicileP1', 'domicileP2', 'domicileP3'], 'maison', 'lieu=domicile'], ['atelier', ['atelierP1', 'atelierP2'], 'atelier', 'lieu=atelier'], ['distance', ['distanceP1', 'distanceP2'], 'distance', 'lieu=distance']].map(([k, prix, ic, p]) => html`<article class="facon">
        ${c.media({ nom: `grok/facon-${k}`, alt: c.s(`accueil.facons.${k}Alt`), classe: 'facon-media', sizes: '(max-width: 760px) 92vw, 30vw', attrs: 'data-fx="zoom"' })}
        <div class="facon-corps">
          <span class="facon-icone">${icone(ic, { trace: false })}</span>
          <h3>${T(`facons.${k}Titre`)}</h3>
          <p>${T(`facons.${k}Texte`)}</p>
          <ul class="facon-prix">${prix.map((x, i) => html`<li${i === 0 ? html` data-prix` : ''}>${T(`facons.${x}`)}</li>`)}</ul>
          ${c.lien('rendez-vous', { params: p, classe: 'lien-fleche', texte: T('hero.rdv') })}
        </div>
      </article>`)}
    </div>
    <p class="section-pied" data-anime>${c.lien('services', { ancre: 'tarifs', classe: 'bouton bouton--contour', texte: T('facons.tous') })}</p>
  </div>
</section>

<section class="compris bande-nuit" id="compris">
  <div class="conteneur compris-grille">
    <div class="compris-texte">
      <p class="surtitre surtitre--clair"><span class="voyant" aria-hidden="true"></span>${T('compris.surtitre')}</p>
      <h2 data-anime="lignes">${T('compris.titre')}</h2>
      <p data-anime>${T('compris.texte')}</p>
      <ul class="compris-liste">${tarifs.inclus.map((x) => html`<li data-coche>${coche()}<span>${x}</span></li>`)}</ul>
      <p class="compris-plus" data-anime>${T('compris.plus')}</p>
    </div>
    <div class="compris-visuel">
      ${c.media({ nom: 'grok/compris-circuit', alt: T('compris.alt'), classe: 'compris-media', sizes: '(max-width: 760px) 92vw, 40vw', attrs: 'data-fx="parallaxe"' })}
      <p class="compris-nombre" data-superpose><strong data-compteur="${tarifs.inclus.length}">${tarifs.inclus.length}</strong><span>${T('compris.nombre')}</span></p>
    </div>
  </div>
</section>

<section class="pannes section" id="pannes">
  <div class="pannes-mots" data-fx="mots-geants" aria-hidden="true" data-ruban data-visuel data-audit-ignorer>
    <p data-fx-rangee>${T('pannes.mots1')} ${T('pannes.mots1')}</p>
    <p data-fx-rangee data-sens="-1">${T('pannes.mots2')} ${T('pannes.mots2')}</p>
  </div>
  <div class="conteneur">
    <div class="section-tete">
      <h2 data-anime="lignes">${T('pannes.titre')}</h2>
      <p data-anime>${T('pannes.texte')}</p>
    </div>
    <ul class="pannes-grille rangee-tel" data-anime="cascade" tabindex="0" aria-label="${c.s('accueil.pannes.titre')}">
      ${c.donnees.pannes.map((p) => html`<li class="panne">
        <span class="panne-icone">${icone(p.icone)}</span>
        <h3>${`« ${p.souci} »`}</h3>
        <p>${p.reponse}</p>
        ${p.prix ? html`<p class="panne-prix" data-prix>${p.prix}</p>` : ''}
      </li>`)}
    </ul>
    <p class="section-pied" data-anime>${c.lien('rendez-vous', { classe: 'bouton', texte: T('pannes.lien'), attrs: 'data-survol="magnetique"' })}</p>
  </div>
</section>

<section class="stephane section" id="stephane">
  <div class="conteneur stephane-grille">
    <div class="stephane-portrait">
      <svg class="stephane-anneau" viewBox="0 0 100 100" aria-hidden="true" data-fx="trace"><circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" stroke-width=".8" stroke-dasharray="1 2.2"/></svg>
      ${c.media({ nom: 'stephane', alt: c.s('apropos.portraitAlt'), classe: 'portrait', sizes: '(max-width: 760px) 70vw, 30vw', attrs: 'data-fx="zoom"' })}
    </div>
    <div>
      ${surtitre(T('stephane.surtitre'))}
      <h2 data-anime="lignes">${T('stephane.titre')}</h2>
      <p data-anime>${T('stephane.texte')}</p>
      <blockquote class="citation" data-anime="mots"><p>${T('stephane.citation')}</p></blockquote>
      <p data-anime>${c.lien('a-propos', { classe: 'lien-fleche', texte: T('stephane.lien') })}</p>
    </div>
  </div>
</section>

${zone(c)}

<section class="pros section fond-2" id="pros">
  <div class="conteneur pros-grille">
    ${c.media({ nom: 'grok/pros-reseau', alt: T('pros.alt'), classe: 'pros-media', sizes: '(max-width: 760px) 92vw, 45vw', attrs: 'data-anime="rideau"' })}
    <div>
      ${surtitre(T('pros.surtitre'))}
      <h2 data-anime="lignes">${T('pros.titre')}</h2>
      <p data-anime>${T('pros.texte')}</p>
      <ul class="liste-icones" data-anime="cascade">
        <li>${icone('reseau', { trace: false })}${c.t('pros.o1')}</li>
        <li>${icone('equipe', { trace: false })}${c.t('pros.o2')}</li>
        <li>${icone('fenetre', { trace: false })}${c.t('pros.o3')}</li>
        <li>${icone('ecran', { trace: false })}${c.t('pros.o4')}</li>
      </ul>
      <p data-anime>${c.lien('professionnels', { classe: 'bouton bouton--nuit', texte: T('pros.lien') })}</p>
    </div>
  </div>
  <div class="references">
    <p class="references-titre conteneur">${T('pros.references')}</p>
    <div class="ruban-section">
      <div class="ruban" id="ruban-refs" data-boucle-css data-ruban><p>${c.donnees.references.map((r) => html`<span>${r}</span>`)}<span aria-hidden="true" class="ruban-double">${c.donnees.references.map((r) => html`<span>${r}</span>`)}</span></p></div>
      <button type="button" class="ruban-pause" data-pause-pour="ruban-refs" data-libelle-pause="${c.s('commun.pause')}" data-libelle-lecture="${c.s('commun.lecture')}"><span data-libelle-bouton>${c.t('commun.pause')}</span></button>
    </div>
  </div>
</section>

<section class="apprendre section" id="apprendre">
  <div class="conteneur apprendre-grille">
    <div>
      ${surtitre(T('apprendre.surtitre'))}
      <h2 data-anime="lignes">${T('apprendre.titre')}</h2>
      <p data-anime>${T('apprendre.texte')}</p>
      <p data-anime>${c.lien('services', { ancre: 'tarifs', params: 'famille=formations', classe: 'lien-fleche', texte: T('facons.tous') })}</p>
    </div>
    <div class="duo" data-anime="cascade" data-visuel>
      <div class="duo-carte"><span class="duo-icone">${icone('livre')}</span><h3>${T('apprendre.formTitre')}</h3><p>${T('apprendre.formTexte')}</p><p class="duo-prix" data-prix>${T('apprendre.formPrix')}</p></div>
      <div class="duo-carte"><span class="duo-icone">${icone('fenetre')}</span><h3>${T('apprendre.webTitre')}</h3><p>${T('apprendre.webTexte')}</p><p class="duo-prix" data-prix>${T('apprendre.webPrix')}</p></div>
    </div>
  </div>
</section>

${avis(c)}

${appel(c)}
`;
};
