"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useCart } from "@/hooks/use-cart";
import { useRouter } from "next/navigation";
import { CreditCard, Barcode as Qrcode, Receipt, LogIn } from "lucide-react";
import Link from 'next/link';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FormData {
  fullName: string;
  email: string;
  cpf: string;
  phone: string;
  cardNumber?: string;
  cardName?: string;
  cardExpiry?: string;
  cardCvv?: string;
  paymentMethod: 'credit' | 'pix' | 'boleto';
  couponCode?: string;
}

export default function CheckoutPage() {
  const { items } = useCart();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    cpf: '',
    phone: '',
    paymentMethod: 'credit'
  });

  useEffect(() => {
    setIsClient(true);
    if (items.length === 0) {
      router.push('/cart');
    }
  }, [items.length, router]);

  const calculateSubtotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const calculateServiceFee = () => {
    return calculateSubtotal() * 0.1; // 10% service fee
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateServiceFee();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Format CPF
    if (name === 'cpf') {
      formattedValue = value
        .replace(/\D/g, '')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1');
    }

    // Format phone
    if (name === 'phone') {
      formattedValue = value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d)/, '$1-$2')
        .replace(/(-\d{4})\d+?$/, '$1');
    }

    // Format card number
    if (name === 'cardNumber') {
      formattedValue = value
        .replace(/\D/g, '')
        .replace(/(\d{4})(\d)/, '$1 $2')
        .replace(/(\d{4})(\d)/, '$1 $2')
        .replace(/(\d{4})(\d)/, '$1 $2')
        .replace(/(\s\d{4})\d+?$/, '$1');
    }

    // Format card expiry
    if (name === 'cardExpiry') {
      formattedValue = value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '$1/$2')
        .replace(/(\/\d{2})\d+?$/, '$1');
    }

    // Format CVV
    if (name === 'cardCvv') {
      formattedValue = value.replace(/\D/g, '').slice(0, 3);
    }

    setFormData(prev => ({ ...prev, [name]: formattedValue }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle payment processing
    console.log('Processing payment:', formData);
    // Redirect to success page
    router.push('/checkout/success');
  };

  if (!isClient) {
    return null;
  }

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              <Card className="p-6 glass-card">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">1. Identifique-se</h2>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="flex items-center gap-2">
                        <LogIn className="w-4 h-4" />
                        Fazer Login
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Login</DialogTitle>
                        <DialogDescription>
                          Entre com sua conta para continuar
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label>Email</Label>
                          <Input
                            type="email"
                            placeholder="seu@email.com"
                            className="bg-white/10 border-white/10"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Senha</Label>
                          <Input
                            type="password"
                            className="bg-white/10 border-white/10"
                          />
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button className="bg-gradient-to-r from-[#6519FF] to-[#00FFA3] text-white hover:opacity-90">
                          Entrar
                        </Button>
                        <div className="text-center text-sm text-foreground/70">
                          Não tem uma conta?{" "}
                          <Link href="/auth/register" className="text-primary hover:underline">
                            Cadastre-se
                          </Link>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Nome Completo</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="bg-white/10 border-white/10"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="bg-white/10 border-white/10"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="cpf">CPF</Label>
                      <Input
                        id="cpf"
                        name="cpf"
                        value={formData.cpf}
                        onChange={handleChange}
                        maxLength={14}
                        className="bg-white/10 border-white/10"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Celular/WhatsApp</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        maxLength={15}
                        className="bg-white/10 border-white/10"
                        required
                      />
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 glass-card">
                <h2 className="text-xl font-semibold mb-4">2. Pagamento</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button
                      type="button"
                      className={`p-4 rounded-lg border ${
                        formData.paymentMethod === 'credit'
                          ? 'border-[#6519FF] bg-[#6519FF]/10'
                          : 'border-white/10 bg-white/5'
                      } flex flex-col items-center gap-2 transition-colors`}
                      onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'credit' }))}
                    >
                      <CreditCard className="w-6 h-6" />
                      <span>Cartão de Crédito</span>
                    </button>
                    <button
                      type="button"
                      className={`p-4 rounded-lg border ${
                        formData.paymentMethod === 'pix'
                          ? 'border-[#6519FF] bg-[#6519FF]/10'
                          : 'border-white/10 bg-white/5'
                      } flex flex-col items-center gap-2 transition-colors`}
                      onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'pix' }))}
                    >
                      <Qrcode className="w-6 h-6" />
                      <span>PIX</span>
                    </button>
                    <button
                      type="button"
                      className={`p-4 rounded-lg border ${
                        formData.paymentMethod === 'boleto'
                          ? 'border-[#6519FF] bg-[#6519FF]/10'
                          : 'border-white/10 bg-white/5'
                      } flex flex-col items-center gap-2 transition-colors`}
                      onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'boleto' }))}
                    >
                      <Receipt className="w-6 h-6" />
                      <span>Boleto</span>
                    </button>
                  </div>

                  {formData.paymentMethod === 'credit' && (
                    <div className="space-y-4 pt-4">
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Número do Cartão</Label>
                        <Input
                          id="cardNumber"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleChange}
                          maxLength={19}
                          className="bg-white/10 border-white/10"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cardName">Nome no Cartão</Label>
                        <Input
                          id="cardName"
                          name="cardName"
                          value={formData.cardName}
                          onChange={handleChange}
                          className="bg-white/10 border-white/10"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="cardExpiry">Validade</Label>
                          <Input
                            id="cardExpiry"
                            name="cardExpiry"
                            value={formData.cardExpiry}
                            onChange={handleChange}
                            maxLength={5}
                            placeholder="MM/AA"
                            className="bg-white/10 border-white/10"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cardCvv">CVV</Label>
                          <Input
                            id="cardCvv"
                            name="cardCvv"
                            value={formData.cardCvv}
                            onChange={handleChange}
                            maxLength={3}
                            className="bg-white/10 border-white/10"
                            required
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Parcelamento</Label>
                          <Select defaultValue="1">
                            <SelectTrigger className="bg-white/10 border-white/10">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">1x de R$ {calculateTotal().toFixed(2)}</SelectItem>
                              <SelectItem value="2">2x de R$ {(calculateTotal() / 2).toFixed(2)}</SelectItem>
                              <SelectItem value="3">3x de R$ {(calculateTotal() / 3).toFixed(2)}</SelectItem>
                              <SelectItem value="4">4x de R$ {(calculateTotal() / 4).toFixed(2)}</SelectItem>
                              <SelectItem value="5">5x de R$ {(calculateTotal() / 5).toFixed(2)}</SelectItem>
                              <SelectItem value="6">6x de R$ {(calculateTotal() / 6).toFixed(2)}</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            </form>
          </div>

          <div className="lg:col-span-1">
            <Card className="p-6 glass-card sticky top-4">
              <h2 className="text-lg font-semibold mb-4">Resumo da Compra</h2>
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-foreground/70">
                      {item.quantity}x {item.eventTitle} ({item.name})
                    </span>
                    <span>R$ {(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="pt-4 border-t">
                  <div className="flex justify-between mb-2">
                    <span className="text-foreground/70">Subtotal</span>
                    <span>R$ {calculateSubtotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-4">
                    <span className="text-foreground/70">Taxa de Serviço</span>
                    <span>R$ {calculateServiceFee().toFixed(2)}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <Input
                      placeholder="Cupom de desconto"
                      className="bg-white/10 border-white/10"
                      value={formData.couponCode}
                      onChange={(e) => setFormData(prev => ({ ...prev, couponCode: e.target.value }))}
                    />
                    <Button variant="outline">Aplicar</Button>
                  </div>
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>R$ {calculateTotal().toFixed(2)}</span>
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#6519FF] to-[#00FFA3] text-white hover:opacity-90"
                  onClick={handleSubmit}
                >
                  {formData.paymentMethod === 'credit' ? 'Comprar Agora' : 'Finalizar Compra'}
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}