import { useState, useMemo } from 'react'
import './App.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

import leftBgImg  from './assets/leftbg.png'
import mainImg    from './assets/mainimg.png'
import routineImg from './assets/Routine Lineup.png'
import lotionImg  from './assets/lotionmodel.png'

/* ─── DATA ───────────────────────────────────────────────────────── */

const PRODUCTS = [
  // Shower Reset
  { id: 1,  cat: 'shower-reset', name: 'Soft Sweat Body Gel',      desc: 'A lightweight shower gel made for post-workout cleansing.',     price: 19.20, disc: 4,    badge: 'SALE', tags: ['AHA BHA PHA'] },
  { id: 2,  cat: 'shower-reset', name: 'Blue Hour Body Wash',       desc: 'Refreshing daily body wash to rinse off the day.',              price: 22.00, disc: null, badge: null,   tags: ['Cleansing Milk'] },
  { id: 3,  cat: 'shower-reset', name: 'Fresh Rinse Cleanser',      desc: 'A gentle cleanser for everyday shower routines.',               price: 22.00, disc: null, badge: null,   tags: [] },
  { id: 4,  cat: 'shower-reset', name: 'Cool Down Shower Oil',      desc: 'Cleanses without stripping, ideal after frequent showers.',    price: 26.00, disc: 10,   badge: 'SALE', tags: ['Fine Nordic Scents'] },
  { id: 5,  cat: 'shower-reset', name: 'Post-Sweat Body Wash',      desc: 'Made for post-activity cleansing, fresh and light.',           price: 20.00, disc: null, badge: null,   tags: [] },
  { id: 6,  cat: 'shower-reset', name: 'Reset Shower Milk',         desc: 'Creamy cleanser that leaves skin soft and nourished.',         price: 24.00, disc: 6,    badge: 'SALE', tags: ['Cleansing Milk'] },
  // After Body
  { id: 7,  cat: 'after-body',   name: 'After Skin Body Lotion',    desc: 'Lightweight lotion for after-shower care.',                    price: 24.00, disc: 4,    badge: 'SALE', tags: ['AHA BHA PHA'] },
  { id: 8,  cat: 'after-body',   name: 'Body Reset Lotion',         desc: 'Daily lotion for calm, hydrated skin after activity.',         price: 30.00, disc: null, badge: null,   tags: [] },
  { id: 9,  cat: 'after-body',   name: 'Wet Glow Body Oil',         desc: 'Lightweight glow for damp, just-showered skin.',               price: 36.00, disc: null, badge: null,   tags: ['Fine Nordic Scents'] },
  { id: 10, cat: 'after-body',   name: 'Fresh Face Oil',            desc: 'A lightweight face oil for a clean, fresh glow.',              price: 34.00, disc: null, badge: null,   tags: [] },
  { id: 11, cat: 'after-body',   name: 'Soft Skin Body Cream',      desc: 'Rich but lightweight cream for dry skin after shower.',        price: 28.00, disc: 8,    badge: 'SALE', tags: ['AHA BHA PHA'] },
  { id: 12, cat: 'after-body',   name: 'Hydra Body Serum',          desc: 'Fast-absorbing serum for post-shower skin recovery.',          price: 38.00, disc: null, badge: null,   tags: [] },
  // Active Care
  { id: 13, cat: 'active-care',  name: 'Active Skin Shield',        desc: 'Fresh comfort after hot, active moments.',                     price: 20.00, disc: null, badge: null,   tags: ['PA Mask 30%'] },
  { id: 14, cat: 'active-care',  name: 'Heat Reset Gel',            desc: 'Cool skin, clean finish after activity.',                      price: 24.00, disc: 8,    badge: 'SALE', tags: ['AHA BHA PHA'] },
  { id: 15, cat: 'active-care',  name: 'Fresh Body Mist',           desc: 'A quick reset for active skin on the go.',                     price: 24.00, disc: null, badge: null,   tags: [] },
  { id: 16, cat: 'active-care',  name: 'Foot Reset Spray',          desc: 'Fresh foot spray for post-sneaker comfort.',                   price: 16.00, disc: null, badge: null,   tags: ['Cleansing Milk'] },
  { id: 17, cat: 'active-care',  name: 'Anti-Friction Balm',        desc: 'Protects against chafing during and after activity.',          price: 18.00, disc: 5,    badge: 'SALE', tags: [] },
  { id: 18, cat: 'active-care',  name: 'Cooling After Spray',       desc: 'Instant cooling spray for overheated, active skin.',           price: 22.00, disc: null, badge: null,   tags: [] },
  // Sweat Care
  { id: 19, cat: 'sweat-care',   name: 'Sweat Reset Wash',          desc: 'Deep cleansing wash for after-sweat routines.',                price: 20.00, disc: null, badge: null,   tags: ['AHA BHA PHA'] },
  { id: 20, cat: 'sweat-care',   name: 'Active Deodorant Mist',     desc: 'Refreshing deodorant mist for active bodies.',                 price: 18.00, disc: 5,    badge: 'SALE', tags: [] },
  // Scent
  { id: 21, cat: 'scent',        name: 'Clean Skin Body Mist',      desc: 'Light mist for a clean, soft scent after shower.',             price: 20.00, disc: 4,    badge: 'SALE', tags: ['Fine Nordic Scents'] },
  { id: 22, cat: 'scent',        name: 'Blue Locker Mist',          desc: 'Fresh hair and body mist for gym or changing room.',           price: 24.00, disc: null, badge: null,   tags: ['Fine Nordic Scents'] },
]

