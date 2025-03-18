"use client";

import { useState, useEffect } from 'react';
import { Timer } from 'lucide-react';

interface EventCountdownProps {
  date: string;
  time: string;
}

export function EventCountdown({ date, time }: EventCountdownProps) {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      // Parse the date string (format: "25 de Maio, 2025")
      const [day, _, month, year] = date.split(/[\s,]+/);
      
      // Convert month name to number (0-11)
      const months: { [key: string]: number } = {
        'Janeiro': 0,
        'Fevereiro': 1,
        'Março': 2,
        'Abril': 3,
        'Maio': 4,
        'Junho': 5,
        'Julho': 6,
        'Agosto': 7,
        'Setembro': 8,
        'Outubro': 9,
        'Novembro': 10,
        'Dezembro': 11
      };

      // Parse time (format: "20:00")
      const [hours, minutes] = time.split(':').map(Number);

      // Create event date object
      const eventDate = new Date(
        parseInt(year),
        months[month],
        parseInt(day),
        hours,
        minutes
      );

      const now = new Date();
      const difference = eventDate.getTime() - now.getTime();

      if (difference > 0) {
        // Calculate time units
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        // Event has passed
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    // Calculate immediately and then set up interval
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    // Cleanup interval on unmount
    return () => clearInterval(timer);
  }, [date, time]);

  // If event has passed
  if (timeLeft.days === 0 && timeLeft.hours === 0 && 
      timeLeft.minutes === 0 && timeLeft.seconds === 0) {
    return (
      <div className="flex items-center gap-2 text-sm text-red-500 mb-2">
        <Timer className="w-4 h-4" />
        <span>Evento encerrado</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 text-sm text-foreground/70 mb-2">
      <Timer className="w-4 h-4" />
      <div className="flex gap-2">
        <span>{timeLeft.days}d</span>
        <span>{timeLeft.hours.toString().padStart(2, '0')}h</span>
        <span>{timeLeft.minutes.toString().padStart(2, '0')}m</span>
        <span>{timeLeft.seconds.toString().padStart(2, '0')}s</span>
      </div>
    </div>
  );
}