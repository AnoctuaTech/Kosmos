import Link from "next/link"

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <div className="flex w-full max-w-[480px] flex-col justify-center px-12 lg:px-16">
        <Link href="/" className="text-2xl font-bold text-foreground mb-12">
          kosmos<span className="text-primary">.</span>
        </Link>
        {children}
      </div>

      <div className="hidden lg:block flex-1 relative overflow-hidden bg-gradient-to-br from-primary-light via-primary to-primary-dark">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute -top-32 -left-32 h-[600px] w-[600px] rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-32 -right-32 h-[500px] w-[500px] rounded-full bg-white/10 blur-3xl" />
        </div>
      </div>
    </div>
  )
}
