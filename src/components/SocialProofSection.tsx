import { Send, GraduationCap, ShieldCheck, Sparkles, RefreshCcw, ArrowRight } from 'lucide-react';

const testimonials = [
  {
    name: "Maya R.",
    role: "Sophomore, CSU",
    quote: "I fixed my budget in 2 weeks and kept a 30-day streak.",
    image: "https://images.unsplash.com/photo-1609126396762-542d99fc7a07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=256",
    rating: 4
  },
  {
    name: "Aaron T.",
    role: "Grad Student",
    quote: "Finally clicked on credit scores. My score went +72 in 3 months.",
    image: "https://images.unsplash.com/photo-1758639842445-b58f639119d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=256",
    rating: 5
  }
];

const subscribers = [
  "https://images.unsplash.com/photo-1609126396762-542d99fc7a07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=128",
  "https://images.unsplash.com/photo-1758639842445-b58f639119d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=128",
  "https://images.unsplash.com/photo-1594686900103-3c9698dbb31b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=128"
];

export default function SocialProofSection() {
  return (
    <section className="bg-white mt-10" id="social-proof">
      <div className="relative overflow-hidden mt-40 mb-20">
        <div className="relative z-10 lg:px-8 sm:px-8 max-w-7xl mx-auto pt-16 px-6 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Form card (lead magnet) */}
            <div className="lg:col-span-6">
              <div className="sm:p-8 bg-neutral-50 ring-neutral-200 ring-1 rounded-[32px] pt-6 px-6 pb-6 shadow-lg" id="download">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-sm text-neutral-500">Get the app</p>
                    <h3 className="mt-2 text-3xl sm:text-4xl font-medium tracking-tight text-neutral-900">Your money game starts today</h3>
                    <p className="text-neutral-600 mt-2">Join free in 60 seconds. No credit card required.</p>
                  </div>
                </div>
                <form action="#" method="POST" className="space-y-5">
                  <div>
                    <label htmlFor="ct-email" className="block text-sm text-neutral-700 mb-2">
                      Email address<span className="text-neutral-400"> *</span>
                    </label>
                    <div className="relative">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2">
                        <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"></path>
                        <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                      </svg>
                      <input 
                        id="ct-email" 
                        name="email" 
                        type="email" 
                        required 
                        placeholder="your.email@school.edu" 
                        className="w-full pl-12 pr-4 py-3 text-base rounded-2xl ring-1 ring-neutral-200 focus:ring-2 focus:ring-neutral-900 outline-none bg-white placeholder:text-neutral-400"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="ct-campus" className="block text-sm text-neutral-700 mb-2">Campus (optional)</label>
                    <input 
                      id="ct-campus" 
                      name="campus" 
                      type="text" 
                      placeholder="University / College" 
                      className="w-full pl-4 pr-4 py-3 text-base rounded-2xl ring-1 ring-neutral-200 focus:ring-2 focus:ring-neutral-900 outline-none bg-white placeholder:text-neutral-400"
                    />
                  </div>
                  <button type="submit" className="inline-flex hover:bg-neutral-800 transition-colors text-base font-medium text-white bg-neutral-900 w-full rounded-2xl pt-4 px-6 pb-4 items-center justify-center">
                    Get Download Link
                    <Send className="h-5 w-5 ml-2" />
                  </button>
                  <div className="grid grid-cols-2 gap-3">
                    <a href="#" className="inline-flex items-center justify-center gap-2 h-11 rounded-xl bg-black text-white hover:bg-black/90 transition">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24" className="h-4 w-4">
                        <path d="M17.564 23.5c-1.52 0-2 2.316-3.471 2.316zm-3.29-18.9c-.9.12-1.83-.47-2.41-1.16-.64-.72-1.15-1.67-1.01-2.64.98-.06 2.04.55 2.66 1.24.62.68 1.1 1.64.76 2.56z"></path>
                      </svg>
                      <span className="text-sm font-medium">App Store</span>
                    </a>
                    <a href="#" className="inline-flex items-center justify-center gap-2 h-11 rounded-xl bg-white text-neutral-900 ring-1 ring-neutral-200 hover:bg-neutral-100 transition">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24" className="h-4 w-4">
                        <path d="M3 2l13 10L3 22V2zm14.5 6.5l3.5 2-3.5 2v-4zm0 7l3.5 2-3.5 2v-4z"></path>
                      </svg>
                      <span className="text-sm font-medium">Google Play</span>
                    </a>
                  </div>
                  <p className="text-xs text-neutral-500 text-center mt-3">
                    By continuing, you agree to our{' '}
                    <a href="#privacy" className="underline hover:no-underline">Privacy Policy</a> and{' '}
                    <a href="#terms" className="underline hover:no-underline">Terms</a>.
                  </p>
                </form>
              </div>
            </div>

            {/* Right: Social proof */}
            <div className="lg:col-span-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl sm:text-3xl font-medium tracking-tight text-neutral-900">Loved by students and young pros</h3>
                <div className="hidden sm:flex items-center gap-1 text-amber-500" aria-label="Average rating 4.8 out of 5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 17.3l-6.16 3.7 1.64-6.98L2 8.9l7.04-.6L12 1.8l2.96 6.5 7.04.6-5.48 5.12 1.64 6.98z"></path>
                  </svg>
                  <span className="text-sm text-neutral-700 ml-1">4.8/5</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {/* Testimonials */}
                {testimonials.map((testimonial, i) => (
                  <article key={i} className="bg-white ring-1 ring-neutral-200 rounded-3xl p-6 shadow-sm">
                    <div className="flex items-center gap-3">
                      <img src={testimonial.image} alt={`${testimonial.name} headshot`} className="h-10 w-10 rounded-full object-cover" loading="lazy" />
                      <div>
                        <p className="font-medium text-neutral-900">{testimonial.name}</p>
                        <p className="text-xs text-neutral-500">{testimonial.role}</p>
                      </div>
                    </div>
                    <blockquote className="mt-4 text-neutral-700">"{testimonial.quote}"</blockquote>
                    <div className="mt-4 flex items-center gap-1 text-amber-500" aria-hidden="true">
                      <span className="sr-only">Rating: {testimonial.rating} out of 5</span>
                      {[...Array(5)].map((_, j) => (
                        <svg key={j} xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${j >= testimonial.rating ? 'opacity-70' : ''}`} fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 17.3l-6.16 3.7 1.64-6.98L2 8.9l7.04-.6L12 1.8l2.96 6.5 7.04.6-5.48 5.12 1.64 6.98z"></path>
                        </svg>
                      ))}
                    </div>
                  </article>
                ))}

                {/* Case study tile */}
                <article className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-3xl p-6 shadow-sm">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/20">
                      <GraduationCap className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="font-medium">Campus pilot</p>
                      <p className="text-sm text-white/80">1,200+ students</p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed">Career center boosted engagement 3.2x with daily quests + leaderboards. Overdraft fees dropped within first month.</p>
                  <a href="#pricing" className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-white/90 hover:text-white">
                    See plans
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </article>

                {/* Creator shoutout */}
                <article className="bg-white ring-1 ring-neutral-200 rounded-3xl p-6 shadow-sm">
                  <div className="flex items-center gap-3">
                    <img src={testimonials[1].image} alt="Creator avatar" className="h-10 w-10 rounded-full object-cover" loading="lazy" />
                    <div>
                      <p className="font-medium text-neutral-900">@MoneyMornings</p>
                      <p className="text-xs text-neutral-500">YouTube + TikTok</p>
                    </div>
                  </div>
                  <p className="mt-4 text-neutral-700">"The only finance app I open every day. Feels like Duolingo for money."</p>
                  <div className="mt-4 flex -space-x-2">
                    {subscribers.map((src, i) => (
                      <img key={i} className="h-7 w-7 rounded-full ring-2 ring-white object-cover" src={src} alt={`Subscriber ${i + 1}`} loading="lazy" />
                    ))}
                  </div>
                </article>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 text-sm font-medium text-neutral-700 bg-neutral-100 ring-1 ring-black/10 h-10 rounded-full px-4">
                  <ShieldCheck className="h-4 w-4" />
                  Data stays private
                </span>
                <span className="inline-flex items-center gap-2 text-sm font-medium text-neutral-700 bg-neutral-100 ring-1 ring-black/10 h-10 rounded-full px-4">
                  <Sparkles className="h-4 w-4" />
                  No ads. Ever.
                </span>
                <span className="inline-flex items-center gap-2 text-sm font-medium text-neutral-700 bg-neutral-100 ring-1 ring-black/10 h-10 rounded-full px-4">
                  <RefreshCcw className="h-4 w-4" />
                  Cancel anytime
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative gradient blur */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-blue-200 blur-[140px] opacity-30"></div>
          <div className="absolute -bottom-16 -right-16 h-72 w-72 rounded-full bg-amber-200 blur-[140px] opacity-30"></div>
        </div>
      </div>
    </section>
  );
}
