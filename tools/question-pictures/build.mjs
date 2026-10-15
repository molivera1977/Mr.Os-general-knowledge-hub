// Builds the question pictures for the General Knowledge Hub.
// Maps come from real boundary data (us-atlas = US Census; Natural Earth) and
// real projections (Albers for the US, per feedback_real_geodata_for_maps).
// Math pictures are plain geometry. Output: one SVG per picture in OUT.
import fs from 'node:fs';
import { createRequire } from 'node:module';
import * as d3 from 'd3-geo';
import * as topojson from 'topojson-client';
import * as simp from 'topojson-simplify';
// Detail a 300-pixel picture can show; anything finer is just bytes.
const thin = (topo, q) => simp.simplify(simp.presimplify(topo), simp.quantile(simp.presimplify(topo), q));

const require = createRequire(import.meta.url);
const OUT = process.argv[2];
fs.mkdirSync(OUT, { recursive: true });

const states10 = require('us-atlas/states-10m.json');
const STATES_FULL = topojson.feature(states10, states10.objects.states).features;
const statesThin = thin(states10, 0.25);
const STATES = topojson.feature(statesThin, statesThin.objects.states).features;
const world50 = require('world-atlas/countries-50m.json');
const world50thin = thin(world50, 0.2);
const COUNTRIES50 = topojson.feature(world50thin, world50thin.objects.countries).features;
const NE = p => JSON.parse(fs.readFileSync(new URL('./ne/' + p, import.meta.url)));
const COUNTRIES110 = NE('ne_110m_admin_0_countries.geojson').features;
const RIVERS = NE('ne_50m_rivers_lake_centerlines.geojson').features;
const LAKES = NE('ne_50m_lakes.geojson').features;

// ── look ──────────────────────────────────────────────
const W = 480, H = 300;
const WATER = '#cde8f6', LAND = '#efe7d3', LAND_LINE = '#b9ab8c', FOCUS = '#f6c453', FOCUS_LINE = '#9a6b00';
const INK = '#1b1b1b', RED = '#d63031', BLUE_RIVER = '#1f78c8';
const FONT = 'Verdana, Arial, sans-serif';

const r = n => Math.round(n * 10) / 10;
const svg = (body, bg = WATER) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">` +
  `<rect width="${W}" height="${H}" rx="14" fill="${bg}"/>` +
  `<g font-family="${FONT}">${body}</g></svg>`;
const write = (name, s) => fs.writeFileSync(`${OUT}/${name}.svg`, s);

// A label with a white halo so it reads on any fill.
const label = (x, y, t, size = 22, color = INK, anchor = 'middle', weight = 700) =>
  `<text x="${r(x)}" y="${r(y)}" font-size="${size}" font-weight="${weight}" text-anchor="${anchor}" ` +
  `fill="${color}" stroke="#fff" stroke-width="5" stroke-linejoin="round" paint-order="stroke">${t}</text>`;
const qBubble = (x, y) =>
  `<circle cx="${r(x)}" cy="${r(y)}" r="22" fill="#fff" stroke="${RED}" stroke-width="4"/>` +
  `<text x="${r(x)}" y="${r(y + 10)}" font-size="28" font-weight="700" text-anchor="middle" fill="${RED}">?</text>`;
const star = (x, y, s = 16, fill = RED) => {
  const pts = [];
  for (let i = 0; i < 10; i++) {
    const a = -Math.PI / 2 + i * Math.PI / 5, rad = i % 2 ? s * 0.45 : s;
    pts.push(`${r(x + rad * Math.cos(a))},${r(y + rad * Math.sin(a))}`);
  }
  return `<polygon points="${pts.join(' ')}" fill="${fill}" stroke="#fff" stroke-width="2.5" paint-order="stroke"/>`;
};
const dot = (x, y, fill = RED) => `<circle cx="${r(x)}" cy="${r(y)}" r="9" fill="${fill}" stroke="#fff" stroke-width="3"/>`;
const arrow = (x1, y1, x2, y2, color = RED, w = 6) => {
  const a = Math.atan2(y2 - y1, x2 - x1), h = 16;
  const bx = x2 - h * Math.cos(a), by = y2 - h * Math.sin(a);
  return `<line x1="${r(x1)}" y1="${r(y1)}" x2="${r(bx)}" y2="${r(by)}" stroke="${color}" stroke-width="${w}" stroke-linecap="round"/>` +
    `<polygon points="${r(x2)},${r(y2)} ${r(bx + 10 * Math.sin(a))},${r(by - 10 * Math.cos(a))} ${r(bx - 10 * Math.sin(a))},${r(by + 10 * Math.cos(a))}" fill="${color}"/>`;
};
// Compass: N at the top (cardinal directions are in several questions).
const compass = (x, y) =>
  `<g transform="translate(${x},${y})"><circle r="26" fill="#fff" stroke="${INK}" stroke-width="2"/>` +
  `<polygon points="0,-20 6,0 0,-4 -6,0" fill="${RED}"/><polygon points="0,20 6,0 0,4 -6,0" fill="${INK}"/>` +
  `<polygon points="-20,0 0,-6 -4,0 0,6" fill="${INK}"/><polygon points="20,0 0,-6 4,0 0,6" fill="${INK}"/>` +
  `<text y="-31" font-size="16" font-weight="700" text-anchor="middle" fill="${INK}">N</text>` +
  `<text y="45" font-size="16" font-weight="700" text-anchor="middle" fill="${INK}">S</text>` +
  `<text x="-38" y="6" font-size="16" font-weight="700" text-anchor="middle" fill="${INK}">W</text>` +
  `<text x="38" y="6" font-size="16" font-weight="700" text-anchor="middle" fill="${INK}">E</text></g>`;
const paths = (features, path, fill, stroke, sw = 1) =>
  features.map(f => { const d = path(f); return d ? `<path d="${d}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}" stroke-linejoin="round"/>` : ''; }).join('');
const boxOf = (lon0, lat0, lon1, lat1) =>
  ({ type: 'MultiPoint', coordinates: [[lon0, lat0], [lon1, lat0], [lon1, lat1], [lon0, lat1], [(lon0 + lon1) / 2, lat0], [(lon0 + lon1) / 2, lat1]] });

const byName = n => STATES.find(f => f.properties.name === n);
const CT = byName('Connecticut');
const LOWER48 = STATES.filter(f => !['02', '15', '72', '60', '66', '69', '78'].includes(f.id));
const PLACES = { hartford: [-72.6851, 41.7637], bridgeport: [-73.1952, 41.1865], dc: [-77.0369, 38.9072] };

// ── Connecticut and its neighbors ─────────────────────
function ctMap(extra, { box = [-74.75, 40.75, -70.95, 42.75], ctLabel = true, labelAt = [-72.75, 41.45] } = {}) {
  const proj = d3.geoConicEqualArea().parallels([40, 43]).rotate([73, 0])
    .fitExtent([[10, 10], [W - 10, H - 10]], boxOf(...box)).clipExtent([[0, 0], [W, H]]);
  const path = d3.geoPath(proj).digits(1);
  const others = STATES.filter(f => f !== CT);
  let body = paths(others, path, LAND, LAND_LINE, 1.2) + paths([CT], path, FOCUS, FOCUS_LINE, 2.5);
  const [cx, cy] = path.centroid(CT);
  const [lx, ly] = proj(labelAt);
  if (ctLabel) body += label(lx, ly + 8, 'Connecticut', 22);
  body += extra(proj, path, cx, cy);
  return svg(body);
}
const P = (proj, k) => proj(PLACES[k]);

