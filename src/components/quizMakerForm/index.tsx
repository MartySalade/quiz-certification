import { FormEvent } from "react";
import { CategorySelect } from "../categorySelect";
import { DifficultySelect } from "../difficultySelect";
import { Difficulty } from "../../types/difficulty";

type Props = {
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  handleCategoryChange: (newValue: number) => void;
  handleDifficultyChange: (newValue: Difficulty) => void;
};

export function QuizMakerForm({
  handleSubmit,
  handleCategoryChange,
  handleDifficultyChange,
}: Props) {
  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <CategorySelect handleCategoryChange={handleCategoryChange} />
      <DifficultySelect handleDifficultyChange={handleDifficultyChange} />
      <button
        id="createBtn"
        className="p-2 bg-slate-200 hover:bg-slate-300 rounded"
      >
        Create
      </button>
    </form>
  );
}
