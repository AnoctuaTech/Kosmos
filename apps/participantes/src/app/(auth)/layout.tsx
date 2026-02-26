export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-background-gray overflow-hidden px-4 py-8">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(0,0,0,0.03) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,65,54,0.06)_0%,_transparent_50%)]" />

      <div className="relative w-full max-w-sm animate-in">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-foreground">
            kosmos<span className="text-primary">.</span>
          </h1>
        </div>
        <div className="rounded-2xl border border-border/50 bg-white shadow-xl shadow-black/[0.06] px-6 pt-6 pb-7">
          {children}
        </div>
      </div>
    </div>
  )
}
