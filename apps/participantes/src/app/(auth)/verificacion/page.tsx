"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@kosmos/ui"
import { RotateCw } from "lucide-react"

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
    <div>
      <h2 className="text-xl font-semibold text-foreground mb-1 text-center">
        Verifica tu email
      </h2>
      <p className="text-sm text-foreground-secondary mb-6 text-center">
        Enviamos un codigo a{" "}
        <strong className="text-foreground">carlos@ejemplo.com</strong>
      </p>

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <label className="text-[13px] font-medium text-foreground-secondary">
              Codigo de verificacion
            </label>
            <button
              type="button"
              onClick={handleReenviar}
              className="flex items-center gap-1 text-[13px] text-foreground-secondary hover:text-primary transition-colors"
            >
              <RotateCw className="h-3 w-3" />
              {reenviado ? "Reenviado" : "Reenviar"}
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
                className="h-12 w-12 rounded-lg border border-border text-center text-xl font-semibold text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all"
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
