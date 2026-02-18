"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button, Card, CardContent } from "@kosmos/ui"
import { CheckCircle2, Star } from "lucide-react"

export default function CanjePage() {
  const router = useRouter()
  const [paso, setPaso] = useState<"formulario" | "confirmacion" | "exito">("formulario")
  const [tipoCuenta, setTipoCuenta] = useState<"sinpe" | "transferencia">("sinpe")
  const [cuenta, setCuenta] = useState("")
  const [banco, setBanco] = useState("")

  const premioTitulo = "Tarjeta de regalo Amazon $10"
  const premioPuntos = 1000

  function handleConfirmar() {
    setPaso("confirmacion")
  }

  function handleSolicitar() {
    setPaso("exito")
  }

  if (paso === "exito") {
    return (
      <div className="flex flex-col items-center justify-center px-4 py-12">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
          <CheckCircle2 className="h-8 w-8 text-success" />
        </div>
        <h2 className="text-xl font-semibold text-foreground mb-2">
          Solicitud enviada
        </h2>
        <p className="text-sm text-foreground-secondary mb-6 text-center max-w-xs">
          Tu canje esta siendo procesado. Recibiras una notificacion cuando sea
          aprobado.
        </p>
        <Card className="border-border mb-6 w-full max-w-xs">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-foreground-secondary">Puntos descontados</p>
            <div className="flex items-center justify-center gap-1.5 mt-1">
              <Star className="h-4 w-4 text-primary fill-primary" />
              <span className="text-lg font-bold text-foreground">
                -{premioPuntos.toLocaleString()}
              </span>
            </div>
            <p className="text-xs text-foreground-muted mt-1">Estado: Pendiente de revision</p>
          </CardContent>
        </Card>
        <Button className="w-full max-w-xs" onClick={() => router.push("/premios")}>
          Volver a premios
        </Button>
      </div>
    )
  }

  if (paso === "confirmacion") {
    return (
      <div className="px-4 py-6 md:px-8 max-w-sm mx-auto">
        <h1 className="text-xl font-semibold text-foreground mb-6 text-center">
          Confirmar canje
        </h1>

        <Card className="border-border mb-6">
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
            <div className="border-t border-border pt-3 flex justify-between text-sm">
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

        <p className="text-xs text-foreground-muted text-center mb-6">
          Los puntos se descontaran provisionalmente. Un administrador revisara
          tu solicitud antes del deposito.
        </p>

        <div className="space-y-2">
          <Button className="w-full" size="lg" onClick={handleSolicitar}>
            Confirmar y solicitar
          </Button>
          <button
            onClick={() => setPaso("formulario")}
            className="w-full text-center text-sm font-medium text-foreground-secondary hover:text-foreground transition-colors py-2"
          >
            Volver
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="px-4 py-6 md:px-8 max-w-sm mx-auto">
      <h1 className="text-xl font-semibold text-foreground mb-1">
        Solicitud de canje
      </h1>
      <p className="text-sm text-foreground-secondary mb-6">
        Ingresa tus datos bancarios para recibir tu premio
      </p>

      <Card className="border-border mb-6">
        <CardContent className="p-4 flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/5">
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
          <label className="block text-[13px] font-medium text-foreground-secondary mb-1">
            Tipo de cuenta
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setTipoCuenta("sinpe")}
              className={`rounded-lg border-2 px-3 py-2.5 text-sm text-center transition-all ${
                tipoCuenta === "sinpe"
                  ? "border-primary bg-primary/5 font-medium text-foreground"
                  : "border-border text-foreground-secondary"
              }`}
            >
              SINPE Movil
            </button>
            <button
              type="button"
              onClick={() => setTipoCuenta("transferencia")}
              className={`rounded-lg border-2 px-3 py-2.5 text-sm text-center transition-all ${
                tipoCuenta === "transferencia"
                  ? "border-primary bg-primary/5 font-medium text-foreground"
                  : "border-border text-foreground-secondary"
              }`}
            >
              Transferencia
            </button>
          </div>
        </div>

        <div>
          <label className="block text-[13px] font-medium text-foreground-secondary mb-1">
            {tipoCuenta === "sinpe" ? "Numero de telefono" : "Numero de cuenta"}
          </label>
          <input
            type="text"
            value={cuenta}
            onChange={(e) => setCuenta(e.target.value)}
            placeholder={tipoCuenta === "sinpe" ? "8888-7777" : "CR12345678901234"}
            className="w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-foreground placeholder:text-foreground-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10"
          />
        </div>

        {tipoCuenta === "transferencia" && (
          <div>
            <label className="block text-[13px] font-medium text-foreground-secondary mb-1">
              Banco
            </label>
            <input
              type="text"
              value={banco}
              onChange={(e) => setBanco(e.target.value)}
              placeholder="Banco Nacional"
              className="w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-foreground placeholder:text-foreground-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10"
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
  )
}
