import { createContext, useContext, useState } from "react";
import { ShoopingCart } from "../components/ShoppingCart";
import { useLocalStorage } from "../hooks/useLocalStorage";

type CartItem = {
  id: number;
  quantity: number;
};

type ShoppingCartContext = {
  openCart: () => void;
  closeCart: () => void;
  getItemQuantity: (id: number) => number;
  increaseCartQuantity: (id: number) => void;
  decreaseCartQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  cartQuantity: number;
  cartItems: CartItem[];
};

type ShoppingCartProviderProps = {
  children: React.ReactNode;
};

const ShopingCartContext = createContext({} as ShoppingCartContext);
export function useShoopingCart() {
  return useContext(ShopingCartContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("cart-data", []);

  // const [cartItems, setCartItems] =useLocalStorage<CartItem[]>(
  //   "shopping-cart",
  //   []
  // )

  // below method to open cart
  const openCart = ()=>{setIsOpen(true)}

  // below method to close cart
  const closeCart = ()=>{setIsOpen(false)}

  // below method to get total cart item
  const cartQuantity = cartItems.reduce((quantity, item)=> item.quantity + quantity, 0)

  // below func for to get the total quantity
  const getItemQuantity = (id: number) => {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  };

  // below func for adding and incrementing the quantity
  function increaseCartQuantity(id: number) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id) == null) {
        return [...currItems, { id, quantity: 1 }];
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  // below func for decerasing the quantity
  function decreaseCartQuantity(id: number) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id)?.quantity === 1) {
        return currItems.filter((item) => item.id !== id);
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  // below func to remove item from cart        
  function removeFromCart(id: number) {
    setCartItems(currItems => {
      return currItems.filter(item => item.id !== id)
    })
  }

  return (
    <ShopingCartContext.Provider
      value={{cartItems, decreaseCartQuantity, getItemQuantity,removeFromCart, 
        increaseCartQuantity, cartQuantity, openCart, closeCart  }}
    >
      {children}
      <ShoopingCart isOpen={isOpen}></ShoopingCart>
    </ShopingCartContext.Provider>
  );
}
// checking if not present than adding to cart
// else find the array location and incrementing
