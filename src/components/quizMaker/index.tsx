import { FormEvent, useState } from "react";
import { QuizMakerForm } from "../quizMakerForm";
import { DIFFICULTIES } from "../../data/difficulties";
import { useGetQuiz } from "../../hooks/useGetQuiz";
import { Difficulty } from "../../types/difficulty";
import { Quiz } from "../quiz";

/**
 * This component wrap the filters to create the form and the quiz component that will display the questions to the user
 */
export function QuizMaker() {
  const [category, setCategory] = useState<number>(0);
  const [difficulty, setDifficulty] = useState<Difficulty>(DIFFICULTIES[0].id);

  const { quiz, isLoading, error, fetchQuiz } = useGetQuiz();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // This function will define the right URL in the useGetQuiz hook and automatically fetch the
    // quiz after that. The result will be returned in the "quiz" value
    fetchQuiz(category, difficulty);
  };

  return (
    <div className="flex flex-col gap-8 w-full">
      <h1 className="text-2xl font-bold">Quiz maker</h1>
      <QuizMakerForm
        handleSubmit={handleSubmit}
        handleDifficultyChange={setDifficulty}
        handleCategoryChange={setCategory}
      />
      <Quiz quiz={quiz} isLoading={isLoading} error={error} />
    </div>
  );
}
