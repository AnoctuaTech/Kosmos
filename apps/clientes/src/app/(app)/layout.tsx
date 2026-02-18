import { ClientesAppHeader } from "../../components/clientes-app-header"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background-gray">
      <ClientesAppHeader />
      <main>{children}</main>
    </div>
  )
}
