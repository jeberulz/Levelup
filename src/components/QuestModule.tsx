'use client';

import { useState } from 'react';
import { X, CheckCircle2, Circle, ArrowRight, ArrowLeft, Trophy, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

interface QuestStep {
  type: 'content' | 'quiz' | 'action';
  title: string;
  content?: string;
  question?: string;
  options?: string[];
  correctAnswer?: number;
  actionItems?: string[];
}

interface QuestModuleProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (xpEarned: number) => void;
  questTitle: string;
  xpReward: number;
}

export default function QuestModule({ 
  isOpen, 
  onClose, 
  onComplete,
  questTitle,
  xpReward 
}: QuestModuleProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [checkedItems, setCheckedItems] = useState<boolean[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);

  // Quest content - in a real app, this would come from an API
  const questSteps: QuestStep[] = [
    {
      type: 'content',
      title: 'Understanding Daily Spending',
      content: 'Tracking your daily expenses is the foundation of financial awareness. When you know where your money goes, you can make better decisions about your spending habits.\n\nThe average person makes 3-5 financial decisions per day, from coffee purchases to subscription renewals. Each decision, no matter how small, contributes to your overall financial health.'
    },
    {
      type: 'content',
      title: 'The Power of Categorization',
      content: 'Grouping expenses into categories helps you identify patterns. Common categories include:\n\n• Essentials (rent, groceries, utilities)\n• Lifestyle (dining out, entertainment)\n• Transportation (gas, public transit)\n• Personal (clothing, healthcare)\n\nThis simple practice can reveal surprising insights about your spending patterns.'
    },
    {
      type: 'quiz',
      title: 'Quick Check',
      question: 'Why is categorizing expenses important?',
      options: [
        'It makes you feel organized',
        'It helps identify spending patterns and areas to optimize',
        'It\'s required by law',
        'It impresses your friends'
      ],
      correctAnswer: 1
    },
    {
      type: 'action',
      title: 'Your Action Steps',
      content: 'Complete these tasks to finish your quest:',
      actionItems: [
        'Review today\'s purchases (even just mentally)',
        'Identify at least 3 spending categories from your day',
        'Think of one small change you could make to improve',
        'Commit to tracking expenses for the next 3 days'
      ]
    }
  ];

  if (!isOpen) return null;

  const currentStepData = questSteps[currentStep];
  const isLastStep = currentStep === questSteps.length - 1;
  const totalSteps = questSteps.length;

  const handleNext = () => {
    if (currentStepData.type === 'quiz') {
      if (selectedAnswer === null) {
        alert('Please select an answer');
        return;
      }
      
      const correct = selectedAnswer === currentStepData.correctAnswer;
      setIsCorrect(correct);
      setShowFeedback(true);
      
      setTimeout(() => {
        setShowFeedback(false);
        setSelectedAnswer(null);
        if (currentStep < questSteps.length - 1) {
          setCurrentStep(currentStep + 1);
        }
      }, 2000);
    } else if (currentStepData.type === 'action') {
      // Check if all items are checked
      const allChecked = checkedItems.length === currentStepData.actionItems?.length &&
                        checkedItems.every(item => item === true);
      
      if (!allChecked) {
        alert('Please complete all action items to finish the quest');
        return;
      }
      
      setShowCompletion(true);
    } else {
      if (currentStep < questSteps.length - 1) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    }
  };

  const handleComplete = () => {
    onComplete(xpReward);
    toast.success('Quest Completed!', {
      description: `You earned +${xpReward} XP`,
      duration: 3000,
    });
    onClose();
    // Reset state
    setCurrentStep(0);
    setCheckedItems([]);
    setShowCompletion(false);
  };

  const toggleActionItem = (index: number) => {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = !newCheckedItems[index];
    setCheckedItems(newCheckedItems);
  };

  // Initialize checked items array for action step
  if (currentStepData.type === 'action' && checkedItems.length === 0) {
    setCheckedItems(new Array(currentStepData.actionItems?.length || 0).fill(false));
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Module Container */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-neutral-900 to-neutral-800 p-6 text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors z-10"
            aria-label="Close quest"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="pr-12">
            <p className="text-white/80 mb-2">Quest in Progress</p>
            <h2 className="text-white mb-4">{questTitle}</h2>
            
            {/* Progress Bar */}
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 bg-white/20 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-white rounded-full transition-all duration-500"
                  style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
                />
              </div>
              <span className="text-white/90">
                {currentStep + 1}/{totalSteps}
              </span>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8">
          {!showCompletion ? (
            <>
              <h3 className="text-neutral-900 mb-6">{currentStepData.title}</h3>

              {/* Content Type */}
              {currentStepData.type === 'content' && (
                <div className="prose prose-neutral max-w-none">
                  <p className="text-neutral-700 whitespace-pre-line leading-relaxed">
                    {currentStepData.content}
                  </p>
                </div>
              )}

              {/* Quiz Type */}
              {currentStepData.type === 'quiz' && (
                <div>
                  <p className="text-neutral-900 mb-6">{currentStepData.question}</p>
                  <div className="space-y-3">
                    {currentStepData.options?.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => !showFeedback && setSelectedAnswer(index)}
                        disabled={showFeedback}
                        className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                          selectedAnswer === index
                            ? showFeedback
                              ? isCorrect
                                ? 'border-green-500 bg-green-50'
                                : 'border-red-500 bg-red-50'
                              : 'border-neutral-900 bg-neutral-50'
                            : 'border-neutral-200 hover:border-neutral-300 bg-white'
                        } ${showFeedback ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            selectedAnswer === index
                              ? showFeedback
                                ? isCorrect
                                  ? 'border-green-500 bg-green-500'
                                  : 'border-red-500 bg-red-500'
                                : 'border-neutral-900 bg-neutral-900'
                              : 'border-neutral-300'
                          }`}>
                            {selectedAnswer === index && showFeedback && (
                              <CheckCircle2 className="h-4 w-4 text-white" />
                            )}
                          </div>
                          <span className="text-neutral-900">{option}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                  
                  {showFeedback && (
                    <div className={`mt-6 p-4 rounded-lg ${
                      isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                    }`}>
                      <p className={isCorrect ? 'text-green-800' : 'text-red-800'}>
                        {isCorrect ? '✓ Correct! Great job.' : '✗ Not quite. The correct answer helps you understand spending patterns.'}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Action Type */}
              {currentStepData.type === 'action' && (
                <div>
                  <p className="text-neutral-700 mb-6">{currentStepData.content}</p>
                  <div className="space-y-3">
                    {currentStepData.actionItems?.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => toggleActionItem(index)}
                        className="w-full text-left p-4 rounded-lg border border-neutral-200 hover:border-neutral-300 bg-white transition-all"
                      >
                        <div className="flex items-start gap-3">
                          <div className={`mt-0.5 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                            checkedItems[index]
                              ? 'border-green-500 bg-green-500'
                              : 'border-neutral-300'
                          }`}>
                            {checkedItems[index] && (
                              <CheckCircle2 className="h-4 w-4 text-white" />
                            )}
                          </div>
                          <span className={`flex-1 ${
                            checkedItems[index] ? 'text-neutral-500 line-through' : 'text-neutral-900'
                          }`}>
                            {item}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            /* Completion Screen */
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 mb-6 animate-bounce">
                <Trophy className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-neutral-900 mb-3">Quest Completed! 🎉</h3>
              <p className="text-neutral-600 mb-8">
                You've earned valuable financial knowledge and XP!
              </p>
              
              <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-neutral-900 to-neutral-800 rounded-2xl text-white mb-8">
                <Sparkles className="h-6 w-6 text-yellow-400" />
                <div>
                  <p className="text-white/80">XP Earned</p>
                  <p className="text-white">+{xpReward} XP</p>
                </div>
              </div>

              <div className="bg-neutral-50 rounded-xl p-6 max-w-md mx-auto">
                <p className="text-neutral-700 mb-2">Keep the momentum going!</p>
                <p className="text-neutral-600">
                  Come back tomorrow for your next quest and maintain your streak.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer - Navigation */}
        {!showCompletion && (
          <div className="border-t border-neutral-200 p-6 bg-neutral-50">
            <div className="flex items-center justify-between">
              <button
                onClick={handleBack}
                disabled={currentStep === 0}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-neutral-700 hover:bg-neutral-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </button>

              <button
                onClick={handleNext}
                disabled={showFeedback}
                className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                {isLastStep ? 'Complete Quest' : 'Continue'}
                {!isLastStep && <ArrowRight className="h-4 w-4" />}
              </button>
            </div>
          </div>
        )}

        {/* Completion Footer */}
        {showCompletion && (
          <div className="border-t border-neutral-200 p-6 bg-neutral-50">
            <button
              onClick={handleComplete}
              className="w-full py-3 px-6 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors shadow-lg"
            >
              Return to Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
