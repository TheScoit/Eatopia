import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import CheckoutConfirmPage from "./CheckoutConfirmPage";
import { useCartStore } from "@/store/useCartStore";
import { CartItem } from "@/types/cartType";
import emptyCartImg from '../assets/empty-cart.png';

const Cart = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { 
    cart, 
    decrementQuantity, 
    incrementQuantity, 
    removeFromTheCart, 
    clearCart 
  } = useCartStore();

  const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleDecrement = (id: string, quantity: number) => {
    if (quantity <= 1) removeFromTheCart(id);
    else decrementQuantity(id);
  };

  return (
    <div className="max-w-4xl mx-auto my-10 flex flex-col gap-6">
      {/* Clear All Button */}
      {cart.length > 0 && (
        <div className="flex justify-end">
          <Button variant="link" onClick={clearCart} className="text-red-500 hover:text-red-600">
            Clear All
          </Button>
        </div>
      )}

      {/* Empty Cart State */}
      {cart.length === 0 && (
        <div className="text-center text-gray-500 mt-20">
          <img
            src={emptyCartImg}
            alt="Empty Cart"
            className="mx-auto w-40 mb-4"
          />
          <h2 className="text-xl font-semibold">Your cart is empty </h2>
          <p className="text-gray-400 mt-2">Add some delicious food to get started!</p>
        </div>
      )}

      {/* Cart Items */}
      {cart.map((item: CartItem) => (
        <div
          key={item._id}
          className="flex items-center gap-4 bg-white shadow-md rounded-lg p-4"
        >
          <img
            src={item.image}
            alt={item.name}
            className="w-24 h-24 rounded-lg object-cover"
          />
          <div className="flex-1 flex flex-col gap-1">
            <h2 className="text-lg font-semibold">{item.name}</h2>
            <p className="text-gray-500 text-sm">Delicious & fresh!</p>
            <div className="flex items-center gap-4 mt-2">
              {/* Quantity Controls */}
              <div className="flex items-center border rounded-full">
                <Button
                  onClick={() => handleDecrement(item._id, item.quantity)}
                  size="icon"
                  variant="outline"
                  className="rounded-l-full px-3 py-1 bg-gray-200 hover:bg-gray-300"
                >
                  <Minus />
                </Button>
                <span className="px-4 font-semibold">{item.quantity}</span>
                <Button
                  onClick={() => incrementQuantity(item._id)}
                  size="icon"
                  variant="outline"
                  className="rounded-r-full px-3 py-1 bg-purple text-white hover:bg-hoverPurple"
                >
                  <Plus />
                </Button>
              </div>
              {/* Item Total */}
              <span className="font-bold text-orange-500">₹{item.price * item.quantity}</span>
            </div>
          </div>
          {/* Remove Item */}
          <Button
            onClick={() => removeFromTheCart(item._id)}
            variant="ghost"
            className="text-red-500 hover:text-red-600"
          >
            <Trash2 />
          </Button>
        </div>
      ))}

      {/* Sticky Total Bar */}
      {cart.length > 0 && (
        <div className="mt-6 p-4 bg-gray-100 rounded-lg flex justify-between items-center sticky bottom-0 z-50 shadow-md">
          <h2 className="text-xl font-bold">Total: ₹{totalAmount}</h2>
          <Button
            className="bg-purple hover:bg-hoverPurple"
            onClick={() => setOpen(true)}
          >
            Proceed to Checkout
          </Button>
        </div>
      )}

      {/* Checkout Modal */}
      <CheckoutConfirmPage open={open} setOpen={setOpen} />
    </div>
  );
};

export default Cart;
