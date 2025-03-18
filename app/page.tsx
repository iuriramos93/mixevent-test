"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Clock, Music, Users, Mic2, PartyPopper, Theater, Presentation, GraduationCap, Ticket, QrCode, BarChart, HeartHandshake, Megaphone, BarChart3 } from "lucide-react";
import { useState, useEffect, Suspense } from "react";
import { Loading } from '@/components/loading';
import { EventCountdown } from "@/components/event-countdown";
import { useMediaQuery } from "@/hooks/use-media-query";
import EventList from "./components/EventList";

const bannerImages = [
  {
    url: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3",
    title: "Shows de Rock"
  },
  {
    url: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf",
    title: "Festivais"
  },
  {
    url: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7",
    title: "Teatro"
  }
];

const categories = [
  { name: "Shows", icon: <Music className="w-6 h-6" />, color: "shows" },
  { name: "Conferências", icon: <Mic2 className="w-6 h-6" />, color: "teatro" },
  { name: "Festivais", icon: <PartyPopper className="w-6 h-6" />, color: "esportes" },
  { name: "Teatro", icon: <Theater className="w-6 h-6" />, color: "familia" },
  { name: "Palestras", icon: <Presentation className="w-6 h-6" />, color: "shows" },
  { name: "Workshop", icon: <GraduationCap className="w-6 h-6" />, color: "teatro" },
  { name: "Festas", icon: <Users className="w-6 h-6" />, color: "esportes" },
  { name: "Musicais", icon: <Ticket className="w-6 h-6" />, color: "familia" }
];

