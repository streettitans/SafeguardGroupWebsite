import { useState, useEffect, useRef } from 'react'
import {
  IconCheck, IconArrowRight, IconChevronDown, IconChevronRight,
  IconCamera, IconQr, IconClock, IconCertificate, IconShield,
  IconFileText, IconSearch, IconZap, IconPhone, IconMail, IconMapPin,
} from '../components/icons'
import { Breadcrumb } from '../components/Layout'

type Page = 'home' | 'scaffold-inspections' | 'scaffolding-projects'

interface Props {
  onNavigate: (page: Page) => void
}

function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target) } }),
      { threshold: 0.1 }
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

const inspectionTypes = [
  {
    icon: <IconClock />,
    title: 'Weekly Scaffold Inspections',
    desc: 'Mandatory 7-day interval inspections carried out by a CISRS-registered competent person. Covers all scaffold components, ties, boards, toe boards, guardrails and access points.',
    badge: 'Most Popular',
  },
  {
    icon: <IconSearch />,
    title: 'Handover Inspections',
    desc: "First-use inspection confirming the scaffold has been erected in accordance with the designer's drawings, TG20 guidance tube-and-fitting or system scaffold specifications.",
    badge: null,
  },
  {
    icon: <IconZap />,
    title: 'Emergency Inspections',
    desc: 'Post-incident, post-storm or urgent compliance inspections arranged within 24–48 hours. Full written report and re-inspection certificate issued on the same day.',
    badge: '24–48hr Response',
  },
  {
    icon: <IconShield />,
    title: 'Temporary Works Inspections',
    desc: 'Independent inspection of falsework, propping systems, shoring and all temporary structural elements under BS 5975 and the Temporary Works Forum guidance.',
    badge: null,
  },
  {
    icon: <IconFileText />,
    title: 'Monthly Condition Surveys',
    desc: 'Longer-term scaffolding condition surveys for retained scaffolds or those on complex multi-phase projects exceeding a single weekly cycle.',
    badge: null,
  },
  {
    icon: <IconCertificate />,
    title: 'Compliance Audit Inspections',
    desc: 'Full NASC TG20 compliance audit for scaffolding contractors and principal contractors seeking to demonstrate regulatory compliance to clients or the HSE.',
    badge: null,
  },
]

const processSteps = [
  { num: '01', title: 'Book Online or Call', desc: 'Request an inspection via our online form or call 0800 123 4567. Emergency inspections confirmed within the hour.' },
  { num: '02', title: 'Site Attendance', desc: 'A CISRS-registered inspector attends at the agreed time, carrying out a systematic check of every scaffold element.' },
  { num: '03', title: 'Defect Recording', desc: 'All deficiencies are photographed, logged and categorised by severity: Immediate Danger, Should Not Be Used, or Advisory.' },
  { num: '04', title: 'Digital Report Issued', desc: 'A full written inspection report with photographs is emailed to you the same day, along with a QR-coded inspection certificate.' },
  { num: '05', title: 'Re-Inspection & Sign-Off', desc: 'Where defects are found, a follow-up re-inspection confirms remediation before a clear certificate is issued.' },
]

const standards = [
  { title: 'NASC TG20:21', desc: 'The industry guidance for tube-and-fitting scaffold design and inspection in the UK. Our inspectors are trained and examined to TG20 standards.' },
  { title: 'SG4:22', desc: 'NASC guidance on the prevention of falls in scaffolding operations. We verify compliance at handover and during all subsequent inspections.' },
  { title: 'BS EN 12811', desc: 'European standard for temporary works equipment. We check scaffold components against this standard during all structural inspections.' },
  { title: 'BS 5975:2019', desc: 'Code of practice for temporary works procedures. All Temporary Works inspections reference the current edition of BS 5975.' },
  { title: 'Work at Height Regulations 2005', desc: 'Regulatory framework requiring competent-person inspections at 7-day intervals and following any event likely to affect scaffold stability.' },
  { title: 'CDM Regulations 2015', desc: 'Our inspectors understand their obligations under CDM 2015 and can liaise directly with the Principal Contractor and Principal Designer.' },
]

