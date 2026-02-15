'use client';

import { Question } from '@/types';

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  selectedOptions: number[];
  onSelectOption: (selectedOptions: number[]) => void;
}

export default function QuestionCard({
  question,
  questionNumber,
  selectedOptions,
  onSelectOption,
}: QuestionCardProps) {
  const handleOptionClick = (index: number) => {
    if (question.type === 'mcq') {
      onSelectOption([index]);
    } else {
      // multi-select: toggle the option
      if (selectedOptions.includes(index)) {
        onSelectOption(selectedOptions.filter((i) => i !== index));
      } else {
        onSelectOption([...selectedOptions, index]);
      }
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="mb-1 text-sm text-gray-500 font-medium">
        Question {questionNumber}
        {question.type === 'multi-select' && (
          <span className="ml-2 inline-block bg-amber-100 text-amber-700 text-xs px-2 py-0.5 rounded-full">
            Multiple answers
          </span>
        )}
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-5">
        {question.text}
      </h3>
      <div className="space-y-3">
        {question.options.map((option, index) => {
          const isSelected = selectedOptions.includes(index);
          return (
            <button
              key={index}
              onClick={() => handleOptionClick(index)}
              className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-all ${
                isSelected
                  ? 'border-blue-500 bg-blue-50 text-blue-900'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700'
              }`}
            >
              <span className="flex items-center gap-3">
                <span
                  className={`flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-${
                    question.type === 'mcq' ? 'full' : 'md'
                  } border-2 text-xs font-bold ${
                    isSelected
                      ? 'border-blue-500 bg-blue-500 text-white'
                      : 'border-gray-300 text-gray-400'
                  }`}
                >
                  {isSelected
                    ? question.type === 'mcq'
                      ? '\u2022'
                      : '\u2713'
                    : String.fromCharCode(65 + index)}
                </span>
                <span>{option}</span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
