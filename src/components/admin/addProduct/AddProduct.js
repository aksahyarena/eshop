import React, { useEffect, useState } from 'react'
import Card from '../../card/Card'
import style from './AddProduct.module.scss'
import { storage } from '../../../firebase/config';
import { ref, uploadBytesResumable } from 'firebase/storage';
import { addProduct, editProduct, getCategory, prodImage } from '../../../services/product';
import { toast } from 'react-toastify';
import { Autocomplete, TextField } from '@mui/material';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SELECTED_PATH_FOR_UPLOAD_PRODUCT_IMAGE, STORE_PRODUCT, allProductSlice, setImagePath } from '../../../redux/slice/productSlice';

const categories = [
  { id: 1, name: "Laptop" },
  { id: 2, name: "Electronics" },
  { id: 3, name: "Fashion" },
  { id: 4, name: "Phone" },
];

const initialState = {
  productName: "",
  productImg: "",
  productPrice: 0,
  productCategory: "",
  productBrand: "",
  productDesc: "",
}
const AddProduct = () => {
  
  const [previewUrl, setPreviewUrl] = useState();
  const [prodCategory, setProdCategory] = useState();
  const [prodImageUpload, setProdImageUpload] = useState();
  const [newImage, setNewImage] = useState(false);
  const { useridToEditProduct } = useParams();
  const getAllProduct = useSelector(allProductSlice)
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const setImagePrevUrl=useSelector(setImagePath)
  let allProdComponentImagePath = require.context("../../../server/routes/product-images", true)

  const productToEdit = getAllProduct.find((item) => {
    
    return item._id === useridToEditProduct;
  })
  console.log(productToEdit)

  const detectForm = (id, f1, f2) => {
    if (id === "ADD") {
      return f1
    }
    return f2
  }
  const [product, setProduct] = useState(() => {
    const newState = detectForm(useridToEditProduct, { ...initialState }, productToEdit);
    return newState
  });


  const getCategoryCollection = async () => {
    try {
      const response = await getCategory();
      setProdCategory(response.data)
    } catch (error) {
      console.log(error)
      toast.error(`Error Occured ${error}`)
    }
  }
  useEffect(() => {
    getCategoryCollection();
    if (prodImageUpload) {
      const reader = new FileReader();
      reader.onload = () => {
        // setPreviewUrl(reader.result);
        dispatch(SELECTED_PATH_FOR_UPLOAD_PRODUCT_IMAGE({imagepath:reader.result}))
      };
      reader.readAsDataURL(prodImageUpload);
    }
  }, [prodImageUpload])

  const handleInputCHange = (e) => {
    const { name, value } = e.target
    setProduct({ ...product, [name]: value })
  }
  const handleImageChange = async (e) => {
    if(useridToEditProduct==="ADD"){
      prevImage(e.target.files[0]);
    }else{
      prevImage(e.target.files[0]);
      setNewImage(true)
    }
     
  }
  const prevImage = (getimg) => {

    try {
      console.log(getimg)
      setProdImageUpload(getimg)
      setProduct((prevData) => ({ ...prevData, productImg: getimg.name }));
    } catch (error) {
     console.log(allProdComponentImagePath);

    }
  }

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {

      const formData = new FormData();
      formData.append('image', prodImageUpload);
      const imgSavedResponse=await prodImage(formData);
     if(imgSavedResponse.data.Status){
      await addProduct(product)
      toast.success("Product added successfully");
      setProduct("");
      navigate("/admin/all-products");
     }
    } catch (error) {
      toast.error(`Error : ${error}`);
    }
  }
  const handleEditProduct = async (e) => {
    e.preventDefault();
    try {
      if (prodImageUpload) {
        const formData = new FormData();
        formData.append('image', prodImageUpload);
        await prodImage(formData);
      }
      await editProduct(product)
      toast.success("Product added successfully");
    } catch (error) {
      toast.error(`Error : ${error}`);
    }
  }


  const handleCategory = (e, value) => {
    try {
      setProduct((prevData) => ({ ...prevData, productCategory: value._id }))
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <div className={style.product}>
        <Card cardClass={style.card}>
          <h4 className={style['margin-10']}>Add Products</h4>
          <form onSubmit={detectForm(useridToEditProduct, handleAddProduct, handleEditProduct)}>
            <lable>Product Name</lable>
            <input type="text" value={product.productName} name="productName" placeholder="Enter Product Name" required onChange={(e) => handleInputCHange(e)} />

            <lable>Product Name</lable>
            <Card cardClass={style.group}>
              <div className={style.progress}>
                <div className={style["progress-bar"]} style={{ width: "50%" }}>
                  Uploading 50%
                </div>

              </div>
              <input type="file" accept='images/*' name="productImg" placeholder="Enter Product Name"
                // required
                onChange={(e) => handleImageChange(e)} />
              <input type="text" value={product.productImg}
                required
                name="imageURL" disabled />
              {/* <img src={useridToEditProduct === "ADD" ? previewUrl : allProdComponentImagePath(`./${product.productImg}`)} alt="File Preview" style={{ maxWidth: '100%', maxHeight: '200px' }} /> */}
              <img src={setImagePrevUrl} alt="File Preview" style={{ maxWidth: '100%', maxHeight: '200px' }} />

            </Card>

            <lable className={style["margin-10"]}>Product Price</lable>
            <input type="number" value={product.productPrice} name="productPrice" placeholder="Product Price" required onChange={(e) => handleInputCHange(e)} />

            <Autocomplete className={style["no-border"]}
              disablePortal
              id="combo-box-demo"
              options={prodCategory}
              getOptionLabel={(option) => option.category}
              onChange={handleCategory}
              renderInput={(params) => <TextField {...params} style={{ fontSize: '30px' }} label="Product Category" variant="standard" />}
            />
            <lable className={style["margin-10"]}>Company/Brand</lable>
            <input type="text" value={product.productBrand} name="productBrand" placeholder="Product/Brand" required onChange={(e) => handleInputCHange(e)} />

            <lable className={style["margin-10"]}>Product Description</lable>
            <textarea value={product.productDesc} name="productDesc" rows="6" col='5' required onChange={(e) => handleInputCHange(e)} ></textarea>
            <button type="submit" className="--btn --btn-primary">Submit</button>
          </form>
        </Card>

      </div>
    </>
  )

}

export default AddProduct
