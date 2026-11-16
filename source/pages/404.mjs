/* 404 : un câble débranché. */
import { html } from '../../outils/gabarit.mjs';
import { marche } from '../gabarits/icones.mjs';

export const page = { cle: '404', fichier: '404', langues: ['fr'], partage: false };

export default (c) => html`
<section class="introuvable" id="debut">
  ${c.media({ nom: 'grok/page-404', alt: c.s('introuvable.alt'), priorite: true, classe: 'introuvable-media', sizes: '100vw', attrs: 'data-fx="parallaxe"' })}
  <div class="conteneur introuvable-contenu">
    <span class="introuvable-marche" data-iris-centre="disque">${marche('marche')}</span>
    <h1 data-anime="lignes">${c.t('introuvable.titre')}</h1>
    <p class="masque-ecran-bas" data-anime>${c.t('introuvable.texte')}</p>
    <p class="introuvable-actions" data-anime>${c.lien('accueil', { classe: 'bouton', texte: c.t('introuvable.retour'), attrs: 'data-action-principale' })} ${c.lien('rendez-vous', { classe: 'bouton bouton--contour-clair', texte: c.t('introuvable.rdv') })}</p>
  </div>
</section>
`;
