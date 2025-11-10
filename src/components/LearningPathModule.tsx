'use client';

import { useState } from 'react';
import { 
  X, 
  BookOpen,
  CheckCircle,
  Circle,
  Lock,
  Play,
  FileText,
  Award,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Clock,
  Trophy,
  Target,
  TrendingUp,
  Lightbulb,
  Video,
  ListChecks,
  Brain
} from 'lucide-react';

interface LearningPathModuleProps {
  isOpen: boolean;
  onClose: () => void;
  pathTitle: string;
  pathIcon: any;
  onComplete?: (xpEarned: number) => void;
}

interface Lesson {
  id: number;
  title: string;
  duration: string;
  type: 'video' | 'reading' | 'interactive' | 'quiz';
  completed: boolean;
  locked: boolean;
  xpReward: number;
  content?: {
    introduction?: string;
    sections?: {
      title: string;
      content: string;
      tips?: string[];
    }[];
    keyTakeaways?: string[];
    quiz?: {
      question: string;
      options: string[];
      correctAnswer: number;
      explanation: string;
    }[];
    actionItems?: string[];
  };
}

export default function LearningPathModule({ 
  isOpen, 
  onClose, 
  pathTitle,
  pathIcon: PathIcon,
  onComplete 
}: LearningPathModuleProps) {
  const [currentView, setCurrentView] = useState<'overview' | 'lesson'>('overview');
  const [selectedLesson, setSelectedLesson] = useState<number | null>(null);
  const [lessonProgress, setLessonProgress] = useState<'content' | 'quiz' | 'complete'>('content');
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [showQuizResult, setShowQuizResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());

  // Mock lessons data for Budget Basics path
  const [lessons, setLessons] = useState<Lesson[]>([
    {
      id: 1,
      title: 'Introduction to Budgeting',
      duration: '8 min',
      type: 'video',
      completed: true,
      locked: false,
      xpReward: 50,
      content: {
        introduction: 'Welcome to Budget Basics! In this lesson, you\'ll learn the fundamental principles of budgeting and why it\'s essential for financial success.',
        sections: [
          {
            title: 'What is a Budget?',
            content: 'A budget is a financial plan that helps you track your income and expenses. It\'s like a roadmap for your money, showing you where your money comes from and where it goes each month.',
            tips: [
              'Think of a budget as telling your money where to go, instead of wondering where it went',
              'A budget isn\'t about restriction—it\'s about making intentional choices with your money'
            ]
          },
          {
            title: 'Why Budgeting Matters',
            content: 'Budgeting helps you achieve financial goals, reduce stress, avoid debt, and build wealth over time. Studies show that people who budget regularly save 18% more than those who don\'t.',
            tips: [
              'Budgeting can reduce financial stress by up to 68%',
              'You\'re 42% more likely to reach your financial goals with a budget'
            ]
          }
        ],
        keyTakeaways: [
          'A budget is a plan for your money',
          'Budgeting helps you reach financial goals faster',
          'Everyone can benefit from budgeting, regardless of income level',
          'The best budget is one you\'ll actually stick to'
        ]
      }
    },
    {
      id: 2,
      title: 'The 50/30/20 Rule Explained',
      duration: '10 min',
      type: 'reading',
      completed: true,
      locked: false,
      xpReward: 75,
      content: {
        introduction: 'The 50/30/20 rule is one of the most popular budgeting methods. It\'s simple, flexible, and effective for most people.',
        sections: [
          {
            title: '50% - Needs',
            content: 'Allocate 50% of your after-tax income to needs—essentials you can\'t live without. This includes housing, utilities, groceries, transportation, insurance, and minimum debt payments.',
            tips: [
              'If your needs exceed 50%, look for ways to reduce housing or transportation costs',
              'Distinguish between needs (groceries) and wants (dining out)'
            ]
          },
          {
            title: '30% - Wants',
            content: 'Use 30% for wants—things that make life enjoyable but aren\'t essential. This includes dining out, entertainment, hobbies, subscriptions, and shopping.',
            tips: [
              'Wants are flexible—this is where you can cut back if needed',
              'It\'s okay to enjoy your money! Just do it intentionally'
            ]
          },
          {
            title: '20% - Savings & Debt',
            content: 'Dedicate 20% to savings and extra debt payments. This includes emergency fund, retirement, investments, and paying down debt beyond minimums.',
            tips: [
              'Pay yourself first—set up automatic transfers to savings',
              'Build a $1,000 emergency fund before aggressive debt payoff'
            ]
          }
        ],
        keyTakeaways: [
          '50% for needs, 30% for wants, 20% for savings',
          'Adjust percentages based on your situation',
          'Focus on progress, not perfection',
          'The rule is a guideline, not a rigid requirement'
        ]
      }
    },
    {
      id: 3,
      title: 'Tracking Your Income',
      duration: '7 min',
      type: 'interactive',
      completed: true,
      locked: false,
      xpReward: 60,
      content: {
        introduction: 'Before you can budget, you need to know how much money you have coming in. Let\'s learn to track all income sources.',
        sections: [
          {
            title: 'Calculate Your Net Income',
            content: 'Your net income is what you actually take home after taxes and deductions. For salaried employees, this is your paycheck amount. For hourly workers or freelancers, track your actual monthly deposits.',
          },
          {
            title: 'Include All Income Sources',
            content: 'Don\'t forget side hustles, freelance work, investment income, rental income, or regular gifts. Every dollar counts!',
          }
        ],
        actionItems: [
          'Check your last 3 paychecks or bank statements',
          'Calculate your average monthly take-home pay',
          'List any additional income sources',
          'Add it all up to get your total monthly income'
        ],
        keyTakeaways: [
          'Use net income (after taxes), not gross income',
          'Track all income sources, including side hustles',
          'If income varies, use a 3-month average',
          'Update your income when you get a raise or new income stream'
        ]
      }
    },
    {
      id: 4,
      title: 'Knowledge Check: Budget Fundamentals',
      duration: '5 min',
      type: 'quiz',
      completed: false,
      locked: false,
      xpReward: 100,
      content: {
        quiz: [
          {
            question: 'According to the 50/30/20 rule, what percentage of your income should go to needs?',
            options: ['30%', '40%', '50%', '60%'],
            correctAnswer: 2,
            explanation: 'The 50/30/20 rule recommends allocating 50% of your after-tax income to needs (essentials like housing, food, and transportation).'
          },
          {
            question: 'Which of these is considered a "want" rather than a "need"?',
            options: ['Rent payment', 'Groceries', 'Netflix subscription', 'Car insurance'],
            correctAnswer: 2,
            explanation: 'A Netflix subscription is a want—it makes life more enjoyable but isn\'t essential. Rent, groceries, and insurance are needs.'
          },
          {
            question: 'What should you use when calculating your budget?',
            options: ['Gross income (before taxes)', 'Net income (after taxes)', 'Only your salary', 'Future expected income'],
            correctAnswer: 1,
            explanation: 'Always use net income (after taxes) when budgeting. This is the actual money you have available to spend.'
          },
          {
            question: 'What\'s the recommended minimum emergency fund before focusing on debt payoff?',
            options: ['$500', '$1,000', '$5,000', '$10,000'],
            correctAnswer: 1,
            explanation: 'Financial experts recommend building a $1,000 starter emergency fund before aggressively paying down debt. This prevents you from going further into debt when unexpected expenses arise.'
          }
        ]
      }
    },
    {
      id: 5,
      title: 'Categorizing Your Expenses',
      duration: '12 min',
      type: 'reading',
      completed: false,
      locked: false,
      xpReward: 75,
      content: {
        introduction: 'Learn how to organize your expenses into categories to understand your spending patterns and make better decisions.',
        sections: [
          {
            title: 'Fixed vs. Variable Expenses',
            content: 'Fixed expenses stay the same each month (rent, car payment, insurance). Variable expenses change monthly (groceries, utilities, entertainment). Understanding this difference helps with planning.',
          },
          {
            title: 'Common Budget Categories',
            content: 'Typical categories include: Housing, Transportation, Food (groceries + dining out), Utilities, Insurance, Healthcare, Personal Care, Entertainment, Savings, and Debt Payment.',
          },
          {
            title: 'Customizing Your Categories',
            content: 'Your budget should reflect YOUR life. If you have a pet, create a Pet Care category. If you\'re a student, add a Textbooks category. Make it personal!',
          }
        ],
        keyTakeaways: [
          'Fixed expenses are predictable; variable expenses fluctuate',
          'Most budgets have 8-12 main categories',
          'Create categories that match your lifestyle',
          'Review and adjust categories over time'
        ]
      }
    },
    {
      id: 6,
      title: 'Building Your First Budget',
      duration: '15 min',
      type: 'interactive',
      completed: false,
      locked: false,
      xpReward: 100,
      content: {
        introduction: 'Now it\'s time to put everything together and create your first budget! Follow these steps to build a budget that works.',
        actionItems: [
          'Write down your total monthly net income',
          'List all fixed expenses with exact amounts',
          'Estimate variable expenses based on past spending',
          'Assign every dollar to a category',
          'Ensure expenses don\'t exceed income',
          'Build in a buffer for unexpected costs'
        ],
        keyTakeaways: [
          'Give every dollar a job (zero-based budgeting)',
          'Be realistic with estimates—check past spending',
          'Include a miscellaneous category for surprises',
          'Your first budget won\'t be perfect—that\'s okay!'
        ]
      }
    },
    {
      id: 7,
      title: 'Budgeting Tools & Apps',
      duration: '8 min',
      type: 'video',
      completed: false,
      locked: true,
      xpReward: 60,
    },
    {
      id: 8,
      title: 'Adjusting Your Budget',
      duration: '10 min',
      type: 'reading',
      completed: false,
      locked: true,
      xpReward: 75,
    },
    {
      id: 9,
      title: 'Advanced Budgeting Strategies',
      duration: '12 min',
      type: 'reading',
      completed: false,
      locked: true,
      xpReward: 100,
    },
    {
      id: 10,
      title: 'Final Assessment',
      duration: '10 min',
      type: 'quiz',
      completed: false,
      locked: true,
      xpReward: 150,
    }
  ]);

  const currentLesson = selectedLesson !== null ? lessons[selectedLesson] : null;
  const completedCount = lessons.filter(l => l.completed).length;
  const totalLessons = lessons.length;
  const progressPercentage = (completedCount / totalLessons) * 100;

  const handleStartLesson = (lessonIndex: number) => {
    if (lessons[lessonIndex].locked) return;
    setSelectedLesson(lessonIndex);
    setCurrentView('lesson');
    setLessonProgress('content');
    setCurrentQuizIndex(0);
    setQuizAnswers([]);
    setShowQuizResult(false);
    setSelectedAnswer(null);
    setCheckedItems(new Set());
  };

  const handleCompleteLesson = () => {
    if (selectedLesson === null) return;

    const lesson = lessons[selectedLesson];
    const updatedLessons = [...lessons];
    updatedLessons[selectedLesson] = { ...lesson, completed: true };

    // Unlock next lesson
    if (selectedLesson < lessons.length - 1) {
      updatedLessons[selectedLesson + 1] = { 
        ...updatedLessons[selectedLesson + 1], 
        locked: false 
      };
    }

    setLessons(updatedLessons);
    setLessonProgress('complete');

    // Award XP
    if (onComplete) {
      onComplete(lesson.xpReward);
    }
  };

  const handleQuizAnswer = (answerIndex: number) => {
    if (!currentLesson?.content?.quiz || showQuizResult) return;
    
    setSelectedAnswer(answerIndex);
    const quiz = currentLesson.content.quiz;
    const isCorrect = answerIndex === quiz[currentQuizIndex].correctAnswer;
    
    setShowQuizResult(true);
    
    // Store answer
    const newAnswers = [...quizAnswers];
    newAnswers[currentQuizIndex] = answerIndex;
    setQuizAnswers(newAnswers);
  };

  const handleNextQuizQuestion = () => {
    if (!currentLesson?.content?.quiz) return;
    
    if (currentQuizIndex < currentLesson.content.quiz.length - 1) {
      setCurrentQuizIndex(currentQuizIndex + 1);
      setShowQuizResult(false);
      setSelectedAnswer(null);
    } else {
      // Quiz complete
      handleCompleteLesson();
    }
  };

  const handleToggleActionItem = (index: number) => {
    const newChecked = new Set(checkedItems);
    if (newChecked.has(index)) {
      newChecked.delete(index);
    } else {
      newChecked.add(index);
    }
    setCheckedItems(newChecked);
  };

  const getLessonTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return Video;
      case 'reading':
        return FileText;
      case 'interactive':
        return Target;
      case 'quiz':
        return Brain;
      default:
        return BookOpen;
    }
  };

  const getLessonTypeColor = (type: string) => {
    switch (type) {
      case 'video':
        return 'bg-red-100 text-red-600';
      case 'reading':
        return 'bg-blue-100 text-blue-600';
      case 'interactive':
        return 'bg-purple-100 text-purple-600';
      case 'quiz':
        return 'bg-green-100 text-green-600';
      default:
        return 'bg-neutral-100 text-neutral-600';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={currentView === 'overview' ? onClose : undefined}
      />
      
      {/* Modal Container */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-neutral-900 to-neutral-800 p-6 text-white">
          <button
            onClick={currentView === 'lesson' ? () => setCurrentView('overview') : onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors z-10"
            aria-label={currentView === 'lesson' ? 'Back to overview' : 'Close'}
          >
            {currentView === 'lesson' ? <ChevronLeft className="h-5 w-5" /> : <X className="h-5 w-5" />}
          </button>

          <div className="pr-12">
            <div className="flex items-center gap-3 mb-2">
              <PathIcon className="h-8 w-8 text-blue-400" />
              <h2 className="text-white">{pathTitle}</h2>
            </div>
            {currentView === 'overview' ? (
              <div>
                <p className="text-white/80 mb-3">
                  Master budgeting fundamentals and take control of your finances
                </p>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-white/60" />
                    <span className="text-white/80">{totalLessons} lessons</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-white/60" />
                    <span className="text-white/80">{completedCount} completed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-yellow-400" />
                    <span className="text-white/80">{lessons.reduce((sum, l) => sum + l.xpReward, 0)} XP total</span>
                  </div>
                </div>
              </div>
            ) : currentLesson && (
              <div>
                <p className="text-white/80 mb-1">Lesson {selectedLesson! + 1} of {totalLessons}</p>
                <p className="text-white">{currentLesson.title}</p>
              </div>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-neutral-100">
          <div 
            className="h-1 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto">
          {/* Overview View */}
          {currentView === 'overview' && (
            <div className="p-6">
              {/* Overall Progress */}
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6 mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-neutral-900">Your Progress</h3>
                  <span className="text-neutral-700">{Math.round(progressPercentage)}%</span>
                </div>
                <div className="h-3 bg-white rounded-full overflow-hidden mb-3">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
                <p className="text-sm text-neutral-600">
                  {completedCount === totalLessons 
                    ? '🎉 Congratulations! You\'ve completed this learning path!'
                    : `${totalLessons - completedCount} lesson${totalLessons - completedCount !== 1 ? 's' : ''} remaining`
                  }
                </p>
              </div>

              {/* Lesson List */}
              <div>
                <h3 className="text-neutral-900 mb-4">Curriculum</h3>
                <div className="space-y-3">
                  {lessons.map((lesson, index) => {
                    const TypeIcon = getLessonTypeIcon(lesson.type);
                    const typeColor = getLessonTypeColor(lesson.type);
                    
                    return (
                      <button
                        key={lesson.id}
                        onClick={() => handleStartLesson(index)}
                        disabled={lesson.locked}
                        className={`w-full text-left p-5 rounded-xl border-2 transition-all ${
                          lesson.completed
                            ? 'bg-green-50 border-green-200'
                            : lesson.locked
                            ? 'bg-neutral-50 border-neutral-200 opacity-50 cursor-not-allowed'
                            : 'bg-white border-neutral-200 hover:border-neutral-400 hover:shadow-md'
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          {/* Status Icon */}
                          <div className="flex-shrink-0 mt-1">
                            {lesson.completed ? (
                              <CheckCircle className="h-6 w-6 text-green-600" />
                            ) : lesson.locked ? (
                              <Lock className="h-6 w-6 text-neutral-400" />
                            ) : (
                              <Circle className="h-6 w-6 text-neutral-400" />
                            )}
                          </div>

                          {/* Lesson Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-4 mb-2">
                              <div className="flex-1">
                                <p className="text-neutral-900 mb-1">
                                  {index + 1}. {lesson.title}
                                </p>
                                <div className="flex items-center gap-3 text-sm text-neutral-600">
                                  <div className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    <span>{lesson.duration}</span>
                                  </div>
                                  <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full ${typeColor} text-xs`}>
                                    <TypeIcon className="h-3 w-3" />
                                    <span className="capitalize">{lesson.type}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1 text-sm text-yellow-600">
                                  <Sparkles className="h-4 w-4" />
                                  <span>+{lesson.xpReward}</span>
                                </div>
                                {!lesson.locked && !lesson.completed && (
                                  <ChevronRight className="h-5 w-5 text-neutral-400" />
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Lesson View */}
          {currentView === 'lesson' && currentLesson && (
            <div className="p-6">
              {/* Lesson Content */}
              {lessonProgress === 'content' && (
                <div className="max-w-3xl mx-auto">
                  {/* Video Lesson */}
                  {currentLesson.type === 'video' && currentLesson.content && (
                    <div className="space-y-6">
                      {/* Video Player Placeholder */}
                      <div className="bg-neutral-900 rounded-xl overflow-hidden aspect-video flex items-center justify-center">
                        <div className="text-center">
                          <div className="h-20 w-20 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
                            <Play className="h-10 w-10 text-white ml-1" />
                          </div>
                          <p className="text-white/80">Video content would appear here</p>
                          <p className="text-sm text-white/60 mt-1">{currentLesson.duration} duration</p>
                        </div>
                      </div>

                      {/* Video Content Sections */}
                      {currentLesson.content.introduction && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
                          <p className="text-neutral-800">{currentLesson.content.introduction}</p>
                        </div>
                      )}

                      {currentLesson.content.sections?.map((section, idx) => (
                        <div key={idx} className="space-y-3">
                          <h4 className="text-neutral-900">{section.title}</h4>
                          <p className="text-neutral-700">{section.content}</p>
                          {section.tips && section.tips.length > 0 && (
                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                              <div className="flex items-start gap-2">
                                <Lightbulb className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                                <div>
                                  <p className="text-sm text-neutral-900 mb-2">Pro Tips:</p>
                                  <ul className="space-y-1">
                                    {section.tips.map((tip, tipIdx) => (
                                      <li key={tipIdx} className="text-sm text-neutral-700">• {tip}</li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}

                      {currentLesson.content.keyTakeaways && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-5">
                          <h4 className="text-neutral-900 mb-3">Key Takeaways</h4>
                          <ul className="space-y-2">
                            {currentLesson.content.keyTakeaways.map((takeaway, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-neutral-700">
                                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                                <span>{takeaway}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Reading Lesson */}
                  {currentLesson.type === 'reading' && currentLesson.content && (
                    <div className="space-y-6">
                      {currentLesson.content.introduction && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
                          <div className="flex items-start gap-3">
                            <FileText className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                            <p className="text-neutral-800">{currentLesson.content.introduction}</p>
                          </div>
                        </div>
                      )}

                      {currentLesson.content.sections?.map((section, idx) => (
                        <div key={idx} className="space-y-3">
                          <h4 className="text-neutral-900">{section.title}</h4>
                          <p className="text-neutral-700 leading-relaxed">{section.content}</p>
                          {section.tips && section.tips.length > 0 && (
                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                              <div className="flex items-start gap-2">
                                <Lightbulb className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                                <div>
                                  <p className="text-sm text-neutral-900 mb-2">Pro Tips:</p>
                                  <ul className="space-y-1">
                                    {section.tips.map((tip, tipIdx) => (
                                      <li key={tipIdx} className="text-sm text-neutral-700">• {tip}</li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}

                      {currentLesson.content.keyTakeaways && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-5">
                          <h4 className="text-neutral-900 mb-3">Key Takeaways</h4>
                          <ul className="space-y-2">
                            {currentLesson.content.keyTakeaways.map((takeaway, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-neutral-700">
                                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                                <span>{takeaway}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Interactive Lesson */}
                  {currentLesson.type === 'interactive' && currentLesson.content && (
                    <div className="space-y-6">
                      {currentLesson.content.introduction && (
                        <div className="bg-purple-50 border border-purple-200 rounded-lg p-5">
                          <div className="flex items-start gap-3">
                            <Target className="h-6 w-6 text-purple-600 flex-shrink-0 mt-1" />
                            <p className="text-neutral-800">{currentLesson.content.introduction}</p>
                          </div>
                        </div>
                      )}

                      {currentLesson.content.sections?.map((section, idx) => (
                        <div key={idx} className="space-y-3">
                          <h4 className="text-neutral-900">{section.title}</h4>
                          <p className="text-neutral-700">{section.content}</p>
                        </div>
                      ))}

                      {currentLesson.content.actionItems && (
                        <div className="bg-white border-2 border-purple-200 rounded-xl p-6">
                          <div className="flex items-center gap-2 mb-4">
                            <ListChecks className="h-6 w-6 text-purple-600" />
                            <h4 className="text-neutral-900">Action Items</h4>
                          </div>
                          <div className="space-y-3">
                            {currentLesson.content.actionItems.map((item, idx) => (
                              <button
                                key={idx}
                                onClick={() => handleToggleActionItem(idx)}
                                className="w-full flex items-start gap-3 p-3 rounded-lg hover:bg-purple-50 transition-colors text-left"
                              >
                                <div className={`h-5 w-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
                                  checkedItems.has(idx)
                                    ? 'bg-purple-600 border-purple-600'
                                    : 'border-neutral-300'
                                }`}>
                                  {checkedItems.has(idx) && (
                                    <CheckCircle className="h-4 w-4 text-white" />
                                  )}
                                </div>
                                <span className={`${
                                  checkedItems.has(idx)
                                    ? 'text-neutral-500 line-through'
                                    : 'text-neutral-700'
                                }`}>
                                  {item}
                                </span>
                              </button>
                            ))}
                          </div>
                          <p className="text-sm text-neutral-600 mt-4">
                            {checkedItems.size}/{currentLesson.content.actionItems.length} completed
                          </p>
                        </div>
                      )}

                      {currentLesson.content.keyTakeaways && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-5">
                          <h4 className="text-neutral-900 mb-3">Key Takeaways</h4>
                          <ul className="space-y-2">
                            {currentLesson.content.keyTakeaways.map((takeaway, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-neutral-700">
                                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                                <span>{takeaway}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Quiz Lesson */}
                  {currentLesson.type === 'quiz' && currentLesson.content?.quiz && (
                    <div className="max-w-2xl mx-auto">
                      <div className="bg-white border-2 border-neutral-200 rounded-xl p-8">
                        <div className="mb-6">
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="text-neutral-900">
                              Question {currentQuizIndex + 1} of {currentLesson.content.quiz.length}
                            </h4>
                            <span className="text-sm text-neutral-600">
                              {currentQuizIndex + 1}/{currentLesson.content.quiz.length}
                            </span>
                          </div>
                          <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-green-600 to-blue-600 transition-all duration-300"
                              style={{ width: `${((currentQuizIndex + 1) / currentLesson.content.quiz.length) * 100}%` }}
                            />
                          </div>
                        </div>

                        <div className="mb-6">
                          <p className="text-neutral-900 text-lg mb-6">
                            {currentLesson.content.quiz[currentQuizIndex].question}
                          </p>

                          <div className="space-y-3">
                            {currentLesson.content.quiz[currentQuizIndex].options.map((option, idx) => {
                              const isSelected = selectedAnswer === idx;
                              const isCorrect = idx === currentLesson.content.quiz![currentQuizIndex].correctAnswer;
                              const showResult = showQuizResult;

                              return (
                                <button
                                  key={idx}
                                  onClick={() => handleQuizAnswer(idx)}
                                  disabled={showQuizResult}
                                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                                    showResult && isCorrect
                                      ? 'bg-green-50 border-green-500'
                                      : showResult && isSelected && !isCorrect
                                      ? 'bg-red-50 border-red-500'
                                      : isSelected
                                      ? 'bg-blue-50 border-blue-500'
                                      : 'bg-white border-neutral-200 hover:border-neutral-400'
                                  }`}
                                >
                                  <div className="flex items-center gap-3">
                                    <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                                      showResult && isCorrect
                                        ? 'bg-green-500 border-green-500'
                                        : showResult && isSelected && !isCorrect
                                        ? 'bg-red-500 border-red-500'
                                        : isSelected
                                        ? 'bg-blue-500 border-blue-500'
                                        : 'border-neutral-300'
                                    }`}>
                                      {showResult && isCorrect && (
                                        <CheckCircle className="h-4 w-4 text-white" />
                                      )}
                                      {showResult && isSelected && !isCorrect && (
                                        <X className="h-4 w-4 text-white" />
                                      )}
                                    </div>
                                    <span className="text-neutral-900">{option}</span>
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {showQuizResult && (
                          <div className={`p-4 rounded-lg ${
                            selectedAnswer === currentLesson.content.quiz[currentQuizIndex].correctAnswer
                              ? 'bg-green-50 border border-green-200'
                              : 'bg-blue-50 border border-blue-200'
                          }`}>
                            <p className="text-neutral-800 mb-2">
                              {selectedAnswer === currentLesson.content.quiz[currentQuizIndex].correctAnswer
                                ? '✓ Correct!'
                                : '✗ Not quite right'}
                            </p>
                            <p className="text-sm text-neutral-700">
                              {currentLesson.content.quiz[currentQuizIndex].explanation}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex items-center justify-between pt-6 border-t border-neutral-200 mt-8">
                    <button
                      onClick={() => setCurrentView('overview')}
                      className="px-4 py-2 text-neutral-700 hover:text-neutral-900 transition-colors"
                    >
                      Back to Overview
                    </button>

                    {currentLesson.type === 'quiz' ? (
                      showQuizResult && (
                        <button
                          onClick={handleNextQuizQuestion}
                          className="px-6 py-3 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg transition-colors flex items-center gap-2"
                        >
                          <span>
                            {currentQuizIndex < (currentLesson.content?.quiz?.length || 0) - 1
                              ? 'Next Question'
                              : 'Complete Quiz'
                            }
                          </span>
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      )
                    ) : (
                      <button
                        onClick={handleCompleteLesson}
                        className="px-6 py-3 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg transition-colors flex items-center gap-2"
                      >
                        <span>Complete Lesson</span>
                        <CheckCircle className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Completion View */}
              {lessonProgress === 'complete' && currentLesson && (
                <div className="max-w-2xl mx-auto text-center py-12">
                  <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                    <Trophy className="h-10 w-10 text-green-600" />
                  </div>
                  <h3 className="text-neutral-900 mb-3">Lesson Complete! 🎉</h3>
                  <p className="text-neutral-600 mb-6">
                    Great job completing "{currentLesson.title}"
                  </p>
                  
                  <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-6 mb-8">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Sparkles className="h-6 w-6 text-yellow-600" />
                      <p className="text-neutral-900">+{currentLesson.xpReward} XP Earned</p>
                    </div>
                    <p className="text-sm text-neutral-600">Keep learning to unlock more rewards!</p>
                  </div>

                  <div className="flex gap-3 justify-center">
                    <button
                      onClick={() => setCurrentView('overview')}
                      className="px-6 py-3 border border-neutral-300 rounded-lg text-neutral-700 hover:bg-neutral-50 transition-colors"
                    >
                      Back to Overview
                    </button>
                    {selectedLesson! < lessons.length - 1 && !lessons[selectedLesson! + 1].locked && (
                      <button
                        onClick={() => handleStartLesson(selectedLesson! + 1)}
                        className="px-6 py-3 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg transition-colors flex items-center gap-2"
                      >
                        <span>Next Lesson</span>
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