const reportFeatures = [
  { icon: <IconCamera />, title: 'Photographic Evidence', desc: 'Every defect captured with geo-tagged photography and annotated for clarity.' },
  { icon: <IconQr />, title: 'QR Code Certificates', desc: 'Scannable QR certificate displayed on-site linking to the live digital inspection record.' },
  { icon: <IconFileText />, title: 'Same-Day Delivery', desc: 'Reports emailed within hours of inspection completion, not days.' },
  { icon: <IconCertificate />, title: 'Legally Admissible', desc: 'Reports meet HSE and court requirements as contemporaneous inspection records.' },
]

const faqs = [
  { q: 'How often does scaffolding need to be inspected?', a: 'Under the Work at Height Regulations 2005, scaffolding must be inspected by a competent person: before first use, at least every 7 days during use, and following any event that may have affected stability — such as high winds, heavy rain, accidental impact, or modification to the scaffold. Safeguard Group provides weekly inspection programmes on contract or on an ad hoc basis.' },
  { q: 'What qualifications does a scaffold inspector need?', a: 'A scaffold inspector must be a competent person — someone with sufficient training, experience and knowledge to carry out the task safely. In practice, this means a CISRS-registered scaffold inspector (Card Scheme) or an equivalent construction health and safety professional with specific scaffold inspection training. All Safeguard Group inspectors hold CISRS cards and relevant IOSH/NEBOSH qualifications.' },
  { q: 'What is TG20 and why does it matter?', a: "TG20:21 is the NASC's guidance document for tube-and-fitting scaffold design and inspection. It provides compliant design solutions for standard scaffolds without the need for individual structural calculations. Our inspectors verify that scaffolds conform to TG20 — or, where they don't, that bespoke structural calculations have been provided by a Temporary Works engineer." },
  { q: 'What happens if the scaffold fails an inspection?', a: "If a scaffold fails an inspection, it is immediately categorised as 'Immediate Danger' (must not be used), 'Should Not Be Used' (unsafe but not immediately dangerous) or 'Advisory' (minor issues requiring monitoring). The Principal Contractor is notified immediately, a written defect schedule is issued, and a re-inspection is arranged once remedial works are confirmed complete." },
  { q: 'Do you provide scaffold inspection certificates?', a: 'Yes. Every inspection results in a formal inspection report under Regulation 6 of the Work at Height Regulations 2005 and a QR-coded inspection certificate. Our certificates are digitally signed, time-stamped and admissible as legal records. They can be displayed on-site via a QR code linked to the full digital report.' },
  { q: 'Can you inspect scaffolding erected by any contractor?', a: 'Absolutely. Safeguard Group is fully independent — we are not affiliated with any scaffolding contractor. This independence is important because our reports are unbiased and provide genuine assurance to the Principal Contractor, developer and HSE.' },
]

