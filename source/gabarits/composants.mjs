/* Composants du site, communs à plusieurs pages : même style partout (carte de la zone, avis, appel final). */
import { html, brut } from '../../outils/gabarit.mjs';
import { icone, marche } from './icones.mjs';

export const surtitre = (texte) => html`<p class="surtitre"><span class="voyant" aria-hidden="true"></span>${texte}</p>`;

/* Statut « joignable maintenant » : texte de secours (horaires) écrit dans la page, remplacé par site.js à l'heure de Paris. */
export const statut = (c, { classe = '', info = false, effet = '' } = {}) => html`<p class="statut ${classe}" data-statut${info ? brut(' data-info-cle') : ''}><span class="voyant voyant--vit"${effet ? brut(` data-effet="${effet}"`) : ''} aria-hidden="true"></span><span data-statut-texte>${c.t('commun.horairesCourts')}</span></p>`;

const VILLES = ['Strasbourg', 'Obernai', 'Saverne', 'Schirmeck', 'Wasselonne', 'Barr', 'Erstein'];

export function zone(c, { id = 'zone' } = {}) {
  const z = c.donnees.communes;
  const villes = z.communes.filter((x) => VILLES.includes(x.nom));
  const donnees = JSON.stringify(Object.fromEntries(z.communes.map((x) => [x.nom, [x.km, x.x, x.y]]))).replace(/</g, '\\u003c');
  const km = String(z.atelier.km).replace('.', ',');
  return html`<section class="zone section" id="${id}">
  <div class="conteneur zone-grille">
    <div class="zone-texte">
      ${surtitre(c.t('accueil.zone.surtitre'))}
      <h2 data-anime="lignes">${c.t('accueil.zone.titre', { n: z.nombre })}</h2>
      <p data-anime>${c.t('accueil.zone.texte', { km })}</p>
      <form class="zone-form" data-zone-form action="#" novalidate data-anime>
        <label for="${id}-commune">${c.t('accueil.zone.label')}</label>
        <div class="zone-champ">
          <input id="${id}-commune" name="commune" list="${id}-liste" autocomplete="off" placeholder="${c.s('accueil.zone.placeholder')}">
          <button class="bouton" type="submit">${c.t('accueil.zone.verifier')}</button>
        </div>
        <datalist id="${id}-liste">${z.communes.map((x) => html`<option value="${x.nom}"></option>`)}</datalist>
        <p class="zone-resultat" data-zone-resultat aria-live="polite" data-dedans="${c.s('accueil.zone.dedans')}" data-dehors="${c.s('accueil.zone.dehors')}"></p>
        <a class="lien-fleche zone-lien" data-zone-lien hidden href="${c.url('rendez-vous', '', 'lieu=domicile')}" data-modele="${c.s('accueil.zone.rdv')}" data-libelle="${c.libelle('rendez-vous')}">${c.t('accueil.zone.rdv', { commune: '' })}</a>
        <p class="zone-aide">${c.t('accueil.zone.aide')}</p>
      </form>
    </div>
    <figure class="zone-carte" data-visuel>
      <img src="/assets/images/zone-carte.svg" alt="${c.s('accueil.zone.carteAlt')}" width="720" height="720" loading="lazy" decoding="async">
      <svg class="zone-calque" viewBox="-360 -360 720 720" aria-hidden="true">
        <circle class="zone-cercle" r="300" pathLength="1" data-effet="zone"/>
        <g class="zone-villes">${villes.map((v) => html`<g transform="translate(${v.x} ${v.y})"><circle r="4"/><text x="9" y="5">${v.nom}</text></g>`)}</g>
        <g class="zone-choix" data-zone-choix><line x1="0" y1="0" x2="0" y2="0"/><circle r="9"/></g>
        <g class="zone-atelier" transform="translate(${z.atelier.x} ${z.atelier.y})"><circle r="11"/><text x="-16" y="5" text-anchor="end">${c.t('accueil.zone.atelier')}</text></g>
        <g class="zone-molsheim"><circle r="8"/><text x="13" y="-10">Molsheim</text></g>
      </svg>
      <figcaption class="zone-source">${c.t('accueil.zone.source')}</figcaption>
    </figure>
  </div>
  <script type="application/json" data-communes>${brut(donnees)}</script>
</section>`;
}

