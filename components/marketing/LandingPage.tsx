import Link from "next/link";

const beats = [
  { name: "Journey", line: "One next move. That’s the week." },
  { name: "Find", line: "Three things. None of them a warning." },
  { name: "Money", line: "Some of it stayed. The list can wait." },
] as const;

function PathMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 40" aria-hidden="true">
      <path
        className="kb-draw"
        style={{ animationDelay: "0.55s" }}
        pathLength={1}
        d="M6 30c6-1 8-10 14-10s7 8 14 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle
        className="kb-seal"
        style={{ animationDelay: "1.35s, 2.1s" }}
        cx="34"
        cy="25"
        r="3"
        fill="#E04A30"
      />
    </svg>
  );
}

function FoundMark() {
  return (
    <svg className="h-3 w-7" viewBox="0 0 28 12" aria-hidden="true">
      <path
        className="kb-draw"
        style={{ animationDelay: "1.55s" }}
        pathLength={1}
        d="M1 8c5-1 7-5 13-5s6 5 11 3"
        fill="none"
        stroke="#E04A30"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <circle
        className="kb-seal"
        style={{ animationDelay: "2.2s, 2.8s" }}
        cx="25.5"
        cy="5.8"
        r="1.8"
        fill="#E04A30"
      />
    </svg>
  );
}

function PrimaryCta({
  signedIn,
  className,
  styleDelay,
}: {
  signedIn: boolean;
  className?: string;
  styleDelay?: string;
}) {
  return (
    <div className={className} style={styleDelay ? { animationDelay: styleDelay } : undefined}>
      <Link
        href={signedIn ? "/home" : "/sign-up"}
        className="inline-flex h-12 min-w-[9.5rem] items-center justify-center rounded-full bg-kb-seal px-8 text-sm font-semibold text-[#fff8f4] transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kb-seal"
      >
        {signedIn ? "Continue" : "Let’s go"}
      </Link>
      <p className="mt-3 text-sm text-kb-muted">
        {signedIn ? "Pick up where you left off." : "A name and a password. That’s it for now."}
      </p>
    </div>
  );
}

