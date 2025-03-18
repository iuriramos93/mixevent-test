import {format} from "date-fns"
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { MapPin, Calendar, Clock, Info, CreditCard, Ticket } from "lucide-react";
import { TicketModal } from "@/components/ticket-modal";

// Move eventData to a separate file to avoid circular dependencies
import { fetchEventId } from "@/data/events";
import { useEffect, useState } from "react";

export default function EventInfo({id}: {id: string}) {
  

  interface Event {
    id: string;
    name: string;
    capa_evento: string;
    description: string;
    producer: {
      name: string;
    };
    date: string;
    location: string;
    Lote: {
      id: string;
      name: string;
      TicketType: TicketOption[];
    }[];
    classificacaoEtaria: string;
  }
  interface TicketOption {
    id: string;
    name: string;
    price: number;
    description?: string;
  }


  const [loading, setLoading] = useState(true);
  const [event, setEvent] = useState<Event | undefined>();
  useEffect(() => {
    const fetchEvent = async () => {
      setLoading(true);
      try {
        const response = await fetchEventId(id);
        if (!response) {
          console.error("Evento não encontrado");
        }
        setEvent(response);
      } catch (error) {
        console.error("Erro ao buscar evento:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);
  

  if (!event) {
    return <div className="container mx-auto py-8 px-4">Evento não encontrado</div>;
  }
if (loading) {
  return <div className="container mx-auto py-8 px-4">Carregando evento...</div>;
}


const formattedDate = format(event.date, 'dd/MM/yyyy');
const formattedTime = format(event.date, 'HH:mm');
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="relative h-[400px] mb-8">
            <Image
              src={`data:image/png;base64,${event.capa_evento}`}
              alt={event.name}
              fill
              className="object-cover rounded-lg"
            />
          </div>

          <Tabs defaultValue="informacoes" className="space-y-4">
            <TabsList>
              <TabsTrigger value="informacoes">Informações</TabsTrigger>
              <TabsTrigger value="local">Local</TabsTrigger>
              <TabsTrigger value="video">Vídeo</TabsTrigger>
            </TabsList>

            <TabsContent value="informacoes" className="space-y-4">
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-4">Informações do Evento</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 mt-1" />
                    <div>
                      <h3 className="font-semibold">Descrição</h3>
                      <p className="text-muted-foreground">
                        {event.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CreditCard className="w-5 h-5 mt-1" />
                    <div>
                      <h3 className="font-semibold">Formas de Pagamento</h3>
                      <p className="text-muted-foreground">
                        Cartão de Crédito, PIX, Boleto Bancário
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Ticket className="w-5 h-5 mt-1" />
                    <div>
                      <h3 className="font-semibold">Pontos de Venda</h3>
                      <ul className="text-muted-foreground list-disc list-inside">
                        <li>Bilheteria do Local</li>
                        <li>Site Oficial</li>
                        <li>Pontos Autorizados</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="local">
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-4">Localização</h2>
                <div className="aspect-video relative">
                  <div className="bg-secondary/50 w-full h-full flex items-center justify-center">
                    Mapa será exibido aqui
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="video">
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-4">Vídeo do Evento</h2>
                <div className="aspect-video relative">
                  <div className="bg-secondary/50 w-full h-full flex items-center justify-center">
                    Vídeo será exibido aqui
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <Card className="p-6 sticky top-4">
            <h1 className="text-2xl font-bold mb-4">{event.name}</h1>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{formattedTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span>{event.location}</span>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <h3 className="font-semibold mb-2">Organizador</h3>
                <p className="text-muted-foreground">{event.producer.name}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Classificação</h3>
                <p className="text-muted-foreground">{event.classificacaoEtaria}</p>
              </div>
            </div>

            <div className="space-y-4">
              {event.Lote.map((lote) => (
                <div key={lote.id} className="p-4 border rounded-lg bg-secondary/50">
                  <h3 className="font-semibold mb-2">Ingresso - {lote.name}</h3>
                  <div className="space-y-2">
                    {lote.TicketType.map((ticketOption) => (
                      <div key={ticketOption.id} className="flex justify-between">
                        <span>{ticketOption.name}</span>
                        <span className="font-bold">R$ {ticketOption.price.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              <TicketModal event={{
                ...event,
                ticketTypes: event.Lote.flatMap(lote => lote.TicketType)
              }} />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