const TABS = [
  { id: 'shower-reset', label: 'SHOWER RESET' },
  { id: 'after-body',   label: 'AFTER BODY' },
  { id: 'sweat-care',   label: 'SWEAT CARE' },
  { id: 'scent',        label: 'SCENT' },
  { id: 'active-care',  label: 'ACTIVE CARE' },
]

const SECTIONS = [
  { id: 'shower-reset', title: 'Shower Reset', desc: 'Rinse off the day and start fresh.' },
  { id: 'after-body',   title: 'After Body',   desc: 'Rinse off the day and start fresh.' },
  { id: 'active-care',  title: 'Active Care',  desc: 'Rinse off the day and start fresh.' },
]

const FILTER_TAGS = ['AHA BHA PHA', 'Fine Nordic Scents', 'Cleansing Milk', 'PA Mask 30%']

const HERO_SLIDES = [
  {
    img:   mainImg,
    tag:   null,
    title: null,
    sub:   null,
  },
  {
    img:   routineImg,
    tag:   'ROUTINE LINEUP',
    title: 'YOUR\nAFTER BODY.',
    sub:   'Everything your skin needs post-shower.',
  },
  {
    img:   lotionImg,
    tag:   'ACTIVE CARE',
    title: 'PACK\nLIGHT.',
    sub:   'Stay fresh wherever you go.',
  },
]

const BENEFITS = [
  { id: 1, tag: 'EVENT',        title: 'Ongoing Events',       bg: 'mint' },
  { id: 2, tag: 'GET UP TO $10', title: 'NEW MEMBER BENEFITS', bg: 'white' },
  { id: 3, tag: 'UP TO 60%',    title: 'LEVEL BENEFITS',       bg: 'mint' },
  { id: 4, tag: 'BUY 2 GET 1',  title: 'BUNDLE DEALS',         bg: 'white' },
]

/* ─── COMPONENTS ─────────────────────────────────────────────────── */

/* Left Side (desktop only) */
function LeftSide() {
  return (
    <aside className="left-side" aria-hidden="true">
      <h2 className="ls-title">CARE THAT<br />FEELS CLEAN</h2>
      <p className="ls-body">
        Thoughtfully made with skin-loving ingredients and a lighter touch on the planet.
      </p>
      <div className="ls-img">
    <img src={leftBgImg} alt="" />
  </div>
    </aside>
  )
}

