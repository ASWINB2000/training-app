'use client';

import Link from 'next/link';
import { testSections, testTitle, testDescription } from '@/data/questions';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{testTitle}</h1>
          <p className="text-gray-600 mb-8">{testDescription}</p>

          {/* Section overview */}
          <div className="mb-8">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
              Sections
            </h2>
            <div className="space-y-2">
              {testSections.map((section, idx) => (
                <div
                  key={section.id}
                  className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-sm font-bold">
                      {idx + 1}
                    </span>
                    <span className="font-medium text-gray-800">
                      {section.name}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500">
                    {section.questions.length} questions &middot;{' '}
                    {Math.floor(section.timeLimit / 60)} min
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8">
            <h3 className="font-semibold text-amber-800 mb-2">Instructions</h3>
            <ul className="text-sm text-amber-700 space-y-1 list-disc list-inside">
              <li>Each section has its own time limit</li>
              <li>You must complete each section before moving to the next</li>
              <li>Once a section is submitted, you cannot go back</li>
              <li>If time runs out, the section will be auto-submitted</li>
              <li>Some questions may have multiple correct answers</li>
            </ul>
          </div>

          <Link
            href="/test"
            className="block w-full text-center bg-blue-600 text-white font-semibold py-3.5 rounded-xl hover:bg-blue-700 transition-colors text-lg"
          >
            Start Test
          </Link>
        </div>
      </div>
    </div>
  );
}
