import { useState, useEffect } from 'react'
import { Routes, Route, BrowserRouter, useNavigate } from 'react-router-dom'
import { addProduct, deleteProduct, getAllProduct, updateProduct } from './api/product'
// import './App.css'
import Dashboard from './pages/Admin/Dashboard'
import ProductAdd from './pages/Admin/ProductAdd'
import ProductUpdate from './pages/Admin/ProductUpdate'
import HomePage from './pages/HomePage'
import ProductPage from './pages/Product'
import ProductDetail from './pages/ProductDetail'
import { IProduct } from './types/products'
import ProductManagementPage from './pages/Admin/ProductManagement'
import AdminLayouts from './layouts/AdminLayouts'
import WebsiteLayouts from './layouts/WebsiteLayouts'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import CategoriesManagement from './pages/Admin/Categories/CategoriesManagement'
import CategoriesAdd from './pages/Admin/Categories/CategoriesAdd'
import CategoriesUpdate from './pages/Admin/Categories/CategoriesUpdate'
import { ICategory } from './types/categories'
import { addCategories, deleteCategories, getAllCategories, updateCategories } from './api/categories'
import { message } from 'antd'


function App() {
  const [products, setProducts] = useState<IProduct[]>([])
  console.log(products);
  useEffect(() => {
    getAllProduct().then(({ data }) => setProducts(data))
  }, [])

  const navigate = useNavigate()
  const [categories, setCategories] = useState<ICategory[]>([])
  console.log(categories);
  useEffect(() => {
    getAllCategories().then(({ data }) => setCategories(data))
  }, [])


  const onHandleRemove = (id: string | undefined) => {
    deleteProduct(id).then(() => setProducts(products.filter((item: IProduct) => item._id !== id)))
      .then(data => {
        console.log('Success:', data);
        message.success('Xoá thành công');
        navigate('/admin/all')
      })
      .catch(err => {
        console.log('Error:', err);
        message.error(err.response.data.message);
      })
  }
  const onHandleRemoveC = (id: string | undefined) => {
    deleteCategories(id).then(() => setCategories(categories.filter((itemC: ICategory) => itemC._id !== id)))
      .then(data => {
        console.log('Success:', data);
        message.success('Xoá thành công');
        navigate('/admin/categories')
      })
      .catch(err => {
        console.log('Error:', err);
        message.error(err.response.data.message);
      })
  }

  const onHandleAdd = (product: IProduct) => {
    addProduct(product)
      .then(item => {
        getAllProduct().then(({ data }) => setProducts(data))
          .then(data => {
            console.log('Success:', data);
            message.success('Add thành công');
            navigate('/admin/all')
          })
      })
      .catch(err => {
        console.log('Error:', err);
        message.error(err.response.data.message);
      })
  }
  const onHandleAddC = (category: ICategory) => {
    addCategories(category)
      .then(itemC => {
        getAllCategories().then(({ data }) => setCategories(data))
          .then(data => {
            console.log('Success:', data);
            message.success('Add thành công');
            navigate('/admin/categories')
          })
      })
      .catch(err => {
        console.log('Error:', err);
        message.error(err.response.data.message);
      })
  }

  const onHandleUpdate = (id: string | undefined, product: IProduct) => {
    updateProduct(id, product)
      .then(item => {
        getAllProduct()
          .then(({ data }) => setProducts(data))
          .then(data => {
            console.log('Success:', data);
            message.success('Update thành công');
            navigate('/admin/all')
          })
      })
      .catch(err => {
        console.log('Error:', err);
        message.error(err.response.data.message);
      })
  }
  const onHandleUpdateC = (id: string | undefined, category: ICategory) => {
    updateCategories(id, category)
      .then(itemC => {
        getAllCategories().then(({ data }) => setCategories(data))
          .then(data => {
            console.log('Success:', data);
            message.success('Update thành công');
            navigate('/admin/categories')
          })
      })
      .catch(err => {
        console.log('Error:', err);
        message.error(err.response.data.message);
      })
  }

  return (
    <div className="App">
      {/* <BrowserRouter> */}
      <Routes>
        <Route path='/admin' element={<AdminLayouts />}>
          <Route index element={<HomePage />} />
          <Route path='all'>
            <Route index element={<ProductManagementPage products={products} onRemove={onHandleRemove} />} />
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='add' element={<ProductAdd onAdd={onHandleAdd} />} />
            <Route path='update/:id' element={<ProductUpdate products={products} onUpdate={onHandleUpdate} />} />
          </Route>
          <Route path='categories'>
            <Route index element={<CategoriesManagement categories={categories} onRemoveC={onHandleRemoveC} />} />
            <Route path='add' element={<CategoriesAdd onAddC={onHandleAddC} />} />
            <Route path='update/:id' element={<CategoriesUpdate categories={categories} onUpdateC={onHandleUpdateC} />} />
          </Route>
        </Route>

        <Route path='/' element={<WebsiteLayouts />}>
          <Route path='products' >
            <Route index element={<ProductPage />} />
            <Route path=':id' element={<ProductDetail />} />
          </Route>
        </Route>
        <Route path='/' >
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
        </Route>
      </Routes>
      {/* </BrowserRouter> */}
    </div>
  )
}

export default App