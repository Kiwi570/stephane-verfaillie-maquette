/* Pictogrammes au trait (24×24), dessinés pour le site : ils se tracent au défilement (data-fx="trace"). */
import { brut } from '../../outils/gabarit.mjs';

const T = {
  cle: '<path d="M14.5 6.5a4 4 0 1 0 3 6.7L21 16.7 18.7 19l-1.4-1.4-1.4 1.4-1.4-1.4 1.6-1.6-1.9-1.9A4 4 0 0 0 14.5 6.5Z"/><circle cx="8.6" cy="9.6" r="1.2"/>',
  balai: '<path d="M14 3l-3.5 9"/><path d="M7 12h8l2 9H5l2-9Z"/><path d="M9 16v5M13 16v5"/>',
  prise: '<path d="M9 3v5M15 3v5"/><path d="M6 8h12v4a6 6 0 0 1-12 0V8Z"/><path d="M12 18v3"/>',
  livre: '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5v-15Z"/><path d="M4 20.5A2.5 2.5 0 0 0 6.5 23H20"/><path d="M9 8h7"/>',
  fenetre: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18"/><circle cx="6.5" cy="6.5" r=".6"/><circle cx="9" cy="6.5" r=".6"/><path d="M7 13h6M7 16h10"/>',
  reseau: '<rect x="9" y="2.5" width="6" height="5" rx="1"/><rect x="2.5" y="16.5" width="6" height="5" rx="1"/><rect x="15.5" y="16.5" width="6" height="5" rx="1"/><path d="M12 7.5V12M5.5 16.5V12h13v4.5"/>',
  lent: '<path d="M3 17a9 9 0 0 1 18 0"/><path d="M12 17l-4-5"/><circle cx="12" cy="17" r="1.4"/>',
  virus: '<circle cx="12" cy="12" r="5"/><path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8"/>',
  cadenas: '<rect x="4.5" y="10.5" width="15" height="11" rx="2"/><path d="M8 10.5V7a4 4 0 0 1 8 0v3.5"/><path d="M12 15v2.5"/>',
  dossier: '<path d="M3 6.5A1.5 1.5 0 0 1 4.5 5H10l2 2.5h7.5A1.5 1.5 0 0 1 21 9v9.5a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 18.5v-12Z"/><path d="M12 11v5M9.5 13.5 12 16l2.5-2.5"/>',
  wifi: '<path d="M2.5 9a14 14 0 0 1 19 0"/><path d="M5.5 12.5a9.5 9.5 0 0 1 13 0"/><path d="M8.6 16a5 5 0 0 1 6.8 0"/><circle cx="12" cy="19.3" r="1.1"/>',
  piece: '<rect x="5" y="5" width="14" height="14" rx="1.5"/><rect x="9" y="9" width="6" height="6"/><path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3"/>',
  maison: '<path d="M3 11 12 3.5 21 11"/><path d="M5.5 9v11h13V9"/><path d="M10 20v-6h4v6"/>',
  atelier: '<path d="M3 20h18"/><path d="M5 20V10h14v10"/><path d="M8 10V6.5h8V10"/><path d="M9 14h6"/>',
  distance: '<rect x="3" y="4" width="18" height="12" rx="1.5"/><path d="M8 20h8M12 16v4"/><path d="M8.5 10.5 11 8l2 2 2.5-2.5"/>',
  telephone: '<path d="M5 3.5h3.5l1.8 4.5-2.3 1.5a11 11 0 0 0 6.5 6.5l1.5-2.3 4.5 1.8V19a1.5 1.5 0 0 1-1.6 1.5A16.5 16.5 0 0 1 3.5 5.1 1.5 1.5 0 0 1 5 3.5Z"/>',
  ecran: '<rect x="3" y="4" width="18" height="12" rx="1.5"/><path d="M8 20h8M12 16v4"/>',
  portable: '<path d="M5 5.5h14v9.5H5z"/><path d="M2.5 18h19l-1.5-3h-16Z"/>',
  tablette: '<rect x="5" y="2.5" width="14" height="19" rx="2"/><path d="M11 18.5h2"/>',
  smartphone: '<rect x="7" y="2.5" width="10" height="19" rx="2"/><path d="M11 18.5h2"/>',
  tv: '<rect x="2.5" y="5" width="19" height="12" rx="1.5"/><path d="M9 21h6M7 2.5l5 2.5 5-2.5"/>',
  autre: '<circle cx="5.5" cy="12" r="1.4"/><circle cx="12" cy="12" r="1.4"/><circle cx="18.5" cy="12" r="1.4"/>',
  agenda: '<rect x="3.5" y="5" width="17" height="16" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
  personne: '<circle cx="12" cy="8" r="4"/><path d="M4.5 21a7.5 7.5 0 0 1 15 0"/>',
  devis: '<path d="M6 2.5h9l4 4V21.5H6z"/><path d="M15 2.5v4h4M9 12h7M9 16h5"/>',
  equipe: '<circle cx="8" cy="8" r="3"/><circle cx="16.5" cy="9" r="2.5"/><path d="M2.5 20a5.5 5.5 0 0 1 11 0M13.5 20a4 4 0 0 1 8 0"/>',
};

/* data-fx="trace" seulement quand on le demande : un seul data-fx par élément. */
export const icone = (nom, { trace = true, classe = 'icone' } = {}) => brut(
  `<svg class="${classe}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"${trace ? ' data-fx="trace"' : ''}>${T[nom] || T.autre}</svg>`);

/* Coche ronde de la liste « prestations comprises » : le cercle et la coche se tracent (effet « coche » de site.js). */
export const coche = () => brut('<svg class="coche" viewBox="0 0 28 28" aria-hidden="true" data-effet="coche"><circle cx="14" cy="14" r="12" pathLength="1"/><path d="M8.5 14.5l3.6 3.6 7.4-8" pathLength="1"/></svg>');

/* Pictogramme marche/arrêt (le voyant du site). */
export const marche = (classe = 'marche') => brut(`<svg class="${classe}" viewBox="0 0 120 120" aria-hidden="true"><path d="M38.8 34.6 A32 32 0 1 0 81.2 34.6"/><path d="M60 22 V58"/></svg>`);
