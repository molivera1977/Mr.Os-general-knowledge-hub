const mathData = [
  {
    "questionNumber": 1,
    "question": "Some shapes can fold into two halves that match. What do we call the fold line?",
    "hint": "Fold a paper in half. Do the two sides match?",
    "answerOptions": [
      { "text": "A line of symmetry", "rationale": "Explanation: Fold on a line of symmetry. The two sides match.", "isCorrect": true },
      { "text": "A parallel line", "rationale": "Explanation: Parallel lines are two lines that never touch.", "isCorrect": false },
      { "text": "A perimeter", "rationale": "Explanation: Perimeter is the length all the way around a shape.", "isCorrect": false },
      { "text": "An intersecting line", "rationale": "Explanation: Intersecting lines cross each other.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 2,
    "question": "You walk all the way around the edge of a park. What are you measuring?",
    "hint": "You go around the outside. You do not go in the middle.",
    "answerOptions": [
      { "text": "The perimeter", "rationale": "Explanation: Perimeter is the length all the way around the outside.", "isCorrect": true },
      { "text": "The area", "rationale": "Explanation: Area is the flat space inside a shape.", "isCorrect": false },
      { "text": "The volume", "rationale": "Explanation: Volume is how much a box or cup can hold.", "isCorrect": false },
      { "text": "The symmetry", "rationale": "Explanation: Symmetry is about two halves that match.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 3,
    "question": "You want to cover a whole floor with a rug. What are you measuring?",
    "hint": "The rug covers the inside of the floor. It is not just the edge.",
    "answerOptions": [
      { "text": "The area", "rationale": "Explanation: Area is the flat space inside a shape.", "isCorrect": true },
      { "text": "The perimeter", "rationale": "Explanation: Perimeter is only the edge around the outside.", "isCorrect": false },
      { "text": "The length", "rationale": "Explanation: Length is just one side.", "isCorrect": false },
      { "text": "The width", "rationale": "Explanation: Width is just how wide it is.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 4,
    "question": "A fraction shows part of a whole, like 3/4. What do we call the top number?",
    "hint": "The top number tells how many parts you have.",
    "answerOptions": [
      { "text": "The numerator", "rationale": "Explanation: The numerator is the top number. In 3/4, it is 3.", "isCorrect": true },
      { "text": "The denominator", "rationale": "Explanation: The denominator is the bottom number.", "isCorrect": false },
      { "text": "The sum", "rationale": "Explanation: The sum is the answer when you add.", "isCorrect": false },
      { "text": "The product", "rationale": "Explanation: The product is the answer when you multiply.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 5,
    "question": "A fraction shows part of a whole, like 3/4. What do we call the bottom number?",
    "hint": "The bottom number tells how many equal parts make the whole.",
    "answerOptions": [
      { "text": "The denominator", "rationale": "Explanation: The denominator is on the bottom. D is for down! In 3/4, it is 4.", "isCorrect": true },
      { "text": "The numerator", "rationale": "Explanation: The numerator is the top number.", "isCorrect": false },
      { "text": "The quotient", "rationale": "Explanation: The quotient is the answer when you divide.", "isCorrect": false },
      { "text": "The difference", "rationale": "Explanation: The difference is the answer when you subtract.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 6,
    "question": "How many days are in one week?",
    "hint": "Count the days: Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday.",
    "answerOptions": [
      { "text": "7 days", "rationale": "Explanation: One week has 7 days.", "isCorrect": true },
      { "text": "5 days", "rationale": "Explanation: 5 is just the school days. A full week has 7.", "isCorrect": false },
      { "text": "10 days", "rationale": "Explanation: That is too many. A week has 7 days.", "isCorrect": false },
      { "text": "12 days", "rationale": "Explanation: 12 is the months in a year. A week has 7 days.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 7,
    "question": "Most years have the same number of days. How many?",
    "hint": "It is the time it takes Earth to go all the way around the Sun.",
    "answerOptions": [
      { "text": "365 days", "rationale": "Explanation: A year on the calendar has 365 days.", "isCorrect": true },
      { "text": "100 days", "rationale": "Explanation: 100 days is only a little more than 3 months.", "isCorrect": false },
      { "text": "30 days", "rationale": "Explanation: 30 days is about one month.", "isCorrect": false },
      { "text": "52 days", "rationale": "Explanation: 52 is the weeks in a year, not the days.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 8,
    "question": "How many weeks are in one year?",
    "hint": "A year has 365 days. A week has 7 days. How many groups of 7 fit?",
    "answerOptions": [
      { "text": "52 weeks", "rationale": "Explanation: 52 × 7 = 364. That is about 365 days. So a year has 52 weeks.", "isCorrect": true },
      { "text": "12 weeks", "rationale": "Explanation: 12 is the months in a year, not the weeks.", "isCorrect": false },
      { "text": "365 weeks", "rationale": "Explanation: 365 is the days in a year, not the weeks.", "isCorrect": false },
      { "text": "24 weeks", "rationale": "Explanation: 24 is the hours in a day.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 9,
    "question": "How many seconds are in one minute?",
    "hint": "Watch the fast hand on a clock. Count the ticks as it goes all the way around.",
    "answerOptions": [
      { "text": "60 seconds", "rationale": "Explanation: One minute has 60 seconds.", "isCorrect": true },
      { "text": "100 seconds", "rationale": "Explanation: Time does not count by 100. It counts by 60.", "isCorrect": false },
      { "text": "24 seconds", "rationale": "Explanation: 24 is the hours in a day.", "isCorrect": false },
      { "text": "7 seconds", "rationale": "Explanation: 7 is the days in a week.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 10,
    "question": "How many minutes are in one hour?",
    "hint": "It is the same number as the seconds in one minute.",
    "answerOptions": [
      { "text": "60 minutes", "rationale": "Explanation: One hour has 60 minutes.", "isCorrect": true },
      { "text": "100 minutes", "rationale": "Explanation: Time does not count by 100. It counts by 60.", "isCorrect": false },
      { "text": "30 minutes", "rationale": "Explanation: 30 minutes is only half an hour.", "isCorrect": false },
      { "text": "12 minutes", "rationale": "Explanation: 12 is the numbers on a clock face.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 11,
    "question": "You add two numbers. What is the math word for the answer?",
    "hint": "Look at 5 + 4 = 9. Which word means the answer when you add?",
    "answerOptions": [
      { "text": "The sum", "rationale": "Explanation: When you add, the answer is the sum. 5 + 4 = 9, so 9 is the sum.", "isCorrect": true },
      { "text": "The difference", "rationale": "Explanation: The difference is the answer when you subtract.", "isCorrect": false },
      { "text": "The product", "rationale": "Explanation: The product is the answer when you multiply.", "isCorrect": false },
      { "text": "The quotient", "rationale": "Explanation: The quotient is the answer when you divide.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 12,
    "question": "You subtract one number from another. What is the math word for the answer?",
    "hint": "Look at 9 − 4 = 5. Which word means the answer when you take away?",
    "answerOptions": [
      { "text": "The difference", "rationale": "Explanation: When you subtract, the answer is the difference. 9 − 4 = 5, so 5 is the difference.", "isCorrect": true },
      { "text": "The sum", "rationale": "Explanation: The sum is the answer when you add.", "isCorrect": false },
      { "text": "The product", "rationale": "Explanation: The product is the answer when you multiply.", "isCorrect": false },
      { "text": "The quotient", "rationale": "Explanation: The quotient is the answer when you divide.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 13,
    "question": "You multiply two numbers. What is the math word for the answer?",
    "hint": "Look at 3 × 4 = 12. Which word means the answer when you multiply?",
    "answerOptions": [
      { "text": "The product", "rationale": "Explanation: When you multiply, the answer is the product. 3 × 4 = 12, so 12 is the product.", "isCorrect": true },
      { "text": "The difference", "rationale": "Explanation: The difference is the answer when you subtract.", "isCorrect": false },
      { "text": "The sum", "rationale": "Explanation: The sum is the answer when you add.", "isCorrect": false },
      { "text": "The quotient", "rationale": "Explanation: The quotient is the answer when you divide.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 14,
    "question": "You divide one number by another. What is the math word for the answer?",
    "hint": "Look at 12 ÷ 3 = 4. Which word means the answer when you divide?",
    "answerOptions": [
      { "text": "The quotient", "rationale": "Explanation: When you divide, the answer is the quotient. 12 ÷ 3 = 4, so 4 is the quotient.", "isCorrect": true },
      { "text": "The product", "rationale": "Explanation: The product is the answer when you multiply.", "isCorrect": false },
      { "text": "The difference", "rationale": "Explanation: The difference is the answer when you subtract.", "isCorrect": false },
      { "text": "The sum", "rationale": "Explanation: The sum is the answer when you add.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 15,
    "question": "One day has 24 hours. How many hours are in two days?",
    "hint": "Add 24 two times.",
    "answerOptions": [
      { "text": "48 hours", "rationale": "Explanation: 24 + 24 = 48.", "isCorrect": true },
      { "text": "24 hours", "rationale": "Explanation: 24 hours is only one day. You need two days.", "isCorrect": false },
      { "text": "60 hours", "rationale": "Explanation: 60 is the minutes in an hour. 24 + 24 = 48.", "isCorrect": false },
      { "text": "36 hours", "rationale": "Explanation: 36 hours is only a day and a half. 24 + 24 = 48.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 16,
    "question": "How many inches are in one foot?",
    "hint": "Look at a ruler. Count the big numbers on it.",
    "answerOptions": [
      { "text": "12 inches", "rationale": "Explanation: One foot has 12 inches. A ruler is one foot long.", "isCorrect": true },
      { "text": "10 inches", "rationale": "Explanation: A foot is not 10 inches. It is 12 inches.", "isCorrect": false },
      { "text": "36 inches", "rationale": "Explanation: 36 inches is a yard, not a foot.", "isCorrect": false },
      { "text": "100 inches", "rationale": "Explanation: 100 is the centimeters in a meter, not the inches in a foot.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 17,
    "question": "How many feet are in one yard?",
    "hint": "A yardstick is the same as some rulers in a row. Each ruler is 1 foot. How many rulers?",
    "answerOptions": [
      { "text": "3 feet", "rationale": "Explanation: One yard is 3 feet. That is 12 + 12 + 12 = 36 inches.", "isCorrect": true },
      { "text": "12 feet", "rationale": "Explanation: 12 is the inches in a foot, not the feet in a yard.", "isCorrect": false },
      { "text": "10 feet", "rationale": "Explanation: That is too many. A yard is 3 feet.", "isCorrect": false },
      { "text": "5 feet", "rationale": "Explanation: That is too many. A yard is 3 feet.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 18,
    "question": "How many ounces are in one pound?",
    "hint": "A pound has more ounces than a foot has inches. A foot has 12 inches.",
    "answerOptions": [
      { "text": "16 ounces", "rationale": "Explanation: One pound has 16 ounces.", "isCorrect": true },
      { "text": "10 ounces", "rationale": "Explanation: A pound is not 10 ounces. It is 16 ounces.", "isCorrect": false },
      { "text": "12 ounces", "rationale": "Explanation: 12 is the inches in a foot. A pound is 16 ounces.", "isCorrect": false },
      { "text": "24 ounces", "rationale": "Explanation: 24 is the hours in a day. A pound is 16 ounces.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 19,
    "question": "How many centimeters are in one meter?",
    "hint": "Centi is like cents. How many cents make one dollar?",
    "answerOptions": [
      { "text": "100 centimeters", "rationale": "Explanation: Centi means 100. One meter has 100 centimeters.", "isCorrect": true },
      { "text": "10 centimeters", "rationale": "Explanation: 10 is the millimeters in a centimeter.", "isCorrect": false },
      { "text": "1,000 centimeters", "rationale": "Explanation: 1,000 is the meters in a kilometer.", "isCorrect": false },
      { "text": "36 centimeters", "rationale": "Explanation: 36 is the inches in a yard.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 20,
    "question": "How many meters are in one kilometer?",
    "hint": "Kilo means a very big number. A kilometer is a long walk.",
    "answerOptions": [
      { "text": "1,000 meters", "rationale": "Explanation: Kilo means 1,000. One kilometer has 1,000 meters.", "isCorrect": true },
      { "text": "100 meters", "rationale": "Explanation: 100 is the centimeters in a meter.", "isCorrect": false },
      { "text": "10 meters", "rationale": "Explanation: That is too small. A kilometer is much longer.", "isCorrect": false },
      { "text": "10,000 meters", "rationale": "Explanation: That is too many. One kilometer is 1,000 meters.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 21,
    "question": "We measure angles in degrees. This angle looks like an L. It is 90 degrees. What is it called?",
    "hint": "Look at the corner of a sheet of paper.",
    "answerOptions": [
      { "text": "A right angle", "rationale": "Explanation: A right angle is 90 degrees. It is like the corner of a room.", "isCorrect": true },
      { "text": "An acute angle", "rationale": "Explanation: An acute angle is smaller than 90 degrees.", "isCorrect": false },
      { "text": "An obtuse angle", "rationale": "Explanation: An obtuse angle is wider than 90 degrees.", "isCorrect": false },
      { "text": "A straight angle", "rationale": "Explanation: A straight angle is a flat line. It is 180 degrees.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 22,
    "question": "An angle is smaller than 90 degrees. What is it called?",
    "hint": "Think of it as a small, cute angle.",
    "answerOptions": [
      { "text": "An acute angle", "rationale": "Explanation: An acute angle is sharp. It is smaller than 90 degrees.", "isCorrect": true },
      { "text": "An obtuse angle", "rationale": "Explanation: An obtuse angle is bigger than 90 degrees.", "isCorrect": false },
      { "text": "A right angle", "rationale": "Explanation: A right angle is 90 degrees, not smaller.", "isCorrect": false },
      { "text": "A reflex angle", "rationale": "Explanation: A reflex angle is bigger than 180 degrees.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 23,
    "question": "An angle is wider than a right angle. It is more than 90 degrees. What is it called?",
    "hint": "This angle is wide open, like a book laid back.",
    "answerOptions": [
      { "text": "An obtuse angle", "rationale": "Explanation: An obtuse angle is wide. It is more than 90 degrees.", "isCorrect": true },
      { "text": "An acute angle", "rationale": "Explanation: An acute angle is smaller than 90 degrees.", "isCorrect": false },
      { "text": "A right angle", "rationale": "Explanation: A right angle is 90 degrees, not more.", "isCorrect": false },
      { "text": "A triangle", "rationale": "Explanation: A triangle is a shape, not one angle.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 24,
    "question": "Two lines stay the same space apart. They never cross or touch, like train tracks. What are they called?",
    "hint": "Look at the words. Which one has two lines side by side in it, like ll?",
    "answerOptions": [
      { "text": "Parallel lines", "rationale": "Explanation: Parallel lines go the same way. They never cross.", "isCorrect": true },
      { "text": "Perpendicular lines", "rationale": "Explanation: Perpendicular lines cross. They make a 90-degree angle.", "isCorrect": false },
      { "text": "Intersecting lines", "rationale": "Explanation: Intersecting lines cross each other.", "isCorrect": false },
      { "text": "Vertical lines", "rationale": "Explanation: Vertical just means the lines go up and down.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 25,
    "question": "Two lines cross. They make a 90-degree right angle. What are they called?",
    "hint": "They make a shape like a + sign or a T.",
    "answerOptions": [
      { "text": "Perpendicular lines", "rationale": "Explanation: Perpendicular lines cross and make four right angles.", "isCorrect": true },
      { "text": "Parallel lines", "rationale": "Explanation: Parallel lines never cross.", "isCorrect": false },
      { "text": "Straight lines", "rationale": "Explanation: All lines are straight. That word does not tell how they cross.", "isCorrect": false },
      { "text": "Horizontal lines", "rationale": "Explanation: Horizontal just means the lines go left and right.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 26,
    "question": "How many sides does a triangle have?",
    "hint": "Think of a tricycle. How many wheels does it have?",
    "answerOptions": [
      { "text": "3", "rationale": "Explanation: A triangle has 3 sides and 3 angles.", "isCorrect": true },
      { "text": "4", "rationale": "Explanation: A shape with 4 sides is a quadrilateral.", "isCorrect": false },
      { "text": "5", "rationale": "Explanation: A shape with 5 sides is a pentagon.", "isCorrect": false },
      { "text": "6", "rationale": "Explanation: A shape with 6 sides is a hexagon.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 27,
    "question": "A square has 4 sides. So does a rectangle. What do we call ANY closed shape with 4 sides?",
    "hint": "Quad means four. Look for that word part.",
    "answerOptions": [
      { "text": "A quadrilateral", "rationale": "Explanation: Any closed shape with 4 sides is a quadrilateral.", "isCorrect": true },
      { "text": "A pentagon", "rationale": "Explanation: A pentagon has 5 sides.", "isCorrect": false },
      { "text": "A hexagon", "rationale": "Explanation: A hexagon has 6 sides.", "isCorrect": false },
      { "text": "A triangle", "rationale": "Explanation: A triangle has 3 sides.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 28,
    "question": "How many sides does a pentagon have?",
    "hint": "Home plate in baseball is a pentagon. Picture it and count the sides.",
    "answerOptions": [
      { "text": "5", "rationale": "Explanation: A pentagon has 5 sides.", "isCorrect": true },
      { "text": "6", "rationale": "Explanation: A hexagon has 6 sides.", "isCorrect": false },
      { "text": "8", "rationale": "Explanation: An octagon has 8 sides.", "isCorrect": false },
      { "text": "4", "rationale": "Explanation: A quadrilateral has 4 sides.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 29,
    "question": "How many sides does a hexagon have?",
    "hint": "Hexagon has an X in it. Which number word also has an X?",
    "answerOptions": [
      { "text": "6", "rationale": "Explanation: A hexagon has 6 sides. Six has an X, like hexagon.", "isCorrect": true },
      { "text": "5", "rationale": "Explanation: A pentagon has 5 sides.", "isCorrect": false },
      { "text": "8", "rationale": "Explanation: An octagon has 8 sides.", "isCorrect": false },
      { "text": "10", "rationale": "Explanation: A decagon has 10 sides.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 30,
    "question": "How many sides does an octagon have?",
    "hint": "Think of an octopus. How many legs does it have?",
    "answerOptions": [
      { "text": "8", "rationale": "Explanation: An octagon has 8 sides. A stop sign is an octagon.", "isCorrect": true },
      { "text": "6", "rationale": "Explanation: A hexagon has 6 sides.", "isCorrect": false },
      { "text": "10", "rationale": "Explanation: A decagon has 10 sides.", "isCorrect": false },
      { "text": "12", "rationale": "Explanation: A shape with 12 sides is a dodecagon.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 31,
    "question": "A triangle has ALL three sides the same length. What is it called?",
    "hint": "Listen for a word that sounds like equal.",
    "answerOptions": [
      { "text": "An equilateral triangle", "rationale": "Explanation: An equilateral triangle has all sides equal. All its angles are equal too.", "isCorrect": true },
      { "text": "An isosceles triangle", "rationale": "Explanation: An isosceles triangle has just 2 sides the same.", "isCorrect": false },
      { "text": "A scalene triangle", "rationale": "Explanation: A scalene triangle has no sides the same.", "isCorrect": false },
      { "text": "A right triangle", "rationale": "Explanation: A right triangle has one 90-degree angle. That is about angles, not sides.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 32,
    "question": "A triangle has exactly TWO sides the same length. What is it called?",
    "hint": "It is not the one with all 3 sides the same. It is not the one with no sides the same.",
    "answerOptions": [
      { "text": "An isosceles triangle", "rationale": "Explanation: An isosceles triangle has 2 sides the same length.", "isCorrect": true },
      { "text": "An equilateral triangle", "rationale": "Explanation: An equilateral triangle has all 3 sides the same, not just 2.", "isCorrect": false },
      { "text": "A scalene triangle", "rationale": "Explanation: A scalene triangle has no sides the same.", "isCorrect": false },
      { "text": "A square", "rationale": "Explanation: A square has 4 sides. It is not a triangle.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 33,
    "question": "A triangle has NO sides the same length. What is it called?",
    "hint": "Every side is a different size. Which name is left?",
    "answerOptions": [
      { "text": "A scalene triangle", "rationale": "Explanation: A scalene triangle has 3 sides that are all different.", "isCorrect": true },
      { "text": "An equilateral triangle", "rationale": "Explanation: An equilateral triangle has all sides the same.", "isCorrect": false },
      { "text": "An isosceles triangle", "rationale": "Explanation: An isosceles triangle has 2 sides the same.", "isCorrect": false },
      { "text": "A pentagon", "rationale": "Explanation: A pentagon has 5 sides. It is not a triangle.", "isCorrect": false }
    ]
  }
];