write('geo-ct-capital', ctMap((proj) => {
  const [x, y] = P(proj, 'hartford');
  return star(x, y, 17) + `<g>${star(300, 274, 13)}${label(316, 281, '= capital city', 18, INK, 'start')}</g>`;
}, { labelAt: [-72.75, 41.42] }));
write('geo-ct-city-state', ctMap((proj, path, cx, cy) => {
  const [x, y] = P(proj, 'bridgeport');
  const [sx, sy] = proj([-72.45, 41.72]);
  return dot(x, y) + label(x - 4, y + 32, 'Bridgeport = a city', 18) + label(sx, sy, 'Connecticut = a state', 18);
}, { ctLabel: false }));
write('geo-ct-home', ctMap((proj) => {
  const [x, y] = P(proj, 'bridgeport');
  return dot(x, y) + label(x - 6, y + 32, 'We live here', 19);
}, { labelAt: [-72.6, 41.62] }));
const dirMap = (from, to, name) => write(name, ctMap((proj) => {
  const [x0, y0] = proj(from), [x, y] = proj(to);
  const a = Math.atan2(y - y0, x - x0);
  return arrow(x0, y0, x - 26 * Math.cos(a), y - 26 * Math.sin(a), RED) + qBubble(x, y) + compass(W - 44, 56);
}, { labelAt: [-72.75, 41.33] }));
dirMap([-72.75, 41.85], [-72.75, 42.42], 'geo-ct-north');
dirMap([-72.05, 41.62], [-71.45, 41.62], 'geo-ct-east');
dirMap([-73.45, 41.62], [-74.2, 41.62], 'geo-ct-west');
write('geo-ct-water', ctMap((proj) => {
  const [x, y] = proj([-72.75, 41.1]);
  return qBubble(x, y + 4) + compass(W - 44, 56);
}, { labelAt: [-72.75, 41.6] }));

// ── United States (Albers, lower 48) ──────────────────
const usProj = (pad = 12) => d3.geoAlbers().parallels([29.5, 45.5]).rotate([96, 0])
  .fitExtent([[pad, pad], [W - pad, H - pad]], { type: 'FeatureCollection', features: LOWER48 });
function usMap(extra, { neighbors = true, focusAll = false, proj = usProj() } = {}) {
  proj.clipExtent([[0, 0], [W, H]]);
  const path = d3.geoPath(proj).digits(1);
  let body = '';
  if (neighbors) body += paths(COUNTRIES50.filter(f => ['Canada', 'Mexico'].includes(f.properties.name)), path, '#e4e0d8', '#c9c2b2', 1);
  body += paths(LOWER48, path, focusAll ? FOCUS : LAND, focusAll ? FOCUS_LINE : LAND_LINE, 0.8);
  body += paths(LAKES.filter(f => /Superior|Michigan|Huron|Erie|Ontario/.test(f.properties.name || '')), path, WATER, 'none');
  body += extra(proj, path);
  return svg(body);
}
write('geo-us-capital', usMap((proj) => {
  const [x, y] = P(proj, 'dc');
  return star(x, y, 15) + star(36, 272, 12) + label(52, 279, '= our country’s capital', 17, INK, 'start');
}));
write('geo-us-ocean', usMap((proj) => {
  const [x, y] = proj([-66, 34]);
  return qBubble(Math.min(x, W - 34), y) + compass(46, 250);
}, { proj: d3.geoAlbers().parallels([29.5, 45.5]).rotate([96, 0]).fitExtent([[6, 20], [W - 70, H - 20]], { type: 'FeatureCollection', features: LOWER48 }) }));
write('geo-us-river', usMap((proj, path) => {
  const river = RIVERS.filter(f => f.properties.name === 'Mississippi');
  return river.map(f => `<path d="${path(f)}" fill="none" stroke="${BLUE_RIVER}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>`).join('');
}));
// All 50 states, Alaska and Hawaii in the usual boxes, for counting states.
{
  const proj = d3.geoAlbersUsa().fitExtent([[10, 10], [W - 10, H - 10]], { type: 'FeatureCollection', features: STATES.filter(f => f.id !== '72') });
  const path = d3.geoPath(proj).digits(1);
  write('geo-us-states', svg(paths(STATES.filter(f => f.id !== '72'), path, FOCUS, '#fff', 1.2)));
}

// ── North America ─────────────────────────────────────
function naMap(extra, box = [-128, 13, -62, 62]) {
  const proj = d3.geoAlbers().parallels([20, 60]).rotate([100, 0]).fitExtent([[8, 8], [W - 8, H - 8]], boxOf(...box)).clipExtent([[0, 0], [W, H]]);
  const path = d3.geoPath(proj).digits(1);
  const na = COUNTRIES50.filter(f => f.properties.name !== 'United States of America');
  let body = paths(na, path, LAND, LAND_LINE, 1) + paths(STATES.filter(f => f.id !== '72'), path, FOCUS, FOCUS_LINE, 0.4);
  body += paths(LAKES.filter(f => (f.properties.scalerank || 9) <= 1), path, WATER, 'none');
  body += extra(proj, path);
  return svg(body);
}
write('geo-na-north', naMap((proj) => {
  const [ux, uy] = proj([-99, 39]); const [x, y] = proj([-100, 56]);
  return label(ux, uy, 'United States', 20) + qBubble(x, y) + compass(W - 40, H - 54);
}));
write('geo-na-south', naMap((proj) => {
  const [ux, uy] = proj([-99, 39]); const [x, y] = proj([-102, 23.5]);
  return label(ux, uy, 'United States', 20) + qBubble(x, y) + compass(W - 40, 60);
}));
write('geo-na-ak-hi', (() => {
  const proj = d3.geoAlbers().parallels([25, 60]).rotate([120, 0]).fitExtent([[8, 8], [W - 8, H - 8]], boxOf(-172, 17, -64, 70)).clipExtent([[0, 0], [W, H]]);
  const path = d3.geoPath(proj).digits(1);
  let body = paths(COUNTRIES50.filter(f => f.properties.name !== 'United States of America'), path, LAND, LAND_LINE, 1);
  body += paths(STATES.filter(f => f.id !== '72'), path, FOCUS, FOCUS_LINE, 0.4);
  body += label(...proj([-98, 39]), 'United States', 18) + label(...proj([-147, 33]), 'Pacific Ocean', 15, '#2a5d87', 'middle', 600);
  return svg(body);
})());

// ── World ─────────────────────────────────────────────
const worldProj = () => d3.geoNaturalEarth1().fitExtent([[8, 8], [W - 8, H - 8]], { type: 'Sphere' });
function worldBase(path, fillFor) {
  return `<path d="${path({ type: 'Sphere' })}" fill="${WATER}" stroke="#9cc6e0" stroke-width="1.5"/>` +
    COUNTRIES110.filter(f => f.properties.CONTINENT !== 'Seven seas (open ocean)')
      .map(f => { const c = fillFor(f); return `<path d="${path(f)}" fill="${c}" stroke="${c}" stroke-width="0.6"/>`; }).join('');
}
const CONT = { 'North America': '#f6c453', 'South America': '#7bc96f', Europe: '#c28fd8', Asia: '#f08a5d',
  Africa: '#e6c35c', Oceania: '#5dc1c9', Antarctica: '#ffffff' };
