import { ExternalLink, Mail, Menu, ShieldCheck, X } from "lucide-react";
import { useState } from "react";

// ── Data ──────────────────────────────────────────────────────────────────────

type App = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  logoSrc: string;
  logoAlt: string;
  playStoreUrl: string;
};

const APPS: App[] = [
  {
    id: "chalok",
    name: "Chalok",
    tagline: "Transport Directory",
    description: "রাইপুর-বাঁকুড়ার সব ভাড়া গাড়ি এখন এক জায়গায় — আশপাশের সমস্ত গাড়ি Chalok এই।",
    logoSrc: "/assets/generated/chalok-logo-transparent.dim_200x200.png",
    logoAlt: "Chalok App Logo",
    playStoreUrl: "#",
  },
];

type BlogPost = {
  id: string;
  title: string;
  imageSrc: string;
  url: string;
};

const BLOG_POSTS: BlogPost[] = [
  {
    id: "post-1",
    title: "Exploring the Villages of Bankura — How We Research Our Apps",
    imageSrc: "/assets/generated/blog-post-1.dim_600x400.jpg",
    url: "https://blog.bongly.in",
  },
  {
    id: "post-2",
    title: "Building for Bharat: Why We Started with Transport",
    imageSrc: "/assets/generated/blog-post-2.dim_600x400.jpg",
    url: "https://blog.bongly.in",
  },
  {
    id: "post-3",
    title: "Chalok Update: New Routes Added for Raipur-Bankura",
    imageSrc: "/assets/generated/blog-post-3.dim_600x400.jpg",
    url: "https://blog.bongly.in",
  },
];

// ── Smooth scroll helper ──────────────────────────────────────────────────────
function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

// ── Header ────────────────────────────────────────────────────────────────────
function Header({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: "rgba(245, 247, 255, 0.88)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.55)",
        boxShadow:
          "0 2px 16px rgba(21, 48, 200, 0.07), 0 1px 3px rgba(21, 48, 200, 0.04)",
      }}
    >
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <button
          type="button"
          className="cursor-pointer select-none bg-transparent border-0 p-0 transition-smooth hover:opacity-80 flex items-center gap-2.5"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
        >
          <span
            className="flex items-center justify-center rounded-xl p-1.5"
            style={{
              background: "#fff",
              boxShadow:
                "2px 2px 8px rgba(21,48,200,0.10), -1px -1px 5px rgba(255,255,255,0.9)",
            }}
          >
            <img
              src="/assets/bongly-logo.png"
              alt="Bongly"
              className="h-7 w-auto object-contain rounded-lg"
            />
          </span>
          <span
            className="font-black tracking-widest text-[18px] select-none"
            style={{
              color: "#1530C8",
              fontFamily: "'Space Grotesk', sans-serif",
              letterSpacing: "0.14em",
            }}
          >
            BONGLY
          </span>
        </button>
        <button
          type="button"
          data-ocid="nav.open_modal_button"
          onClick={onMenuClick}
          aria-label="Open menu"
          className="p-2 rounded-xl btn-neumorphic"
          style={{
            background: "rgba(255,255,255,0.7)",
          }}
        >
          <Menu size={22} color="#1530C8" strokeWidth={2.5} />
        </button>
      </div>
    </header>
  );
}