export function avis(c) {
  return html`<section class="avis section" id="avis">
  <div class="conteneur">
    <div class="avis-tete">
      <svg class="avis-guillemet" viewBox="0 0 80 60" aria-hidden="true" data-fx="trace" data-visuel><path d="M30 8C16 12 8 22 8 36c0 9 5 15 12 15 6 0 11-5 11-11s-4-10-10-10c-2 0-3 0-4 1 2-8 7-13 15-16M70 8C56 12 48 22 48 36c0 9 5 15 12 15 6 0 11-5 11-11s-4-10-10-10c-2 0-3 0-4 1 2-8 7-13 15-16" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>
      <h2 data-anime="lignes">${c.t('accueil.avis.titre')}</h2>
    </div>
    <div class="avis-grille rangee-tel" data-anime="cascade" tabindex="0" role="region" aria-label="${c.s('accueil.avis.titre')}">
      ${c.donnees.avis.map((a, i) => html`<figure class="avis-carte${i === 0 ? ' avis-carte--grande' : ''}">
        ${a.texte ? html`<blockquote><p>${a.texte}</p></blockquote>` : ''}
        ${a.aspects.length ? html`<ul class="avis-aspects" aria-label="${c.s('accueil.avis.aspects')}">${a.aspects.map((x) => html`<li>${x}</li>`)}</ul>` : ''}
        <figcaption><span class="avis-initiale" aria-hidden="true">${a.nom[0]}</span>${a.nom}</figcaption>
      </figure>`)}
    </div>
    <p class="avis-source">${c.t('commun.sourceAvis')}</p>
  </div>
</section>`;
}

/* Appel final : bande bleu nuit. Sans image, un grand bouton marche/arrêt se trace et s'allume en vert quand on
   arrive dessus (effet « anneau ») ; avec image (page pros), la photo occupe la droite sous un dégradé. */
export function appel(c, { image = null, alt = '', titre = c.t('commun.appelTitre'), texte = c.t('commun.appelTexte'), params = '', bouton = c.t('commun.appelRdv') } = {}) {
  return html`<section class="appel${image ? ' appel--photo' : ''}" id="appel">
  ${image ? c.media({ nom: image, alt, classe: 'appel-media', sizes: '(max-width: 760px) 100vw, 60vw', attrs: 'data-fx="zoom"' }) : ''}
  <div class="conteneur appel-grille">
    <div class="appel-contenu">
      ${image ? marche('appel-marche') : ''}
      <h2 data-anime="lignes">${titre}</h2>
      <p data-anime>${texte}</p>
      <p class="appel-actions" data-anime>
        ${c.lien('rendez-vous', { params, classe: 'bouton', texte: bouton, attrs: 'data-survol="magnetique"' })}
        <a class="bouton bouton--contour-clair" href="tel:${c.site.contact.telephoneLien}" aria-label="${c.s('commun.appeler')} ${c.site.contact.telephone}">${icone('telephone', { trace: false, classe: 'icone icone--bouton' })}${c.site.contact.telephone}</a>
      </p>
    </div>
    ${image ? '' : html`<div class="appel-anneau" data-visuel aria-hidden="true">
      <svg class="anneau" viewBox="0 0 240 240"><circle class="anneau-fond" cx="120" cy="120" r="104"/><path class="anneau-arc" d="M80.6 66.3 A64 64 0 1 0 159.4 66.3" pathLength="1" data-effet="anneau"/><path class="anneau-trait" d="M120 42 V114" pathLength="1"/><circle class="anneau-led" cx="120" cy="206" r="5"/></svg>
    </div>`}
  </div>
</section>`;
}
