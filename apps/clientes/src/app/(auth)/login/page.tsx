"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@kosmos/ui"
import { RotateCw } from "lucide-react"

const inputClasses =
  "w-full border-0 border-b border-border bg-transparent px-0 py-2.5 text-[15px] text-foreground placeholder:text-foreground-muted focus:border-b-primary focus:outline-none focus:ring-0 transition-colors"

const labelClasses = "block text-[13px] font-medium text-foreground-secondary"

export default function LoginPage() {
  const router = useRouter()
  const [paso, setPaso] = useState<"credenciales" | "otp">("credenciales")
  const [email, setEmail] = useState("")
  const [contrasena, setContrasena] = useState("")
  const [codigo, setCodigo] = useState(["", "", "", ""])
  const [reenviado, setReenviado] = useState(false)
  const inputsRef = useRef<(HTMLInputElement | null)[]>([])

  function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setPaso("otp")
  }

  function handleOTPChange(index: number, value: string) {
    if (value.length > 1) return
    const nuevo = [...codigo]
    nuevo[index] = value
    setCodigo(nuevo)
    if (value && index < 3) {
      inputsRef.current[index + 1]?.focus()
    }
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent) {
    if (e.key === "Backspace" && !codigo[index] && index > 0) {
      inputsRef.current[index - 1]?.focus()
    }
  }

  function handlePaste(e: React.ClipboardEvent) {
    e.preventDefault()
    const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 4)
    if (!text) return
    const nuevo = [...codigo]
    for (let i = 0; i < text.length; i++) {
      nuevo[i] = text[i]
    }
    setCodigo(nuevo)
    const focusIndex = Math.min(text.length, 3)
    inputsRef.current[focusIndex]?.focus()
  }

  function handleVerificar(e: React.FormEvent) {
    e.preventDefault()
    router.push("/estudios")
  }

  function handleReenviar() {
    setReenviado(true)
    setTimeout(() => setReenviado(false), 3000)
  }

  if (paso === "otp") {
    return (
      <div>
        <h1 className="text-2xl font-semibold text-primary mb-2">
          Verificacion de acceso
        </h1>
        <p className="text-sm text-foreground-secondary leading-relaxed mb-10">
          Enviamos un codigo de verificacion a{" "}
          <strong className="text-foreground">{email || "m@ejemplo.com"}</strong>
        </p>

        <form onSubmit={handleVerificar}>
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <label className="text-[13px] font-medium text-foreground-secondary">
                Codigo OTP
              </label>
              <button
                type="button"
                onClick={handleReenviar}
                className="flex items-center gap-1 text-[13px] text-foreground-secondary hover:text-primary transition-colors"
              >
                <RotateCw className="h-3 w-3" />
                {reenviado ? "Codigo reenviado" : "Reenviar codigo"}
              </button>
            </div>

            <div className="flex gap-3" onPaste={handlePaste}>
              {codigo.map((digito, i) => (
                <input
                  key={i}
                  ref={(el) => {
                    inputsRef.current[i] = el
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digito}
                  onChange={(e) => handleOTPChange(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  className="h-14 w-14 rounded border border-border text-center text-2xl font-semibold text-foreground focus:border-primary focus:outline-none focus:ring-[3px] focus:ring-primary/10 transition-all"
                />
              ))}
            </div>
          </div>

          <Button type="submit" className="w-full" size="lg">
            Iniciar sesion
          </Button>

          <button
            type="button"
            onClick={() => {
              setPaso("credenciales")
              setCodigo(["", "", "", ""])
            }}
            className="mt-4 w-full text-center text-sm text-foreground-secondary hover:text-foreground transition-colors"
          >
            Volver al login
          </button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-foreground mb-10">
        Iniciar sesion
      </h1>

      <form onSubmit={handleLogin} className="space-y-7">
        <div>
          <label htmlFor="email" className={labelClasses}>
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="m@ejemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClasses}
            required
          />
        </div>

        <div>
          <label htmlFor="contrasena" className={labelClasses}>
            Contrasena
          </label>
          <input
            id="contrasena"
            type="password"
            placeholder="••••••••"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            className={inputClasses}
            required
          />
        </div>

        <Button type="submit" className="w-full mt-4" size="lg">
          Iniciar sesion
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-foreground-secondary">
        No tienes cuenta?{" "}
        <Link
          href="/registro"
          className="font-medium text-primary hover:text-primary-dark"
        >
          Crear cuenta
        </Link>
      </p>
    </div>
  )
}
