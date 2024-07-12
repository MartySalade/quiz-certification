import { Link, useLocation } from "react-router-dom";
import { QuizItem } from "../types/quiz";
import { Question } from "../components/quiz/question";

/**
 * This component display the quiz result with the user answers
 */
export function QuizResult() {
  // Get the data from the home page that we passed using react-router-dom
  const location = useLocation();
  const {
    quiz = [],
    answers = {},
  }: { quiz: QuizItem[]; answers: Record<string, string> } = location.state;

  const score = quiz.reduce((prevValue, currValue) => {
    if (answers[currValue.question] === currValue.correct_answer) {
      return prevValue + 1;
    }
    return prevValue;
  }, 0);

  let scoreBg = "bg-red-300";
  if (score > 1 && score < 4) scoreBg = "bg-yellow-300";
  if (score > 3) scoreBg = "bg-green-300";

  return (
    <div className="flex flex-col items-center gap-4 p-16 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold">Results</h1>
      {quiz?.map((quizItem) => (
        <Question
          key={quizItem.question}
          answers={answers}
          quizItem={quizItem}
        />
      ))}
      <p data-testid="scoreLabel" className={`p-2 rounded ${scoreBg}`}>
        You scored {score} out of 5
      </p>
      <Link
        to={"/"}
        className="bg-slate-200 hover:bg-slate-300 p-2 rounded w-72 text-center mt-8"
      >
        Create a new quiz
      </Link>
    </div>
  );
}
