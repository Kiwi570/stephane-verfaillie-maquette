/* À propos : grand nom centré qui arrive lettre à lettre, portrait rond (objet d'ouverture), puis la photo de
   l'atelier qui s'ouvre en plein écran ; parcours, zone réelle, avis, appel. */
import { html } from '../../outils/gabarit.mjs';
import { icone } from '../gabarits/icones.mjs';
import { surtitre, statut, zone, avis, appel } from '../gabarits/composants.mjs';

export const page = { cle: 'a-propos', fichier: 'a-propos', imagePartage: 'grok/apropos-atelier-1280.webp' };

export default (c) => {
  const T = (k, v) => c.t(`apropos.${k}`, v);
  return html`
<section class="apropos-tete" id="debut">
  <div class="conteneur apropos-tete-contenu">
    ${c.media({ nom: 'stephane', alt: T('portraitAlt'), priorite: true, classe: 'portrait apropos-portrait', sizes: '160px', attrs: 'data-iris-centre="disque"' })}
    <p class="surtitre"><span class="voyant" aria-hidden="true"></span>${T('surtitre')}</p>
    <h1 data-anime="lettres">${T('titre')}</h1>
    <p class="apropos-intro" data-anime>${T('texte')}</p>
    <p class="apropos-actions" data-anime>
      ${c.lien('rendez-vous', { classe: 'bouton', texte: T('rdv'), attrs: 'data-action-principale data-survol="magnetique"' })}
      <span class="etiquette" data-info-cle>${T('info')}</span>
    </p>
  </div>
</section>

<section class="atelier-ecran" id="atelier" data-fx="plein-ecran" data-entete-cache>
  <div data-collant>
    ${c.media({ nom: 'grok/apropos-atelier', alt: T('atelierAlt'), classe: 'atelier-media', sizes: '100vw', attrs: 'data-fx-cible' })}
    <p class="atelier-mots" aria-hidden="true"><span data-fx-ecarte="g">${T('atelierMot1')}</span> <span data-fx-ecarte="d">${T('atelierMot2')}</span></p>
    <h2 class="visuellement-cache">${T('atelierMot1')} ${T('atelierMot2')}</h2>
    <p class="atelier-legende" data-fx-apres>${T('atelierLegende')}</p>
  </div>
</section>

<section class="parcours section" id="parcours">
  <div class="conteneur parcours-grille">
    <div>
      <h2 data-anime="lignes">${T('parcoursTitre')}</h2>
      <blockquote class="citation citation--grande" data-anime="mots"><p>${T('citation')}</p></blockquote>
      <ul class="faits" data-anime="cascade">
        ${[['f1', 'livre'], ['f2', 'equipe'], ['f3', 'maison'], ['f4', 'fenetre']].map(([k, ic]) => html`<li>${icone(ic, { trace: false })}<div><h3>${T(k)}</h3><p>${T(k + 't')}</p></div></li>`)}
      </ul>
    </div>
    ${c.media({ nom: 'grok/rdv-mallette', alt: c.s('rdv.mallettealt'), classe: 'parcours-media', sizes: '(max-width: 760px) 92vw, 40vw', attrs: 'data-fx="parallaxe"' })}
  </div>
</section>

${zone(c, { id: 'zone' })}

${avis(c)}

${appel(c)}
`;
};
