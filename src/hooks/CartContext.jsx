import PropTypes from 'prop-types'
import React, { createContext, useContext, useState, useEffect } from 'react'
import { toast } from 'react-toastify'

const CartContext = createContext({})

export const CartProvider = ({ children }) => {
  const [cartProducts, setCartProducts] = useState([])
  const [cartQuantity, setCartQuantity] = useState(0)

  const updateLocalStorage = async product => {
    await localStorage.setItem(
      'codeburger:cartProduct',
      JSON.stringify(product)
    )
  }

  const cleanCart = async () => {
    await localStorage.removeItem('codeburger:cartProduct')
    setCartProducts([])
  }

  const putProductInCart = async cartItens => {
    const cartIndex = cartProducts.findIndex(item => item.id === cartItens.id)

    let newCartProducts = []
    if (cartIndex >= 0) {
      newCartProducts = [...cartProducts]
      newCartProducts[cartIndex] = {
        ...newCartProducts[cartIndex],
        quantity: newCartProducts[cartIndex].quantity + 1
      }
    } else {
      cartItens.quantity = 1
      newCartProducts = [...cartProducts, cartItens]
    }
    setCartProducts(newCartProducts)

    await toast.promise(updateLocalStorage(newCartProducts), {
      pending: 'Adicionando....',
      success: 'Produto adicionado',
      error: 'Erro ao adicionar Produto'
    })
    // putUserData(data)

    // await updateLocalStorage(newCartProducts)
    // toast.success('Produto adicionado')
  }

  const increaseProduct = async productId => {
    const newCart = cartProducts.map(product => {
      return product.id === productId
        ? { ...product, quantity: product.quantity + 1 }
        : product
    })
    setCartProducts(newCart)

    await updateLocalStorage(newCart)
  }

  const deleteProduct = async productId => {
    const newCart = cartProducts.filter(pd => pd.id !== productId)

    setCartProducts(newCart)

    await updateLocalStorage(newCart)
  }

  const decreaseProduct = async productId => {
    const cartIndex = cartProducts.findIndex(pd => pd.id === productId)

    if (cartProducts[cartIndex].quantity > 1) {
      const newCart = cartProducts.map(product => {
        return product.id === productId
          ? { ...product, quantity: product.quantity - 1 }
          : product
      })

      setCartProducts(newCart)

      await updateLocalStorage(newCart)
    } else {
      deleteProduct(productId)
    }
  }

  useEffect(() => {
    const totalItens = cartProducts.reduce(
      (soma, item) => soma + item.quantity,
      0
    )
    setCartQuantity(totalItens)
  }, [cartProducts])

  useEffect(() => {
    const loadCartProducts = async () => {
      const cart = await localStorage.getItem('codeburger:cartProduct')

      if (cart) {
        setCartProducts(JSON.parse(cart))
      }
    }

    loadCartProducts()
  }, [])

  return (
    <CartContext.Provider
      value={{
        putProductInCart,
        cartProducts,
        increaseProduct,
        decreaseProduct,
        cartQuantity,
        cleanCart
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error('useCart most be used with CartContext')
  }

  return context
}

CartProvider.propTypes = {
  children: PropTypes.node
}