// Africa and North America both yellowish? keep them apart: Africa gets a deeper tan.
CONT.Africa = '#d9a066';
{
  const proj = worldProj(); const path = d3.geoPath(proj).digits(1);
  // Russia straddles Europe and Asia: paint it twice, clipped at the Urals (60°E).
  const west = { type: 'Polygon', coordinates: [[[-180, -89.9], [60, -89.9], [60, 0], [60, 89.9], [-180, 89.9], [-180, 0], [-180, -89.9]].reverse()] };
  const east = { type: 'Polygon', coordinates: [[[60, -89.9], [180, -89.9], [180, 0], [180, 89.9], [60, 89.9], [60, 0], [60, -89.9]].reverse()] };
  const russia = COUNTRIES110.find(f => f.properties.ADMIN === 'Russia');
  const others = COUNTRIES110.filter(f => f !== russia);
  let body = `<defs><clipPath id="eu"><path d="${path(west)}"/></clipPath><clipPath id="as"><path d="${path(east)}"/></clipPath></defs>`;
  body += `<path d="${path({ type: 'Sphere' })}" fill="${WATER}" stroke="#9cc6e0" stroke-width="1.5"/>`;
  body += others.filter(f => f.properties.CONTINENT !== 'Seven seas (open ocean)')
    .map(f => { const c = CONT[f.properties.CONTINENT] || LAND; return `<path d="${path(f)}" fill="${c}" stroke="${c}" stroke-width="0.6"/>`; }).join('');
  body += `<path d="${path(russia)}" fill="${CONT.Europe}" stroke="${CONT.Europe}" stroke-width="0.6" clip-path="url(#eu)"/>`;
  body += `<path d="${path(russia)}" fill="${CONT.Asia}" stroke="${CONT.Asia}" stroke-width="0.6" clip-path="url(#as)"/>`;
  // Antarctica is white: give it an outline so it shows on the pale water.
  body += `<path d="${path(COUNTRIES110.find(f => f.properties.CONTINENT === 'Antarctica'))}" fill="none" stroke="#9cb4c4" stroke-width="1"/>`;
  write('geo-world-continents', svg(body, '#ffffff'));
}
{
  const proj = worldProj(); const path = d3.geoPath(proj).digits(1);
  const [x, y] = P(proj, 'bridgeport');
  write('geo-world-here', svg(worldBase(path, () => LAND) + dot(x, y) + label(x + 14, y - 14, 'We are here', 18, INK, 'start'), '#ffffff'));
}
{
  const proj = worldProj(); const path = d3.geoPath(proj).digits(1);
  const eq = { type: 'LineString', coordinates: Array.from({ length: 73 }, (_, i) => [-180 + i * 5, 0]) };
  write('geo-world-equator', svg(worldBase(path, () => LAND) +
    `<path d="${path(eq)}" fill="none" stroke="${RED}" stroke-width="4" stroke-dasharray="10 6"/>` +
    label(W / 2, 58, 'North half', 20, '#2a5d87') + label(W / 2, H - 40, 'South half', 20, '#2a5d87'), '#ffffff'));
}
// A flat map beside a globe — both from the same world data.
{
  const flat = d3.geoEquirectangular().fitExtent([[14, 70], [244, 186]], { type: 'Sphere' });
  const globe = d3.geoOrthographic().rotate([75, -20]).fitExtent([[300, 60], [450, 210]], { type: 'Sphere' });
  const pf = d3.geoPath(flat).digits(1), pg = d3.geoPath(globe).digits(1);
  const land = COUNTRIES110.filter(f => f.properties.CONTINENT !== 'Seven seas (open ocean)');
  let body = `<path d="${pf({ type: 'Sphere' })}" fill="${WATER}" stroke="#7aa7c7" stroke-width="2"/>` + paths(land, pf, '#9ccf8a', '#9ccf8a', 0.4);
  body += `<path d="${pg({ type: 'Sphere' })}" fill="${WATER}" stroke="#7aa7c7" stroke-width="2"/>` + paths(land, pg, '#9ccf8a', '#9ccf8a', 0.4);
  body += `<ellipse cx="375" cy="248" rx="40" ry="7" fill="#b9c3cc"/>`;
  body += label(129, 230, 'a map', 22) + label(375, 285, 'a globe', 22);
  write('geo-map-globe', svg(body, '#ffffff'));
}
// The US flag: 13 stripes, 50 stars (official 10:19 proportions).
{
  const fw = 380, fh = 200, x0 = (W - fw) / 2, y0 = (H - fh) / 2, sh = fh / 13;
  let body = '';
  for (let i = 0; i < 13; i++) body += `<rect x="${x0}" y="${r(y0 + i * sh)}" width="${fw}" height="${r(sh + 0.3)}" fill="${i % 2 ? '#fff' : '#b22234'}"/>`;
  const cw = fw * 0.4, ch = sh * 7;
  body += `<rect x="${x0}" y="${y0}" width="${r(cw)}" height="${r(ch)}" fill="#3c3b6e"/>`;
  for (let row = 0; row < 9; row++) {
    const n = row % 2 ? 5 : 6;
    for (let c = 0; c < n; c++) {
      const sx = x0 + cw / 12 * (row % 2 ? 2 + c * 2 : 1 + c * 2), sy = y0 + ch / 10 * (row + 1);
      body += star(sx, sy, 5.2, '#fff').replace('stroke="#fff" stroke-width="2.5"', 'stroke="none" stroke-width="0"');
    }
  }
  body += `<rect x="${x0}" y="${y0}" width="${fw}" height="${fh}" fill="none" stroke="#9aa4ad" stroke-width="2"/>`;
  write('geo-us-flag', svg(body, '#eef5fb'));
}

// ── MATH (plain geometry) ─────────────────────────────
const PURPLE = '#6c3fc4', SOFT = '#efe8fb', PAPER = '#ffffff';
const m = body => svg(body, PAPER);
const poly = (n, cx, cy, rad, rot = -90) => Array.from({ length: n }, (_, i) => {
  const a = (rot + i * 360 / n) * Math.PI / 180; return `${r(cx + rad * Math.cos(a))},${r(cy + rad * Math.sin(a))}`; }).join(' ');
const shape = (pts, fill = SOFT) => `<polygon points="${pts}" fill="${fill}" stroke="${PURPLE}" stroke-width="5" stroke-linejoin="round"/>`;
// tick marks across a side, to show equal sides
const ticks = (x1, y1, x2, y2, n) => {
  const mx = (x1 + x2) / 2, my = (y1 + y2) / 2, a = Math.atan2(y2 - y1, x2 - x1), nx = -Math.sin(a), ny = Math.cos(a);
  let s = '';
  for (let i = 0; i < n; i++) {
    const o = (i - (n - 1) / 2) * 8, px = mx + o * Math.cos(a), py = my + o * Math.sin(a);
    s += `<line x1="${r(px - 11 * nx)}" y1="${r(py - 11 * ny)}" x2="${r(px + 11 * nx)}" y2="${r(py + 11 * ny)}" stroke="${RED}" stroke-width="4" stroke-linecap="round"/>`;
  }
  return s;
};

// Symmetry: a heart folded on a dashed line.
write('math-symmetry', m(`<path d="M240 250 C 150 190, 110 140, 130 95 C 150 55, 215 55, 240 105 C 265 55, 330 55, 350 95 C 370 140, 330 190, 240 250 Z" fill="#ffd1dc" stroke="${PURPLE}" stroke-width="5"/>` +
  `<line x1="240" y1="30" x2="240" y2="275" stroke="${RED}" stroke-width="5" stroke-dasharray="14 10"/>`));
// Perimeter: a path all the way around a park.
write('math-perimeter', m(`<rect x="70" y="60" width="340" height="180" rx="10" fill="#bfe6a8" stroke="${PURPLE}" stroke-width="3"/>` +
  `<text x="240" y="160" font-size="56" text-anchor="middle">🌳🌳</text>` +
  `<rect x="58" y="48" width="364" height="204" rx="16" fill="none" stroke="${RED}" stroke-width="6" stroke-dasharray="16 10"/>` +
  arrow(300, 48, 360, 48, RED, 6) + arrow(422, 120, 422, 180, RED, 6) + arrow(180, 252, 120, 252, RED, 6) + arrow(58, 180, 58, 120, RED, 6) +
  `<text x="100" y="40" font-size="34">🚶</text>`));
