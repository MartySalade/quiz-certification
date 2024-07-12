import { Difficulty } from "./difficulty";

export type QuizItem = {
  type: string;
  difficulty: Difficulty;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  answers: string[];
};

export type Quiz = {
  response_code: number;
  results: QuizItem[];
};

export type Answer = {
  answer?: string;
  corrrect_answer: string;
};
