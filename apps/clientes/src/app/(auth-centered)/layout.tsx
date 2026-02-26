import Link from "next/link"

export default function AuthCenteredLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-background-gray overflow-hidden px-4 py-8">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(0,0,0,0.04) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,65,54,0.06)_0%,_transparent_50%),radial-gradient(ellipse_at_bottom_left,_rgba(255,65,54,0.04)_0%,_transparent_50%)]" />

      <div className="relative w-full max-w-[480px] animate-in">
        <div className="text-center mb-8">
          <Link
            href="/"
            className="inline-block text-[28px] font-bold text-foreground tracking-tight"
          >
            kosmos<span className="text-primary">.</span>
          </Link>
        </div>

        <div className="rounded-2xl border border-border/50 bg-white shadow-xl shadow-black/[0.06] px-8 pt-8 pb-9">
          {children}
        </div>
      </div>
    </div>
  )
}
