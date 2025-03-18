"use client";

import { Card } from "@/components/ui/card";
import { 
  Users, 
  Ticket, 
  CalendarDays, 
  TrendingUp,
  DollarSign,
  Building2
} from "lucide-react";
import Link from "next/link";

export default function PainelPage() {
  const role = sessionStorage.getItem("role");
  const isAdmin = role === "ADMIN";
  const isProducer = role === "PRODUCER";

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Quick Stats */}
        <Card className="p-6 glass-card hover:bg-foreground/5 transition">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-blue-500/10">
              <TrendingUp className="w-8 h-8 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-foreground/70">Vendas Hoje</p>
              <h3 className="text-2xl font-bold">R$ 12.450</h3>
            </div>
          </div>
        </Card>

        <Card className="p-6 glass-card hover:bg-foreground/5 transition">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-green-500/10">
              <DollarSign className="w-8 h-8 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-foreground/70">Vendas no Mês</p>
              <h3 className="text-2xl font-bold">R$ 145.890</h3>
            </div>
          </div>
        </Card>

        <Card className="p-6 glass-card hover:bg-foreground/5 transition">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-purple-500/10">
              <Ticket className="w-8 h-8 text-purple-500" />
            </div>
            <div>
              <p className="text-sm text-foreground/70">Ingressos Vendidos</p>
              <h3 className="text-2xl font-bold">1.234</h3>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Quick Access */}
        <Link href="/painel/eventos">
          <Card className="p-6 glass-card hover:bg-foreground/5 transition cursor-pointer">
            <div className="flex items-center gap-4">
              <CalendarDays className="w-8 h-8" />
              <div>
                <h3 className="font-semibold">Gerenciar Eventos</h3>
                <p className="text-sm text-foreground/70">Criar e editar eventos</p>
              </div>
            </div>
          </Card>
        </Link>

        <Link href="/painel/ingressos">
          <Card className="p-6 glass-card hover:bg-foreground/5 transition cursor-pointer">
            <div className="flex items-center gap-4">
              <Ticket className="w-8 h-8" />
              <div>
                <h3 className="font-semibold">Gerenciar Ingressos</h3>
                <p className="text-sm text-foreground/70">Controle de ingressos</p>
              </div>
            </div>
          </Card>
        </Link>

        {isAdmin && (
          <Link href="/painel/usuarios">
            <Card className="p-6 glass-card hover:bg-foreground/5 transition cursor-pointer">
              <div className="flex items-center gap-4">
                <Users className="w-8 h-8" />
                <div>
                  <h3 className="font-semibold">Gerenciar Usuários</h3>
                  <p className="text-sm text-foreground/70">Administrar usuários</p>
                </div>
              </div>
            </Card>
          </Link>
        )}

        {isAdmin && (
          <Link href="/painel/produtores">
            <Card className="p-6 glass-card hover:bg-foreground/5 transition cursor-pointer">
              <div className="flex items-center gap-4">
                <Building2 className="w-8 h-8" />
                <div>
                  <h3 className="font-semibold">Gerenciar Produtores</h3>
                  <p className="text-sm text-foreground/70">Administrar produtores</p>
                </div>
              </div>
            </Card>
          </Link>
        )}
      </div>
    </div>
  );
}