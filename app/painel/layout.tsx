"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { 
  LayoutDashboard, 
  Users,
  Ticket,
  CalendarDays,
  Settings,
  LogOut,
  Menu,
  BarChart,
  Building2
} from 'lucide-react';
import Link from 'next/link';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

function AdminNav({ isMobile = false, onClose }: { isMobile?: boolean; onClose?: () => void }) {
  const router = useRouter();

  const handleLogout = () => {
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role");
    document.cookie = 'isLoggedIn=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
    router.push('/');
    onClose?.();
  };

  const NavContent = () => {
    const role = sessionStorage.getItem("role");
    const isAdmin = role === "admin";

    return (
      <>
        {isMobile ? (
          <>
            <SheetClose asChild>
              <Link 
                href="/painel" 
                className="flex items-center gap-2 text-foreground hover:text-foreground/80"
                onClick={onClose}
              >
                <BarChart className="w-5 h-5" />
                Dashboard
              </Link>
            </SheetClose>

            {isAdmin && (
              <SheetClose asChild>
                <Link 
                  href="/painel/usuarios" 
                  className="flex items-center gap-2 text-foreground hover:text-foreground/80"
                  onClick={onClose}
                >
                  <Users className="w-5 h-5" />
                  Usuários
                </Link>
              </SheetClose>
            )}

            <SheetClose asChild>
              <Link 
                href="/painel/eventos" 
                className="flex items-center gap-2 text-foreground hover:text-foreground/80"
                onClick={onClose}
              >
                <CalendarDays className="w-5 h-5" />
                Eventos
              </Link>
            </SheetClose>

            <SheetClose asChild>
              <Link 
                href="/painel/ingressos" 
                className="flex items-center gap-2 text-foreground hover:text-foreground/80"
                onClick={onClose}
              >
                <Ticket className="w-5 h-5" />
                Ingressos
              </Link>
            </SheetClose>

            {isAdmin && (
              <SheetClose asChild>
                <Link 
                  href="/painel/produtores" 
                  className="flex items-center gap-2 text-foreground hover:text-foreground/80"
                  onClick={onClose}
                >
                  <Building2 className="w-5 h-5" />
                  Produtores
                </Link>
              </SheetClose>
            )}

            <SheetClose asChild>
              <Link 
                href="/painel/configuracoes" 
                className="flex items-center gap-2 text-foreground hover:text-foreground/80"
                onClick={onClose}
              >
                <Settings className="w-5 h-5" />
                Configurações
              </Link>
            </SheetClose>

            <SheetClose asChild>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-foreground hover:text-foreground/80"
              >
                <LogOut className="w-5 h-5" />
                Sair
              </button>
            </SheetClose>
          </>
        ) : (
          <>
            <Link 
              href="/painel" 
              className="flex items-center gap-2 text-foreground hover:text-foreground/80"
            >
              <BarChart className="w-5 h-5" />
              Dashboard
            </Link>

            {isAdmin && (
              <Link 
                href="/painel/usuarios" 
                className="flex items-center gap-2 text-foreground hover:text-foreground/80"
              >
                <Users className="w-5 h-5" />
                Usuários
              </Link>
            )}

            <Link 
              href="/painel/eventos" 
              className="flex items-center gap-2 text-foreground hover:text-foreground/80"
            >
              <CalendarDays className="w-5 h-5" />
              Eventos
            </Link>

            <Link 
              href="/painel/ingressos" 
              className="flex items-center gap-2 text-foreground hover:text-foreground/80"
            >
              <Ticket className="w-5 h-5" />
              Ingressos
            </Link>

            {isAdmin && (
              <Link 
                href="/painel/produtores" 
                className="flex items-center gap-2 text-foreground hover:text-foreground/80"
              >
                <Building2 className="w-5 h-5" />
                Produtores
              </Link>
            )}

            <Link 
              href="/painel/configuracoes" 
              className="flex items-center gap-2 text-foreground hover:text-foreground/80"
            >
              <Settings className="w-5 h-5" />
              Configurações
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-foreground hover:text-foreground/80"
            >
              <LogOut className="w-5 h-5" />
              Sair
            </button>
          </>
        )}
      </>
    );
  };

  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger className="lg:hidden">
          <Menu className="w-6 h-6" />
        </SheetTrigger>
        <SheetContent side="left" className="glass-card w-[300px]">
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col gap-6 mt-6">
            <NavContent />
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <nav className="hidden lg:flex items-center gap-6">
      <NavContent />
    </nav>
  );
}

export default function PainelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const checkAuth = () => {
      const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true' || 
                        document.cookie.includes('isLoggedIn=true');
      const role = sessionStorage.getItem('role');
      
      if (!isLoggedIn || (!role || (role !== 'ADMIN' && role !== 'PRODUCER'))) {
        router.push('/auth/login');
      }
    };
    
    checkAuth();
  }, [router]);

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-background">
      <div className="glass-nav border-b border-border/20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <AdminNav isMobile={true} onClose={() => setIsOpen(false)} />
              <Link href="/painel" className="text-xl lg:text-2xl font-bold text-foreground">
                Painel de Controle
              </Link>
            </div>
            <AdminNav onClose={() => setIsOpen(false)} />
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}