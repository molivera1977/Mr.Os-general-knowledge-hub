const elaData = [
  {
    "questionNumber": 1,
    "question": "Which of these words is a NOUN?",
    "hint": "A noun is a person, place, thing, or idea.",
    "answerOptions": [
      { "text": "Library", "rationale": "Explanation: A library is a place, so it is a noun.", "isCorrect": true },
      { "text": "Running", "rationale": "Explanation: Running is an action, which is a verb.", "isCorrect": false },
      { "text": "Blue", "rationale": "Explanation: Blue describes something, so it is an adjective.", "isCorrect": false },
      { "text": "Quickly", "rationale": "Explanation: Quickly describes how an action is done, so it is an adverb.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 2,
    "question": "Which word in this sentence is a VERB? 'The happy dog jumped over the fence.'",
    "hint": "A verb is an action word. It tells you what someone or something is doing.",
    "answerOptions": [
      { "text": "Happy", "rationale": "Explanation: Happy describes the dog, so it is an adjective.", "isCorrect": false },
      { "text": "Jumped", "rationale": "Explanation: Jumped is an action, so it is a verb.", "isCorrect": true },
      { "text": "Dog", "rationale": "Explanation: Dog is a thing, so it is a noun.", "isCorrect": false },
      { "text": "Fence", "rationale": "Explanation: Fence is a thing, so it is a noun.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 3,
    "question": "What is the 'Main Idea' of a story?",
    "hint": "Think of this as the 'big umbrella' that covers everything in the book.",
    "answerOptions": [
      { "text": "The name of the person who wrote the book.", "rationale": "Explanation: This is the author.", "isCorrect": false },
      { "text": "The small facts found on every page.", "rationale": "Explanation: These are called supporting details.", "isCorrect": false },
      { "text": "What the story is mostly or mainly about.", "rationale": "Explanation: The main idea tells the reader the most important point of the story.", "isCorrect": true },
      { "text": "Where the story takes place.", "rationale": "Explanation: This is the setting.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 4,
    "question": "Which sentence is a FACT?",
    "hint": "A fact is a statement that can be proven true with evidence.",
    "answerOptions": [
      { "text": "Apples are the most delicious fruit.", "rationale": "Explanation: This is an opinion because some people might like bananas better.", "isCorrect": false },
      { "text": "School is the most fun place to be.", "rationale": "Explanation: This is an opinion because everyone feels differently about school.", "isCorrect": false },
      { "text": "Most birds have feathers and can fly.", "rationale": "Explanation: This is a fact because we can observe and prove that birds have feathers.", "isCorrect": true },
      { "text": "Pizza is the best dinner.", "rationale": "Explanation: This is an opinion based on taste.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 5,
    "question": "What are 'Synonyms'?",
    "hint": "Think of words like 'small' and 'tiny'.",
    "answerOptions": [
      { "text": "Words that have the same or almost the same meaning.", "rationale": "Explanation: Synonyms are word partners that mean the same thing.", "isCorrect": true },
      { "text": "Words that mean the opposite of each other.", "rationale": "Explanation: These are called antonyms.", "isCorrect": false },
      { "text": "Words that sound the same but are spelled differently.", "rationale": "Explanation: These are called homophones.", "isCorrect": false },
      { "text": "Words that only have one letter.", "rationale": "Explanation: All words are made of letters, but synonyms are about meaning.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 6,
    "question": "What are 'Antonyms'?",
    "hint": "Think of words like 'hot' and 'cold'.",
    "answerOptions": [
      { "text": "Words that are spelled exactly the same way.", "rationale": "Explanation: This does not describe antonyms.", "isCorrect": false },
      { "text": "Words that mean the opposite of each other.", "rationale": "Explanation: Antonyms are 'opposites', like big and small.", "isCorrect": true },
      { "text": "Words that sound like an animal.", "rationale": "Explanation: Words that sound like noises are called onomatopoeia.", "isCorrect": false },
      { "text": "Words that rhyme.", "rationale": "Explanation: Rhyming words sound the same at the end, but antonyms have opposite meanings.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 7,
    "question": "Which of these is a 'Simile'?",
    "hint": "A simile compares two things using the words 'like' or 'as'.",
    "answerOptions": [
      { "text": "The stars are diamonds in the sky.", "rationale": "Explanation: This is a metaphor because it doesn't use 'like' or 'as'.", "isCorrect": false },
      { "text": "The classroom was a zoo.", "rationale": "Explanation: This is a metaphor.", "isCorrect": false },
      { "text": "He is as brave as a lion.", "rationale": "Explanation: This is a simile because it uses 'as' to compare a person to a lion.", "isCorrect": true },
      { "text": "The wind whistled through the trees.", "rationale": "Explanation: This is personification.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 8,
    "question": "What is the 'Setting' of a story?",
    "hint": "If you are reading a story about a dragon in a dark cave, where is the setting?",
    "answerOptions": [
      { "text": "The problem the character must solve.", "rationale": "Explanation: This is the conflict.", "isCorrect": false },
      { "text": "The people or animals in the story.", "rationale": "Explanation: These are the characters.", "isCorrect": false },
      { "text": "Where and when the story takes place.", "rationale": "Explanation: Setting tells the reader the location and the time of the story.", "isCorrect": true },
      { "text": "The very end of the story.", "rationale": "Explanation: This is the resolution.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 9,
    "question": "In a story, what is the 'Plot'?",
    "hint": "Think about the Beginning, Middle, and End.",
    "answerOptions": [
      { "text": "The sequence of events that happen in the story.", "rationale": "Explanation: Plot is the order of everything that happens from start to finish.", "isCorrect": true },
      { "text": "The pictures on the front cover.", "rationale": "Explanation: This is the cover art.", "isCorrect": false },
      { "text": "The person who is reading the book.", "rationale": "Explanation: This is the audience.", "isCorrect": false },
      { "text": "A list of hard words at the back of the book.", "rationale": "Explanation: This is a glossary.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 10,
    "question": "What does it mean to make an 'Inference'?",
    "hint": "Think: Clues from the book + What you already know = Inference.",
    "answerOptions": [
      { "text": "To read the story as fast as you can.", "rationale": "Explanation: Reading fast is called fluency, not inferencing.", "isCorrect": false },
      { "text": "To copy a sentence exactly from the book.", "rationale": "Explanation: This is quoting.", "isCorrect": false },
      { "text": "To guess the ending of a story before you start.", "rationale": "Explanation: This is a prediction.", "isCorrect": false },
      { "text": "To use clues and what you already know to figure out something the author didn't say.", "rationale": "Explanation: Inferencing is 'reading between the lines' to understand hidden meanings.", "isCorrect": true }
    ]
  },
  {
    "questionNumber": 11,
    "question": "What are 'Context Clues'?",
    "hint": "If you find a hard word, look at the words around it for help.",
    "answerOptions": [
      { "text": "Information that helps you find a book in the library.", "rationale": "Explanation: These might be call numbers.", "isCorrect": false },
      { "text": "Hints in the sentence that help you figure out the meaning of a mystery word.", "rationale": "Explanation: Context clues are the 'detective hints' that help you understand new words.", "isCorrect": true },
      { "text": "The names of the characters in a mystery story.", "rationale": "Explanation: Context clues can be in any story, not just mysteries.", "isCorrect": false },
      { "text": "Rules for how to use a dictionary.", "rationale": "Explanation: Context clues help you when you don't have a dictionary!", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 12,
    "question": "Which of these words is an ADJECTIVE? 'The fluffy cat napped on the rug.'",
    "hint": "An adjective is a describing word. It tells you more about a noun.",
    "answerOptions": [
      { "text": "Cat", "rationale": "Explanation: Cat is a noun.", "isCorrect": false },
      { "text": "Fluffy", "rationale": "Explanation: Fluffy describes the cat, so it is an adjective.", "isCorrect": true },
      { "text": "Napped", "rationale": "Explanation: Napped is an action, which is a verb.", "isCorrect": false },
      { "text": "On", "rationale": "Explanation: On is a preposition.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 13,
    "question": "Which of these words is an ADVERB? 'The student walked quietly down the hall.'",
    "hint": "An adverb describes an action. Many adverbs end in '-ly'.",
    "answerOptions": [
      { "text": "Quietly", "rationale": "Explanation: Quietly tells us HOW the student walked, so it is an adverb.", "isCorrect": true },
      { "text": "Walked", "rationale": "Explanation: Walked is a verb.", "isCorrect": false },
      { "text": "Student", "rationale": "Explanation: Student is a noun.", "isCorrect": false },
      { "text": "Hall", "rationale": "Explanation: Hall is a noun.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 14,
    "question": "What is a 'Supporting Detail'?",
    "hint": "Think of these as the 'legs' that hold up the 'table' (Main Idea).",
    "answerOptions": [
      { "text": "A fact or example that proves or explains the main idea.", "rationale": "Explanation: Supporting details give the reader more information about the main idea.", "isCorrect": true },
      { "text": "The first sentence of every paragraph.", "rationale": "Explanation: Not every first sentence is a detail; sometimes it is a topic sentence.", "isCorrect": false },
      { "text": "The title of the story.", "rationale": "Explanation: The title usually hints at the main idea, but it is not a detail.", "isCorrect": false },
      { "text": "A list of the characters' favorite foods.", "rationale": "Explanation: This is only a detail if the story is about their diet!", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 15,
    "question": "Which sentence is an OPINION?",
    "hint": "An opinion is a personal feeling or belief. It cannot be proven true for everyone.",
    "answerOptions": [
      { "text": "Connecticut is a state in the United States.", "rationale": "Explanation: This is a fact that can be proven on a map.", "isCorrect": false },
      { "text": "The sun rises in the East.", "rationale": "Explanation: This is a scientific fact.", "isCorrect": false },
      { "text": "Yellow is the most beautiful color for a flower.", "rationale": "Explanation: This is an opinion because beauty is a personal feeling.", "isCorrect": true },
      { "text": "There are 12 months in one year.", "rationale": "Explanation: This is a fact.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 16,
    "question": "What are 'Homophones'?",
    "hint": "Think of 'eight' and 'ate'.",
    "answerOptions": [
      { "text": "Words that mean the opposite.", "rationale": "Explanation: These are antonyms.", "isCorrect": false },
      { "text": "Words that sound the same but have different meanings and spellings.", "rationale": "Explanation: Homophones are 'sound-alikes' like sea and see.", "isCorrect": true },
      { "text": "Words that rhyme at the end of a poem.", "rationale": "Explanation: Rhyming is different from homophones.", "isCorrect": false },
      { "text": "Words that are only used on the telephone.", "rationale": "Explanation: No, this is just a name for a type of word!", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 17,
    "question": "What does the 'Conflict' in a story mean?",
    "hint": "Think of the 'Big Problem' the character is facing.",
    "answerOptions": [
      { "text": "The place where the story happens.", "rationale": "Explanation: This is the setting.", "isCorrect": false },
      { "text": "The main problem or struggle that the characters must face.", "rationale": "Explanation: Every good story has a conflict that needs to be solved.", "isCorrect": true },
      { "text": "The list of people in the story.", "rationale": "Explanation: This is the cast or characters.", "isCorrect": false },
      { "text": "The very first sentence of the book.", "rationale": "Explanation: This is the 'hook' or introduction.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 18,
    "question": "What is a 'Theme' in a story?",
    "hint": "Think about the 'Lesson' the author wants you to learn.",
    "answerOptions": [
      { "text": "The name of the main character.", "rationale": "Explanation: That is the protagonist.", "isCorrect": false },
      { "text": "The underlying message or life lesson of a story.", "rationale": "Explanation: Common themes are 'be kind' or 'never give up'.", "isCorrect": true },
      { "text": "The total number of pages in the book.", "rationale": "Explanation: This is just the length of the book.", "isCorrect": false },
      { "text": "The type of paper the book is printed on.", "rationale": "Explanation: This has nothing to do with the story's meaning.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 19,
    "question": "What does 'Point of View' mean in reading?",
    "hint": "Is the story being told using 'I' and 'me' or 'he' and 'she'?",
    "answerOptions": [
      { "text": "The perspective from which the story is told.", "rationale": "Explanation: Point of view tells us if the story is first-person or third-person.", "isCorrect": true },
      { "text": "How much the book costs at the store.", "rationale": "Explanation: This is the price.", "isCorrect": false },
      { "text": "The glasses the author wears to see.", "rationale": "Explanation: This is not what it means in Language Arts!", "isCorrect": false },
      { "text": "The opinion of the person reading the book.", "rationale": "Explanation: Point of view refers to the narrator's perspective, not the reader's.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 20,
    "question": "What is a 'Compound Word'?",
    "hint": "Think of 'rain' + 'bow' = 'rainbow'.",
    "answerOptions": [
      { "text": "A very long word that is hard to spell.", "rationale": "Explanation: Long words aren't always compound words.", "isCorrect": false },
      { "text": "A word that has two or more syllables.", "rationale": "Explanation: Many words have multiple syllables but aren't compound.", "isCorrect": false },
      { "text": "Two smaller words joined together to make a new word with a new meaning.", "rationale": "Explanation: Words like 'pancake' and 'sunflower' are compound words.", "isCorrect": true },
      { "text": "A word that is capitalized.", "rationale": "Explanation: These are proper nouns.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 21,
    "question": "What happens to a word's meaning when you add the prefix 'pre-' to the beginning of it, like in the word 'preheat'?",
    "hint": "Think about what you do to an oven before you start baking.",
    "answerOptions": [
      { "text": "It means to do something BEFORE.", "rationale": "Explanation: The prefix 'pre-' always means before.", "isCorrect": true },
      { "text": "It means to do something AGAIN.", "rationale": "Explanation: The prefix 're-' means again.", "isCorrect": false },
      { "text": "It means the opposite of the word.", "rationale": "Explanation: Prefixes like 'un-' or 'dis-' mean the opposite.", "isCorrect": false },
      { "text": "It means to do something slowly.", "rationale": "Explanation: 'Pre-' specifically deals with time/order, not speed.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 22,
    "question": "In the word 'painful,' what does the suffix '-ful' tell you about the person's feeling?",
    "hint": "A suffix is a group of letters added to the END of a word.",
    "answerOptions": [
      { "text": "They are FULL of pain.", "rationale": "Explanation: The suffix '-ful' means 'full of' or 'having much of' something.", "isCorrect": true },
      { "text": "They have NO pain.", "rationale": "Explanation: The suffix '-less' means without, like in 'painless'.", "isCorrect": false },
      { "text": "They used to have pain.", "rationale": "Explanation: Suffixes like '-ed' show that something happened in the past.", "isCorrect": false },
      { "text": "They like having pain.", "rationale": "Explanation: '-ful' describes the amount, not if they like it.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 23,
    "question": "What do we call the person who is telling the story to the reader?",
    "hint": "This person explains the characters' feelings and the plot.",
    "answerOptions": [
      { "text": "The Narrator", "rationale": "Explanation: The narrator is the 'voice' that tells the story.", "isCorrect": true },
      { "text": "The Author", "rationale": "Explanation: The author is the person who wrote the book, but the narrator is the character telling the story.", "isCorrect": false },
      { "text": "The Illustrator", "rationale": "Explanation: The illustrator is the person who drew the pictures.", "isCorrect": false },
      { "text": "The Audience", "rationale": "Explanation: The audience is the group of people reading or watching.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 24,
    "question": "What is one major difference between a 'play' (drama) and a regular 'story' (prose)?",
    "hint": "Think about how the characters talk and the special instructions for the actors.",
    "answerOptions": [
      { "text": "A play uses dialogue and stage directions instead of long paragraphs.", "rationale": "Explanation: Plays are written to be acted out, so they focus on speaking parts and movement.", "isCorrect": true },
      { "text": "A play never has any characters.", "rationale": "Explanation: Both plays and stories have characters.", "isCorrect": false },
      { "text": "A play is only written in secret codes.", "rationale": "Explanation: Plays are written in plain English for actors to read.", "isCorrect": false },
      { "text": "A story is always much longer than a play.", "rationale": "Explanation: Length doesn't matter; the difference is in how they are written.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 25,
    "question": "Which of the following types of words should ALWAYS start with a capital letter?",
    "hint": "Think about 'Proper Nouns'.",
    "answerOptions": [
      { "text": "Names of specific people, places, and days of the week.", "rationale": "Explanation: Proper nouns like 'Joe', 'Bridgeport', and 'Monday' must always be capitalized.", "isCorrect": true },
      { "text": "Every single word in a sentence.", "rationale": "Explanation: Only the first word of a sentence and proper nouns get capitalized.", "isCorrect": false },
      { "text": "Only the names of animals.", "rationale": "Explanation: General animal names like 'dog' are not capitalized unless they are at the start of a sentence.", "isCorrect": false },
      { "text": "Action words like 'run' and 'jump'.", "rationale": "Explanation: Verbs are almost never capitalized unless they start a sentence.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 26,
    "question": "What is a 'pronoun' used for in a sentence?",
    "hint": "Think of words like 'he', 'she', 'it', or 'they'.",
    "answerOptions": [
      { "text": "To take the place of a noun so we don't repeat the same name over and over.", "rationale": "Explanation: Instead of saying 'Mr. O' five times, we can use the pronoun 'he'.", "isCorrect": true },
      { "text": "To describe how big or small something is.", "rationale": "Explanation: Describing words are adjectives.", "isCorrect": false },
      { "text": "To show that an action is happening right now.", "rationale": "Explanation: These are verbs.", "isCorrect": false },
      { "text": "To join two sentences together.", "rationale": "Explanation: Words like 'and' or 'but' are conjunctions.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 27,
    "question": "What is the difference between a 'Right There' question and an 'Inferencing' question?",
    "hint": "One answer is hidden, and the other is staring right at you!",
    "answerOptions": [
      { "text": "A 'Right There' answer is explicitly in the text, while an 'Inference' requires using clues.", "rationale": "Explanation: 'Right there' means you can point your finger at the answer in the book.", "isCorrect": true },
      { "text": "An 'Inference' answer is always found on the first page.", "rationale": "Explanation: Inferences can be made anywhere in a story.", "isCorrect": false },
      { "text": "A 'Right There' question is only for math problems.", "rationale": "Explanation: These are terms used for reading comprehension.", "isCorrect": false },
      { "text": "There is no difference; they are the same thing.", "rationale": "Explanation: They are very different; one is literal and the other is 'reading between the lines'.", "isCorrect": false }
    ]
  }
];