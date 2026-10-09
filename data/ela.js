const elaData = [
  {
    "questionNumber": 1,
    "question": "A noun is a person, place, thing, or idea. Which word is a noun?",
    "hint": "Do not pick an action word. Do not pick a word that tells what something is like.",
    "answerOptions": [
      { "text": "Library", "rationale": "Explanation: A library is a place. So it is a noun.", "isCorrect": true },
      { "text": "Running", "rationale": "Explanation: Running is an action. It is a verb.", "isCorrect": false },
      { "text": "Blue", "rationale": "Explanation: Blue tells what color a thing is. It is an adjective.", "isCorrect": false },
      { "text": "Quickly", "rationale": "Explanation: Quickly tells how you do a thing. It is an adverb.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 2,
    "question": "A verb is an action word. Which word in this sentence is a verb? 'The happy dog jumped over the fence.'",
    "hint": "Ask: What did the dog do?",
    "answerOptions": [
      { "text": "Happy", "rationale": "Explanation: Happy tells about the dog. It is an adjective.", "isCorrect": false },
      { "text": "Jumped", "rationale": "Explanation: Jumped is what the dog did. It is an action, so it is a verb.", "isCorrect": true },
      { "text": "Dog", "rationale": "Explanation: A dog is an animal. It is a noun.", "isCorrect": false },
      { "text": "Fence", "rationale": "Explanation: A fence is a thing. It is a noun.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 3,
    "question": "What is the main idea of a story?",
    "hint": "Think of a big umbrella. It covers the whole book.",
    "answerOptions": [
      { "text": "The name of the person who wrote the book.", "rationale": "Explanation: That is the author.", "isCorrect": false },
      { "text": "The small facts on each page.", "rationale": "Explanation: Those are details. They help the main idea.", "isCorrect": false },
      { "text": "What the story is mostly about.", "rationale": "Explanation: The main idea is the big point of the whole story.", "isCorrect": true },
      { "text": "Where the story takes place.", "rationale": "Explanation: That is the setting.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 4,
    "question": "A fact is true. You can check it. Which sentence is a fact?",
    "hint": "Could some people say 'No, I do not think so'? Then it is not a fact.",
    "answerOptions": [
      { "text": "Apples are the best fruit.", "rationale": "Explanation: This is an opinion. Some kids like grapes more.", "isCorrect": false },
      { "text": "School is the most fun place to be.", "rationale": "Explanation: This is an opinion. Not all kids feel the same way.", "isCorrect": false },
      { "text": "Birds have feathers.", "rationale": "Explanation: This is a fact. You can look at a bird and see it is true.", "isCorrect": true },
      { "text": "Pizza is the best dinner.", "rationale": "Explanation: This is an opinion. It is about what you like to eat.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 5,
    "question": "What are synonyms?",
    "hint": "Think of 'small' and 'tiny.' How are they alike?",
    "answerOptions": [
      { "text": "Words that mean the same thing, or close to it.", "rationale": "Explanation: Synonyms mean the same thing. Small and tiny are synonyms.", "isCorrect": true },
      { "text": "Words that mean the opposite.", "rationale": "Explanation: Those are antonyms, like hot and cold.", "isCorrect": false },
      { "text": "Words that sound the same but are spelled in a different way.", "rationale": "Explanation: Those are homophones, like see and sea.", "isCorrect": false },
      { "text": "Words that have just one letter.", "rationale": "Explanation: Synonyms are about what words mean, not how long they are.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 6,
    "question": "What are antonyms?",
    "hint": "Think of 'hot' and 'cold.' How are they different?",
    "answerOptions": [
      { "text": "Words that are spelled the same way.", "rationale": "Explanation: That is not what antonyms are. Antonyms are about meaning.", "isCorrect": false },
      { "text": "Words that mean the opposite.", "rationale": "Explanation: Antonyms are opposites, like big and small.", "isCorrect": true },
      { "text": "Words that sound like a noise, like 'buzz.'", "rationale": "Explanation: Those are sound words. They are not antonyms.", "isCorrect": false },
      { "text": "Words that rhyme.", "rationale": "Explanation: Rhyming words sound the same at the end, like cat and hat. They do not mean the opposite.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 7,
    "question": "A simile compares two things. It uses the word 'like' or 'as.' Which one is a simile?",
    "hint": "Look for 'like' or 'as' in each one.",
    "answerOptions": [
      { "text": "The stars are diamonds in the sky.", "rationale": "Explanation: This compares stars and diamonds. But it does not use 'like' or 'as.' It is a metaphor.", "isCorrect": false },
      { "text": "The classroom was a zoo.", "rationale": "Explanation: This does not use 'like' or 'as.' It is a metaphor.", "isCorrect": false },
      { "text": "He is as brave as a lion.", "rationale": "Explanation: This uses 'as' to compare a man to a lion. It is a simile.", "isCorrect": true },
      { "text": "The wind sang in the trees.", "rationale": "Explanation: This does not use 'like' or 'as.' It makes the wind act like a person.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 8,
    "question": "What is the setting of a story?",
    "hint": "A story is about a dragon. He lives in a dark cave long ago. Is that who, where, or what?",
    "answerOptions": [
      { "text": "The problem the character must fix.", "rationale": "Explanation: That is the conflict.", "isCorrect": false },
      { "text": "The people or animals in the story.", "rationale": "Explanation: Those are the characters.", "isCorrect": false },
      { "text": "Where and when the story takes place.", "rationale": "Explanation: The setting tells the place and the time of the story.", "isCorrect": true },
      { "text": "The very end of the story.", "rationale": "Explanation: That is the ending. It is not the setting.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 9,
    "question": "What is the plot of a story?",
    "hint": "Think about the beginning, the middle, and the end.",
    "answerOptions": [
      { "text": "The things that happen in the story, in order.", "rationale": "Explanation: The plot is what happens, from start to end.", "isCorrect": true },
      { "text": "The picture on the front of the book.", "rationale": "Explanation: That is the cover. It is not the plot.", "isCorrect": false },
      { "text": "The person who reads the book.", "rationale": "Explanation: That is the reader. It is not the plot.", "isCorrect": false },
      { "text": "A list of hard words at the back of the book.", "rationale": "Explanation: That is called a glossary.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 10,
    "question": "What does it mean to make an inference?",
    "hint": "Think: Clues in the book + What you know = Inference.",
    "answerOptions": [
      { "text": "To read the story as fast as you can.", "rationale": "Explanation: Reading fast is not an inference.", "isCorrect": false },
      { "text": "To copy a sentence from the book.", "rationale": "Explanation: That is a quote. You are not figuring anything out.", "isCorrect": false },
      { "text": "To guess the end of a story before you start.", "rationale": "Explanation: That is a prediction.", "isCorrect": false },
      { "text": "To use clues and what you know to figure out what the book does not say.", "rationale": "Explanation: An inference is a smart guess. You use clues to find what is not said.", "isCorrect": true }
    ]
  },
  {
    "questionNumber": 11,
    "question": "What are context clues?",
    "hint": "Think of a detective. A detective finds clues to solve a puzzle.",
    "answerOptions": [
      { "text": "Help to find a book in the library.", "rationale": "Explanation: That is not it. Context clues help you with words.", "isCorrect": false },
      { "text": "Hints in the words around a hard word. They help you know what it means.", "rationale": "Explanation: Context clues are hints near a new word. They help you learn what it means.", "isCorrect": true },
      { "text": "The names of the people in a mystery story.", "rationale": "Explanation: Context clues can be in any story. They are not names.", "isCorrect": false },
      { "text": "Rules for how to use a dictionary.", "rationale": "Explanation: Context clues help you when you do not have a dictionary.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 12,
    "question": "An adjective is a word that tells what something is like. Which word in this sentence is an adjective? 'The fluffy cat napped on the rug.'",
    "hint": "Ask: What kind of cat is it?",
    "answerOptions": [
      { "text": "Cat", "rationale": "Explanation: A cat is an animal. It is a noun.", "isCorrect": false },
      { "text": "Fluffy", "rationale": "Explanation: Fluffy tells what the cat is like. It is an adjective.", "isCorrect": true },
      { "text": "Napped", "rationale": "Explanation: Napped is what the cat did. It is a verb.", "isCorrect": false },
      { "text": "On", "rationale": "Explanation: On tells where the cat is. It does not tell what the cat is like.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 13,
    "question": "An adverb tells how someone does an action. Which word in this sentence is an adverb? 'The student walked quietly down the hall.'",
    "hint": "Ask: How did the student walk? Many adverbs end in 'ly.'",
    "answerOptions": [
      { "text": "Quietly", "rationale": "Explanation: Quietly tells how the student walked. It is an adverb.", "isCorrect": true },
      { "text": "Walked", "rationale": "Explanation: Walked is the action. It is a verb.", "isCorrect": false },
      { "text": "Student", "rationale": "Explanation: A student is a person. It is a noun.", "isCorrect": false },
      { "text": "Hall", "rationale": "Explanation: A hall is a place. It is a noun.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 14,
    "question": "What is a supporting detail?",
    "hint": "Think of a table. The legs hold up the top. The top is the main idea.",
    "answerOptions": [
      { "text": "A fact or example that tells more about the main idea.", "rationale": "Explanation: Details hold up the main idea. They tell you more about it.", "isCorrect": true },
      { "text": "The first sentence of each paragraph.", "rationale": "Explanation: The first sentence often tells the main idea. It is not always a detail.", "isCorrect": false },
      { "text": "The title of the story.", "rationale": "Explanation: The title is the name of the story. It is not a detail.", "isCorrect": false },
      { "text": "Any fact, even one that has nothing to do with the main idea.", "rationale": "Explanation: A supporting detail must help the main idea. A fact that does not help is not one.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 15,
    "question": "An opinion is what a person thinks or feels. Not all people agree. Which sentence is an opinion?",
    "hint": "Could some people disagree with it? Then it is an opinion.",
    "answerOptions": [
      { "text": "Connecticut is a state.", "rationale": "Explanation: This is a fact. You can check it on a map.", "isCorrect": false },
      { "text": "The sun comes up in the east.", "rationale": "Explanation: This is a fact. You can see it each morning.", "isCorrect": false },
      { "text": "Yellow is the prettiest color for a flower.", "rationale": "Explanation: This is an opinion. Some people like red or pink more.", "isCorrect": true },
      { "text": "There are 12 months in a year.", "rationale": "Explanation: This is a fact. You can count them on a calendar.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 16,
    "question": "What are homophones?",
    "hint": "Think of 'eight' and 'ate.' Say them out loud.",
    "answerOptions": [
      { "text": "Words that mean the opposite.", "rationale": "Explanation: Those are antonyms, like hot and cold.", "isCorrect": false },
      { "text": "Words that sound the same but are spelled in a different way and mean different things.", "rationale": "Explanation: Homophones sound alike, like sea and see. But they are spelled and used in a different way.", "isCorrect": true },
      { "text": "Words that mean the same thing.", "rationale": "Explanation: Those are synonyms, like small and tiny.", "isCorrect": false },
      { "text": "Words you can only say on the phone.", "rationale": "Explanation: No. Homophones are just a kind of word.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 17,
    "question": "What is the conflict in a story?",
    "hint": "Think: What goes wrong for the character?",
    "answerOptions": [
      { "text": "The place where the story happens.", "rationale": "Explanation: That is the setting.", "isCorrect": false },
      { "text": "The main problem the characters must face.", "rationale": "Explanation: The conflict is the big problem. The story is about how it gets fixed.", "isCorrect": true },
      { "text": "The list of people in the story.", "rationale": "Explanation: Those are the characters.", "isCorrect": false },
      { "text": "The first sentence of the book.", "rationale": "Explanation: That is the start of the book. It is not the conflict.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 18,
    "question": "What is the theme of a story?",
    "hint": "Think: What does the author want you to learn?",
    "answerOptions": [
      { "text": "The name of the main character.", "rationale": "Explanation: That is a name. It is not the theme.", "isCorrect": false },
      { "text": "The big lesson or message of the story.", "rationale": "Explanation: A theme is a lesson, like 'be kind' or 'never give up.'", "isCorrect": true },
      { "text": "How many pages are in the book.", "rationale": "Explanation: That is how long the book is. It is not the theme.", "isCorrect": false },
      { "text": "The kind of paper the book is made of.", "rationale": "Explanation: The paper has nothing to do with what the story means.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 19,
    "question": "What does point of view mean in a story?",
    "hint": "Does the story use 'I' and 'me'? Or does it use 'he' and 'she'?",
    "answerOptions": [
      { "text": "Who is telling the story.", "rationale": "Explanation: Point of view tells who tells the story. It can be a character ('I') or someone outside ('he' or 'she').", "isCorrect": true },
      { "text": "How much the book costs.", "rationale": "Explanation: That is the price.", "isCorrect": false },
      { "text": "The glasses the author wears to see.", "rationale": "Explanation: No. That is not what point of view means in reading.", "isCorrect": false },
      { "text": "What the reader thinks of the book.", "rationale": "Explanation: Point of view is about who tells the story. It is not about the reader.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 20,
    "question": "What is a compound word?",
    "hint": "Think of 'rain' + 'bow' = 'rainbow.'",
    "answerOptions": [
      { "text": "A long word that is hard to spell.", "rationale": "Explanation: Long words are not always compound words.", "isCorrect": false },
      { "text": "A word with two or more beats, like 'happy.'", "rationale": "Explanation: 'Happy' has two beats. But it is not made of two words.", "isCorrect": false },
      { "text": "Two small words put together to make one new word.", "rationale": "Explanation: 'Pancake' and 'sunflower' are compound words.", "isCorrect": true },
      { "text": "A word that starts with a capital letter.", "rationale": "Explanation: Names start with a capital letter. That does not make them compound words.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 21,
    "question": "A prefix is a part added to the start of a word. The word 'preheat' has the prefix 'pre.' What does 'pre' mean?",
    "hint": "Think about what you do to an oven when you bake.",
    "answerOptions": [
      { "text": "Before", "rationale": "Explanation: 'Pre' means before. To preheat is to heat before you bake.", "isCorrect": true },
      { "text": "Again", "rationale": "Explanation: The prefix 're' means again, like in 'redo.'", "isCorrect": false },
      { "text": "Not, or the opposite", "rationale": "Explanation: The prefix 'un' means not, like in 'unhappy.'", "isCorrect": false },
      { "text": "Slowly", "rationale": "Explanation: 'Pre' is about time. It is not about how fast.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 22,
    "question": "A suffix is a part added to the end of a word. The word 'painful' has the suffix 'ful.' What does 'painful' mean?",
    "hint": "Think of 'helpful.' A helpful kid gives lots of help.",
    "answerOptions": [
      { "text": "Full of pain", "rationale": "Explanation: The suffix 'ful' means full of. Painful means full of pain.", "isCorrect": true },
      { "text": "With no pain", "rationale": "Explanation: The suffix 'less' means with no, like in 'painless.'", "isCorrect": false },
      { "text": "Had pain in the past", "rationale": "Explanation: The suffix 'ed' tells about the past. 'Ful' does not.", "isCorrect": false },
      { "text": "Likes to have pain", "rationale": "Explanation: 'Ful' tells how much. It does not tell what you like.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 23,
    "question": "Who is the person telling the story to the reader?",
    "hint": "This voice tells you what happens and how the characters feel.",
    "answerOptions": [
      { "text": "The Narrator", "rationale": "Explanation: The narrator is the voice that tells the story.", "isCorrect": true },
      { "text": "The Author", "rationale": "Explanation: The author wrote the book. The narrator is the voice that tells it.", "isCorrect": false },
      { "text": "The Illustrator", "rationale": "Explanation: The illustrator drew the pictures.", "isCorrect": false },
      { "text": "The Audience", "rationale": "Explanation: The audience is the people who read or watch.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 24,
    "question": "A play is a story that actors act out. How is a play different from a story in a book?",
    "hint": "Think about what the actors say. Think about how they know where to move.",
    "answerOptions": [
      { "text": "A play has lines for each actor to say and notes on how to move. A book story has paragraphs.", "rationale": "Explanation: A play is made to be acted out. So it has lines to say (dialogue) and notes for actors (stage directions).", "isCorrect": true },
      { "text": "A play never has any characters.", "rationale": "Explanation: Plays and stories both have characters.", "isCorrect": false },
      { "text": "A play is written in secret code.", "rationale": "Explanation: No. Plays use plain words so actors can read them.", "isCorrect": false },
      { "text": "A story is always longer than a play.", "rationale": "Explanation: Length is not the difference. The difference is how they are written.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 25,
    "question": "Which kind of word must ALWAYS start with a capital letter?",
    "hint": "Think about proper nouns. A proper noun names one special person, place, or thing.",
    "answerOptions": [
      { "text": "Names of people, places, and days of the week", "rationale": "Explanation: Names like Joe, Bridgeport, and Monday are proper nouns. They always get a capital letter.", "isCorrect": true },
      { "text": "Each word in a sentence", "rationale": "Explanation: No. Only the first word and names get a capital letter.", "isCorrect": false },
      { "text": "Words for animals, like 'dog'", "rationale": "Explanation: 'Dog' does not get a capital letter. It only gets one at the start of a sentence.", "isCorrect": false },
      { "text": "Action words, like 'run' and 'jump'", "rationale": "Explanation: Action words do not get a capital letter. They only get one at the start of a sentence.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 26,
    "question": "What does a pronoun do in a sentence?",
    "hint": "Think of words like 'he,' 'she,' 'it,' and 'they.'",
    "answerOptions": [
      { "text": "It takes the place of a noun. Then we do not say the same name again and again.", "rationale": "Explanation: We do not have to say 'Mr. O' five times. We can say 'he.'", "isCorrect": true },
      { "text": "It tells how big or small a thing is.", "rationale": "Explanation: Words that tell what a thing is like are adjectives.", "isCorrect": false },
      { "text": "It shows an action.", "rationale": "Explanation: Action words are verbs.", "isCorrect": false },
      { "text": "It joins two sentences.", "rationale": "Explanation: Words like 'and' or 'but' join sentences. They are not pronouns.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 27,
    "question": "How is a 'Right There' question different from an inference question?",
    "hint": "One answer is hidden. The other one is right in front of you!",
    "answerOptions": [
      { "text": "A 'Right There' answer is in the words of the book. For an inference, you must use clues.", "rationale": "Explanation: 'Right There' means you can point to the answer in the book.", "isCorrect": true },
      { "text": "An inference answer is always on the first page.", "rationale": "Explanation: No. You can make an inference on any page.", "isCorrect": false },
      { "text": "A 'Right There' question is only for math.", "rationale": "Explanation: No. These are both kinds of reading questions.", "isCorrect": false },
      { "text": "They are the same thing.", "rationale": "Explanation: No. For one you find the words. For the other you figure it out from clues.", "isCorrect": false }
    ]
  }
];
