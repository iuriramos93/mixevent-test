"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from 'next/navigation';
import { cookies } from 'next/headers';
import { signIn } from '@/data/users';

export default function LoginPage() {
  const [showEmailLogin, setShowEmailLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const response = await signIn({ email, password });

    // Mock login validation
    if (response && response.token ) {
      // Set both sessionStorage and cookie
      sessionStorage.setItem('isLoggedIn', 'true');
      sessionStorage.setItem("name", response.user.name);
      sessionStorage.setItem("token", response.token);
      sessionStorage.setItem("role", response.user.role);
      document.cookie = 'isLoggedIn=true; path=/';
      // document.cookie = `token=${response.token}; path=/`; 
if (response.user.role === "PRODUCER") {
  router.push('/painel');
} else {
  router.push('/dashboard');
}
    } else {
      setError(response.error || 'Credenciais inválidas');
      console.log("res",response)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md glass-card text-white">
      <Card className="w-full max-w-md glass-card text-white">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Entrar</CardTitle>
          <CardDescription className="text-center text-gray-300">
            {showEmailLogin ? "Entre com seu e-mail" : "Escolha como deseja entrar"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AnimatePresence mode="wait">
            {!showEmailLogin ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 gap-4">
                  <Button variant="outline" className="w-full glass-card hover:bg-white/10 text-white h-12">
                    <Image
                      src="https://www.google.com/favicon.ico"
                      alt="Google"
                      width={20}
                      height={20}
                      className="mr-2"
                    />
                    Continuar com Google
                  </Button>
                  <Button variant="outline" className="w-full glass-card hover:bg-white/10 text-white h-12">
                    <Image
                      src="https://www.facebook.com/favicon.ico"
                      alt="Facebook"
                      width={20}
                      height={20}
                      className="mr-2"
                    />
                    Continuar com Facebook
                  </Button>
                  <Button variant="outline" className="w-full glass-card hover:bg-white/10 text-white h-12">
                    <Image
                      src="https://www.apple.com/favicon.ico"
                      alt="Apple"
                      width={20}
                      height={20}
                      className="mr-2"
                    />
                    Continuar com Apple
                  </Button>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-transparent text-gray-300">
                      Ou entre com
                    </span>
                  </div>
                </div>

                <Button 
                  onClick={() => setShowEmailLogin(true)}
                  className="w-full bg-gradient-to-r from-[#6519FF] to-[#00FFA3] text-white hover:opacity-90"
                >
                  E-mail e Senha
                </Button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <div className="p-3 rounded-lg bg-red-500/10 text-red-500 text-sm">
                      {error}
                    </div>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white">Email</Label>
                    <Input
                      id="email"
                      type="text"
                      placeholder="seu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="bg-white/10 border-white/10 text-white placeholder:text-white/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-white">Senha</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="bg-white/10 border-white/10 text-white"
                    />
                  </div>
                  <div className="flex gap-3">
                    <Button 
                      type="button" 
                      onClick={() => setShowEmailLogin(false)} 
                      variant="outline" 
                      className="flex-1 glass-card hover:bg-white/10"
                    >
                      Voltar
                    </Button>
                    <Button 
                      type="submit" 
                      className="flex-1 bg-gradient-to-r from-[#6519FF] to-[#00FFA3] text-white hover:opacity-90"
                    >
                      Entrar
                    </Button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-6 text-center text-sm">
            <Link href="/auth/register" className="text-white hover:text-white/90">
              Não tem uma conta? Cadastre-se
            </Link>
          </div>
        </CardContent>
        </Card>
      </Card>
    </div>
  );
}