// Area: the whole floor covered in squares.
{
  let s = ''; const x0 = 90, y0 = 50, c = 50;
  for (let i = 0; i < 6; i++) for (let j = 0; j < 4; j++) s += `<rect x="${x0 + i * c}" y="${y0 + j * c}" width="${c}" height="${c}" fill="#f6c453" stroke="#9a6b00" stroke-width="2"/>`;
  write('math-area', m(s + `<rect x="${x0}" y="${y0}" width="${6 * c}" height="${4 * c}" fill="none" stroke="${PURPLE}" stroke-width="6"/>`));
}
// Fractions: 3/4 of a circle, arrow at the top or bottom number.
const fracPic = which => {
  const cx = 140, cy = 150, R = 95;
  let s = '';
  for (let i = 0; i < 4; i++) {
    const a0 = (-90 + i * 90) * Math.PI / 180, a1 = (-90 + (i + 1) * 90) * Math.PI / 180;
    s += `<path d="M${cx},${cy} L${r(cx + R * Math.cos(a0))},${r(cy + R * Math.sin(a0))} A${R},${R} 0 0 1 ${r(cx + R * Math.cos(a1))},${r(cy + R * Math.sin(a1))} Z" fill="${i < 3 ? '#f6c453' : '#fff'}" stroke="${PURPLE}" stroke-width="4"/>`;
  }
  s += `<text x="330" y="125" font-size="64" font-weight="700" text-anchor="middle" fill="${INK}">3</text>` +
    `<line x1="295" y1="148" x2="365" y2="148" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>` +
    `<text x="330" y="222" font-size="64" font-weight="700" text-anchor="middle" fill="${INK}">4</text>`;
  s += which === 'top' ? arrow(445, 80, 375, 100, RED) + qBubble(445, 64) : arrow(445, 230, 375, 200, RED) + qBubble(445, 246);
  return m(s);
};
write('math-numerator', fracPic('top'));
write('math-denominator', fracPic('bottom'));
// A week on a calendar.
{
  const d = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']; let s = '';
  d.forEach((t, i) => {
    const x = 18 + i * 64;
    s += `<rect x="${x}" y="90" width="58" height="110" rx="8" fill="${i === 0 || i === 6 ? '#fde2d6' : SOFT}" stroke="${PURPLE}" stroke-width="3"/>` +
      `<rect x="${x}" y="90" width="58" height="34" rx="8" fill="${PURPLE}"/>` +
      `<text x="${x + 29}" y="114" font-size="17" font-weight="700" text-anchor="middle" fill="#fff">${t}</text>`;
  });
  write('math-week', m(s));
}
// Clock faces.
const clock = withSecond => {
  const cx = 240, cy = 150, R = 120; let s = `<circle cx="${cx}" cy="${cy}" r="${R}" fill="#fff" stroke="${PURPLE}" stroke-width="7"/>`;
  for (let i = 0; i < 60; i++) {
    const a = i * 6 * Math.PI / 180, big = i % 5 === 0, r1 = R - (big ? 16 : 8);
    s += `<line x1="${r(cx + r1 * Math.sin(a))}" y1="${r(cy - r1 * Math.cos(a))}" x2="${r(cx + (R - 3) * Math.sin(a))}" y2="${r(cy - (R - 3) * Math.cos(a))}" stroke="${INK}" stroke-width="${big ? 4 : 2}"/>`;
  }
  for (let h = 1; h <= 12; h++) {
    const a = h * 30 * Math.PI / 180;
    s += `<text x="${r(cx + (R - 36) * Math.sin(a))}" y="${r(cy - (R - 36) * Math.cos(a) + 8)}" font-size="22" font-weight="700" text-anchor="middle" fill="${INK}">${h}</text>`;
  }
  s += `<line x1="${cx}" y1="${cy}" x2="${cx + 50}" y2="${cy - 30}" stroke="${INK}" stroke-width="8" stroke-linecap="round"/>` +
    `<line x1="${cx}" y1="${cy}" x2="${cx + 80}" y2="${cy + 46}" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>`;
  if (withSecond) s += `<line x1="${cx}" y1="${cy + 18}" x2="${cx - 70}" y2="${cy + 70}" stroke="${RED}" stroke-width="3" stroke-linecap="round"/>`;
  return m(s + `<circle cx="${cx}" cy="${cy}" r="7" fill="${INK}"/>`);
};
write('math-clock-seconds', clock(true));
write('math-clock', clock(false));
// Number sentences with the answer circled.
const sentence = (a, op, b, ans) => m(
  `<text x="312" y="175" font-size="${String(a).length + String(b).length > 2 ? 54 : 66}" font-weight="700" text-anchor="end" fill="${INK}">${a} ${op} ${b} =</text>` +
  `<circle cx="380" cy="152" r="52" fill="#fff4d6" stroke="${RED}" stroke-width="6"/>` +
  `<text x="380" y="175" font-size="64" font-weight="700" text-anchor="middle" fill="${INK}">${ans}</text>` +
  arrow(380, 268, 380, 212, RED) + `<text x="300" y="275" font-size="22" font-weight="700" text-anchor="end" fill="${RED}">the answer</text>`);
write('math-sum', sentence(5, '+', 4, 9));
write('math-difference', sentence(9, '−', 4, 5));
write('math-product', sentence(3, '×', 4, 12));
write('math-quotient', sentence(12, '÷', 3, 4));
// A 12-inch ruler.
{
  const x0 = 24, u = 36; let s = `<rect x="${x0}" y="110" width="${12 * u}" height="80" rx="6" fill="#f6d77a" stroke="#9a6b00" stroke-width="3"/>`;
  for (let i = 0; i <= 48; i++) {
    const x = x0 + i * u / 4, len = i % 4 === 0 ? 30 : i % 2 === 0 ? 20 : 12;
    s += `<line x1="${r(x)}" y1="110" x2="${r(x)}" y2="${110 + len}" stroke="${INK}" stroke-width="${i % 4 === 0 ? 3 : 1.5}"/>`;
    if (i % 4 === 0 && i > 0) s += `<text x="${r(x - 4)}" y="172" font-size="17" font-weight="700" text-anchor="end" fill="${INK}">${i / 4}</text>`;
  }
  write('math-ruler', m(s + label(240, 240, '1 foot', 26)));
}
// A yardstick above rulers laid end to end.
{
  let s = `<rect x="30" y="70" width="420" height="50" rx="6" fill="#d4b483" stroke="#7a5a2a" stroke-width="3"/>` + label(240, 104, '1 yard', 24);
  for (let i = 0; i < 3; i++) s += `<rect x="${30 + i * 140}" y="170" width="140" height="44" rx="6" fill="#f6d77a" stroke="#9a6b00" stroke-width="3"/>`;
  s += label(240, 262, 'How many 1-foot rulers?', 20);
  write('math-yardstick', m(s));
}
// Angles.
const angle = (deg, ox = 140) => {
  const oy = 240, L = 220, a = -deg * Math.PI / 180;
  const x2 = ox + L * Math.cos(a), y2 = oy + L * Math.sin(a);
  let s = `<line x1="${ox}" y1="${oy}" x2="${ox + L}" y2="${oy}" stroke="${PURPLE}" stroke-width="7" stroke-linecap="round"/>` +
    `<line x1="${ox}" y1="${oy}" x2="${r(x2)}" y2="${r(y2)}" stroke="${PURPLE}" stroke-width="7" stroke-linecap="round"/>`;
  if (deg === 90) s += `<polyline points="${ox + 34},${oy} ${ox + 34},${oy - 34} ${ox},${oy - 34}" fill="none" stroke="${RED}" stroke-width="4"/>`;
  else {
    const ar = 46, ex = ox + ar * Math.cos(a), ey = oy + ar * Math.sin(a);
    s += `<path d="M${ox + ar},${oy} A${ar},${ar} 0 0 0 ${r(ex)},${r(ey)}" fill="none" stroke="${RED}" stroke-width="4"/>`;
  }
  return m(s + `<circle cx="${ox}" cy="${oy}" r="7" fill="${INK}"/>`);
};
write('math-angle-right', angle(90));
write('math-angle-acute', angle(40));
write('math-angle-obtuse', angle(135, 225));
// Lines.
write('math-parallel', m(`<line x1="50" y1="110" x2="430" y2="110" stroke="${PURPLE}" stroke-width="8" stroke-linecap="round"/>` +
  `<line x1="50" y1="190" x2="430" y2="190" stroke="${PURPLE}" stroke-width="8" stroke-linecap="round"/>` +
  [90, 170, 250, 330, 410].map(x => `<line x1="${x}" y1="100" x2="${x}" y2="200" stroke="#b9ab8c" stroke-width="6"/>`).join('')));
