"use client";

import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { SearchBar } from "@/components/search-bar";
import { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, Menu, X, Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { useCart } from "@/hooks/use-cart";

import logo from '@/public/mix_evento.png'



export function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
const { items } = useCart();
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <header className="glass-nav sticky top-0 z-50">
        <nav className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <Link href="/" className="text-2xl font-bold text-foreground hover:text-foreground/90 transition">
              <img src={logo.src} alt="Mixevent" className="h-8" />
            </Link>
            
            <div className="hidden md:block flex-1 max-w-2xl mx-8">
              <SearchBar />
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-foreground" />
              ) : (
                <Menu className="w-6 h-6 text-foreground" />
              )}
            </button>

            <div className="hidden md:flex items-center gap-4">
              <ThemeToggle />
              <div className="relative group">
                <button className="text-foreground hover:text-foreground/90 transition py-2 flex items-center gap-2">
                  <Menu className="w-5 h-5" />
                  Categorias
                </button>
                <div className="absolute top-full right-0 glass-dropdown rounded-[6px] p-4 min-w-[200px] hidden group-hover:block">
                  <div className="space-y-2">
                    <Link href="/categorias/shows" className="block text-foreground hover:text-foreground/90 transition">Shows</Link>
                    <Link href="/categorias/teatro" className="block text-foreground hover:text-foreground/90 transition">Teatro</Link>
                    <Link href="/categorias/esportes" className="block text-foreground hover:text-foreground/90 transition">Esportes</Link>
                    <Link href="/categorias/familia" className="block text-foreground hover:text-foreground/90 transition">Família</Link>
                  </div>
                </div>
              </div>
              <Link href="/auth/login" className="text-foreground hover:text-foreground/90 transition">
                Entrar
              </Link>
              <Link href="/auth/register" className="glass-card px-4 py-2 rounded-[6px] hover:bg-foreground/20 transition text-foreground">
                Cadastrar
              </Link>
              <div className="relative">
                <Link href="/cart" className="text-foreground hover:text-foreground/90 transition p-2">
                  <ShoppingCart className="w-6 h-6" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {items.length}
                  </span>
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div className="md:hidden mb-4">
            <SearchBar />
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-foreground/10 mobile-menu">
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-foreground/70 px-2">Categorias</h3>
                  <Link href="/categorias/shows" className="block px-2 py-2 text-foreground hover:bg-foreground/10 rounded-[6px]">Shows</Link>
                  <Link href="/categorias/teatro" className="block px-2 py-2 text-foreground hover:bg-foreground/10 rounded-[6px]">Teatro</Link>
                  <Link href="/categorias/esportes" className="block px-2 py-2 text-foreground hover:bg-foreground/10 rounded-[6px]">Esportes</Link>
                  <Link href="/categorias/familia" className="block px-2 py-2 text-foreground hover:bg-foreground/10 rounded-[6px]">Família</Link>
                </div>
                <div className="space-y-2 pt-2 border-t border-foreground/10">
                  <Link href="/auth/login" className="block px-2 py-2 text-foreground hover:bg-foreground/10 rounded-[6px]">Entrar</Link>
                  <Link href="/auth/register" className="block px-2 py-2 text-foreground hover:bg-foreground/10 rounded-[6px]">Cadastrar</Link>
                </div>
                <div className="pt-2 border-t border-foreground/10 px-2">
                  <ThemeToggle />
                </div>
              </div>
            </div>
          )}
        </nav>
      </header>

      <main className="min-h-screen">
        {children}
      </main>

      <footer className="glass-footer text-foreground py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
            <img src={logo.src} alt="Mixevent" className="h-8" />
              <p className="text-foreground/70 mt-2">Sua plataforma de ingressos online</p>
              <div className="flex gap-4 mt-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-foreground/90">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-foreground/90">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-foreground/90">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-foreground/90">
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Eventos</h4>
              <ul className="space-y-2">
                <li><Link href="/categorias/shows" className="text-foreground/70 hover:text-foreground transition">Shows</Link></li>
                <li><Link href="/categorias/teatro" className="text-foreground/70 hover:text-foreground transition">Teatro</Link></li>
                <li><Link href="/categorias/esportes" className="text-foreground/70 hover:text-foreground transition">Esportes</Link></li>
                <li><Link href="/categorias/familia" className="text-foreground/70 hover:text-foreground transition">Família</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Ajuda</h4>
              <ul className="space-y-2">
                <li><Link href="/como-comprar" className="text-foreground/70 hover:text-foreground transition">Como Comprar</Link></li>
                <li><Link href="/faq" className="text-foreground/70 hover:text-foreground transition">Perguntas Frequentes</Link></li>
                <li><Link href="/privacidade" className="text-foreground/70 hover:text-foreground transition">Política de Privacidade</Link></li>
                <li><Link href="/termos" className="text-foreground/70 hover:text-foreground transition">Termos de Uso</Link></li>
                <li><Link href="/sobre" className="text-foreground/70 hover:text-foreground transition">Sobre Nós</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contato</h4>
              <ul className="space-y-2 text-foreground/70">
                <li>contato@maisticket.com.br</li>
                <li>(11) 1234-5678</li>
                <li className="pt-2">
                  <strong>Horário de Atendimento:</strong>
                  <br />
                  Segunda a Sexta: 09h às 18h
                  <br />
                  Sábado: 09h às 13h
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-foreground/10 pt-8 mb-8">
            <h4 className="font-semibold mb-4 text-center">Formas de Pagamento</h4>
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <img src="https://cdn.icon-icons.com/icons2/2341/PNG/512/visa_payment_method_card_icon_142729.png" 
                   alt="Visa" 
                   className="h-8 opacity-70 hover:opacity-100 transition" />
              <img src="https://cdn.icon-icons.com/icons2/2341/PNG/512/mastercard_payment_method_card_icon_142728.png" 
                   alt="Mastercard" 
                   className="h-8 opacity-70 hover:opacity-100 transition" />
              <img src="https://logospng.org/download/pix/logo-pix-icone-512.png" 
                   alt="PIX" 
                   className="h-8 opacity-70 hover:opacity-100 transition" />
              <img src="https://cdn-icons-png.flaticon.com/512/2168/2168244.png" 
                   alt="Boleto" 
                   className="h-8 opacity-70 hover:opacity-100 transition" />
            </div>

            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <img src="https://cdn.icon-icons.com/icons2/2699/PNG/512/reclame_aqui_logo_icon_170961.png" 
                   alt="Reclame Aqui" 
                   className="h-12 opacity-70 hover:opacity-100 transition" />
              <img src="https://cdn.icon-icons.com/icons2/2699/PNG/512/google_safe_browsing_logo_icon_171058.png" 
                   alt="Google Safe Browsing" 
                   className="h-12 opacity-70 hover:opacity-100 transition" />
              <img src="https://cdn.icon-icons.com/icons2/2699/PNG/512/ssl_security_icon_170993.png" 
                   alt="SSL Secure" 
                   className="h-12 opacity-70 hover:opacity-100 transition" />
            </div>
          </div>

          <div className="text-center text-foreground/70 space-y-2">
            <p>&copy; 2024 Mais Ticket. Todos os direitos reservados.</p>
            <p className="text-sm">Mais Ticket Eventos e Entretenimento LTDA</p>
            <p className="text-sm">CNPJ: 12.345.678/0001-90</p>
            <p className="text-sm">Av. Paulista, 1000 - Bela Vista, São Paulo - SP, 01310-100</p>
          </div>
        </div>
      </footer>
    </ThemeProvider>
  );
}