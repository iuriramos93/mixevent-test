"use client";

import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from 'next/link';
import { Clock, MapPin, QrCode } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Order {
  ticket: string;
  date: string;
  eventDate: string;
  eventName: string;
  price: number;
  status: 'completed' | 'upcoming' | 'cancelled';
  location: string;
  description?: string;
  paymentMethod: string;
  paymentStatus: string;
  ticketType: string;
  qrCode: string;
}

const mockOrders: Order[] = [
  {
    ticket: 'TK-003',
    date: '01/03/2024',
    eventDate: '2024-12-15',
    eventName: 'Show de Verão 2024',
    price: 220.00,
    status: 'upcoming',
    location: 'Praia de Copacabana, Rio de Janeiro',
    description: 'O maior show de verão do Rio de Janeiro, com as melhores bandas nacionais.',
    paymentMethod: 'Cartão de Crédito',
    paymentStatus: 'Aprovado',
    ticketType: 'VIP',
    qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=TK-003'
  },
  {
    ticket: 'TK-001',
    date: '15/01/2024',
    eventDate: '2024-01-20',
    eventName: 'Rock in Rio 2024',
    price: 450.00,
    status: 'completed',
    location: 'Cidade do Rock, Rio de Janeiro',
    description: 'O maior festival de rock do mundo.',
    paymentMethod: 'PIX',
    paymentStatus: 'Aprovado',
    ticketType: 'Inteira',
    qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=TK-001'
  }
].sort((a, b) => {
  // Put upcoming events first
  if (a.status === 'upcoming' && b.status !== 'upcoming') return -1;
  if (a.status !== 'upcoming' && b.status === 'upcoming') return 1;
  
  // For completed events, sort by most recent first
  return new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime();
});

export default function DashboardPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    // Simulate API call
    setOrders(mockOrders);
  }, []);

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h2 className="text-xl font-bold mb-4 text-center">Você ainda não comprou nenhum ingresso!</h2>
        <Button 
          asChild
          className="bg-gradient-to-r from-[#6519FF] to-[#00FFA3] text-white hover:opacity-90"
        >
          <Link href="/">
            Comprar Agora
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-xl font-bold mb-8">Histórico de Pedidos</h1>
      <div className="grid gap-6">
        {orders.map((order) => (
          <Card key={order.ticket} className="p-4 lg:p-6 glass-card">
            <div className="flex flex-col lg:flex-row justify-between gap-4">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-lg lg:text-xl font-semibold">{order.eventName}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    order.status === 'upcoming' 
                      ? 'bg-green-500/10 text-green-500' 
                      : 'bg-gray-500/10 text-gray-500'
                  }`}>
                    {order.status === 'upcoming' ? 'Próximo' : 'Realizado'}
                  </span>
                </div>
                <p className="text-foreground/70">Ticket: {order.ticket}</p>
                <p className="text-foreground/70">Data da compra: {order.date}</p>
                <div className="flex items-center gap-2 text-foreground/70">
                  <Clock className="w-4 h-4" />
                  <span>Data do evento: {new Date(order.eventDate).toLocaleDateString('pt-BR')}</span>
                </div>
                <div className="flex items-center gap-2 text-foreground/70">
                  <MapPin className="w-4 h-4" />
                  <span>{order.location}</span>
                </div>
              </div>
              <div className="flex flex-col lg:items-end gap-4">
                <p className="text-xl lg:text-2xl font-bold">
                  R$ {order.price.toFixed(2)}
                </p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button variant="outline" className="w-full sm:w-auto">
                    Transferir Ingresso
                  </Button>
                  <Link href={`/dashboard/orders`}>
                    <Button 
                      className="w-full sm:w-auto bg-gradient-to-r from-[#6519FF] to-[#00FFA3] text-white hover:opacity-90"
                    >
                      Ver Mais
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}