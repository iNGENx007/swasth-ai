import { useState } from "react";
import { Ripple } from "./ui/ripple";

interface ResearchLink {
  href: string;
  label: string;
  note?: string;
}

interface ResearchItem {
  title: string;
  description: string;
  provider: string;
  links?: ResearchLink[];
  meta: string;
}

const researchItems: ResearchItem[] = [
  {
    title:
      "Swasth AI: Unifying India's Fragmented Healthcare System Through AI-Powered Diagnostics and Model Fusion",
    description:
      "Peer-reviewed research showing how Swasth AI combines CNNs, LSTMs, and Transformer models to deliver accurate health insights. Tested on Indian health data, the system achieved disease detection accuracy above 90% for tuberculosis, diabetes, cancer, and cardiac anomalies.",
    provider: "IEEE ACROSET 2025",
    links: [
      {
        href: "https://doi.org/10.1109/ACROSET66531.2025.11280738",
        label: "Read via DOI",
        note: "Primary",
      },
      {
        href: "https://www.semanticscholar.org/paper/Swasth-AI%3A-Unifying-India's-Fragmented-Healthcare-Singh-Tiwari/29a14a6bf25a401a35c65afffe56e33fd1066b6a#cited-papers",
        label: "Read via Semantic Scholar",
        note: "Fallback",
      },
      {
        href: "https://ieeexplore.ieee.org/document/11280738",
        label: "Read via IEEE Xplore",
        note: "Fallback",
      },
    ],
    meta: "Scopus-indexed publication",
  },
  {
    title: "Patent Filed",
    description:
      "A commercial patent has been filed covering the DoseGuard closed-loop micro-dosing system, including the multi-sensor fusion algorithm, safety envelope logic, and on-demand drug delivery mechanism.",
    provider: "Patent Pending",
    meta: "Closed-loop micro-dosing IP",
  },
  {
    title: "Featured Startup - CU Technology Business Incubator",
    description:
      "Swasth AI is officially recognized and featured by Chandigarh University's Technology Business Incubator as a trailblazing student startup.",
    provider: "Chandigarh University TBI",
    links: [
      {
        href: "https://www.cuchd.in/technology-business-incubator/tbi-startup.php",
        label: "Read more",
      },
    ],
    meta: "Startup recognition",
  },
  {
    title: "Partnership with PharmEasy",
    description:
      "Signed strategic partnership with PharmEasy to enable seamless medicine delivery, prescription management, and e-pharmacy integration within the Swasth AI ecosystem.",
    provider: "PharmEasy",
    meta: "Strategic partnership signed",
  },
];

function ResearchCard({ item }: { item: ResearchItem }) {
  const [hovered, setHovered] = useState(false);

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative rounded-[22px] border p-6 transition-all duration-300"
      style={{
        background: hovered ? "rgba(255,255,255,0.045)" : "rgba(255,255,255,0.022)",
        borderColor: hovered ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.06)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
      }}
    >
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-white/65">
          {item.provider}
        </span>
        <span className="text-xs uppercase tracking-[0.18em] text-white/32">
          {item.meta}
        </span>
      </div>
      <h3 className="mb-3 text-xl font-medium tracking-[-0.03em] text-white/92">
        {item.title}
      </h3>
      <p className="text-sm leading-7 text-white/56 md:text-[15px]">
        {item.description}
      </p>
      {item.links?.length ? (
        <div className="mt-5 space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            {item.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-3 py-2 text-sm font-medium text-white/72 transition-colors hover:border-white/20 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/20"
                aria-label={`${link.label} for ${item.title}`}
              >
                <span>{link.label}</span>
                <span aria-hidden="true" className="transition-transform group-hover/link:translate-x-1">
                  -&gt;
                </span>
              </a>
            ))}
          </div>
          {item.links.length > 1 ? (
            <a
              href={item.links[1].href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-medium text-white/42 transition-colors hover:text-white/78 focus:outline-none focus:text-white"
              aria-label={`Fallback paper options for ${item.title}`}
            >
              If the primary paper host does not open in your browser, use the fallback links above.
            </a>
          ) : null}
        </div>
      ) : null}
    </article>
  );
}

export default function ResearchSection() {
  return (
    <section
      id="research"
      className="relative overflow-hidden bg-[#0A0A0A] px-6 py-20 text-white md:px-10 lg:px-16 lg:py-28"
      style={{
        fontFamily:
          "'SF Pro Display', 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <Ripple mainCircleSize={180} mainCircleOpacity={0.06} numCircles={10} />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <span className="inline-flex rounded-full border border-white/12 bg-white/[0.05] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-white/72">
            Research &amp; Validation
          </span>
          <h2 className="mt-6 text-4xl font-semibold tracking-[-0.04em] md:text-5xl">
            Peer-reviewed. Patent-pending. Partner-backed.
          </h2>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {researchItems.map((item) => (
            <ResearchCard key={item.title} item={item} />
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-10">
          {[
            ["90%+", "Detection accuracy"],
            ["1", "Patent filed"],
            ["32+", "Live product features"],
            ["4", "Validation anchors"],
          ].map(([value, label]) => (
            <div key={label} className="text-center">
              <p className="text-3xl font-semibold tracking-[-0.03em] text-white/88">
                {value}
              </p>
              <p className="mt-1 text-xs uppercase tracking-[0.16em] text-white/30">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
