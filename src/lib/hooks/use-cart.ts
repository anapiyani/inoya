'use client'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { CartItem, Product, Size, Color } from '@/types'
import { toast } from 'react-hot-toast'

interface CartStore {
  items: CartItem[]
  addItem: (product: Product, size: Size, color: Color, quantity?: number) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  getTotal: () => number
  getItemCount: () => number
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product: Product, size: Size, color: Color, quantity = 1) => {
        set((state) => {
          const existingItemIndex = state.items.findIndex(
            (item) => 
              item.productId === product.id && 
              item.size.id === size.id && 
              item.color.id === color.id
          )

          if (existingItemIndex !== -1) {
            const updatedItems = [...state.items]
            updatedItems[existingItemIndex].quantity += quantity
            toast.success('Item quantity updated in cart')
            return { items: updatedItems }
          } else {
            const newItem: CartItem = {
              id: `${product.id}-${size.id}-${color.id}`,
              productId: product.id,
              product,
              quantity,
              size,
              color,
            }
            toast.success('Item added to cart')
            return { items: [...state.items, newItem] }
          }
        })
      },

      removeItem: (id: string) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id)
        }))
        toast.success('Item removed from cart')
      },

      updateQuantity: (id: string, quantity: number) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          )
        }))
      },

      clearCart: () => {
        set({ items: [] })
        toast.success('Cart cleared')
      },

      getTotal: () => {
        const { items } = get()
        return items.reduce((total, item) => {
          const price = item.product.salePrice || item.product.price
          return total + (price * item.quantity)
        }, 0)
      },

      getItemCount: () => {
        const { items } = get()
        return items.reduce((count, item) => count + item.quantity, 0)
      },
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
