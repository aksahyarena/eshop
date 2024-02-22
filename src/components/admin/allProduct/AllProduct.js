import React, { useEffect, useState } from 'react';
import { loadAllProductFromDB } from '../../../services/product';
import { DataGrid } from '@mui/x-data-grid';
import Card from '../../card/Card'
import style from '../addProduct/AddProduct.module.scss'
import { styled } from '@mui/system';
import { FaPencilAlt } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { SELECTED_PATH_FOR_UPLOAD_PRODUCT_IMAGE, STORE_PRODUCT, imageUploadStatus } from '../../../redux/slice/productSlice';
import Notiflix from 'notiflix';
import { useNavigate } from 'react-router-dom';

const StyledDataGrid = styled(DataGrid)({
  // Apply styles to the root element of the DataGrid
  '& .MuiDataGrid-root': {
    // Add your root styles here
    backgroundColor: 'lightgray',
    fontFamily: 'sans-serif', // Example font-family
  },
  '& .MuiDataGrid-columnHeaderTitle': {
   
    fontSize:"14px"
  },
  // Apply styles to the header element of the DataGrid
  '& .MuiDataGrid-colCell': {
    // Add your header styles here
    backgroundColor: 'gray',
    color: 'white',
  },
  // Apply styles to the cell element of the DataGrid
  '& .MuiDataGrid-cell': {
    // Add your cell styles here
    fontSize: '14px',
    
  },
  '& .MuiDataGrid-iconSeparator button': {
    cursor: 'pointer', // Display hand cursor by default
    transition: 'background-color 0.3s', // Add transition effect for smooth hover
    padding: '8px', // Add padding for better UX
    borderRadius: '4px', // Add border radius for rounded corners
    border: 'none', // Remove default button border
    backgroundColor: 'transparent', // Set background color as transparent
  },
  // Apply hover styles to the edit button within the DataGrid
  '& .MuiDataGrid-iconSeparator button:hover': {
    backgroundColor: 'lightgray', // Change background color on hover
  },
});
const AllProduct = () => {
  
const [productDataRows,setProductDataRows]=useState([]);
const checkImageStatus=useSelector(imageUploadStatus)
const allProdComponentImagePath=require.context("../../../server/routes/product-images",true)
const dispatch=useDispatch();
const navigate=useNavigate();
const showImagesToGrid=(img)=>{
  try {
    return allProdComponentImagePath(`./${img}`);
  } catch (error) {
  }
}
  const columns = [
    // { field: '_id', headerName: 'ID', width: 150 },
    { field: 'productName', headerName: 'Product Name', width: 150 },
    { field: 'productCategory', headerName: 'Product Category', width: 150 },
    { field: 'productBrand', headerName: 'Product Brand', width: 150 },
    { field: 'productPrice', headerName: 'Product Price', width: 150 },
    { field: 'productImg', headerName: 'Product Img', width: 150,height:150,
    renderCell: (params) => <img src={showImagesToGrid(params.value)} alt="Product" style={{ width: '100%', height: '100%' }} /> },
    { field: 'productDesc', headerName: 'Product Description', width: 150 },
    {
      field: 'edit',
      headerName: 'Edit',
      width: 20,
      renderCell: (params) => (
        <div>
          {/* <IconButton onClick={() => handleEdit(params.row)}>
            <EditIcon />
          </IconButton> */}
          <FaPencilAlt style={{cursor:"pointer"}} onClick={()=>handleProductEdit(params.row)}/>
        

        </div>
      ),
    },
    {
      field: 'delete',
      headerName: 'Delete',
      width: 20,
      renderCell: (params) => (
        <div>
            <FaTrashAlt style={{cursor:"pointer"}} onClick={()=>handleDeleteProduct(params.row._id)}/>
        </div>
      ),
    },
  ];
 const handleProductEdit=(data)=>{
  console.log(data)
  const setImagePreviewForEdit= allProdComponentImagePath(`./${data.productImg}`);
  dispatch(SELECTED_PATH_FOR_UPLOAD_PRODUCT_IMAGE({imagepath:setImagePreviewForEdit}));
  navigate(`/admin/add-product/${data._id}`);
 }
  const handleDeleteProduct=(id)=>{
    Notiflix.Confirm.show(
      'Delete Product',
      'You are about to delete product',
      'Delete',
      'Cancel',
      function okCb() {
        alert('Thank you.');
      },
      function cancelCb() {
        alert('If you say so...');
      },
      
      {
        width: "320px",
        borderRadius: "3px",
        titleColor: "orangered",
        okButtonBackground: "orangered",
        cssAnimationStyle: "zoom",
      }
    );
  }
  const fetchImagesFromDB = async () => {
    try {
      const response = await loadAllProductFromDB();
      if (!response.data) {
        throw new Error('Failed to fetch images from database');
      }
      const imageFilenames = await response.data;
      setProductDataRows(imageFilenames)
      dispatch(STORE_PRODUCT({products:imageFilenames}))
      console.log(imageFilenames);
    } catch (error) {
      console.error('Error fetching images from database:', error);
    }

   
  }
  
  useEffect(() => {
    fetchImagesFromDB();
  },[])
  return (
    <>
    <h4 className={style['margin-10']}>View All Products</h4>

      
        <Card cardClass={style.card}>
        <StyledDataGrid
          rows={productDataRows}
          columns={columns}
          getRowId={(row)=>row._id}
          pageSize={5}
          // checkboxSelection
          // disableSelectionOnClick
        />
        
      </Card>
      
      
    </>
  )
}
export default AllProduct