export function LandingPage({ signedIn }: { signedIn: boolean }) {
  const startHref = signedIn ? "/home" : "/sign-up";

  return (
    <div className="mx-auto w-full max-w-6xl px-6 pb-14 pt-6 md:px-10 md:pb-16 md:pt-8">
      <header className="flex items-center justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-kb-seal">
            Kirabaki
          </p>
          <p className="mt-1 text-xs text-kb-muted">Your financial companion</p>
        </div>
        {signedIn ? (
          <Link
            href="/home"
            className="inline-flex min-h-11 items-center text-sm font-semibold text-kb-seal no-underline hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kb-seal"
          >
            Continue
          </Link>
        ) : (
          <Link
            href="/sign-in"
            className="inline-flex min-h-11 items-center text-sm text-kb-ink no-underline hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kb-seal"
          >
            Sign in
          </Link>
        )}
      </header>

      <section className="mt-14 grid items-center gap-12 md:mt-20 md:grid-cols-[minmax(0,1fr)_minmax(0,20rem)] md:gap-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)]">
        <div>
          <p
            className="kb-rise text-sm font-medium text-kb-seal"
            style={{ animationDelay: "0.05s" }}
          >
            Your money. One next move.
          </p>
          <h1
            className="kb-rise mt-3 max-w-xl text-4xl font-extrabold tracking-tight text-kb-ink md:text-[3.25rem] md:leading-[1.08]"
            style={{ animationDelay: "0.16s" }}
          >
            Don’t worry.
            <br />
            We’ll figure this out.
          </h1>
          <p
            className="kb-rise mt-5 max-w-md text-lg leading-relaxed text-kb-muted"
            style={{ animationDelay: "0.3s" }}
          >
            KIRABAKI notices what changed — then asks you to do one useful thing.
          </p>
          <PrimaryCta
            signedIn={signedIn}
            className="kb-rise mt-8 hidden md:block"
            styleDelay="0.46s"
          />
        </div>

        <div
          className="kb-rise mx-auto w-full max-w-[20rem] md:mx-0"
          style={{ animationDelay: "0.22s" }}
        >
          <Link
            href={startHref}
            aria-label={signedIn ? "Open Journey" : "See KIRABAKI — start"}
            className="kb-phone block rounded-[2rem] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-kb-seal"
          >
            <div className="rounded-[2rem] bg-kb-night p-[7px] shadow-[0_28px_70px_rgba(18,20,26,0.16)]">
              <div className="rounded-[1.55rem] bg-kb-bone px-5 pb-5 pt-3">
                <div className="flex justify-center" aria-hidden="true">
                  <span className="h-3.5 w-16 rounded-full bg-kb-night/90" />
                </div>
                <div className="mt-5 flex items-start justify-between">
                  <div>
                    <p
                      className="kb-rise text-[11px] uppercase tracking-[0.16em] text-kb-seal"
                      style={{ animationDelay: "0.5s" }}
                    >
                      Sunday
                    </p>
                    <p
                      className="kb-rise mt-2 text-2xl font-extrabold tracking-tight"
                      style={{ animationDelay: "0.62s" }}
                    >
                      Hey, you.
                    </p>
                  </div>
                  <PathMark className="mt-1 h-8 w-8 text-kb-ink" />
                </div>
                <p
                  className="kb-rise mt-3 text-sm leading-relaxed text-kb-muted"
                  style={{ animationDelay: "0.78s" }}
                >
                  The emergency fund grew. That’s why this month feels stronger.
                </p>
                <div
                  className="kb-found mt-5 rounded-2xl bg-kb-discovery px-4 py-4 text-[#f7efe4]"
                  style={{ animationDelay: "1.15s" }}
                >
                  <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-kb-seal">
                    <FoundMark />
                    KIRABAKI found
                  </p>
                  <p className="mt-2 text-lg font-extrabold tracking-tight">Those subscriptions crept up.</p>
                  <p className="mt-2 text-sm text-white/55">Up a little. Worth a look — not a lecture.</p>
                  <p className="mt-4 flex h-10 items-center justify-center rounded-full bg-kb-seal text-sm font-semibold">
                    Take a look
                  </p>
                </div>
                <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-kb-night/20" aria-hidden="true" />
              </div>
            </div>
          </Link>
          <p
            className="kb-rise mt-4 text-center text-sm text-kb-muted md:text-left"
            style={{ animationDelay: "1.4s" }}
          >
            Sunday on Journey.
          </p>
        </div>
      </section>

      <PrimaryCta
        signedIn={signedIn}
        className="kb-rise mt-10 md:hidden"
        styleDelay="0.5s"
      />

      <section className="mt-14 md:mt-16" aria-label="How KIRABAKI feels">
        <ol className="relative grid gap-8 md:grid-cols-3 md:gap-10">
          <li className="pointer-events-none absolute inset-x-[16%] top-[7px] hidden md:block" aria-hidden="true">
            <svg className="kb-path-line h-4 w-full" style={{ animationDelay: "1.5s" }} viewBox="0 0 400 16" preserveAspectRatio="none">
              <path d="M4 8 H396" fill="none" stroke="#E2DDD4" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </li>
          {beats.map((beat, index) => (
            <li key={beat.name} className="relative flex gap-4 md:block md:text-center">
              {index < beats.length - 1 ? (
                <span
                  className="absolute left-[7px] top-5 bottom-[-2rem] w-px bg-kb-sand md:hidden"
                  aria-hidden="true"
                />
              ) : null}
              <span
                className="kb-dot relative z-10 mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-kb-seal-soft md:mx-auto md:mt-0"
                style={{ animationDelay: `${1.65 + index * 0.16}s` }}
              >
                <span className="h-2 w-2 rounded-full bg-kb-seal" />
              </span>
              <div
                className="kb-rise"
                style={{ animationDelay: `${1.75 + index * 0.16}s` }}
              >
                <p className="text-sm font-semibold text-kb-seal">{beat.name}</p>
                <p className="mt-1.5 max-w-xs text-lg font-semibold tracking-tight text-kb-ink md:mx-auto">
                  {beat.line}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <footer
        className="kb-rise mt-16 text-sm text-kb-muted"
        style={{ animationDelay: "2.1s" }}
      >
        This pace is fine. Not a race.
      </footer>
    </div>
  );
}
