/* Professionnels : ouverture plein cadre (photo de bureau traversée par une ligne de balayage), offres sur devis,
   références réelles, déroulé en trois temps qui se trace, formations, appel « devis ». */
import { html } from '../../outils/gabarit.mjs';
import { icone, marche } from '../gabarits/icones.mjs';
import { surtitre, appel } from '../gabarits/composants.mjs';

export const page = { cle: 'professionnels', fichier: 'professionnels', imagePartage: 'grok/pros-ouverture-1280.webp' };

export default (c) => {
  const T = (k, v) => c.t(`pros.${k}`, v);
  return html`
<section class="pros-tete" id="debut">
  ${c.media({ nom: 'grok/pros-ouverture', alt: T('alt'), priorite: true, classe: 'pros-tete-media', sizes: '100vw', cadrage: '60% 50%' })}
  <div class="pros-balayage" data-effet="balayage" aria-hidden="true"></div>
  <div class="conteneur pros-tete-contenu">
    <p class="surtitre surtitre--clair"><span class="voyant" aria-hidden="true"></span>${T('surtitre')}</p>
    <h1 data-anime="lignes">${T('titre')}</h1>
    <p class="masque-ecran-tres-bas" data-anime>${T('texte')}</p>
    <p class="pros-tete-actions" data-anime>
      ${c.lien('rendez-vous', { params: 'lieu=pro', classe: 'bouton', texte: T('devis'), attrs: 'data-action-principale data-survol="magnetique"' })}
      <span class="etiquette etiquette--clair" data-info-cle>${c.t('commun.zone')}</span>
    </p>
  </div>
  <div class="pros-badge" data-iris-centre="disque">${marche('pros-badge-marche')}<span>${T('badge')}</span></div>
</section>

<section class="offres section" id="offres">
  <div class="conteneur">
    <div class="section-tete"><h2 data-anime="lignes">${T('offresTitre')}</h2></div>
    <div class="offres-grille" data-anime="cascade">
      ${[['o1', 'reseau'], ['o2', 'equipe'], ['o3', 'fenetre'], ['o4', 'ecran']].map(([k, ic]) => html`<article class="offre">
        <span class="offre-icone">${icone(ic)}</span>
        <h3>${T(k)}</h3>
        <p>${T(k + 't')}</p>
        <p class="offre-prix" data-prix>${T('surDevis')}</p>
      </article>`)}
    </div>
  </div>
</section>

<section class="refs section fond-2" id="references">
  <div class="conteneur refs-grille">
    <div>
      <h2 data-anime="lignes">${T('refsTitre')}</h2>
      <p data-anime>${T('refsTexte')}</p>
      <ol class="refs-liste" data-anime="cascade">${c.donnees.references.map((r) => html`<li>${r}</li>`)}</ol>
    </div>
    ${c.media({ nom: 'grok/pros-reseau', alt: T('refsAlt'), classe: 'refs-media', sizes: '(max-width: 760px) 92vw, 42vw', attrs: 'data-anime="rideau"' })}
  </div>
</section>

<section class="deroule section" id="deroule">
  <div class="conteneur">
    <div class="section-tete"><h2 data-anime="lignes">${T('derouleTitre')}</h2></div>
    <div class="deroule-piste">
      <svg class="deroule-trait" viewBox="0 0 1000 20" preserveAspectRatio="none" aria-hidden="true" data-fx="trace" data-visuel><path d="M10 10 H990" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="6 8"/></svg>
      <ol class="deroule-etapes" data-anime="cascade">
        ${[['e1', 'telephone'], ['e2', 'devis'], ['e3', 'cle']].map(([k, ic], i) => html`<li><span class="deroule-num">${icone(ic, { trace: false })}<b>${i + 1}</b></span><h3>${T(k)}</h3><p>${T(k + 't')}</p></li>`)}
      </ol>
    </div>
    <aside class="encart" data-anime>${icone('livre', { trace: false })}<div><h3>${T('formTitre')}</h3><p>${T('formTexte')}</p></div>${c.lien('services', { ancre: 'tarifs', params: 'famille=formations', classe: 'lien-fleche', texte: c.t('accueil.facons.tous') })}</aside>
  </div>
</section>

${appel(c, { image: 'grok/compris-circuit', alt: T('appelAlt'), titre: T('appelTitre'), texte: T('appelTexte'), params: 'lieu=pro', bouton: T('devis') })}
`;
};
