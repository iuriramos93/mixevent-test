import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";
import { eventData } from "@/data/events";

export default function CategoriaPage({ params }: { params: { categoria: string } }) {
  // Filter events by category
  const categoryEvents = Object.values(eventData).filter(
    event => event.category === params.categoria
  );

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 capitalize text-foreground">{params.categoria}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-6">
          <Card className="p-4">
            <h3 className="font-semibold mb-4">Filtros</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Data</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="hoje" />
                    <Label htmlFor="hoje">Hoje</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="amanha" />
                    <Label htmlFor="amanha">Amanhã</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="esta-semana" />
                    <Label htmlFor="esta-semana">Esta semana</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="este-mes" />
                    <Label htmlFor="este-mes">Este mês</Label>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Preço</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="ate-50" />
                    <Label htmlFor="ate-50">Até R$ 50</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="50-100" />
                    <Label htmlFor="50-100">R$ 50 - R$ 100</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="100-200" />
                    <Label htmlFor="100-200">R$ 100 - R$ 200</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="acima-200" />
                    <Label htmlFor="acima-200">Acima de R$ 200</Label>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="md:col-span-3">
          {categoryEvents.length === 0 ? (
            <p className="text-foreground/70">Nenhum evento encontrado nesta categoria.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {categoryEvents.map((event) => (
                <Link key={event.slug} href={`/eventos/${event.slug}/`}>
                  <div className="glass-card overflow-hidden rounded-lg">
                    <div className="relative h-48">
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="font-semibold text-xl mb-2 text-foreground">{event.title}</h3>
                      <p className="text-foreground/70 mb-1">{event.date}</p>
                      <div className="flex items-center text-foreground/70 mb-1">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>{event.time}</span>
                      </div>
                      <p className="text-foreground/70 mb-4">{event.location}</p>
                      <Button className="w-full bg-gradient-to-r from-[#6519FF] to-[#00FFA3] text-white hover:opacity-90 rounded-md">
                        Comprar Ingressos
                      </Button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}