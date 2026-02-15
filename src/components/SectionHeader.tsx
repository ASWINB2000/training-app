'use client';

import Timer from './Timer';

interface SectionHeaderProps {
  sectionName: string;
  currentQuestion: number;
  totalQuestions: number;
  timeLimit: number;
  onExpire: () => void;
  sectionIndex: number;
}

export default function SectionHeader({
  sectionName,
  currentQuestion,
  totalQuestions,
  timeLimit,
  onExpire,
  sectionIndex,
}: SectionHeaderProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 px-6 py-4 flex items-center justify-between">
      <div>
        <h2 className="text-xl font-bold text-gray-900">{sectionName}</h2>
        <p className="text-sm text-gray-500 mt-1">
          Question {currentQuestion} of {totalQuestions}
        </p>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-sm text-gray-500">
          Section {sectionIndex + 1} of 4
        </div>
        <Timer timeLimit={timeLimit} onExpire={onExpire} isActive={true} />
      </div>
    </div>
  );
}