// ── Drawer ────────────────────────────────────────────────────────────────────
function NavDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;

  const handleScroll = (id: string) => {
    onClose();
    setTimeout(() => scrollToSection(id), 50);
  };

  return (
    <>
      <button
        type="button"
        className="drawer-overlay"
        onClick={onClose}
        onKeyDown={(e) => e.key === "Escape" && onClose()}
        aria-label="Close menu overlay"
        data-ocid="nav.modal"
      />
      {/* biome-ignore lint/a11y/useSemanticElements: intentional div avoids browser default dialog centering */}
      <div
        role="dialog"
        className="drawer-panel flex flex-col p-0 border-0 max-w-none max-h-none h-full"
        aria-label="Navigation menu"
        data-ocid="nav.sheet"
      >
        <div
          className="flex items-center justify-between px-6 py-5"
          style={{
            borderBottom: "1px solid rgba(255, 255, 255, 0.4)",
          }}
        >
          <span
            className="flex items-center justify-center rounded-xl p-1.5"
            style={{
              background: "#fff",
              boxShadow:
                "2px 2px 8px rgba(21,48,200,0.10), -1px -1px 5px rgba(255,255,255,0.9)",
            }}
          >
            <img
              src="/assets/bongly-logo.png"
              alt="Bongly"
              className="h-7 w-auto object-contain rounded-lg"
            />
          </span>
          <button
            type="button"
            data-ocid="nav.close_button"
            onClick={onClose}
            aria-label="Close menu"
            className="p-1.5 rounded-lg btn-neumorphic"
            style={{ background: "rgba(255,255,255,0.6)" }}
          >
            <X size={18} color="#1530C8" />
          </button>
        </div>

        <div className="flex flex-col py-4 flex-1">
          <DrawerLink
            data-ocid="nav.link.1"
            label="Our Apps"
            onClick={() => handleScroll("apps")}
          />
          <DrawerLink
            data-ocid="nav.link.2"
            label="About"
            onClick={() => handleScroll("about")}
          />
          <a
            data-ocid="nav.link.3"
            href="https://blog.bongly.in"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3.5 text-[15px] font-medium transition-smooth rounded-xl mx-2 mb-0.5"
            style={{ color: "#374151" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background =
                "rgba(21,48,200,0.07)";
              (e.currentTarget as HTMLElement).style.color = "#1530C8";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "transparent";
              (e.currentTarget as HTMLElement).style.color = "#374151";
            }}
          >
            Blog <ExternalLink size={13} className="opacity-60" />
          </a>
          <a
            data-ocid="nav.link.4"
            href="/privacy-policy"
            className="px-6 py-3.5 text-[15px] font-medium transition-smooth rounded-xl mx-2 mb-0.5"
            style={{ color: "#374151" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background =
                "rgba(21,48,200,0.07)";
              (e.currentTarget as HTMLElement).style.color = "#1530C8";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "transparent";
              (e.currentTarget as HTMLElement).style.color = "#374151";
            }}
          >
            Privacy Policy
          </a>
          <a
            data-ocid="nav.link.5"
            href="/terms"
            className="px-6 py-3.5 text-[15px] font-medium transition-smooth rounded-xl mx-2 mb-0.5"
            style={{ color: "#374151" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background =
                "rgba(21,48,200,0.07)";
              (e.currentTarget as HTMLElement).style.color = "#1530C8";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "transparent";
              (e.currentTarget as HTMLElement).style.color = "#374151";
            }}
          >
            Terms &amp; Conditions
          </a>
          <a
            data-ocid="nav.link.6"
            href="mailto:support@bongly.in"
            className="px-6 py-3.5 text-[15px] font-medium transition-smooth rounded-xl mx-2 mb-0.5"
            style={{ color: "#374151" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background =
                "rgba(21,48,200,0.07)";
              (e.currentTarget as HTMLElement).style.color = "#1530C8";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "transparent";
              (e.currentTarget as HTMLElement).style.color = "#374151";
            }}
          >
            Contact Us
          </a>
        </div>

        {/* Bottom branding strip */}
        <div
          className="px-6 py-4 text-[12px]"
          style={{
            borderTop: "1px solid rgba(255, 255, 255, 0.4)",
            color: "#9CA3AF",
          }}
        >
          Made with ❤️ in Bankura
        </div>
      </div>
    </>
  );
}

