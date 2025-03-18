"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Minus, Plus } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { useRouter } from "next/navigation";
import { format } from 'date-fns';

interface TicketOption {
  id: string;
  name: string;
  price: number;
  description?: string;
}

interface TicketModalProps {
  event: {
    id: string;
    name: string;
    date: string;
    location: string;
    capa_evento: string;
    ticketTypes: any[];
  };
  trigger?: React.ReactNode;
}

export function TicketModal({ event, trigger }: TicketModalProps) {
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [isOpen, setIsOpen] = useState(false);
  const { addToCart } = useCart();
  const router = useRouter();

  const ticketOptions: TicketOption[] = event.ticketTypes;

  const handleQuantityChange = (ticketId: string, delta: number) => {
    setQuantities(prev => {
      const current = prev[ticketId] || 0;
      const newQuantity = Math.max(0, current + delta);
      return {
        ...prev,
        [ticketId]: newQuantity
      };
    });
  };

  const calculateTotal = () => {
    return ticketOptions.reduce((total, ticket) => {
      return total + (ticket.price * (quantities[ticket.id] || 0));
    }, 0);
  };

  const handleAddToCart = () => {
    const selectedTickets = ticketOptions
      .filter(ticket => quantities[ticket.id] > 0)
      .map(ticket => ({
        id: ticket.id,
        eventId: event.id,
        eventTitle: event.name,
        eventDate: event.date,
        eventImage: event.capa_evento,
        name: ticket.name,
        price: ticket.price,
        quantity: quantities[ticket.id]
      }));

    if (selectedTickets.length > 0) {
      selectedTickets.forEach(ticket => {
        addToCart(ticket);
      });
      setIsOpen(false);
      setQuantities({});
      router.push('/cart');
    }
  };

  const hasSelectedTickets = Object.values(quantities).some(q => q > 0);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="w-full bg-gradient-to-r from-[#6519FF] to-[#00FFA3] text-white hover:opacity-90">
            Comprar Ingressos
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Selecionar Ingressos</DialogTitle>
          <DialogDescription>
            {event.name} - {new Date(event.date).toLocaleDateString('pt-BR')} às {format(event.date, 'HH:mm')}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 my-4">
          {ticketOptions.map((ticket) => (
            <div key={ticket.id} className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
              <div>
                <h4 className="font-semibold">{ticket.name}</h4>
                <p className="text-sm text-muted-foreground">{ticket.description}</p>
                <p className="font-semibold mt-1">R$ {ticket.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-lg"
                  onClick={() => handleQuantityChange(ticket.id, -1)}
                  disabled={!quantities[ticket.id]}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center">{quantities[ticket.id] || 0}</span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-lg"
                  onClick={() => handleQuantityChange(ticket.id, 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t pt-4">
          <div className="flex justify-between mb-4">
            <span className="font-semibold">Total</span>
            <span className="font-semibold">R$ {calculateTotal().toFixed(2)}</span>
          </div>
          
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setIsOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              className="flex-1 bg-gradient-to-r from-[#6519FF] to-[#00FFA3] text-white hover:opacity-90"
              onClick={handleAddToCart}
              disabled={!hasSelectedTickets}
            >
              Adicionar ao Carrinho
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}