export default function ScaffoldInspections({ onNavigate }: Props) {
  useScrollReveal()
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [formData, setFormData] = useState({ name: '', company: '', email: '', phone: '', type: '', date: '', message: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Inspection request received. A Safeguard Group inspector will confirm your booking within 2 hours.')
    setFormData({ name: '', company: '', email: '', phone: '', type: '', date: '', message: '' })
  }

  return (
    <div className="min-h-screen bg-white">
      {/* ── Hero ─────────────────────────────────────── */}
      <section className="relative min-h-[70vh] flex items-end overflow-hidden pt-28 pb-20">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1713593930871-e21d7f9ef4a1?w=1920&h=900&fit=crop&auto=format"
            alt="CISRS-registered scaffold inspectors checking scaffolding compliance on a UK construction site"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(17,17,17,0.94) 0%, rgba(17,17,17,0.78) 60%, rgba(17,17,17,0.55) 100%)' }} />
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-orange-500" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 w-full">
          <Breadcrumb
            items={[
              { label: 'Home', onClick: () => onNavigate('home') },
              { label: 'Scaffold Inspections' },
            ]}
          />
          <div className="mt-6 max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-500/40 text-orange-400 text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-6">
              <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
              NASC TG20 &amp; SG4 Compliant Inspections
            </div>
            <h1 className="text-white mb-5 text-shadow-lg" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(34px, 4.2vw, 56px)', fontWeight: 800, lineHeight: 1.15 }}>
              Scaffold Inspection
              <br /><span className="text-orange-400">Services</span>
            </h1>
            <p className="text-white/70 text-lg leading-relaxed mb-8 max-w-2xl">
              Independent, CISRS-registered scaffold inspections across the UK. Same-day digital reports, QR-coded certificates and 24-hour emergency response — keeping your site legally compliant and your workforce safe.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#book" className="btn-primary px-7 py-3.5 rounded-full text-sm flex items-center gap-2">
                Book an Inspection <IconArrowRight className="w-4 h-4" />
              </a>
              <a href="tel:+441234567890" className="btn-outline px-7 py-3.5 rounded-full text-sm flex items-center gap-2">
                <IconPhone /> Emergency: 0800 123 4567
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Key stats bar ────────────────────────────── */}
      <section className="bg-orange-500">
        <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-2 md:grid-cols-4 divide-x divide-orange-400">
          {[
            { val: '2,400+', label: 'Inspections Completed' },
            { val: '48hr', label: 'Emergency Response' },
            { val: 'Same Day', label: 'Digital Report Delivery' },
            { val: '100%', label: 'NASC TG20 Compliant' },
          ].map((s) => (
            <div key={s.label} className="text-center px-4 py-2">
              <div className="text-2xl font-black text-white" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{s.val}</div>
              <div className="text-orange-100 text-xs font-medium mt-0.5 uppercase tracking-wide">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── What's included ──────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="reveal">
              <p className="text-orange-500 text-xs font-semibold uppercase tracking-widest mb-4">What We Check</p>
              <h2 className="mb-6 orange-underline" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(26px, 2.8vw, 40px)', fontWeight: 700, color: '#111111', lineHeight: 1.25 }}>
                Comprehensive Scaffold<br />Inspection Checklist
              </h2>
              <p className="text-neutral-500 text-base leading-relaxed mb-8">
                Every inspection follows a systematic, documented methodology covering all scaffold components and safety systems — from foundation to top lift.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  'Standard ledgers, transoms & tubes', 'Tie frequency & fixing condition',
                  'Base plates & sole boards', 'Guardrails & toe boards',
                  'Scaffold boards & condition', 'Access ladders & stair towers',
                  'Brick guards & debris netting', 'Loading bay configuration',
                  'Putlog & through ties', 'Butt joints & couplers',
                  'Reveal pins & façade ties', 'Brace patterns (plan & face)',
                  'Ground conditions & foundations', 'Exclusion zones & signage',
                  'Cantilever & fan construction', 'System scaffold connections',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <IconCheck className="w-3 h-3" />
                    </div>
                    <span className="text-neutral-700 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="reveal" style={{ transitionDelay: '0.15s' }}>
              <div className="relative rounded-2xl overflow-hidden aspect-[3/4] bg-neutral-200">
                <img
                  src="https://images.unsplash.com/photo-1649320316177-775fe2d67ca3?w=700&h=900&fit=crop&auto=format"
                  alt="Scaffold inspector on top of building checking tube-and-fitting scaffold compliance"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 to-transparent" />
              </div>
              {/* Floating report card */}
              <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl p-5 shadow-2xl max-w-[220px] border border-neutral-100">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                    <IconCheck className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-neutral-900 text-sm">Report Issued</span>
                </div>
                <div className="text-xs text-neutral-500 leading-snug">Digital report + QR certificate emailed same day</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Inspection Types ─────────────────────────── */}
      <section className="py-24 bg-neutral-50 border-y border-neutral-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14 reveal">
            <p className="text-orange-500 text-xs font-semibold uppercase tracking-widest mb-3">Inspection Types</p>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(26px, 2.8vw, 40px)', fontWeight: 700, color: '#111111' }}>
              Every Inspection Requirement Covered
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {inspectionTypes.map((type, i) => (
              <div
                key={type.title}
                className="service-card reveal bg-white border border-neutral-200 rounded-2xl p-7 flex flex-col gap-4"
                style={{ transitionDelay: `${i * 0.07}s` }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center flex-shrink-0">
                    {type.icon}
                  </div>
                  {type.badge && (
                    <span className="bg-orange-500 text-white text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full flex-shrink-0">
                      {type.badge}
                    </span>
                  )}
                </div>
                <h3 className="font-bold text-neutral-900 text-lg leading-snug">{type.title}</h3>
                <p className="text-neutral-500 text-sm leading-relaxed">{type.desc}</p>
                <a href="#book" className="mt-auto text-orange-500 text-sm font-semibold flex items-center gap-1.5 hover:gap-2.5 transition-all">
                  Book This Inspection <IconArrowRight className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Inspection Process ───────────────────────── */}
      <section className="py-24 bg-neutral-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 reveal">
            <p className="text-orange-400 text-xs font-semibold uppercase tracking-widest mb-3">Our Process</p>
            <h2 className="text-white" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 800 }}>
              From Booking to Certificate — Same Day
            </h2>
          </div>
          <div className="relative">
            {/* Connecting line */}
            <div className="hidden lg:block absolute top-10 left-[10%] right-[10%] h-px bg-white/10" />
            <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
              {processSteps.map((step, i) => (
                <div key={step.num} className="reveal text-center" style={{ transitionDelay: `${i * 0.1}s` }}>
                  <div className="w-20 h-20 rounded-full border-2 border-orange-500 bg-neutral-800 flex items-center justify-center mx-auto mb-5 relative">
                    <span className="text-orange-400 font-black text-xl" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{step.num}</span>
                  </div>
                  <h3 className="text-white font-bold text-base mb-2">{step.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Report Features ──────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="reveal">
              <p className="text-orange-500 text-xs font-semibold uppercase tracking-widest mb-4">Inspection Reports</p>
              <h2 className="mb-6" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(26px, 2.8vw, 40px)', fontWeight: 700, color: '#111111', lineHeight: 1.25 }}>
                Digital Reports That<br /><span className="text-orange-500">Actually Add Value</span>
              </h2>
              <p className="text-neutral-500 text-base leading-relaxed mb-8">
                Our scaffold inspection reports are not generic checklists. Every report is a structured, photographic record that serves as a legal document, a management tool and an action tracker.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {reportFeatures.map((f) => (
                  <div key={f.title} className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center flex-shrink-0">
                      {f.icon}
                    </div>
                    <div>
                      <div className="font-semibold text-neutral-900 text-sm mb-1">{f.title}</div>
                      <div className="text-neutral-500 text-sm leading-relaxed">{f.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-10 p-5 bg-neutral-50 border border-neutral-200 rounded-2xl">
                <div className="text-sm font-semibold text-neutral-900 mb-2">Report Delivery</div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-sm text-neutral-600">Emailed within 4 hours of inspection completion</span>
                </div>
              </div>
            </div>
            <div className="reveal" style={{ transitionDelay: '0.15s' }}>
              <div className="bg-neutral-900 rounded-3xl p-8 border border-white/10">
                <div className="text-xs font-semibold uppercase tracking-widest text-neutral-500 mb-4">Sample Report Summary</div>
                <div className="space-y-3">
                  {[
                    { label: 'Inspection Date', value: '04 August 2025', ok: true },
                    { label: 'Inspector', value: 'CISRS Card Holder — J. Williams', ok: true },
                    { label: 'Scaffold Type', value: 'Tube & Fitting — Independent', ok: true },
                    { label: 'TG20 Compliance', value: 'Compliant', ok: true },
                    { label: 'Ties Checked', value: '47 of 47 — All Secure', ok: true },
                    { label: 'Defects Found', value: '2 Advisory Items', ok: false },
                    { label: 'Guardrails', value: 'All Present & Secure', ok: true },
                    { label: 'Overall Rating', value: 'PASS — Certificate Issued', ok: true },
                  ].map((row) => (
                    <div key={row.label} className="flex items-center justify-between py-2 border-b border-white/10">
                      <span className="text-white/50 text-sm">{row.label}</span>
                      <span className={`text-sm font-medium ${row.ok ? 'text-green-400' : 'text-amber-400'}`}>{row.value}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-5 flex items-center gap-3 p-4 bg-orange-500/10 border border-orange-500/30 rounded-xl">
                  <div className="w-10 h-10 rounded-lg bg-orange-500 flex items-center justify-center flex-shrink-0">
                    <IconQr />
                  </div>
                  <div>
                    <div className="text-white text-sm font-semibold">QR Certificate Active</div>
                    <div className="text-white/50 text-xs">Scan to verify on-site</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Standards & Compliance ───────────────────── */}
      <section className="py-24 bg-neutral-50 border-y border-neutral-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14 reveal">
            <p className="text-orange-500 text-xs font-semibold uppercase tracking-widest mb-3">Standards &amp; Compliance</p>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(26px, 2.8vw, 40px)', fontWeight: 700, color: '#111111' }}>
              Inspections That Meet Every Standard
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {standards.map((s, i) => (
              <div key={s.title} className="reveal bg-white border border-neutral-200 rounded-2xl p-6" style={{ transitionDelay: `${i * 0.07}s` }}>
                <div className="text-orange-500 font-black text-xl mb-3" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{s.title}</div>
                <p className="text-neutral-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-14 reveal">
            <p className="text-orange-500 text-xs font-semibold uppercase tracking-widest mb-3">FAQ</p>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(26px, 2.8vw, 40px)', fontWeight: 700, color: '#111111' }}>
              Scaffold Inspection Questions
            </h2>
          </div>
          <div className="space-y-3 reveal">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-neutral-200 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-neutral-50 transition-colors"
                >
                  <span className="font-semibold text-neutral-900 text-base pr-4">{faq.q}</span>
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${openFaq === i ? 'bg-orange-500 text-white rotate-180' : 'bg-neutral-100 text-neutral-500'}`}>
                    <IconChevronDown />
                  </div>
                </button>
                <div className={`accordion-content ${openFaq === i ? 'open' : ''}`}>
                  <div className="px-6 pb-5 text-neutral-500 text-sm leading-relaxed border-t border-neutral-100 pt-4">{faq.a}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Booking Form ─────────────────────────────── */}
      <section id="book" className="py-24 bg-neutral-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="reveal">
              <p className="text-orange-400 text-xs font-semibold uppercase tracking-widest mb-4">Book an Inspection</p>
              <h2 className="text-white mb-6" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(26px, 2.8vw, 40px)', fontWeight: 700, lineHeight: 1.25 }}>
                Schedule Your<br /><span className="text-orange-400">Scaffold Inspection</span>
              </h2>
              <p className="text-white/60 text-base leading-relaxed mb-8">
                Complete the form and a CISRS-registered inspector will confirm your booking within 2 hours. Emergency inspections available within 24–48 hours nationwide.
              </p>
              <div className="space-y-4">
                {[
                  { icon: <IconPhone />, text: '0800 123 4567 — Emergency line available 24/7' },
                  { icon: <IconMail />, text: 'inspections@safeguardgroup.co.uk' },
                  { icon: <IconMapPin />, text: 'Nationwide coverage — England, Scotland & Wales' },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-3 text-white/60 text-sm">
                    <div className="text-orange-400">{item.icon}</div>
                    {item.text}
                  </div>
                ))}
              </div>
            </div>
            <form onSubmit={handleSubmit} className="reveal bg-white rounded-3xl p-8 space-y-5" style={{ transitionDelay: '0.15s' }}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-1.5">Name *</label>
                  <input required type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="John Smith" className="w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 transition-all placeholder-neutral-400" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-1.5">Company</label>
                  <input type="text" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} placeholder="Company Ltd" className="w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 transition-all placeholder-neutral-400" />
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
                <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-1.5">Inspection Type</label>
                <select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} className="w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 transition-all bg-white">
                  <option value="">Select inspection type...</option>
                  <option>Weekly Scaffold Inspection</option>
                  <option>Handover Inspection</option>
                  <option>Emergency Inspection</option>
                  <option>Temporary Works Inspection</option>
                  <option>Monthly Condition Survey</option>
                  <option>Compliance Audit Inspection</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-1.5">Preferred Date</label>
                <input type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} className="w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 transition-all" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-1.5">Site Details</label>
                <textarea rows={3} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder="Site address, scaffold type, number of lifts, access requirements..." className="w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 transition-all resize-none placeholder-neutral-400" />
              </div>
              <button type="submit" className="btn-primary w-full py-4 rounded-xl text-base flex items-center justify-center gap-2">
                Request Inspection <IconArrowRight />
              </button>
              <p className="text-xs text-neutral-400 text-center">Confirmation within 2 hours. Emergency: 0800 123 4568</p>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