/* Right Side – Search & Filter (desktop only) */
function RightSide({ query, setQuery, filter, setFilter }) {
  return (
    <aside className="right-side">
      <div className="rs-search">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
          <circle cx="11" cy="11" r="7"/><line x1="16.5" y1="16.5" x2="22" y2="22"/>
        </svg>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search for products"
          aria-label="Search products"
        />
        {query && (
          <button className="rs-clear" onClick={() => setQuery('')} aria-label="Clear search">✕</button>
        )}
      </div>
      <div className="rs-tags">
        {FILTER_TAGS.map(tag => (
          <button
            key={tag}
            className={`rs-tag${filter === tag ? ' rs-tag--active' : ''}`}
            onClick={() => setFilter(filter === tag ? null : tag)}
            aria-pressed={filter === tag}
          >
            #{tag}
          </button>
        ))}
      </div>
    </aside>
  )
}

/* Promo Bar */
function PromoBar() {
  return (
    <div className="promo-bar" role="banner">
      GET $5 OFF YOUR FIRST ORDER
    </div>
  )
}

/* Hero */
function HeroSection() {
  return (
    <section className="hero" aria-label="Brand hero">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 4500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop
        className="hero-swiper"
      >
        {HERO_SLIDES.map((s, i) => (
          <SwiperSlide key={i}>
            <div className={`hero-slide${s.tag ? ' hero-slide--overlay' : ''}`}>
              <img src={s.img} alt="" className="hero-slide-img" />
              {s.tag && (
                <div className="hero-slide-inner">
                  <span className="hero-tag">{s.tag}</span>
                  <h1 className="hero-title">{s.title}</h1>
                  <p className="hero-sub">{s.sub}</p>
                </div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}

/* Category Tabs */
function CategoryTabs({ active, onTab }) {
  function handleClick(id) {
    onTab(id)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  return (
    <nav className="cat-tabs" aria-label="Product categories">
      {TABS.map(t => (
        <button
          key={t.id}
          className={`cat-tab${active === t.id ? ' cat-tab--active' : ''}`}
          onClick={() => handleClick(t.id)}
          aria-pressed={active === t.id}
        >
          {t.label}
        </button>
      ))}
    </nav>
  )
}

/* Our Picks – single featured card */
function OurPicks() {
  const featured = PRODUCTS[0]
  return (
    <section className="picks">
      <h2 className="section-title center">Our Picks</h2>
      <article className="featured-card">
        <div className="featured-img">
          {featured.badge && <span className="badge">{featured.badge}</span>}
          <div className="featured-img-ph" />
        </div>
        <div className="featured-info">
          <p className="featured-name">{featured.name}</p>
          <p className="featured-desc">{featured.desc}</p>
          <div className="price-row">
            {featured.disc && <span className="disc">{featured.disc}%</span>}
            <span className="price">${featured.price.toFixed(2)}</span>
          </div>
        </div>
      </article>
    </section>
  )
}

/* Banner 1 – Sea Salt */
function Banner1() {
  return (
    <div className="banner-1" aria-label="Sea salt skin reset">
      <div className="banner-1-text">
        <span className="banner-1-hl">SEA SALT</span>
        <span className="banner-1-hl">SKIN RESET</span>
        <span className="banner-1-sub">Soft, cool and fresh</span>
      </div>
    </div>
  )
}

/* Product Card */
function ProductCard({ product }) {
  return (
    <article className="pcard">
      <div className="pcard-img-wrap">
        {product.badge && <span className="badge badge--sm">{product.badge}</span>}
        <div className="pcard-img" />
      </div>
      <div className="pcard-info">
        <p className="pcard-name">{product.name}</p>
        <p className="pcard-desc">{product.desc}</p>
        <div className="pcard-bottom">
          <div className="price-row">
            {product.disc && <span className="disc">{product.disc}%</span>}
            <span className="price">${product.price.toFixed(2)}</span>
          </div>
          {product.tags.length > 0 && (
            <div className="pcard-tags">
              {product.tags.map(t => <span key={t} className="pcard-tag">{t}</span>)}
            </div>
          )}
          <button className="add-btn" aria-label={`Add ${product.name} to cart`}>ADD</button>
        </div>
      </div>
    </article>
  )
}

/* Product Section */
function ProductSection({ section, products, query, filter }) {
  const [expanded, setExpanded] = useState(false)
  const PAGE = 4

  const filtered = useMemo(() => products.filter(p => {
    const q = !query || p.name.toLowerCase().includes(query.toLowerCase())
    const f = !filter || p.tags.includes(filter)
    return q && f
  }), [products, query, filter])

  const shown = expanded ? filtered : filtered.slice(0, PAGE)
  const pages = Math.ceil(filtered.length / PAGE)
  const hasMore = filtered.length > PAGE

  return (
    <section className="prod-section" id={section.id}>
      <div className="prod-hd">
        <div>
          <h2 className="prod-title">{section.title}</h2>
          <p className="prod-desc-text">{section.desc}</p>
        </div>
        <a href={`#${section.id}`} className="more-link" aria-label={`More ${section.title}`}>MORE &gt;</a>
      </div>

      {filtered.length === 0
        ? <p className="empty-msg">No products found.</p>
        : <div className="prod-grid">{shown.map(p => <ProductCard key={p.id} product={p} />)}</div>
      }

      {hasMore && (
        <button
          className="expand-btn"
          onClick={() => setExpanded(v => !v)}
          aria-expanded={expanded}
        >
          MORE ({expanded ? pages : 1}/{pages}) {expanded ? '˄' : '˅'}
        </button>
      )}
    </section>
  )
}

/* Banner 2 – Clean On Skin */
function Banner2() {
  return (
    <div className="banner-2" aria-label="Brand values">
      <p className="banner-2-title">CLEAN ON SKIN,<br />LIGHT ON EARTH.</p>
      <p className="banner-2-sub">
        Formulated with natural ingredients<br />for your lightweight shower routine.
      </p>
    </div>
  )
}

/* Benefit Cards */
function BenefitSection() {
  return (
    <section className="benefit">
      <h2 className="section-title">BENEFIT</h2>
      <p className="section-sub">Rinse off the day and start fresh.</p>
      <div className="benefit-scroll">
        {BENEFITS.map(b => (
          <div key={b.id} className={`benefit-card benefit-card--${b.bg}`}>
            <span className="benefit-tag">{b.tag}</span>
            <p className="benefit-title">{b.title}</p>
            <a href="#" className="benefit-go" aria-label={b.title}>GO &gt;</a>
          </div>
        ))}
      </div>
    </section>
  )
}

/* Footer */
function FooterSection() {
  return (
    <footer className="footer">
      <div className="footer-customer">
        <span className="footer-label">Customer</span>
        <a href="tel:+82010-1234-5678" className="footer-phone">+82 010-1234-5678</a>
        <span className="footer-hours">Mon - Fri 09:00 AM - 06:00 PM (GMT+09)</span>
      </div>
      <div className="footer-bottom">
        <div>
          <span className="footer-brand">after.9</span>
          <span className="footer-copy">Copyright 2024 © after9 Korea. All Rights Reserved.</span>
        </div>
        <a href="#" className="footer-info">Information</a>
      </div>
    </footer>
  )
}

/* ─── APP ────────────────────────────────────────────────────────── */
export default function App() {
  const [activeTab, setActiveTab] = useState('shower-reset')
  const [query, setQuery]         = useState('')
  const [filter, setFilter]       = useState(null)

  return (
    <div className="page">
      <div className="desktop-canvas">

        <LeftSide />

        <main className="center-page">
          <PromoBar />
          <HeroSection />
          <CategoryTabs active={activeTab} onTab={setActiveTab} />
          <OurPicks />
          <Banner1 />
          {SECTIONS.map(s => (
            <ProductSection
              key={s.id}
              section={s}
              products={PRODUCTS.filter(p => p.cat === s.id)}
              query={query}
              filter={filter}
            />
          ))}
          <Banner2 />
          <BenefitSection />
          <FooterSection />
        </main>

        <RightSide query={query} setQuery={setQuery} filter={filter} setFilter={setFilter} />

      </div>
    </div>
  )
}
