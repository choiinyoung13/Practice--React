import { useDispatch, useSelector } from 'react-redux'
import classes from './CartButton.module.css'
import { uiActions } from '../../store/ui'

const CartButton = props => {
  const dispatch = useDispatch()
  const cartItems = useSelector(state => state.cart.items)

  function handleButtonClick() {
    dispatch(uiActions.toggle())
  }

  return (
    <button className={classes.button} onClick={handleButtonClick}>
      <span>My Cart</span>
      <span className={classes.badge}>{cartItems.length}</span>
    </button>
  )
}

export default CartButton
