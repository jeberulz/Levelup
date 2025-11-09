import { Sparkles, ShieldCheck, Goal, Users, Target, CalendarCheck, Medal, ArrowRight } from 'lucide-react';

const benefits = [
  { icon: Sparkles, text: "Streaks, XP, and unlockable challenges" },
  { icon: ShieldCheck, text: "Risk-free investing simulations" },
  { icon: Goal, text: "Real-world goals and progress bars" },
  { icon: Users, text: "Study groups and campus leaderboards" }
];

const steps = [
  {
    icon: Target,
    title: "Step 1: Pick your track",
    description: "Budget, Invest, or Credit. Start where you need help most."
  },
  {
    icon: CalendarCheck,
    title: "Step 2: Complete daily quests",
    description: "5–7 minute lessons, streaks, and XP. Stay motivated every day."
  },
  {
    icon: Medal,
    title: "Step 3: Level up and win",
    description: "Unlock advanced modules, compete on leaderboards, and track real goals."
  }
];

export default function SolutionSection() {
  return (
    <section className="sm:px-8 mt-20 mb-20" id="how">
      <div className="sm:py-28 max-w-7xl mx-auto pt-20 pb-20">
        <div className="sm:p-8 sm:py-8 bg-neutral-100/50 border-neutral-200/50 border rounded-3xl pt-6 px-6 pb-6">
          {/* Header */}
          <div className="text-center transition-all duration-700 ease-out opacity-0 translate-y-8 blur-md" data-animate>
            <span className="inline-flex items-center ring-1 ring-neutral-200 text-sm font-medium text-neutral-600 bg-white rounded-full pt-1 px-3 pb-1">Solution Overview</span>
            <h2 className="sm:text-5xl lg:text-6xl text-4xl font-normal text-neutral-900 tracking-tighter mt-4">Finance learning that feels like a game</h2>
            <p className="text-neutral-600 max-w-2xl mx-auto mt-3">Daily quests, streaks, and levels make budgeting, investing, and credit skills stick—for life.</p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 mt-10 items-start">
            {/* Left: Value card */}
            <div className="lg:col-span-5 transition-all duration-700 ease-out delay-150 opacity-0 translate-y-8 blur-md" data-animate>
              <div className="bg-white rounded-[28px] ring-1 ring-black/5 overflow-hidden shadow-lg">
                <div className="bg-blue-600 p-6 sm:p-8">
                  <p className="text-white/90 text-sm">Value Proposition</p>
                  <p className="mt-2 text-white text-5xl sm:text-6xl font-semibold tracking-tight">Learn. Play. Win.</p>
                  <p className="mt-2 text-white/80 text-sm">Levels, leaderboards, and rewards—built for students.</p>
                </div>
                <div className="p-5 sm:p-6">
                  <div className="sm:p-5 bg-neutral-100/50 ring-black/5 ring-1 rounded-2xl pt-4 px-4 pb-4">
                    <h3 className="text-neutral-900 font-semibold tracking-tight">What you get</h3>
                    <p className="text-neutral-700 text-sm mt-2">Bite-sized modules, simulations, and goal trackers that turn money skills into a habit you can't put down.</p>
                    <ul className="mt-4 space-y-3">
                      {benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start gap-3 text-neutral-900 text-sm">
                          <benefit.icon className="text-blue-600 mt-0.5 flex-shrink-0 h-4 w-4" />
                          {benefit.text}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="px-5 pb-5">
                  <a href="#download" className="inline-flex items-center justify-center hover:bg-neutral-800 transition text-sm font-medium text-white bg-neutral-900 w-full h-12 rounded-2xl shadow-lg">
                    Start Free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Center Divider */}
            <div className="lg:col-span-1 flex items-center justify-center transition-all duration-700 ease-out delay-300 opacity-0 translate-y-8 blur-md" data-animate>
              <div className="h-full w-px bg-gradient-to-b from-transparent via-neutral-300 to-transparent min-h-96 hidden lg:block"></div>
              <div className="w-full h-px bg-gradient-to-r from-transparent via-neutral-300 to-transparent lg:hidden"></div>
            </div>

            {/* Right: Steps */}
            <div className="lg:col-span-6 space-y-4">
              {steps.map((step, i) => (
                <div key={i}>
                  <div className={`hover:bg-neutral-50 transition flex text-left bg-white w-full ring-black/5 ring-1 rounded-2xl pt-4 px-5 pb-4 shadow-lg items-center justify-between transition-all duration-700 ease-out delay-[${450 + i * 50}ms] opacity-0 translate-y-8 blur-md`} data-animate>
                    <div className="min-w-0">
                      <p className="text-neutral-900 font-medium tracking-tight">{step.title}</p>
                      <p className="text-neutral-600 text-sm mt-1">{step.description}</p>
                    </div>
                    <step.icon className="text-neutral-400 h-6 w-6 flex-shrink-0" />
                  </div>
                  {i < steps.length - 1 && (
                    <div className={`flex items-center px-5 transition-all duration-700 ease-out delay-[${500 + i * 50}ms] opacity-0 translate-y-8 blur-md`} data-animate>
                      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-neutral-200 to-transparent"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
