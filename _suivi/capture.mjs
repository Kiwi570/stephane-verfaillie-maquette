// Captures de travail : node _suivi/capture.mjs /page largeurxhauteur [plein]
import { demarrerServeur } from '../_audit/serveur.mjs';
import { chromium } from '/usr/local/lib/node_modules_global/playwright/index.mjs';
const [page = '/', taille = '1440x900', mode = ''] = process.argv.slice(2);
const [w, h] = taille.split('x').map(Number);
const srv = await demarrerServeur(process.cwd());
const nav = await chromium.launch();
const ctx = await nav.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1, isMobile: w < 700, hasTouch: w < 700 });
const p = await ctx.newPage();
const erreurs = [];
p.on('console', (m) => { if (m.type() === 'error') erreurs.push(m.text()); });
p.on('pageerror', (e) => erreurs.push(String(e)));
await p.goto(`${srv.adresse}${page}`, { waitUntil: 'load' });
await p.waitForTimeout(3200);
const nom = `_suivi/cap-${page.replace(/\W+/g, '') || 'accueil'}-${w}`;
await p.screenshot({ path: `${nom}-haut.jpg`, quality: 70, type: 'jpeg' });
if (mode === 'plein') {
  const H = await p.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < H; y += Math.round(h * 0.6)) { await p.evaluate((y) => window.scrollTo(0, y), y); await p.waitForTimeout(260); }
  await p.waitForTimeout(800);
  await p.screenshot({ path: `${nom}-plein.jpg`, quality: 60, type: 'jpeg', fullPage: true });
}
console.log(erreurs.length ? 'ERREURS :\n' + erreurs.join('\n') : 'aucune erreur console');
await nav.close(); await srv.fermer();
