'use client';

import { useReducer, useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { testSections } from '@/data/questions';
import { TestState, TestAction, UserAnswer, TestResult } from '@/types';
import SectionHeader from './SectionHeader';
import QuestionCard from './QuestionCard';
import QuestionPalette from './QuestionPalette';

const initialState: TestState = {
  currentSectionIndex: 0,
  currentQuestionIndex: 0,
  answers: {},
  sectionStatuses: ['active', 'locked', 'locked', 'locked'],
  isFinished: false,
};

function testReducer(state: TestState, action: TestAction): TestState {
  switch (action.type) {
    case 'SELECT_ANSWER':
      return {
        ...state,
        answers: {
          ...state.answers,
          [action.questionId]: {
            questionId: action.questionId,
            selectedOptions: action.selectedOptions,
          },
        },
      };

    case 'NEXT_QUESTION': {
      const section = testSections[state.currentSectionIndex];
      if (state.currentQuestionIndex < section.questions.length - 1) {
        return { ...state, currentQuestionIndex: state.currentQuestionIndex + 1 };
      }
      return state;
    }

    case 'PREV_QUESTION': {
      if (state.currentQuestionIndex > 0) {
        return { ...state, currentQuestionIndex: state.currentQuestionIndex - 1 };
      }
      return state;
    }

    case 'GO_TO_QUESTION':
      return { ...state, currentQuestionIndex: action.index };

    case 'SUBMIT_SECTION':
    case 'EXPIRE_SECTION': {
      const nextSectionIndex = state.currentSectionIndex + 1;
      const newStatuses = [...state.sectionStatuses];
      newStatuses[state.currentSectionIndex] = 'completed';

      if (nextSectionIndex >= testSections.length) {
        return {
          ...state,
          sectionStatuses: newStatuses,
          isFinished: true,
        };
      }

      newStatuses[nextSectionIndex] = 'active';
      return {
        ...state,
        currentSectionIndex: nextSectionIndex,
        currentQuestionIndex: 0,
        sectionStatuses: newStatuses,
      };
    }

    default:
      return state;
  }
}

export default function TestEngine() {
  const [state, dispatch] = useReducer(testReducer, initialState);
  const [showConfirm, setShowConfirm] = useState(false);
  const router = useRouter();

  const currentSection = testSections[state.currentSectionIndex];
  const currentQuestion = currentSection?.questions[state.currentQuestionIndex];
  const currentAnswer = currentQuestion
    ? state.answers[currentQuestion.id]
    : undefined;

  const handleSelectOption = useCallback(
    (selectedOptions: number[]) => {
      if (!currentQuestion) return;
      dispatch({
        type: 'SELECT_ANSWER',
        questionId: currentQuestion.id,
        selectedOptions,
      });
    },
    [currentQuestion]
  );

  const handleExpire = useCallback(() => {
    dispatch({ type: 'EXPIRE_SECTION' });
  }, []);

  const handleSubmitSection = useCallback(() => {
    setShowConfirm(true);
  }, []);

  const confirmSubmit = useCallback(() => {
    setShowConfirm(false);
    dispatch({ type: 'SUBMIT_SECTION' });
  }, []);

  // When test finishes, save results and navigate
  if (state.isFinished) {
    const result = calculateResults(state.answers);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('testResults', JSON.stringify(result));
      router.push('/results');
    }
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Calculating your results...</p>
        </div>
      </div>
    );
  }

  if (!currentSection || !currentQuestion) return null;

  const isLastSection = state.currentSectionIndex === testSections.length - 1;
  const isLastQuestion =
    state.currentQuestionIndex === currentSection.questions.length - 1;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Section progress bar */}
        <div className="flex gap-1 mb-6">
          {testSections.map((section, idx) => (
            <div
              key={section.id}
              className={`flex-1 h-2 rounded-full ${
                state.sectionStatuses[idx] === 'completed'
                  ? 'bg-green-500'
                  : state.sectionStatuses[idx] === 'active'
                  ? 'bg-blue-500'
                  : 'bg-gray-200'
              }`}
            />
          ))}
        </div>

        <SectionHeader
          sectionName={currentSection.name}
          currentQuestion={state.currentQuestionIndex + 1}
          totalQuestions={currentSection.questions.length}
          timeLimit={currentSection.timeLimit}
          onExpire={handleExpire}
          sectionIndex={state.currentSectionIndex}
        />

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main question area */}
          <div className="lg:col-span-3 space-y-4">
            <QuestionCard
              question={currentQuestion}
              questionNumber={state.currentQuestionIndex + 1}
              selectedOptions={currentAnswer?.selectedOptions || []}
              onSelectOption={handleSelectOption}
            />

            {/* Navigation buttons */}
            <div className="flex justify-between items-center">
              <button
                onClick={() => dispatch({ type: 'PREV_QUESTION' })}
                disabled={state.currentQuestionIndex === 0}
                className="px-5 py-2.5 rounded-lg font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed bg-gray-200 text-gray-700 hover:bg-gray-300"
              >
                Previous
              </button>

              <div className="flex gap-3">
                {!isLastQuestion && (
                  <button
                    onClick={() => dispatch({ type: 'NEXT_QUESTION' })}
                    className="px-5 py-2.5 rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                  >
                    Next
                  </button>
                )}
                <button
                  onClick={handleSubmitSection}
                  className={`px-5 py-2.5 rounded-lg font-medium transition-colors ${
                    isLastSection
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'bg-orange-500 text-white hover:bg-orange-600'
                  }`}
                >
                  {isLastSection ? 'Submit Test' : 'Submit Section'}
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <QuestionPalette
              questions={currentSection.questions}
              currentIndex={state.currentQuestionIndex}
              answers={state.answers}
              onGoToQuestion={(index) =>
                dispatch({ type: 'GO_TO_QUESTION', index })
              }
            />
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md mx-4 shadow-xl">
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              {isLastSection ? 'Submit Test?' : 'Submit Section?'}
            </h3>
            <p className="text-gray-600 mb-6">
              {isLastSection
                ? 'Are you sure you want to submit the test? You will not be able to change your answers.'
                : 'You cannot return to this section after submitting. Are you sure you want to continue?'}
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 rounded-lg font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmSubmit}
                className="px-4 py-2 rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function calculateResults(answers: Record<string, UserAnswer>): TestResult {
  let totalScore = 0;
  const totalQuestions = testSections.reduce(
    (sum, s) => sum + s.questions.length,
    0
  );
  const sectionScores = testSections.map((section) => {
    let sectionScore = 0;
    section.questions.forEach((q) => {
      const answer = answers[q.id];
      if (answer && isCorrect(answer.selectedOptions, q.correctAnswers)) {
        sectionScore++;
      }
    });
    totalScore += sectionScore;
    return {
      sectionName: section.name,
      score: sectionScore,
      total: section.questions.length,
    };
  });

  return {
    sections: testSections,
    answers,
    score: totalScore,
    totalQuestions,
    sectionScores,
  };
}

function isCorrect(selected: number[], correct: number[]): boolean {
  if (selected.length !== correct.length) return false;
  const sortedSelected = [...selected].sort();
  const sortedCorrect = [...correct].sort();
  return sortedSelected.every((val, idx) => val === sortedCorrect[idx]);
}
