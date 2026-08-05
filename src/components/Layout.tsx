import { useState, useEffect } from 'react'
import logo from '../imports/Safeguard_Group_logo.png'
import {
  IconPhone, IconMail, IconChevronDown, IconMenu, IconX,
  IconArrowRight, IconWhatsapp, IconLinkedIn, IconFacebook,
  IconInstagram, IconArrowUp, IconChevronRight,
} from './icons'

type Page = 'home' | 'scaffold-inspections' | 'scaffolding-projects'

interface NavProps {
  currentPage: Page
  onNavigate: (page: Page) => void
}

const navItems: { label: string; page?: Page; href?: string }[] = [
  { label: 'Home', page: 'home' },
  { label: 'Scaffold Inspections', page: 'scaffold-inspections' },
  { label: 'Scaffolding Projects', page: 'scaffolding-projects' },
  { label: 'About', href: '#about' },
  { label: 'Industries', href: '#industries' },
  { label: 'Contact', href: '#contact' },
]

export function Nav({ currentPage, onNavigate }: NavProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const handleNav = (page?: Page, href?: string) => {
    setMobileOpen(false)
    if (page) {
      onNavigate(page)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else if (href) {
      if (currentPage !== 'home') {
        onNavigate('home')
        setTimeout(() => {
          document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
        }, 300)
      } else {
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(17,17,17,0.98)' : '#111111',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        boxShadow: scrolled ? '0 2px 32px rgba(0,0,0,0.3)' : 'none',
      }}
    >
      {/* Top utility bar */}
      <div className="border-b border-white/10 hidden md:flex">
        <div className="max-w-7xl mx-auto w-full px-6 flex items-center justify-between py-2 text-xs text-white/50">
          <span>Independent Construction Health &amp; Safety Consultancy</span>
          <div className="flex items-center gap-6">
            <a href="mailto:info@safeguardgroup.co.uk" className="flex items-center gap-1.5 hover:text-orange-400 transition-colors">
              <IconMail /> Request a call back
            </a>
            <a href="mailto:info@safeguardgroup.co.uk" className="flex items-center gap-1.5 hover:text-orange-400 transition-colors">
              <IconMail /> info@safeguardgroup.co.uk
            </a>
          </div>
        </div>
      </div>
      {/* Main nav */}
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        <button onClick={() => handleNav('home')} className="flex items-center">
          <img src={logo} alt="Safeguard Group" className="h-10 w-auto" />
        </button>
        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-7">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNav(item.page, item.href)}
              className={`nav-link text-sm font-medium transition-colors flex items-center gap-1 ${
                item.page && currentPage === item.page
                  ? 'text-orange-400'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              {item.label}
              {item.label === 'Services' && <IconChevronDown className="w-3.5 h-3.5 text-white/50" />}
            </button>
          ))}
        </div>
        <div className="hidden lg:flex items-center gap-3">
          <a href="mailto:info@safeguardgroup.co.uk" className="text-sm text-orange-400 font-semibold hover:text-orange-300 transition-colors">info@safeguardgroup.co.uk</a>
          <button onClick={() => handleNav('scaffold-inspections')} className="btn-primary text-sm px-5 py-2.5 rounded-full ml-2">
            Book Inspection
          </button>
        </div>
        <button className="lg:hidden text-white" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
          {mobileOpen ? <IconX /> : <IconMenu />}
        </button>
      </nav>
      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-neutral-900 border-t border-white/10 px-6 py-4">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNav(item.page, item.href)}
              className={`block w-full text-left py-3 border-b border-white/10 text-base font-medium transition-colors ${
                item.page && currentPage === item.page ? 'text-orange-400' : 'text-white/80'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-4 flex flex-col gap-3">
            <button onClick={() => handleNav('scaffold-inspections')} className="btn-primary text-center py-3 rounded-full text-sm">
              Book Inspection
            </button>
            <a href="mailto:info@safeguardgroup.co.uk" className="btn-outline text-center py-3 rounded-full text-sm">
              Request a call back
            </a>
          </div>
        </div>
      )}
    </header>
  )
}

interface FooterProps {
  onNavigate: (page: Page) => void
}

export function Footer({ onNavigate }: FooterProps) {
  const nav = (page: Page) => {
    onNavigate(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-neutral-950 text-white">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10">
        <div className="col-span-2">
          <img src={logo} alt="Safeguard Group" className="h-12 w-auto mb-5 brightness-0 invert" />
          <p className="text-neutral-400 text-sm leading-relaxed mb-6 max-w-xs">
            Independent construction health and safety consultancy specialising in scaffolding inspections and practical site compliance.
          </p>
          <div className="flex gap-3">
            {[<IconLinkedIn />, <IconFacebook />, <IconInstagram />].map((icon, i) => (
              <a key={i} href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-orange-500 flex items-center justify-center transition-colors">
                {icon}
              </a>
            ))}
          </div>
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-widest text-neutral-500 mb-4">Services</div>
          <ul className="space-y-2.5">
            {[
              { label: 'Scaffold Inspections', page: 'scaffold-inspections' as Page },
              { label: 'Commercial & Domestic Projects', page: 'scaffolding-projects' as Page },
            ].map((l) => (
              <li key={l.label}>
                <button onClick={() => nav(l.page)} className="text-sm text-neutral-400 hover:text-white transition-colors text-left">
                  {l.label}
                </button>
              </li>
            ))}
            {['Temporary Works', 'H&S Consultancy', 'CDM Support', 'RAMS Review', 'H&S Audits'].map((l) => (
              <li key={l}><a href="#" className="text-sm text-neutral-400 hover:text-white transition-colors">{l}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-widest text-neutral-500 mb-4">Company</div>
          <ul className="space-y-2.5">
            {['About Us', 'Our Consultants', 'Accreditations', 'Case Studies', 'Blog', 'Careers'].map((l) => (
              <li key={l}><a href="#" className="text-sm text-neutral-400 hover:text-white transition-colors">{l}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-widest text-neutral-500 mb-4">Industries</div>
          <ul className="space-y-2.5">
            {['Construction', 'Residential', 'Commercial', 'Infrastructure', 'Rail', 'Healthcare', 'Education', 'Industrial'].map((l) => (
              <li key={l}><a href="#" className="text-sm text-neutral-400 hover:text-white transition-colors">{l}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-widest text-neutral-500 mb-4">Newsletter</div>
          <p className="text-neutral-400 text-sm mb-4 leading-relaxed">Stay updated on H&S legislation and inspection guidance.</p>
          <div className="flex gap-2 mb-6">
            <input type="email" placeholder="Your email" className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-orange-400" />
            <button className="btn-primary px-3 py-2.5 rounded-lg text-sm flex-shrink-0"><IconArrowRight className="w-4 h-4" /></button>
          </div>
          <div className="space-y-2">
            <a href="mailto:info@safeguardgroup.co.uk" className="flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors"><IconMail /> Email Safeguard Group</a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div>&copy; {new Date().getFullYear()} Safeguard Group Health &amp; Safety Consultancy.</div>
          <div className="flex gap-6">
            <a href="mailto:info@safeguardgroup.co.uk?subject=Privacy%20enquiry" className="hover:text-white transition-colors">Privacy enquiries</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export function FloatingCTAs() {
  return (
    <div className="float-cta">
      <a href="mailto:info@safeguardgroup.co.uk" className="w-12 h-12 rounded-full bg-orange-500 hover:bg-orange-600 flex items-center justify-center text-white shadow-xl transition-all hover:scale-110" aria-label="Email Safeguard Group">
        <IconMail />
      </a>
      <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="w-12 h-12 rounded-full bg-neutral-800 hover:bg-neutral-700 flex items-center justify-center text-white shadow-xl transition-all hover:scale-110" aria-label="Back to top">
        <IconArrowUp />
      </button>
    </div>
  )
}

export function Breadcrumb({ items }: { items: { label: string; page?: Page; onClick?: () => void }[] }) {
  return (
    <nav className="flex items-center gap-2 text-sm text-white/50" aria-label="Breadcrumb">
      {items.map((item, i) => (
        <span key={item.label} className="flex items-center gap-2">
          {i > 0 && <IconChevronRight className="w-3.5 h-3.5" />}
          {item.onClick ? (
            <button onClick={item.onClick} className="hover:text-white transition-colors">{item.label}</button>
          ) : (
            <span className="text-white/80">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}

export type { Page }
