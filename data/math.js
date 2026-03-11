const mathData = [
  // ... Questions 1 through 20 remain exactly the same ...
  {
    "questionNumber": 1,
    "question": "What do we call an imaginary line that divides a shape perfectly into two matching, mirror-image halves?",
    "hint": "Think about folding a piece of paper in half so the edges match up exactly.",
    "answerOptions": [
      { "text": "A line of symmetry", "rationale": "Explanation: If you fold a shape along a line of symmetry, both sides will match perfectly.", "isCorrect": true },
      { "text": "A parallel line", "rationale": "Explanation: Parallel lines are two lines that never touch.", "isCorrect": false },
      { "text": "A perimeter", "rationale": "Explanation: Perimeter is the distance around the outside.", "isCorrect": false },
      { "text": "An intersecting line", "rationale": "Explanation: Intersecting lines cross each other.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 2,
    "question": "If you are walking all the way around the outside edge of a playground, what are you measuring?",
    "hint": "It is the total distance around the outside of a shape.",
    "answerOptions": [
      { "text": "The Perimeter", "rationale": "Explanation: The perimeter is the total length of the outside boundary of a closed shape.", "isCorrect": true },
      { "text": "The Area", "rationale": "Explanation: Area measures the flat space inside the shape.", "isCorrect": false },
      { "text": "The Volume", "rationale": "Explanation: Volume measures 3D space.", "isCorrect": false },
      { "text": "The Symmetry", "rationale": "Explanation: Symmetry is about matching halves.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 3,
    "question": "If you are trying to figure out how much carpet you need to cover the entire floor of a room, what are you measuring?",
    "hint": "It is the amount of flat space inside a shape.",
    "answerOptions": [
      { "text": "The Area", "rationale": "Explanation: Area is the amount of flat space inside a boundary.", "isCorrect": true },
      { "text": "The Perimeter", "rationale": "Explanation: Perimeter is just the outside edge.", "isCorrect": false },
      { "text": "The Length", "rationale": "Explanation: Length is just measuring one single side.", "isCorrect": false },
      { "text": "The Width", "rationale": "Explanation: Width measures how wide something is.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 4,
    "question": "When you look at a fraction, what do you call the top number?",
    "hint": "This number tells you how many parts you actually have or are counting.",
    "answerOptions": [
      { "text": "The Numerator", "rationale": "Explanation: The numerator is the top number of a fraction.", "isCorrect": true },
      { "text": "The Denominator", "rationale": "Explanation: The denominator is the bottom number.", "isCorrect": false },
      { "text": "The Sum", "rationale": "Explanation: The sum is the answer to addition.", "isCorrect": false },
      { "text": "The Product", "rationale": "Explanation: The product is the answer to multiplication.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 5,
    "question": "When you look at a fraction, what do you call the bottom number?",
    "hint": "This number tells you the total number of equal parts that make up the whole.",
    "answerOptions": [
      { "text": "The Denominator", "rationale": "Explanation: The denominator goes on the bottom (D for Down!) and shows the total pieces.", "isCorrect": true },
      { "text": "The Numerator", "rationale": "Explanation: The numerator is the top number.", "isCorrect": false },
      { "text": "The Quotient", "rationale": "Explanation: The quotient is for division.", "isCorrect": false },
      { "text": "The Difference", "rationale": "Explanation: The difference is for subtraction.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 6,
    "question": "How many days make up one complete week?",
    "hint": "Count Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, and Saturday.",
    "answerOptions": [
      { "text": "7 days", "rationale": "Explanation: There are 7 days in a standard week.", "isCorrect": true },
      { "text": "5 days", "rationale": "Explanation: There are 5 days in a standard school/work week.", "isCorrect": false },
      { "text": "10 days", "rationale": "Explanation: A week is 7 days.", "isCorrect": false },
      { "text": "12 days", "rationale": "Explanation: There are 12 months in a year.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 7,
    "question": "Normally, how many days are there in one complete year?",
    "hint": "This is how long it takes the Earth to orbit the Sun one time.",
    "answerOptions": [
      { "text": "365 days", "rationale": "Explanation: A standard calendar year has 365 days.", "isCorrect": true },
      { "text": "100 days", "rationale": "Explanation: 100 days is a little over three months.", "isCorrect": false },
      { "text": "30 days", "rationale": "Explanation: 30 days is about the length of one single month.", "isCorrect": false },
      { "text": "52 days", "rationale": "Explanation: There are 52 weeks in a year.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 8,
    "question": "How many weeks are there in one complete year?",
    "hint": "It is a little bit more than 50.",
    "answerOptions": [
      { "text": "52 weeks", "rationale": "Explanation: There are 52 weeks in a year.", "isCorrect": true },
      { "text": "12 weeks", "rationale": "Explanation: There are 12 months in a year.", "isCorrect": false },
      { "text": "365 weeks", "rationale": "Explanation: There are 365 days in a year.", "isCorrect": false },
      { "text": "24 weeks", "rationale": "Explanation: There are 24 hours in a day.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 9,
    "question": "How many seconds are in a single minute?",
    "hint": "Look at the second hand sweeping around a clock.",
    "answerOptions": [
      { "text": "60 seconds", "rationale": "Explanation: There are exactly 60 seconds in one minute.", "isCorrect": true },
      { "text": "100 seconds", "rationale": "Explanation: Time is measured in sets of 60.", "isCorrect": false },
      { "text": "24 seconds", "rationale": "Explanation: There are 24 hours in a day.", "isCorrect": false },
      { "text": "7 seconds", "rationale": "Explanation: There are 7 days in a week.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 10,
    "question": "How many minutes are there in one hour?",
    "hint": "This is the same number as how many seconds are in a minute.",
    "answerOptions": [
      { "text": "60 minutes", "rationale": "Explanation: There are 60 minutes in an hour.", "isCorrect": true },
      { "text": "100 minutes", "rationale": "Explanation: Time is grouped by 60s.", "isCorrect": false },
      { "text": "30 minutes", "rationale": "Explanation: 30 minutes is half an hour.", "isCorrect": false },
      { "text": "12 minutes", "rationale": "Explanation: There are 12 numbers on a clock face.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 11,
    "question": "What is the math word for the answer to an addition problem?",
    "hint": "If you add 5 + 4, the ______ is 9.",
    "answerOptions": [
      { "text": "The Sum", "rationale": "Explanation: When you add two or more numbers together, the total is called the sum.", "isCorrect": true },
      { "text": "The Difference", "rationale": "Explanation: Difference is the answer when you subtract.", "isCorrect": false },
      { "text": "The Product", "rationale": "Explanation: Product is the answer when you multiply.", "isCorrect": false },
      { "text": "The Quotient", "rationale": "Explanation: Quotient is the answer when you divide.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 12,
    "question": "What is the math word for the answer to a subtraction problem?",
    "hint": "You are finding the ______ between two numbers.",
    "answerOptions": [
      { "text": "The Difference", "rationale": "Explanation: When you subtract one number from another, the answer is called the difference.", "isCorrect": true },
      { "text": "The Sum", "rationale": "Explanation: Sum is for addition.", "isCorrect": false },
      { "text": "The Product", "rationale": "Explanation: Product is for multiplication.", "isCorrect": false },
      { "text": "The Quotient", "rationale": "Explanation: Quotient is for division.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 13,
    "question": "What is the math word for the answer to a multiplication problem?",
    "hint": "If you multiply 3 x 4, the ______ is 12.",
    "answerOptions": [
      { "text": "The Product", "rationale": "Explanation: When you multiply numbers together, the final answer is called the product.", "isCorrect": true },
      { "text": "The Difference", "rationale": "Explanation: Difference is for subtraction.", "isCorrect": false },
      { "text": "The Sum", "rationale": "Explanation: Sum is for addition.", "isCorrect": false },
      { "text": "The Quotient", "rationale": "Explanation: Quotient is for division.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 14,
    "question": "What is the math word for the answer to a division problem?",
    "hint": "If you divide 12 by 3, the ______ is 4.",
    "answerOptions": [
      { "text": "The Quotient", "rationale": "Explanation: When you divide a number into equal parts, the answer is called the quotient.", "isCorrect": true },
      { "text": "The Product", "rationale": "Explanation: Product is the answer for multiplication.", "isCorrect": false },
      { "text": "The Difference", "rationale": "Explanation: Difference is the answer for subtraction.", "isCorrect": false },
      { "text": "The Sum", "rationale": "Explanation: Sum is the answer for addition.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 15,
    "question": "How many hours are there in exactly two full days?",
    "hint": "If one day is 24 hours, double that number.",
    "answerOptions": [
      { "text": "48 hours", "rationale": "Explanation: 24 hours + 24 hours = 48 hours.", "isCorrect": true },
      { "text": "24 hours", "rationale": "Explanation: 24 hours is only one day.", "isCorrect": false },
      { "text": "60 hours", "rationale": "Explanation: There are 60 minutes in an hour, not 60 hours in two days.", "isCorrect": false },
      { "text": "36 hours", "rationale": "Explanation: 36 hours is a day and a half.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 16,
    "question": "How many inches are there in one foot?",
    "hint": "Look at a standard classroom ruler.",
    "answerOptions": [
      { "text": "12 inches", "rationale": "Explanation: There are exactly 12 inches in one foot.", "isCorrect": true },
      { "text": "10 inches", "rationale": "Explanation: While many math rules use 10, measurement uses 12 inches for a foot.", "isCorrect": false },
      { "text": "36 inches", "rationale": "Explanation: 36 inches makes a yard, not a foot.", "isCorrect": false },
      { "text": "100 inches", "rationale": "Explanation: 100 is used in the metric system (like centimeters in a meter).", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 17,
    "question": "How many feet are there in one yard?",
    "hint": "A yardstick is exactly this many rulers long.",
    "answerOptions": [
      { "text": "3 feet", "rationale": "Explanation: There are 3 feet (which is 36 inches) in one yard.", "isCorrect": true },
      { "text": "12 feet", "rationale": "Explanation: There are 12 inches in a foot.", "isCorrect": false },
      { "text": "10 feet", "rationale": "Explanation: A yard is exactly 3 feet.", "isCorrect": false },
      { "text": "5 feet", "rationale": "Explanation: A yard is exactly 3 feet.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 18,
    "question": "How many ounces are there in one pound?",
    "hint": "It is exactly four more than a dozen.",
    "answerOptions": [
      { "text": "16 ounces", "rationale": "Explanation: There are 16 ounces in one pound.", "isCorrect": true },
      { "text": "10 ounces", "rationale": "Explanation: Weight is measured with 16 ounces to a pound, not 10.", "isCorrect": false },
      { "text": "12 ounces", "rationale": "Explanation: There are 12 inches in a foot, but 16 ounces in a pound.", "isCorrect": false },
      { "text": "24 ounces", "rationale": "Explanation: 24 hours is a day.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 19,
    "question": "How many centimeters are there in one meter?",
    "hint": "Think about the prefix 'cent-', just like cents in a dollar or years in a century.",
    "answerOptions": [
      { "text": "100 centimeters", "rationale": "Explanation: The prefix 'centi' means 100. There are 100 centimeters in a meter.", "isCorrect": true },
      { "text": "10 centimeters", "rationale": "Explanation: There are 10 millimeters in a centimeter.", "isCorrect": false },
      { "text": "1,000 centimeters", "rationale": "Explanation: There are 1,000 meters in a kilometer.", "isCorrect": false },
      { "text": "36 centimeters", "rationale": "Explanation: 36 is the number of inches in a yard.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 20,
    "question": "How many meters are there in one kilometer?",
    "hint": "Think about the prefix 'kilo-'.",
    "answerOptions": [
      { "text": "1,000 meters", "rationale": "Explanation: The prefix 'kilo' means 1,000. There are exactly 1,000 meters in a kilometer.", "isCorrect": true },
      { "text": "100 meters", "rationale": "Explanation: There are 100 centimeters in a meter.", "isCorrect": false },
      { "text": "10 meters", "rationale": "Explanation: A kilometer is much larger.", "isCorrect": false },
      { "text": "10,000 meters", "rationale": "Explanation: There are exactly 1,000 meters in a kilometer.", "isCorrect": false }
    ]
  },
  // --- NEW GEOMETRY ADDITIONS ---
  {
    "questionNumber": 21,
    "question": "What do we call an angle that looks like a perfect 'L' and measures exactly 90 degrees?",
    "hint": "You can find this angle in the corners of a square or a piece of paper.",
    "answerOptions": [
      { "text": "A right angle", "rationale": "Explanation: A right angle is exactly 90 degrees, like the corner of a room.", "isCorrect": true },
      { "text": "An acute angle", "rationale": "Explanation: Acute angles are smaller than 90 degrees.", "isCorrect": false },
      { "text": "An obtuse angle", "rationale": "Explanation: Obtuse angles are wider than 90 degrees.", "isCorrect": false },
      { "text": "A straight angle", "rationale": "Explanation: A straight angle is a flat line (180 degrees).", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 22,
    "question": "What do we call an angle that is smaller than 90 degrees?",
    "hint": "Think of it as a 'small and cute' little angle.",
    "answerOptions": [
      { "text": "An acute angle", "rationale": "Explanation: Acute angles are 'sharp' and smaller than a right angle.", "isCorrect": true },
      { "text": "An obtuse angle", "rationale": "Explanation: Obtuse angles are larger than 90 degrees.", "isCorrect": false },
      { "text": "A right angle", "rationale": "Explanation: A right angle is exactly 90 degrees.", "isCorrect": false },
      { "text": "A reflex angle", "rationale": "Explanation: This is an angle that is larger than 180 degrees.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 23,
    "question": "What do we call an angle that is wider than a right angle (more than 90 degrees)?",
    "hint": "This angle is wide and spread out.",
    "answerOptions": [
      { "text": "An obtuse angle", "rationale": "Explanation: Obtuse means 'blunt' or 'wide'. These angles are larger than 90 degrees.", "isCorrect": true },
      { "text": "An acute angle", "rationale": "Explanation: Acute angles are smaller than 90 degrees.", "isCorrect": false },
      { "text": "A right angle", "rationale": "Explanation: Right angles are exactly 90 degrees.", "isCorrect": false },
      { "text": "A triangle", "rationale": "Explanation: A triangle is a shape made of three angles.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 24,
    "question": "What do we call two lines that stay the same distance apart and NEVER cross or touch, like train tracks?",
    "hint": "Think of the two 'L's in the middle of the word itself!",
    "answerOptions": [
      { "text": "Parallel lines", "rationale": "Explanation: Parallel lines run in the same direction and will never intersect.", "isCorrect": true },
      { "text": "Perpendicular lines", "rationale": "Explanation: Perpendicular lines cross each other at a 90-degree angle.", "isCorrect": false },
      { "text": "Intersecting lines", "rationale": "Explanation: These are any lines that cross each other.", "isCorrect": false },
      { "text": "Vertical lines", "rationale": "Explanation: Vertical only means the lines go up and down.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 25,
    "question": "What do we call two lines that cross each other to form a perfect 90-degree right angle?",
    "hint": "They form a perfect '+' or 'T' shape.",
    "answerOptions": [
      { "text": "Perpendicular lines", "rationale": "Explanation: Perpendicular lines intersect to create four right angles.", "isCorrect": true },
      { "text": "Parallel lines", "rationale": "Explanation: Parallel lines never cross.", "isCorrect": false },
      { "text": "Straight lines", "rationale": "Explanation: All lines in this quiz are straight lines.", "isCorrect": false },
      { "text": "Horizontal lines", "rationale": "Explanation: Horizontal lines only go from left to right.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 26,
    "question": "How many sides does a triangle have?",
    "hint": "Think of a 'tricycle' or a 'tripod'.",
    "answerOptions": [
      { "text": "3", "rationale": "Explanation: Every triangle has exactly 3 sides and 3 angles.", "isCorrect": true },
      { "text": "4", "rationale": "Explanation: A 4-sided shape is a quadrilateral.", "isCorrect": false },
      { "text": "5", "rationale": "Explanation: A 5-sided shape is a pentagon.", "isCorrect": false },
      { "text": "6", "rationale": "Explanation: A 6-sided shape is a hexagon.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 27,
    "question": "What is the general name for ANY closed shape that has exactly 4 sides, like a square or rectangle?",
    "hint": "The prefix 'quad-' means four.",
    "answerOptions": [
      { "text": "A quadrilateral", "rationale": "Explanation: Any polygon with 4 sides is a quadrilateral.", "isCorrect": true },
      { "text": "A pentagon", "rationale": "Explanation: A pentagon has 5 sides.", "isCorrect": false },
      { "text": "A hexagon", "rationale": "Explanation: A hexagon has 6 sides.", "isCorrect": false },
      { "text": "A triangle", "rationale": "Explanation: A triangle has 3 sides.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 28,
    "question": "How many sides does a Pentagon have?",
    "hint": "The building in Washington D.C. where the military works is this shape!",
    "answerOptions": [
      { "text": "5", "rationale": "Explanation: A pentagon is a polygon with 5 sides.", "isCorrect": true },
      { "text": "6", "rationale": "Explanation: A hexagon has 6 sides.", "isCorrect": false },
      { "text": "8", "rationale": "Explanation: An octagon has 8 sides.", "isCorrect": false },
      { "text": "4", "rationale": "Explanation: A quadrilateral has 4 sides.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 29,
    "question": "How many sides does a Hexagon have?",
    "hint": "The word has an 'X' in it, just like the number it represents.",
    "answerOptions": [
      { "text": "6", "rationale": "Explanation: A hexagon has 6 sides.", "isCorrect": true },
      { "text": "5", "rationale": "Explanation: A pentagon has 5 sides.", "isCorrect": false },
      { "text": "8", "rationale": "Explanation: An octagon has 8 sides.", "isCorrect": false },
      { "text": "10", "rationale": "Explanation: A decagon has 10 sides.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 30,
    "question": "How many sides does an Octagon have?",
    "hint": "Think of an 'octopus' and how many legs it has.",
    "answerOptions": [
      { "text": "8", "rationale": "Explanation: An octagon (like a stop sign) has exactly 8 sides.", "isCorrect": true },
      { "text": "6", "rationale": "Explanation: A hexagon has 6 sides.", "isCorrect": false },
      { "text": "10", "rationale": "Explanation: A decagon has 10 sides.", "isCorrect": false },
      { "text": "12", "rationale": "Explanation: A dodecagon has 12 sides.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 31,
    "question": "What do we call a triangle where ALL three sides are exactly the same length?",
    "hint": "The word sounds like 'equal'.",
    "answerOptions": [
      { "text": "An equilateral triangle", "rationale": "Explanation: In an equilateral triangle, all sides and all angles are equal.", "isCorrect": true },
      { "text": "An isosceles triangle", "rationale": "Explanation: This triangle only has 2 equal sides.", "isCorrect": false },
      { "text": "A scalene triangle", "rationale": "Explanation: This triangle has no equal sides.", "isCorrect": false },
      { "text": "A right triangle", "rationale": "Explanation: A right triangle must have one 90-degree angle.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 32,
    "question": "What do we call a triangle that has at least TWO sides that are the same length?",
    "hint": "It has 'two' matching sides, like your two eyes!",
    "answerOptions": [
      { "text": "An isosceles triangle", "rationale": "Explanation: An isosceles triangle has 2 sides of equal length.", "isCorrect": true },
      { "text": "An equilateral triangle", "rationale": "Explanation: This triangle has 3 equal sides.", "isCorrect": false },
      { "text": "A scalene triangle", "rationale": "Explanation: This triangle has zero equal sides.", "isCorrect": false },
      { "text": "A square", "rationale": "Explanation: A square has 4 sides, not 3.", "isCorrect": false }
    ]
  },
  {
    "questionNumber": 33,
    "question": "What do we call a triangle where NONE of the sides are the same length?",
    "hint": "Every side is a different size.",
    "answerOptions": [
      { "text": "A scalene triangle", "rationale": "Explanation: In a scalene triangle, all three sides have different lengths.", "isCorrect": true },
      { "text": "An equilateral triangle", "rationale": "Explanation: This triangle has all sides the same.", "isCorrect": false },
      { "text": "An isosceles triangle", "rationale": "Explanation: This triangle has 2 sides the same.", "isCorrect": false },
      { "text": "A pentagon", "rationale": "Explanation: A pentagon has 5 sides.", "isCorrect": false }
    ]
  }
];