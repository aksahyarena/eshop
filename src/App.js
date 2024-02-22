import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Home, Contact,Login,Register,Reset } from './pages/index' //or import { Home, Contact } from './pages/index' because index js is in the root of page
import{Header,Footer} from './components' //or import{Header,Footer} from './components' because index js is in the root of component

import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import {AdminOnlyRoute} from './components/adminOnlyRoute/AdminOnlyRoute'
import Admin from './pages/admin/Admin'
import AddProduct from './components/admin/addProduct/AddProduct'
import Permission from './components/Permission'
import DUm from './components/admin/addProduct/DUm'
import ErrorBoundary from './components/ErrorBoundary'

export default function App() {

  return (
    <>
      <BrowserRouter>
      <ErrorBoundary>
      <ToastContainer/>
        <Header />
        {/* <DUm/> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} /> 
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/reset" element={<Reset />}></Route>
          <Route path="/dash" element={<AddProduct />}></Route>
          <Route path="/*" element={<Permission />}></Route>
          <Route path="/admin/*" element={<AdminOnlyRoute><Admin/></AdminOnlyRoute>}></Route>
        </Routes>
 
        <Footer />
        </ErrorBoundary>
      </BrowserRouter>

    

    </>
  )
}



// import React, { useRef, useState } from 'react'

// export const Child=({props,ref})=>{

//   return(
//     <>
//     <input type="text" ref={ref} {...props}/>
//     </>
//   )
// }
// const App=()=>{
//   const inputRef=useRef();
//   const[state,setState]=useState();
//   const handleClick=(e)=>{
//     e.preventDefault();
//     setState(inputRef.current.value);
    
//   }
//   return(
//     <>
//       <h1>UseRef Example</h1>
//       <h1>{state}</h1>
    
//       <input type="text"  ref={inputRef} placeholder="ENter Name"/>
//       <button onClick={handleClick}>Get Name</button>
//     </>
//   )
// }

// export default App