function DrawerLink({
  label,
  onClick,
  "data-ocid": ocid,
}: {
  label: string;
  onClick: () => void;
  "data-ocid"?: string;
}) {
  return (
    <button
      type="button"
      data-ocid={ocid}
      onClick={onClick}
      className="text-left px-6 py-3.5 text-[15px] font-medium transition-smooth rounded-xl mx-2 mb-0.5"
      style={{ color: "#374151" }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.background =
          "rgba(21,48,200,0.07)";
        (e.currentTarget as HTMLElement).style.color = "#1530C8";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.background = "transparent";
        (e.currentTarget as HTMLElement).style.color = "#374151";
      }}
    >
      {label}
    </button>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section
      className="aurora-bg flex items-center justify-center overflow-hidden"
      style={{ minHeight: "40vh", paddingTop: "96px", paddingBottom: "72px" }}
    >
      {/* Outer wrapper — relative so the spinning card can be positioned behind text */}
      <div className="relative flex items-center justify-center w-full max-w-2xl mx-auto px-6 rounded-3xl">
        {/* Spinning glass background card — absolutely positioned, z-0 */}
        <div
          className="spin-glass-card absolute inset-[-30%] rounded-3xl"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.38) 0%, rgba(199,210,254,0.28) 40%, rgba(167,139,250,0.18) 70%, rgba(255,255,255,0.25) 100%)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            zIndex: 0,
          }}
        />

        {/* Hero content — fixed, z-10 so it stays on top */}
        <div className="relative z-10 text-center py-12 w-full">
          {/* Logo */}
          <div className="flex justify-center mb-5">
            <span
              className="flex items-center justify-center rounded-2xl p-2"
              style={{
                background: "#fff",
                boxShadow:
                  "4px 4px 14px rgba(21,48,200,0.13), -3px -3px 10px rgba(255,255,255,0.95)",
              }}
            >
              <img
                src="/assets/bongly-logo.png"
                alt="Bongly"
                className="h-20 w-auto object-contain rounded-2xl drop-shadow-lg"
              />
            </span>
          </div>

          {/* Pill tag */}
          <div
            className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full text-[13px] font-semibold tracking-wide"
            style={{
              color: "#1530C8",
              background: "transparent",
              border: "none",
            }}
          >
            <span
              className="w-2 h-2 rounded-full inline-block"
              style={{ background: "#1530C8", opacity: 0.7 }}
            />
            Privacy-First Utility Apps
          </div>

          <h1
            className="text-4xl sm:text-5xl font-black tracking-widest mb-5"
            style={{
              color: "#111827",
              letterSpacing: "0.12em",
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            BONGLY
          </h1>
          <p
            className="text-lg sm:text-xl font-medium leading-relaxed"
            style={{ color: "#374151" }}
          >
            Building apps for real people, real places.
            <br />
            <span style={{ color: "#6B7280", fontSize: "0.95em" }}>
              Simple. Reliable. Made in West Bengal.
            </span>
          </p>

          {/* CTA */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => scrollToSection("apps")}
              data-ocid="hero.cta_primary"
              className="px-7 py-3 rounded-2xl font-semibold text-[15px] text-white btn-neumorphic transition-smooth"
              style={{ background: "#1530C8" }}
            >
              Explore Our Apps
            </button>
            <a
              href="https://blog.bongly.in"
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="hero.cta_secondary"
              className="px-7 py-3 rounded-2xl font-semibold text-[15px] glass-base btn-neumorphic inline-flex items-center gap-2"
              style={{ color: "#1530C8" }}
            >
              Read Our Blog <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Our Apps ──────────────────────────────────────────────────────────────────
function AppsSection() {
  return (
    <section
      id="apps"
      className="py-20 px-6"
      style={{
        background:
          "linear-gradient(180deg, #eef2ff 0%, #f5f7ff 60%, #eef2ff 100%)",
      }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold mb-3" style={{ color: "#111827" }}>
            Our Apps
          </h2>
          <p className="text-[15px]" style={{ color: "#6B7280" }}>
            Small, focused tools built for everyday needs.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-10">
          {APPS.map((app, i) => (
            <AppCard key={app.id} app={app} index={i + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function AppCard({ app, index }: { app: App; index: number }) {
  return (
    <div className="glow-card-wrapper w-full max-w-sm">
      <article
        data-ocid={`apps.card.${index}`}
        className="glass-base rounded-[14px] flex flex-col items-center p-8 w-full"
        style={{
          background: "rgba(255, 255, 255, 0.82)",
        }}
      >
        <div
          className="mb-6 rounded-2xl p-3 soft-shadow"
          style={{
            background: "rgba(255,255,255,0.9)",
            boxShadow:
              "3px 3px 10px rgba(21,48,200,0.1), -2px -2px 8px rgba(255,255,255,0.95)",
          }}
        >
          <img
            src={app.logoSrc}
            alt={app.logoAlt}
            className="w-20 h-20 object-contain"
          />
        </div>
        <h2
          className="text-xl font-bold text-center mb-3"
          style={{ color: "#111827" }}
        >
          {app.name}{" "}
          <span style={{ color: "#6B7280", fontWeight: 500 }}>
            — {app.tagline}
          </span>
        </h2>
        <p
          className="text-center text-[15px] leading-relaxed mb-8"
          style={{ color: "#4B5563" }}
        >
          {app.description}
        </p>
        <a
          data-ocid={`apps.button.${index}`}
          href={app.playStoreUrl}
          target={app.playStoreUrl !== "#" ? "_blank" : undefined}
          rel="noopener noreferrer"
          className="transition-smooth btn-neumorphic rounded-xl overflow-hidden"
          style={{ background: "rgba(255,255,255,0.7)" }}
        >
          <img
            src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
            alt="Get it on Google Play"
            className="h-14 object-contain"
          />
        </a>
      </article>
    </div>
  );
}

// ── About ─────────────────────────────────────────────────────────────────────
function AboutSection() {
  return (
    <section
      id="about"
      className="py-20 px-6"
      style={{
        background:
          "linear-gradient(160deg, rgba(238,242,255,0.9) 0%, rgba(245,247,255,0.95) 100%)",
      }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="max-w-2xl">
          <span
            className="inline-block text-[12px] font-semibold tracking-widest uppercase mb-4 px-3 py-1 rounded-full glass-base"
            style={{ color: "#1530C8" }}
          >
            Our Story
          </span>
          <h2 className="text-3xl font-bold mb-6" style={{ color: "#111827" }}>
            About Bongly
          </h2>
          <div
            className="glass-card p-8 card-neumorphic"
            style={{ background: "rgba(255,255,255,0.75)" }}
          >
            <p
              className="text-[17px] leading-relaxed"
              style={{ color: "#374151" }}
            >
              Bongly is a small indie studio from Bankura, West Bengal, India.
              We build simple, useful apps for everyday people — starting right
              here in our own backyard.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {["Privacy-first", "Made in Bengal", "Open to Feedback"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="px-3.5 py-1.5 rounded-full text-[13px] font-semibold glass-base soft-shadow"
                    style={{ color: "#1530C8" }}
                  >
                    {tag}
                  </span>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Blog ──────────────────────────────────────────────────────────────────────
function BlogSection() {
  return (
    <section
      className="py-20 px-6"
      style={{
        background:
          "linear-gradient(180deg, rgba(245,247,255,0.95) 0%, #eef2ff 100%)",
      }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold mb-3" style={{ color: "#111827" }}>
            From the Blog
          </h2>
          <p className="text-[15px]" style={{ color: "#6B7280" }}>
            Stories, updates, and insights from the team.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7 mb-12">
          {BLOG_POSTS.map((post, i) => (
            <BlogCard key={post.id} post={post} index={i + 1} />
          ))}
        </div>
        <div className="text-center">
          <a
            data-ocid="blog.primary_button"
            href="https://blog.bongly.in"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl font-semibold text-white text-[15px] btn-neumorphic transition-smooth"
            style={{ background: "#1530C8" }}
          >
            Read More on Blog <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}

function BlogCard({ post, index }: { post: BlogPost; index: number }) {
  return (
    <a
      data-ocid={`blog.item.${index}`}
      href={post.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block glass-card card-neumorphic overflow-hidden"
      style={{
        background: "rgba(255,255,255,0.78)",
        border: "1px solid rgba(255,255,255,0.6)",
      }}
    >
      <div className="overflow-hidden rounded-t-2xl">
        <img
          src={post.imageSrc}
          alt={post.title}
          className="w-full h-48 object-cover group-hover:scale-[1.04] transition-transform duration-500"
          loading="lazy"
        />
      </div>
      <div className="p-5">
        <p
          className="font-semibold text-[15px] leading-snug"
          style={{ color: "#111827" }}
        >
          {post.title}
        </p>
        <div
          className="mt-3 flex items-center gap-1 text-[13px] font-medium"
          style={{ color: "#1530C8" }}
        >
          Read more <ExternalLink size={12} />
        </div>
      </div>
    </a>
  );
}

// ── Privacy Promise ───────────────────────────────────────────────────────────
function PrivacyPromise() {
  return (
    <section
      className="py-24 px-6"
      style={{
        background:
          "linear-gradient(160deg, rgba(238,242,255,0.95) 0%, rgba(230,236,255,0.85) 100%)",
      }}
    >
      <div className="max-w-xl mx-auto text-center">
        {/* Shield icon — neumorphic circle */}
        <div
          className="mx-auto mb-8 flex items-center justify-center rounded-full btn-neumorphic"
          style={{
            width: 80,
            height: 80,
            background: "rgba(255,255,255,0.85)",
            boxShadow:
              "6px 6px 14px rgba(21,48,200,0.13), -4px -4px 10px rgba(255,255,255,0.9)",
          }}
        >
          <ShieldCheck
            size={38}
            strokeWidth={1.6}
            style={{ color: "#1530C8" }}
          />
        </div>

        {/* Glass card container */}
        <div
          className="glass-card p-10"
          style={{ background: "rgba(255,255,255,0.8)" }}
        >
          <p className="text-2xl font-bold mb-3" style={{ color: "#111827" }}>
            Your data stays yours.
          </p>
          <p
            className="text-[16px] leading-relaxed mb-8"
            style={{ color: "#4B5563" }}
          >
            At Bongly, we only collect what&apos;s necessary to serve you
            better. No selling, no tracking, no nonsense.
          </p>
          <a
            data-ocid="privacy.primary_button"
            href="/privacy-policy"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-2xl font-semibold text-[15px] glow-btn btn-neumorphic transition-smooth"
            style={{ color: "#1530C8", background: "rgba(255,255,255,0.8)" }}
          >
            Read Our Privacy Policy
          </a>
        </div>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        background:
          "linear-gradient(160deg, rgba(238,242,255,0.9) 0%, rgba(245,247,255,0.95) 100%)",
        borderTop: "1px solid rgba(255,255,255,0.55)",
      }}
    >
      <div className="max-w-lg mx-auto px-6 py-16 flex flex-col items-center text-center gap-0">
        {/* Visit Our Blog — glow pill button */}
        <a
          data-ocid="footer.primary_button"
          href="https://blog.bongly.in"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-7 py-3 font-semibold text-[15px] glow-btn btn-neumorphic transition-smooth rounded-full"
          style={{
            color: "#1530C8",
            background: "rgba(255,255,255,0.8)",
          }}
        >
          Visit Our Blog <ExternalLink size={15} />
        </a>

        {/* Policy links */}
        <div className="flex flex-col items-center gap-1 mt-6">
          <a
            data-ocid="footer.link.1"
            href="/privacy-policy"
            className="text-[14px] transition-smooth py-1 hover:opacity-80"
            style={{ color: "#6B7280" }}
          >
            Privacy Policy
          </a>
          <a
            data-ocid="footer.link.2"
            href="/terms"
            className="text-[14px] transition-smooth py-1 hover:opacity-80"
            style={{ color: "#6B7280" }}
          >
            Terms &amp; Conditions
          </a>
        </div>

        {/* Contact Us */}
        <div className="mt-8 flex flex-col items-center gap-2">
          <h3 className="font-bold text-[16px]" style={{ color: "#111827" }}>
            Contact Us
          </h3>
          <a
            data-ocid="footer.link.3"
            href="mailto:support@bongly.in"
            className="inline-flex items-center gap-1.5 text-[14px] font-medium transition-smooth hover:opacity-75"
            style={{ color: "#1530C8" }}
          >
            <Mail size={14} strokeWidth={2} />
            support@bongly.in
          </a>
        </div>

        {/* Section links */}
        <div className="mt-5 flex items-center gap-6">
          <button
            type="button"
            data-ocid="footer.link.4"
            onClick={() => scrollToSection("apps")}
            className="text-[14px] transition-smooth hover:opacity-80"
            style={{ color: "#6B7280" }}
          >
            Our Apps
          </button>
          <button
            type="button"
            data-ocid="footer.link.5"
            onClick={() => scrollToSection("about")}
            className="text-[14px] transition-smooth hover:opacity-80"
            style={{ color: "#6B7280" }}
          >
            About
          </button>
        </div>

        {/* Divider */}
        <div
          className="w-full mt-8 mb-6"
          style={{ borderTop: "1px solid rgba(21,48,200,0.1)" }}
        />

        {/* Footer logo */}
        <span
          className="flex items-center justify-center rounded-2xl p-2 mb-3"
          style={{
            background: "#fff",
            boxShadow:
              "3px 3px 10px rgba(21,48,200,0.10), -2px -2px 8px rgba(255,255,255,0.9)",
          }}
        >
          <img
            src="/assets/bongly-logo.png"
            alt="Bongly"
            className="h-9 w-auto object-contain rounded-xl opacity-90"
          />
        </span>

        {/* Bottom text */}
        <p className="text-[13px] mb-1" style={{ color: "#6B7280" }}>
          Made with ❤️ in Bankura, West Bengal, India
        </p>
        <p className="text-[12px]" style={{ color: "#9CA3AF" }}>
          Copyright © {year} Bongly, All rights reserved.
        </p>
        <p className="text-[12px] mt-1" style={{ color: "#9CA3AF" }}>
          Built with love using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-75 transition-smooth"
            style={{ color: "#1530C8" }}
          >
            caffeine.ai
          </a>
        </p>
      </div>
    </footer>
  );
}

// ── Root ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header onMenuClick={() => setDrawerOpen(true)} />
      <NavDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      <main className="flex-1">
        <Hero />
        <AppsSection />
        <AboutSection />
        <BlogSection />
        <PrivacyPromise />
      </main>

      <Footer />
    </div>
  );
}
