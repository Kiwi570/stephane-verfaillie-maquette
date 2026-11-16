"""Carte de la zone d'intervention : 30 km autour de Molsheim.
Source : contours officiels des communes du Bas-Rhin (github.com/gregoiredavid/france-geojson), copiés dans
_suivi/sources/communes-67.geojson. Écrit assets/images/zone-carte.svg (fond de carte) et donnees/communes.json
(nom, distance à Molsheim en km, position sur la carte), lus par le gabarit de la section Zone.
Usage : python3 outils/zone.py"""
import json, math, os
ICI = os.path.dirname(os.path.abspath(__file__)); RAC = os.path.dirname(ICI)
g = json.load(open(os.path.join(RAC, '_suivi/sources/communes-67.geojson')))
RAYON = 30; VUE = 36; ECH = 10  # km du cercle, demi-largeur de la vue en km, unités SVG par km

def anneaux(geom):
    return [p[0] for p in (geom['coordinates'] if geom['type'] == 'MultiPolygon' else [geom['coordinates']])]
def centre(geom):
    A = cx = cy = 0
    for r in anneaux(geom):
        for i in range(len(r) - 1):
            x0, y0 = r[i]; x1, y1 = r[i + 1]; f = x0 * y1 - x1 * y0; A += f; cx += (x0 + x1) * f; cy += (y0 + y1) * f
    A /= 2; return cx / (6 * A), cy / (6 * A)
def km(a, b):
    la1, lo1, la2, lo2 = map(math.radians, (a[1], a[0], b[1], b[0]))
    d = math.sin((la2 - la1) / 2) ** 2 + math.cos(la1) * math.cos(la2) * math.sin((lo2 - lo1) / 2) ** 2
    return 2 * 6371 * math.asin(math.sqrt(d))
C = {f['properties']['nom']: centre(f['geometry']) for f in g['features']}
M = C['Molsheim']; lat0 = math.radians(M[1])
def proj(p):
    return ((p[0] - M[0]) * 111.32 * math.cos(lat0) * ECH, -(p[1] - M[1]) * 110.57 * ECH)
def simplifie(pts, tol):
    if len(pts) < 3: return pts
    (x0, y0), (x1, y1) = pts[0], pts[-1]; dx, dy = x1 - x0, y1 - y0; L = math.hypot(dx, dy) or 1e-9
    i, dm = 0, -1
    for k in range(1, len(pts) - 1):
        d = abs(dy * pts[k][0] - dx * pts[k][1] + x1 * y0 - y1 * x0) / L if L > 1e-9 else math.hypot(pts[k][0] - x0, pts[k][1] - y0)
        if d > dm: i, dm = k, d
    if dm <= tol: return [pts[0], pts[-1]]
    return simplifie(pts[:i + 1], tol)[:-1] + simplifie(pts[i:], tol)
def chemin(geom):
    out = []
    for r in anneaux(geom):
        pts = simplifie([proj(p) for p in r], 2.2)
        if len(pts) < 4: continue
        out.append('M' + 'L'.join(f'{x:.0f} {y:.0f}' for x, y in pts) + 'Z')
    return ''.join(out)

dedans, dehors, communes = [], [], []
for f in g['features']:
    nom = f['properties']['nom']; d = km(M, C[nom])
    if d > VUE * 1.45: continue
    (dedans if d <= RAYON else dehors).append(chemin(f['geometry']))
    if d <= RAYON:
        x, y = proj(C[nom]); communes.append({'nom': nom, 'km': round(d, 1), 'x': round(x), 'y': round(y)})
communes.sort(key=lambda c: c['nom'])
N = C['Niederhaslach']; nx, ny = proj(N)
V = VUE * ECH
svg = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{-V} {-V} {2 * V} {2 * V}">'
       f'<path d="{"".join(dehors)}" fill="#eceee9" stroke="#d3d8d2" stroke-width="1.4" stroke-linejoin="round"/>'
       f'<path d="{"".join(dedans)}" fill="#dcebe2" stroke="#bccdc2" stroke-width="1.4" stroke-linejoin="round"/>'
       '</svg>')
os.makedirs(os.path.join(RAC, 'assets/images'), exist_ok=True)
open(os.path.join(RAC, 'assets/images/zone-carte.svg'), 'w').write(svg)
json.dump({'rayon': RAYON, 'vue': V, 'nombre': len(communes), 'atelier': {'x': round(nx), 'y': round(ny), 'km': round(km(M, N), 1)},
           'communes': communes}, open(os.path.join(RAC, 'donnees/communes.json'), 'w'), ensure_ascii=False)
print(len(communes), 'communes dans', RAYON, 'km ; carte', round(len(svg) / 1024), 'Ko')
