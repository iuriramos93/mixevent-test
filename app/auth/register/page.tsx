"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from "framer-motion";
import { registerUser } from '@/data/users';
import { toast } from '@/hooks/use-toast';


export default function RegisterPage() {
  const [error, setError] = useState('');
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    cpf: '',
    gender: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
     
      const response = await registerUser(formData);

      if (response) {
    
      if (response.error) {
        // alert(`${response.error}`);
        setError(response.error.message);
      }else{
        
// Redirecionar para a tela de login
window.location.href = '/auth/login';   
      }
      
        
      }
    } 
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-md mx-auto glass-card text-white">
      {error && (
                    <div className="p-3 rounded-lg bg-red-500/10 text-red-500 text-sm">
                      {error}
                    </div>
                  )}
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Criar conta</CardTitle>
          <CardDescription className="text-center text-gray-300">
            {step === 1 && "Escolha como deseja se cadastrar"}
            {step === 2 && "Informações básicas"}
            {step === 3 && "Informações complementares"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AnimatePresence mode="wait">
            {step === 1 && (
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
                      Ou cadastre-se com e-mail
                    </span>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white">E-mail</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="bg-white/10 border-white/10 text-white"
                      placeholder="seu@email.com"
                    />
                  </div>
                  <Button type="submit" className="w-full bg-gradient-to-r from-[#6519FF] to-[#00FFA3] text-white hover:opacity-90">
                    Continuar
                  </Button>
                </form>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-white">Nome completo</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="bg-white/10 border-white/10 text-white"
                      />
                    </div>
                    {/* <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-white">Sobrenome</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="bg-white/10 border-white/10 text-white"
                      />
                    </div> */}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-white">Senha</Label>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="bg-white/10 border-white/10 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword" className="text-white">Confirmar Senha</Label>
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        className="bg-white/10 border-white/10 text-white"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button type="button" onClick={handleBack} variant="outline" className="flex-1 glass-card hover:bg-white/10">
                      Voltar
                    </Button>
                    <Button type="submit" className="flex-1 bg-gradient-to-r from-[#6519FF] to-[#00FFA3] text-white hover:opacity-90">
                      Continuar
                    </Button>
                  </div>
                </form>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-white">Telefone</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="bg-white/10 border-white/10 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cpf" className="text-white">CPF</Label>
                      <Input
                        id="cpf"
                        name="cpf"
                        value={formData.cpf}
                        onChange={handleChange}
                        required
                        className="bg-white/10 border-white/10 text-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gender" className="text-white">Sexo</Label>
                    <Select name='gender' onValueChange={(value)=>{setFormData(prevState => ({...prevState, gender: value}))}}>
                      <SelectTrigger className="bg-white/10 border-white/10 text-white">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#001F33] border-white/10 text-white">
                        <SelectItem value="M">Masculino</SelectItem>
                        <SelectItem value="F">Feminino</SelectItem>
                        <SelectItem value="O">Outro</SelectItem>
                        <SelectItem value="N">Prefiro não informar</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex gap-3">
                    <Button type="button" onClick={handleBack} variant="outline" className="flex-1 glass-card hover:bg-white/10">
                      Voltar
                    </Button>
                    <Button type="submit" className="flex-1 bg-gradient-to-r from-[#6519FF] to-[#00FFA3] text-white hover:opacity-90">
                      Finalizar Cadastro
                    </Button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-6 text-center text-sm">
            <Link href="/auth/login" className="text-white hover:text-white/90">
              Já tem uma conta? Entre aqui
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}