const civicsData = [
  // ... Questions 1 through 22 remain exactly the same ...
  {
    "questionNumber": 1,
    "question": "What title is given to the person elected to be the leader of a city, like Bridgeport?",
    "hint": "This person is in charge of running the local city government.",
    "answerOptions": [
      { "text": "The Mayor", "rationale": "Explanation: A Mayor is the leader of a city or town government.", "isCorrect": true },
      { "text": "The Governor", "rationale": "Explanation: A Governor is the leader of a whole state.", "isCorrect": false },
      { "text": "The President", "rationale": "Explanation: The President is the leader of the entire country.", "isCorrect": false },
      { "text": "The Senator", "rationale": "Explanation: A Senator represents the state in Congress.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 2,
    "question": "What title is given to the person elected to be the leader of an entire state, like Connecticut?",
    "hint": "This person lives and works near the state capitol building in Hartford.",
    "answerOptions": [
      { "text": "The Governor", "rationale": "Explanation: The Governor is the head of the executive branch for a state.", "isCorrect": true },
      { "text": "The Mayor", "rationale": "Explanation: The Mayor is only in charge of a single city.", "isCorrect": false },
      { "text": "The President", "rationale": "Explanation: The President leads the whole country.", "isCorrect": false },
      { "text": "The Judge", "rationale": "Explanation: A Judge works in the courts.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 3,
    "question": "Who is the elected leader of the entire United States of America?",
    "hint": "This person lives in the White House.",
    "answerOptions": [
      { "text": "The President", "rationale": "Explanation: The President is the leader of the national government.", "isCorrect": true },
      { "text": "The King", "rationale": "Explanation: The United States does not have a king.", "isCorrect": false },
      { "text": "The Governor", "rationale": "Explanation: A Governor only leads one of the 50 states.", "isCorrect": false },
      { "text": "The Mayor", "rationale": "Explanation: A Mayor only leads a city.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 4,
    "question": "What do we call the most important document in the United States, which sets the rules for how our government works?",
    "hint": "It begins with the famous words, 'We the People...'",
    "answerOptions": [
      { "text": "The Constitution", "rationale": "Explanation: The US Constitution is the supreme law of the land.", "isCorrect": true },
      { "text": "The Declaration of Independence", "rationale": "Explanation: This document declared independence from Great Britain.", "isCorrect": false },
      { "text": "The Bill of Rights", "rationale": "Explanation: The Bill of Rights is a very important part of the Constitution, but not the whole document.", "isCorrect": false },
      { "text": "The Emancipation Proclamation", "rationale": "Explanation: This was an important document signed by Abraham Lincoln.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 5,
    "question": "The United States government is split into how many 'branches' or parts so that no one person has too much power?",
    "hint": "Think of a triangle.",
    "answerOptions": [
      { "text": "Three", "rationale": "Explanation: Our government is split into three branches: the Legislative, the Executive, and the Judicial branches.", "isCorrect": true },
      { "text": "Two", "rationale": "Explanation: There are two main political parties, but three branches of government.", "isCorrect": false },
      { "text": "Four", "rationale": "Explanation: There are only three branches.", "isCorrect": false },
      { "text": "Fifty", "rationale": "Explanation: There are 50 states.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 6,
    "question": "Which branch of the national government is responsible for writing and voting on new laws?",
    "hint": "This branch is made up of Congress (the Senate and the House of Representatives).",
    "answerOptions": [
      { "text": "The Legislative Branch", "rationale": "Explanation: 'Legislate' means to make laws. The Legislative Branch (Congress) writes them.", "isCorrect": true },
      { "text": "The Executive Branch", "rationale": "Explanation: This branch carries out the laws.", "isCorrect": false },
      { "text": "The Judicial Branch", "rationale": "Explanation: This branch decides what laws mean.", "isCorrect": false },
      { "text": "The Military Branch", "rationale": "Explanation: The military is not a branch of government that makes laws.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 7,
    "question": "Which branch of the government does the President of the United States lead?",
    "hint": "This branch is responsible for carrying out the laws.",
    "answerOptions": [
      { "text": "The Executive Branch", "rationale": "Explanation: The President is the head of the Executive Branch.", "isCorrect": true },
      { "text": "The Legislative Branch", "rationale": "Explanation: Congress leads this branch.", "isCorrect": false },
      { "text": "The Judicial Branch", "rationale": "Explanation: The Supreme Court leads this branch.", "isCorrect": false },
      { "text": "The State Branch", "rationale": "Explanation: States have their own governments.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 8,
    "question": "What is the name of the highest court in the Judicial Branch of the United States?",
    "hint": "It has nine judges, called Justices.",
    "answerOptions": [
      { "text": "The Supreme Court", "rationale": "Explanation: The Supreme Court is the most powerful court in the country.", "isCorrect": true },
      { "text": "The People's Court", "rationale": "Explanation: This is a TV show.", "isCorrect": false },
      { "text": "The State Court", "rationale": "Explanation: States have their own courts.", "isCorrect": false },
      { "text": "The Presidential Court", "rationale": "Explanation: The President does not have a court.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 9,
    "question": "What do we call the process where citizens of a country fill out a ballot to choose their leaders?",
    "hint": "This usually happens on a Tuesday in November.",
    "answerOptions": [
      { "text": "Voting in an Election", "rationale": "Explanation: Elections are how people in a democracy pick who will represent them.", "isCorrect": true },
      { "text": "Taking a Census", "rationale": "Explanation: A census is when the government counts how many people live in the country.", "isCorrect": false },
      { "text": "Paying Taxes", "rationale": "Explanation: Taxes are money paid to the government.", "isCorrect": false },
      { "text": "Signing a Petition", "rationale": "Explanation: A petition is a request for change.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 10,
    "question": "How old do you have to be to vote for the President in the United States?",
    "hint": "It is the age when you are legally considered an adult.",
    "answerOptions": [
      { "text": "18 years old", "rationale": "Explanation: The 26th Amendment guarantees that US citizens 18 or older can vote.", "isCorrect": true },
      { "text": "16 years old", "rationale": "Explanation: At 16, you can get a driver's license in most states, but not vote.", "isCorrect": false },
      { "text": "21 years old", "rationale": "Explanation: This used to be the voting age, but it was lowered.", "isCorrect": false },
      { "text": "25 years old", "rationale": "Explanation: You must be 25 to be in the House of Representatives.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 11,
    "question": "When is the United States' official birthday?",
    "hint": "We celebrate this day with fireworks and barbecues in the summer.",
    "answerOptions": [
      { "text": "July 4, 1776", "rationale": "Explanation: The Declaration of Independence was officially signed on July 4, 1776, marking the birth of the nation.", "isCorrect": true },
      { "text": "December 25, 1776", "rationale": "Explanation: December 25th is Christmas.", "isCorrect": false },
      { "text": "January 1, 1800", "rationale": "Explanation: January 1st is New Year's Day.", "isCorrect": false },
      { "text": "October 31, 1776", "rationale": "Explanation: October 31st is Halloween.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 12,
    "question": "How old is the United States turning this year in 2026?",
    "hint": "Subtract 1776 from 2026.",
    "answerOptions": [
      { "text": "250 years old", "rationale": "Explanation: In 2026, the United States celebrates its 250th birthday, which is also called the semiquincentennial!", "isCorrect": true },
      { "text": "200 years old", "rationale": "Explanation: The US turned 200 back in the year 1976.", "isCorrect": false },
      { "text": "100 years old", "rationale": "Explanation: The US turned 100 in the year 1876.", "isCorrect": false },
      { "text": "300 years old", "rationale": "Explanation: The US won't turn 300 until the year 2076.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 13,
    "question": "Who was the very first President of the United States?",
    "hint": "He was a famous general whose face is on the one-dollar bill and the quarter.",
    "answerOptions": [
      { "text": "George Washington", "rationale": "Explanation: George Washington served as the first President of the United States from 1789 to 1797.", "isCorrect": true },
      { "text": "Abraham Lincoln", "rationale": "Explanation: Abraham Lincoln was the 16th President.", "isCorrect": false },
      { "text": "Thomas Jefferson", "rationale": "Explanation: Thomas Jefferson was the 3rd President.", "isCorrect": false },
      { "text": "John Adams", "rationale": "Explanation: John Adams was the 2nd President.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 14,
    "question": "Who is the current Mayor of our city, Bridgeport?",
    "hint": "His first name is Joe.",
    "answerOptions": [
      { "text": "Joe Ganim", "rationale": "Explanation: Joe Ganim is the current mayor of Bridgeport.", "isCorrect": true },
      { "text": "Ned Lamont", "rationale": "Explanation: Ned Lamont is the Governor of Connecticut.", "isCorrect": false },
      { "text": "Joe Biden", "rationale": "Explanation: Joe Biden is a recent US President.", "isCorrect": false },
      { "text": "John Gomes", "rationale": "Explanation: John Gomes was a candidate for mayor in the recent election, but he did not win.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 15,
    "question": "Who is the current Governor of our state, Connecticut?",
    "hint": "His first name is Ned.",
    "answerOptions": [
      { "text": "Ned Lamont", "rationale": "Explanation: Ned Lamont is the current governor of Connecticut.", "isCorrect": true },
      { "text": "Joe Ganim", "rationale": "Explanation: Joe Ganim is the Mayor of Bridgeport.", "isCorrect": false },
      { "text": "Chris Murphy", "rationale": "Explanation: Chris Murphy is a US Senator for Connecticut.", "isCorrect": false },
      { "text": "Richard Blumenthal", "rationale": "Explanation: Richard Blumenthal is a US Senator for Connecticut.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 16,
    "question": "Who is the current President of the United States?",
    "hint": "He was elected in 2024 and took office in 2025.",
    "answerOptions": [
      { "text": "Donald Trump", "rationale": "Explanation: Donald Trump is the current President of the United States.", "isCorrect": true },
      { "text": "Joe Biden", "rationale": "Explanation: Joe Biden was the previous President.", "isCorrect": false },
      { "text": "Barack Obama", "rationale": "Explanation: Barack Obama was the 44th President.", "isCorrect": false },
      { "text": "George Washington", "rationale": "Explanation: George Washington was the very first President.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 17,
    "question": "How many years does a US President serve in one single term after being elected?",
    "hint": "This is the same number of years you spend in high school.",
    "answerOptions": [
      { "text": "4 years", "rationale": "Explanation: A President serves a 4-year term. They can be elected for a maximum of two terms (8 years total).", "isCorrect": true },
      { "text": "8 years", "rationale": "Explanation: 8 years is the maximum amount of time they can serve if they win two elections, but one term is 4 years.", "isCorrect": false },
      { "text": "2 years", "rationale": "Explanation: Members of the House of Representatives serve 2-year terms.", "isCorrect": false },
      { "text": "6 years", "rationale": "Explanation: US Senators serve 6-year terms.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 18,
    "question": "What is a 'law'?",
    "hint": "Think about the rules of a classroom, but for a whole city, state, or country.",
    "answerOptions": [
      { "text": "A rule made by the government that everyone in a society must follow.", "rationale": "Explanation: Laws keep people safe and protect our rights.", "isCorrect": true },
      { "text": "A suggestion that people can choose to ignore.", "rationale": "Explanation: Laws are not suggestions; breaking them has consequences.", "isCorrect": false },
      { "text": "A promise made by a politician.", "rationale": "Explanation: Promises don't become laws until Congress passes them.", "isCorrect": false },
      { "text": "A secret code used by the military.", "rationale": "Explanation: Laws are public rules.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 19,
    "question": "What do we call the first 10 amendments to the US Constitution, which protect things like freedom of speech?",
    "hint": "It guarantees your rights as an American citizen.",
    "answerOptions": [
      { "text": "The Bill of Rights", "rationale": "Explanation: The Bill of Rights protects the personal freedoms of every American.", "isCorrect": true },
      { "text": "The Rules of Law", "rationale": "Explanation: The specific name is the Bill of Rights.", "isCorrect": false },
      { "text": "The Declaration of Independence", "rationale": "Explanation: This is a different document.", "isCorrect": false },
      { "text": "The Emancipation Proclamation", "rationale": "Explanation: This document freed enslaved people.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 20,
    "question": "Who is responsible for passing local laws, called ordinances, right here in Bridgeport?",
    "hint": "This is a group of local people elected to work with the Mayor.",
    "answerOptions": [
      { "text": "The City Council", "rationale": "Explanation: A City Council makes local rules and laws for a specific city.", "isCorrect": true },
      { "text": "The Supreme Court", "rationale": "Explanation: The Supreme Court handles national issues.", "isCorrect": false },
      { "text": "The President", "rationale": "Explanation: The President does not make local rules.", "isCorrect": false },
      { "text": "The US Military", "rationale": "Explanation: The military defends the country.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 21,
    "question": "What do the 50 white stars on the United States flag represent?",
    "hint": "Think about how many parts make up our entire country today.",
    "answerOptions": [
      { "text": "The 50 states.", "rationale": "Explanation: Each star represents one of the 50 states that make up the United States of America.", "isCorrect": true },
      { "text": "The 50 original colonies.", "rationale": "Explanation: There were only 13 original colonies (represented by the stripes), not 50.", "isCorrect": false },
      { "text": "The 50 presidents.", "rationale": "Explanation: The number of presidents changes, but the stars represent the states.", "isCorrect": false },
      { "text": "The 50 years it took to build the country.", "rationale": "Explanation: The country is much older than 50 years!", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 22,
    "question": "What famous document was written to declare that the United States was breaking away from English control to become a free country?",
    "hint": "We celebrate the signing of this document every year on the 4th of July.",
    "answerOptions": [
      { "text": "The Declaration of Independence", "rationale": "Explanation: The Declaration of Independence announced to the world that the original colonies were now free from British rule.", "isCorrect": true },
      { "text": "The US Constitution", "rationale": "Explanation: The Constitution created the rules for the new government, but the Declaration is what made them free.", "isCorrect": false },
      { "text": "The Bill of Rights", "rationale": "Explanation: The Bill of Rights protects personal freedoms, but it came after the country was already free.", "isCorrect": false },
      { "text": "The Emancipation Proclamation", "rationale": "Explanation: This document was written much later during the Civil War.", "isCorrect": false }
    ]
  },
  // --- NEW ADDITIONS ---
  {
    "questionNumber": 23,
    "question": "What do the 13 red and white stripes on the United States flag represent?",
    "hint": "Think about the very beginning of the country.",
    "answerOptions": [
      { "text": "The 13 original colonies.", "rationale": "Explanation: The stripes represent the 13 original colonies that first declared independence.", "isCorrect": true },
      { "text": "The 13 states we have today.", "rationale": "Explanation: We have 50 states today, not 13.", "isCorrect": false },
      { "text": "The 13 presidents.", "rationale": "Explanation: We have had many more than 13 presidents.", "isCorrect": false },
      { "text": "The 13 stars.", "rationale": "Explanation: There are 50 stars on the flag, not 13.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 24,
    "question": "In which building in Washington, D.C., does the U.S. Congress meet to make laws?",
    "hint": "It has a large white dome on top.",
    "answerOptions": [
      { "text": "The U.S. Capitol Building", "rationale": "Explanation: The Capitol is where the Senate and the House of Representatives work to write and vote on laws.", "isCorrect": true },
      { "text": "The White House", "rationale": "Explanation: The White House is where the President lives, not where laws are made.", "isCorrect": false },
      { "text": "The Supreme Court", "rationale": "Explanation: This is where judges work to interpret the law.", "isCorrect": false },
      { "text": "The Lincoln Memorial", "rationale": "Explanation: This is a monument to honor Abraham Lincoln, not a government building for making laws.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 25,
    "question": "Where does the President of the United States live and work?",
    "hint": "It is a famous house located at 1600 Pennsylvania Avenue.",
    "answerOptions": [
      { "text": "The White House", "rationale": "Explanation: The White House has been the home of every US President except George Washington.", "isCorrect": true },
      { "text": "The U.S. Capitol", "rationale": "Explanation: Congress works in the Capitol Building.", "isCorrect": false },
      { "text": "The Pentagon", "rationale": "Explanation: The Pentagon is where the Department of Defense is located.", "isCorrect": false },
      { "text": "The Empire State Building", "rationale": "Explanation: This is a famous skyscraper in New York City.", "isCorrect": false }
    ]
  }
];