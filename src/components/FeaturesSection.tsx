import { Wallet, LineChart, CreditCard, Goal, Users, Gift } from 'lucide-react';

const features = [
  {
    icon: Wallet,
    title: "Budget Boss",
    label: "Budget Boss",
    description: "Smart envelopes & auto-quests",
    image: "https://images.unsplash.com/photo-1707301280380-56f7e7a00aef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200"
  },
  {
    icon: LineChart,
    title: "Invest Quest",
    label: "Invest Quest",
    description: "Simulations that teach risk",
    image: "https://images.unsplash.com/photo-1645226880663-81561dcab0ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200"
  },
  {
    icon: CreditCard,
    title: "Credit Climb",
    label: "Credit Climb",
    description: "Alerts, tips, and milestones",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
  },
  {
    icon: Goal,
    title: "Goal Tracker",
    label: "Goal Tracker",
    description: "Trips, rent, emergency fund",
    image: "https://images.unsplash.com/photo-1739315014260-b581f8fdfa7b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200"
  },
  {
    icon: Users,
    title: "Study Groups",
    label: "Study Groups",
    description: "Team up with friends",
    image: "https://images.unsplash.com/photo-1758270704025-0e1a1793e1ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200"
  },
  {
    icon: Gift,
    title: "Real Rewards",
    label: "Real Rewards",
    description: "Perks and partner offers",
    image: "https://images.unsplash.com/photo-1581065178047-8ee15951ede6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200"
  }
];

export default function FeaturesSection() {
  return (
    <section className="sm:p-8 bg-neutral-950 max-w-7xl rounded-3xl mt-8 mx-auto pt-6 px-6 pb-6 shadow-lg relative overflow-hidden" id="features">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 items-start relative z-10">
        {/* Left: Heading + copy */}
        <div className="flex flex-col min-h-full justify-between">
          <div>
            <span className="text-sm font-normal text-zinc-300">Feature Highlights</span>
            <h2 className="text-[44px] sm:text-6xl lg:text-7xl leading-[0.9] text-zinc-100 mt-2 font-bold tracking-tighter">Everything you need to win with money.</h2>
            <div className="mt-8 relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full h-px bg-gradient-to-r from-black/5 via-black/10 to-black/5"></div>
              </div>
            </div>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <p className="text-sm text-zinc-100 font-medium tracking-tight">Built for streaks and habits</p>
                <p className="mt-1 text-sm text-zinc-300">Game mechanics keep you motivated: XP, levels, leaderboards, and rewards.</p>
                <a href="#download" className="mt-4 inline-flex items-center gap-2 h-10 px-4 rounded-full bg-zinc-100 text-zinc-900 text-sm font-normal hover:bg-zinc-200 transition">
                  Start Free
                  <span className="inline-flex h-2 w-2 rounded-full bg-zinc-900"></span>
                </a>
              </div>
              <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-black/10 to-transparent sm:block hidden"></div>
                <p className="text-base text-zinc-200 leading-relaxed sm:text-right sm:pl-8">
                  Choose your path: Budget Boss, Invest Quest, Credit Climb, or Goal Tracker—then watch your streak grow.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Marquee Program grid */}
        <div className="relative h-[520px] overflow-hidden" style={{ maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)', WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)' }}>
          <style>{`
            @keyframes marquee-vertical-features { 
              from { transform: translateY(0); } 
              to { transform: translateY(-50%); } 
            }
            .animate-marquee-vertical-features { 
              animation: marquee-vertical-features 40s linear infinite; 
            }
          `}</style>
          <div className="animate-marquee-vertical-features">
            <div className="grid grid-cols-2 gap-4 mb-4">
              {features.slice(0, 4).map((feature, i) => (
                <article key={i} className="relative overflow-hidden aspect-[4/3] bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 border border-black/30 rounded-2xl">
                  <div className="absolute inset-0 bg-cover" style={{ backgroundImage: `url(${feature.image})` }}></div>
                  <div className="absolute top-3 left-3">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-zinc-100/90 text-zinc-900 border border-black/20">
                      <feature.icon className="h-3.5 w-3.5" />
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="px-2 py-1 rounded-md bg-black/60 backdrop-blur text-[11px] text-zinc-300 font-normal border border-black/30">{feature.label}</span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="text-white text-lg font-medium tracking-tight leading-tight">{feature.description}</p>
                  </div>
                </article>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
              {features.slice(4).map((feature, i) => (
                <article key={i} className="relative overflow-hidden aspect-[4/3] bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 border border-black/30 rounded-2xl">
                  <div className="absolute inset-0 bg-cover" style={{ backgroundImage: `url(${feature.image})` }}></div>
                  <div className="absolute top-3 left-3">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-zinc-100/90 text-zinc-900 border border-black/20">
                      <feature.icon className="h-3.5 w-3.5" />
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="px-2 py-1 rounded-md bg-black/60 backdrop-blur text-[11px] text-zinc-300 font-normal border border-black/30">{feature.label}</span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="text-white text-lg font-medium tracking-tight leading-tight">{feature.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
