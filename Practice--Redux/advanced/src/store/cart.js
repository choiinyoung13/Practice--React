import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalPrice: 0,
    changed: false,
  },
  reducers: {
    replaceCart(state, action) {
      state.items = action.payload?.items || []
      state.totalPrice = action.payload?.totalPrice || 0
      state.changed = false
    },
    addItem(state, action) {
      const itemIndex = state.items.findIndex(
        item => item.id === action.payload.item.id
      )
      if (itemIndex > -1) {
        state.items[itemIndex].quantity++
      } else {
        state.items.push({ ...action.payload.item, quantity: 1 })
      }
      state.changed = true
      state.totalPrice += action.payload.item.price
    },
    removeItem(state, action) {
      const itemIndex = state.items.findIndex(
        item => item.id === action.payload.id
      )

      if (state.items[itemIndex].quantity <= 1) {
        state.totalPrice -= state.items[itemIndex].price
        state.items.splice(itemIndex, 1)
      } else {
        state.items[itemIndex].quantity--
        state.totalPrice -= state.items[itemIndex].price
      }
      state.changed = true
    },
  },
})

export const cartActions = cartSlice.actions
export default cartSlice
