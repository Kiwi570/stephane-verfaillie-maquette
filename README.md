# Stéphane Verfaillie : maquette « Ça repart »

Maquette du futur site de Stéphane Verfaillie, dépannage informatique autour de Molsheim.
En ligne : https://stephane-verfaillie-maquette.vercel.app (non indexée par les moteurs de recherche).

## Pages
- Accueil `/`
- Services et tarifs `/services` (filtre par famille gardé dans l'adresse : `?famille=formations`)
- Professionnels `/professionnels`
- À propos `/a-propos`
- Rendez-vous `/rendez-vous` (préremplissage : `?lieu=domicile`, `atelier`, `distance` ou `pro`)
- Page introuvable `/404`

## Mettre à jour
Textes : `donnees/textes/fr.json` ; tarifs, prestations incluses, pannes : `donnees/tarifs.json`, `donnees/pannes.json` ; avis : `donnees/avis.json` ; références : `donnees/references.json` ; horaires et jours fériés : `donnees/horaires.json`.
Puis `node outils/generer.mjs` (les pages HTML sont produites à partir de ces fichiers ; ne pas les modifier à la main).
Carte de la zone : `python3 outils/zone.py` (contours officiels des communes du Bas-Rhin, 30 km autour du centre de Molsheim).

## Fiche : ce que le client doit fournir
| Information | Où | État |
|---|---|---|
| Mentions légales (nom ou raison sociale, statut, adresse, SIRET, directeur de publication) | pied de page | à compléter |
| Politique de confidentialité (formulaires de rendez-vous et de zone) | pied de page, formulaire | à compléter |
| Hébergeur : Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis (adresse vérifiée le 16 novembre 2026 dans les conditions de Vercel) | mentions légales | à reporter |
| SIRET ou numéro d'immatriculation | mentions légales | à compléter |
| Assurance professionnelle, s'il y en a une | à propos | à compléter |
| Tarif du dépannage à distance | accueil, services | absent du site actuel : remplacé par « Sur rendez-vous » |
| Prix du déverrouillage de PC (mot de passe) | accueil, pannes | absent des tarifs actuels : affiché sans prix |
| Barème du déplacement (5 à 25 € selon la distance) | services, rendez-vous | seule la fourchette est affichée |
| Jours de fermeture, congés, règle des jours fériés | horaires | inconnus : aucun statut « joignable » n'est affiché un jour férié |
| Photos réelles : atelier, interventions, Stéphane au travail | toutes les pages | remplacées par des illustrations générées |
| Avis Google : texte complet des autres avis (Arsène B., Nebule H., Germain B., Christophe B. apparaissent sur le site actuel sans leur texte) | accueil, à propos | seuls 3 avis repris |
| Logos des références en bonne définition | professionnels | noms écrits à la place (logos trop petits sur le site actuel) |

Crédits à reporter : les images marquées « Illustration générée » ont été créées par IA (Grok). La mention reste sur le site final.

## Corrections faites par rapport au site actuel
- Le lien téléphone du site actuel appelait un numéro américain de démonstration (+1 650 555 0111) : ici, tous les liens appellent le 06 87 92 84 90.
- Liens vides « À propos » et « Interventions » : la page À propos existe ; Interventions n'est pas reprise (aucun contenu).
- « Sur devi s » corrigé ; dans les avis, « compétant » corrigé en « compétent », « A » en « À » et l'émoticône retirée.
- « À partir de 30 € tout compris » : affiché « dès 30 €, prestations comprises », avec le déplacement (5 à 25 €) à côté, comme sur la page tarifs actuelle.

## À retirer à la mise en ligne définitive
- `noindex` : balise robots dans `source/gabarits/commun.mjs` et en-tête X-Robots-Tag dans `vercel.json`.
- Formulaire de rendez-vous et estimateur simulés (rien n'est envoyé) : brancher un vrai envoi.
- Mentions « à compléter » du pied de page, à remplacer par les vraies pages.

À garder : la mention « Illustration générée » sur chaque image créée par IA.
