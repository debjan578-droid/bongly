import {
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { ExternalLink, Mail, Menu, ShieldCheck, X } from "lucide-react";
import { useEffect, useState } from "react";

// ── Data ──────────────────────────────────────────────────────────────────────

type App = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  logoSrc: string;
  logoSrcFallback: string;
  logoAlt: string;
  playStoreUrl: string;
};

const APPS: App[] = [
  {
    id: "chalok",
    name: "Chalok",
    tagline: "Transport Directory",
    description: "রাইপুর-বাঁকুড়ার সব ভাড়া গাড়ি এখন এক জায়গায় — আশপাশের সমস্ত গাড়ি Chalok এই।",
    logoSrc: "/assets/chalok-logo.webp",
    logoSrcFallback: "/assets/chalok-logo.png",
    logoAlt:
      "Chalok - Rent Car With Driver Booking App in Raipur Bankura by Bongly",
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

// ── Privacy Policy Data ───────────────────────────────────────────────────────

type PolicySection = {
  number: number;
  title: string;
  content: string;
};

type AppPolicy = {
  id: string;
  appName: string;
  lastUpdated: string;
  intro: string;
  sections: PolicySection[];
};

export const PRIVACY_POLICIES: AppPolicy[] = [
  {
    id: "chalok",
    appName: "Chalok",
    lastUpdated: "April 19, 2026",
    intro:
      "At Chalok, we respect your privacy and are committed to protecting the personal information you share with us.",
    sections: [
      {
        number: 1,
        title: "Information We Collect",
        content:
          "We only collect the information you voluntarily provide to us. This includes the details you submit during registration or while using the app. All information collected is used solely for the purpose of verifying your identity and displaying your profile to passengers. We do not collect any information beyond what is necessary.",
      },
      {
        number: 2,
        title: "How We Use Your Information",
        content:
          "The information you provide is used only to verify your account and make your profile visible to passengers looking for vehicles in your area. We do not use your information for advertising, profiling, or any other commercial purpose.",
      },
      {
        number: 3,
        title: "Data Security",
        content:
          "We take the security of your data seriously. All information is stored securely and access is strictly limited. We do not share your personal information with any third party under any circumstances.",
      },
      {
        number: 4,
        title: "Location Information",
        content:
          "Any location-related information (such as your area or village) is provided by you voluntarily. We do not track or store your real-time GPS location without your explicit permission.",
      },
      {
        number: 5,
        title: "Passenger Data",
        content:
          "Passengers do not need to create an account to use Chalok. Any preferences saved by passengers (such as favorite drivers) are stored only on their own device and are not accessible to us.",
      },
      {
        number: 6,
        title: "Children's Privacy",
        content:
          "Chalok is not intended for use by anyone under the age of 18. We do not knowingly collect information from minors.",
      },
      {
        number: 7,
        title: "Changes to This Policy",
        content:
          "We may update this Privacy Policy from time to time. Any changes will be reflected on this page with an updated date. Continued use of the app after changes means you accept the updated policy.",
      },
      {
        number: 8,
        title: "Contact Us",
        content:
          "If you have any questions or concerns about your privacy or how your data is handled, please reach out to us at:",
      },
    ],
  },
];

// ── Smooth scroll helper ──────────────────────────────────────────────────────
function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

// ── Header ────────────────────────────────────────────────────────────────────
export function Header({ onMenuClick }: { onMenuClick: () => void }) {
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
        <a
          href="/"
          className="cursor-pointer select-none bg-transparent border-0 p-0 transition-smooth hover:opacity-80 flex items-center gap-2.5"
          aria-label="Back to home"
        >
          <span
            className="flex items-center justify-center rounded-xl p-1.5"
            style={{
              background: "#fff",
              boxShadow:
                "2px 2px 8px rgba(21,48,200,0.10), -1px -1px 5px rgba(255,255,255,0.9)",
            }}
          >
            <picture>
              <source srcSet="/assets/bongly-logo.webp" type="image/webp" />
              <img
                src="/assets/bongly-logo.png"
                alt="Bongly - Privacy-First Utility Apps for West Bengal"
                className="h-7 w-auto object-contain rounded-lg"
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
            </picture>
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
        </a>
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
export function NavDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;

  const handleScroll = (id: string) => {
    onClose();
    // If on home page, scroll; otherwise navigate home first
    if (window.location.pathname === "/") {
      setTimeout(() => scrollToSection(id), 50);
    } else {
      window.location.href = `/#${id}`;
    }
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
            <picture>
              <source srcSet="/assets/bongly-logo.webp" type="image/webp" />
              <img
                src="/assets/bongly-logo.png"
                alt="Bongly Logo"
                className="h-7 w-auto object-contain rounded-lg"
                loading="eager"
                decoding="async"
              />
            </picture>
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
      className="aurora-bg flex items-center justify-center"
      style={{ minHeight: "40vh", paddingTop: "96px", paddingBottom: "72px" }}
    >
      <div className="text-center px-6 max-w-2xl mx-auto">
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
            <picture>
              <source srcSet="/assets/bongly-logo.webp" type="image/webp" />
              <img
                src="/assets/bongly-logo.png"
                alt="Bongly - Privacy-First Utility Apps for West Bengal"
                className="h-20 w-auto object-contain rounded-2xl drop-shadow-lg"
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
            </picture>
          </span>
        </div>

        {/* Pill tag */}
        <div
          className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full text-[13px] font-semibold tracking-wide glass-base elevated-shadow"
          style={{ color: "#1530C8" }}
        >
          <span
            className="w-2 h-2 rounded-full inline-block"
            style={{ background: "#1530C8", opacity: 0.7 }}
          />
          Privacy-First Utility Apps
        </div>

        <h1 className="sr-only">
          Bongly – Privacy-First Apps for Bankura & West Bengal
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
        contentVisibility: "auto",
        containIntrinsicSize: "0 600px",
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
        {/* overflow:visible so glow shadows below cards are never clipped */}
        <div
          className="flex flex-wrap justify-center gap-10"
          style={{ overflow: "visible" }}
        >
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
    /* Extra padding-bottom so the bottom glow shadow bleeds out fully */
    <div
      className="glow-card-wrapper w-full max-w-sm"
      style={{ overflow: "visible", marginBottom: "16px" }}
    >
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
          <picture>
            <source srcSet={app.logoSrc} type="image/webp" />
            <img
              src={app.logoSrcFallback}
              alt={app.logoAlt}
              className="w-20 h-20 object-contain rounded-2xl"
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          </picture>
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
          <span lang="bn">{app.description}</span>
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
            loading="lazy"
            decoding="async"
          />
        </a>
        <p
          className="text-sm text-center font-medium mt-3"
          style={{ color: "#D97706" }}
        >
          4.7/5 ⭐ (1000+ Active Users)
        </p>
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
        contentVisibility: "auto",
        containIntrinsicSize: "0 500px",
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
          <h2 className="text-3xl font-bold mb-2" style={{ color: "#111827" }}>
            About Bongly
          </h2>
          <p className="text-lg text-gray-500 mb-6 font-medium">
            <span lang="bn">আমাদের সম্পর্কে</span>
          </p>
          <div
            className="glass-card p-8 card-neumorphic border border-indigo-200/50"
            style={{
              background: "rgba(99,102,241,0.10)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              boxShadow:
                "0 8px 32px rgba(99,102,241,0.10), 0 1.5px 8px rgba(99,102,241,0.07)",
            }}
          >
            <p
              className="text-[17px] leading-relaxed"
              style={{ color: "#374151" }}
            >
              <strong className="font-bold">Bongly</strong>{" "}
              <span lang="bn">হলো বাঁকুড়া, পশ্চিমবঙ্গের একটি ছোট ইন্ডি (</span>
              <strong className="font-bold">Indie</strong>
              <span lang="bn">
                ) অ্যাপ স্টুডিও। আমরা কোনো বড় কর্পোরেট কোম্পানি নই; বরং আমাদের শুরুটা হয়েছে
                একটা খুব সাধারণ ভাবনা থেকে—আমাদের চারপাশের মানুষের দৈনন্দিন জীবনের ছোট ছোট
                সমস্যার সহজ ও কার্যকরী সমাধান করা।
              </span>
            </p>
            <p
              className="text-[17px] leading-relaxed mt-4"
              style={{ color: "#374151" }}
            >
              <span lang="bn">
                আমরা বিশ্বাস করি, প্রযুক্তির আসল কাজ হলো মানুষের জীবনকে সহজ করা, জটিল করা
                নয়। তাই আমরা অদরকারি বা হাই-ফাই ফিচারের পেছনে না ছুটে, এমন সব সহজ ও দরকারি
                অ্যাপ তৈরি করি যা প্রতিদিনের জীবনে মানুষের সত্যিকার অর্থে কাজে আসে।
              </span>
            </p>
            <p
              className="text-[17px] leading-relaxed mt-4"
              style={{ color: "#374151" }}
            >
              <span lang="bn">
                <strong>আমাদের উদ্দেশ্য খুব পরিষ্কার:</strong> আমাদের লক্ষ্য শুধু অ্যাপ বানানো
                নয়, বরং আমাদের আশেপাশের এলাকার মানুষের জন্য এমন কিছু তৈরি করা যা তাদের সময়
                বাঁচায় এবং দৈনন্দিন কাজগুলোকে আরও মসৃণ করে। "আমাদের এই পথচলা শুরু হচ্ছে
                একেবারে আমাদের নিজেদের ঘরের আঙিনা—রাইপুর, বাঁকুড়া থেকেই।"
              </span>
            </p>
            <p
              className="text-[17px] leading-relaxed mt-4"
              style={{ color: "#374151" }}
            >
              <span lang="bn">
                একটি ছোট স্টুডিও হিসেবে আমরা প্রতিটি প্রজেক্টে আমাদের সেরাটা দেওয়ার চেষ্টা
                করি। বড় কোম্পানিগুলো হয়তো স্থানীয় মানুষের ছোট ছোট প্রয়োজনগুলো সব সময় বুঝতে
                পারে না, কিন্তু আমরা এখানকারই মানুষ, তাই আপনাদের সমস্যাগুলো আমাদেরও সমস্যা।
              </span>
            </p>
            <p
              className="text-[17px] leading-relaxed mt-4"
              style={{ color: "#374151" }}
            >
              <strong className="font-bold">Bongly</strong>
              <span lang="bn">
                -এর মাধ্যমে আমরা চাই আমাদের নিজেদের এলাকার মানুষের জন্য এমন কিছু সহজ সমাধান
                তৈরি করতে, যা তারা প্রতিদিন নিশ্চিন্তে ব্যবহার করতে পারে।
              </span>
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

// ── Privacy Card ──────────────────────────────────────────────────────────────
function PrivacyCardSection() {
  return (
    <section className="py-10 px-4" style={{ background: "transparent" }}>
      <div
        className="max-w-2xl mx-auto rounded-3xl p-8 text-center border border-teal-200/50"
        style={{
          background: "rgba(20,184,166,0.10)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          boxShadow:
            "0 8px 32px rgba(20,184,166,0.10), 0 1.5px 8px rgba(6,182,212,0.07)",
        }}
      >
        <p className="text-xl font-bold" style={{ color: "#111827" }}>
          <span lang="bn">আপনার তথ্য সুরক্ষিত</span>
        </p>
        <p className="text-base mt-3" style={{ color: "#374151" }}>
          <span lang="bn">
            আমরা আপনার ব্যক্তিগত তথ্যের সর্বোচ্চ নিরাপত্তা নিশ্চিত করি এবং কখনো তৃতীয় পক্ষের
            সাথে শেয়ার করি না। আপনার সাহায্য করাই আমাদের আসল উদ্দেশ্য।
          </span>
        </p>
        <p className="text-sm mt-4 italic" style={{ color: "#9CA3AF" }}>
          Your information is secure. We ensure the highest security for your
          personal information and never share it with third parties. Helping
          you is our true purpose.
        </p>
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
        contentVisibility: "auto",
        containIntrinsicSize: "0 700px",
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
          decoding="async"
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
        contentVisibility: "auto",
        containIntrinsicSize: "0 500px",
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
            className="inline-flex items-center gap-2 px-7 py-3 rounded-2xl font-semibold text-[15px] btn-neumorphic transition-smooth"
            style={{
              color: "#1530C8",
              background: "rgba(255,255,255,0.8)",
              border: "2px solid #1530C8",
            }}
          >
            Read Our Privacy Policy
          </a>
        </div>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────
export function Footer() {
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
        {/* Our Values — 5 mission cards */}
        <div className="w-full mb-10">
          <h2
            className="text-[20px] font-bold mb-6"
            style={{ color: "#1530C8" }}
          >
            Our Values
          </h2>
          <div className="flex flex-col gap-3">
            {/* Card 1 — Our Mission */}
            <div
              className="flex items-start gap-4 rounded-2xl px-5 py-4 text-left"
              style={{
                background: "#fff",
                border: "1px solid rgba(21,48,200,0.08)",
                boxShadow:
                  "2px 2px 10px rgba(21,48,200,0.06), -1px -1px 6px rgba(255,255,255,0.8)",
              }}
            >
              <span
                className="flex-shrink-0 flex items-center justify-center rounded-xl"
                style={{ width: 44, height: 44, background: "#E8EAFF" }}
              >
                <svg
                  aria-hidden="true"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#3D52D5"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="6" />
                  <circle cx="12" cy="12" r="2" />
                </svg>
              </span>
              <div>
                <p
                  className="font-bold text-[14px] mb-0.5"
                  style={{ color: "#111827" }}
                >
                  Our Mission
                </p>
                <p
                  className="text-[13px] leading-relaxed"
                  style={{ color: "#6B7280" }}
                >
                  To empower West Bengal – Bankura through innovative mobile
                  technology that improves daily life
                </p>
              </div>
            </div>

            {/* Card 2 — Innovation */}
            <div
              className="flex items-start gap-4 rounded-2xl px-5 py-4 text-left"
              style={{
                background: "#fff",
                border: "1px solid rgba(21,48,200,0.08)",
                boxShadow:
                  "2px 2px 10px rgba(21,48,200,0.06), -1px -1px 6px rgba(255,255,255,0.8)",
              }}
            >
              <span
                className="flex-shrink-0 flex items-center justify-center rounded-xl"
                style={{ width: 44, height: 44, background: "#E8EAFF" }}
              >
                <svg
                  aria-hidden="true"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#3D52D5"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
                  <path d="M9 18h6" />
                  <path d="M10 22h4" />
                </svg>
              </span>
              <div>
                <p
                  className="font-bold text-[14px] mb-0.5"
                  style={{ color: "#111827" }}
                >
                  Innovation
                </p>
                <p
                  className="text-[13px] leading-relaxed"
                  style={{ color: "#6B7280" }}
                >
                  We constantly push boundaries to create cutting-edge solutions
                </p>
              </div>
            </div>

            {/* Card 3 — User-Centric */}
            <div
              className="flex items-start gap-4 rounded-2xl px-5 py-4 text-left"
              style={{
                background: "#fff",
                border: "1px solid rgba(21,48,200,0.08)",
                boxShadow:
                  "2px 2px 10px rgba(21,48,200,0.06), -1px -1px 6px rgba(255,255,255,0.8)",
              }}
            >
              <span
                className="flex-shrink-0 flex items-center justify-center rounded-xl"
                style={{ width: 44, height: 44, background: "#E8EAFF" }}
              >
                <svg
                  aria-hidden="true"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#3D52D5"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </span>
              <div>
                <p
                  className="font-bold text-[14px] mb-0.5"
                  style={{ color: "#111827" }}
                >
                  User-Centric
                </p>
                <p
                  className="text-[13px] leading-relaxed"
                  style={{ color: "#6B7280" }}
                >
                  Every decision we make puts our users first
                </p>
              </div>
            </div>

            {/* Card 4 — Transparency */}
            <div
              className="flex items-start gap-4 rounded-2xl px-5 py-4 text-left"
              style={{
                background: "#fff",
                border: "1px solid rgba(21,48,200,0.08)",
                boxShadow:
                  "2px 2px 10px rgba(21,48,200,0.06), -1px -1px 6px rgba(255,255,255,0.8)",
              }}
            >
              <span
                className="flex-shrink-0 flex items-center justify-center rounded-xl"
                style={{ width: 44, height: 44, background: "#E8EAFF" }}
              >
                <svg
                  aria-hidden="true"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#3D52D5"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </span>
              <div>
                <p
                  className="font-bold text-[14px] mb-0.5"
                  style={{ color: "#111827" }}
                >
                  Transparency
                </p>
                <p
                  className="text-[13px] leading-relaxed"
                  style={{ color: "#6B7280" }}
                >
                  Clear privacy policies with no hidden clauses or surprises
                </p>
              </div>
            </div>

            {/* Card 5 — User Control */}
            <div
              className="flex items-start gap-4 rounded-2xl px-5 py-4 text-left"
              style={{
                background: "#fff",
                border: "1px solid rgba(21,48,200,0.08)",
                boxShadow:
                  "2px 2px 10px rgba(21,48,200,0.06), -1px -1px 6px rgba(255,255,255,0.8)",
              }}
            >
              <span
                className="flex-shrink-0 flex items-center justify-center rounded-xl"
                style={{ width: 44, height: 44, background: "#E8EAFF" }}
              >
                <svg
                  aria-hidden="true"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#3D52D5"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                  <polyline points="16 11 17.5 12.5 21 9" />
                </svg>
              </span>
              <div>
                <p
                  className="font-bold text-[14px] mb-0.5"
                  style={{ color: "#111827" }}
                >
                  User Control
                </p>
                <p
                  className="text-[13px] leading-relaxed"
                  style={{ color: "#6B7280" }}
                >
                  You have full control over your data and privacy settings
                </p>
              </div>
            </div>
          </div>
        </div>

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
          <a
            data-ocid="footer.link.4"
            href="/#apps"
            className="text-[14px] transition-smooth hover:opacity-80"
            style={{ color: "#6B7280" }}
          >
            Our Apps
          </a>
          <a
            data-ocid="footer.link.5"
            href="/#about"
            className="text-[14px] transition-smooth hover:opacity-80"
            style={{ color: "#6B7280" }}
          >
            About
          </a>
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
          <picture>
            <source srcSet="/assets/bongly-logo.webp" type="image/webp" />
            <img
              src="/assets/bongly-logo.png"
              alt="Bongly Logo"
              className="h-9 w-auto object-contain rounded-xl opacity-90"
              loading="lazy"
              decoding="async"
            />
          </picture>
        </span>

        {/* Bottom text */}
        <p className="text-[13px] mb-1" style={{ color: "#6B7280" }}>
          Made with ❤️ in Bankura, West Bengal, India
        </p>
        <p className="text-[12px]" style={{ color: "#9CA3AF" }}>
          Copyright © {year} Bongly, All rights reserved.
        </p>
      </div>
    </footer>
  );
}

// ── Home Page ─────────────────────────────────────────────────────────────────
function HomePage() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const desc =
      "Bongly makes simple, privacy-first utility apps for the people of West Bengal. Explore Chalok – Rent Car With Driver connecting passengers with trusted local drivers in Bankura district.";
    const ogDesc =
      "Discover simple, privacy-first utility apps for West Bengal. Bongly builds apps like Chalok – Rent Car With Driver for Raipur-Bankura.";
    const ogTitleVal = "Bongly – Privacy-First Utility Apps";
    document.title = "Bongly – Privacy-First Utility Apps for West Bengal";
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", desc);
    document
      .querySelector('meta[property="og:description"]')
      ?.setAttribute("content", ogDesc);
    document
      .querySelector('meta[property="twitter:description"]')
      ?.setAttribute("content", desc);
    document
      .querySelector('meta[property="og:title"]')
      ?.setAttribute("content", ogTitleVal);
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header onMenuClick={() => setDrawerOpen(true)} />
      <NavDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <main className="flex-1">
        <Hero />
        <AppsSection />
        <AboutSection />
        <PrivacyCardSection />
        <BlogSection />
        <PrivacyPromise />
      </main>
      <Footer />
    </div>
  );
}

// ── Privacy Policy Page ───────────────────────────────────────────────────────
function PrivacyPolicyPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const desc =
      "Read Bongly's Privacy Policy. We protect your personal information and never share it with third parties. Learn how we keep your data safe across all Bongly apps.";
    const ogDesc =
      "Bongly Privacy Policy – Your data is protected and never shared with third parties. Transparency and trust are core to everything we build.";
    const ogTitleVal = "Privacy Policy – Bongly";
    document.title = "Privacy Policy – Bongly";
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", desc);
    document
      .querySelector('meta[property="og:description"]')
      ?.setAttribute("content", ogDesc);
    document
      .querySelector('meta[property="twitter:description"]')
      ?.setAttribute("content", desc);
    document
      .querySelector('meta[property="og:title"]')
      ?.setAttribute("content", ogTitleVal);
    return () => {
      const defaultDesc =
        "Bongly makes simple, privacy-first utility apps for the people of West Bengal. Explore Chalok – Rent Car With Driver connecting passengers with trusted local drivers in Bankura district.";
      const defaultOgDesc =
        "Discover simple, privacy-first utility apps for West Bengal. Bongly builds apps like Chalok – Rent Car With Driver for Raipur-Bankura.";
      document.title = "Bongly – Privacy-First Utility Apps for West Bengal";
      document
        .querySelector('meta[name="description"]')
        ?.setAttribute("content", defaultDesc);
      document
        .querySelector('meta[property="og:description"]')
        ?.setAttribute("content", defaultOgDesc);
      document
        .querySelector('meta[property="twitter:description"]')
        ?.setAttribute("content", defaultDesc);
      document
        .querySelector('meta[property="og:title"]')
        ?.setAttribute("content", "Bongly – Privacy-First Utility Apps");
    };
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col font-sans"
      style={{ background: "#ffffff" }}
    >
      <Header onMenuClick={() => setDrawerOpen(true)} />
      <NavDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      <main
        className="flex-1"
        style={{ paddingTop: "64px" }}
        data-ocid="privacy_policy.page"
      >
        {/* Title Section */}
        <div
          className="px-6 py-14"
          style={{
            background:
              "linear-gradient(160deg, rgba(238,242,255,0.8) 0%, rgba(245,247,255,0.95) 100%)",
            borderBottom: "1px solid rgba(21,48,200,0.07)",
          }}
        >
          <div className="max-w-4xl mx-auto">
            <h1
              className="text-4xl sm:text-5xl font-black mb-3 leading-tight"
              style={{
                color: "#1530C8",
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            >
              Privacy Policy
            </h1>
            <p
              className="text-[15px]"
              style={{ color: "#6B7280" }}
              data-ocid="privacy_policy.last_updated"
            >
              Last updated: April 19, 2026
            </p>
          </div>
        </div>

        {/* Content Area */}
        <div className="max-w-4xl mx-auto px-6 py-12">
          {PRIVACY_POLICIES.map((policy, policyIdx) => (
            <AppPolicySection
              key={policy.id}
              policy={policy}
              index={policyIdx + 1}
              isLast={policyIdx === PRIVACY_POLICIES.length - 1}
            />
          ))}

          {/* Future apps placeholder note */}
          <div
            className="mt-8 py-5 px-6 rounded-2xl text-center"
            style={{
              background: "rgba(21,48,200,0.03)",
              border: "1px dashed rgba(21,48,200,0.15)",
            }}
          >
            <p className="text-[14px]" style={{ color: "#9CA3AF" }}>
              More app privacy policies will be added here as we grow.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function AppPolicySection({
  policy,
  index,
  isLast,
}: {
  policy: AppPolicy;
  index: number;
  isLast: boolean;
}) {
  return (
    <>
      {/* App section divider with label */}
      <div className="flex items-center gap-4 mb-8">
        <div
          className="flex-1 h-px"
          style={{ background: "rgba(21,48,200,0.12)" }}
        />
        <span
          className="px-4 py-1.5 rounded-full text-[13px] font-bold tracking-wider uppercase glass-base btn-neumorphic"
          style={{ color: "#1530C8", whiteSpace: "nowrap" }}
          data-ocid={`privacy_policy.app_section.${index}`}
        >
          ── {policy.appName} ──
        </span>
        <div
          className="flex-1 h-px"
          style={{ background: "rgba(21,48,200,0.12)" }}
        />
      </div>

      {/* Policy card */}
      <article
        className="glass-card card-neumorphic mb-6 overflow-hidden"
        style={{ background: "rgba(255,255,255,0.85)" }}
        data-ocid={`privacy_policy.app_card.${index}`}
      >
        {/* Card header */}
        <div
          className="px-8 pt-8 pb-6"
          style={{ borderBottom: "1px solid rgba(21,48,200,0.07)" }}
        >
          <h2
            className="text-2xl font-bold mb-3"
            style={{
              color: "#1530C8",
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            {policy.appName} — Privacy Policy
          </h2>
          <p
            className="text-[15px] leading-relaxed"
            style={{ color: "#374151" }}
          >
            {policy.intro}
          </p>
        </div>

        {/* Numbered sections */}
        <div className="px-8 py-6 flex flex-col gap-7">
          {policy.sections.map((section) => (
            <PolicySectionItem key={section.number} section={section} />
          ))}
        </div>
      </article>

      {/* Divider between multiple apps */}
      {!isLast && (
        <div
          className="my-10 w-full h-px"
          style={{ background: "rgba(21,48,200,0.08)" }}
        />
      )}
    </>
  );
}

function PolicySectionItem({ section }: { section: PolicySection }) {
  // Special handling for "Contact Us" section — render email as link
  const isContactSection = section.number === 8;

  return (
    <div data-ocid={`privacy_policy.section.${section.number}`}>
      <h3
        className="text-[16px] font-bold mb-2 flex items-baseline gap-2"
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
      >
        <span
          className="inline-flex items-center justify-center rounded-lg text-[12px] font-black flex-shrink-0"
          style={{
            background: "rgba(21,48,200,0.08)",
            color: "#1530C8",
            width: "24px",
            height: "24px",
          }}
        >
          {section.number}
        </span>
        <span style={{ color: "#1530C8" }}>{section.title}</span>
      </h3>
      <div className="pl-8">
        <p className="text-[15px] leading-relaxed" style={{ color: "#374151" }}>
          {section.content}
          {isContactSection && (
            <>
              {" "}
              <a
                href="mailto:support@bongly.in"
                className="font-semibold transition-smooth hover:opacity-75 inline-flex items-center gap-1"
                style={{ color: "#1530C8" }}
                data-ocid="privacy_policy.contact_email"
              >
                <Mail size={13} strokeWidth={2} />
                support@bongly.in
              </a>
              <br />
              <span
                className="text-[15px] leading-relaxed mt-1 block"
                style={{ color: "#374151" }}
              >
                We are happy to help.
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  );
}

// ── Terms & Conditions Data ───────────────────────────────────────────────────

type TermsSection = {
  number: number;
  title: string;
  content: string;
};

type AppTerms = {
  id: string;
  appName: string;
  sections: TermsSection[];
};

const TERMS_CONDITIONS: AppTerms[] = [
  {
    id: "chalok",
    appName: "Chalok",
    sections: [
      {
        number: 1,
        title: "Accuracy of Information",
        content:
          "You must provide truthful and accurate information including your full name, nickname, vehicle number, and vehicle category. The uploaded photo must clearly show the driver, the vehicle, and the number plate together.",
      },
      {
        number: 2,
        title: "User Safety & Professional Conduct",
        content:
          "You agree to maintain professional behavior with all passengers. Any form of harassment, misbehavior, or demanding extra fare beyond agreed rates is strictly prohibited and may lead to permanent account suspension.",
      },
      {
        number: 3,
        title: "Real-time Status Updates",
        content:
          'You must update your status to "Busy" whenever you are unavailable or on a trip. Keeping an inaccurate status may mislead passengers.',
      },
      {
        number: 4,
        title: "Limitation of Liability",
        content:
          "This application is a platform to connect drivers and passengers only. Bongly is not responsible for any accidents, legal disputes, or personal injury occurring during a trip.",
      },
      {
        number: 5,
        title: "Account Verification",
        content:
          "Your registration is subject to verification and approval. We reserve the right to approve or reject any application without explanation.",
      },
      {
        number: 6,
        title: "Account Suspension",
        content:
          "We reserve the right to suspend or permanently remove any account that violates these terms, engages in misconduct, or provides false information.",
      },
      {
        number: 7,
        title: "Changes to Terms",
        content:
          "We may update these terms at any time. Continued use of the app means you accept the updated terms.",
      },
      {
        number: 8,
        title: "Contact Us",
        content: "For any questions regarding these terms:",
      },
    ],
  },
];

// ── Terms Page ────────────────────────────────────────────────────────────────
function TermsPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const desc =
      "Review Bongly's Terms & Conditions. Guidelines for using Bongly apps including Chalok. Understand your rights, responsibilities, and our commitments to you.";
    const ogDesc =
      "Bongly Terms & Conditions – Guidelines and legal information for using our privacy-first utility apps including Chalok.";
    const ogTitleVal = "Terms & Conditions – Bongly";
    document.title = "Terms & Conditions – Bongly";
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", desc);
    document
      .querySelector('meta[property="og:description"]')
      ?.setAttribute("content", ogDesc);
    document
      .querySelector('meta[property="twitter:description"]')
      ?.setAttribute("content", desc);
    document
      .querySelector('meta[property="og:title"]')
      ?.setAttribute("content", ogTitleVal);
    return () => {
      const defaultDesc =
        "Bongly makes simple, privacy-first utility apps for the people of West Bengal. Explore Chalok – Rent Car With Driver connecting passengers with trusted local drivers in Bankura district.";
      const defaultOgDesc =
        "Discover simple, privacy-first utility apps for West Bengal. Bongly builds apps like Chalok – Rent Car With Driver for Raipur-Bankura.";
      document.title = "Bongly – Privacy-First Utility Apps for West Bengal";
      document
        .querySelector('meta[name="description"]')
        ?.setAttribute("content", defaultDesc);
      document
        .querySelector('meta[property="og:description"]')
        ?.setAttribute("content", defaultOgDesc);
      document
        .querySelector('meta[property="twitter:description"]')
        ?.setAttribute("content", defaultDesc);
      document
        .querySelector('meta[property="og:title"]')
        ?.setAttribute("content", "Bongly – Privacy-First Utility Apps");
    };
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col font-sans"
      style={{ background: "#ffffff" }}
    >
      <Header onMenuClick={() => setDrawerOpen(true)} />
      <NavDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      <main
        className="flex-1"
        style={{ paddingTop: "64px" }}
        data-ocid="terms.page"
      >
        {/* Title Section */}
        <div
          className="px-6 py-14"
          style={{
            background:
              "linear-gradient(160deg, rgba(238,242,255,0.8) 0%, rgba(245,247,255,0.95) 100%)",
            borderBottom: "1px solid rgba(21,48,200,0.07)",
          }}
        >
          <div className="max-w-4xl mx-auto">
            <h1
              className="text-4xl sm:text-5xl font-black mb-3 leading-tight"
              style={{
                color: "#1530C8",
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            >
              Terms &amp; Conditions
            </h1>
            <p
              className="text-[15px]"
              style={{ color: "#6B7280" }}
              data-ocid="terms.last_updated"
            >
              Last updated: April 19, 2026
            </p>
          </div>
        </div>

        {/* Content Area */}
        <div className="max-w-4xl mx-auto px-6 py-12">
          {TERMS_CONDITIONS.map((terms, termsIdx) => (
            <AppTermsSection
              key={terms.id}
              terms={terms}
              index={termsIdx + 1}
              isLast={termsIdx === TERMS_CONDITIONS.length - 1}
            />
          ))}

          {/* Future apps placeholder note */}
          <div
            className="mt-8 py-5 px-6 rounded-2xl text-center"
            style={{
              background: "rgba(21,48,200,0.03)",
              border: "1px dashed rgba(21,48,200,0.15)",
            }}
          >
            <p className="text-[14px]" style={{ color: "#9CA3AF" }}>
              More app terms will be added here as we grow.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function AppTermsSection({
  terms,
  index,
  isLast,
}: {
  terms: AppTerms;
  index: number;
  isLast: boolean;
}) {
  return (
    <>
      {/* App section divider with label */}
      <div className="flex items-center gap-4 mb-8">
        <div
          className="flex-1 h-px"
          style={{ background: "rgba(21,48,200,0.12)" }}
        />
        <span
          className="px-4 py-1.5 rounded-full text-[13px] font-bold tracking-wider uppercase glass-base btn-neumorphic"
          style={{ color: "#1530C8", whiteSpace: "nowrap" }}
          data-ocid={`terms.app_section.${index}`}
        >
          ── {terms.appName} ──
        </span>
        <div
          className="flex-1 h-px"
          style={{ background: "rgba(21,48,200,0.12)" }}
        />
      </div>

      {/* Terms card */}
      <article
        className="glass-card card-neumorphic mb-6 overflow-hidden"
        style={{ background: "rgba(255,255,255,0.85)" }}
        data-ocid={`terms.app_card.${index}`}
      >
        {/* Card header */}
        <div
          className="px-8 pt-8 pb-6"
          style={{ borderBottom: "1px solid rgba(21,48,200,0.07)" }}
        >
          <h2
            className="text-2xl font-bold"
            style={{
              color: "#1530C8",
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            {terms.appName} — Terms &amp; Conditions
          </h2>
        </div>

        {/* Numbered sections */}
        <div className="px-8 py-6 flex flex-col gap-7">
          {terms.sections.map((section) => (
            <TermsSectionItem key={section.number} section={section} />
          ))}
        </div>
      </article>

      {/* Divider between multiple apps */}
      {!isLast && (
        <div
          className="my-10 w-full h-px"
          style={{ background: "rgba(21,48,200,0.08)" }}
        />
      )}
    </>
  );
}

function TermsSectionItem({ section }: { section: TermsSection }) {
  const isContactSection = section.number === 8;

  return (
    <div data-ocid={`terms.section.${section.number}`}>
      <h3
        className="text-[16px] font-bold mb-2 flex items-baseline gap-2"
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
      >
        <span
          className="inline-flex items-center justify-center rounded-lg text-[12px] font-black flex-shrink-0"
          style={{
            background: "rgba(21,48,200,0.08)",
            color: "#1530C8",
            width: "24px",
            height: "24px",
          }}
        >
          {section.number}
        </span>
        <span style={{ color: "#1530C8" }}>{section.title}</span>
      </h3>
      <div className="pl-8">
        <p className="text-[15px] leading-relaxed" style={{ color: "#374151" }}>
          {section.content}
          {isContactSection && (
            <>
              {" "}
              <a
                href="mailto:support@bongly.in"
                className="font-semibold transition-smooth hover:opacity-75 inline-flex items-center gap-1"
                style={{ color: "#1530C8" }}
                data-ocid="terms.contact_email"
              >
                <Mail size={13} strokeWidth={2} />
                support@bongly.in
              </a>
            </>
          )}
        </p>
      </div>
    </div>
  );
}

// ── Router Setup ──────────────────────────────────────────────────────────────

const rootRoute = createRootRoute();

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const privacyPolicyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/privacy-policy",
  component: PrivacyPolicyPage,
});

const termsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/terms",
  component: TermsPage,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  privacyPolicyRoute,
  termsRoute,
]);

const router = createRouter({
  routeTree,
  defaultPreload: "intent",
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// ── App default export ────────────────────────────────────────────────────────
export default function App() {
  return <RouterProvider router={router} />;
}
