import { useEffect, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  ArrowRight,
  AtSign,
  CalendarDays,
  Coffee,
  Leaf,
  MapPin,
  Menu,
  Phone,
  Star,
  Users,
  Utensils,
  X,
} from "lucide-react";

const navItems = [
  { label: "Menu", href: "#menu" },
  { label: "Story", href: "#story" },
  { label: "Reserve", href: "#reserve" },
  { label: "Visit", href: "#visit" },
];

const menuItems = [
  {
    name: "Velvet Flat White",
    detail: "House espresso, steamed milk, hazelnut crema",
    price: "$6",
    tag: "Signature",
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Cardamom Cloud Latte",
    detail: "Single-origin roast, cardamom, oat foam",
    price: "$7",
    tag: "Seasonal",
    image:
      "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Citrus Olive Cake",
    detail: "Orange zest, pistachio dust, whipped mascarpone",
    price: "$9",
    tag: "Bakery",
    image:
      "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Garden Toast",
    detail: "Sourdough, basil ricotta, market vegetables",
    price: "$14",
    tag: "All day",
    image:
      "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=900&q=85",
  },
];

const rituals = [
  {
    icon: Coffee,
    title: "Small-batch roasts",
    text: "Rotating beans from ethical micro-lots, dialed in every morning.",
  },
  {
    icon: Leaf,
    title: "Botanical plates",
    text: "Bright produce, layered herbs, and bakery work that stays light.",
  },
  {
    icon: Utensils,
    title: "After-dark desserts",
    text: "A softer evening menu with affogato flights and candlelit tables.",
  },
];

