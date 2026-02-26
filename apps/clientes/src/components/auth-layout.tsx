import Link from "next/link"

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-white">
      <div className="relative flex w-full max-w-[520px] flex-col justify-center px-12 lg:px-20">
        <Link
          href="/"
          className="text-[28px] font-bold text-foreground tracking-tight mb-14"
        >
          kosmos<span className="text-primary">.</span>
        </Link>
        <div className="animate-in">{children}</div>
      </div>

      <div className="hidden lg:flex flex-1 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B61] via-primary to-[#c4302b]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-white/[0.03]" />

        <div className="absolute top-[12%] right-[15%] w-40 h-40 rounded-full border border-white/[0.12] animate-float" />
        <div className="absolute top-[38%] left-[12%] w-24 h-24 rounded-full border border-white/[0.10] animate-float-slow [animation-delay:1s]" />
        <div className="absolute top-[55%] left-[55%] w-3 h-3 rounded-full bg-white/25 animate-float-reverse [animation-delay:0.5s]" />
        <div className="absolute top-[22%] left-[30%] w-2 h-2 rounded-full bg-white/20 animate-float [animation-delay:2s]" />
        <div className="absolute top-[50%] right-[30%] w-10 h-10 border border-white/[0.12] rotate-45 animate-float-reverse [animation-delay:1.5s]" />
        <div className="absolute bottom-[20%] right-[18%] w-16 h-16 rounded-full border border-white/[0.08] animate-float-slow [animation-delay:3s]" />
        <div className="absolute top-[65%] left-[20%] w-1.5 h-1.5 rounded-full bg-white/30 animate-pulse-slow" />
        <div className="absolute top-[15%] left-[50%] w-2.5 h-2.5 rounded-full bg-white/20 animate-float-slow [animation-delay:2.5s]" />
        <div className="absolute bottom-[35%] left-[40%] w-6 h-6 border border-white/[0.08] rotate-45 animate-float [animation-delay:4s]" />
        <div className="absolute top-[75%] right-[45%] w-20 h-20 rounded-full border border-white/[0.06] animate-float-reverse [animation-delay:2s]" />
        <div className="absolute top-[8%] left-[65%] w-2.5 h-2.5 rounded-full bg-white/20 animate-float [animation-delay:3.5s]" />
        <div className="absolute bottom-[12%] left-[28%] w-8 h-8 border border-white/[0.10] rotate-45 animate-float-slow [animation-delay:1s]" />
        <div className="absolute top-[30%] right-[10%] w-4 h-4 rounded-full bg-white/[0.12] animate-pulse-slow [animation-delay:2s]" />
        <div className="absolute bottom-[45%] left-[65%] w-12 h-12 rounded-full border border-white/[0.07] animate-float [animation-delay:5s]" />

        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          preserveAspectRatio="none"
        >
          <line
            x1="30%"
            y1="22%"
            x2="55%"
            y2="55%"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="1"
          />
          <line
            x1="55%"
            y1="55%"
            x2="85%"
            y2="20%"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="1"
          />
          <line
            x1="12%"
            y1="45%"
            x2="55%"
            y2="55%"
            stroke="rgba(255,255,255,0.04)"
            strokeWidth="1"
          />
          <line
            x1="70%"
            y1="55%"
            x2="82%"
            y2="78%"
            stroke="rgba(255,255,255,0.04)"
            strokeWidth="1"
          />
        </svg>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[320px] font-bold text-white/[0.04] select-none pointer-events-none leading-none">
          k
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-14 pb-16 z-10">
          <p className="text-white/50 text-xs font-medium tracking-[0.2em] uppercase mb-3">
            Plataforma de investigación
          </p>
          <p className="text-white/95 text-[26px] font-light leading-snug tracking-tight">
            Decisiones basadas
            <br />
            en <span className="font-semibold">datos reales.</span>
          </p>
        </div>
      </div>
    </div>
  )
}
