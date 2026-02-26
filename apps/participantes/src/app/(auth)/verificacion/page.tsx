"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@kosmos/ui"
import { Mail, RotateCw } from "lucide-react"

export default function VerificacionPage() {
  const router = useRouter()
  const [codigo, setCodigo] = useState(["", "", "", ""])
  const [reenviado, setReenviado] = useState(false)
  const inputsRef = useRef<(HTMLInputElement | null)[]>([])

  function handleChange(index: number, value: string) {
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
    inputsRef.current[Math.min(text.length, 3)]?.focus()
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    router.push("/nse")
  }

  function handleReenviar() {
    setReenviado(true)
    setTimeout(() => setReenviado(false), 3000)
  }

  return (
    <div className="animate-in">
      <div className="text-center mb-6">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/[0.12] to-primary/[0.04] ring-1 ring-primary/[0.08]">
          <Mail className="h-5 w-5 text-primary" />
        </div>
        <h2 className="text-xl font-semibold text-foreground tracking-tight">
          Verificá tu email
        </h2>
        <p className="text-sm text-foreground-secondary mt-1 leading-relaxed">
          Enviamos un código a{" "}
          <span className="text-foreground font-medium">carlos@ejemplo.com</span>
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <label className="text-[13px] font-medium text-foreground-secondary">
              Código de verificación
            </label>
            <button
              type="button"
              onClick={handleReenviar}
              className="flex items-center gap-1.5 text-[13px] text-foreground-muted hover:text-primary transition-colors duration-200"
            >
              <RotateCw className="h-3 w-3" />
              {reenviado ? "Código reenviado" : "Reenviar código"}
            </button>
          </div>

          <div className="flex justify-center gap-3" onPaste={handlePaste}>
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
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                className="h-13 w-13 rounded-xl border-2 border-border/50 bg-background-gray/30 text-center text-xl font-semibold text-foreground focus:border-primary focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/[0.08] transition-all duration-200"
              />
            ))}
          </div>
        </div>

        <Button type="submit" className="w-full" size="lg">
          Verificar
        </Button>
      </form>
    </div>
  )
}
