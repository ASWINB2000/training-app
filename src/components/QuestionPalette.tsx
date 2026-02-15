'use client';

import { Question, UserAnswer } from '@/types';

interface QuestionPaletteProps {
  questions: Question[];
  currentIndex: number;
  answers: Record<string, UserAnswer>;
  onGoToQuestion: (index: number) => void;
}

export default function QuestionPalette({
  questions,
  currentIndex,
  answers,
  onGoToQuestion,
}: QuestionPaletteProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
      <h4 className="text-sm font-semibold text-gray-600 mb-3">Questions</h4>
      <div className="grid grid-cols-5 gap-2">
        {questions.map((q, index) => {
          const answer = answers[q.id];
          const isAnswered = answer && answer.selectedOptions.length > 0;
          const isCurrent = index === currentIndex;

          let colorClasses: string;
          if (isCurrent) {
            colorClasses = 'bg-blue-600 text-white ring-2 ring-blue-300';
          } else if (isAnswered) {
            colorClasses = 'bg-green-500 text-white';
          } else {
            colorClasses = 'bg-gray-100 text-gray-600 hover:bg-gray-200';
          }

          return (
            <button
              key={q.id}
              onClick={() => onGoToQuestion(index)}
              className={`w-9 h-9 rounded-lg text-sm font-semibold transition-all ${colorClasses}`}
            >
              {index + 1}
            </button>
          );
        })}
      </div>
      <div className="mt-4 space-y-1 text-xs text-gray-500">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded bg-green-500 inline-block" />
          Answered
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded bg-gray-100 border border-gray-300 inline-block" />
          Unanswered
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded bg-blue-600 inline-block" />
          Current
        </div>
      </div>
    </div>
  );
}
