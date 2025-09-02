type Question = {
  id: number;
  question: string;
  answer: string;
  coordinates: { lat: number; lng: number };
};

export const questions: Question[] = [
  {
    id: 1,
    question: "Where is the oldest continuously inhabited city in the world?",
    answer: "Damascus",
    coordinates: { lat: 33.5138, lng: 36.2765 },
  },
  {
    id: 2,
    question: "Where is the highest waterfall in the world?",
    answer: "Angel Falls",
    coordinates: { lat: 5.967, lng: -62.536 },
  },
  {
    id: 3,
    question: "Where is the largest volcano in the world?",
    answer: "Mauna Loa",
    coordinates: { lat: 19.4756, lng: -155.6082 },
  },
  {
    id: 4,
    question: "Where is the deepest ocean trench in the world?",
    answer: "Mariana Trench",
    coordinates: { lat: 11.35, lng: 142.2 },
  },
  {
    id: 5,
    question: "Where is the tallest building in the world?",
    answer: "Burj Khalifa",
    coordinates: { lat: 25.1972, lng: 55.2744 },
  },
  {
    id: 6,
    question: "Where is the largest statue in the world?",
    answer: "Statue of Unity",
    coordinates: { lat: 21.838, lng: 73.7191 },
  },
  {
    id: 7,
    question: "Where is the deepest cave in the world?",
    answer: "Veryovkina Cave",
    coordinates: { lat: 43.3822, lng: 40.3456 },
  },
  {
    id: 8,
    question: "Where is the largest clock tower in the world?",
    answer: "Abraj Al Bait Clock Tower",
    coordinates: { lat: 21.4187, lng: 39.8256 },
  },
  {
    id: 9,
    question: "Where is the longest bridge?",
    answer: "Danyang-Kunshan Grand Bridge",
    coordinates: { lat: 31.0882, lng: 120.5853 },
  },
  {
    id: 10,
    question: "Where is the largest aquarium in the world?",
    answer: "Chimelong Ocean Kingdom",
    coordinates: { lat: 22.2467, lng: 113.538 },
  },
];
