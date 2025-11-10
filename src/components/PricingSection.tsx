import { Sparkles, Plus, Crown, Building2, Check, ChevronDown } from 'lucide-react';

const plans = [
  {
    icon: Sparkles,
    name: "Free",
    subtitle: "Get started",
    price: "$0",
    period: "/month",
    description: "Core lessons, daily streaks, and basic quests.",
    features: [
      "Budget basics track",
      "Streaks and XP",
      "Limited challenges"
    ],
    cta: "Start Free",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    buttonStyle: "bg-neutral-900 text-white hover:bg-neutral-800"
  },
  {
    icon: Plus,
    name: "Plus Trial",
    subtitle: "Best to try everything",
    price: "$4.99",
    period: "first month",
    description: "Then $9.99/mo. Advanced modules and leaderboards.",
    features: [
      "Everything in Free",
      "Invest Quest + Credit Climb",
      "Campus leaderboards"
    ],
    cta: "Try Plus",
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    buttonStyle: "bg-neutral-900 text-white hover:bg-neutral-800"
  },
  {
    icon: Crown,
    name: "Premium",
    subtitle: "For serious streaks",
    price: "$14.99",
    period: "/month",
    description: "Everything in Plus, plus Study Groups, Goal Tracker Pro, and insights.",
    features: [
      "Study Groups & campus clubs",
      "Pro goal tracking and reporting",
      "Priority support"
    ],
    cta: "Go Premium",
    iconBg: "bg-white",
    iconColor: "text-blue-700",
    buttonStyle: "bg-white text-blue-700 hover:bg-white/90",
    popular: true,
    cardStyle: "bg-blue-700 shadow-2xl"
  },
  {
    icon: Building2,
    name: "Campus License",
    subtitle: "Institutions",
    price: "Custom",
    period: "/yr",
    description: "Unlimited seats, LMS integration, and tailored curriculum.",
    features: [
      "Admin analytics & reporting",
      "Workshops & onboarding",
      "Compliance-ready content"
    ],
    cta: "Talk to Sales",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
    buttonStyle: "bg-neutral-900 text-white hover:bg-neutral-800"
  }
];

export default function PricingSection() {
  return (
    <section className="lg:px-8 lg:py-24 sm:px-8 mt-20 mb-20 pt-20 px-6 pb-20" id="pricing">
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">Start free. Level up when you're ready.</h2>
        <p className="text-neutral-700 text-lg leading-relaxed max-w-2xl mx-auto">
          Try the core experience at no cost. Unlock advanced modules, simulations, and groups on paid plans. Cancel anytime.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {plans.map((plan, i) => (
          <div 
            key={i} 
            className={`relative rounded-[32px] p-8 ring-1 transition-all duration-700 ease-out ${
              plan.popular 
                ? `${plan.cardStyle} shadow-2xl` 
                : 'bg-white ring-neutral-200 hover:ring-neutral-300 hover:shadow-lg'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <div className="text-xs font-medium text-blue-700 bg-white border-black/10 border rounded-full pt-1.5 px-4 pb-1.5 shadow-lg">
                  Most Popular
                </div>
              </div>
            )}
            
            <div className="flex items-center gap-3 mb-6">
              <div className={`h-12 w-12 rounded-full ${plan.iconBg} flex items-center justify-center`}>
                <plan.icon className={`w-6 h-6 ${plan.iconColor}`} />
              </div>
              <div>
                <h3 className={`text-xl font-bold tracking-tight ${plan.popular ? 'text-white' : 'text-neutral-900'}`}>{plan.name}</h3>
                <p className={`text-sm ${plan.popular ? 'text-blue-200' : 'text-neutral-500'}`}>{plan.subtitle}</p>
              </div>
            </div>
            
            <div className="mb-6">
              <div className="flex items-baseline gap-1 mb-2">
                <span className={`text-3xl font-medium ${plan.popular ? 'text-white' : 'text-neutral-900'}`}>{plan.price}</span>
                <span className={`text-sm ${plan.popular ? 'text-blue-200' : 'text-neutral-500'}`}>{plan.period}</span>
              </div>
              <p className={`text-sm leading-relaxed ${plan.popular ? 'text-blue-100' : 'text-neutral-700'}`}>{plan.description}</p>
            </div>
            
            <ul className="space-y-3 mb-8">
              {plan.features.map((feature, j) => (
                <li key={j} className={`flex items-center gap-3 text-sm ${plan.popular ? 'text-white' : 'text-neutral-700'}`}>
                  <Check className={`flex-shrink-0 ${plan.popular ? 'text-blue-200' : 'text-green-600'}`} size={14} />
                  {feature}
                </li>
              ))}
            </ul>
            
            <a href="/dashboard" className={`inline-flex items-center justify-center transition-colors font-medium w-full rounded-full pt-3 px-6 pb-3 shadow-lg ${plan.buttonStyle}`}>
              {plan.cta}
            </a>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <p className="text-neutral-700 mb-6 leading-relaxed">30-day money-back guarantee on Premium. Cancel anytime.</p>
        <a href="#faq" className="inline-flex items-center gap-2 text-neutral-900 font-medium hover:opacity-80 transition-opacity">
          See FAQs
          <ChevronDown className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}
