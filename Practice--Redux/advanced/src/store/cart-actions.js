import { cartActions } from './cart'
import { uiActions } from './ui'

export const fetchCartData = () => {
  return async dispatch => {
    const fetchData = async () => {
      const response = await fetch(
        'https://practice--redux-default-rtdb.firebaseio.com/cart.json'
      )

      if (!response.ok) {
        throw new Error('Fetching cart data failed.')
      }

      const data = await response.json()
      return data
    }

    try {
      const cartData = await fetchData()
      dispatch(cartActions.replaceCart(cartData))
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: 'fetch cart data failed!',
        })
      )
    }
  }
}

export const sendCartData = cart => {
  // dispatch 안에 사용되는 함수는
  // dispatch와 getState를 redux-thunk가 대신 넣어준다.
  return async dispatch => {
    dispatch(
      uiActions.showNotification({
        status: 'pending',
        title: 'Sending...',
        message: 'Sending cart data!',
      })
    )

    const sendRequest = async () => {
      const response = await fetch(
        'https://practice--redux-default-rtdb.firebaseio.com/cart.json',
        {
          method: 'PUT',
          body: JSON.stringify(cart),
        }
      )

      if (!response.ok) {
        throw new Error('Sending cart data failed.')
      }
      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'Success!',
          message: 'Sent cart data successfully!',
        })
      )
    }

    try {
      await sendRequest()
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Sent cart data failed!',
        })
      )
    }
  }
}
