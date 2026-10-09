const geographyData = [
  {
    "questionNumber": 1,
    "question": "The capital is the city where state leaders work. What is the capital of Connecticut?",
    "hint": "This city is on the Connecticut River.",
    "answerOptions": [
      { "text": "Hartford", "rationale": "Explanation: Hartford is the capital. Our state leaders make laws there.", "isCorrect": true },
      { "text": "Bridgeport", "rationale": "Explanation: Bridgeport is our biggest city. But it is not the capital.", "isCorrect": false },
      { "text": "New Haven", "rationale": "Explanation: New Haven is a big city. But it is not the capital.", "isCorrect": false },
      { "text": "Stamford", "rationale": "Explanation: Stamford is a big city. But it is not the capital.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 2,
    "question": "How is a city different from a state?",
    "hint": "Which one is bigger? Which one fits inside the other?",
    "answerOptions": [
      { "text": "A city is small. A state is big and has many cities and towns in it.", "rationale": "Explanation: A state is much bigger. Bridgeport is one city in the state of Connecticut.", "isCorrect": true },
      { "text": "A state is small. A city is big and has many states in it.", "rationale": "Explanation: This is backwards. A state is bigger than a city.", "isCorrect": false },
      { "text": "A city has only buildings. A state has only parks and trees.", "rationale": "Explanation: Cities and states both have buildings, roads, parks, and trees.", "isCorrect": false },
      { "text": "A president runs a city. A king runs a state.", "rationale": "Explanation: A mayor runs a city. A governor runs a state. We have no king.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 3,
    "question": "You are in Connecticut. You go north. What state do you come to?",
    "hint": "The capital of this state is Boston.",
    "answerOptions": [
      { "text": "Massachusetts", "rationale": "Explanation: Massachusetts is right above Connecticut, to the north.", "isCorrect": true },
      { "text": "New York", "rationale": "Explanation: New York is to the west of Connecticut.", "isCorrect": false },
      { "text": "Rhode Island", "rationale": "Explanation: Rhode Island is to the east of Connecticut.", "isCorrect": false },
      { "text": "New Jersey", "rationale": "Explanation: New Jersey does not touch Connecticut.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 4,
    "question": "What state is to the east of Connecticut?",
    "hint": "It is the smallest state in our country.",
    "answerOptions": [
      { "text": "Rhode Island", "rationale": "Explanation: Rhode Island is right next to us, to the east.", "isCorrect": true },
      { "text": "Massachusetts", "rationale": "Explanation: Massachusetts is to the north.", "isCorrect": false },
      { "text": "New York", "rationale": "Explanation: New York is to the west.", "isCorrect": false },
      { "text": "Maine", "rationale": "Explanation: Maine is far away. It does not touch Connecticut.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 5,
    "question": "Our beaches are on the south side of Connecticut. What is the name of the water there?",
    "hint": "Go to the beach at Seaside Park. This is the water you see.",
    "answerOptions": [
      { "text": "Long Island Sound", "rationale": "Explanation: Long Island Sound is the water by our beaches. Long Island, New York, is on the other side.", "isCorrect": true },
      { "text": "The Atlantic Ocean", "rationale": "Explanation: The Sound flows into the Atlantic Ocean. But our beaches are on the Sound.", "isCorrect": false },
      { "text": "The Connecticut River", "rationale": "Explanation: The Connecticut River flows into the Sound. It is a river, not the water by our beaches.", "isCorrect": false },
      { "text": "Lake Erie", "rationale": "Explanation: Lake Erie is a lake. It is far to the west.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 6,
    "question": "What is the capital of the whole United States?",
    "hint": "The President lives and works in this city, in the White House.",
    "answerOptions": [
      { "text": "Washington, D.C.", "rationale": "Explanation: Washington, D.C. is our country's capital. The President lives there.", "isCorrect": true },
      { "text": "New York City", "rationale": "Explanation: New York City is our biggest city. But it is not the capital.", "isCorrect": false },
      { "text": "Philadelphia", "rationale": "Explanation: Philadelphia was the capital long ago. Now the capital is Washington, D.C.", "isCorrect": false },
      { "text": "Hartford", "rationale": "Explanation: Hartford is the capital of our state, not the whole country.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 7,
    "question": "A continent is a very big piece of land. How many continents are on Earth?",
    "hint": "Count them: North America, South America, Europe, Asia, Africa, Australia, Antarctica.",
    "answerOptions": [
      { "text": "7", "rationale": "Explanation: There are 7 continents: North America, South America, Europe, Asia, Africa, Australia, and Antarctica.", "isCorrect": true },
      { "text": "5", "rationale": "Explanation: There are 5 oceans. But there are 7 continents.", "isCorrect": false },
      { "text": "50", "rationale": "Explanation: There are 50 states in our country. But there are 7 continents.", "isCorrect": false },
      { "text": "3", "rationale": "Explanation: There are more than 3 continents.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 8,
    "question": "What continent do we live on?",
    "hint": "The United States, Canada, and Mexico are all on it.",
    "answerOptions": [
      { "text": "North America", "rationale": "Explanation: We live on North America. The United States, Canada, and Mexico are on it.", "isCorrect": true },
      { "text": "South America", "rationale": "Explanation: South America is a different continent. It is south of us.", "isCorrect": false },
      { "text": "Europe", "rationale": "Explanation: Europe is across the Atlantic Ocean from us.", "isCorrect": false },
      { "text": "Africa", "rationale": "Explanation: Africa is across the Atlantic Ocean from us.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 9,
    "question": "What state is to the west of Connecticut?",
    "hint": "The biggest city in our country is in this state.",
    "answerOptions": [
      { "text": "New York", "rationale": "Explanation: New York is right next to us, to the west.", "isCorrect": true },
      { "text": "Massachusetts", "rationale": "Explanation: Massachusetts is to the north.", "isCorrect": false },
      { "text": "Pennsylvania", "rationale": "Explanation: Pennsylvania is farther west. It does not touch Connecticut.", "isCorrect": false },
      { "text": "Vermont", "rationale": "Explanation: Vermont is farther north. It does not touch Connecticut.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 10,
    "question": "There is a pretend line around the middle of the Earth. It cuts the Earth into a north half and a south half. What is it called?",
    "hint": "It is just as far from the North Pole as it is from the South Pole.",
    "answerOptions": [
      { "text": "The Equator", "rationale": "Explanation: The Equator goes around the middle of the Earth. It cuts the Earth into north and south halves.", "isCorrect": true },
      { "text": "The Prime Meridian", "rationale": "Explanation: The Prime Meridian goes from the North Pole to the South Pole. It cuts the Earth into east and west halves.", "isCorrect": false },
      { "text": "The Tropic of Cancer", "rationale": "Explanation: The Tropic of Cancer is a line north of the middle.", "isCorrect": false },
      { "text": "The Axis", "rationale": "Explanation: The axis is a pretend pole. The Earth spins around it.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 11,
    "question": "What ocean is on the east side of the United States?",
    "hint": "Long ago, people sailed across this ocean from Europe.",
    "answerOptions": [
      { "text": "The Atlantic Ocean", "rationale": "Explanation: The Atlantic Ocean is on our east side. Europe is on the other side of it.", "isCorrect": true },
      { "text": "The Pacific Ocean", "rationale": "Explanation: The Pacific Ocean is on the west side of our country.", "isCorrect": false },
      { "text": "The Indian Ocean", "rationale": "Explanation: The Indian Ocean is far away, near Africa, Asia, and Australia.", "isCorrect": false },
      { "text": "The Arctic Ocean", "rationale": "Explanation: The Arctic Ocean is very cold. It is at the North Pole.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 12,
    "question": "How is a map different from a globe?",
    "hint": "The Earth is round like a ball. Which one is round too?",
    "answerOptions": [
      { "text": "A map is flat. A globe is round like a ball.", "rationale": "Explanation: A map is flat like paper. A globe is round, just like the Earth.", "isCorrect": true },
      { "text": "A map shows only water. A globe shows only land.", "rationale": "Explanation: Maps and globes both show land and water.", "isCorrect": false },
      { "text": "A globe is always bigger than a map.", "rationale": "Explanation: Maps and globes come in many sizes.", "isCorrect": false },
      { "text": "You can fold a globe and put it in your pocket.", "rationale": "Explanation: You can fold a map. You cannot fold a globe.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 13,
    "question": "Which one is in the right order: city, then state, then country?",
    "hint": "Start small. Then go bigger. Then go biggest.",
    "answerOptions": [
      { "text": "Bridgeport, Connecticut, United States", "rationale": "Explanation: Bridgeport is the city. Connecticut is the state. The United States is the country.", "isCorrect": true },
      { "text": "Connecticut, Bridgeport, United States", "rationale": "Explanation: This puts the state first. The city should come first.", "isCorrect": false },
      { "text": "United States, Connecticut, Bridgeport", "rationale": "Explanation: This is backwards. It starts with the country.", "isCorrect": false },
      { "text": "Bridgeport, United States, Connecticut", "rationale": "Explanation: This puts the country in the middle. The state should be in the middle.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 14,
    "question": "What country is to the north of the United States?",
    "hint": "This country is known for hockey and maple syrup.",
    "answerOptions": [
      { "text": "Canada", "rationale": "Explanation: Canada is right above our country, to the north.", "isCorrect": true },
      { "text": "Mexico", "rationale": "Explanation: Mexico is to the south of our country.", "isCorrect": false },
      { "text": "England", "rationale": "Explanation: England is far away, across the ocean in Europe.", "isCorrect": false },
      { "text": "Brazil", "rationale": "Explanation: Brazil is far to the south, in South America.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 15,
    "question": "What country is to the south of the United States?",
    "hint": "Texas and California touch this country.",
    "answerOptions": [
      { "text": "Mexico", "rationale": "Explanation: Mexico is right below our country, to the south.", "isCorrect": true },
      { "text": "Canada", "rationale": "Explanation: Canada is to the north of our country.", "isCorrect": false },
      { "text": "Cuba", "rationale": "Explanation: Cuba is an island near Florida. It does not touch our land.", "isCorrect": false },
      { "text": "Spain", "rationale": "Explanation: Spain is far away, across the ocean in Europe.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 16,
    "question": "How many states are in the United States?",
    "hint": "Look at our flag. It has one star for each state.",
    "answerOptions": [
      { "text": "50 states", "rationale": "Explanation: There are 50 states. Our flag has 50 stars, one for each state.", "isCorrect": true },
      { "text": "48 states", "rationale": "Explanation: 48 states touch each other. But there are 50 in all.", "isCorrect": false },
      { "text": "13 states", "rationale": "Explanation: Long ago there were 13 colonies. Now there are 50 states.", "isCorrect": false },
      { "text": "52 states", "rationale": "Explanation: There are 52 weeks in a year. But there are 50 states.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 17,
    "question": "Most of our states touch each other. Which two states do NOT touch the others?",
    "hint": "One is a group of islands in the ocean. One is far up north, next to Canada.",
    "answerOptions": [
      { "text": "Hawaii and Alaska", "rationale": "Explanation: Hawaii is islands in the Pacific Ocean. Alaska is next to Canada. They do not touch the other 48 states.", "isCorrect": true },
      { "text": "Florida and Texas", "rationale": "Explanation: Florida and Texas both touch other states.", "isCorrect": false },
      { "text": "California and New York", "rationale": "Explanation: California and New York are far apart. But they both touch other states.", "isCorrect": false },
      { "text": "Connecticut and Rhode Island", "rationale": "Explanation: Connecticut and Rhode Island touch each other.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 18,
    "question": "This big river runs down the middle of our country. Boats carry lots of things on it. What river is it?",
    "hint": "It flows south into the Gulf of Mexico.",
    "answerOptions": [
      { "text": "The Mississippi River", "rationale": "Explanation: The Mississippi River runs through the middle of our country. Many boats use it.", "isCorrect": true },
      { "text": "The Connecticut River", "rationale": "Explanation: The Connecticut River is in our state. It is not in the middle of the country.", "isCorrect": false },
      { "text": "The Nile River", "rationale": "Explanation: The Nile River is far away, in Africa.", "isCorrect": false },
      { "text": "The Amazon River", "rationale": "Explanation: The Amazon River is far away, in South America.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 19,
    "question": "How many oceans are on Earth?",
    "hint": "Count them: Pacific, Atlantic, Indian, Arctic, Southern.",
    "answerOptions": [
      { "text": "5", "rationale": "Explanation: There are 5 oceans: Pacific, Atlantic, Indian, Arctic, and Southern.", "isCorrect": true },
      { "text": "7", "rationale": "Explanation: There are 7 continents. But there are 5 oceans.", "isCorrect": false },
      { "text": "3", "rationale": "Explanation: There are more than 3 oceans.", "isCorrect": false },
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
