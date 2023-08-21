import {useReducer} from 'react';
import CartContext from "./cart-context";

const defaultCartState = {};

const cartReducer=(state , action)=>{

    if(action.type === "ADD"){

        const updatedItems = state.items.concat(action.item); 
        const updatedTotalAmount = state.totalAmount + action.item.price + action.item.amount;
        return {
            items : updatedItems,
            totalAmount : updatedTotalAmount
        };

    }

    return defaultCartState;
}



const CartProvider = (props)=> {
    const [cartState , disPatchCartAction] = useReducer(cartReducer , defaultCartState);

    const addItemToCartHandler = item =>{

        disPatchCartAction({type:'ADD' , item: item});

    };

    const removeItemFromCartHandler = id =>{
        disPatchCartAction({type: 'REMOVE' , id : id});
    };

    const cartContext={
        item:cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler
    }

    return <CartContext.Provider value={cartContext}>
    {props.children}
    </CartContext.Provider>

}

export default CartProvider;

//we will use this cartProvider function to wrap the component where we need access to cart context