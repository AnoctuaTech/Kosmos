"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button, Input, Label } from "@kosmos/ui"
import { ShieldCheck, ArrowRight, Loader2, KeyRound } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [step, setStep] = useState<"credentials" | "2fa">("credentials")
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [code, setCode] = useState(["", "", "", "", "", ""])

  function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setStep("2fa")
    }, 800)
  }

  function handleVerify(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      router.push("/dashboard")
    }, 800)
  }

  function handleCodeChange(index: number, value: string) {
    if (value.length > 1) return
    const newCode = [...code]
    newCode[index] = value
    setCode(newCode)

    if (value && index < 5) {
      const next = document.getElementById(`code-${index + 1}`)
      next?.focus()
    }
  }

  function handleCodeKeyDown(index: number, e: React.KeyboardEvent) {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      const prev = document.getElementById(`code-${index - 1}`)
      prev?.focus()
    }
  }

  return (
    <div className="w-full max-w-[440px]">
      <div className="text-center mb-10">
        <h1 className="text-[28px] font-bold text-foreground tracking-tight">
          kosmos<span className="text-primary">.</span>
        </h1>
        <p className="text-[13px] text-foreground-muted mt-1 tracking-wide">
          administración
        </p>
      </div>

      <div className="rounded-2xl border border-border/50 bg-white shadow-xl shadow-black/[0.06] px-8 pt-8 pb-9">
        <div className="text-center mb-8">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/[0.12] to-primary/[0.04] ring-1 ring-primary/[0.08]">
            {step === "credentials" ? (
              <ShieldCheck className="h-6 w-6 text-primary" />
            ) : (
              <KeyRound className="h-6 w-6 text-primary" />
            )}
          </div>
          <h2 className="text-xl font-semibold text-foreground tracking-tight">
            {step === "credentials" ? "Iniciar sesión" : "Verificación 2FA"}
          </h2>
          <p className="text-sm text-foreground-secondary mt-1.5">
            {step === "credentials"
              ? "Ingresá tus credenciales para acceder al backoffice"
              : `Ingresá el código enviado a ${email}`}
          </p>
        </div>

        {step === "credentials" ? (
          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@kosmos.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full mt-3 group"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  Continuar
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </>
              )}
            </Button>
          </form>
        ) : (
          <form
            onSubmit={handleVerify}
            className="flex flex-col gap-5 animate-in"
          >
            <div className="flex justify-center gap-2.5">
              {code.map((digit, index) => (
                <input
                  key={index}
                  id={`code-${index}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleCodeChange(index, e.target.value)}
                  onKeyDown={(e) => handleCodeKeyDown(index, e)}
                  className="h-12 w-12 rounded-xl border-2 border-border/50 bg-background-gray/30 text-center text-lg font-semibold text-foreground transition-all duration-200 focus:border-primary focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/[0.08]"
                />
              ))}
            </div>
            <p className="text-center text-xs text-foreground-muted">
              ¿No recibiste el código?{" "}
              <button
                type="button"
                className="text-primary font-medium hover:text-primary-dark transition-colors duration-200"
              >
                Reenviar
              </button>
            </p>
            <Button type="submit" disabled={loading} className="w-full mt-1">
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Verificar e ingresar"
              )}
            </Button>
            <button
              type="button"
              onClick={() => setStep("credentials")}
              className="text-sm text-foreground-muted hover:text-foreground transition-colors duration-200 text-center"
            >
              Volver al login
            </button>
          </form>
        )}
      </div>

      <p className="text-center text-xs text-foreground-muted mt-8">
        Acceso restringido al personal autorizado
      </p>
    </div>
  )
}
