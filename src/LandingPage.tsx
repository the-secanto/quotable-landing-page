import { useEffect, useRef, useState, type ReactNode } from "react";
import { Apple, Download, Monitor, Terminal, Quote as QuoteIcon, Clock, Palette, Sparkles, Cloud, ArrowRight, Github, Library, Upload } from "lucide-react";

const downloads = [
  { os: "macOS", icon: Apple, file: "Quotable.dmg", note: "Universal · Apple Silicon & Intel", available: false, url: "" },
  { os: "Windows", icon: Monitor, file: "Quotable-Setup.exe", note: "Windows 10 & 11 · x64", available: true, url: "https://github.com/the-secanto/quotable-dev/releases/download/v1.0.1/Quotable.Setup.1.0.1.exe" },
  { os: "Linux", icon: Terminal, file: "Quotable.AppImage", note: "AppImage · x86_64", available: false, url: "" },
];

const features = [
  {
    icon: QuoteIcon,
    title: "Your words, your way",
    body: "Curate a private library of quotes, anything that moves you.",
  },
  {
    icon: Clock,
    title: "Perfectly timed pauses",
    body: "Quotable waits patiently. After inactivity, on wake, or on a schedule, it appears.",
  },
  {
    icon: Palette,
    title: "Calming themes",
    body: "From Dark Focus to Synthwave to Mono Code. Adjust opacity so your desktop quietly shows through.",
  },
  {
    icon: Cloud,
    title: "Syncs across devices",
    body: "Sign in to keep your library in sync between your Mac, PC, and Linux machine. Or stay fully offline.",
  },
  {
    icon: Library,
    title: "Explore more quotes",
    body: "Browse other quotes, discover curated collections, and find new lines worth saving.",
  },
  {
    icon: Upload,
    title: "Share with the world",
    body: "Upload your own quotes so the community can discover, view, and add them to their collections.",
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

export function LandingPage() {
  return (
    <div className="min-h-screen bg-[#09090b] text-[#fafafa] font-sans">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-[#27272a] bg-[#09090b]/70 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <img src="/favicon.ico" alt="Quotable Logo" className="h-8 w-8 rounded-lg" />
            <span className="font-serif text-xl">Quotable</span>
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm text-[#a1a1aa]">
            <a href="#features" className="hover:text-[#fafafa] transition">Features</a>
            <a href="#themes" className="hover:text-[#fafafa] transition">Themes</a>
            <a href="#source" className="hover:text-[#fafafa] transition">Source</a>
            <a href="#download" className="hover:text-[#fafafa] transition">Download</a>
          </nav>
          <a
            href="#download"
            className="inline-flex items-center gap-1.5 rounded-full bg-[#7c3aed] px-4 py-2 text-sm font-medium text-white hover:opacity-90 transition"
          >
            <Download className="h-3.5 w-3.5" /> Download
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#7c3aed]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-[#7c3aed]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none opacity-30" style={{ backgroundImage: "radial-gradient(circle, #27272a 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
        <div className="max-w-6xl mx-auto px-6 pt-20 pb-16 md:pt-28 md:pb-24 text-center relative z-10">
          <p className="text-xs uppercase tracking-[0.3em] text-[#a1a1aa] mb-5">
            Calm tech for your desk
          </p>
          <h1 className="font-serif text-5xl md:text-7xl leading-[1.05] text-balance">
            A gentle pause,<br />
            <span className="italic text-[#7c3aed]">when you need it most.</span>
          </h1>
          <p className="mt-6 text-lg text-[#a1a1aa] max-w-2xl mx-auto">
            Quotable waits in the background of your laptop. When you return after a long break,
            it greets you with a beautiful, fullscreen quote then quietly steps aside.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#download"
              className="inline-flex items-center gap-2 rounded-full bg-[#7c3aed] px-6 py-3 text-sm font-medium text-white hover:opacity-90 transition shadow-[0_0_20px_rgba(124,58,237,0.3)]"
            >
              <Download className="h-4 w-4" /> Download for free
            </a>
            <a
              href="#features"
              className="inline-flex items-center gap-2 rounded-full border border-[#27272a] px-6 py-3 text-sm font-medium hover:bg-white/5 transition"
            >
              Learn more <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="https://github.com/the-secanto/quotable-dev"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[#27272a] px-6 py-3 text-sm font-medium hover:bg-white/5 transition"
            >
              <Github className="h-4 w-4" /> View source
            </a>
          </div>
          <p className="mt-4 text-xs text-[#a1a1aa]">Free · Open source · macOS · Windows · Linux</p>
        </div>

        <div className="max-w-5xl mx-auto px-6 pb-20 relative z-10">
          <div className="rounded-2xl overflow-hidden shadow-xl bg-[#09090b] aspect-video flex items-center justify-center transition-transform duration-500 hover:scale-[1.02]">
            <img src="/overlay.png" alt="Overlay" className="w-full h-full object-contain" />
          </div>
        </div>
      </section>

      {/* Features */}
      <Reveal>
        <section id="features" className="py-24 border-t border-[#27272a]">
          <div className="max-w-6xl mx-auto px-6">
            <div className="max-w-2xl mb-5">
              <p className="text-xs uppercase tracking-[0.3em] text-[#a1a1aa] mb-3">Features</p>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {features.map((f) => (
                <div key={f.title} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-7">
                  <div className="h-10 w-10 rounded-xl bg-[#7c3aed]/10 text-[#7c3aed] flex items-center justify-center mb-4">
                    <f.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-serif text-2xl mb-2">{f.title}</h3>
                  <p className="text-[#a1a1aa] leading-relaxed">{f.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* Dashboard screenshot */}
      <Reveal delay={0.1}>
        <section className="py-24 border-t border-[#27272a]">
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[#a1a1aa] mb-3">The dashboard</p>
              <h2 className="font-serif text-4xl mb-4">A quiet place to curate.</h2>
              <p className="text-[#a1a1aa] leading-relaxed">
                Add quotes one at a time, or import a collection. See your library at a glance,
                and preview any theme in a single click.
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl bg-[#09090b] aspect-square flex items-center justify-center transition-transform duration-500 hover:scale-[1.02]">
              <img src="/dashboard.png" alt="Dashboard" className="w-full h-full object-contain" />
            </div>
          </div>
        </section>
      </Reveal>

      {/* Themes */}
      <Reveal delay={0.2}>
        <section id="themes" className="py-24 border-t border-[#27272a]">
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
            <div className="rounded-2xl overflow-hidden shadow-xl bg-[#09090b] aspect-square flex items-center justify-center transition-transform duration-500 hover:scale-[1.02] md:order-1 order-2">
              <img src="/theme.png" alt="Themes" className="w-full h-full object-contain" />
            </div>
            <div className="md:order-2 order-1">
              <p className="text-xs uppercase tracking-[0.3em] text-[#a1a1aa] mb-3">Themes</p>
              <h2 className="font-serif text-4xl mb-4">Eight moods.</h2>
              <p className="text-[#a1a1aa] leading-relaxed mb-6">
                Dark Focus, Warm Calm, Soft Pastel, Minimal Light, Sage Mist, Synthwave,
                Sunset Drive, and Mono Code. Adjust opacity to let your desktop softly peek through.
              </p>
              <div className="flex flex-wrap gap-2">
                {["dark","warm","pastel","light","sage","synthwave","sunset","mono"].map((t) => (
                  <span key={t} className="px-3 py-1 rounded-full bg-[#27272a] text-[#fafafa] text-xs capitalize">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* Source */}
      <Reveal delay={0.25}>
        <section id="source" className="py-24 border-t border-[#27272a]">
          <div className="max-w-6xl mx-auto px-6">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-10 grid md:grid-cols-[1fr_auto] gap-8 items-center">
              <div>
                <div className="h-12 w-12 rounded-2xl bg-[#7c3aed]/10 text-[#7c3aed] flex items-center justify-center mb-5">
                  <Github className="h-6 w-6" />
                </div>
                <p className="text-xs uppercase tracking-[0.3em] text-[#a1a1aa] mb-3">Open source</p>
                <h2 className="font-serif text-4xl mb-4">Check out the source code.</h2>
                <p className="text-[#a1a1aa] leading-relaxed max-w-2xl">
                  Quotable is free and open source. Browse the code on GitHub, follow development,
                  or join it's development by submitting a pull request.
                </p>
              </div>
              <a
                href="https://github.com/the-secanto/quotable-dev"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#7c3aed] px-6 py-3 text-sm font-medium text-white hover:opacity-90 transition shadow-[0_0_20px_rgba(124,58,237,0.3)]"
              >
                <Github className="h-4 w-4" /> Open GitHub
              </a>
            </div>
          </div>
        </section>
      </Reveal>

      {/* Download */}
      <Reveal delay={0.3}>
        <section id="download" className="py-24 border-t border-[#27272a]">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <Sparkles className="h-6 w-6 text-[#7c3aed] mx-auto mb-4" />
            <h2 className="font-serif text-4xl md:text-5xl mb-3">Download Quotable</h2>
            <p className="text-[#a1a1aa] mb-12 max-w-xl mx-auto">
              Pick your platform. Quotable is free and works offline. Sign in only if you want sync.
            </p>
            <div className="grid md:grid-cols-3 gap-4 text-left">
              {downloads.map((d) => (
                <a
                  key={d.os}
                  href={d.available ? d.url : undefined}
                  className={`group bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-7 transition ${d.available ? "hover:border-[#7c3aed]/50" : "opacity-50 cursor-default"}`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <d.icon className="h-7 w-7" />
                    {d.available ? (
                      <Download className="h-4 w-4 text-[#a1a1aa] group-hover:text-[#7c3aed] transition" />
                    ) : (
                      <span className="text-xs text-[#a1a1aa]">Coming soon</span>
                    )}
                  </div>
                  <div className="font-serif text-2xl mb-1">Download for {d.os}</div>
                  <p className="text-xs text-[#a1a1aa]">{d.note}</p>
                  <p className="mt-4 text-xs text-[#7c3aed] font-medium break-all">
                    {d.available ? (d.os === "Windows" ? d.url : d.file) : ""}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* Footer */}
      <footer className="border-t border-[#27272a] py-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-wrap items-center justify-between gap-4 text-sm text-[#a1a1aa]">
          <div className="flex items-center gap-2">
            <img src="/favicon.ico" alt="Quotable Logo" className="h-6 w-6 rounded-md" />
            <span className="font-serif text-base text-[#fafafa]">Quotable</span>
            <span>· Calm tech for what matters.</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#features" className="hover:text-[#fafafa]">Features</a>
            <a href="#download" className="hover:text-[#fafafa]">Download</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
