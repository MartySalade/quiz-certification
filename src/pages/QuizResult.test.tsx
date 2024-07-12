import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { QuizResult } from "./QuizResult";
import { QuizItem } from "../types/quiz";

const mockQuizItem: QuizItem = {
  question: "",
  correct_answer: "A",
  incorrect_answers: ["B", "C"],
  type: "multiple",
  difficulty: "easy",
  category: "test",
  answers: ["A", "B", "C"],
};

const mockQuiz: QuizItem[] = [...new Array(5)].map((_, index) => ({
  ...mockQuizItem,
  question: `question-${index}`,
}));

describe("Quiz Result", () => {
  test("verify score is 5/5", () => {
    const mockAnswers: Record<string, string> = {
      "question-0": "A",
      "question-1": "A",
      "question-2": "A",
      "question-3": "A",
      "question-4": "A",
    };
    verifyScore(mockAnswers, "bg-green-300", 5);
  });
  test("verify score is 4/5", () => {
    const mockAnswers: Record<string, string> = {
      "question-0": "A",
      "question-1": "A",
      "question-2": "A",
      "question-3": "B",
      "question-4": "A",
    };
    verifyScore(mockAnswers, "bg-green-300", 4);
  });
  test("verify score is 3/5", () => {
    const mockAnswers: Record<string, string> = {
      "question-0": "A",
      "question-1": "B",
      "question-2": "A",
      "question-3": "B",
      "question-4": "A",
    };
    verifyScore(mockAnswers, "bg-yellow-300", 3);
  });
  test("verify score is 2/5", () => {
    const mockAnswers: Record<string, string> = {
      "question-0": "A",
      "question-1": "B",
      "question-2": "B",
      "question-3": "B",
      "question-4": "A",
    };
    verifyScore(mockAnswers, "bg-yellow-300", 2);
  });
  test("verify score is 1/5", () => {
    const mockAnswers: Record<string, string> = {
      "question-0": "B",
      "question-1": "B",
      "question-2": "B",
      "question-3": "B",
      "question-4": "A",
    };
    verifyScore(mockAnswers, "bg-red-300", 1);
  });
  test("verify score is 0/5", () => {
    const mockAnswers: Record<string, string> = {
      "question-0": "B",
      "question-1": "B",
      "question-2": "B",
      "question-3": "B",
      "question-4": "B",
    };
    verifyScore(mockAnswers, "bg-red-300", 0);
  });
});

function verifyScore(
  answers: Record<string, string>,
  expectedClass: string,
  expectedScore: number
) {
  render(
    <MemoryRouter initialEntries={[{ state: { quiz: mockQuiz, answers } }]}>
      <QuizResult />
    </MemoryRouter>
  );
  const scoreLabel = screen.getByTestId("scoreLabel");
  expect(scoreLabel).toBeInTheDocument();
  expect(scoreLabel).toHaveClass(expectedClass);
  expect(scoreLabel).toHaveTextContent(`You scored ${expectedScore} out of 5`);
}
