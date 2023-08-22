import {useReducer} from 'react';
import CartContext from "./cart-context";

const defaultCartState = {
    items:[],
    totalAmount : 0
};

const cartReducer=(state , action)=>{

    if(action.type === "ADD"){ //add new element 

        const updatedItems = state.items.concat(action.item); 
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
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
        items:cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler
    }

    // const cartContext = {
    //     items:[],
    //     totalAmount : 0,
    //     addItem : addItemToCartHandler,
    //     removeItem : removeItemFromCartHandler

    // }

    return <CartContext.Provider value={cartContext}>
    {props.children}
    </CartContext.Provider>

}

export default CartProvider;

//we will use this cartProvider function to wrap the component where we need access to cart context