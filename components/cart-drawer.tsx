"use client";

import { ShoppingCart, X, Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { useCart, CartItem } from "@/hooks/use-cart";
import { useRouter } from "next/navigation";

export function CartDrawer() {
  const { items, removeFromCart, updateQuantity } = useCart();
  const router = useRouter();

  const calculateTotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleQuantityChange = (item: CartItem, delta: number) => {
    const newQuantity = Math.max(1, item.quantity + delta);
    updateQuantity(item.id, newQuantity);
  };

  const handleCheckout = () => {
    router.push("/checkout");
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button className="text-foreground hover:text-foreground/90 transition p-2 relative">
          <ShoppingCart className="w-6 h-6" />
          {items.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {items.reduce((total, item) => total + item.quantity, 0)}
            </span>
          )}
        </button>
      </DrawerTrigger>
      <DrawerContent className="h-[85vh]">
        <DrawerHeader>
          <DrawerTitle>Carrinho</DrawerTitle>
          <DrawerDescription>Seus ingressos selecionados</DrawerDescription>
        </DrawerHeader>
        <div className="p-4 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              Seu carrinho está vazio
            </div>
          ) : (
            items.map((item, index) => (
              <div key={item.id}>
                <CartItem
                  item={item}
                  onQuantityChange={handleQuantityChange}
                  onRemove={() => removeFromCart(item.id)}
                />
                {index < items.length - 1 && <Separator className="my-4" />}
              </div>
            ))
          )}
        </div>
        <DrawerFooter>
          {items.length > 0 && (
            <>
              <div className="flex justify-between text-lg font-semibold mb-4">
                <span>Total</span>
                <span>R$ {calculateTotal().toFixed(2)}</span>
              </div>
              <Button
                className="w-full bg-gradient-to-r from-[#6519FF] to-[#00FFA3] text-white hover:opacity-90"
                onClick={handleCheckout}
              >
                Finalizar Compra
              </Button>
            </>
          )}
          <DrawerClose asChild>
            <Button variant="outline">
              {items.length > 0 ? "Continuar Comprando" : "Fechar"}
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function CartItem({
  item,
  onQuantityChange,
  onRemove,
}: {
  item: CartItem;
  onQuantityChange: (item: CartItem, delta: number) => void;
  onRemove: () => void;
}) {
  return (
    <div className="flex gap-4">
      <div className="relative w-20 h-20 flex-shrink-0">
        <Image
          src={item.eventImage}
          alt={item.eventTitle}
          fill
          className="object-cover rounded-lg"
          unoptimized
        />
      </div>
      <div className="flex-1">
        <h4 className="font-semibold">{item.eventTitle}</h4>
        <p className="text-sm text-muted-foreground">{item.eventDate}</p>
        <p className="text-sm text-muted-foreground">{item.type}</p>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2">
            <button
              className="p-1 hover:bg-secondary/50 rounded-lg"
              onClick={() => onQuantityChange(item, -1)}
            >
              <Minus className="w-4 h-4" />
            </button>
            <span>{item.quantity}</span>
            <button
              className="p-1 hover:bg-secondary/50 rounded-lg"
              onClick={() => onQuantityChange(item, 1)}
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <span className="font-semibold">R$ {(item.price * item.quantity).toFixed(2)}</span>
        </div>
      </div>
      <button
        className="text-destructive hover:text-destructive/90 p-2"
        onClick={onRemove}
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  );
}