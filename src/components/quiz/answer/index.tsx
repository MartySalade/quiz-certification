import { useLocation } from "react-router-dom";
import { Routes } from "../../../data/routes";

type Props = {
  answer: string;
  isSelected: boolean;
  isCorrect: boolean;
  handleAnswerClick: () => void;
};

/**
 * This Answer component displays an answer. It can have multiple status:
 * - If "displayResult" is true meaning we are on the result page, we don't want to user to interract with
 * the answer. Also, we want to display the good answer to the user if he failed
 * - Otherwise, we only want to display in green the user selected answer
 */
export function Answer({
  answer,
  isSelected,
  isCorrect,
  handleAnswerClick,
}: Props) {
  const location = useLocation();
  const displayResult = location.pathname === Routes.RESULT;

  let answerColor = isSelected ? "bg-green-200" : "bg-transparent";
  if (displayResult) {
    if (isSelected && !isCorrect) answerColor = "bg-red-200 border-red-500";
    if (!isSelected && isCorrect) answerColor = "bg-green-200";
  }

  return (
    <button
      onClick={() => (displayResult ? undefined : handleAnswerClick())}
      className={`border border-green-500 rounded p-4 w-full flex items-center justify-center ${answerColor}`}
    >
      <div dangerouslySetInnerHTML={{ __html: answer }} />
    </button>
  );
}
