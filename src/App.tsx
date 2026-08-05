import { useState, useEffect, useRef } from 'react'
import { Nav, Footer, FloatingCTAs, type Page } from './components/Layout'
import ScaffoldInspections from './pages/ScaffoldInspections'
import ScaffoldingProjects from './pages/ScaffoldingProjects'
import {
  IconShield, IconClipboard, IconHardHat, IconSearch,
  IconChevronDown, IconChevronRight, IconCheck, IconArrowRight,
  IconPhone, IconMail, IconMapPin, IconStar, IconScaffold,
  IconBuilding, IconCertificate, IconZap, IconUsers, IconFileText,
  IconTrendingUp, IconWhatsapp,
} from './components/icons'

// ─── useScrollReveal ─────────────────────────────────────────────────
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target) } }),
      { threshold: 0.12 }
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

// ─── Animated counter ────────────────────────────────────────────────
function useCounter(target: number, duration = 1800, inView: boolean) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = Math.ceil(target / (duration / 16))
    const timer = setInterval(() => {
      start += step
      if (start >= target) { setCount(target); clearInterval(timer) }
      else setCount(start)
    }, 16)
    return () => clearInterval(timer)
  }, [target, duration, inView])
  return count
}

function StatItem({ value, suffix, label, inView }: { value: number; suffix: string; label: string; inView: boolean }) {
  const count = useCounter(value, 1800, inView)
  return (
    <div className="stat-card text-center px-8 py-10">
      <div className="leading-none mb-2" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 800, fontSize: 'clamp(40px,4.5vw,60px)', color: '#F97316' }}>
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-sm font-medium uppercase tracking-widest text-white/60 mt-2">{label}</div>
    </div>
  )
}

const services = [
  { icon: <IconScaffold />, title: 'Scaffold Inspections', desc: 'TG20, SG4 and NASC-compliant scaffold inspections with detailed defect reporting and photographic evidence.', page: 'scaffold-inspections' as Page },
  { icon: <IconHardHat />, title: 'Construction Site Safety', desc: 'Comprehensive site safety inspections, subcontractor monitoring and permit-to-work systems.', page: null },
  { icon: <IconBuilding />, title: 'Temporary Works Inspections', desc: 'Independent inspection of falsework, propping systems and all temporary structural works.', page: null },
  { icon: <IconShield />, title: 'Health & Safety Consultancy', desc: 'Strategic H&S advice for contractors, developers and principal designers across all project stages.', page: null },
  { icon: <IconClipboard />, title: 'CDM Support', desc: 'Principal Designer and CDM Coordinator services ensuring full regulatory compliance.', page: null },
  { icon: <IconFileText />, title: 'RAMS & Risk Assessments', desc: 'Method statements, risk assessments and COSHH assessments written by qualified H&S professionals.', page: null },
  { icon: <IconSearch />, title: 'H&S Audits', desc: 'Detailed construction compliance audits measuring against legal standards and industry best practice.', page: null },
  { icon: <IconCertificate />, title: 'Safety Management Systems', desc: 'Development and implementation of robust safety management frameworks tailored to your organisation.', page: null },
  { icon: <IconUsers />, title: 'CDM Principal Contractor', desc: 'Principal Contractor support — site safety plans, F10 notifications and legislative compliance.', page: null },
  { icon: <IconZap />, title: 'Incident Investigation', desc: 'Thorough incident and near-miss investigation with root cause analysis and corrective action planning.', page: null },
  { icon: <IconTrendingUp />, title: 'Safety Culture Improvement', desc: 'Behavioural safety programmes, toolbox talks and workforce engagement strategies.', page: null },
  { icon: <IconCertificate />, title: 'Scaffolding Project Support', desc: 'Independent safety input for commercial and domestic projects from planning through dismantling.', page: 'scaffolding-projects' as Page },
]

const industries = [
  'Construction', 'Residential Development', 'Commercial', 'Industrial',
  'Infrastructure', 'Rail', 'Utilities', 'Education', 'Healthcare',
  'Warehousing', 'Manufacturing', 'Local Authorities', 'Principal Contractors', 'House Builders',
]

const testimonials = [
  { name: 'Independent', role: 'Clear professional judgement', text: 'Impartial inspection findings that help dutyholders understand the condition of the scaffold and decide what happens next.', rating: 5 },
  { name: 'Experienced', role: 'More than 21 years in scaffolding', text: 'Advice shaped by advanced scaffold inspection, hands-on delivery and eight years running a scaffolding business.', rating: 5 },
  { name: 'Practical', role: 'Actions site teams can use', text: 'Clear reports, photographic evidence and proportionate recommendations focused on resolving risk.', rating: 5 },
]

