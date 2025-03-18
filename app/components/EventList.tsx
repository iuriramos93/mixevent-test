import {fetchEvents} from '@/data/events';
import { format } from 'date-fns';
import { Calendar,Clock,MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useState,useEffect } from 'react';



export default  function EventList() {

  const [events, setEvents] = useState<any[]|null>([]);
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetchEvents();
       console.log("Response",response);
        setEvents(response);
      } catch (error) {
        console.error("Erro ao carregar eventos:", error);
      }
    };

    loadData();
  }, []);
 

  return (<>
    {
    events && events.length > 0 ? (
    events?.map((event:any) => (
      <div key={event.id} className="carousel-item">
      <Link href={`/eventos/${event.id}/`}>
        <div className="glass-card overflow-hidden rounded-[6px] h-full">
          <div className="relative h-56">
            <Image
              src={`data:image/png;base64,${event.capa_evento}`}
              alt={event.name}
              fill
              className="object-cover" 
            />
          </div>
          <div className="p-6">
            <h3 className="font-semibold text-xl mb-2 text-foreground">{event.name}</h3>
            <div className="flex items-center text-foreground/70 mb-1">
            <Calendar className="w-4 h-4 mr-1" />
            <p className="text-foreground/70 mb-1">{new Intl.DateTimeFormat('pt-BR', {day: 'numeric', month: 'long', year: 'numeric'}).format(new Date(event.date))}</p>
            </div>
            <div className="flex items-center text-foreground/70 mb-1">
              <Clock className="w-4 h-4 mr-1" />
              <span>{format(event.date, 'HH:mm')}</span>
            </div>
            <div className="flex items-center text-foreground/70 mb-1">
            <MapPin className="w-4 h-4 mr-1"/>
            <p className="text-foreground/70">{event.location}</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
    )
  )
 ): (
      <p className='text-2xl text-center text-foreground'>Nenhum evento encontrado.</p>
    )}
    </>
  );
   
        
} 