/* Rendez-vous : frise des cinq étapes qui se trace (objet d'ouverture : la première étape), formulaire en étapes
   (module formulaire-par-etapes de la bibliothèque) avec récapitulatif et estimation, coordonnées et horaires. */
import { html } from '../../outils/gabarit.mjs';
import { icone } from '../gabarits/icones.mjs';
import { surtitre, statut } from '../gabarits/composants.mjs';

export const page = { cle: 'rendez-vous', fichier: 'rendez-vous', imagePartage: 'grok/rdv-mallette-800.webp' };

const carte = (nom, valeur, titre, texte, ic, requis = false) => html`<label class="fpe__carte"><input type="radio" name="${nom}" value="${valeur}"${requis ? html` required` : ''}><span class="fpe__icone">${icone(ic, { trace: false })}</span><span class="fpe__carte-titre">${titre}</span>${texte ? html`<span class="fpe__carte-texte">${texte}</span>` : ''}</label>`;

export default (c) => {
  const T = (k, v) => c.t(`rdv.${k}`, v);
  const S = (k) => c.s(`rdv.${k}`);
  const etapes = ['e1', 'e2', 'e3', 'e4', 'e5'];
  return html`
<section class="rdv-tete" id="debut">
  <div class="conteneur rdv-tete-grille">
    <div>
      ${surtitre(T('surtitre'))}
      <h1 data-anime="lignes">${T('titre')}</h1>
      <p data-anime>${T('texte')}</p>
      <p class="rdv-tete-actions" data-anime>
        <a class="bouton" href="#formulaire" data-action-principale data-sans-transition>${T('commencer')}</a>
        <a class="bouton bouton--contour" href="tel:${c.site.contact.telephoneLien}" aria-label="${c.s('commun.appeler')} ${c.site.contact.telephone}">${icone('telephone', { trace: false, classe: 'icone icone--bouton' })}${c.site.contact.telephone}</a>
      </p>
      ${statut(c, { info: true })}
    </div>
    <ol class="frise" data-effet="etapes" aria-label="${S('titre')}">
      <svg class="frise-trait" viewBox="0 0 10 100" preserveAspectRatio="none" aria-hidden="true"><path d="M5 0 V100" pathLength="1"/></svg>
      ${etapes.map((k, i) => html`<li class="frise-etape"${i === 0 ? html` data-iris-centre="disque"` : ''}><span class="frise-rond">${i + 1}</span><span class="frise-nom">${T(k)}</span></li>`)}
    </ol>
  </div>
</section>

<section class="rdv-form section fond-2" id="formulaire">
  <div class="conteneur rdv-form-grille">
    <div class="fpe" data-module="formulaire-par-etapes" data-rdv>
      <form class="fpe__form" novalidate action="#">
        <fieldset class="fpe__etape" data-etape="${S('e1')}">
          <legend class="fpe__legende"><h2 class="fpe__titre" tabindex="-1">${T('q1')}</h2></legend>
          <div class="fpe__groupe fpe__cartes" data-libelle="${S('e1')}">
            ${carte('lieu', 'domicile', T('lieuDomicile'), T('lieuDomicileT'), 'maison', true)}
            ${carte('lieu', 'atelier', T('lieuAtelier'), T('lieuAtelierT'), 'atelier')}
            ${carte('lieu', 'distance', T('lieuDistance'), T('lieuDistanceT'), 'distance')}
            ${carte('lieu', 'pro', T('lieuPro'), T('lieuProT'), 'equipe')}
          </div>
        </fieldset>
        <fieldset class="fpe__etape" data-etape="${S('e2')}">
          <legend class="fpe__legende"><h2 class="fpe__titre" tabindex="-1">${T('q2')}</h2></legend>
          <div class="fpe__groupe fpe__cartes fpe__cartes--petites" data-libelle="${S('e2')}">
            ${[['pc', 'PC', 'ecran'], ['portable', 'Ordinateur portable', 'portable'], ['mac', 'Mac', 'ecran'], ['tablette', 'Tablette', 'tablette'], ['smartphone', 'Smartphone', 'smartphone'], ['tv', 'TV', 'tv'], ['reseau', 'Box, réseau, Wi-Fi', 'wifi'], ['autre', 'Autre', 'autre']].map(([v, t, ic], i) => carte('appareil', v, t, '', ic, i === 0))}
          </div>
        </fieldset>
        <fieldset class="fpe__etape" data-etape="${S('e3')}">
          <legend class="fpe__legende"><h2 class="fpe__titre" tabindex="-1">${T('q3')}</h2></legend>
          <div class="fpe__groupe fpe__puces" data-libelle="${S('e3')}" data-min="1">
            ${c.donnees.pannes.map((p) => html`<label class="fpe__puce"><input type="checkbox" name="souci" value="${p.souci}"><span>${p.souci}</span></label>`)}
            <label class="fpe__puce"><input type="checkbox" name="souci" value="Installation"><span>Une installation</span></label>
            <label class="fpe__puce"><input type="checkbox" name="souci" value="Formation"><span>Apprendre à m'en servir</span></label>
            <label class="fpe__puce"><input type="checkbox" name="souci" value="Autre"><span>Autre chose</span></label>
          </div>
          <div class="fpe__champ"><label for="rdv-precision">${T('precision')}</label><textarea id="rdv-precision" name="precision" rows="3" data-libelle="${S('precision')}"></textarea></div>
        </fieldset>
        <fieldset class="fpe__etape" data-etape="${S('e4')}">
          <legend class="fpe__legende"><h2 class="fpe__titre" tabindex="-1">${T('q4')}</h2></legend>
          <div class="fpe__champ"><p class="fpe__sous-titre" id="rdv-jours-titre">${T('jour')}</p>
            <div class="jours" data-jours role="group" aria-labelledby="rdv-jours-titre"></div>
            <input type="hidden" name="jour" required data-libelle="${S('jour')}" data-message="Choisissez un jour.">
          </div>
          <div class="fpe__groupe fpe__puces" data-libelle="${S('moment')}">
            <label class="fpe__puce"><input type="radio" name="moment" value="${S('matin')}" required><span>${T('matin')}</span></label>
            <label class="fpe__puce"><input type="radio" name="moment" value="${S('apresmidi')}"><span>${T('apresmidi')}</span></label>
            <label class="fpe__puce"><input type="radio" name="moment" value="${S('soir')}"><span>${T('soir')}</span></label>
          </div>
        </fieldset>
        <fieldset class="fpe__etape" data-etape="${S('e5')}">
          <legend class="fpe__legende"><h2 class="fpe__titre" tabindex="-1">${T('q5')}</h2></legend>
          <div class="fpe__champs">
            <div class="fpe__champ"><label for="rdv-nom">${T('nom')}</label><input id="rdv-nom" name="nom" autocomplete="name" required data-libelle="${S('nom')}"></div>
            <div class="fpe__champ"><label for="rdv-tel">${T('tel')}</label><input id="rdv-tel" name="tel" type="tel" autocomplete="tel" required pattern="[0-9 +.()-]{10,}" data-libelle="${S('tel')}" data-message="Un numéro à 10 chiffres, par exemple 06 12 34 56 78."></div>
            <div class="fpe__champ"><label for="rdv-email">${T('email')}</label><input id="rdv-email" name="email" type="email" autocomplete="email" data-libelle="${S('email')}"></div>
            <div class="fpe__champ"><label for="rdv-commune">${T('commune')}</label><input id="rdv-commune" name="commune" list="rdv-communes" autocomplete="address-level2" data-libelle="${S('commune')}" aria-describedby="rdv-commune-aide"><p class="fpe__aide" id="rdv-commune-aide" data-commune-aide>${T('communeAide')}</p>
              <datalist id="rdv-communes">${c.donnees.communes.communes.map((x) => html`<option value="${x.nom}"></option>`)}</datalist></div>
          </div>
          <p class="mention-donnees">${c.tb('rdv.donnees')}</p>
        </fieldset>
        <div class="fpe__nav">
          <button type="button" class="bouton bouton--contour" data-precedent>${T('precedent')}</button>
          <button type="button" class="bouton" data-suivant>${T('suivant')}</button>
          <button type="submit" class="bouton">${T('envoyer')}</button>
        </div>
      </form>
      <div class="fpe__fin" hidden tabindex="-1">
        <h2>${T('finTitre')}</h2>
        <p>${T('finTexte')}</p>
        <pre class="fpe__resume" data-resume></pre>
        <button type="button" class="bouton bouton--contour" data-recommencer>${T('recommencer')}</button>
      </div>
    </div>
    <aside class="recap" data-recap-direct aria-live="polite" data-anime="cascade">
      <p class="recap-titre">${T('recapTitre')}</p>
      <dl class="recap-liste" data-recap-liste><div><dt>${T('recapVide')}</dt></div></dl>
      <p class="recap-estimation" data-recap-estimation hidden><span>${T('estimation')}</span><strong data-prix></strong></p>
    </aside>
  </div>
  <script type="application/json" data-communes>${JSON.stringify(Object.fromEntries(c.donnees.communes.communes.map((x) => [x.nom, [x.km]])))}</script>
</section>

<section class="coord section" id="coordonnees">
  <div class="conteneur coord-grille">
    <div>
      <h2 data-anime="lignes">${T('coordTitre')}</h2>
      <dl class="coord-liste" data-anime="cascade">
        <div><dt>${icone('telephone', { trace: false })}${T('coordTel')}</dt><dd><a href="tel:${c.site.contact.telephoneLien}">${c.site.contact.telephone}</a></dd></div>
        <div><dt>${icone('devis', { trace: false })}${T('coordEmail')}</dt><dd><a href="mailto:${c.site.contact.email}">${c.site.contact.email}</a></dd></div>
        <div><dt>${icone('atelier', { trace: false })}${T('coordAtelier')}</dt><dd>${c.site.contact.adresse}</dd></div>
        <div><dt>${icone('agenda', { trace: false })}${c.t('commun.horairesTitre')}</dt><dd>${c.t('commun.hSemaine')}<br>${c.t('commun.hSamedi')}<br>${c.t('commun.hDimanche')}</dd></div>
      </dl>
      ${statut(c)}
    </div>
    ${c.media({ nom: 'grok/rdv-mallette', alt: T('mallettealt'), classe: 'coord-media', sizes: '(max-width: 760px) 92vw, 45vw', attrs: 'data-fx="zoom"' })}
  </div>
</section>
`;
};
