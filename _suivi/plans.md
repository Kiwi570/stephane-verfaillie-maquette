# Plans v1 : Stéphane Verfaillie, direction A « Ça repart »

Palette : fond #F6F7F4 · second fond #E9ECE8 · bleu nuit (fonds sombres, tiré du logo) #0F2D4A · texte #15181C · voyant #16C172 (boutons, coches) · mot en couleur sur clair #0A8A50.
Polices : Funnel Display (titres), Funnel Sans (texte). Voile : iris, bleu nuit, pictogramme marche/arrêt et nom de la page.

## Plan du site (v1)
| Page | Ouverture | Sections |
|---|---|---|
| Accueil `/` | Scindée : titre à gauche, grande carte photo verticale à droite, pastille ronde « dès 30 € tout compris » (objet de l'intro) | Trois façons · Tout compris · Ce qui coince · Stéphane · Zone 30 km · Professionnels · Apprendre et sites web · Avis · Appel |
| Services et tarifs `/services` | Grand titre et « 30 € » géant, puis bandeau photo à plat (21:9) | Tarifs par famille (filtres) · Estimateur domicile/atelier + déplacement · Inclus dans le forfait · Sur devis · Questions pratiques · Appel |
| Professionnels `/professionnels` | Plein cadre photo bleu nuit, texte en bas à gauche, ligne de balayage | Ce que je prends en charge · Références · Comment ça se passe · Formations · Appel devis |
| À propos `/a-propos` | Grand nom centré, puis photo d'atelier qui s'ouvre en plein écran | Parcours · L'atelier · Zone · Avis · Appel |
| Rendez-vous `/rendez-vous` | Titre et frise des 5 étapes qui se trace, formulaire tout de suite | Formulaire en étapes avec récapitulatif · Coordonnées, horaires, statut · Carte |
| 404 | Câble débranché | Retour accueil, rendez-vous |
Hors v1 (plan complet) : Formations et sites web (page à part), Interventions (si vraies photos).

## Plan d'animation
Intro (2,3 s) : 0 s panneau bleu nuit, pictogramme marche/arrêt au centre ; 0,5 s son anneau se trace ; 0,9 s le voyant s'allume vert, halo ; 1,1 s versObjet : le pictogramme glisse jusqu'à la pastille de l'ouverture et le panneau s'ouvre en cercle depuis elle ; 1,4-2,3 s titre en lignes (« repart. » en vert), boutons et statut montent, la pastille se met à tourner.
Effets propres : `badge` (texte circulaire de la pastille qui tourne), `coche` (la liste « tout compris » se coche au défilement), `zone` (cercle des 30 km qui se trace, communes qui s'allument, distance réelle calculée), `voyant` (statut joignable et voyant de l'appel qui respirent), `prix-geant` (Services : chiffres du 30 € qui défilent), `balayage` (Professionnels : ligne de lecture qui traverse la photo et s'efface au défilement), `etapes` (Rendez-vous : frise qui se trace et s'allume étape par étape).
Bibliothèque : lignes, mots, cascade, rideau, parallaxe, zoom, trace, mots-geants (Ce qui coince), plein-ecran (À propos), vitesse, magnetique.

## Plan des images
Vraies : logo (transparent), portrait de Stéphane (rond, 690 px : en moyen). Écartées : photos de banque d'images (website*.jpg), avatars d'avis, photo propos-moi (visage d'une autre personne), logos de références trop petits (noms écrits en typographie à la place).
Grok : 15 images, voir `plan-images.json` et le document Grok.
