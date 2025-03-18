"use client";

import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Send, ArrowRight, ArrowLeft } from 'lucide-react';

interface Transfer {
  id: string;
  date: string;
  ticketNumber: string;
  eventName: string;
  type: 'sent' | 'received';
  user: string;
}

const mockTransfers: Transfer[] = [
  {
    id: '1',
    date: '15/02/2024',
    ticketNumber: 'TK-001',
    eventName: 'Rock in Rio 2024',
    type: 'sent',
    user: 'maria.silva@email.com'
  },
  {
    id: '2',
    date: '20/02/2024',
    ticketNumber: 'TK-002',
    eventName: 'Festival de Jazz',
    type: 'received',
    user: 'pedro.santos@email.com'
  }
];

export default function TransfersPage() {
  const [transfers, setTransfers] = useState<Transfer[]>([]);

  useEffect(() => {
    // Simulate API call
    setTransfers(mockTransfers);
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Minhas Transferências</h1>
      
      <div className="grid gap-6">
        {transfers.map((transfer) => (
          <Card key={transfer.id} className="p-6 glass-card">
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#6519FF] to-[#00FFA3] flex items-center justify-center">
                <Send className="w-6 h-6 text-white" />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xl font-semibold">{transfer.eventName}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    transfer.type === 'sent' 
                      ? 'bg-blue-500/10 text-blue-500' 
                      : 'bg-green-500/10 text-green-500'
                  }`}>
                    {transfer.type === 'sent' ? 'Enviado' : 'Recebido'}
                  </span>
                </div>
                
                <div className="flex items-center gap-2 text-foreground/70">
                  <p>Ticket: {transfer.ticketNumber}</p>
                  <span className="text-foreground/50">•</span>
                  <p>{transfer.date}</p>
                </div>

                <div className="flex items-center gap-2 mt-2">
                  {transfer.type === 'sent' ? (
                    <>
                      <span className="text-foreground/70">Você</span>
                      <ArrowRight className="w-4 h-4 text-foreground/50" />
                      <span className="text-foreground/70">{transfer.user}</span>
                    </>
                  ) : (
                    <>
                      <span className="text-foreground/70">{transfer.user}</span>
                      <ArrowLeft className="w-4 h-4 text-foreground/50" />
                      <span className="text-foreground/70">Você</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}

        {transfers.length === 0 && (
          <div className="text-center py-12 text-foreground/70">
            Nenhuma transferência encontrada
          </div>
        )}
      </div>
    </div>
  );
}