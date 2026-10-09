const civicsData = [
  {
    "questionNumber": 1,
    "question": "Each city has a leader. People vote for this leader. What do we call the leader of a city like Bridgeport?",
    "hint": "This person runs the city. The office is at City Hall.",
    "answerOptions": [
      { "text": "The Mayor", "rationale": "Explanation: A Mayor is the leader of a city or town.", "isCorrect": true },
      { "text": "The Governor", "rationale": "Explanation: A Governor leads a whole state, not one city.", "isCorrect": false },
      { "text": "The President", "rationale": "Explanation: The President leads the whole country, not one city.", "isCorrect": false },
      { "text": "The Senator", "rationale": "Explanation: A Senator helps make laws for the whole country. A Senator does not run a city.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 2,
    "question": "Each state has a leader. People vote for this leader. What do we call the leader of a state like Connecticut?",
    "hint": "This person works in Hartford. Hartford is our state capital.",
    "answerOptions": [
      { "text": "The Governor", "rationale": "Explanation: The Governor is the leader of a state.", "isCorrect": true },
      { "text": "The Mayor", "rationale": "Explanation: A Mayor leads just one city, not a whole state.", "isCorrect": false },
      { "text": "The President", "rationale": "Explanation: The President leads the whole country, not one state.", "isCorrect": false },
      { "text": "The Judge", "rationale": "Explanation: A Judge works in a court. A Judge does not lead a state.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 3,
    "question": "People vote for one leader for the whole United States. What is this leader called?",
    "hint": "This person lives in the White House.",
    "answerOptions": [
      { "text": "The President", "rationale": "Explanation: The President is the leader of the whole country.", "isCorrect": true },
      { "text": "The King", "rationale": "Explanation: The United States does not have a king.", "isCorrect": false },
      { "text": "The Governor", "rationale": "Explanation: A Governor leads just one state. There are 50 states.", "isCorrect": false },
      { "text": "The Mayor", "rationale": "Explanation: A Mayor leads just one city.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 4,
    "question": "Our country has one most important paper. It tells how our government works. What is it called?",
    "hint": "It starts with the words \"We the People.\"",
    "answerOptions": [
      { "text": "The Constitution", "rationale": "Explanation: The Constitution is the top law of our country. It sets the rules for the government.", "isCorrect": true },
      { "text": "The Declaration of Independence", "rationale": "Explanation: This paper said we were free from Great Britain. It does not set the rules for the government.", "isCorrect": false },
      { "text": "The Bill of Rights", "rationale": "Explanation: The Bill of Rights is one part of the Constitution. It is not the whole thing.", "isCorrect": false },
      { "text": "The Emancipation Proclamation", "rationale": "Explanation: Abraham Lincoln signed this paper. It does not set the rules for the government.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 5,
    "question": "Our government is split into parts. Each part is called a branch. This way, no one has too much power. How many branches are there?",
    "hint": "One branch makes laws. One branch carries out laws. One branch has the courts.",
    "answerOptions": [
      { "text": "Three", "rationale": "Explanation: There are three branches. They are the Legislative, Executive, and Judicial branches.", "isCorrect": true },
      { "text": "Two", "rationale": "Explanation: There are two big political parties. But there are three branches.", "isCorrect": false },
      { "text": "Four", "rationale": "Explanation: There are only three branches, not four.", "isCorrect": false },
      { "text": "Fifty", "rationale": "Explanation: There are 50 states. But there are only three branches.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 6,
    "question": "Laws are rules for everyone. Which branch of the government writes new laws and votes on them?",
    "hint": "This branch is Congress. Congress has two parts: the Senate and the House of Representatives.",
    "answerOptions": [
      { "text": "The Legislative Branch", "rationale": "Explanation: \"Legislate\" means to make laws. This branch is Congress. It writes the laws.", "isCorrect": true },
      { "text": "The Executive Branch", "rationale": "Explanation: This branch carries out the laws. It does not write them.", "isCorrect": false },
      { "text": "The Judicial Branch", "rationale": "Explanation: This branch tells what the laws mean. It does not write them.", "isCorrect": false },
      { "text": "The Military Branch", "rationale": "Explanation: The military is not a branch of government. It does not make laws.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 7,
    "question": "The President is the leader of one branch. Which branch does the President lead?",
    "hint": "This branch makes sure the laws are carried out.",
    "answerOptions": [
      { "text": "The Executive Branch", "rationale": "Explanation: The President is the head of the Executive Branch.", "isCorrect": true },
      { "text": "The Legislative Branch", "rationale": "Explanation: Congress is this branch. The President does not lead it.", "isCorrect": false },
      { "text": "The Judicial Branch", "rationale": "Explanation: The Supreme Court leads this branch, not the President.", "isCorrect": false },
      { "text": "The State Branch", "rationale": "Explanation: There is no State Branch. Each state has its own government.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 8,
    "question": "The Judicial Branch is made of courts. What is the name of the top court in the United States?",
    "hint": "It has nine judges. They are called Justices.",
    "answerOptions": [
      { "text": "The Supreme Court", "rationale": "Explanation: The Supreme Court is the top court in the country.", "isCorrect": true },
      { "text": "The People's Court", "rationale": "Explanation: This is a TV show. It is not a real government court.", "isCorrect": false },
      { "text": "The State Court", "rationale": "Explanation: Each state has its own courts. They are not the top court in the country.", "isCorrect": false },
      { "text": "The Presidential Court", "rationale": "Explanation: The President does not have a court.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 9,
    "question": "A ballot is a paper where you mark your choice. People fill out a ballot to pick their leaders. What do we call this?",
    "hint": "This most often happens on a Tuesday in November.",
    "answerOptions": [
      { "text": "Voting in an Election", "rationale": "Explanation: In an election, people vote. That is how they pick their leaders.", "isCorrect": true },
      { "text": "Taking a Census", "rationale": "Explanation: A census is when the government counts all the people. It does not pick leaders.", "isCorrect": false },
      { "text": "Paying Taxes", "rationale": "Explanation: Taxes are money we pay to the government. They do not pick leaders.", "isCorrect": false },
      { "text": "Signing a Petition", "rationale": "Explanation: A petition asks for a change. It does not pick leaders.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 10,
    "question": "How old do you have to be to vote for President?",
    "hint": "It is the age when the law says you are an adult.",
    "answerOptions": [
      { "text": "18 years old", "rationale": "Explanation: The Constitution says citizens who are 18 or older can vote.", "isCorrect": true },
      { "text": "16 years old", "rationale": "Explanation: At 16, you can learn to drive in most states. But you cannot vote yet.", "isCorrect": false },
      { "text": "21 years old", "rationale": "Explanation: The voting age used to be 21. Then it was changed to 18.", "isCorrect": false },
      { "text": "25 years old", "rationale": "Explanation: You must be 25 to be in the House of Representatives. You can vote before that.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 11,
    "question": "What is the birthday of the United States?",
    "hint": "We have fireworks and cookouts on this day. It is in the summer.",
    "answerOptions": [
      { "text": "July 4, 1776", "rationale": "Explanation: On July 4, 1776, leaders said yes to the Declaration of Independence. That is when our country was born.", "isCorrect": true },
      { "text": "December 25, 1776", "rationale": "Explanation: December 25 is Christmas. It is not our country's birthday.", "isCorrect": false },
      { "text": "January 1, 1800", "rationale": "Explanation: January 1 is New Year's Day. It is not our country's birthday.", "isCorrect": false },
      { "text": "October 31, 1776", "rationale": "Explanation: October 31 is Halloween. It is not our country's birthday.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 12,
    "question": "Our country was born in 1776. How old did it turn in 2026?",
    "hint": "Take 2026. Subtract 1776.",
    "answerOptions": [
      { "text": "250 years old", "rationale": "Explanation: 2026 minus 1776 is 250. The United States has its 250th birthday in 2026!", "isCorrect": true },
      { "text": "200 years old", "rationale": "Explanation: The United States turned 200 back in 1976.", "isCorrect": false },
      { "text": "100 years old", "rationale": "Explanation: The United States turned 100 back in 1876.", "isCorrect": false },
      { "text": "300 years old", "rationale": "Explanation: The United States will not turn 300 until 2076.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 13,
    "question": "Who was the very first President of the United States?",
    "hint": "He was a famous army leader. His face is on the one-dollar bill and the quarter.",
    "answerOptions": [
      { "text": "George Washington", "rationale": "Explanation: George Washington was the first President. He served from 1789 to 1797.", "isCorrect": true },
      { "text": "Abraham Lincoln", "rationale": "Explanation: Abraham Lincoln was the 16th President, not the first.", "isCorrect": false },
      { "text": "Thomas Jefferson", "rationale": "Explanation: Thomas Jefferson was the 3rd President, not the first.", "isCorrect": false },
      { "text": "John Adams", "rationale": "Explanation: John Adams was the 2nd President, not the first.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 14,
    "question": "The Mayor is the leader of our city. Who is the Mayor of Bridgeport now?",
    "hint": "He has been mayor of Bridgeport for many years. He won the mayor race in 2024.",
    "answerOptions": [
      { "text": "Joe Ganim", "rationale": "Explanation: Joe Ganim is the Mayor of Bridgeport now.", "isCorrect": true },
      { "text": "Ned Lamont", "rationale": "Explanation: Ned Lamont is the Governor of Connecticut. He is not the Mayor.", "isCorrect": false },
      { "text": "Joe Biden", "rationale": "Explanation: Joe Biden was the President before. He was never Mayor of Bridgeport.", "isCorrect": false },
      { "text": "John Gomes", "rationale": "Explanation: John Gomes ran for Mayor. But he did not win.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 15,
    "question": "The Governor is the leader of our state. Who is the Governor of Connecticut now?",
    "hint": "He has been governor since 2019. He works in Hartford.",
    "answerOptions": [
      { "text": "Ned Lamont", "rationale": "Explanation: Ned Lamont is the Governor of Connecticut now.", "isCorrect": true },
      { "text": "Joe Ganim", "rationale": "Explanation: Joe Ganim is the Mayor of Bridgeport. He is not the Governor.", "isCorrect": false },
      { "text": "Chris Murphy", "rationale": "Explanation: Chris Murphy is a US Senator for Connecticut. He is not the Governor.", "isCorrect": false },
      { "text": "Richard Blumenthal", "rationale": "Explanation: Richard Blumenthal is a US Senator for Connecticut. He is not the Governor.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 16,
    "question": "Who is the President of the United States now?",
    "hint": "He won the vote in 2024. He started the job in 2025.",
    "answerOptions": [
      { "text": "Donald Trump", "rationale": "Explanation: Donald Trump is the President of the United States now.", "isCorrect": true },
      { "text": "Joe Biden", "rationale": "Explanation: Joe Biden was the President before. He is not the President now.", "isCorrect": false },
      { "text": "Barack Obama", "rationale": "Explanation: Barack Obama was the 44th President. That was years ago.", "isCorrect": false },
      { "text": "George Washington", "rationale": "Explanation: George Washington was the very first President. That was long ago.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 17,
    "question": "A term is the time a leader serves after one win. How many years is one term for a President?",
    "hint": "It is the same as the number of years in high school.",
    "answerOptions": [
      { "text": "4 years", "rationale": "Explanation: One term is 4 years. A President can win two terms at most. That is 8 years.", "isCorrect": true },
      { "text": "8 years", "rationale": "Explanation: 8 years is two terms. One term is just 4 years.", "isCorrect": false },
      { "text": "2 years", "rationale": "Explanation: People in the House of Representatives serve 2 years. A President serves 4.", "isCorrect": false },
      { "text": "6 years", "rationale": "Explanation: US Senators serve 6 years. A President serves 4.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 18,
    "question": "What is a law?",
    "hint": "Think of the rules in your class. Now think of rules for a whole city, state, or country.",
    "answerOptions": [
      { "text": "A rule made by the government that everyone must follow.", "rationale": "Explanation: Laws keep people safe. They protect our rights.", "isCorrect": true },
      { "text": "An idea that people can choose to ignore.", "rationale": "Explanation: You cannot ignore a law. If you break a law, there is a cost.", "isCorrect": false },
      { "text": "A promise made by a leader who wants your vote.", "rationale": "Explanation: A promise is not a law. Only lawmakers can make it a law.", "isCorrect": false },
      { "text": "A secret code used by the army.", "rationale": "Explanation: Laws are not secret. Everyone can read them.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 19,
    "question": "An amendment is a change added to the Constitution. The first 10 amendments protect things like free speech. What do we call them?",
    "hint": "It is a list of freedoms. It was added to the Constitution.",
    "answerOptions": [
      { "text": "The Bill of Rights", "rationale": "Explanation: The Bill of Rights is the first 10 amendments. It protects the freedoms of every American.", "isCorrect": true },
      { "text": "The Rules of Law", "rationale": "Explanation: That is not the name. The first 10 amendments are the Bill of Rights.", "isCorrect": false },
      { "text": "The Declaration of Independence", "rationale": "Explanation: This is a different paper. It is not part of the Constitution.", "isCorrect": false },
      { "text": "The Emancipation Proclamation", "rationale": "Explanation: This paper helped free enslaved people. It is not the first 10 amendments.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 20,
    "question": "A city makes its own laws too. Who makes the laws for Bridgeport?",
    "hint": "This is a group of people from our city. People vote for them. They work with the Mayor.",
    "answerOptions": [
      { "text": "The City Council", "rationale": "Explanation: The City Council makes the laws for our city.", "isCorrect": true },
      { "text": "The Supreme Court", "rationale": "Explanation: The Supreme Court is a court for the whole country. It does not make city laws.", "isCorrect": false },
      { "text": "The President", "rationale": "Explanation: The President leads the whole country. The President does not make city laws.", "isCorrect": false },
      { "text": "The US Military", "rationale": "Explanation: The military keeps the country safe. It does not make city laws.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 21,
    "question": "The United States flag has 50 white stars. What do the stars stand for?",
    "hint": "Think of how many parts make up our country today.",
    "answerOptions": [
      { "text": "The 50 states.", "rationale": "Explanation: Each star stands for one state. There are 50 states.", "isCorrect": true },
      { "text": "The 50 first colonies.", "rationale": "Explanation: There were only 13 first colonies, not 50. The stripes stand for them.", "isCorrect": false },
      { "text": "The 50 presidents.", "rationale": "Explanation: The stars do not stand for presidents. They stand for the states.", "isCorrect": false },
      { "text": "The 50 years it took to build the country.", "rationale": "Explanation: The stars do not stand for years. Our country is much older than 50 years!", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 22,
    "question": "Long ago, England ruled our land. Then leaders wrote a famous paper. It said we were now a free country. What is this paper called?",
    "hint": "We remember this paper every year on the Fourth of July.",
    "answerOptions": [
      { "text": "The Declaration of Independence", "rationale": "Explanation: This paper told the world we were free from Great Britain.", "isCorrect": true },
      { "text": "The US Constitution", "rationale": "Explanation: The Constitution set the rules for the new government. It came later.", "isCorrect": false },
      { "text": "The Bill of Rights", "rationale": "Explanation: The Bill of Rights protects our freedoms. It came after we were already free.", "isCorrect": false },
      { "text": "The Emancipation Proclamation", "rationale": "Explanation: This paper was written much later, during the Civil War.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 23,
    "question": "The United States flag has 13 red and white stripes. What do the stripes stand for?",
    "hint": "Think of the very start of our country.",
    "answerOptions": [
      { "text": "The 13 first colonies.", "rationale": "Explanation: A colony is land ruled by another country. Our country began as 13 colonies. Each stripe stands for one.", "isCorrect": true },
      { "text": "The 13 states we have today.", "rationale": "Explanation: We have 50 states today, not 13.", "isCorrect": false },
      { "text": "The 13 presidents.", "rationale": "Explanation: We have had many more than 13 presidents.", "isCorrect": false },
      { "text": "The 13 stars.", "rationale": "Explanation: There are 50 stars on the flag, not 13.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 24,
    "question": "Congress makes our country's laws. It meets in a building in Washington, D.C. What is this building called?",
    "hint": "It has a big white dome on top.",
    "answerOptions": [
      { "text": "The U.S. Capitol Building", "rationale": "Explanation: Congress works in the Capitol. That is where they write and vote on laws.", "isCorrect": true },
      { "text": "The White House", "rationale": "Explanation: The President lives in the White House. Congress does not meet there.", "isCorrect": false },
      { "text": "The Supreme Court", "rationale": "Explanation: Judges work here. They tell what the laws mean.", "isCorrect": false },
      { "text": "The Lincoln Memorial", "rationale": "Explanation: This place honors Abraham Lincoln. No laws are made there.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 25,
    "question": "Where does the President of the United States live and work?",
    "hint": "Its address is 1600 Pennsylvania Avenue. It is in Washington, D.C.",
    "answerOptions": [
      { "text": "The White House", "rationale": "Explanation: The President lives and works in the White House. Every President but George Washington has lived there.", "isCorrect": true },
      { "text": "The U.S. Capitol", "rationale": "Explanation: Congress works in the Capitol. The President does not live there.", "isCorrect": false },
      { "text": "The Pentagon", "rationale": "Explanation: The Pentagon is where our military leaders work. The President does not live there.", "isCorrect": false },
      { "text": "The Empire State Building", "rationale": "Explanation: This is a tall building in New York City. The President does not live there.", "isCorrect": false }
    ]
  }
];