write('math-perpendicular', m(`<line x1="70" y1="200" x2="410" y2="200" stroke="${PURPLE}" stroke-width="8" stroke-linecap="round"/>` +
  `<line x1="240" y1="40" x2="240" y2="270" stroke="${PURPLE}" stroke-width="8" stroke-linecap="round"/>` +
  `<polyline points="272,200 272,168 240,168" fill="none" stroke="${RED}" stroke-width="4"/>`));
// Shapes.
write('math-triangle', m(shape(poly(3, 240, 168, 120))));
write('math-pentagon', m(shape(poly(5, 240, 158, 118))));
write('math-hexagon', m(shape(poly(6, 240, 150, 118, 0))));
write('math-octagon', m(shape(poly(8, 240, 150, 118, -67.5))));
write('math-quads', m(
  shape('95,30 195,30 195,130 95,130') + shape('265,45 425,45 425,125 265,125', '#fde2d6') +
  shape('60,270 100,175 200,175 240,270', '#d8f0e1') + shape('345,160 405,220 345,280 285,220', '#fff4d6')));
{
  const A = [240, 40], B = [110, 265], C = [370, 265];
  write('math-tri-equilateral', m(shape(`${A} ${B} ${C}`) + ticks(...A, ...B, 1) + ticks(...B, ...C, 1) + ticks(...C, ...A, 1)));
  const D = [240, 30], E = [160, 270], F = [320, 270];
  write('math-tri-isosceles', m(shape(`${D} ${E} ${F}`) + ticks(...D, ...E, 1) + ticks(...F, ...D, 1) + ticks(...E, ...F, 2)));
  const G = [140, 60], Hh = [80, 260], I = [420, 240];
  write('math-tri-scalene', m(shape(`${G} ${Hh} ${I}`) + ticks(...G, ...Hh, 1) + ticks(...Hh, ...I, 2) + ticks(...I, ...G, 3)));
}

// ── CIVICS (drawings) ─────────────────────────────────
// Pictures help without naming the answer: no building, paper or person is
// labeled with the word a question asks for.
const NAVY = '#1f3a68', CREAM = '#fbf3df', STONE = '#f4f1ea', STONE_LINE = '#8d8574', GREEN_BILL = '#cfe3c4';
const EMOJI = '"Apple Color Emoji","Noto Color Emoji","Segoe UI Emoji",sans-serif';
const emo = (x, y, ch, size = 48) => `<text x="${r(x)}" y="${r(y)}" font-size="${size}" text-anchor="middle" font-family='${EMOJI}'>${ch}</text>`;
const c = body => svg(body, '#ffffff');
const sky = (body, top = '#e8f3fb') => svg(`<rect width="${W}" height="${H}" rx="14" fill="${top}"/>` + body, top);

const columns = (x0, x1, yTop, yBot, n, w = 10) => {
  let s = ''; const step = (x1 - x0) / (n - 1);
  for (let i = 0; i < n; i++) s += `<rect x="${r(x0 + i * step - w / 2)}" y="${yTop}" width="${w}" height="${yBot - yTop}" fill="#fff" stroke="${STONE_LINE}" stroke-width="1.5"/>`;
  return s;
};
const windows = (x0, y, n, gap, w = 14, h = 20) => Array.from({ length: n }, (_, i) =>
  `<rect x="${x0 + i * gap}" y="${y}" width="${w}" height="${h}" rx="2" fill="#9cc3e2" stroke="${STONE_LINE}" stroke-width="1"/>`).join('');
const lawn = `<rect x="0" y="250" width="${W}" height="50" fill="#a8d88f"/>`;

// The White House (south side): wide body, round portico with columns, flag.
const whiteHouse = () =>
  lawn + `<rect x="70" y="140" width="340" height="110" fill="#fff" stroke="${STONE_LINE}" stroke-width="2"/>` +
  `<rect x="62" y="130" width="356" height="12" fill="#fff" stroke="${STONE_LINE}" stroke-width="2"/>` +
  windows(84, 160, 5, 26) + windows(316, 160, 4, 24) + windows(84, 205, 5, 26) + windows(316, 205, 4, 24) +
  `<path d="M190 250 V 135 Q 240 105 290 135 V 250 Z" fill="#fff" stroke="${STONE_LINE}" stroke-width="2"/>` +
  columns(200, 280, 140, 250, 6, 8) +
  `<rect x="186" y="122" width="108" height="10" fill="#fff" stroke="${STONE_LINE}" stroke-width="2"/>` +
  `<line x1="240" y1="122" x2="240" y2="70" stroke="#666" stroke-width="3"/>` +
  `<rect x="240" y="70" width="40" height="24" fill="#b22234"/><rect x="240" y="70" width="17" height="12" fill="#3c3b6e"/>` +
  `<rect x="240" y="77" width="40" height="3" fill="#fff"/><rect x="240" y="85" width="40" height="3" fill="#fff"/>`;

// The Capitol: two wings, a columned middle, a big dome on a drum.
const capitol = () =>
  lawn + `<rect x="30" y="185" width="420" height="65" fill="${STONE}" stroke="${STONE_LINE}" stroke-width="2"/>` +
  columns(50, 170, 192, 250, 7, 7) + columns(310, 430, 192, 250, 7, 7) +
  `<rect x="170" y="165" width="140" height="85" fill="${STONE}" stroke="${STONE_LINE}" stroke-width="2"/>` +
  `<polygon points="165,165 240,135 315,165" fill="${STONE}" stroke="${STONE_LINE}" stroke-width="2"/>` +
  columns(182, 298, 170, 250, 8, 8) +
  `<rect x="185" y="105" width="110" height="32" fill="${STONE}" stroke="${STONE_LINE}" stroke-width="2"/>` +
  columns(192, 288, 108, 137, 9, 5) +
  `<path d="M190 106 Q 190 38 240 34 Q 290 38 290 106 Z" fill="${STONE}" stroke="${STONE_LINE}" stroke-width="2"/>` +
  `<path d="M205 104 Q 206 52 240 46" fill="none" stroke="${STONE_LINE}" stroke-width="1.5"/><path d="M275 104 Q 274 52 240 46" fill="none" stroke="${STONE_LINE}" stroke-width="1.5"/>` +
  `<rect x="232" y="18" width="16" height="18" fill="${STONE}" stroke="${STONE_LINE}" stroke-width="2"/>`;

