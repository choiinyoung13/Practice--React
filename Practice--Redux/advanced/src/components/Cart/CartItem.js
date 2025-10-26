import { useDispatch } from 'react-redux'
import classes from './CartItem.module.css'
import { cartActions } from '../../store/cart'

const CartItem = props => {
  const { id, title, quantity, price } = props.item
  const total = quantity * price

  const dispatch = useDispatch()

  function handleAdd() {
    dispatch(cartActions.addItem({ item: { id, title, price } }))
  }

  function handleRemove() {
    dispatch(cartActions.removeItem({ id }))
  }

  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${total.toFixed(2)}{' '}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={handleRemove}>-</button>
          <button onClick={handleAdd}>+</button>
        </div>
      </div>
    </li>
  )
}

export default CartItem
