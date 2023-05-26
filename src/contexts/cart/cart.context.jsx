import { createContext, useState } from 'react';

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {}
});

export const CartProvider = ({children}) => {
    //const [ cartProducts, setCartProducts ] = useState([]);
    const [ isCartOpen, setIsCartOpen ] = useState(false);

    const value = { isCartOpen, setIsCartOpen };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;

};