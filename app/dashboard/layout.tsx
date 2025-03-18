"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { 
  LayoutDashboard, 
  HelpCircle, 
  User, 
  ShoppingBag, 
  MapPin, 
  Send, 
  Home, 
  LogOut,
  MessageSquareMore,
  Phone,
  Clock,
  Menu,
  X
} from 'lucide-react';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

function DashboardNav({ isMobile = false, onClose }: { isMobile?: boolean; onClose?: () => void }) {
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

  const NavContent = () => (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-2 text-foreground hover:text-foreground/80">
          <HelpCircle className="w-5 h-5" />
          Ajuda
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 glass-dropdown">
          <div className="p-4 space-y-4">
            <Link 
              href="/dashboard/support"
              className="flex items-center gap-2 text-foreground hover:text-foreground/80"
              onClick={onClose}
            >
              <MessageSquareMore className="w-4 h-4" />
              Central de Atendimento
            </Link>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-foreground/70">
                <Phone className="w-4 h-4" />
                (11) 99999-9999
              </div>
              <div className="flex items-center gap-2 text-foreground/70">
                <Clock className="w-4 h-4" />
                Seg-Sex: 9h às 18h
                <br />
                Sáb: 9h às 13h
              </div>
            </div>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      {isMobile ? (
        <>
          <SheetClose asChild>
            <Link 
              href="/dashboard/profile" 
              className="flex items-center gap-2 text-foreground hover:text-foreground/80"
              onClick={onClose}
            >
              <User className="w-5 h-5" />
              Meus Dados
            </Link>
          </SheetClose>

          <SheetClose asChild>
            <Link 
              href="/dashboard/orders" 
              className="flex items-center gap-2 text-foreground hover:text-foreground/80"
              onClick={onClose}
            >
              <ShoppingBag className="w-5 h-5" />
              Meus Pedidos
            </Link>
          </SheetClose>

          <SheetClose asChild>
            <Link 
              href="/dashboard/addresses" 
              className="flex items-center gap-2 text-foreground hover:text-foreground/80"
              onClick={onClose}
            >
              <MapPin className="w-5 h-5" />
              Meus Endereços
            </Link>
          </SheetClose>

          <SheetClose asChild>
            <Link 
              href="/dashboard/transfers" 
              className="flex items-center gap-2 text-foreground hover:text-foreground/80"
              onClick={onClose}
            >
              <Send className="w-5 h-5" />
              Minhas Transferências
            </Link>
          </SheetClose>

          <SheetClose asChild>
            <Link 
              href="/" 
              className="flex items-center gap-2 text-foreground hover:text-foreground/80"
              onClick={onClose}
            >
              <Home className="w-5 h-5" />
              Ir para o Site
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
            href="/dashboard/profile" 
            className="flex items-center gap-2 text-foreground hover:text-foreground/80"
          >
            <User className="w-5 h-5" />
            Meus Dados
          </Link>

          <Link 
            href="/dashboard/orders" 
            className="flex items-center gap-2 text-foreground hover:text-foreground/80"
          >
            <ShoppingBag className="w-5 h-5" />
            Meus Pedidos
          </Link>

          <Link 
            href="/dashboard/addresses" 
            className="flex items-center gap-2 text-foreground hover:text-foreground/80"
          >
            <MapPin className="w-5 h-5" />
            Meus Endereços
          </Link>

          <Link 
            href="/dashboard/transfers" 
            className="flex items-center gap-2 text-foreground hover:text-foreground/80"
          >
            <Send className="w-5 h-5" />
            Minhas Transferências
          </Link>

          <Link 
            href="/" 
            className="flex items-center gap-2 text-foreground hover:text-foreground/80"
          >
            <Home className="w-5 h-5" />
            Ir para o Site
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

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Check if user is logged in
    const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true' || 
                      document.cookie.includes('isLoggedIn=true');
    if (!isLoggedIn) {
      router.push('/auth/login');
    }
  }, [router]);

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-background">
      <div className="glass-nav border-b border-border/20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <DashboardNav isMobile={true} onClose={() => setIsOpen(false)} />
              <Link href="/dashboard" className="text-xl lg:text-2xl font-bold text-foreground">
                Bem-Vindo(a), <span className="bg-gradient-to-r from-[#6519FF] to-[#00FFA3] text-transparent bg-clip-text">{sessionStorage.getItem("name")}</span>
              </Link>
            </div>
            <DashboardNav onClose={() => setIsOpen(false)} />
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}