import { ChangeEvent } from "react";
import { DIFFICULTIES } from "../../data/difficulties";
import { Difficulty } from "../../types/difficulty";

type Props = {
  handleDifficultyChange: (newValue: Difficulty) => void;
};

/**
 * This component allow the user to select a difficulty from the static difficulties list
 */
export function DifficultySelect({ handleDifficultyChange }: Props) {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    handleDifficultyChange(value as Difficulty);
  };

  return (
    <select
      onChange={handleChange}
      name="difficulty"
      id="difficultySelect"
      className="bg-slate-200 rounded p-2"
    >
      {DIFFICULTIES.map((difficulty) => (
        <option key={difficulty.id} value={difficulty.id}>
          {difficulty.label}
        </option>
      ))}
    </select>
  );
}
