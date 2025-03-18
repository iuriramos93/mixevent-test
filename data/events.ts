import { api } from "@/services/api";
async function fetchEvents() {
 const res = await api('events'); // Altere para o seu endpoint real
return res.json();

}

async function fetchEventId(id: string) {
  const res = await api(`events/${id}`); // Altere para o seu endpoint real
  return res.json();
 
 }

export { 
  fetchEvents,
  fetchEventId

 };