import { useReducer } from 'react'
import CartContext from './cart-context'

const defaultCartState = {
    items: [],
    totalAmount: 0
}

const cartReducer = (prevState, action) => {
    if(action.type === 'ADD') {
        const updatedAmount = prevState.totalAmount + action.item.price * action.item.amount;
        const isHasCartItem = prevState.items.findIndex((item) => item.id === action.item.id)
        const hasCartItem = prevState.items[isHasCartItem]
        let updatedItems

        if(hasCartItem ) {
            const updatedItem ={
                ...hasCartItem,
                amount: hasCartItem.amount + action.item.amount
            }
            updatedItems = [...prevState.items]
            updatedItems[isHasCartItem] = updatedItem
        } else {
            updatedItems = prevState.items.concat(action.item);

        }
        return {
            items: updatedItems,
            totalAmount: updatedAmount
        }
    }

    return defaultCartState
}

const CartProvider = props => {

    const [cartState, dispatchCart] = useReducer(cartReducer, defaultCartState)

    const addItemToCartHandler = item => {
        dispatchCart({type: 'ADD', item: item})
    }


    const removeItemFromCartHandler = () => {

    }

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
    }

    return <CartContext.Provider value={cartContext}>
        {props.children}
        </CartContext.Provider>
}

export default CartProvider