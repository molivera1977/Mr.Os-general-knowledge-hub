const geographyData = [
  {
    "questionNumber": 1,
    "question": "What is the capital city of our home state of Connecticut?",
    "hint": "This city is located right in the middle of the state and its name starts with an 'H'.",
    "answerOptions": [
      { "text": "Hartford", "rationale": "Explanation: Hartford is the capital of Connecticut, where our state government makes its laws.", "isCorrect": true },
      { "text": "Bridgeport", "rationale": "Explanation: Bridgeport is the largest city in Connecticut by population, but it is not the capital.", "isCorrect": false },
      { "text": "New Haven", "rationale": "Explanation: New Haven used to share capital duties with Hartford a long time ago, but Hartford is now the only capital.", "isCorrect": false },
      { "text": "Stamford", "rationale": "Explanation: Stamford is a major city in southern Connecticut, but it is not the state capital.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 2,
    "question": "Which of the following best explains the difference between a city (like Bridgeport) and a state (like Connecticut)?",
    "hint": "Think about which one is bigger and fits inside the other one.",
    "answerOptions": [
      { "text": "A city is a smaller local area with its own mayor, while a state is a large territory made up of many cities and towns.", "rationale": "Explanation: Cities are local municipalities that exist within the much larger borders of a state.", "isCorrect": true },
      { "text": "A state is a smaller local area, and a city is a large territory that holds many states.", "rationale": "Explanation: This is backwards; a state is much larger than a city.", "isCorrect": false },
      { "text": "Cities only have buildings, and states only have nature and parks.", "rationale": "Explanation: Both cities and states contain a mix of buildings, roads, parks, and nature.", "isCorrect": false },
      { "text": "A city is ruled by a president, and a state is ruled by a king.", "rationale": "Explanation: Cities are typically run by mayors, states by governors, and the whole country by a president.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 3,
    "question": "If you are in Connecticut and you travel straight North, which state's border will you cross into?",
    "hint": "The capital of this state to our north is Boston.",
    "answerOptions": [
      { "text": "Massachusetts", "rationale": "Explanation: Massachusetts sits directly on top of Connecticut, sharing our entire northern border.", "isCorrect": true },
      { "text": "New York", "rationale": "Explanation: New York is located to the west of Connecticut, not the north.", "isCorrect": false },
      { "text": "Rhode Island", "rationale": "Explanation: Rhode Island is located to the east of Connecticut.", "isCorrect": false },
      { "text": "New Jersey", "rationale": "Explanation: New Jersey does not border Connecticut at all; it is south of New York.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 4,
    "question": "Which state borders Connecticut to the East?",
    "hint": "It is the smallest state in the entire United States.",
    "answerOptions": [
      { "text": "Rhode Island", "rationale": "Explanation: Rhode Island shares Connecticut's eastern border.", "isCorrect": true },
      { "text": "Massachusetts", "rationale": "Explanation: Massachusetts is the state to our north.", "isCorrect": false },
      { "text": "New York", "rationale": "Explanation: New York is the state to our west.", "isCorrect": false },
      { "text": "Maine", "rationale": "Explanation: Maine is the northernmost state in New England and does not border Connecticut.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 5,
    "question": "What is the name of the large body of water that forms the southern border of Connecticut?",
    "hint": "It separates our state's beaches from a large piece of land in New York.",
    "answerOptions": [
      { "text": "Long Island Sound", "rationale": "Explanation: This tidal estuary lies immediately south of Connecticut.", "isCorrect": true },
      { "text": "The Atlantic Ocean", "rationale": "Explanation: While the Sound flows into the Atlantic, the open ocean does not directly touch Connecticut.", "isCorrect": false },
      { "text": "The Connecticut River", "rationale": "Explanation: This river flows south through the state and empties into the Sound, but it is not our southern border.", "isCorrect": false },
      { "text": "Lake Erie", "rationale": "Explanation: This is one of the Great Lakes, located much further west.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 6,
    "question": "What is the capital city of the entire United States of America?",
    "hint": "It is a special district named after our very first president.",
    "answerOptions": [
      { "text": "Washington, D.C.", "rationale": "Explanation: Washington, D.C. is the nation's capital, where the President lives and Congress makes federal laws.", "isCorrect": true },
      { "text": "New York City", "rationale": "Explanation: New York City is the largest city in the US, but it is not the nation's capital.", "isCorrect": false },
      { "text": "Philadelphia", "rationale": "Explanation: Philadelphia is where the Declaration of Independence was signed, but the capital moved to D.C.", "isCorrect": false },
      { "text": "Hartford", "rationale": "Explanation: Hartford is the capital of our state, not the whole country.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 7,
    "question": "The world's land is divided into massive areas called continents. How many continents are there on Earth?",
    "hint": "The number is exactly one more than a half-dozen.",
    "answerOptions": [
      { "text": "7", "rationale": "Explanation: There are exactly 7 continents on Earth: North America, South America, Europe, Asia, Africa, Australia, and Antarctica.", "isCorrect": true },
      { "text": "5", "rationale": "Explanation: While there are 5 major oceans, there are 7 continents.", "isCorrect": false },
      { "text": "50", "rationale": "Explanation: There are 50 states in the United States, but only 7 continents in the world.", "isCorrect": false },
      { "text": "3", "rationale": "Explanation: There are far more than 3 continents covering the globe.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 8,
    "question": "Bridgeport, Connecticut, and the entire United States are all located on which continent?",
    "hint": "Our continent is located in the Northern and Western Hemispheres and has 'America' in its name.",
    "answerOptions": [
      { "text": "North America", "rationale": "Explanation: The United States, Canada, and Mexico are all located on the continent of North America.", "isCorrect": true },
      { "text": "South America", "rationale": "Explanation: South America is a different continent located entirely south of the United States.", "isCorrect": false },
      { "text": "Europe", "rationale": "Explanation: Europe is a continent located across the Atlantic Ocean from us.", "isCorrect": false },
      { "text": "Africa", "rationale": "Explanation: Africa is the second-largest continent in the world, located across the Atlantic Ocean.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 9,
    "question": "Which state shares a long land border with Connecticut to the West?",
    "hint": "This state is famous for having the largest city in the United States, which shares its name.",
    "answerOptions": [
      { "text": "New York", "rationale": "Explanation: New York borders Connecticut all along its western side.", "isCorrect": true },
      { "text": "Massachusetts", "rationale": "Explanation: Massachusetts is the state located to our north.", "isCorrect": false },
      { "text": "Pennsylvania", "rationale": "Explanation: Pennsylvania is located further west, past New Jersey and New York.", "isCorrect": false },
      { "text": "Vermont", "rationale": "Explanation: Vermont is located to our north, sitting on top of Massachusetts.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 10,
    "question": "What is the imaginary line that runs horizontally around the middle of the Earth, dividing it into the Northern and Southern Hemispheres?",
    "hint": "It sounds like a word that means 'equal', because it sits exactly halfway between the North and South Poles.",
    "answerOptions": [
      { "text": "The Equator", "rationale": "Explanation: This line of latitude is at zero degrees and splits the globe perfectly into northern and southern halves.", "isCorrect": true },
      { "text": "The Prime Meridian", "rationale": "Explanation: This imaginary line divides the Earth into the Eastern and Western Hemispheres, running vertically.", "isCorrect": false },
      { "text": "The Tropic of Cancer", "rationale": "Explanation: This is a line of latitude north of the middle line.", "isCorrect": false },
      { "text": "The Axis", "rationale": "Explanation: This is the imaginary pole that the Earth spins around.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 11,
    "question": "Which major ocean borders the eastern coast of the United States, including the region where Connecticut is located?",
    "hint": "Many early explorers crossed this ocean from Europe to reach North America.",
    "answerOptions": [
      { "text": "The Atlantic Ocean", "rationale": "Explanation: The East Coast of the United States faces this vast ocean, which separates the Americas from Europe and Africa.", "isCorrect": true },
      { "text": "The Pacific Ocean", "rationale": "Explanation: This ocean borders the West Coast of the United States.", "isCorrect": false },
      { "text": "The Indian Ocean", "rationale": "Explanation: This ocean is located primarily between Africa, Asia, and Australia.", "isCorrect": false },
      { "text": "The Arctic Ocean", "rationale": "Explanation: This freezing ocean surrounds the North Pole.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 12,
    "question": "Which of the following statements best describes the difference between a map and a globe?",
    "hint": "Think about the shape of the Earth and which tool represents it most accurately.",
    "answerOptions": [
      { "text": "A map is a flat drawing, while a globe is a 3D sphere.", "rationale": "Explanation: Maps are flat representations that often distort size or shape, while globes represent the true spherical shape of the Earth.", "isCorrect": true },
      { "text": "A map shows only water, while a globe shows only land.", "rationale": "Explanation: Both tools are designed to show a combination of landmasses and bodies of water.", "isCorrect": false },
      { "text": "A globe is always bigger than a map.", "rationale": "Explanation: Size varies greatly for both.", "isCorrect": false },
      { "text": "A globe can fold up to fit in your pocket, but a map cannot.", "rationale": "Explanation: Maps fold, globes usually do not.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 13,
    "question": "Which of these places correctly lists a city, then a state, and then a country?",
    "hint": "Start with where you go to school, then the wider area around it, and finally the whole nation.",
    "answerOptions": [
      { "text": "Bridgeport, Connecticut, United States", "rationale": "Explanation: Bridgeport is a city, which is inside the state of Connecticut, which is inside the country of the United States.", "isCorrect": true },
      { "text": "Connecticut, Bridgeport, United States", "rationale": "Explanation: This option incorrectly lists the state before the city.", "isCorrect": false },
      { "text": "United States, Connecticut, Bridgeport", "rationale": "Explanation: This option goes in reverse order: from country to state to city.", "isCorrect": false },
      { "text": "Bridgeport, United States, Connecticut", "rationale": "Explanation: This option incorrectly places the country between the city and the state.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 14,
    "question": "Which large country borders the United States directly to the North?",
    "hint": "This country is famous for maple syrup and ice hockey.",
    "answerOptions": [
      { "text": "Canada", "rationale": "Explanation: Canada is the massive country located right above the northern border of the United States.", "isCorrect": true },
      { "text": "Mexico", "rationale": "Explanation: Mexico is located to the south of the United States.", "isCorrect": false },
      { "text": "England", "rationale": "Explanation: England is located across the Atlantic Ocean in Europe.", "isCorrect": false },
      { "text": "Brazil", "rationale": "Explanation: Brazil is located far to the south in South America.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 15,
    "question": "Which country borders the United States directly to the South?",
    "hint": "This country shares a southern border with states like Texas, Arizona, and California.",
    "answerOptions": [
      { "text": "Mexico", "rationale": "Explanation: Mexico is the country located directly below the southern border of the United States.", "isCorrect": true },
      { "text": "Canada", "rationale": "Explanation: Canada is located to the north of the United States.", "isCorrect": false },
      { "text": "Cuba", "rationale": "Explanation: Cuba is an island nation south of Florida, but it does not share a land border with the US.", "isCorrect": false },
      { "text": "Spain", "rationale": "Explanation: Spain is located across the ocean in Europe.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 16,
    "question": "How many individual states make up the entire United States of America today?",
    "hint": "It is a nice, even number that is exactly half of one hundred.",
    "answerOptions": [
      { "text": "50 states", "rationale": "Explanation: There are exactly 50 states that make up the United States.", "isCorrect": true },
      { "text": "48 states", "rationale": "Explanation: There are 48 connected states, but 50 states total.", "isCorrect": false },
      { "text": "13 states", "rationale": "Explanation: There were 13 original colonies, but today there are 50 states.", "isCorrect": false },
      { "text": "52 states", "rationale": "Explanation: There are 52 weeks in a year, but only 50 states.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 17,
    "question": "Which two states are NOT physically connected to the other 48 states?",
    "hint": "One is an island in the ocean, and the other is way up north attached to Canada.",
    "answerOptions": [
      { "text": "Hawaii and Alaska", "rationale": "Explanation: Hawaii is a series of islands in the Pacific Ocean, and Alaska is attached to Canada. Neither touches the other 48 states.", "isCorrect": true },
      { "text": "Florida and Texas", "rationale": "Explanation: Both of these states are connected to the main body of the country.", "isCorrect": false },
      { "text": "California and New York", "rationale": "Explanation: These states are on opposite coasts, but they are both attached to the rest of the country.", "isCorrect": false },
      { "text": "Connecticut and Rhode Island", "rationale": "Explanation: These two states are right next to each other in New England.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 18,
    "question": "Which massive river is known as the longest and most important river for transportation in the United States?",
    "hint": "It is often called the 'Big Muddy' and flows south into the Gulf of Mexico.",
    "answerOptions": [
      { "text": "The Mississippi River", "rationale": "Explanation: The Mississippi River is a major 'highway' for boats and runs through the center of the country.", "isCorrect": true },
      { "text": "The Connecticut River", "rationale": "Explanation: This is the longest river in New England, but not the whole country.", "isCorrect": false },
      { "text": "The Nile River", "rationale": "Explanation: This is the longest river in the world, located in Africa.", "isCorrect": false },
      { "text": "The Amazon River", "rationale": "Explanation: This is a massive river located in South America.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 19,
    "question": "How many major oceans are there on Earth?",
    "hint": "Think of the Pacific, Atlantic, Indian, Arctic, and Southern oceans.",
    "answerOptions": [
      { "text": "5", "rationale": "Explanation: There are 5 major oceans that cover most of the Earth's surface.", "isCorrect": true },
      { "text": "7", "rationale": "Explanation: There are 7 continents, but only 5 major oceans.", "isCorrect": false },
      { "text": "3", "rationale": "Explanation: There are more than 3 oceans on Earth.", "isCorrect": false },
      { "text": "50", "rationale": "Explanation: There are 50 states, not 50 oceans!", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 20,
    "question": "What city do we live in?",
    "hint": "Our city is called the Park City. It is next to the water.",
    "answerOptions": [
      { "text": "Bridgeport", "rationale": "Explanation: We live in Bridgeport, Connecticut. It is the biggest city in our state.", "isCorrect": true },
      { "text": "Hartford", "rationale": "Explanation: Hartford is the capital of Connecticut. We do not live there.", "isCorrect": false },
      { "text": "New Haven", "rationale": "Explanation: New Haven is a city near us, but we do not live there.", "isCorrect": false },
      { "text": "New York City", "rationale": "Explanation: New York City is in the state of New York. We live in Connecticut.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 21,
    "question": "What is the full name of our country?",
    "hint": "Our country has 50 states. They are joined together, or united.",
    "answerOptions": [
      { "text": "The United States of America", "rationale": "Explanation: The full name of our country is the United States of America. For short, we say the U.S. or the USA.", "isCorrect": true },
      { "text": "North America", "rationale": "Explanation: North America is our continent, not our country. Canada and Mexico are on it too.", "isCorrect": false },
      { "text": "Connecticut", "rationale": "Explanation: Connecticut is our state. It is one of the 50 states in our country.", "isCorrect": false },
      { "text": "The United Kingdom", "rationale": "Explanation: The United Kingdom is a different country. It is far away in Europe.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 22,
    "question": "What is the difference between a city and a town?",
    "hint": "Think about how many people live there. Bridgeport is a city. Trumbull, next to us, is a town.",
    "answerOptions": [
      { "text": "A city is bigger and has more people. A town is smaller and has fewer people.", "rationale": "Explanation: Cities are big places with lots of people, like Bridgeport. Towns are smaller places with fewer people, like Trumbull.", "isCorrect": true },
      { "text": "A town is bigger and has more people. A city is smaller and has fewer people.", "rationale": "Explanation: This is backwards. A city is bigger than a town.", "isCorrect": false },
      { "text": "A city has houses, but a town has no houses.", "rationale": "Explanation: Cities and towns both have houses where people live.", "isCorrect": false },
      { "text": "A town is a kind of country.", "rationale": "Explanation: A town is much smaller than a country. A country has many cities and towns in it.", "isCorrect": false }
    ]
  }
];
