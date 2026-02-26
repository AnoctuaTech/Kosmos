export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-background-gray overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(0,0,0,0.04) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,65,54,0.06)_0%,_transparent_50%),radial-gradient(ellipse_at_bottom_left,_rgba(255,65,54,0.04)_0%,_transparent_50%)]" />
      <div className="relative animate-in">{children}</div>
    </div>
  )
}
