"use client";

import { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {fetchEvents} from "@/data/events";
import { format } from "date-fns";

interface Event {
  id: string;
  name: string;
  slug: string;
  location: string;
  date: string;
 
}

export function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function getchEvents() {
      try {
        const response = await fetchEvents();
        
        setFilteredEvents(response);
      } catch (error) {
        console.error("Erro ao buscar eventos:", error);
      }
    }
    getchEvents();
  }, []);


  
  

  const filtered = filteredEvents?.length > 0
    ? filteredEvents.filter((event) =>
        event.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <div className="relative flex-1" ref={searchRef}>
      <div className="flex gap-2">
        <Input 
          placeholder="Buscar eventos..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setShowResults(true)}
          onBlur={() => setShowResults(false)}
        />
        <Button>
          <Search />
        </Button>
      </div>

      {showResults && (
        <div className="absolute top-full left-0 right-0 mt-2 glass-dropdown rounded-[6px] shadow-lg max-h-[400px] overflow-y-auto z-50">
          {filtered?.length > 0 ? (
            filtered?.map((event) => (
              <Link className="flex items-center gap-4 p-3 hover:bg-foreground/10 rounded-[6px] transition" key={event.id} href={`/eventos/${event.id}`}>
                <div className="flex-1">
                  <h4 className="font-semibold">{event.name}</h4>
                  <p className="text-sm text-foreground/70">{event.location}</p>
                  <p className="text-sm text-foreground/70">{format(event.date, 'dd/MM/yyyy HH:mm')}</p>
                </div>
              </Link>
            ))
          ) : (
            <p>Nenhum evento encontrado</p>
          )}
        </div>
      )}
    </div>
  );
}
