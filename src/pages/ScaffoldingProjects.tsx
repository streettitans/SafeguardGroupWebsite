import { useState, useEffect } from 'react'
import {
  IconCheck, IconArrowRight, IconChevronDown, IconPhone,
  IconMail, IconMapPin, IconHouse, IconBuilding2,
  IconTool, IconRuler, IconShield, IconUsers, IconSun,
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

const commercialTypes = [
  { icon: <IconBuilding2 />, title: 'Office & Retail Refurbishment', desc: 'Façade access scaffolding, roof level working platforms and internal scaffold towers for office blocks, retail units and mixed-use developments.' },
  { icon: <IconTool />, title: 'Industrial & Warehouse', desc: 'Heavy-duty access scaffolding for manufacturing plants, distribution warehouses, power stations and industrial process facilities.' },
  { icon: <IconRuler />, title: 'New Build Commercial', desc: 'Full-perimeter scaffolding for new commercial builds from ground up — coordinated with the principal contractor and structural programme.' },
  { icon: <IconShield />, title: 'Heritage & Listed Buildings', desc: 'Sensitive scaffold designs for listed buildings, conservation areas and heritage structures where standard solutions are not appropriate.' },
  { icon: <IconUsers />, title: 'Hotel & Hospitality', desc: 'Minimum-disruption access scaffolding for hotel renovations, façade cleaning and external cladding works — managed around live operations.' },
  { icon: <IconBuilding2 />, title: 'Infrastructure & Civil', desc: 'Bridge scaffold, viaduct access, retaining wall works and specialist civil engineering scaffold for infrastructure programmes.' },
]

const domesticTypes = [
  { icon: <IconHouse />, title: 'Full House Scaffolding', desc: 'Complete perimeter scaffold for full house re-renders, re-roofing projects and whole-building renovation works.' },
  { icon: <IconTool />, title: 'Chimney & Roof Repairs', desc: 'Chimney lift scaffolding, ridge access platforms and roof-level working decks for chimney rebuilds, lead flashing and tile replacement.' },
  { icon: <IconSun />, title: 'Solar Panel Installation', desc: 'Safe roof-level access platforms for solar PV and solar thermal installations — fully compliant with Work at Height Regulations 2005.' },
  { icon: <IconRuler />, title: 'Loft Conversions', desc: 'Gable-end and roof-level scaffold for loft conversions, dormers and hip-to-gable extensions — coordinated with your builder.' },
  { icon: <IconHouse />, title: 'Extensions & New Builds', desc: 'Self-build and developer scaffold for house extensions, garages, garden rooms and new residential dwellings.' },
  { icon: <IconShield />, title: 'Guttering & Rendering', desc: 'Safe access platforms for guttering replacement, fascia and soffit installation, external rendering and pebbledashing.' },
]

const processSteps = [
  { num: '01', title: 'Project Brief', desc: 'We review the site, access requirements, interfaces, scaffold scope and intended use.' },
  { num: '02', title: 'Safety Review', desc: 'Design information, RAMS, sequencing and responsibilities are reviewed before work progresses.' },
  { num: '03', title: 'Erection Oversight', desc: 'We provide independent safety input during erection and review the handover arrangements before use.' },
  { num: '04', title: 'Inspection Programme', desc: 'Independent inspections can be agreed for handover, statutory intervals and significant changes.' },
  { num: '05', title: 'Change & Close-out', desc: 'We support review of alterations and dismantling arrangements through project completion.' },
]

const faqs = [
  { q: 'How is scaffolding project support priced?', a: 'Fees depend on the project scope, location, scaffold complexity, inspection frequency and level of ongoing support. Send us the project details and we will agree a clear consultancy scope.' },
  { q: 'Can inspection support continue throughout the project?', a: 'Yes. Safeguard Group can agree an independent inspection programme covering handover, statutory intervals, significant alterations and events that may have affected stability.' },
  { q: 'How long does it take to erect scaffolding?', a: 'Most domestic scaffolds are erected within half a day to a full day. Larger commercial scaffolds vary depending on complexity and programme. We agree a programme of works with you in advance so your project is not delayed.' },
  { q: 'Do you need planning permission for scaffolding?', a: 'In most cases, no planning permission is required for temporary scaffolding. However, if the scaffold overhangs a public highway or pavement, a licence from the local authority (a Section 169 licence under the Highways Act) is required. We handle all highway licence applications on your behalf.' },
  { q: 'Are you able to erect scaffolding on a listed building?', a: 'Yes. We have significant experience working on listed buildings, conservation areas and heritage structures. We liaise with heritage officers and structural engineers where required to design sensitive scaffold solutions that avoid damage to historic fabric.' },
  { q: 'What project support can Safeguard Group provide?', a: 'Support can include pre-start review, design and RAMS checks, erection monitoring, independent handover inspection, statutory inspections, change control and dismantling oversight. The scaffold contractor remains responsible for design, erection, alteration and dismantling.' },
]

const gallery = [
  { img: 'photo-1778438387226-73b14195c492', alt: 'House scaffolding erected for new build residential construction in the UK', label: 'New Build Residential' },
  { img: 'photo-1556886283-a3944a060a52', alt: 'Commercial building scaffolding — worm view of tube-and-fitting scaffold', label: 'Commercial Building Access' },
  { img: 'photo-1772617661437-8103db985d70', alt: 'New homes under construction with scaffolding and sunlight', label: 'Housing Development' },
  { img: 'photo-1616320999187-3c004dad4f0b', alt: 'Scaffolding structure against blue sky on commercial project', label: 'Industrial Access' },
  { img: 'photo-1580063665421-4c9cbe9ec11b', alt: 'Domestic scaffold on terraced house during renovation', label: 'Domestic Renovation' },
  { img: 'photo-1626471671222-9d89fe4c2668', alt: 'Workers ascending scaffold ladder on commercial building', label: 'Façade Refurbishment' },
]

export default function ScaffoldingProjects({ onNavigate }: Props) {
  useScrollReveal()
  const [activeTab, setActiveTab] = useState<'commercial' | 'domestic'>('commercial')
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', type: '', address: '', duration: '', message: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Scaffolding project support enquiry from ${formData.name}`)
    const body = encodeURIComponent(`Email: ${formData.email}\nPhone: ${formData.phone}\nProject type: ${formData.type}\nSite: ${formData.address}\nDuration: ${formData.duration}\n\n${formData.message}`)
    window.location.href = `mailto:info@safeguardgroup.co.uk?subject=${subject}&body=${body}`
    setFormData({ name: '', phone: '', email: '', type: '', address: '', duration: '', message: '' })
  }

  return (
    <div className="min-h-screen bg-white">
      {/* ── Hero ─────────────────────────────────────── */}
      <section className="relative min-h-[70vh] flex items-end overflow-hidden pt-28 pb-20">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1556886283-a3944a060a52?w=1920&h=900&fit=crop&auto=format"
            alt="Commercial and domestic scaffolding projects by Safeguard Group UK"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(17,17,17,0.95) 0%, rgba(17,17,17,0.80) 60%, rgba(17,17,17,0.55) 100%)' }} />
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-orange-500" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 w-full">
          <Breadcrumb
            items={[
              { label: 'Home', onClick: () => onNavigate('home') },
              { label: 'Scaffolding Projects' },
            ]}
          />
          <div className="mt-6 max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-500/40 text-orange-400 text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-6">
              <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
              Commercial &amp; Domestic Scaffolding — Nationwide
            </div>
            <h1 className="text-white mb-5 text-shadow-lg" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(34px, 4.2vw, 56px)', fontWeight: 800, lineHeight: 1.15 }}>
              Scaffolding<br />
              <span className="text-orange-400">Projects</span>
            </h1>
            <p className="text-white/70 text-lg leading-relaxed mb-8 max-w-2xl">
              Independent safety and inspection support for commercial and domestic scaffolding projects, from pre-start planning through erection, alteration and dismantling.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#quote" className="btn-primary px-7 py-3.5 rounded-full text-sm flex items-center gap-2">
                Get a Free Quote <IconArrowRight className="w-4 h-4" />
              </a>
              <a href="mailto:info@safeguardgroup.co.uk" className="btn-outline px-7 py-3.5 rounded-full text-sm flex items-center gap-2">
                <IconMail /> Email project details
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Key stats bar ────────────────────────────── */}
      <section className="bg-orange-500">
        <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-2 md:grid-cols-4 divide-x divide-orange-400">
          {[
            { val: '500+', label: 'Projects Completed' },
            { val: 'Clear', label: 'Agreed Scope' },
            { val: 'Free', label: 'Site Surveys' },
            { val: 'NASC', label: 'Standard Erection' },
          ].map((s) => (
            <div key={s.label} className="text-center px-4 py-2">
              <div className="text-2xl font-black text-white" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{s.val}</div>
              <div className="text-orange-100 text-xs font-medium mt-0.5 uppercase tracking-wide">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Commercial / Domestic tabs ───────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* Tab switcher */}
          <div className="flex justify-center mb-14 reveal">
            <div className="inline-flex bg-neutral-100 rounded-2xl p-1.5 gap-1">
              <button
                onClick={() => setActiveTab('commercial')}
                className={`px-8 py-3 rounded-xl text-sm font-semibold transition-all duration-250 ${activeTab === 'commercial' ? 'bg-neutral-900 text-white shadow' : 'text-neutral-500 hover:text-neutral-800'}`}
              >
                Commercial Scaffolding
              </button>
              <button
                onClick={() => setActiveTab('domestic')}
                className={`px-8 py-3 rounded-xl text-sm font-semibold transition-all duration-250 ${activeTab === 'domestic' ? 'bg-neutral-900 text-white shadow' : 'text-neutral-500 hover:text-neutral-800'}`}
              >
                Domestic Scaffolding
              </button>
            </div>
          </div>

          {activeTab === 'commercial' && (
            <>
              <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
                <div className="reveal">
                  <p className="text-orange-500 text-xs font-semibold uppercase tracking-widest mb-4">Commercial Projects</p>
                  <h2 className="mb-6 orange-underline" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(26px, 2.8vw, 40px)', fontWeight: 700, color: '#111111', lineHeight: 1.25 }}>
                    Commercial Scaffolding<br />for Any Scale of Project
                  </h2>
                  <p className="text-neutral-500 text-base leading-relaxed mb-8">
                    From single-storey refurbishment to multi-storey development, Safeguard Group provides independent scaffold safety input coordinated with your construction programme. We do not design or erect the scaffold; we support oversight, inspection and compliance.
                  </p>
                  <div className="space-y-3">
                    {[
                      'TG20 and bespoke-designed scaffold solutions',
                      'Temporary Works engineering coordination',
                      'Independent professional oversight',
                      'RAMS and Method Statements provided',
                      'Highway licence applications managed',
                      'Traffic Management coordination',
                    ].map((item) => (
                      <div key={item} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center flex-shrink-0">
                          <IconCheck className="w-3 h-3" />
                        </div>
                        <span className="text-neutral-700 text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="reveal" style={{ transitionDelay: '0.15s' }}>
                  <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-neutral-200">
                    <img
                      src="https://images.unsplash.com/photo-1504964670878-71b73cec0ce1?w=800&h=600&fit=crop&auto=format"
                      alt="Commercial scaffolding on large concrete building facade"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {commercialTypes.map((type, i) => (
                  <div key={type.title} className="service-card reveal bg-white border border-neutral-200 rounded-2xl p-6 flex flex-col gap-4" style={{ transitionDelay: `${i * 0.06}s` }}>
                    <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center">{type.icon}</div>
                    <h3 className="font-bold text-neutral-900 text-base">{type.title}</h3>
                    <p className="text-neutral-500 text-sm leading-relaxed">{type.desc}</p>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab === 'domestic' && (
            <>
              <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
                <div className="reveal">
                  <p className="text-orange-500 text-xs font-semibold uppercase tracking-widest mb-4">Domestic Projects</p>
                  <h2 className="mb-6 orange-underline" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(26px, 2.8vw, 40px)', fontWeight: 700, color: '#111111', lineHeight: 1.25 }}>
                    Domestic Scaffolding for<br />Homeowners &amp; Builders
                  </h2>
                  <p className="text-neutral-500 text-base leading-relaxed mb-8">
                    Whether you are a homeowner planning a re-roof, a self-builder constructing an extension or a contractor delivering a refurbishment, Safeguard Group can provide independent inspection and safety support for the scaffold package.
                  </p>
                  <div className="space-y-3">
                    {[
                      'Free no-obligation site surveys',
                      'Fixed-price written quotations within 24 hours',
                      'Independent erection monitoring',
                      'Weekly inspections included — required by law',
                      'Fully insured — public liability covered',
                      'Fast erection — most homes within one day',
                    ].map((item) => (
                      <div key={item} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center flex-shrink-0">
                          <IconCheck className="w-3 h-3" />
                        </div>
                        <span className="text-neutral-700 text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="reveal" style={{ transitionDelay: '0.15s' }}>
                  <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-neutral-200">
                    <img
                      src="https://images.unsplash.com/photo-1778438387226-73b14195c492?w=800&h=600&fit=crop&auto=format"
                      alt="Domestic house scaffolding erected for new build home in the UK"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {domesticTypes.map((type, i) => (
                  <div key={type.title} className="service-card reveal bg-white border border-neutral-200 rounded-2xl p-6 flex flex-col gap-4" style={{ transitionDelay: `${i * 0.06}s` }}>
                    <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center">{type.icon}</div>
                    <h3 className="font-bold text-neutral-900 text-base">{type.title}</h3>
                    <p className="text-neutral-500 text-sm leading-relaxed">{type.desc}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* ── Project Gallery ──────────────────────────── */}
      <section className="py-24 bg-neutral-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14 reveal">
            <p className="text-orange-400 text-xs font-semibold uppercase tracking-widest mb-3">Project Gallery</p>
            <h2 className="text-white" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 800 }}>
              Recent Scaffolding Projects
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {gallery.map((item, i) => (
              <div key={item.label} className="reveal group relative rounded-2xl overflow-hidden bg-neutral-800 aspect-square cursor-pointer" style={{ transitionDelay: `${i * 0.07}s` }}>
                <img
                  src={`https://images.unsplash.com/${item.img}?w=500&h=500&fit=crop&auto=format`}
                  alt={item.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="text-white font-semibold text-sm">{item.label}</div>
                </div>
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-orange-500/0 group-hover:bg-orange-500 flex items-center justify-center text-white transition-all duration-300 opacity-0 group-hover:opacity-100">
                  <IconArrowRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Process ──────────────────────────────── */}
      <section className="py-24 bg-neutral-50 border-y border-neutral-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 reveal">
            <p className="text-orange-500 text-xs font-semibold uppercase tracking-widest mb-3">How It Works</p>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(26px, 2.8vw, 40px)', fontWeight: 700, color: '#111111' }}>
              From Survey to Strike — Hassle Free
            </h2>
          </div>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            {processSteps.map((step, i) => (
              <div key={step.num} className="reveal text-center" style={{ transitionDelay: `${i * 0.09}s` }}>
                <div className="w-20 h-20 rounded-full border-2 border-orange-500 bg-white flex items-center justify-center mx-auto mb-5 shadow-sm">
                  <span className="text-orange-500 font-black text-xl" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{step.num}</span>
                </div>
                <h3 className="font-bold text-neutral-900 text-base mb-2">{step.title}</h3>
                <p className="text-neutral-500 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why choose us ────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="reveal">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-neutral-200">
                <img
                  src="https://images.unsplash.com/photo-1772617661437-8103db985d70?w=800&h=600&fit=crop&auto=format"
                  alt="New homes under construction with NASC-standard scaffolding"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-6 left-6 bg-orange-500 text-white rounded-2xl p-5 shadow-xl">
                  <div className="text-3xl font-black" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>500+</div>
                  <div className="text-xs text-orange-100 mt-1 font-medium">Projects Completed</div>
                </div>
              </div>
            </div>
            <div className="reveal" style={{ transitionDelay: '0.15s' }}>
              <p className="text-orange-500 text-xs font-semibold uppercase tracking-widest mb-4">Why Safeguard Group</p>
              <h2 className="mb-6" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(26px, 2.8vw, 40px)', fontWeight: 700, color: '#111111', lineHeight: 1.25 }}>
                Safety &amp; Compliance<br />Built Into Every Contract
              </h2>
              <p className="text-neutral-500 text-base leading-relaxed mb-8">
                Unlike scaffolding-only contractors, Safeguard Group combines scaffold erection with independent inspection expertise. Every contract includes the weekly inspections required by law — with reports issued to your site manager and records retained on our secure platform.
              </p>
              <div className="grid grid-cols-2 gap-5">
                {[
                  { val: '21+', label: 'Years Experience' },
                  { val: 'NASC', label: 'Standard Erection' },
                  { val: 'Clear', label: 'Agreed Scope' },
                  { val: 'Free', label: 'Site Surveys' },
                ].map((item) => (
                  <div key={item.label} className="bg-neutral-50 border border-neutral-200 rounded-2xl p-5">
                    <div className="text-3xl font-black text-orange-500 mb-1" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{item.val}</div>
                    <div className="text-neutral-500 text-sm font-medium">{item.label}</div>
                  </div>
                ))}
              </div>
              <a href="#quote" className="btn-primary mt-8 px-7 py-3.5 rounded-full text-sm inline-flex items-center gap-2">
                Get a Free Quote <IconArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────── */}
      <section className="py-24 bg-neutral-50 border-y border-neutral-200">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-14 reveal">
            <p className="text-orange-500 text-xs font-semibold uppercase tracking-widest mb-3">FAQ</p>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(26px, 2.8vw, 40px)', fontWeight: 700, color: '#111111' }}>
              Scaffolding Project Questions
            </h2>
          </div>
          <div className="space-y-3 reveal">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-neutral-200 rounded-2xl overflow-hidden bg-white">
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

      {/* ── Quote Form ───────────────────────────────── */}
      <section id="quote" className="py-24 bg-neutral-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="reveal">
              <p className="text-orange-400 text-xs font-semibold uppercase tracking-widest mb-4">Get a Quote</p>
              <h2 className="text-white mb-6" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(26px, 2.8vw, 40px)', fontWeight: 700, lineHeight: 1.25 }}>
                Free Site Survey &amp;<br /><span className="text-orange-400">Fixed-Price Quote</span>
              </h2>
              <p className="text-white/60 text-base leading-relaxed mb-8">
                Tell us about the project, scaffold package, location and programme. We will discuss the independent inspection or consultancy scope that best fits the work.
              </p>
              <div className="space-y-4 mb-8">
                {[
                  { icon: <IconMail />, text: 'info@safeguardgroup.co.uk' },
                  { icon: <IconMail />, text: 'projects@safeguardgroup.co.uk' },
                  { icon: <IconMapPin />, text: 'Covering England, Scotland & Wales' },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-3 text-white/60 text-sm">
                    <div className="text-orange-400">{item.icon}</div>
                    {item.text}
                  </div>
                ))}
              </div>
              <div className="p-5 bg-white/5 border border-white/10 rounded-2xl">
                <div className="text-sm font-semibold text-white mb-2">What&#39;s included in the quote?</div>
                {['Project safety review', 'Erection monitoring', 'Independent handover inspection', 'Statutory inspection support', 'Alteration and change review', 'Dismantling oversight'].map((item) => (
                  <div key={item} className="flex items-center gap-2.5 mt-2">
                    <div className="text-orange-400"><IconCheck className="w-4 h-4" /></div>
                    <span className="text-white/60 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <form onSubmit={handleSubmit} className="reveal bg-white rounded-3xl p-8 space-y-5" style={{ transitionDelay: '0.15s' }}>
              <div className="text-lg font-bold text-neutral-900 mb-1">Request a Free Quote</div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-1.5">Name *</label>
                  <input required type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="John Smith" className="w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 transition-all placeholder-neutral-400" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-1.5">Phone *</label>
                  <input required type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="07700 900000" className="w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 transition-all placeholder-neutral-400" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-1.5">Email *</label>
                <input required type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="john@example.co.uk" className="w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 transition-all placeholder-neutral-400" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-1.5">Project Type</label>
                <select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} className="w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 transition-all bg-white">
                  <option value="">Select project type...</option>
                  <optgroup label="Commercial">
                    <option>Office &amp; Retail Refurbishment</option>
                    <option>Industrial &amp; Warehouse</option>
                    <option>New Build Commercial</option>
                    <option>Heritage &amp; Listed Building</option>
                    <option>Hotel &amp; Hospitality</option>
                    <option>Infrastructure &amp; Civil</option>
                  </optgroup>
                  <optgroup label="Domestic">
                    <option>Full House Scaffold</option>
                    <option>Chimney &amp; Roof Repairs</option>
                    <option>Solar Panel Installation</option>
                    <option>Loft Conversion</option>
                    <option>Extension / New Build</option>
                    <option>Guttering &amp; Rendering</option>
                  </optgroup>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-1.5">Site Address</label>
                <input type="text" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} placeholder="Full site address or postcode" className="w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 transition-all placeholder-neutral-400" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-1.5">Estimated Hire Duration</label>
                <select value={formData.duration} onChange={(e) => setFormData({ ...formData, duration: e.target.value })} className="w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 transition-all bg-white">
                  <option value="">Select duration...</option>
                  <option>1–2 weeks</option>
                  <option>2–4 weeks</option>
                  <option>1–3 months</option>
                  <option>3–6 months</option>
                  <option>6+ months</option>
                  <option>Not sure yet</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-1.5">Project Details</label>
                <textarea rows={3} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder="Tell us about the work — height, property type, any access constraints..." className="w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 transition-all resize-none placeholder-neutral-400" />
              </div>
              <button type="submit" className="btn-primary w-full py-4 rounded-xl text-base flex items-center justify-center gap-2">
                Request Free Quote <IconArrowRight />
              </button>
              <p className="text-xs text-neutral-400 text-center">This form prepares an email in your device. Your details are not stored by this website.</p>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
