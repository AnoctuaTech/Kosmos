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
    const focusIndex = Math.min(text.length, 3)
    inputsRef.current[focusIndex]?.focus()
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    router.push("/estudios")
  }

  function handleReenviar() {
    setReenviado(true)
    setTimeout(() => setReenviado(false), 3000)
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-primary mb-2">
        Verifica tu cuenta
      </h1>
      <p className="text-sm text-foreground-secondary leading-relaxed mb-10">
        Ingresa el codigo de verificacion que enviamos a tu email{" "}
        <strong className="text-foreground">m@ejemplo.com</strong>
      </p>

      <form onSubmit={handleSubmit}>
        <div className="mb-8">
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
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                className="h-14 w-14 rounded border border-border text-center text-2xl font-semibold text-foreground focus:border-primary focus:outline-none focus:ring-[3px] focus:ring-primary/10 transition-all"
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
