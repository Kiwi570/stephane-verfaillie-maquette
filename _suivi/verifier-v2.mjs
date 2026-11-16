// Vérifications de travail de la v2 : balayage des pros, mots de l'atelier, lien de la zone, préremplissage du rendez-vous.
import { demarrerServeur } from '../_audit/serveur.mjs';
import { chromium } from '/usr/local/lib/node_modules_global/playwright/index.mjs';
const srv = await demarrerServeur(process.cwd());
const nav = await chromium.launch();
const p = await (await nav.newContext({ viewport: { width: 1366, height: 768 } })).newPage();
const err = []; p.on('pageerror', (e) => err.push(String(e))); p.on('console', (m) => m.type() === 'error' && err.push(m.text()));
await p.goto(srv.adresse + '/professionnels'); await p.waitForTimeout(3300);
await p.screenshot({ path: '_suivi/cap-v2-pros.jpg', quality: 70, type: 'jpeg' });
await p.waitForTimeout(2600); await p.screenshot({ path: '_suivi/cap-v2-pros-b.jpg', quality: 70, type: 'jpeg' });
await p.goto(srv.adresse + '/a-propos'); await p.waitForTimeout(3000);
const H = await p.evaluate(() => { const s = document.querySelector('.atelier-ecran'); return s.offsetTop + s.offsetHeight * 0.45; });
for (let y = 0; y <= H; y += 200) { await p.evaluate((y) => scrollTo(0, y), y); await p.waitForTimeout(120); }
await p.waitForTimeout(900); await p.screenshot({ path: '_suivi/cap-v2-atelier.jpg', quality: 70, type: 'jpeg' });
await p.goto(srv.adresse + '/'); await p.waitForTimeout(3000);
await p.evaluate(() => document.querySelector('#zone').scrollIntoView()); await p.waitForTimeout(800);
await p.fill('#zone-commune', 'mutzig'); await p.click('#zone .zone-champ button'); await p.waitForTimeout(700);
const lien = await p.evaluate(() => { const a = document.querySelector('[data-zone-lien]'); return [a.hidden, a.textContent, a.getAttribute('href')]; });
console.log('lien zone', lien);
await p.evaluate(() => document.querySelector('#appel').scrollIntoView({ block: 'center' })); await p.waitForTimeout(1500);
await p.screenshot({ path: '_suivi/cap-v2-appel.jpg', quality: 70, type: 'jpeg' });
console.log('anneau allumé', await p.evaluate(() => document.querySelector('.appel-anneau').classList.contains('est-allume')));
await p.goto(srv.adresse + lien[2]); await p.waitForTimeout(3200);
console.log('rdv', await p.evaluate(() => [document.querySelector('#rdv-commune').value, document.querySelector('input[name=lieu]:checked')?.value]));
console.log(err.length ? 'ERREURS ' + err.join(' | ') : 'aucune erreur');
await nav.close(); await srv.fermer();
