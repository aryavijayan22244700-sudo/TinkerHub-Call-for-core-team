import Link from "next/link";
import Image from "next/image";
import DecorativeBubbles from "./DecorativeBubbles";

export default function Hero() {
  return (
    <section className="paper-grain border-b border-line relative overflow-visible">
      <DecorativeBubbles />
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 md:grid-cols-[1.1fr_0.9fr] md:py-16">
        <div className="flex flex-col justify-center">
          <p className="inline-block w-fit rounded-full border border-rust/30 bg-rust/10 px-4 py-2 font-hand text-2xl text-rust shadow-[0_8px_24px_-16px_rgba(176,74,46,0.8)]">
            Call for Core Team 2026
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-medium leading-[1.08] tracking-tight text-ink md:text-6xl">
            Ready to lead, build, and make an impact?
          </h1>
          <p className="mt-6 max-w-2xl font-body text-base text-ink-soft md:text-lg">
            Apply for one of the open core team roles and help shape the next chapter of student-driven learning, outreach, and community building.
          </p>
          <div className="mt-8">
            <a
              href="https://wiki.tinkerhub.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-card bg-ink px-6 py-3 font-body text-sm font-semibold text-paper-card transition-transform hover:-translate-y-0.5"
            >
              Read the TinkerHub wiki
            </a>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div className="w-full max-w-md overflow-hidden rounded-card border border-line bg-paper-card p-3 shadow-[0_18px_45px_-24px_rgba(43,36,28,0.45)]">
            <Image
              src="/core-team-illustration.svg"
              alt="Illustration of people collaborating on a core team project"
              width={640}
              height={480}
              className="h-auto w-full rounded-card"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
