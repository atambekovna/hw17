import { useContext } from 'react'

import Modal from '../UI/Modal'
import classes from './Cart.module.css'
import CartContext from '../../store/cart-context'
import CartItem from './CartItem'

const Cart = props => {

    const cartCtx = useContext(CartContext)

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`
    const listItems = cartCtx.items.length > 0

    const cartItem = (
        <ul className={classes['cart-item']}>
            {cartCtx.items.map((item) => (
                <CartItem key={item.id} id={item.id} name={item.name} amount={item.price} price={item.price} />
            ))}
        </ul>
    )

    return (
        <Modal onCloseCart={props.onCloseCart}>
            {cartItem}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            <div className={classes.actions}>
                <button className={classes['button--alt']} onClick={props.onCloseCart}>Close</button>
                {listItems && <button className={classes.button}>Open</button>}
            </div>
        </Modal>
    )
}

export default Cart