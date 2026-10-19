import SculptureHero from "@/components/ui/liquid-sculpture-hero";
import { ChatIcon, AppIcon, GearIcon } from "@/components/ui/animated-icons";
import SpotlightBackground from "@/components/ui/spotlight-background";

const WHATSAPP = "https://wa.me/930780265570";
const EMAIL = "mailto:Younissafi.afg@gmail.com";

export default function Home() {
  return (
    <>
      <SpotlightBackground />
      <main style={{ position: "relative", zIndex: 1 }}>
      <SculptureHero
        brand="SEEDLING"
        navLinks={[
          { label: "Services", href: "#services" },
          { label: "Education", href: "#education" },
        ]}
        navCta={{ label: "Contact", href: "#contact" }}
        eyebrow="AI automation — Free community education"
        headline={"Automation that\nworks for you."}
        headlineAccent="works for you."
        body="We build AI automation for businesses, and teach technology and AI to our community for free."
        primaryCta={{ label: "Chat on WhatsApp", href: WHATSAPP }}
        secondaryCta={{ label: "Free education", href: "#education" }}
        darkBackground="#050505"
        accentColor="#a7f3b5"
        logoSrc="/logo.png"
        hint="Move your mouse or tap the logo"
      />

      <section id="services" className="sec">
        <h2>AI automation for your business</h2>
        <p>We set up tools that save you hours every week, so you can focus on growing.</p>
        <div className="grid">
          <div className="card"><ChatIcon /><h3>Sales assistants</h3><p>AI that answers customers and tracks leads.</p></div>
          <div className="card"><AppIcon /><h3>Business apps</h3><p>Custom tools for sales, collections and reports.</p></div>
          <div className="card"><GearIcon /><h3>Workflow automation</h3><p>Repetitive tasks done automatically.</p></div>
        </div>
      </section>

      <section id="education" className="sec">
        <h2>Free education for our community</h2>
        <div className="split">
          <div>
            <p>We teach technology and how to use AI automation in your own business, at no cost.</p>
            <a className="btn" href={WHATSAPP}>Join on WhatsApp</a>
          </div>
          <img className="photo" src="/expo.jpg" alt="Two people meeting at a business expo" />
        </div>
      </section>

      <section id="contact" className="sec">
        <h2>Contact</h2>
        <p>WhatsApp: +93 78 026 5570<br />Email: Younissafi.afg@gmail.com</p>
        <a className="btn" href={EMAIL}>Send an email</a>
      </section>

      <footer>© Seedling</footer>
      </main>
    </>
  );
}