export default function HomePage() {
  const [currentBanner, setCurrentBanner] = useState(0);
  const [categorySlide, setCategorySlide] = useState(0);
  const [featuredSlide, setFeaturedSlide] = useState(0);
  const [upcomingSlide, setUpcomingSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const [slideState, setSlideState] = useState<number>(0);

  const isMobile = useMediaQuery("(max-width: 768px)");
  const events = [];
  const itemsPerSlide = isMobile ? 1 : 4;
  const totalCategorySlides = Math.ceil(categories.length / itemsPerSlide);
  const totalFeaturedSlides = Math.ceil(events.length / itemsPerSlide);
  const totalUpcomingSlides = Math.ceil(events.length / itemsPerSlide);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % bannerImages.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const handleSlideChange = (direction: 'prev' | 'next', current: number, total: number) => {
    if (direction === 'prev') {
      return (current - 1 + total) % total;
    }
    // On desktop, move one item at a time
    if (!isMobile) {
      return (current + 1) % total;
    }
    // On mobile, continue with current behavior
    return (current + 1) % total;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const handleTouchEnd = (slideState: number, setSlideState: (value: number) => void, totalSlides: number) => {
    const minSwipeDistance = 50;
    const diff = touchStart - touchEnd;
    
    if (Math.abs(diff) > minSwipeDistance) {
      if (diff > 0) {
        const nextSlide = (slideState + 1) % totalSlides;
        setSlideState(nextSlide);
      } else {
        const prevSlide = (slideState - 1 + totalSlides) % totalSlides;
        setSlideState(prevSlide);
      }
    }
    
    setTouchStart(0);
    setTouchEnd(0);
  };

  return (
    <main>
      <section className="container mx-auto px-4 py-8">
        <div className="relative h-[400px] rounded-lg overflow-hidden">
          {bannerImages.map((banner, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentBanner ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={banner.url}
                alt={banner.title}
                fill
                className="object-cover"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-black/50" />
            </div>
          ))}
          
          <button
            onClick={() => setCurrentBanner(prev => handleSlideChange('prev', prev, bannerImages.length))}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors z-10"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button
            onClick={() => setCurrentBanner(prev => handleSlideChange('next', prev, bannerImages.length))}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors z-10"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {bannerImages.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentBanner ? "bg-white" : "bg-white/50"
                }`}
                onClick={() => setCurrentBanner(index)}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
            Explorar Categorias
          </h2>
          <div className="carousel-container">
            <div 
              className="carousel-track"
              style={{ transform: `translateX(-${categorySlide * (isMobile ? 90 : 25)}%)` }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={() => handleTouchEnd(categorySlide, setCategorySlide, totalCategorySlides)}
            >
              {categories.map((category, index) => (
                <div key={index} className="category-item">
                  <Link href={`/categorias/${category.name.toLowerCase()}`}>
                    <div className="glass-card p-4 flex items-center gap-4 hover:bg-foreground/10">
                      <div className={`icon-wrapper category-icon-${category.color}`}>
                        {category.icon}
                      </div>
                      <h3 className="font-semibold text-xl text-foreground">{category.name}</h3>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
            {!isMobile && (
              <>
                <button
                  onClick={() => setCategorySlide(prev => handleSlideChange('prev', prev, totalCategorySlides))}
                  className="carousel-nav-button prev"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={() => setCategorySlide(prev => handleSlideChange('next', prev, totalCategorySlides))}
                  className="carousel-nav-button next"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
            {isMobile && (
              <div className="flex justify-center gap-2 mt-4">
                {Array.from({ length: totalCategorySlides }).map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === categorySlide ? "bg-foreground" : "bg-foreground/30"
                    }`}
                    onClick={() => setCategorySlide(index)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
            Eventos em Destaque
          </h2>
          <div className="carousel-container">
            <div 
              className="carousel-track"
              style={{ transform: `translateX(-${featuredSlide * (isMobile ? 90 : 25)}%)` }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={() => handleTouchEnd(featuredSlide, setFeaturedSlide, totalFeaturedSlides)}
            >
              <Suspense fallback={<Loading/>}>
              <EventList/>
              </Suspense>
            </div>
            {!isMobile && (
              <>
                <button
                  onClick={() => setFeaturedSlide(prev => handleSlideChange('prev', prev, totalFeaturedSlides))}
                  className="carousel-nav-button prev"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={() => setFeaturedSlide(prev => handleSlideChange('next', prev, totalFeaturedSlides))}
                  className="carousel-nav-button next"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
            {isMobile && (
              <div className="flex justify-center gap-2 mt-4">
                {Array.from({ length: totalFeaturedSlides }).map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === featuredSlide ? "bg-foreground" : "bg-foreground/30"
                    }`}
                    onClick={() => setFeaturedSlide(index)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
            Próximos Eventos
          </h2>
          <div className="carousel-container">
            <div 
              className="carousel-track"
              style={{ transform: `translateX(-${upcomingSlide * (isMobile ? 90 : 25)}%)` }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={() => handleTouchEnd(upcomingSlide, setUpcomingSlide, totalUpcomingSlides)}
            >
              <Suspense fallback={<Loading/>}>
              <EventList/>
              </Suspense>
            </div>
            {!isMobile && (
              <>
                <button
                  onClick={() => setUpcomingSlide(prev => handleSlideChange('prev', prev, totalUpcomingSlides))}
                  className="carousel-nav-button prev"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={() => setUpcomingSlide(prev => handleSlideChange('next', prev, totalUpcomingSlides))}
                  className="carousel-nav-button next"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
            {isMobile && (
              <div className="flex justify-center gap-2 mt-4">
                {Array.from({ length: totalUpcomingSlides }).map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === upcomingSlide ? "bg-foreground" : "bg-foreground/30"
                    }`}
                    onClick={() => setUpcomingSlide(index)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-r from-[#6519FF]/10 to-[#00FFA3]/10">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
            Gestão completa para seu evento
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="glass-card p-8 text-center">
              <div className="w-16 h-16 border border-white rounded-[6px] flex items-center justify-center mx-auto mb-6">
                <HeartHandshake className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Atendimento humanizado</h3>
              <p className="text-foreground/70">
                Equipe interna dedicada ao relacionamento com o produtor e consumidores do evento.
              </p>
            </div>

            <div className="glass-card p-8 text-center">
              <div className="w-16 h-16 border border-white rounded-[6px] flex items-center justify-center mx-auto mb-6">
                <Megaphone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Marketing Especializado</h3>
              <p className="text-foreground/70">
                Todo o suporte em marketing digital para melhorar sua performance em vendas.
              </p>
            </div>

            <div className="glass-card p-8 text-center">
              <div className="w-16 h-16 border border-white rounded-[6px] flex items-center justify-center mx-auto mb-6">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Relatórios financeiros</h3>
              <p className="text-foreground/70">
                Acompanhamento real-time das vendas pelo celular, onde você estiver.
              </p>
            </div>

            <div className="glass-card p-8 text-center">
              <div className="w-16 h-16 border border-white rounded-[6px] flex items-center justify-center mx-auto mb-6">
                <QrCode className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Controle de acesso</h3>
              <p className="text-foreground/70">
                Tecnologia de ponta na gestão e controle de acessos, além de uma equipe de técnicos especializados.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button className="bg-gradient-to-r from-[#6519FF] to-[#00FFA3] text-white hover:opacity-90 rounded-[6px] px-8 py-6 text-lg">
              Comece a vender agora
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}