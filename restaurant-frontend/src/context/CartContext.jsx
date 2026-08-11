import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();

export function CartProvider({ children }) {

    const [cartItems, setCartItems] = useState([]);

    const { user } = useContext(AuthContext);

useEffect(() => {

    if (!user) {

        setCartItems([]);

        return;

    }

    const savedCart =
        localStorage.getItem(`cart_${user.id}`);

    if (savedCart) {

        setCartItems(JSON.parse(savedCart));

    } else {

        setCartItems([]);

    }

}, [user]);

useEffect(() => {

    if (!user) return;

    localStorage.setItem(
        `cart_${user.id}`,
        JSON.stringify(cartItems)
    );

}, [cartItems, user]);

    const addToCart = (item) => {

    const existingItem = cartItems.find(
        cartItem =>
            cartItem.id === item.id &&
            cartItem.selectedOption?.id === item.selectedOption?.id
    );

    if (existingItem) {

        setCartItems(

            cartItems.map(cartItem =>

                cartItem.id === item.id &&
                cartItem.selectedOption?.id === item.selectedOption?.id

                    ? {
                          ...cartItem,
                          quantity: cartItem.quantity + 1
                      }

                    : cartItem

            )

        );

    } else {

        setCartItems([

            ...cartItems,

            {
                ...item,
                quantity: 1
            }

        ]);

    }

};

	const removeFromCart = (menuItemId, optionId) => {

    setCartItems(

        cartItems.filter(item =>

            !(

                item.id === menuItemId &&
                item.selectedOption.id === optionId

            )

        )

    );

};

	const increaseQuantity = (menuItemId, optionId) => {

    setCartItems(

        cartItems.map(item =>

            item.id === menuItemId &&
            item.selectedOption.id === optionId

                ? {
                      ...item,
                      quantity: item.quantity + 1
                  }

                : item

        )

    );

};

	const decreaseQuantity = (menuItemId, optionId) => {

    setCartItems(

        cartItems

            .map(item =>

                item.id === menuItemId &&
                item.selectedOption.id === optionId

                    ? {
                          ...item,
                          quantity: item.quantity - 1
                      }

                    : item

            )

            .filter(item => item.quantity > 0)

    );

};

	const clearCart = () => {
    setCartItems([]);
};

    return (

        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
    		removeFromCart,
    		increaseQuantity,
    		decreaseQuantity,
    		clearCart
            }}
        >

            {children}

        </CartContext.Provider>

    );

}