import { FormEvent, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import {
  ArrowUpRight,
  ChevronRight,
  Clock3,
  Cross,
  Facebook,
  Heart,
  Instagram,
  Mail,
  MapPin,
  Menu,
  X,
} from 'lucide-react';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

// Only create the client when the env vars are actually set (e.g. in Vercel).
// createClient() throws at import time when the URL is missing, which used to
// crash the whole app before React could mount and left a blank page.
const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

const services = [
  { name: 'Morning Prayers & Matins', day: 'Sunday', time: '5:00 AM' },
  { name: 'Divine Liturgy (Kidase)', day: 'Sunday', time: '6:30 AM' },
  { name: "Children's & Youth Sunday School", day: 'Sunday', time: '9:00 AM' },
  { name: 'Bible Study & Spiritual Teaching', day: 'By announcement', time: 'Please call' },
];

const ministries = [
  { title: 'Sunday School & Christian Education', text: 'Helping children, youth, and adults grow in Scripture, Orthodox teaching, and the sacramental life of the Church.' },
  { title: 'Youth & Young Adults', text: 'Guiding the next generation through fellowship, mentoring, spiritual conversation, and service.' },
  { title: 'Choir & Sacred Hymns', text: 'Preserving and sharing the Church’s sacred hymns through learning, practice, and participation in worship.' },
  { title: 'Outreach & Charitable Service', text: 'Putting faith into action by supporting neighbors facing hardship, visiting the sick, and organizing charitable work.' },
  { title: 'Hospitality & Volunteers', text: 'Welcoming visitors and supporting church gatherings through hospitality, event preparation, and care for our facilities.' },
];

const beliefs = [
  ['Faith in the Holy Trinity', 'We believe in one God: Father, Son, and Holy Spirit.'],
  ['Jesus Christ, Our Savior', 'We confess our Lord Jesus Christ as fully divine and fully human, united in one incarnate nature of the Word.'],
  ['Holy Scripture & Apostolic Tradition', 'Our faith and worship are rooted in Holy Scripture and the teachings handed down through the Apostles and the Church Fathers.'],
  ['Sacramental Life & Worship', 'We grow in faith through the Holy Sacraments, the Divine Liturgy, prayer, fasting, and repentance.'],
  ['Honor for the Virgin Mary & the Saints', 'We honor the Blessed Virgin Mary, Mother of God, and the saints, seeking their intercession.'],
  ['Love & Service', 'We seek to reflect Christ’s love through generosity, hospitality, care for those in need, and service to our neighbors.'],
  ['Family & Youth', 'We support families and teach our children and youth to understand, cherish, and practice their Orthodox faith.'],
  ['Unity & Spiritual Heritage', 'We nurture unity within our church and preserve our sacred languages, hymns, and Ethiopian Orthodox Tewahedo heritage.'],
];

const seasonalPrograms = [
  ['Great Lent, Holy Week, & Fasika', 'Fasting, prayer, spiritual teaching, and worship celebrating Christ’s Passion and Resurrection.'],
  ['Advent Fast & Genna', 'Preparation for and celebration of the Nativity of our Lord.'],
  ['Timket', 'Celebration of the Baptism of our Lord.'],
  ['Filseta', 'Fasting and prayer honoring the Blessed Virgin Mary.'],
  ['Mahlete Tsige', 'Early-morning hymns and prayers during the season of Tsige.'],
  ['Meskel', 'Celebration of the Finding of the True Cross.'],
];

const gallery = [
  { label: 'A community gathered in worship', src: '/images/Picture1_Tsion_Mariam.jpg' },
  { label: 'The beauty of sacred tradition', src: '/images/Picture2_Tsion_Mariam.jpg' },
  { label: 'Faith across generations', src: '/images/Picture3_Tsion_Mariam.jpg' },
  { label: 'Sacred worship and prayer', src: '/images/Picture4_Tsion_Mariam.jpg' },
  { label: 'Children growing in faith', src: '/images/Picture5_Tsion_Mariam.jpg' },
  { label: 'The joy of fellowship', src: '/images/Picture6_Tsion_Mariam.jpg' },
  { label: 'Tradition carried forward', src: '/images/Picture7_Tsion_Mariam.jpg' },
  { label: 'Serving with devotion', src: '/images/Picture8_Tsion_Mariam.jpg' },
  { label: 'A welcoming church family', src: '/images/Picture9_Tsion_Mariam.jpg' },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!supabase) {
      // Contact form isn't wired up yet (no Supabase env vars) — don't crash,
      // just tell the visitor to email the church office directly.
      setFormStatus('error');
      return;
    }
    setFormStatus('sending');
    const form = new FormData(event.currentTarget);
    const { error } = await supabase.from('contact_messages').insert({
      name: form.get('name'),
      email: form.get('email'),
      phone: form.get('phone') || null,
      message: form.get('message'),
    });
    setFormStatus(error ? 'error' : 'success');
    if (!error) event.currentTarget.reset();
  };

  return (
    <div className="site-shell">
      <div className="announcement">
        <span>Sunday Divine Liturgy begins at 5:00 AM</span>
        <button onClick={() => scrollTo('visit')}>Plan your visit <ArrowUpRight size={14} /></button>
      </div>

      <header className="site-header">
        <a className="brand" href="#top" onClick={() => scrollTo('top')}>
          <span className="brand-mark"><img className="brand-logo" src="/images/debre_tsion_church_logo.png" alt="Debre Tsion Kidist Mariam church logo" /></span>
          <span><strong>Debre Tsion Kidist Mariam & Abune Aragawi</strong><small>Orthodox Tewahedo Church of Tigray</small></span>
        </a>
        <nav id="primary-navigation" className={menuOpen ? 'main-nav is-open' : 'main-nav'}>
          <button onClick={() => scrollTo('about')}>Our Church</button>
          <button onClick={() => scrollTo('worship')}>Worship</button>
          <button onClick={() => scrollTo('ministries')}>Ministries</button>
          <button onClick={() => scrollTo('gallery')}>Gallery</button>
          <button className="nav-contact" onClick={() => scrollTo('contact')}>Contact us <ArrowUpRight size={15} /></button>
        </nav>
        <button className="menu-toggle" aria-label="Toggle navigation" aria-expanded={menuOpen} aria-controls="primary-navigation" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={23} /> : <Menu size={23} />}
        </button>
      </header>

      <main id="top">
        <section className="hero-section">
          <img className="hero-photo" src="/images/Picture1_Tsion_Mariam.jpg" alt="The church community gathered for worship" />
          <div className="hero-copy">
            <p className="eyebrow light">A spiritual home in Atlanta</p>
            <h1>Come as you are.<br /><em>Worship with us.</em></h1>
            <p className="hero-intro">A welcoming Orthodox Tewahedo community rooted in prayer, sacred tradition, and a love that reaches every generation.</p>
            <div className="hero-actions">
              <button className="button button-light" onClick={() => scrollTo('visit')}>Plan your first visit <ArrowUpRight size={16} /></button>
              <button className="text-link light-link" onClick={() => scrollTo('about')}>Learn our story <ChevronRight size={16} /></button>
            </div>
          </div>
        </section>

        <section className="welcome-section section-pad" id="about">
          <div className="section-label"><span>01</span></div>
          <div className="welcome-grid">
            <div>
              <p className="eyebrow">Welcome home</p>
              <h2>A place to grow<br />closer to <em>God.</em></h2>
            </div>
            <div className="welcome-text">
              <p className="lead">Our church is a spiritual home where we gather to worship, receive the Holy Sacraments, and grow in the grace and knowledge of our Lord Jesus Christ.</p>
              <p>Whether you are a lifelong member or visiting for the first time, you are warmly welcome. Come join us in prayer, fellowship, and service as we preserve our Orthodox Tewahedo faith and build a loving community in Atlanta.</p>
              <div className="father-message">
                <p className="father-message-label">A Message from Our Spiritual Father</p>
                <p>Welcome to our church family in the name of the Father, the Son, and the Holy Spirit, one God. Amen.</p>
                <p>Our church is a spiritual home where we gather to worship, receive the Holy Sacraments, and grow in the grace and knowledge of our Lord Jesus Christ. Whether you are a lifelong member or visiting for the first time, we warmly welcome you.</p>
                <p>We invite you and your family to join us in prayer, fellowship, and service. May God bless your journey and fill your home with His peace.</p>
                
              </div>
              <button className="text-link" onClick={() => scrollTo('contact')}>Meet our family <ChevronRight size={16} /></button>
            </div>
          </div>
          <div className="values-row">
            <div><Heart size={18} /><strong>Faithful</strong><span>Rooted in sacred tradition</span></div>
            <div><Cross size={18} /><strong>Welcoming</strong><span>A home for every generation</span></div>
            <div><Heart size={18} /><strong>Serving</strong><span>Love in action, every day</span></div>
          </div>
          <div className="about-details">
            <article><p className="eyebrow">Our history</p><h3>A parish rooted in community.</h3><p>Our parish began in 1998 when founding clergy and families came together in Atlanta to establish a place of worship. The congregation first gathered at a local location and later moved to its current home. Important milestones include the first Divine Liturgy, parish establishment, church construction, property acquisition, and other verified milestones.</p></article>
            <article><p className="eyebrow">Our mission</p><h3>Faith shared through worship & service.</h3><p>To share the Gospel of Jesus Christ, uphold the faith & sacred traditions of the Ethiopian Orthodox Tewahedo Church, and nurture spiritual growth through worship, prayer, the Holy Sacraments, and Christian education. We serve our community with love, strengthen families, and guide the next generation in the Orthodox faith.</p></article>
            <article><p className="eyebrow">Our vision</p><h3>A welcoming spiritual home.</h3><p>To be a welcoming spiritual home where people grow closer to God, worship together in unity, and live out their faith through compassion and service. We seek to preserve our Orthodox Tewahedo heritage and pass it faithfully to future generations.</p></article>
          </div>
          <div className="beliefs-block"><div><p className="eyebrow">Our beliefs & values</p><h3>Rooted in faith.<br /><em>Growing together.</em></h3></div><div className="beliefs-list">{beliefs.map(([title, text]) => <div key={title}><strong>{title}</strong><p>{text}</p></div>)}</div></div>
        </section>

        <section className="worship-section section-pad" id="worship">
          <div className="section-label dark-label"><span>02</span></div>
          <div className="section-heading-row"><div><p className="eyebrow light">Come and see</p><h2>Worship with<br /><em>us.</em></h2></div><p className="heading-note">We welcome you and your family to join us in worship, prayer, and fellowship at our Ethiopian Orthodox Tewahedo Church.</p></div>
          <div className="service-table">
            <div className="table-head"><span>Weekly services</span><span>Day</span><span>Time</span></div>
            {services.map((service) => <div className="service-row" key={service.name}><strong>{service.name}</strong><span>{service.day}</span><span>{service.time}</span></div>)}
          </div>
          <div className="worship-footer"><div><Clock3 size={18} /><span>Prayer meetings<br /><strong>Thursday, 9:00 PM</strong></span></div><button className="button button-outline-light" onClick={() => scrollTo('contact')}>Ask about services <ArrowUpRight size={16} /></button></div>
          <div className="worship-programs"><article><p className="eyebrow light">Special services</p><ul><li><strong>Feast-day celebrations</strong>, worship honoring the feasts of our Lord Jesus Christ, the Blessed Virgin Mary, the angels, and the saints.</li><li><strong>Annual parish feast</strong>, a celebration honoring our church’s patron saints, with services and fellowship.</li><li><strong>Sacramental & pastoral services</strong>, including baptisms, weddings, confession, prayers for the sick, and funeral and memorial services.</li></ul></article><article><p className="eyebrow light">Seasonal programs</p><ul>{seasonalPrograms.map(([title, text]) => <li key={title}><strong>{title}</strong>, {text}</li>)}</ul></article></div>
        </section>

        <section className="ministries-section section-pad" id="ministries">
          <div className="section-label"><span>03</span></div>
          <div className="section-heading-row"><div><p className="eyebrow">Find your place</p><h2>Many gifts.<br /><em>One family.</em></h2></div><p className="heading-note">Our ministries bring members together to grow in faith, serve the Church, and care for one another.</p></div>
          <div className="ministries-grid">{ministries.map((ministry, index) => <article className="ministry-card" key={ministry.title}><span className="card-number">{String(index + 1).padStart(2, '0')}</span><h3>{ministry.title}</h3><p>{ministry.text}</p><button onClick={() => scrollTo('contact')}>Learn more <ArrowUpRight size={15} /></button></article>)}</div>
          <div className="get-involved"><div><p className="eyebrow">Get involved</p><h3>Share your time and talents.</h3></div><p>To join a ministry or learn about meeting schedules, contact the church office. We welcome everyone who would like to grow in faith, serve the Church, and care for one another.</p><button className="text-link" onClick={() => scrollTo('contact')}>Contact the church office <ArrowUpRight size={15} /></button></div>
        </section>

        <section className="gallery-section section-pad" id="gallery">
          <div className="section-label"><span>04</span></div>
          <div className="gallery-intro"><div><p className="eyebrow">Life together</p><h2>Moments of<br /><em>grace.</em></h2></div><p>From Sunday worship to feast-day celebrations, every gathering is a chance to share faith, joy, and belonging.</p></div>
          <div className="gallery-grid">{gallery.map((item, index) => <div className="gallery-card" key={item.label}><img src={item.src} alt={item.label} /><div className="gallery-overlay"><span>{String(index + 1).padStart(2, '0')}</span><h3>{item.label}</h3></div></div>)}</div>
          <div className="events-block"><div><p className="eyebrow">Events & announcements</p><h3>Gather with us throughout the year.</h3></div><div><p>Join us for worship, feast-day celebrations, spiritual programs, and community gatherings. Upcoming dates, event details, and seasonal schedules will be shared here as they are confirmed.</p><button className="text-link" onClick={() => scrollTo('contact')}>Ask about upcoming events <ArrowUpRight size={15} /></button></div></div>
        </section>

        <section className="visit-section" id="visit"><div className="visit-card"><div><p className="eyebrow light">You are welcome here</p><h2>Make your first<br /><em>visit easy.</em></h2><p>Planning your first visit? We would love to meet you. Our church family worships in Tigrinya and English, and there is a place for you here.</p></div><div className="visit-details"><div><MapPin size={19} /><span>2040 Braeburn Circle SE<br />Atlanta, GA 30316</span></div><div><Clock3 size={19} /><span>Sunday Divine Liturgy<br /><strong>5:00 AM Eastern Time</strong></span></div><a href="https://www.google.com/maps/search/?api=1&query=2040+Braeburn+Circle+SE+Atlanta+GA+30316" target="_blank" rel="noreferrer">Get directions <ArrowUpRight size={15} /></a></div></div></section>

        <section className="contact-section section-pad" id="contact"><div className="contact-grid"><div><p className="eyebrow">We would love to hear from you</p><h2>Let’s stay<br /><em>connected.</em></h2><p className="contact-copy">Have a question about worship, church events, or parish life? Write to us in Tigrinya or English.</p><div className="contact-links"><a href="mailto:atl.debretsiontotc@gmail.com"><Mail size={17} /> atl.debretsiontotc@gmail.com</a><span><MapPin size={17} /> 2040 Braeburn Circle SE, Atlanta, GA 30316</span></div></div><form className="contact-form" onSubmit={handleSubmit}><div className="form-row"><label>Name<input name="name" required placeholder="Your name" /></label><label>Email<input name="email" type="email" required placeholder="you@example.com" /></label></div><label>Phone <span>(optional)</span><input name="phone" placeholder="Your phone number" /></label><label>Message<textarea name="message" required rows={4} placeholder="How can we help?" /></label><button className="button button-dark" type="submit" disabled={formStatus === 'sending'}>{formStatus === 'sending' ? 'Sending…' : 'Send your message'} <ArrowUpRight size={16} /></button>{formStatus === 'success' && <p className="form-feedback success">Thank you. Your message has been sent to the church office.</p>}{formStatus === 'error' && <p className="form-feedback error">We could not send your message right now. Please email the church office directly.</p>}</form></div></section>
      </main>

      <footer className="site-footer"><div className="footer-brand"><span className="brand-mark"><img className="brand-logo" src="/images/debre_tsion_church_logo.png" alt="Debre Tsion Kidist Mariam church logo" /></span><div><strong>Debre Tsion Kidist Mariam & Abune Aragawi</strong><span>Orthodox Tewahedo Church of Tigray</span></div></div><div className="footer-social"><a href="#contact" aria-label="Facebook"><Facebook size={17} /></a><a href="#contact" aria-label="Instagram"><Instagram size={17} /></a><span>© 2026 Debre Tsion Kidist Mariam</span></div></footer>
    </div>
  );
}

export default App;
