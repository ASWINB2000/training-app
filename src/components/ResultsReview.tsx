'use client';

import { TestResult } from '@/types';

interface ResultsReviewProps {
  result: TestResult;
}

export default function ResultsReview({ result }: ResultsReviewProps) {
  const percentage = Math.round((result.score / result.totalQuestions) * 100);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Score summary */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Test Results</h1>
        <div className="mt-6">
          <div
            className={`inline-flex items-center justify-center w-32 h-32 rounded-full text-4xl font-bold ${
              percentage >= 70
                ? 'bg-green-100 text-green-700'
                : percentage >= 40
                ? 'bg-yellow-100 text-yellow-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {percentage}%
          </div>
          <p className="mt-4 text-lg text-gray-600">
            You scored{' '}
            <span className="font-bold text-gray-900">
              {result.score}/{result.totalQuestions}
            </span>
          </p>
        </div>
      </div>

      {/* Section-wise breakdown */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Section-wise Breakdown
        </h2>
        <div className="space-y-3">
          {result.sectionScores.map((ss, idx) => {
            const pct = Math.round((ss.score / ss.total) * 100);
            return (
              <div key={idx} className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">
                      {ss.sectionName}
                    </span>
                    <span className="text-sm text-gray-500">
                      {ss.score}/{ss.total}
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2.5">
                    <div
                      className={`h-2.5 rounded-full ${
                        pct >= 70
                          ? 'bg-green-500'
                          : pct >= 40
                          ? 'bg-yellow-500'
                          : 'bg-red-500'
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Question-by-question review */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-gray-900">Detailed Review</h2>
        {result.sections.map((section) => (
          <div key={section.id}>
            <h3 className="text-lg font-semibold text-gray-800 mb-3 mt-6">
              {section.name}
            </h3>
            <div className="space-y-4">
              {section.questions.map((question, qIdx) => {
                const userAnswer = result.answers[question.id];
                const userSelected = userAnswer?.selectedOptions || [];
                const isCorrect =
                  userSelected.length === question.correctAnswers.length &&
                  [...userSelected]
                    .sort()
                    .every(
                      (v, i) => v === [...question.correctAnswers].sort()[i]
                    );

                return (
                  <div
                    key={question.id}
                    className={`bg-white rounded-xl border-2 p-5 ${
                      isCorrect ? 'border-green-200' : 'border-red-200'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <span className="text-sm text-gray-500">
                          Q{qIdx + 1}
                          {question.type === 'multi-select' && (
                            <span className="ml-2 text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
                              Multi-select
                            </span>
                          )}
                        </span>
                        <p className="font-medium text-gray-900 mt-1">
                          {question.text}
                        </p>
                      </div>
                      <span
                        className={`flex-shrink-0 px-3 py-1 rounded-full text-sm font-medium ${
                          isCorrect
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {isCorrect ? 'Correct' : 'Incorrect'}
                      </span>
                    </div>

                    <div className="space-y-2">
                      {question.options.map((option, optIdx) => {
                        const isUserSelected = userSelected.includes(optIdx);
                        const isCorrectOption =
                          question.correctAnswers.includes(optIdx);

                        let bgClass = 'bg-gray-50 border-gray-200';
                        if (isCorrectOption) {
                          bgClass = 'bg-green-50 border-green-300';
                        } else if (isUserSelected && !isCorrectOption) {
                          bgClass = 'bg-red-50 border-red-300';
                        }

                        return (
                          <div
                            key={optIdx}
                            className={`px-4 py-2.5 rounded-lg border ${bgClass} flex items-center justify-between`}
                          >
                            <span className="flex items-center gap-2">
                              <span className="text-sm font-medium text-gray-500">
                                {String.fromCharCode(65 + optIdx)}.
                              </span>
                              <span className="text-gray-800">{option}</span>
                            </span>
                            <span className="flex items-center gap-2 text-sm">
                              {isUserSelected && (
                                <span className="text-blue-600 font-medium">
                                  Your answer
                                </span>
                              )}
                              {isCorrectOption && (
                                <span className="text-green-600 font-medium">
                                  Correct
                                </span>
                              )}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
