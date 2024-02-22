import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
    imagePath:""
}
const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        STORE_PRODUCT: (state, action) => {
            console.log(action.payload.products)
            state.products = action.payload.products;
        },
        SELECTED_PATH_FOR_UPLOAD_PRODUCT_IMAGE:(state,action)=>{
            state.imagePath=action.payload.imagepath
        }
       
    }
})

export const { STORE_PRODUCT,SELECTED_PATH_FOR_UPLOAD_PRODUCT_IMAGE } = productSlice.actions; //slicename.actions
export const allProductSlice = (state) => state.product.products //state.name_of_slice.products
export const imageUploadStatus = (state) => state.product.isImageUploaded;
export const setImagePath = (state) => state.product.imagePath;

// here name is the value of key property of productSlice.

export default productSlice.reducer