const faqs = [
  { q: 'What is a scaffold inspection and how often is one required?', a: "Under the Work at Height Regulations 2005, scaffolding must be inspected by a competent person before first use, at least every 7 days while in use, and after events that may have affected stability. Safeguard Group can provide planned or individual inspections with clear digital reporting." },
  { q: 'What areas does Safeguard Group cover?', a: "Safeguard Group is based in Hertfordshire and supports projects in London and across the UK, subject to project scope and availability." },
  { q: 'What experience supports your scaffold inspections?', a: "Safeguard Group is led by an Advanced Scaffold Inspector with more than 21 years in scaffolding and eight years of experience running a scaffolding business." },
  { q: 'What construction safety support is available?', a: "Support can include site audits, RAMS verification, working-at-height reviews, temporary works, plant, lifting, fire, COSHH and corrective-action tracking. Contact us to discuss the competent support required for your project." },
  { q: 'What does a scaffold inspection report include?', a: "Reports record the scaffold location, inspection findings, condition, restrictions, photographic evidence and actions required. Delivery times are agreed when the inspection is booked." },
  { q: 'How do I request a responsive scaffold inspection?', a: "Email the site location, scaffold type, reason for the inspection and required timescale. We will confirm availability and scope as soon as practicable." },
]

// ─── Home Page ───────────────────────────────────────────────────────
function HomePage({ onNavigate }: { onNavigate: (page: Page) => void }) {
  useScrollReveal()
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [statsInView, setStatsInView] = useState(false)
  const [formData, setFormData] = useState({ name: '', company: '', email: '', phone: '', service: '', message: '' })
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStatsInView(true) }, { threshold: 0.3 })
    if (statsRef.current) observer.observe(statsRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const t = setInterval(() => setActiveTestimonial((p) => (p + 1) % testimonials.length), 5000)
    return () => clearInterval(t)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Safeguard Group enquiry from ${formData.name}`)
    const body = encodeURIComponent(`Company: ${formData.company}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nService: ${formData.service}\n\n${formData.message}`)
    window.location.href = `mailto:info@safeguardgroup.co.uk?subject=${subject}&body=${body}`
    setFormData({ name: '', company: '', email: '', phone: '', service: '', message: '' })
  }

  return (
    <>
      {/* ── Hero ──────────────────────────────────────── */}
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?w=1920&h=1080&fit=crop&auto=format" alt="Construction workers on scaffolding at a UK building site" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(17,17,17,0.92) 0%, rgba(17,17,17,0.75) 50%, rgba(17,17,17,0.6) 100%)' }} />
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-orange-500" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 pt-36 pb-24 w-full">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-500/40 text-orange-400 text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-8">
              <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
              Construction Safety &amp; Scaffold Inspection Specialists
            </div>
            <h1 className="text-shadow-lg text-white leading-tight mb-6" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(38px, 4.8vw, 66px)', fontWeight: 800, lineHeight: 1.15 }}>
              Protecting Construction
              <br /><span className="text-orange-400">Projects</span> Through Expert
              <br />Health &amp; Safety.
            </h1>
            <p className="text-white/70 text-lg md:text-xl leading-relaxed mb-10 max-w-xl">
              Helping contractors, developers and site teams understand risk, strengthen control and protect their workforce.
            </p>
            <div className="flex flex-wrap gap-4">
              <button onClick={() => { onNavigate('scaffold-inspections'); window.scrollTo({ top: 0, behavior: 'smooth' }) }} className="btn-primary px-8 py-4 rounded-full text-base flex items-center gap-2">
                Request Consultation <IconArrowRight />
              </button>
              <a href="#contact" className="btn-outline px-8 py-4 rounded-full text-base flex items-center gap-2">
                Book Inspection <IconChevronRight />
              </a>
            </div>
            <div className="mt-14 flex flex-wrap items-center gap-6">
              {['Advanced Scaffold Inspector', '21+ Years Experience', 'Independent Advice', 'UK Project Support'].map((t) => (
                <div key={t} className="flex items-center gap-1.5">
                  <div className="text-orange-400"><IconCheck className="w-4 h-4" /></div>
                  <span className="text-white/70 text-sm">{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 text-xs">
          <span className="uppercase tracking-widest">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent" />
        </div>
      </section>

      {/* ── Trust bar ────────────────────────────────── */}
      <section className="bg-neutral-100 border-y border-neutral-200 py-6 overflow-hidden">
        <div className="flex gap-0 trust-scroll" style={{ width: 'max-content' }}>
          {[...Array(2)].map((_, di) => (
            <div key={di} className="flex items-center gap-12 px-8">
              {['Advanced Scaffold Inspection', 'Construction Safety Audits', 'Scaffolding Project Support', 'RAMS Verification', 'Working at Height', 'Temporary Works'].map((b) => (
                <div key={b} className="flex items-center gap-2.5 whitespace-nowrap">
                  <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0 text-white">
                    <IconCheck className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-semibold text-neutral-700 uppercase tracking-wide">{b}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────── */}
      <section ref={statsRef} className="bg-neutral-900 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12 reveal">
            <p className="text-orange-400 text-xs font-semibold uppercase tracking-widest mb-3">By The Numbers</p>
            <h2 className="text-white" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 800 }}>Trusted Across UK Construction</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 divide-x divide-white/10 border border-white/10 rounded-2xl overflow-hidden">
            <StatItem value={21} suffix="+" label="Years in Scaffolding" inView={statsInView} />
            <StatItem value={8} suffix="" label="Years Running a Scaffolding Business" inView={statsInView} />
            <StatItem value={7} suffix="-day" label="Statutory Inspection Cycle" inView={statsInView} />
            <StatItem value={3} suffix="" label="Core Consultancy Services" inView={statsInView} />
          </div>
        </div>
      </section>

      {/* ── Services ─────────────────────────────────── */}
      <section id="services" className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <div className="reveal">
              <p className="text-orange-500 text-xs font-semibold uppercase tracking-widest mb-3">Our Services</p>
              <h2 className="orange-underline" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(28px, 3vw, 44px)', fontWeight: 700, color: '#111111' }}>
                Construction Health &amp; Safety<br />Services
              </h2>
            </div>
            <p className="text-neutral-500 max-w-sm text-base leading-relaxed reveal" style={{ transitionDelay: '0.1s' }}>
              From scaffold inspections to full CDM consultancy — we provide the complete health and safety service for the UK construction industry.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {services.map((s, i) => (
              <div
                key={s.title}
                onClick={() => { if (s.page) { onNavigate(s.page); window.scrollTo({ top: 0, behavior: 'smooth' }) } }}
                className={`service-card reveal group bg-white border border-neutral-200 rounded-2xl p-6 flex flex-col gap-4 ${s.page ? 'cursor-pointer' : ''}`}
                style={{ transitionDelay: `${i * 0.04}s` }}
              >
                <div className="w-12 h-12 rounded-xl bg-neutral-100 group-hover:bg-orange-50 flex items-center justify-center text-neutral-700 group-hover:text-orange-500 transition-colors">
                  {s.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900 text-base mb-1.5 group-hover:text-orange-500 transition-colors">{s.title}</h3>
                  <p className="text-neutral-500 text-sm leading-relaxed">{s.desc}</p>
                </div>
                {s.page && (
                  <div className="mt-auto flex items-center gap-1.5 text-orange-500 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn more <IconArrowRight className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Scaffold Feature ─────────────────────────── */}
      <section className="py-28 bg-neutral-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="reveal">
              <p className="text-orange-400 text-xs font-semibold uppercase tracking-widest mb-4">Specialist Service</p>
              <h2 className="text-white mb-6" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(28px, 3vw, 44px)', fontWeight: 700, lineHeight: 1.2 }}>
                Scaffold Inspection<br /><span className="text-orange-400">Services</span>
              </h2>
              <p className="text-white/60 text-lg leading-relaxed mb-8">
                Independent scaffold inspections led by an Advanced Scaffold Inspector, with clear reporting, photographic evidence and practical action priorities.
              </p>
              <div className="grid grid-cols-2 gap-3 mb-10">
                {['TG20 & SG4 Review', 'Work at Height', 'Clear Digital Reports', 'Photo Evidence', 'Defect Scheduling', 'Handover Checks', '7-Day Inspections', 'Responsive Support'].map((f) => (
                  <div key={f} className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-orange-500/20 border border-orange-500/40 flex items-center justify-center flex-shrink-0 text-orange-400"><IconCheck className="w-3 h-3" /></div>
                    <span className="text-white/80 text-sm">{f}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-4">
                <button onClick={() => { onNavigate('scaffold-inspections'); window.scrollTo({ top: 0, behavior: 'smooth' }) }} className="btn-primary px-7 py-3.5 rounded-full text-sm flex items-center gap-2">
                  View Inspection Services <IconArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="relative reveal" style={{ transitionDelay: '0.15s' }}>
              <div className="rounded-2xl overflow-hidden aspect-[4/5] bg-neutral-800">
                <img src="https://images.unsplash.com/photo-1591588582259-e675bd2e6088?w=800&h=1000&fit=crop&auto=format" alt="Scaffold inspector checking scaffolding compliance" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 to-transparent" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-5 shadow-2xl max-w-[200px]">
                <div className="text-3xl font-black text-orange-500 mb-1" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>48h</div>
                <div className="text-xs text-neutral-600 font-medium leading-tight">Emergency inspection response</div>
              </div>
              <div className="absolute -top-6 -right-6 bg-orange-500 rounded-2xl p-5 shadow-2xl max-w-[180px]">
                <div className="text-3xl font-black text-white mb-1" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Clear</div>
                <div className="text-xs text-white/80 font-medium leading-tight">Digital reporting and action priorities</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Safeguard ────────────────────────────── */}
      <section id="about" className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="relative reveal">
              <div className="rounded-2xl overflow-hidden h-[520px] bg-neutral-200">
                <img src="https://images.unsplash.com/photo-1652303518379-c0ef1c9fb2b1?w=800&h=900&fit=crop&auto=format" alt="Safeguard Group safety consultants on site inspection" className="w-full h-full object-cover" />
              </div>
              <div className="absolute top-8 -left-4 w-2 h-24 bg-orange-500 rounded-full" />
              <div className="absolute -bottom-6 -right-6 bg-neutral-900 text-white rounded-2xl p-6 shadow-2xl">
                <div className="text-4xl font-black text-orange-400 mb-2" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>21+</div>
                <div className="text-sm text-white/60">Years of scaffolding<br />industry experience</div>
              </div>
            </div>
            <div className="reveal" style={{ transitionDelay: '0.15s' }}>
              <p className="text-orange-500 text-xs font-semibold uppercase tracking-widest mb-4">Why Choose Safeguard Group</p>
              <h2 className="mb-6 orange-underline" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(28px, 3vw, 44px)', fontWeight: 700, color: '#111111', lineHeight: 1.1 }}>
                The UK&#39;s Trusted Independent Safety Executive
              </h2>
              <p className="text-neutral-500 text-base leading-relaxed mb-8">
                Safeguard Group delivers genuinely independent health and safety consultancy. We are not tied to any contractor or developer — our only obligation is to the safety of your workforce and the compliance of your project.
              </p>
              <div className="space-y-5">
                {[
                  { title: 'Fully Independent', desc: 'No conflicts of interest. Our advice serves your safety obligations, not commercial pressures.' },
                  { title: 'Advanced Inspection Experience', desc: 'Scaffold inspection led by more than two decades of hands-on industry knowledge.' },
                  { title: 'Responsive Support', desc: 'Inspection availability and reporting times agreed clearly for each project.' },
                  { title: 'Nationwide Coverage', desc: 'Regional consultants covering England, Scotland and Wales.' },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0 mt-0.5 text-orange-500"><IconCheck className="w-4 h-4" /></div>
                    <div>
                      <div className="font-semibold text-neutral-900 mb-0.5">{item.title}</div>
                      <div className="text-neutral-500 text-sm leading-relaxed">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Industries ───────────────────────────────── */}
      <section id="industries" className="py-24 bg-neutral-50 border-y border-neutral-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14 reveal">
            <p className="text-orange-500 text-xs font-semibold uppercase tracking-widest mb-3">Sectors We Serve</p>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(26px, 2.8vw, 40px)', fontWeight: 700, color: '#111111' }}>Industries We Protect</h2>
          </div>
          <div className="flex flex-wrap gap-3 justify-center reveal">
            {industries.map((ind) => (
              <a key={ind} href="#contact" className="px-5 py-2.5 rounded-full border border-neutral-300 bg-white text-neutral-700 text-sm font-medium hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all duration-200">{ind}</a>
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
            {[
              { img: 'photo-1625082299956-faa4f627834b', alt: 'Construction crane on UK building project', label: 'Commercial Construction' },
              { img: 'photo-1614127938540-a1139bee1841', alt: 'Construction worker with hard hat on high-rise site', label: 'Infrastructure' },
              { img: 'photo-1541888804692-532ae8a87985', alt: 'Aerial view of construction site', label: 'Residential Development' },
              { img: 'photo-1593313637552-29c2c0dacd35', alt: 'Worker on scaffolding at construction site', label: 'Industrial' },
            ].map((item) => (
              <div key={item.label} className="reveal relative rounded-2xl overflow-hidden aspect-square bg-neutral-300 group cursor-pointer">
                <img src={`https://images.unsplash.com/${item.img}?w=400&h=400&fit=crop&auto=format`} alt={item.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 text-white font-semibold text-sm">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────── */}
      <section className="py-28 bg-neutral-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 reveal">
            <p className="text-orange-400 text-xs font-semibold uppercase tracking-widest mb-3">Client Testimonials</p>
            <h2 className="text-white" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 800 }}>Trusted by UK Construction</h2>
          </div>
          <div className="relative max-w-4xl mx-auto">
            <div className="overflow-hidden rounded-3xl">
              <div className="flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}>
                {testimonials.map((t, i) => (
                  <div key={i} className="min-w-full px-4">
                    <div className="bg-white/5 border border-white/10 rounded-3xl p-10 md:p-14 backdrop-blur-sm">
                      <div className="flex gap-1 mb-6">{[...Array(t.rating)].map((_, si) => <IconStar key={si} />)}</div>
                      <blockquote className="text-white/90 text-lg md:text-xl leading-relaxed mb-8">&ldquo;{t.text}&rdquo;</blockquote>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-lg">{t.name.charAt(0)}</div>
                        <div>
                          <div className="text-white font-semibold">{t.name}</div>
                          <div className="text-white/50 text-sm">{t.role}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setActiveTestimonial(i)} className={`rounded-full transition-all duration-300 ${i === activeTestimonial ? 'w-8 h-2.5 bg-orange-500' : 'w-2.5 h-2.5 bg-white/30 hover:bg-white/50'}`} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────── */}
      <section className="py-28 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16 reveal">
            <p className="text-orange-500 text-xs font-semibold uppercase tracking-widest mb-3">FAQ</p>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(26px, 2.8vw, 40px)', fontWeight: 700, color: '#111111' }}>Frequently Asked Questions</h2>
          </div>
          <div className="space-y-3 reveal">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-neutral-200 rounded-2xl overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-neutral-50 transition-colors">
                  <span className="font-semibold text-neutral-900 text-base pr-4">{faq.q}</span>
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${openFaq === i ? 'bg-orange-500 text-white rotate-180' : 'bg-neutral-100 text-neutral-500'}`}><IconChevronDown /></div>
                </button>
                <div className={`accordion-content ${openFaq === i ? 'open' : ''}`}>
                  <div className="px-6 pb-5 text-neutral-500 text-sm leading-relaxed border-t border-neutral-100 pt-4">{faq.a}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ───────────────────────────────── */}
      <section className="relative py-24 overflow-hidden bg-neutral-900">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1672954766776-cf2d157222b3?w=1920&h=600&fit=crop&auto=format" alt="Construction workers in PPE on UK building site" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-900 via-neutral-900/90 to-neutral-900/60" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 text-center reveal">
          <div className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-500/30 text-orange-400 text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-8">
            <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
            Planned and responsive inspection support
          </div>
          <h2 className="text-white mb-6" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(32px, 3.8vw, 52px)', fontWeight: 800, lineHeight: 1.2 }}>
            Protect Your Site.<br /><span className="text-orange-400">Protect Your People.</span>
          </h2>
          <p className="text-white/60 text-lg max-w-xl mx-auto mb-10 leading-relaxed">Tell us about your project, location and timescale and we will discuss the most useful next step.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="#contact" className="btn-primary px-8 py-4 rounded-full text-base flex items-center gap-2">Request Consultation <IconArrowRight /></a>
            <a href="mailto:info@safeguardgroup.co.uk" className="btn-outline px-8 py-4 rounded-full text-base flex items-center gap-2"><IconMail /> Email Safeguard Group</a>
          </div>
        </div>
      </section>

      {/* ── Contact ──────────────────────────────────── */}
      <section id="contact" className="py-28 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="reveal">
              <p className="text-orange-500 text-xs font-semibold uppercase tracking-widest mb-4">Get In Touch</p>
              <h2 className="mb-6" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(28px, 3vw, 44px)', fontWeight: 700, color: '#111111', lineHeight: 1.1 }}>
                Request a Consultation<br />or Book an Inspection
              </h2>
              <p className="text-neutral-500 text-base leading-relaxed mb-10">Share the site location, timescale and support required. We will respond as soon as practicable to agree scope and availability.</p>
              <div className="space-y-5 mb-10">
                {[
                  { icon: <IconMail />, label: 'Email', value: 'info@safeguardgroup.co.uk' },
                  { icon: <IconMapPin />, label: 'Based in', value: 'Hertfordshire — supporting projects in London and across the UK' },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center flex-shrink-0">{item.icon}</div>
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wide text-neutral-400 mb-0.5">{item.label}</div>
                      <div className="text-neutral-800 font-medium">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="rounded-2xl overflow-hidden h-48 bg-neutral-200">
                <iframe title="Safeguard Group location" className="w-full h-full border-0" src="https://www.openstreetmap.org/export/embed.html?bbox=-2.00,52.40,-1.70,52.60&layer=mapnik" loading="lazy" />
              </div>
            </div>
            <form onSubmit={handleSubmit} className="reveal bg-white border border-neutral-200 rounded-3xl p-8 shadow-sm space-y-5" style={{ transitionDelay: '0.15s' }}>
              <div className="text-lg font-bold text-neutral-900">Send an Enquiry</div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-1.5">Full Name *</label>
                  <input required type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="John Smith" className="w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 transition-all placeholder-neutral-400" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-1.5">Company</label>
                  <input type="text" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} placeholder="Your Company Ltd" className="w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 transition-all placeholder-neutral-400" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-1.5">Email *</label>
                  <input required type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="john@company.co.uk" className="w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 transition-all placeholder-neutral-400" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-1.5">Phone</label>
                  <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="07700 900000" className="w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 transition-all placeholder-neutral-400" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-1.5">Service Required</label>
                <select value={formData.service} onChange={(e) => setFormData({ ...formData, service: e.target.value })} className="w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 transition-all bg-white">
                  <option value="">Select a service...</option>
                  <option>Scaffold Inspection</option>
                  <option>Commercial Scaffolding Project</option>
                  <option>Domestic Scaffolding Project</option>
                  <option>H&S Consultancy</option>
                  <option>CDM Support</option>
                  <option>RAMS Review</option>
                  <option>Emergency Inspection</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-1.5">Project Details</label>
                <textarea rows={4} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder="Tell us about your project, location, urgency and any specific requirements..." className="w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 transition-all resize-none placeholder-neutral-400" />
              </div>
              <button type="submit" className="btn-primary w-full py-4 rounded-xl text-base flex items-center justify-center gap-2">
                Send Enquiry <IconArrowRight />
              </button>
              <p className="text-xs text-neutral-400 text-center">This form prepares an email in your device. Your enquiry is not stored by the website.</p>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}

// ─── App (Router) ─────────────────────────────────────────────────────
export default function App() {
  const pageFromPath = (): Page => {
    if (window.location.pathname === '/scaffold-inspections') return 'scaffold-inspections'
    if (window.location.pathname === '/scaffolding-projects') return 'scaffolding-projects'
    return 'home'
  }
  const [page, setPage] = useState<Page>(pageFromPath)

  useEffect(() => {
    const onPopState = () => setPage(pageFromPath())
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  useEffect(() => {
    const meta = {
      home: ['Safeguard Group | Construction Health & Safety Consultancy', 'Independent construction safety consultancy specialising in scaffold inspections and scaffolding project support.'],
      'scaffold-inspections': ['Independent Scaffold Inspections | Safeguard Group', 'Advanced scaffold inspections across Hertfordshire, London and the UK with clear digital reporting and photographic evidence.'],
      'scaffolding-projects': ['Scaffolding Project Safety Support | Safeguard Group', 'Independent safety, inspection and compliance support for commercial and domestic scaffolding projects.'],
    }[page]
    document.title = meta[0]
    document.querySelector('meta[name="description"]')?.setAttribute('content', meta[1])
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', `https://www.safeguardgroup.co.uk${window.location.pathname}`)
  }, [page])

  const handleNavigate = (p: Page) => {
    const path = p === 'home' ? '/' : `/${p}`
    if (window.location.pathname !== path) window.history.pushState({}, '', path)
    setPage(p)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-white">
      <Nav currentPage={page} onNavigate={handleNavigate} />
      <main>
        {page === 'home' && <HomePage onNavigate={handleNavigate} />}
        {page === 'scaffold-inspections' && <ScaffoldInspections onNavigate={handleNavigate} />}
        {page === 'scaffolding-projects' && <ScaffoldingProjects onNavigate={handleNavigate} />}
      </main>
      <Footer onNavigate={handleNavigate} />
      <FloatingCTAs />
    </div>
  )
}
