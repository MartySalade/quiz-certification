import { useEffect, useState } from "react";
import { Quiz, QuizItem } from "../types/quiz";
import { Difficulty } from "../types/difficulty";
import { getOpenTriviaData } from "../api/utils";
import { shuffleArray } from "../utils/shuffle";

export function useGetQuiz() {
  const [quiz, setQuiz] = useState<QuizItem[]>();
  const [error, setError] = useState<Error>();
  const [isLoading, setIsLoading] = useState(false);

  const [url, setUrl] = useState<string>();

  function fetchQuiz(category: number, difficulty: Difficulty) {
    // We set the URL and then it will automatically trigger the
    // asyncGetQuiz function in the useEffect to fetch the quiz
    setUrl(
      `api.php?amount=5&category=${category}&difficulty=${difficulty}&type=multiple`
    );
  }

  useEffect(() => {
    async function asyncGetQuiz(url: string) {
      setIsLoading(true);
      try {
        const quiz = await getOpenTriviaData<Quiz>(url);

        // No error
        if (quiz?.response_code === 0) {
          setError(undefined);
          const quizWithSuffleAnswers = quiz.results.map((quizItem) => {
            const answers = shuffleArray([
              ...quizItem.incorrect_answers,
              quizItem.correct_answer,
            ]);
            return {
              ...quizItem,
              answers,
            };
          });
          setQuiz(quizWithSuffleAnswers);
        }

        // Rate limit
        if (quiz?.response_code === 5)
          setError(
            new Error(
              "Rate limit. Please wait 5 seconds before your next quiz creation"
            )
          );
      } catch (err) {
        if (err instanceof Error) {
          setError(err);
        } else {
          setError(new Error(`An error occured while fetching quiz`));
        }
      } finally {
        setIsLoading(false);
      }
    }
    if (url) {
      asyncGetQuiz(url);
    }
  }, [url]);

  return { quiz, isLoading, error, fetchQuiz };
}
