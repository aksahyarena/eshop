import React from 'react'
import styles from "./Admin.module.scss";
import Home from '../../components/admin/home/Home'
import ViewProduct from '../../components/admin/viewProducts/ViewProduct'
import AddProduct from '../../components/admin/addProduct/AddProduct'
import OrderDetails from '../../components/admin/orderDetails/OrderDetails'
import { Route, Routes } from 'react-router-dom';
import Navbar from '../../components/admin/navbar/Navbar';
import AddCategory from '../../components/admin/addCategory/AddCategory';
import AllProduct from '../../components/admin/allProduct/AllProduct';
const Admin = () => {
  return (
    <div className={styles.admin}>
      <div className={styles.navbar}>
        <Navbar />
      </div>
      <div className={styles.content}>
        <Routes>
          <Route path="home" element={<Home />} />
          <Route path="add-product/:useridToEditProduct" element={<AddProduct />} />
          <Route path="orders" element={<OrderDetails />} />
          <Route path="order-details/:id" element={<OrderDetails />} />
          <Route path="add-category" element={<AddCategory />} />
          <Route path="all-products" element={<AllProduct />} />
          
        </Routes>
      </div>
    </div>
  )
}

export default Admin