const gallery = [
  {
    src: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1400&q=85",
    alt: "Cafe bar with espresso machines and warm lighting",
  },
  {
    src: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1400&q=85",
    alt: "Freshly brewed coffee being poured",
  },
  {
    src: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1400&q=85",
    alt: "Modern cafe seating with plants and natural light",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

function GlassFilter() {
  return (
    <svg className="glass-filter" aria-hidden="true">
      <filter
        id="liquid-glass-distortion"
        x="0%"
        y="0%"
        width="100%"
        height="100%"
        filterUnits="objectBoundingBox"
      >
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.006 0.012"
          numOctaves="1"
          seed="19"
          result="turbulence"
        />
        <feGaussianBlur in="turbulence" stdDeviation="3" result="softMap" />
        <feDisplacementMap
          in="SourceGraphic"
          in2="softMap"
          scale="28"
          xChannelSelector="R"
          yChannelSelector="G"
        />
      </filter>
    </svg>
  );
}

function GlassSurface({
  children,
  className = "",
  as: Element = "div",
  ...props
}) {
  return (
    <Element className={`glass-surface ${className}`} {...props}>
      <span className="glass-shine" aria-hidden="true" />
      <span className="glass-content">{children}</span>
    </Element>
  );
}

function SectionHeading({ eyebrow, title, text, align = "left" }) {
  return (
    <motion.div
      className={`section-heading section-heading-${align}`}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {text ? <p>{text}</p> : null}
    </motion.div>
  );
}

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.header
      className="site-header"
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <a className="brand" href="#top" aria-label="Velvet Bean Cafe home">
        <span className="brand-mark">
          <Coffee size={18} strokeWidth={2} />
        </span>
        <span>Velvet Bean</span>
      </a>

      <nav className="desktop-nav" aria-label="Main navigation">
        {navItems.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>

      <a className="header-action" href="#reserve">
        <CalendarDays size={17} />
        Reserve
      </a>

      <button
        className="menu-toggle"
        type="button"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
      >
        {isOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {isOpen ? (
        <motion.nav
          className="mobile-nav"
          aria-label="Mobile navigation"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </motion.nav>
      ) : null}
    </motion.header>
  );
}

function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const imageY = useTransform(scrollYProgress, [0, 0.35], [0, 72]);
  const panelY = useTransform(scrollYProgress, [0, 0.25], [0, -34]);

  return (
    <section className="hero" id="top">
      <motion.div
        className="hero-media"
        style={{
          y: shouldReduceMotion ? 0 : imageY,
          backgroundImage:
            "url(https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=2400&q=88)",
        }}
      />
      <div className="hero-scrim" />
      <div className="hero-texture" />

      <motion.div
        className="hero-content"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        <motion.p className="eyebrow hero-eyebrow" variants={fadeUp}>
          Roastery, bakery, and night dessert bar
        </motion.p>
        <motion.h1 variants={fadeUp}>Velvet Bean Cafe</motion.h1>
        <motion.p className="hero-copy" variants={fadeUp}>
          A warm, modern cafe for slow mornings, bright lunch plates, and
          candlelit affogato after the city settles.
        </motion.p>
        <motion.div className="hero-actions" variants={fadeUp}>
          <a className="btn btn-primary" href="#reserve">
            <CalendarDays size={18} />
            Reserve a table
          </a>
          <a className="btn btn-secondary" href="#menu">
            View menu
            <ArrowRight size={18} />
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        className="hero-panel"
        style={{ y: shouldReduceMotion ? 0 : panelY }}
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <GlassSurface>
          <div className="hero-panel-grid">
            <div>
              <span className="meta-label">Open today</span>
              <strong>7:00 AM - 10:30 PM</strong>
            </div>
            <div>
              <span className="meta-label">Roast</span>
              <strong>Honduras honey process</strong>
            </div>
            <div>
              <span className="meta-label">Location</span>
              <strong>Arts District, downtown</strong>
            </div>
          </div>
        </GlassSurface>
      </motion.div>
    </section>
  );
}

function MenuSection() {
  return (
    <section className="section menu-section" id="menu">
      <div className="section-inner">
        <SectionHeading
          eyebrow="The table"
          title="Seasonal cafe signatures"
          text="Coffee, pastry, and plates built around texture, aroma, and a little evening drama."
        />

        <motion.div
          className="menu-grid"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {menuItems.map((item) => (
            <motion.article className="menu-card" key={item.name} variants={fadeUp}>
              <img src={item.image} alt="" loading="lazy" />
              <div className="menu-card-body">
                <div className="menu-card-topline">
                  <span>{item.tag}</span>
                  <strong>{item.price}</strong>
                </div>
                <h3>{item.name}</h3>
                <p>{item.detail}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function StorySection() {
  return (
    <section className="section story-section" id="story">
      <div className="section-inner story-layout">
        <motion.div
          className="story-image"
          initial={{ opacity: 0, x: -28 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, amount: 0.25 }}
        >
          <img
            src="https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=1500&q=85"
            alt="Barista preparing coffee behind a modern cafe counter"
            loading="lazy"
          />
        </motion.div>

        <motion.div
          className="story-copy"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
        >
          <motion.p className="eyebrow" variants={fadeUp}>
            Our ritual
          </motion.p>
          <motion.h2 variants={fadeUp}>Coffee with a restaurant soul</motion.h2>
          <motion.p variants={fadeUp}>
            Velvet Bean pairs precise espresso with a kitchen that treats cafe
            service like a dinner reservation: thoughtful pacing, clean flavors,
            and hospitality that feels easy to return to.
          </motion.p>

          <motion.div className="ritual-list" variants={stagger}>
            {rituals.map(({ icon: Icon, title, text }) => (
              <motion.div className="ritual-item" key={title} variants={fadeUp}>
                <span>
                  <Icon size={18} />
                </span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function ReservationSection() {
  const [sent, setSent] = useState(false);

  return (
    <section className="section reserve-section" id="reserve">
      <div className="section-inner reserve-layout">
        <SectionHeading
          eyebrow="Reservations"
          title="Save a velvet-lit table"
          text="Book breakfast meetings, late work sessions, or dessert dates in a few quick taps."
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, amount: 0.25 }}
        >
          <GlassSurface className="reservation-card">
            <form
              className="reservation-form"
              onSubmit={(event) => {
                event.preventDefault();
                setSent(true);
              }}
            >
              <label>
                <span>Date</span>
                <input type="date" required />
              </label>
              <label>
                <span>Time</span>
                <select defaultValue="19:00" required>
                  <option value="08:30">8:30 AM</option>
                  <option value="12:30">12:30 PM</option>
                  <option value="17:30">5:30 PM</option>
                  <option value="19:00">7:00 PM</option>
                  <option value="21:00">9:00 PM</option>
                </select>
              </label>
              <label>
                <span>Guests</span>
                <select defaultValue="2" required>
                  <option value="1">1 guest</option>
                  <option value="2">2 guests</option>
                  <option value="3">3 guests</option>
                  <option value="4">4 guests</option>
                  <option value="6">6 guests</option>
                </select>
              </label>
              <button className="btn btn-primary form-submit" type="submit">
                <Users size={18} />
                Request table
              </button>
              {sent ? (
                <p className="form-note" role="status">
                  Request received. The cafe team will confirm shortly.
                </p>
              ) : null}
            </form>
          </GlassSurface>
        </motion.div>
      </div>
    </section>
  );
}

function GallerySection() {
  return (
    <section className="section gallery-section">
      <div className="section-inner">
        <SectionHeading
          eyebrow="Atmosphere"
          title="Morning clarity, evening glow"
          text="A street-level room with open bar seating, soft acoustics, and warm glass catching the light."
          align="center"
        />

        <motion.div
          className="gallery-grid"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {gallery.map((image, index) => (
            <motion.figure
              className={index === 0 ? "gallery-item gallery-featured" : "gallery-item"}
              key={image.src}
              variants={fadeUp}
            >
              <img src={image.src} alt={image.alt} loading="lazy" />
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function VisitSection() {
  return (
    <section className="section visit-section" id="visit">
      <div className="section-inner visit-layout">
        <motion.div
          className="visit-copy"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <p className="eyebrow">Visit</p>
          <h2>Find us where downtown slows down</h2>
          <p>
            214 Meridian Lane, Arts District. Walk-ins are welcome at the bar;
            reservations keep the window tables waiting.
          </p>
        </motion.div>

        <motion.div
          className="visit-cards"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
        >
          <motion.a className="info-card" href="tel:+15550143110" variants={fadeUp}>
            <Phone size={20} />
            <span>Call</span>
            <strong>+1 555 014 3110</strong>
          </motion.a>
          <motion.a
            className="info-card"
            href="https://maps.google.com"
            target="_blank"
            rel="noreferrer"
            variants={fadeUp}
          >
            <MapPin size={20} />
            <span>Address</span>
            <strong>214 Meridian Lane</strong>
          </motion.a>
          <motion.a
            className="info-card"
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            variants={fadeUp}
          >
            <AtSign size={20} />
            <span>Social</span>
            <strong>@velvetbean</strong>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

function App() {
  useEffect(() => {
    if (!window.location.hash) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      document.querySelector(window.location.hash)?.scrollIntoView();
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <>
      <GlassFilter />
      <Header />
      <main>
        <Hero />
        <section className="ticker" aria-label="Cafe highlights">
          <div>
            <span>
              <Star size={16} />
              Single-origin espresso
            </span>
            <span>
              <Star size={16} />
              Fresh pastry at 8 AM
            </span>
            <span>
              <Star size={16} />
              Dessert bar after 6 PM
            </span>
          </div>
        </section>
        <MenuSection />
        <StorySection />
        <ReservationSection />
        <GallerySection />
        <VisitSection />
      </main>
      <footer className="site-footer">
        <span>Velvet Bean Cafe</span>
        <span>Open daily, 7 AM - 10:30 PM</span>
      </footer>
    </>
  );
}

export default App;
