"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button, Card, CardContent } from "@kosmos/ui"
import { CheckCircle2, Star, PartyPopper } from "lucide-react"

export default function CanjePage() {
  const router = useRouter()
  const [paso, setPaso] = useState<"formulario" | "confirmacion" | "exito">("formulario")
  const [tipoCuenta, setTipoCuenta] = useState<"sinpe" | "transferencia">("sinpe")
  const [cuenta, setCuenta] = useState("")
  const [banco, setBanco] = useState("")

  const premioTitulo = "Tarjeta de regalo Amazon $10"
  const premioPuntos = 1000

  const pasoNumero = paso === "formulario" ? 1 : paso === "confirmacion" ? 2 : 3
  const pasos = ["Datos", "Confirmar", "Listo"]

  function handleConfirmar() {
    setPaso("confirmacion")
  }

  function handleSolicitar() {
    setPaso("exito")
  }

  if (paso === "exito") {
    return (
      <div className="flex flex-col items-center justify-center px-4 py-12 animate-in">
        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-success/10 ring-4 ring-success/5">
          <CheckCircle2 className="h-10 w-10 text-success" />
        </div>
        <div className="flex items-center gap-1.5 mb-2">
          <PartyPopper className="h-5 w-5 text-warning" />
          <h2 className="text-xl font-semibold text-foreground">
            ¡Solicitud enviada!
          </h2>
        </div>
        <p className="text-sm text-foreground-secondary mb-6 text-center max-w-xs">
          Tu canje está siendo procesado. Recibirás una notificación cuando sea
          aprobado.
        </p>
        <Card className="border-border/50 mb-6 w-full max-w-xs shadow-sm">
          <CardContent className="p-5 text-center bg-gradient-to-r from-primary/[0.06] to-primary/[0.02]">
            <p className="text-sm text-foreground-secondary mb-1">Puntos descontados</p>
            <div className="flex items-center justify-center gap-2 mt-1">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/[0.1]">
                <Star className="h-4 w-4 text-primary fill-primary" />
              </div>
              <span className="text-xl font-bold text-foreground">
                -{premioPuntos.toLocaleString()}
              </span>
            </div>
            <p className="text-xs text-foreground-muted mt-2">Estado: Pendiente de revisión</p>
          </CardContent>
        </Card>
        <Button className="w-full max-w-xs" size="lg" onClick={() => router.push("/premios")}>
          Volver a premios
        </Button>
      </div>
    )
  }

  return (
    <div className="px-4 py-6 md:px-8 max-w-sm mx-auto animate-in">
      <h1 className="text-xl font-semibold text-foreground mb-1">
        Solicitud de canje
      </h1>
      <p className="text-sm text-foreground-secondary mb-5">
        Ingresá tus datos bancarios para recibir tu premio
      </p>

      <div className="flex items-center gap-2 mb-6">
        {pasos.map((label, i) => (
          <div key={label} className="flex-1 flex flex-col items-center gap-1.5">
            <div className={`h-1.5 w-full rounded-full transition-all duration-300 ${
              i + 1 <= pasoNumero ? "bg-primary" : "bg-gray-100"
            }`} />
            <span className={`text-[11px] font-medium transition-colors duration-200 ${
              i + 1 <= pasoNumero ? "text-primary" : "text-foreground-muted"
            }`}>
              {label}
            </span>
          </div>
        ))}
      </div>

      {paso === "confirmacion" ? (
        <div className="animate-in">
          <Card className="border-border/50 mb-6 shadow-sm">
            <CardContent className="p-5 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-foreground-secondary">Premio</span>
                <span className="font-medium text-foreground">{premioTitulo}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-foreground-secondary">Costo</span>
                <span className="font-semibold text-primary">
                  {premioPuntos.toLocaleString()} pts
                </span>
              </div>
              <div className="border-t border-border/40 pt-3 flex justify-between text-sm">
                <span className="text-foreground-secondary">Tipo</span>
                <span className="font-medium text-foreground capitalize">{tipoCuenta}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-foreground-secondary">Cuenta</span>
                <span className="font-medium text-foreground">{cuenta}</span>
              </div>
              {banco && (
                <div className="flex justify-between text-sm">
                  <span className="text-foreground-secondary">Banco</span>
                  <span className="font-medium text-foreground">{banco}</span>
                </div>
              )}
            </CardContent>
          </Card>

          <p className="text-xs text-foreground-muted text-center mb-6 leading-relaxed">
            Los puntos se descontarán provisionalmente. Un administrador revisará
            tu solicitud antes del depósito.
          </p>

          <div className="space-y-2">
            <Button className="w-full" size="lg" onClick={handleSolicitar}>
              Confirmar y solicitar
            </Button>
            <button
              onClick={() => setPaso("formulario")}
              className="w-full text-center text-sm font-medium text-foreground-secondary hover:text-foreground transition-colors duration-200 py-2"
            >
              Volver
            </button>
          </div>
        </div>
      ) : (
        <div className="animate-in">
          <Card className="border-border/50 mb-6 shadow-sm">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/[0.08] to-primary/[0.04]">
                <Star className="h-5 w-5 text-primary fill-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{premioTitulo}</p>
                <p className="text-xs text-foreground-secondary">
                  {premioPuntos.toLocaleString()} puntos
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <div>
              <label className="block text-[13px] font-medium text-foreground-secondary mb-1.5">
                Tipo de cuenta
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setTipoCuenta("sinpe")}
                  className={`rounded-xl border-2 px-3 py-2.5 text-sm text-center transition-all duration-200 ${
                    tipoCuenta === "sinpe"
                      ? "border-primary bg-primary/5 font-medium text-foreground shadow-sm shadow-primary/5"
                      : "border-border/60 text-foreground-secondary hover:border-border"
                  }`}
                >
                  SINPE Móvil
                </button>
                <button
                  type="button"
                  onClick={() => setTipoCuenta("transferencia")}
                  className={`rounded-xl border-2 px-3 py-2.5 text-sm text-center transition-all duration-200 ${
                    tipoCuenta === "transferencia"
                      ? "border-primary bg-primary/5 font-medium text-foreground shadow-sm shadow-primary/5"
                      : "border-border/60 text-foreground-secondary hover:border-border"
                  }`}
                >
                  Transferencia
                </button>
              </div>
            </div>

            <div>
              <label className="block text-[13px] font-medium text-foreground-secondary mb-1.5">
                {tipoCuenta === "sinpe" ? "Número de teléfono" : "Número de cuenta"}
              </label>
              <input
                type="text"
                value={cuenta}
                onChange={(e) => setCuenta(e.target.value)}
                placeholder={tipoCuenta === "sinpe" ? "8888-7777" : "CR12345678901234"}
                className="w-full rounded-xl border border-border/60 bg-white px-3.5 py-2.5 text-sm text-foreground placeholder:text-foreground-muted/50 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/[0.08] transition-all duration-200"
              />
            </div>

            {tipoCuenta === "transferencia" && (
              <div className="animate-in">
                <label className="block text-[13px] font-medium text-foreground-secondary mb-1.5">
                  Banco
                </label>
                <input
                  type="text"
                  value={banco}
                  onChange={(e) => setBanco(e.target.value)}
                  placeholder="Banco Nacional"
                  className="w-full rounded-xl border border-border/60 bg-white px-3.5 py-2.5 text-sm text-foreground placeholder:text-foreground-muted/50 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/[0.08] transition-all duration-200"
                />
              </div>
            )}

            <Button
              className="w-full"
              size="lg"
              onClick={handleConfirmar}
              disabled={!cuenta.trim()}
            >
              Continuar
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
