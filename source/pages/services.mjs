/* Services et tarifs : ouverture « grand prix » (30 € géant dont les chiffres défilent) puis bandeau photo à plat ;
   tous les tarifs filtrables (filtre gardé dans l'adresse), estimateur à partir des vrais tarifs, prestations
   comprises, questions pratiques, appel final. */
import { html } from '../../outils/gabarit.mjs';
import { icone, coche } from '../gabarits/icones.mjs';
import { surtitre, statut, appel } from '../gabarits/composants.mjs';

export const page = { cle: 'services', fichier: 'services', imagePartage: 'grok/services-bandeau-1280.webp' };

export default (c) => {
  const T = (k, v) => c.t(`services.${k}`, v);
  const t = c.donnees.tarifs;
  return html`
<section class="tarifs-tete" id="debut">
  <div class="conteneur tarifs-tete-grille">
    <div>
      ${surtitre(T('surtitre'))}
      <h1 data-anime="lignes">${T('titre')}</h1>
      <p class="masque-ecran-bas" data-anime>${T('texte')}</p>
      <p class="tarifs-tete-actions" data-anime>
        ${c.lien('rendez-vous', { classe: 'bouton', texte: T('rdv'), attrs: 'data-action-principale data-survol="magnetique"' })}
        <span class="etiquette" data-info-cle>${c.t('commun.deplacement')}</span>
      </p>
    </div>
    <p class="prix-geant" data-iris-centre><span class="visuellement-cache">${T('prixAria')}</span><span class="prix-geant-chiffres" aria-hidden="true"><span class="rouleau" data-audit-ignorer><span class="rouleau-piste" data-effet="prix-geant"><span>3</span><span>2</span><span>1</span><span>0</span></span></span><span>0</span><span class="prix-geant-euro">€</span></span><span class="prix-geant-unite" aria-hidden="true">${T('unite')}</span></p>
  </div>
  ${c.media({ nom: 'grok/services-bandeau', alt: T('bandeauAlt'), priorite: true, classe: 'tarifs-bandeau', sizes: '100vw', attrs: 'data-fx="parallaxe" data-fx-force="8"' })}
</section>

<section class="tarifs section" id="tarifs">
  <div class="conteneur">
    <div class="section-tete">
      <h2 data-anime="lignes">${T('tarifsTitre')}</h2>
    </div>
    <div class="filtres" role="group" aria-label="${c.s('services.filtres')}" data-filtres data-anime>
      <button type="button" class="filtre" aria-pressed="true" data-filtre="tout">${T('filtreTout')}</button>
      ${t.familles.map((f) => html`<button type="button" class="filtre" aria-pressed="false" data-filtre="${f.id}">${f.nom}</button>`)}
    </div>
    <p class="filtres-compte" data-filtres-compte aria-live="polite" data-modele="${c.s('services.nbLignes')}"></p>
    <div class="familles" data-familles>
      ${t.familles.map((f) => html`<article class="famille" data-famille="${f.id}" id="famille-${f.id}">
        <header class="famille-tete">${icone(f.icone)}<h3>${f.nom}</h3></header>
        <table class="table-tarifs"><caption class="visuellement-cache">${f.nom}</caption>
          <tbody>${f.lignes.map((l) => html`<tr><th scope="row">${l.nom}</th><td data-prix class="${/€/.test(l.prix) ? 'prix-chiffre' : l.prix === 'Inclus' ? 'prix-inclus' : 'prix-devis'}">${l.prix}</td></tr>`)}</tbody>
        </table>
      </article>`)}
    </div>
  </div>
</section>

<section class="estimer section fond-2" id="estimer">
  <div class="conteneur estimer-grille">
    <div>
      ${surtitre(T('estimerSurtitre'))}
      <h2 data-anime="lignes">${T('estimerTitre')}</h2>
      <p data-anime>${T('estimerTexte')}</p>
      <form class="estimer-form" data-estimer action="#" novalidate data-anime>
        <fieldset><legend>${T('formule')}</legend>
          ${t.formules.map((f, i) => html`<label class="choix"><input type="radio" name="formule" value="${f.id}" data-prix="${f.prix}" data-deplacement="${f.deplacement ? 1 : 0}"${i === 1 ? html` checked` : ''}><span>${f.nom}</span><strong>${f.prix} €</strong></label>`)}
        </fieldset>
        <fieldset><legend>${T('optionsTitre')}</legend>
          ${t.options.map((o) => html`<label class="choix"><input type="checkbox" name="option" value="${o.id}" data-min="${o.min}" data-max="${o.max}" data-nom="${o.nom}"><span>${o.nom}${o.note ? html` <small>${o.note}</small>` : ''}</span><strong>${o.min === o.max ? `${o.min} €` : `${o.min} à ${o.max} €`}</strong></label>`)}
        </fieldset>
      </form>
    </div>
    <aside class="ticket" data-ticket data-effet="ticket" aria-live="polite">
      <p class="ticket-titre">${T('total')}</p>
      <ul class="ticket-lignes" data-ticket-lignes data-deplacement="${c.s('services.ligneDeplacement')}"></ul>
      <p class="ticket-total" data-prix><span data-ticket-total>55 à 75 €</span></p>
      <p class="ticket-note">${T('totalNote')}</p>
      <a class="bouton" href="${c.url('rendez-vous', '', 'lieu=domicile')}" data-libelle="${c.libelle('rendez-vous')}" data-ticket-lien>${T('reserver')}</a>
    </aside>
  </div>
</section>

<section class="inclus section bande-nuit" id="inclus">
  <div class="conteneur">
    <div class="section-tete">
      <p class="surtitre surtitre--clair"><span class="voyant" aria-hidden="true"></span>${T('inclusSurtitre')}</p>
      <h2 data-anime="lignes">${T('inclusTitre')}</h2>
    </div>
    <ul class="compris-liste compris-liste--grille">${t.inclus.map((x) => html`<li data-coche>${coche()}<span>${x}</span></li>`)}</ul>
  </div>
</section>

<section class="questions section" id="questions">
  <div class="conteneur questions-grille">
    <div>
      <h2 data-anime="lignes">${T('questionsTitre')}</h2>
      <div class="faq">${[1, 2, 3, 4, 5, 6].map((i) => html`<details class="faq-item" data-anime><summary>${T('q' + i)}</summary><p>${T('r' + i)}</p></details>`)}</div>
    </div>
    ${c.media({ nom: 'grok/facon-atelier', alt: T('questionsAlt'), classe: 'questions-media', sizes: '(max-width: 760px) 92vw, 35vw', attrs: 'data-fx="parallaxe"' })}
  </div>
</section>

${appel(c)}
`;
};
