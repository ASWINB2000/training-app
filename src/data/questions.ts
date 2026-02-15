import { Section } from '@/types';

export const testSections: Section[] = [
  {
    id: 'section-1',
    name: 'Quantitative Aptitude',
    timeLimit: 600, // 10 minutes
    questions: [
      {
        id: 'q1-1',
        text: 'What is the value of 15% of 240?',
        options: ['32', '36', '38', '40'],
        correctAnswers: [1],
        type: 'mcq',
      },
      {
        id: 'q1-2',
        text: 'If x + y = 10 and x - y = 4, what is the value of x?',
        options: ['5', '6', '7', '8'],
        correctAnswers: [2],
        type: 'mcq',
      },
      {
        id: 'q1-3',
        text: 'A train travels 360 km in 4 hours. What is its speed in m/s?',
        options: ['20 m/s', '25 m/s', '30 m/s', '35 m/s'],
        correctAnswers: [1],
        type: 'mcq',
      },
      {
        id: 'q1-4',
        text: 'Which of the following numbers are divisible by both 3 and 4?',
        options: ['12', '18', '24', '36'],
        correctAnswers: [0, 2, 3],
        type: 'multi-select',
      },
      {
        id: 'q1-5',
        text: 'The compound interest on Rs. 1000 at 10% per annum for 2 years is:',
        options: ['Rs. 200', 'Rs. 210', 'Rs. 220', 'Rs. 230'],
        correctAnswers: [1],
        type: 'mcq',
      },
    ],
  },
  {
    id: 'section-2',
    name: 'Logical Reasoning',
    timeLimit: 600,
    questions: [
      {
        id: 'q2-1',
        text: 'Complete the series: 2, 6, 12, 20, 30, ?',
        options: ['38', '40', '42', '44'],
        correctAnswers: [2],
        type: 'mcq',
      },
      {
        id: 'q2-2',
        text: 'If APPLE is coded as 50, then MANGO is coded as:',
        options: ['55', '57', '59', '61'],
        correctAnswers: [2],
        type: 'mcq',
      },
      {
        id: 'q2-3',
        text: 'Which of the following conclusions can be drawn from: "All cats are animals. Some animals are pets."',
        options: [
          'All cats are pets',
          'Some cats are pets',
          'Some animals are cats',
          'No conclusion can be drawn about cats and pets',
        ],
        correctAnswers: [2, 3],
        type: 'multi-select',
      },
      {
        id: 'q2-4',
        text: 'Pointing to a man, a woman said "His mother is the only daughter of my mother." How is the woman related to the man?',
        options: ['Mother', 'Aunt', 'Sister', 'Grandmother'],
        correctAnswers: [0],
        type: 'mcq',
      },
      {
        id: 'q2-5',
        text: 'If Monday falls on 1st of a month, what day will fall on 23rd?',
        options: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
        correctAnswers: [1],
        type: 'mcq',
      },
    ],
  },
  {
    id: 'section-3',
    name: 'Verbal Ability',
    timeLimit: 600,
    questions: [
      {
        id: 'q3-1',
        text: 'Choose the synonym of "Ephemeral":',
        options: ['Eternal', 'Fleeting', 'Permanent', 'Stable'],
        correctAnswers: [1],
        type: 'mcq',
      },
      {
        id: 'q3-2',
        text: 'Select the correct sentence:',
        options: [
          'He don\'t know the answer.',
          'He doesn\'t knows the answer.',
          'He doesn\'t know the answer.',
          'He don\'t knows the answer.',
        ],
        correctAnswers: [2],
        type: 'mcq',
      },
      {
        id: 'q3-3',
        text: 'Which of the following words are antonyms of "Benevolent"?',
        options: ['Malevolent', 'Kind', 'Cruel', 'Generous'],
        correctAnswers: [0, 2],
        type: 'multi-select',
      },
      {
        id: 'q3-4',
        text: 'Fill in the blank: "She has been working here ___ 2015."',
        options: ['from', 'since', 'for', 'by'],
        correctAnswers: [1],
        type: 'mcq',
      },
      {
        id: 'q3-5',
        text: 'Choose the correctly spelled word:',
        options: ['Accomodate', 'Accommodate', 'Acommodate', 'Acomodate'],
        correctAnswers: [1],
        type: 'mcq',
      },
    ],
  },
  {
    id: 'section-4',
    name: 'Data Interpretation',
    timeLimit: 600,
    questions: [
      {
        id: 'q4-1',
        text: 'A company\'s revenue was $200M in 2020 and $250M in 2021. What is the percentage increase?',
        options: ['20%', '25%', '30%', '50%'],
        correctAnswers: [1],
        type: 'mcq',
      },
      {
        id: 'q4-2',
        text: 'If a pie chart shows 90° for Category A out of 360°, what percentage does Category A represent?',
        options: ['20%', '25%', '30%', '35%'],
        correctAnswers: [1],
        type: 'mcq',
      },
      {
        id: 'q4-3',
        text: 'Given sales data: Q1=$100K, Q2=$150K, Q3=$120K, Q4=$180K. Which of the following are true?',
        options: [
          'Q4 had the highest sales',
          'Q1 had the lowest sales',
          'Average quarterly sales exceeded $140K',
          'Total annual sales were $550K',
        ],
        correctAnswers: [0, 1, 2],
        type: 'multi-select',
      },
      {
        id: 'q4-4',
        text: 'The ratio of boys to girls in a class is 3:2. If there are 30 boys, how many girls are there?',
        options: ['15', '18', '20', '25'],
        correctAnswers: [2],
        type: 'mcq',
      },
      {
        id: 'q4-5',
        text: 'If population grows from 1 million to 1.21 million in 2 years, what is the annual growth rate?',
        options: ['5%', '10%', '10.5%', '21%'],
        correctAnswers: [1],
        type: 'mcq',
      },
    ],
  },
];

export const testTitle = 'Practice Assessment Test';
export const testDescription = 'This test consists of 4 sections with 5 questions each. Each section has a 10-minute time limit. You must complete each section before moving to the next. Once a section is submitted, you cannot go back.';
