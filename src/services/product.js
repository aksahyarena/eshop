

import axios from "axios";

let URL = "http://localhost:8000"
const requestConstants={
    FetchCategoty:"fetchcategories",
    FetchProduct:"fetchproduct",
    EditProduct:"editproduct"
}


export const addProduct =async(data) => {
    try {
        console.log(data)
        return await axios.post(`${URL}/addProduct`, data) 
    } catch (error) {
        console.log(`Error occures while creating user: ${error}`)
    }
}
export const editProduct =async(data) => {
    try {
        console.log(data)
        return await axios.put(`${URL}/editProduct`, data) 
    } catch (error) {
        console.log(`Error occures while creating user: ${error}`)
    }
}
export const addCategory = async (data) => {
    try {
        return await axios.post(`${URL}/addCategory`, data)
    } catch (error) {
        console.log(`Error occures while creating user: ${error}`)
    }
}
export const getCategory = async () => {
    try {
        return await axios.get(`${URL}/getCategory?type=${requestConstants.FetchCategoty}`)
    } catch (error) {
        console.log(`Error occures while creating user: ${error}`)
    }
}
export const prodImage = async (formData) => {
    try {
        return await axios.post(`${URL}/uploadProductImg`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    } catch (error) {
        console.log(`Error occures while creating user: ${error}`)
    }
}

export const loadAllProductFromDB = async () => {
    try {
        return await axios.get(`${URL}/fetchAllProduct?type=${requestConstants.FetchProduct}`);
    } catch (error) {
        console.log(`Error occures while creating user: ${error}`)
    }
}
