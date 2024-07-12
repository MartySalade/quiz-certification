import { QuizItem } from "../../../types/quiz";
import { Answer } from "../answer";

type Props = {
  answers: Record<string, string | undefined>;
  quizItem: QuizItem;
  handleSetAnswer?: (question: string, answer: string) => void;
};

export function Question({ answers, quizItem, handleSetAnswer }: Props) {
  return (
    <li className="w-full flex flex-col gap-2" key={quizItem.question}>
      <div dangerouslySetInnerHTML={{ __html: quizItem.question }} />
      <div className="flex justify-between gap-2">
        {quizItem.answers.map((answer) => (
          <Answer
            key={answer}
            answer={answer}
            isCorrect={quizItem.correct_answer === answer}
            isSelected={answers[quizItem.question] === answer}
            handleAnswerClick={() =>
              handleSetAnswer
                ? handleSetAnswer(quizItem.question, answer)
                : undefined
            }
          />
        ))}
      </div>
    </li>
  );
}
