import './App.css'
import { useState } from 'react'
import { useEffect } from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Components from './pages/Components'
import Home from './pages/Home'
import Animation from './pages/Animation'
import Calculator from './pages/Calculator'
import ForwardToHome from './pages/ForwardToHome'
import AppLayout from './layouts/AppLayout'
import { fetchProducts } from './data/products'
import Todos from './pages/Todos'
import Products from './pages/Products'
import Carts from './pages/Carts'
import Login from './pages/Login'

function App() {
  const [token, setToken] = useState('')
  const [role, setRole] = useState('')
  const [products, setProducts] = useState([])
  const [carts, setCarts] = useState([])

  useEffect(() => {
    setProducts(fetchProducts())
  }, [])

  return (
    <BrowserRouter basename='/csi205/'>
      {token === '' ? (
        <Login setToken={setToken} setRole={setRole} />
      ) : (
        <Routes>
          <Route element={<AppLayout products={products} carts={carts} setToken={setToken}/>}>
            <Route path='home' element={<Home />} />
            <Route path='components' element={<Components />} />
            <Route path='animation' element={<Animation />} />
            <Route path='calculator' element={<Calculator />} />
            <Route path='todos' element={<Todos />}/>
            <Route path='products' element={<Products products={products} carts={carts} setCarts={setCarts} />} />
            <Route path='carts' element={<Carts carts={carts} setCarts={setCarts} />} />
            <Route path='*' element={<Navigate to="/home" replace />} />
          </Route>
        </Routes>
      )}
    </BrowserRouter>
  )
}

export default App