// A courthouse: steps, columns, a triangle roof, and the scales of justice.
const courthouse = () =>
  `<rect x="90" y="240" width="300" height="12" fill="${STONE}" stroke="${STONE_LINE}" stroke-width="2"/>` +
  `<rect x="100" y="228" width="280" height="12" fill="${STONE}" stroke="${STONE_LINE}" stroke-width="2"/>` +
  `<rect x="110" y="110" width="260" height="118" fill="${STONE}" stroke="${STONE_LINE}" stroke-width="2"/>` +
  columns(126, 354, 118, 228, 8, 12) +
  `<rect x="104" y="100" width="272" height="12" fill="${STONE}" stroke="${STONE_LINE}" stroke-width="2"/>` +
  `<polygon points="100,100 240,45 380,100" fill="${STONE}" stroke="${STONE_LINE}" stroke-width="2"/>` +
  emo(240, 95, '⚖️', 34);

// An old paper with lines of writing (no words a child could read off).
const parchment = (x, y, w, h, extra = '') => {
  let lines = '';
  for (let i = 0; i < Math.floor((h - 50) / 18); i++) {
    const ly = y + 34 + i * 18, len = w - 50 - (i % 3) * 18;
    lines += `<path d="M${x + 25} ${ly} q 10 -5 20 0 t 20 0 t 20 0 t 20 0 t 20 0 t 20 0 t 20 0 t 20 0 t 20 0 t 20 0" fill="none" stroke="#8a6d3b" stroke-width="2" stroke-dasharray="${len} 400"/>`;
  }
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="${CREAM}" stroke="#b08d4f" stroke-width="3"/>` +
    `<ellipse cx="${x + w / 2}" cy="${y}" rx="${w / 2 + 8}" ry="9" fill="#efdcae" stroke="#b08d4f" stroke-width="3"/>` +
    `<ellipse cx="${x + w / 2}" cy="${y + h}" rx="${w / 2 + 8}" ry="9" fill="#efdcae" stroke="#b08d4f" stroke-width="3"/>` + lines + extra;
};
const quill = (x, y) => `<path d="M${x} ${y} C ${x + 40} ${y - 70}, ${x + 80} ${y - 110}, ${x + 110} ${y - 130} C ${x + 70} ${y - 80}, ${x + 40} ${y - 40}, ${x} ${y} Z" fill="#fff" stroke="#555" stroke-width="2"/>` +
  `<line x1="${x}" y1="${y}" x2="${x - 10}" y2="${y + 14}" stroke="#333" stroke-width="3"/>`;
const person = (x, y) => emo(x, y, '🧑‍💼', 64);
const askBadge = (x, y) => qBubble(x, y);

write('civ-mayor', sky(
  [[40, 120, 60], [105, 80, 50], [160, 140, 70], [235, 60, 60], [300, 110, 55], [360, 90, 70]].map(([x, h, w]) =>
    `<rect x="${x}" y="${250 - h - 60}" width="${w}" height="${h + 60}" fill="#c9d6e3" stroke="#7d93ab" stroke-width="2"/>` +
    Array.from({ length: Math.floor((h + 40) / 26) }, (_, k) => `<rect x="${x + 10}" y="${250 - h - 48 + k * 26}" width="${w - 20}" height="12" fill="#fff6c8"/>`).join('')).join('') +
  lawn + person(240, 286) + askBadge(290, 230) + label(240, 40, 'Our city', 22)));

{
  const proj = d3.geoConicEqualArea().parallels([40, 43]).rotate([73, 0]).fitExtent([[40, 30], [300, 270]], CT);
  const path = d3.geoPath(proj).digits(1);
  const [hx, hy] = proj(PLACES.hartford);
  write('civ-governor', sky(`<path d="${path(CT)}" fill="${FOCUS}" stroke="${FOCUS_LINE}" stroke-width="3"/>` +
    star(hx, hy, 14) + label(170, 250, 'Connecticut', 20) + person(390, 200) + askBadge(430, 110)));
}
{
  const proj = usProj(20); proj.fitExtent([[10, 30], [330, 270]], { type: 'FeatureCollection', features: LOWER48 });
  const path = d3.geoPath(proj).digits(1);
  write('civ-president', sky(paths(LOWER48, path, FOCUS, '#fff', 0.8) + person(400, 200) + askBadge(440, 110)));
}
write('civ-constitution', c(parchment(130, 40, 220, 220) + quill(360, 260)));
// Balance scale: power kept even.
write('civ-balance', c(
  `<rect x="232" y="70" width="16" height="170" fill="#b08d4f"/><rect x="180" y="238" width="120" height="16" rx="6" fill="#8a6d3b"/>` +
  `<rect x="90" y="70" width="300" height="10" rx="5" fill="#8a6d3b"/><circle cx="240" cy="72" r="12" fill="#f6c453" stroke="#8a6d3b" stroke-width="3"/>` +
  `<line x1="110" y1="80" x2="85" y2="170" stroke="#555" stroke-width="2"/><line x1="110" y1="80" x2="135" y2="170" stroke="#555" stroke-width="2"/>` +
  `<line x1="370" y1="80" x2="345" y2="170" stroke="#555" stroke-width="2"/><line x1="370" y1="80" x2="395" y2="170" stroke="#555" stroke-width="2"/>` +
  `<path d="M70 170 Q 110 200 150 170 Z" fill="#f6c453" stroke="#8a6d3b" stroke-width="3"/><path d="M330 170 Q 370 200 410 170 Z" fill="#f6c453" stroke="#8a6d3b" stroke-width="3"/>`));
write('civ-capitol', sky(capitol()));
write('civ-white-house', sky(whiteHouse()));
write('civ-court', sky(courthouse()));
write('civ-ballot', c(
  `<rect x="140" y="140" width="200" height="130" rx="8" fill="#3c6fb6" stroke="${NAVY}" stroke-width="3"/>` +
  `<rect x="150" y="128" width="180" height="16" rx="4" fill="${NAVY}"/><rect x="200" y="132" width="80" height="6" rx="3" fill="#111"/>` +
  `<g transform="rotate(-8 240 80)"><rect x="190" y="20" width="100" height="125" rx="4" fill="#fff" stroke="#888" stroke-width="2"/>` +
  [45, 75, 105].map((y, i) => `<rect x="203" y="${y}" width="18" height="18" fill="#fff" stroke="#333" stroke-width="2"/>` +
    `<line x1="230" y1="${y + 9}" x2="275" y2="${y + 9}" stroke="#bbb" stroke-width="5" stroke-linecap="round"/>` +
    (i === 1 ? `<path d="M206 ${y + 9} l5 6 l10 -14" fill="none" stroke="${RED}" stroke-width="4" stroke-linecap="round"/>` : '')).join('') + `</g>` +
  emo(240, 230, '⭐', 40)));
// Birthday cake with a ? where the number would be.
const cake = (extra = '') => `<rect x="130" y="190" width="220" height="70" rx="10" fill="#f6c6d0" stroke="#c0607a" stroke-width="3"/>` +
  `<rect x="160" y="140" width="160" height="55" rx="10" fill="#fde2e7" stroke="#c0607a" stroke-width="3"/>` +
  `<path d="M130 200 q 18 16 36 0 t 36 0 t 36 0 t 36 0 t 36 0 t 36 0" fill="none" stroke="#fff" stroke-width="6"/>` +
  [200, 240, 280].map(x => `<rect x="${x - 4}" y="105" width="8" height="35" fill="#7fb3e0"/><path d="M${x} 90 q 8 10 0 16 q -8 -6 0 -16" fill="#f6a623"/>`).join('') +
  `<rect x="${W / 2 - 50}" y="270" width="100" height="10" rx="5" fill="#ccc"/>` + extra;
write('civ-cake', c(cake(qBubble(395, 120))));
const burst = (x, y, rad, col) => Array.from({ length: 12 }, (_, i) => { const t = i * Math.PI / 6;
  return `<line x1="${r(x + rad * 0.3 * Math.cos(t))}" y1="${r(y + rad * 0.3 * Math.sin(t))}" x2="${r(x + rad * Math.cos(t))}" y2="${r(y + rad * Math.sin(t))}" stroke="${col}" stroke-width="4" stroke-linecap="round"/>` +
    `<circle cx="${r(x + rad * 1.15 * Math.cos(t))}" cy="${r(y + rad * 1.15 * Math.sin(t))}" r="3.5" fill="${col}"/>`; }).join('');
write('civ-birthday', sky(burst(95, 95, 55, '#ff6b6b') + burst(385, 85, 50, '#ffd43b') + burst(400, 225, 35, '#74c0fc') + burst(80, 230, 35, '#b197fc') +
  `<rect x="160" y="130" width="160" height="140" rx="10" fill="#fff" stroke="#999" stroke-width="2"/><rect x="160" y="130" width="160" height="40" rx="10" fill="${RED}"/>` +
  `<text x="240" y="160" font-size="22" font-weight="700" text-anchor="middle" fill="#fff">???</text>` +
  `<text x="240" y="235" font-size="64" font-weight="700" text-anchor="middle" fill="${INK}">?</text>`, '#1f2b4d'));
write('civ-timeline', c(
  `<line x1="60" y1="170" x2="420" y2="170" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>` +
  `<circle cx="70" cy="170" r="12" fill="${RED}"/><circle cx="410" cy="170" r="12" fill="#1f78c8"/>` +
  label(70, 225, '1776', 30) + label(410, 225, '2026', 30) + emo(70, 135, '🎉', 40) + emo(410, 135, '🎂', 40) +
  `<path d="M90 115 Q 240 40 390 115" fill="none" stroke="#8a8a8a" stroke-width="3" stroke-dasharray="8 6"/>` +
  label(240, 70, '? years', 28, RED)));
write('civ-dollar', c(
  `<rect x="40" y="70" width="400" height="170" rx="10" fill="${GREEN_BILL}" stroke="#4d7a3a" stroke-width="4"/>` +
  `<rect x="54" y="84" width="372" height="142" rx="6" fill="none" stroke="#4d7a3a" stroke-width="2"/>` +
  `<ellipse cx="240" cy="155" rx="55" ry="65" fill="#e6f0dc" stroke="#4d7a3a" stroke-width="3"/>` +
  `<text x="240" y="178" font-size="64" font-weight="700" text-anchor="middle" fill="#4d7a3a">?</text>` +
  ['1'].map(t => `<text x="80" y="122" font-size="34" font-weight="700" text-anchor="middle" fill="#2f5524">${t}</text><text x="400" y="122" font-size="34" font-weight="700" text-anchor="middle" fill="#2f5524">${t}</text>` +
    `<text x="80" y="212" font-size="34" font-weight="700" text-anchor="middle" fill="#2f5524">${t}</text><text x="400" y="212" font-size="34" font-weight="700" text-anchor="middle" fill="#2f5524">${t}</text>`).join('')));
write('civ-term', c(
  emo(80, 175, '🗳️', 70) + emo(400, 175, '🗳️', 70) + label(80, 235, 'Vote', 22) + label(400, 235, 'Vote again', 22) +
  arrow(130, 155, 345, 155, '#1f78c8') + label(240, 125, '? years', 28, RED)));
write('civ-law', sky(
  `<polygon points="${poly(8, 150, 140, 80, -67.5)}" fill="#c0392b" stroke="#fff" stroke-width="6"/>` +
  `<text x="150" y="155" font-size="40" font-weight="700" text-anchor="middle" fill="#fff">STOP</text>` +
  `<rect x="146" y="218" width="8" height="70" fill="#777"/>` +
  `<rect x="290" y="60" width="130" height="160" rx="8" fill="#fff" stroke="${INK}" stroke-width="5"/>` +
  `<text x="355" y="105" font-size="22" font-weight="700" text-anchor="middle" fill="${INK}">SPEED</text>` +
  `<text x="355" y="132" font-size="22" font-weight="700" text-anchor="middle" fill="${INK}">LIMIT</text>` +
  `<text x="355" y="195" font-size="58" font-weight="700" text-anchor="middle" fill="${INK}">25</text>` +
  `<rect x="351" y="220" width="8" height="68" fill="#777"/>`));
write('civ-ten-rights', c(parchment(120, 30, 240, 240).replace(/<path d="M[^"]*q 10 -5[^>]*>/g, '') +
  Array.from({ length: 10 }, (_, i) => `<text x="150" y="${70 + i * 20}" font-size="15" font-weight="700" fill="#6b4f1d">${i + 1}.</text>` +
    `<line x1="175" y1="${65 + i * 20}" x2="${320 - (i % 3) * 20}" y2="${65 + i * 20}" stroke="#8a6d3b" stroke-width="3" stroke-linecap="round"/>`).join('')));
write('civ-council', c(
  `<ellipse cx="240" cy="190" rx="170" ry="55" fill="#b5835a" stroke="#7a5230" stroke-width="3"/>` +
  [[100, 150], [170, 128], [240, 120], [310, 128], [380, 150]].map(([x, y]) => emo(x, y, '🧑', 46)).join('') +
  [[130, 270], [240, 285], [350, 270]].map(([x, y]) => emo(x, y, '🧑', 46)).join('') +
  label(240, 40, 'Our city', 22)));
write('civ-1776-paper', c(parchment(80, 50, 220, 200) + quill(300, 250) + emo(390, 150, '🔔', 70) + label(390, 225, '1776', 26)));
{
  const DC = PLACES.dc;
  const proj = usProj(20); proj.fitExtent([[10, 20], [W - 10, H - 20]], { type: 'FeatureCollection', features: LOWER48 });
  const path = d3.geoPath(proj).digits(1);
  const [x, y] = proj(DC);
  write('civ-dc', sky(paths(LOWER48, path, LAND, LAND_LINE, 0.8) + star(x, y, 13) +
    arrow(x - 70, y - 60, x - 12, y - 10, RED) + emo(x - 95, y - 60, '🏠', 40) + qBubble(x - 140, y - 80) +
    star(40, 272, 11) + label(56, 279, '= Washington, D.C.', 17, INK, 'start')));
}
// The flag again, for the two flag questions (stars, stripes).
fs.copyFileSync(`${OUT}/geo-us-flag.svg`, `${OUT}/civ-flag.svg`);

// ── LANGUAGE ARTS (small scenes) ──────────────────────
const card = (x, y, w, h, fill = '#f4f0ff', stroke = '#8a6dd8') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="${fill}" stroke="${stroke}" stroke-width="3"/>`;
const word = (x, y, t, size = 30, color = INK) => `<text x="${r(x)}" y="${r(y)}" font-size="${size}" font-weight="700" text-anchor="middle" fill="${color}">${t}</text>`;
const plus = (x, y) => word(x, y, '+', 44, '#8a6dd8');
const eq = (x, y) => word(x, y, '=', 44, '#8a6dd8');

write('ela-noun', c([[85, '👧', 'person'], [240, '🏫', 'place'], [395, '⚽', 'thing']].map(([x, e, t]) =>
  card(x - 68, 70, 136, 170) + emo(x, 168, e, 74) + word(x, 222, t, 24)).join('')));
write('ela-verb', sky(`<rect x="250" y="190" width="150" height="60" fill="none"/>` +
  [255, 285, 315, 345, 375].map(x => `<rect x="${x}" y="185" width="14" height="70" rx="3" fill="#c98b4f" stroke="#7a5230" stroke-width="2"/>`).join('') +
  `<rect x="248" y="200" width="145" height="10" fill="#c98b4f"/><rect x="248" y="230" width="145" height="10" fill="#c98b4f"/>` +
  `<path d="M120 220 Q 320 20 440 220" fill="none" stroke="#1f78c8" stroke-width="5" stroke-dasharray="12 8"/>` +
  emo(300, 120, '🐕', 70) + lawn));
write('ela-main-idea', c(emo(240, 140, '☂️', 120) +
  [130, 240, 350].map(x => card(x - 45, 190, 90, 70, '#fff4d6', '#e0a800') + word(x, 233, '•••', 26, '#9a6b00')).join('')));
write('ela-fact', c(emo(160, 185, '🦜', 120) + emo(320, 160, '🔍', 90) + emo(385, 230, '✅', 50)));
write('ela-synonym', c(card(40, 90, 160, 120) + word(120, 145, 'small', 32) + emo(120, 195, '🐭', 40) + eq(240, 165) +
  card(280, 90, 160, 120) + word(360, 145, 'tiny', 32) + emo(360, 195, '🐜', 40)));
write('ela-antonym', c(card(40, 90, 160, 120, '#fde2d6', '#d35400') + word(120, 145, 'hot', 34) + emo(120, 195, '🔥', 40) + word(240, 165, '↔', 44, '#8a6dd8') +
  card(280, 90, 160, 120, '#dceefc', '#1f78c8') + word(360, 145, 'cold', 34) + emo(360, 195, '❄️', 40)));
write('ela-simile', c(emo(110, 170, '🌙', 90) + emo(370, 170, '🍪', 90) +
  `<rect x="180" y="125" width="120" height="70" rx="35" fill="#f4f0ff" stroke="#8a6dd8" stroke-width="3"/>` + word(240, 150, 'like', 24, '#6c3fc4') + word(240, 182, 'as', 24, '#6c3fc4')));
write('ela-setting', sky(emo(150, 200, '🏰', 140) + emo(380, 90, '🌙', 60) + emo(390, 230, '🕰️', 60) + emo(80, 80, '📍', 50), '#dfe7f7'));
write('ela-plot', c([[85, '1'], [240, '2'], [395, '3']].map(([x, n], i) => card(x - 60, 80, 120, 140) + word(x, 168, n, 64, '#6c3fc4') +
  (i < 2 ? arrow(x + 64, 150, x + 92, 150, RED, 5) : '')).join('')));
write('ela-inference', c(emo(80, 170, '🔍', 80) + plus(160, 165) + emo(240, 170, '🧠', 80) + eq(320, 165) + emo(400, 170, '💡', 80)));
write('ela-context', c(card(30, 110, 420, 90, '#fff', '#8a6dd8') +
  `<line x1="60" y1="155" x2="190" y2="155" stroke="#bbb" stroke-width="10" stroke-linecap="round"/>` +
  `<rect x="205" y="132" width="90" height="44" rx="8" fill="#FFD44D"/><text x="250" y="164" font-size="30" font-weight="700" text-anchor="middle" fill="${INK}">???</text>` +
  `<line x1="310" y1="155" x2="420" y2="155" stroke="#bbb" stroke-width="10" stroke-linecap="round"/>` + emo(400, 95, '🕵️', 60)));
write('ela-adjective', c(`<ellipse cx="240" cy="235" rx="150" ry="30" fill="#c0392b" opacity="0.8"/>` + emo(240, 220, '🐈', 140)));
write('ela-adverb', c(`<rect x="0" y="230" width="${W}" height="70" fill="#e9e2d0"/>` + emo(200, 220, '🚶', 120) + emo(330, 120, '🤫', 70)));
write('ela-detail', c(
  `<rect x="90" y="90" width="300" height="34" rx="6" fill="#f6c453" stroke="#9a6b00" stroke-width="3"/>` + word(240, 116, 'main idea', 22) +
  [120, 240, 360].map(x => `<rect x="${x - 12}" y="124" width="24" height="120" fill="#c98b4f" stroke="#7a5230" stroke-width="2"/>` + qBubble(x, 205).replace(/r="22"/, 'r="18"')).join('')));
write('ela-opinion', c(emo(150, 200, '🌼', 120) + emo(330, 150, '😍', 70) + emo(410, 230, '🤔', 60) +
  `<path d="M270 110 Q 330 60 390 110" fill="none" stroke="#bbb" stroke-width="3"/>`));
write('ela-homophone', c(card(40, 80, 160, 140) + word(120, 135, 'eight', 32) + word(120, 195, '8', 48, '#6c3fc4') +
  emo(240, 170, '👂', 50) +
  card(280, 80, 160, 140) + word(360, 135, 'ate', 32) + emo(360, 200, '🍽️', 50)));
write('ela-conflict', sky(emo(130, 210, '🧒', 110) + emo(240, 140, '⚡', 60) + emo(360, 210, '🐉', 120)));
write('ela-theme', c(emo(140, 180, '📖', 110) + arrow(220, 160, 290, 160, RED, 6) + emo(350, 180, '💡', 110)));
write('ela-point-of-view', c(emo(130, 220, '👧', 120) +
  `<path d="M190 70 h 230 a 20 20 0 0 1 20 20 v 60 a 20 20 0 0 1 -20 20 h -180 l -30 30 v -30 a 20 20 0 0 1 -20 -20 v -60 a 20 20 0 0 1 20 -20 z" fill="#fff" stroke="#8a6dd8" stroke-width="3"/>` +
  word(305, 130, 'I … me … my', 26)));
write('ela-compound', c(emo(70, 165, '🌧️', 70) + word(70, 225, 'rain', 26) + plus(150, 160) + emo(230, 165, '🎀', 70) + word(230, 225, 'bow', 26) +
  eq(305, 160) + emo(395, 165, '🌈', 80) + word(395, 225, 'rainbow', 24)));
write('ela-prefix', c(card(40, 100, 140, 90, '#fff4d6', '#e0a800') + word(110, 157, 'pre', 38) + plus(210, 160) +
  card(240, 100, 140, 90) + word(310, 157, 'heat', 38) + emo(430, 165, '🔥', 50)));
write('ela-suffix', c(card(40, 100, 140, 90) + word(110, 157, 'help', 38) + plus(210, 160) +
  card(240, 100, 140, 90, '#fff4d6', '#e0a800') + word(310, 157, 'ful', 38) + emo(430, 165, '🤝', 50)));
write('ela-narrator', c(emo(150, 200, '📖', 130) + emo(330, 140, '🗣️', 90)));
write('ela-play', c(
  `<rect x="30" y="40" width="420" height="230" rx="10" fill="#4a2a2a"/>` +
  `<path d="M30 40 Q 120 60 130 270 H 30 Z" fill="#b22234"/><path d="M450 40 Q 360 60 350 270 H 450 Z" fill="#b22234"/>` +
  `<rect x="30" y="230" width="420" height="40" fill="#8a5a2b"/>` + emo(205, 225, '🧑', 70) + emo(285, 225, '👧', 70) + emo(240, 110, '🎭', 50)));
write('ela-capital', c(word(160, 200, 'A', 150, '#6c3fc4') + word(330, 200, 'a', 110, '#8a8a8a')));
write('ela-pronoun', c([[90, 'he'], [190, 'she'], [290, 'it'], [390, 'they']].map(([x, t], i) =>
  `<circle cx="${x}" cy="${i % 2 ? 175 : 125}" r="48" fill="#f4f0ff" stroke="#8a6dd8" stroke-width="3"/>` + word(x, (i % 2 ? 175 : 125) + 11, t, 30)).join('')));
write('ela-right-there', c(emo(140, 190, '📖', 130) + emo(190, 120, '👆', 60) + emo(350, 190, '🔍', 90) + emo(410, 110, '🧩', 50)));

console.log(fs.readdirSync(OUT).length + ' pictures');
