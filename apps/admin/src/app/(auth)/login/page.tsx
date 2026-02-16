"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button, Input, Label, Card, CardContent, CardHeader, CardTitle, CardDescription } from "@kosmos/ui"
import { ShieldCheck, ArrowRight, Loader2 } from "lucide-react"

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
    <Card className="w-full max-w-[420px] shadow-lg border-0">
      <CardHeader className="text-center pb-2">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
          <ShieldCheck className="h-6 w-6 text-primary" />
        </div>
        <CardTitle className="text-xl">
          {step === "credentials" ? "Panel de Administración" : "Verificación 2FA"}
        </CardTitle>
        <CardDescription>
          {step === "credentials"
            ? "Ingresá tus credenciales para acceder al backoffice"
            : `Ingresá el código enviado a ${email}`}
        </CardDescription>
      </CardHeader>

      <CardContent>
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
            <Button type="submit" disabled={loading} className="w-full mt-2">
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  Continuar
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>
        ) : (
          <form onSubmit={handleVerify} className="flex flex-col gap-5">
            <div className="flex justify-center gap-2">
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
                  className="h-12 w-12 rounded border border-border bg-white text-center text-lg font-semibold text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              ))}
            </div>
            <p className="text-center text-xs text-foreground-muted">
              ¿No recibiste el código?{" "}
              <button type="button" className="text-primary hover:underline">
                Reenviar
              </button>
            </p>
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Verificar e ingresar"
              )}
            </Button>
            <button
              type="button"
              onClick={() => setStep("credentials")}
              className="text-sm text-foreground-secondary hover:text-foreground transition-colors text-center"
            >
              Volver al login
            </button>
          </form>
        )}
      </CardContent>
    </Card>
  )
}
