import { Diamond } from 'lucide-react';

const footerLinks = {
  product: [
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how" },
    { label: "Pricing", href: "#pricing" },
    { label: "Download", href: "#download" }
  ],
  company: [
    { label: "About", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Customers", href: "#social-proof" },
    { label: "FAQ", href: "#faq" }
  ],
  support: [
    { label: "Help Center", href: "#" },
    { label: "Contact", href: "#" },
    { label: "Status", href: "#" }
  ],
  legal: [
    { label: "Privacy Policy", href: "#privacy" },
    { label: "Terms of Service", href: "#terms" },
    { label: "Cookies", href: "#" }
  ]
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8">
          <div className="col-span-2">
            <a href="#" className="flex items-center gap-2">
              <div className="flex h-8 w-8 ring-1 ring-black/5 text-white bg-neutral-900 rounded-full shadow-sm items-center justify-center">
                <Diamond className="w-4 h-4" />
              </div>
              <span className="text-[17px] uppercase font-semibold tracking-tighter">LevelUP</span>
            </a>
            <p className="mt-4 text-sm text-neutral-600 max-w-sm">A financial literacy app that feels like a game. Learn budgeting, investing, and credit—without the boring.</p>
            <div className="mt-4 flex items-center gap-3">
              <a href="https://twitter.com" aria-label="Twitter" className="inline-flex h-9 w-9 items-center justify-center rounded-full ring-1 ring-neutral-200 hover:bg-neutral-100 transition">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
              <a href="https://instagram.com" aria-label="Instagram" className="inline-flex h-9 w-9 items-center justify-center rounded-full ring-1 ring-neutral-200 hover:bg-neutral-100 transition">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                </svg>
              </a>
              <a href="https://tiktok.com" aria-label="TikTok" className="inline-flex h-9 w-9 items-center justify-center rounded-full ring-1 ring-neutral-200 hover:bg-neutral-100 transition">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                  <path d="M9 18V5l12-2v13"></path>
                  <circle cx="6" cy="18" r="3"></circle>
                  <circle cx="18" cy="16" r="3"></circle>
                </svg>
              </a>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-neutral-900 mb-3">Product</p>
            <ul className="space-y-2 text-sm text-neutral-600">
              {footerLinks.product.map((link, i) => (
                <li key={i}>
                  <a href={link.href} className="hover:text-neutral-900">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-medium text-neutral-900 mb-3">Company</p>
            <ul className="space-y-2 text-sm text-neutral-600">
              {footerLinks.company.map((link, i) => (
                <li key={i}>
                  <a href={link.href} className="hover:text-neutral-900">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-medium text-neutral-900 mb-3">Support</p>
            <ul className="space-y-2 text-sm text-neutral-600">
              {footerLinks.support.map((link, i) => (
                <li key={i}>
                  <a href={link.href} className="hover:text-neutral-900">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-medium text-neutral-900 mb-3" id="privacy">Legal</p>
            <ul className="space-y-2 text-sm text-neutral-600">
              {footerLinks.legal.map((link, i) => (
                <li key={i}>
                  <a href={link.href} className="hover:text-neutral-900" id={link.href === "#terms" ? "terms" : undefined}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-neutral-200 pt-6">
          <p className="text-sm text-neutral-600">© {currentYear} LevelUp Money, Inc. All rights reserved.</p>
          <div className="flex items-center gap-4 text-sm text-neutral-600">
            <a href="#privacy" className="hover:text-neutral-900">Privacy</a>
            <span aria-hidden="true">•</span>
            <a href="#terms" className="hover:text-neutral-900">Terms</a>
            <span aria-hidden="true">•</span>
            <a href="https://www.rulz.co" className="hover:text-neutral-900">Rulz&Co</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
