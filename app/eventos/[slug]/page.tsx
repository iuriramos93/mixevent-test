"use client";

import { Loading } from '@/components/loading';
import EventInfo from '../../components/EventInfo';
import { Suspense,use } from 'react';



export default function EventoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  
  return (
    <>
    <Suspense fallback={<Loading/>}>
      {slug ? <EventInfo id={slug}/> : <div>Evento não encontrado.</div>}
    </Suspense>
    </>
  
   );
}
