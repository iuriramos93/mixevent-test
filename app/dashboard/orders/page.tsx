"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Clock, MapPin, QrCode } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    // Simulate API call
    setOrders(mockOrders);
  }, []);

  const handleTransfer = (order: Order) => {
    // Implement transfer logic
    console.log('Transfer ticket:', order);
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-8">Meus Ingressos</h1>
      <div className="grid gap-6">
        {orders.map((order) => (
          <Card key={order.ticket} className="p-6 glass-card">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-semibold">{order.eventName}</h3>
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
              <div className="flex flex-col md:items-end gap-4">
                <p className="text-2xl font-bold">
                  R$ {order.price.toFixed(2)}
                </p>
                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">Transferir Ingresso</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] glass-card">
                      <DialogHeader>
                        <DialogTitle>Transferir Ingresso</DialogTitle>
                        <DialogDescription>
                          Digite os dados do destinatário
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label>CPF do Destinatário</Label>
                          <Input className="bg-white/10 border-white/10" />
                        </div>
                        <div className="space-y-2">
                          <Label>E-mail do Destinatário</Label>
                          <Input type="email" className="bg-white/10 border-white/10" />
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <Button 
                          onClick={() => handleTransfer(order)}
                          className="bg-gradient-to-r from-[#6519FF] to-[#00FFA3] text-white hover:opacity-90"
                        >
                          Transferir
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        className="bg-gradient-to-r from-[#6519FF] to-[#00FFA3] text-white hover:opacity-90"
                      >
                        Ver Ingresso
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px] glass-card">
                      <DialogHeader>
                        <DialogTitle>Detalhes do Ingresso</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-6 py-4">
                        <div className="flex justify-center">
                          <div className="bg-white p-4 rounded-lg">
                            <img 
                              src={order.qrCode} 
                              alt="QR Code do Ingresso" 
                              className="w-48 h-48"
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-semibold mb-1">Número do Ticket</h4>
                            <p className="text-foreground/70">{order.ticket}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-1">Status</h4>
                            <span className={`px-3 py-1 rounded-full text-sm ${
                              order.status === 'upcoming' 
                                ? 'bg-green-500/10 text-green-500' 
                                : 'bg-gray-500/10 text-gray-500'
                            }`}>
                              {order.status === 'upcoming' ? 'Próximo' : 'Realizado'}
                            </span>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-1">Evento</h4>
                          <p className="text-foreground/70">{order.eventName}</p>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-1">Local</h4>
                          <p className="text-foreground/70">{order.location}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-semibold mb-1">Data do Evento</h4>
                            <p className="text-foreground/70">
                              {new Date(order.eventDate).toLocaleDateString('pt-BR')}
                            </p>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-1">Tipo de Ingresso</h4>
                            <p className="text-foreground/70">{order.ticketType}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-semibold mb-1">Forma de Pagamento</h4>
                            <p className="text-foreground/70">{order.paymentMethod}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-1">Status do Pagamento</h4>
                            <p className="text-green-500">{order.paymentStatus}</p>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-1">Valor</h4>
                          <p className="text-2xl font-bold">R$ {order.price.toFixed(2)}</p>
                        </div>

                        <div className="flex justify-end gap-2">
                          <Button variant="outline">
                            Transferir Ingresso
                          </Button>
                          <Button 
                            className="bg-gradient-to-r from-[#6519FF] to-[#00FFA3] text-white hover:opacity-90"
                          >
                            <QrCode className="w-4 h-4 mr-2" />
                            Baixar QR Code
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}