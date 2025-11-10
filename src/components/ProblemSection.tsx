import { Flame, Users } from 'lucide-react';

const painPoints = [
  {
    title: "Boring, one-size-fits-all",
    description: "Content isn't built for Gen Z attention spans—so it gets ignored.",
    image: "https://images.unsplash.com/photo-1614492898637-435e0f87cef8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200"
  },
  {
    title: "No streaks, no rewards",
    description: "Without feedback loops, habits don't form—and progress stalls.",
    image: "https://images.unsplash.com/photo-1758524945240-5d6d584b4a84?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
  },
  {
    title: "Costly trial-and-error",
    description: "Overdrafts, fees, and debt are expensive ways to \"learn.\"",
    image: "https://images.unsplash.com/photo-1673208127679-43170c4d7017?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
  }
];

const stats = [
  { value: "89%", label: "students want better financial ed" },
  { value: "45M", label: "young adults to reach" },
  { value: "25.3%", label: "market CAGR in finance apps" },
  { value: "21.4M+", label: "members in r/personalfinance" }
];

export default function ProblemSection() {
  return (
    <section className="sm:p-8 sm:py-8 relative bg-white max-w-7xl border-black/5 border rounded-3xl mt-32 mx-auto mb-20 pt-12 px-6 pb-12" id="problem">
      <div className="max-w-3xl mx-auto text-center transition-all duration-700 ease-out opacity-0 translate-y-8 blur-md" data-animate>
        <h2 className="sm:text-5xl lg:text-6xl leading-[1.05] text-4xl font-bold text-neutral-900 tracking-tighter">Traditional finance education doesn't stick</h2>
        <p className="sm:text-lg text-base text-neutral-700 mt-4">89% of students want better financial education—but most tools feel like homework. We make learning fast, fun, and habit-forming.</p>

        <div className="mt-6 flex items-center justify-center gap-3 flex-wrap">
          <span className="inline-flex items-center gap-2 text-sm font-medium text-neutral-700 bg-neutral-100 ring-1 ring-black/10 h-11 rounded-full px-4">
            <Flame className="h-4 w-4" />
            Pain score: 8/10
          </span>
          <span className="inline-flex items-center gap-2 text-sm font-medium text-neutral-700 bg-neutral-100 ring-1 ring-black/10 h-11 rounded-full px-4">
            <Users className="h-4 w-4" />
            45M young adults need this
          </span>
        </div>
      </div>

      {/* Pain cards */}
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {painPoints.map((point, i) => (
          <article key={i} className="bg-white rounded-3xl ring-1 ring-black/5 shadow-lg overflow-hidden opacity-0 translate-y-8 blur-md" data-animate>
            <div className="bg-black rounded-2xl mx-4 mt-4 overflow-hidden">
              <img className="w-full h-48 object-cover" src={point.image} alt={point.title} />
            </div>
            <div className="pt-5 px-5 pb-5">
              <h3 className="text-lg font-bold tracking-tight text-neutral-900">{point.title}</h3>
              <p className="text-sm text-neutral-700 mt-2">{point.description}</p>
            </div>
          </article>
        ))}
      </div>

      {/* Stats */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 opacity-0 translate-y-8 blur-md" data-animate>
        {stats.map((stat, i) => (
          <div key={i} className="bg-neutral-100/50 ring-black/5 ring-1 rounded-3xl pt-6 px-6 pb-6">
            <p className="text-3xl font-semibold tracking-tight text-neutral-900">{stat.value}</p>
            <p className="text-sm text-neutral-600 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
