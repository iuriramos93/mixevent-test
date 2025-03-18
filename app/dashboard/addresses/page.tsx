"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Plus, MapPin, Pencil, Trash2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Address {
  id: string;
  nickname: string;
  zipCode: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
}

const mockAddresses: Address[] = [
  {
    id: '1',
    nickname: 'Casa',
    zipCode: '01310-100',
    street: 'Av. Paulista',
    number: '1000',
    complement: 'Apto 123',
    neighborhood: 'Bela Vista',
    city: 'São Paulo',
    state: 'SP'
  }
];

export default function AddressesPage() {
  const [addresses, setAddresses] = useState<Address[]>(mockAddresses);
  const [formData, setFormData] = useState<Partial<Address>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleZipCodeChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const zipCode = e.target.value.replace(/\D/g, '');
    if (zipCode.length === 8) {
      setIsLoading(true);
      try {
        const response = await fetch(`https://viacep.com.br/ws/${zipCode}/json/`);
        const data = await response.json();
        if (!data.erro) {
          setFormData({
            ...formData,
            zipCode: zipCode,
            street: data.logradouro,
            neighborhood: data.bairro,
            city: data.localidade,
            state: data.uf
          });
        }
      } catch (error) {
        console.error('Error fetching address:', error);
      }
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newAddress: Address = {
      id: Date.now().toString(),
      ...formData as Address
    };
    setAddresses(prev => [...prev, newAddress]);
    setFormData({});
  };

  const handleDelete = (id: string) => {
    setAddresses(prev => prev.filter(address => address.id !== id));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Meus Endereços</h1>
      
      <div className="grid gap-6">
        {addresses.map((address) => (
          <Card key={address.id} className="p-6 glass-card">
            <div className="flex justify-between items-start">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#6519FF] to-[#00FFA3] flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{address.nickname}</h3>
                  <p className="text-foreground/70">
                    {address.street}, {address.number}
                    {address.complement && ` - ${address.complement}`}
                  </p>
                  <p className="text-foreground/70">
                    {address.neighborhood} - {address.city}/{address.state}
                  </p>
                  <p className="text-foreground/70">CEP: {address.zipCode}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="icon">
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => handleDelete(address.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}

        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full bg-gradient-to-r from-[#6519FF] to-[#00FFA3] text-white hover:opacity-90">
              <Plus className="w-5 h-5 mr-2" />
              Adicionar Novo Endereço
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] glass-card max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Adicionar Endereço</DialogTitle>
              <DialogDescription>
                Preencha os dados do novo endereço
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 py-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nickname">Apelido do Endereço</Label>
                  <Input
                    id="nickname"
                    name="nickname"
                    placeholder="Ex: Casa, Trabalho"
                    value={formData.nickname || ''}
                    onChange={handleChange}
                    className="bg-white/10 border-white/10"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zipCode">CEP</Label>
                  <Input
                    id="zipCode"
                    name="zipCode"
                    placeholder="00000-000"
                    value={formData.zipCode || ''}
                    onChange={handleZipCodeChange}
                    className="bg-white/10 border-white/10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="street">Rua</Label>
                <Input
                  id="street"
                  name="street"
                  value={formData.street || ''}
                  onChange={handleChange}
                  className="bg-white/10 border-white/10"
                  required
                  readOnly={isLoading}
                />
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="number">Número</Label>
                  <Input
                    id="number"
                    name="number"
                    value={formData.number || ''}
                    onChange={handleChange}
                    className="bg-white/10 border-white/10"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="complement">Complemento</Label>
                  <Input
                    id="complement"
                    name="complement"
                    value={formData.complement || ''}
                    onChange={handleChange}
                    className="bg-white/10 border-white/10"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="neighborhood">Bairro</Label>
                  <Input
                    id="neighborhood"
                    name="neighborhood"
                    value={formData.neighborhood || ''}
                    onChange={handleChange}
                    className="bg-white/10 border-white/10"
                    required
                    readOnly={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">Cidade</Label>
                  <Input
                    id="city"
                    name="city"
                    value={formData.city || ''}
                    onChange={handleChange}
                    className="bg-white/10 border-white/10"
                    required
                    readOnly={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">Estado</Label>
                  <Input
                    id="state"
                    name="state"
                    value={formData.state || ''}
                    onChange={handleChange}
                    className="bg-white/10 border-white/10"
                    required
                    readOnly={isLoading}
                  />
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button 
                  type="submit"
                  className="bg-gradient-to-r from-[#6519FF] to-[#00FFA3] text-white hover:opacity-90"
                  disabled={isLoading}
                >
                  {isLoading ? 'Carregando...' : 'Salvar Endereço'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}