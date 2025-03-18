"use client";

import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
export default function CartPage() {
  const { items, removeFromCart, updateQuantity } = useCart();
  const router = useRouter();

  const base64ToImage = (base64String: string) => {
    return `data:image/png;base64,${base64String}`;
  };




  const calculateSubtotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const calculateServiceFee = () => {
    return calculateSubtotal() * 0.1; // 10% service fee
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateServiceFee();
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Seu carrinho está vazio</h1>
          <p className="text-foreground/70 mb-8">
            Explore nossos eventos e encontre algo que você goste!
          </p>
          <Button 
            asChild
            className="bg-gradient-to-r from-[#6519FF] to-[#00FFA3] text-white hover:opacity-90"
          >
            <Link href="/">Explorar Eventos</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-8">Carrinho</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {items.map((item) => (
              <Card key={item.id} className="p-4 glass-card">
                <div className="flex gap-4">
                  <div className="relative w-24 h-24 flex-shrink-0">
                    <Image
                      src={base64ToImage(item.eventImage)}
                      alt={item.eventTitle}
                      fill
                      className="object-cover rounded-lg"
                      unoptimized
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-semibold">{item.eventTitle}</h3>
                        <p className="text-sm text-foreground/70">{format(item.eventDate, 'dd/MM/yyyy HH:mm')}</p>
                        <p className="text-sm text-foreground/70">{item.name}</p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-destructive hover:text-destructive/90 p-2"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-2">
                        <button
                          className="p-1 hover:bg-secondary/50 rounded-lg"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          className="p-1 hover:bg-secondary/50 rounded-lg"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <span className="font-semibold">
                        R$ {(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="lg:col-span-1">
            <Card className="p-6 glass-card sticky top-4">
              <h2 className="text-lg font-semibold mb-4">Resumo da Compra</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-foreground/70">Subtotal</span>
                  <span>R$ {calculateSubtotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/70">Taxa de Serviço</span>
                  <span>R$ {calculateServiceFee().toFixed(2)}</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>R$ {calculateTotal().toFixed(2)}</span>
                  </div>
                </div>
                <div className="space-y-2 pt-4">
                  <Button
                    className="w-full bg-gradient-to-r from-[#6519FF] to-[#00FFA3] text-white hover:opacity-90"
                    onClick={() => router.push('/checkout')}
                  >
                    Finalizar Compra
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    asChild
                  >
                    <Link href="/">Continuar Comprando</Link>
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}