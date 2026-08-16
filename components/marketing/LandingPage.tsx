import type { ReactNode } from "react";
import Link from "next/link";

const screens = [
  {
    name: "Journey",
    question: "Where am I going?",
    body: "A path, a greeting, and one next move. Not a wall of charts.",
  },
  {
    name: "Money",
    question: "Where is my money?",
    body: "What stayed, where it sits, and what is worth knowing. The full list can wait.",
  },
  {
    name: "Find",
    question: "What should I know?",
    body: "A few things. Recurring costs, quiet progress, unfinished pieces — not a feed of warnings.",
  },
  {
    name: "Learn",
    question: "What should I understand?",
    body: "A short lesson tied to your own situation, not a library you never open.",
  },
  {
    name: "You",
    question: "What am I working toward?",
    body: "Goals, privacy, export, and the record of what you chose.",
  },
];

const foundations = [
  {
    title: "The math is in the product",
    body: "Balances, cashflow, and projections are calculated in code. They are not improvised in a reply.",
  },
  {
    title: "You can see why",
    body: "A recommendation is tied to a rule and to your data. If we cannot show the reason, we do not show the advice.",
  },
  {
    title: "Knowledge has a source",
    body: "Principles keep a citation. KIRABAKI does not treat a book as a prompt dump.",
  },
  {
    title: "Decisions are remembered",
    body: "What you accepted, what you did, and what changed later — that history is how the system gets better.",
  },
];

const voice = [
  "Some of it stayed.",
  "Three things. None of them a warning.",
  "A buffer, not a score.",
  "This pace is fine. Not a race.",
];

function Wordmark() {
  return (
    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-kb-seal">
      Kirabaki
      <span className="ml-2 font-normal normal-case tracking-normal text-kb-muted">
        financial intelligence
      </span>
    </p>
  );
}

function PrimaryLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="flex h-12 items-center justify-center rounded-xl bg-kb-seal px-6 text-sm font-semibold text-[#fff8f4]"
    >
      {children}
    </Link>
  );
}

function SecondaryLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="flex h-12 items-center justify-center rounded-xl border border-kb-sand px-6 text-sm font-semibold"
    >
      {children}
    </Link>
  );
}

export function LandingPage({ signedIn }: { signedIn: boolean }) {
  return (
    <div className="mx-auto w-full max-w-2xl px-6 pb-20 pt-8 md:pt-12">
      <header className="flex items-center justify-between gap-4">
        <Wordmark />
        <nav className="flex items-center gap-3 text-sm">
          {signedIn ? (
            <Link href="/home" className="font-semibold text-kb-seal">
              Workspace
            </Link>
          ) : (
            <>
              <Link href="/sign-in" className="text-kb-muted">
                Sign in
              </Link>
              <Link href="/sign-up" className="font-semibold text-kb-seal">
                Create account
              </Link>
            </>
          )}
        </nav>
      </header>

      <section className="mt-16 md:mt-24">
        <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
          Don’t worry. We’ll figure this out together.
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-kb-muted">
          KIRABAKI is a financial intelligence system. It helps you see what is happening
          with your money, why it matters, what to do next, and whether you are getting better.
        </p>
        <div className="mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
          {signedIn ? (
            <PrimaryLink href="/home">Open workspace</PrimaryLink>
          ) : (
            <>
              <PrimaryLink href="/sign-up">Create an account</PrimaryLink>
              <SecondaryLink href="/sign-in">Sign in</SecondaryLink>
            </>
          )}
        </div>
      </section>

      <section className="mt-20">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-kb-muted">
          What it is
        </p>
        <h2 className="mt-3 text-2xl font-extrabold tracking-tight">
          Built for the next decision, not another list.
        </h2>
        <p className="mt-4 leading-relaxed text-kb-muted">
          Tracking is an input. KIRABAKI connects your picture, a small set of principles,
          and a clear next step — then checks whether that step helped.
        </p>
      </section>

      <section className="mt-20">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-kb-muted">
          The product
        </p>
        <h2 className="mt-3 text-2xl font-extrabold tracking-tight">Five places. One job each.</h2>
        <ul className="mt-8 space-y-8">
          {screens.map((screen) => (
            <li key={screen.name}>
              <p className="text-sm font-semibold text-kb-seal">{screen.name}</p>
              <p className="mt-1 text-lg font-semibold tracking-tight">{screen.question}</p>
              <p className="mt-2 leading-relaxed text-kb-muted">{screen.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-20">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-kb-muted">
          What compounds
        </p>
        <h2 className="mt-3 text-2xl font-extrabold tracking-tight">
          The system is meant to get better with you.
        </h2>
        <ul className="mt-8 space-y-8">
          {foundations.map((item) => (
            <li key={item.title}>
              <p className="text-lg font-semibold tracking-tight">{item.title}</p>
              <p className="mt-2 leading-relaxed text-kb-muted">{item.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-20">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-kb-muted">
          How it sounds
        </p>
        <h2 className="mt-3 text-2xl font-extrabold tracking-tight">Human first. Then the numbers.</h2>
        <ul className="mt-8 space-y-4">
          {voice.map((line) => (
            <li key={line} className="text-xl font-semibold tracking-tight">
              {line}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-20 rounded-[20px] bg-kb-discovery px-6 py-10 text-[#f7efe4]">
        <h2 className="text-2xl font-extrabold tracking-tight">Start with a workspace.</h2>
        <p className="mt-3 leading-relaxed text-white/60">
          One personal space. A currency you choose. Accounts and goals come next.
        </p>
        <div className="mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
          {signedIn ? (
            <Link
              href="/home"
              className="flex h-12 items-center justify-center rounded-xl bg-kb-seal px-6 text-sm font-semibold text-[#fff8f4]"
            >
              Open workspace
            </Link>
          ) : (
            <Link
              href="/sign-up"
              className="flex h-12 items-center justify-center rounded-xl bg-kb-seal px-6 text-sm font-semibold text-[#fff8f4]"
            >
              Create an account
            </Link>
          )}
        </div>
      </section>

      <footer className="mt-16 text-sm text-kb-muted">
        <p>KIRABAKI · financial intelligence</p>
        <p className="mt-2">
          Need the earlier budget app?{" "}
          <Link href="/budget" className="text-kb-ink underline underline-offset-4">
            Open it here
          </Link>
          .
        </p>
      </footer>
    </div>
  );
}
