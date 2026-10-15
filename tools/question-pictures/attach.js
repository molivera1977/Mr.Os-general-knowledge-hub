// Adds "image" and "imageAlt" to the questions each picture belongs to.
const fs = require('fs');
const PICS = {
  geography: [
    [/capital of Connecticut/, 'geo-ct-capital', 'Map of Connecticut with a star on its capital city'],
    [/city different from a state/, 'geo-ct-city-state', 'Map of Connecticut with Bridgeport marked'],
    [/You go north/, 'geo-ct-north', 'Map of Connecticut with an arrow pointing north to a question mark'],
    [/east of Connecticut/, 'geo-ct-east', 'Map of Connecticut with an arrow pointing east to a question mark'],
    [/south side of Connecticut/, 'geo-ct-water', 'Map of Connecticut with a question mark on the water to the south'],
    [/capital of the whole United States/, 'geo-us-capital', 'Map of the United States with a star on the capital'],
    [/How many continents/, 'geo-world-continents', 'World map with each continent in a different color'],
    [/What continent do we live on/, 'geo-world-here', 'World map with a dot where we live'],
    [/west of Connecticut/, 'geo-ct-west', 'Map of Connecticut with an arrow pointing west to a question mark'],
    [/pretend line around the middle/, 'geo-world-equator', 'World map with a red line around the middle'],
    [/ocean is on the east side/, 'geo-us-ocean', 'Map of the United States with a question mark in the ocean to the east'],
    [/map different from a globe/, 'geo-map-globe', 'A flat map next to a round globe'],
    [/north of the United States/, 'geo-na-north', 'Map of North America with a question mark north of the United States'],
    [/south of the United States/, 'geo-na-south', 'Map of North America with a question mark south of the United States'],
    [/How many states are in/, 'geo-us-states', 'Map of all the states in the United States'],
    [/do NOT touch the others/, 'geo-na-ak-hi', 'Map of North America and the Pacific Ocean with the United States in yellow'],
    [/big river runs down the middle/, 'geo-us-river', 'Map of the United States with a big river drawn in blue'],
    [/What city do we live in/, 'geo-ct-home', 'Map of Connecticut with a dot where we live'],
    [/full name of our country/, 'geo-us-flag', 'The flag of our country'],
  ],
  math: [
    [/fold into two halves/, 'math-symmetry', 'A heart with a dashed line down the middle'],
    [/around the edge of a park/, 'math-perimeter', 'A path going all the way around the edge of a park'],
    [/cover a whole floor with a rug/, 'math-area', 'A floor covered with squares'],
    [/call the top number/, 'math-numerator', 'A circle with 3 of 4 parts colored and the fraction 3 over 4'],
    [/call the bottom number/, 'math-denominator', 'A circle with 3 of 4 parts colored and the fraction 3 over 4'],
    [/days are in one week/, 'math-week', 'The days of the week on a calendar'],
    [/seconds are in one minute/, 'math-clock-seconds', 'A clock with a thin red second hand'],
    [/minutes are in one hour/, 'math-clock', 'A clock'],
    [/You add two numbers/, 'math-sum', '5 plus 4 equals 9, with the 9 circled'],
    [/You subtract one number/, 'math-difference', '9 minus 4 equals 5, with the 5 circled'],
    [/You multiply two numbers/, 'math-product', '3 times 4 equals 12, with the 12 circled'],
    [/You divide one number/, 'math-quotient', '12 divided by 3 equals 4, with the 4 circled'],
    [/inches are in one foot/, 'math-ruler', 'A ruler that is 1 foot long'],
    [/feet are in one yard/, 'math-yardstick', 'A yardstick above rulers placed end to end'],
    [/looks like an L/, 'math-angle-right', 'A square corner angle'],
    [/smaller than 90 degrees/, 'math-angle-acute', 'A small, narrow angle'],
    [/wider than a right angle/, 'math-angle-obtuse', 'A wide-open angle'],
    [/like train tracks/, 'math-parallel', 'Two lines side by side, like train tracks'],
    [/Two lines cross/, 'math-perpendicular', 'Two lines that cross to make a square corner'],
    [/sides does a triangle have/, 'math-triangle', 'A triangle'],
    [/ANY closed shape with 4 sides/, 'math-quads', 'A square, a rectangle and two other 4-sided shapes'],
    [/sides does a pentagon have/, 'math-pentagon', 'A pentagon'],
    [/sides does a hexagon have/, 'math-hexagon', 'A hexagon'],
    [/sides does an octagon have/, 'math-octagon', 'An octagon'],
    [/ALL three sides the same/, 'math-tri-equilateral', 'A triangle with marks showing all 3 sides the same'],
    [/exactly TWO sides the same/, 'math-tri-isosceles', 'A triangle with marks showing 2 sides the same'],
    [/NO sides the same/, 'math-tri-scalene', 'A triangle with marks showing every side is different'],
  ],
  civics: [
    [/leader of a city like Bridgeport/, 'civ-mayor', 'Tall city buildings and a person with a question mark'],
    [/leader of a state like Connecticut/, 'civ-governor', 'Map of Connecticut and a person with a question mark'],
    [/one leader for the whole United States/, 'civ-president', 'Map of the United States and a person with a question mark'],
    [/one most important paper/, 'civ-constitution', 'An old paper with writing and a feather pen'],
    [/How many branches/, 'civ-balance', 'A balance scale with both sides even'],
    [/writes new laws and votes/, 'civ-capitol', 'A large white building with a dome'],
    [/Which branch does the President lead/, 'civ-white-house', 'A white house with columns and a flag on top'],
    [/top court/, 'civ-court', 'A courthouse with columns and scales on the roof'],
    [/A ballot is a paper/, 'civ-ballot', 'A paper with a check mark going into a box'],
    [/How old do you have to be to vote/, 'civ-cake', 'A birthday cake with a question mark'],
    [/birthday of the United States/, 'civ-birthday', 'Fireworks and a calendar page with a question mark'],
    [/How old did it turn in 2026/, 'civ-timeline', 'A line from 1776 to 2026 with question mark years'],
    [/very first President/, 'civ-dollar', 'A one-dollar bill with a question mark where the face goes'],
    [/one term for a President/, 'civ-term', 'A vote, then an arrow with question mark years, then a vote again'],
    [/What is a law\?/, 'civ-law', 'A stop sign and a speed limit sign'],
    [/An amendment is a change/, 'civ-ten-rights', 'An old paper with a list numbered 1 to 10'],
    [/Who makes the laws for Bridgeport/, 'civ-council', 'A group of people around a table'],
    [/50 white stars/, 'civ-flag', 'The flag of our country'],
    [/England ruled our land/, 'civ-1776-paper', 'An old paper, a feather pen, a bell and the year 1776'],
    [/13 red and white stripes/, 'civ-flag', 'The flag of our country'],
    [/President of the United States live and work/, 'civ-dc', 'Map of the United States with a star on Washington, D.C.'],
  ],
  ela: [
    [/Which word is a noun/, 'ela-noun', 'Pictures of a person, a place and a thing'],
    [/The happy dog jumped/, 'ela-verb', 'A dog jumping over a fence'],
    [/main idea of a story/, 'ela-main-idea', 'An umbrella over three small boxes'],
    [/Which sentence is a fact/, 'ela-fact', 'A bird, a magnifying glass and a check mark'],
    [/What are synonyms/, 'ela-synonym', 'The words small and tiny with an equals sign'],
    [/What are antonyms/, 'ela-antonym', 'The words hot and cold with arrows'],
    [/Which one is a simile/, 'ela-simile', 'A moon and a cookie with the words like and as'],
    [/setting of a story/, 'ela-setting', 'A castle, a moon, a clock and a map pin'],
    [/plot of a story/, 'ela-plot', 'Boxes 1, 2 and 3 with arrows between them'],
    [/make an inference/, 'ela-inference', 'Magnifying glass plus brain equals light bulb'],
    [/What are context clues/, 'ela-context', 'A sentence with a hidden word and a detective'],
    [/fluffy cat napped/, 'ela-adjective', 'A fluffy cat on a rug'],
    [/walked quietly/, 'ela-adverb', 'A person walking and a hush face'],
    [/supporting detail/, 'ela-detail', 'A table: the top says main idea, the legs have question marks'],
    [/Which sentence is an opinion/, 'ela-opinion', 'A flower, a love-it face and a thinking face'],
    [/What are homophones/, 'ela-homophone', 'The words eight and ate'],
    [/conflict in a story/, 'ela-conflict', 'A child facing a dragon'],
    [/theme of a story/, 'ela-theme', 'A book with an arrow to a light bulb'],
    [/point of view/, 'ela-point-of-view', 'A girl saying I, me, my'],
    [/compound word/, 'ela-compound', 'Rain plus bow equals rainbow'],
    [/prefix is a part/, 'ela-prefix', 'pre plus heat'],
    [/suffix is a part/, 'ela-suffix', 'help plus ful'],
    [/person telling the story to the reader/, 'ela-narrator', 'A book and a speaking head'],
    [/play is a story that actors act out/, 'ela-play', 'Two actors on a stage with red curtains'],
    [/start with a capital letter/, 'ela-capital', 'A big capital A and a small a'],
    [/pronoun do in a sentence/, 'ela-pronoun', 'The words he, she, it and they'],
    [/Right There/, 'ela-right-there', 'A finger pointing at a book, and a magnifying glass'],
  ],
};
const J = JSON.stringify;
for (const [subject, list] of Object.entries(PICS)) {
  const file = `data/${subject}.js`; const src = fs.readFileSync(file, 'utf8');
  const name = src.match(/const (\w+)/)[1]; let data; eval(src.replace(`const ${name} =`, 'data ='));
  for (const [re, pic, alt] of list) {
    const hits = data.filter(q => re.test(q.question));
    if (hits.length !== 1) throw new Error(`${subject} ${re} matched ${hits.length}`);
    if (!fs.existsSync(`img/questions/${pic}.svg`)) throw new Error('missing ' + pic);
    hits[0].image = `img/questions/${pic}.svg`; hits[0].imageAlt = alt;
  }
  const body = data.map(q => {
    const lines = [`    "questionNumber": ${q.questionNumber}`, `    "question": ${J(q.question)}`, `    "hint": ${J(q.hint)}`];
    if (q.image) lines.push(`    "image": ${J(q.image)}`, `    "imageAlt": ${J(q.imageAlt)}`);
    lines.push(`    "answerOptions": [\n${q.answerOptions.map(o => `      { "text": ${J(o.text)}, "rationale": ${J(o.rationale)}, "isCorrect": ${o.isCorrect} }`).join(',\n')}\n    ]`);
    return `  {\n${lines.join(',\n')}\n  }`;
  }).join(',\n');
  fs.writeFileSync(file, `const ${name} = [\n${body}\n];\n`);
  console.log(subject, data.length, 'questions,', data.filter(q => q.image).length, 'with pictures');
}
