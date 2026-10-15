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
console.log(fs.readdirSync(OUT).length + ' pictures');
