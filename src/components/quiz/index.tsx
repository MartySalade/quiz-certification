import { useEffect, useState } from "react";
import { QuizItem } from "../../types/quiz";
import { Link } from "react-router-dom";
import { Question } from "./question";

type Props = {
  isLoading: boolean;
  quiz?: QuizItem[];
  error?: Error;
};

/**
 * This quiz displays the quiz where the user will interact by answering questions
 */
export function Quiz({ quiz, isLoading, error }: Props) {
  // We store the answer in an object such as key is the question and value is the selected answer
  const [answers, setAnswers] = useState<Record<string, string | undefined>>(
    {}
  );

  const handleSetAnswer = (question: string, response?: string) => {
    const currentResponse = answers[question];
    // If the user clicks again on it selected answer, set it to undefined to unselect it
    const newResponse = currentResponse === response ? undefined : response;
    setAnswers((prevState) => ({ ...prevState, [question]: newResponse }));
  };

  // Init the answers record with undefined answers for each question
  useEffect(() => {
    if (quiz) {
      const initialAnswers = quiz.reduce(
        (o, key) => ({ ...o, [key.question]: undefined }),
        {}
      );
      setAnswers(initialAnswers);
    }
  }, [quiz]);

  // A boolean to verify if there is at least one question that haven't been answered
  const hasQuestionNotAnswered = Object.values(answers).some(
    (answer) => !answer
  );

  return (
    <>
      {isLoading && <p>Loading quiz...</p>}
      {error && (
        <div className="p-2 px-4 bg-red-100 border rounded border-red-500">
          {error.name}: {error.message}
        </div>
      )}
      {!isLoading && quiz && (
        <ul className="flex flex-col gap-8">
          {quiz.map((quizItem) => (
            <Question
              key={quizItem.question}
              answers={answers}
              quizItem={quizItem}
              handleSetAnswer={handleSetAnswer}
            />
          ))}
        </ul>
      )}
      {quiz && !hasQuestionNotAnswered && (
        <Link
          to={"/result"}
          state={{ quiz, answers }}
          className="p-2 px-4 bg-slate-200 w-fit text-center rounded hover:bg-slate-300"
        >
          Submit
        </Link>
      )}
    </>
  );
}
