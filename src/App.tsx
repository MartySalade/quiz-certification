import "./App.css";
import { QuizMaker } from "./components/quizMaker";

function App() {
  return (
    <div className="flex flex-col items-center gap-4 p-16 max-w-7xl mx-auto">
      <QuizMaker />
    </div>
  );
}

export default App;
