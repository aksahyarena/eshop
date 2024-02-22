

import axios from "axios";

//Here we are hiting our api to make the crud operation
//but to call the API we need to install the Express server 
//Lets go to the Server folder Now.

let URL = "http://localhost:8000"
//This is the url generated from installing the express server.

export const addUser = async (data) => {
    try {
        return await axios.post(`${URL}/add`, data) 
    } catch (error) {
        console.log(`Error occures while creating user: ${error}`)
    }
}

export const getusers = async () => {
    try {
        return await axios.get(`${URL}/all`);
    } catch (error) {
        console.log(`Error occures geting all users: ${error}`)
    }
}

export const getUserByID = async (oneUserID) => {
    try {
        return await axios.get(`${URL}/oneuser/${oneUserID}`);
    } catch (error) {
        console.log(`Error occures geting all users: ${error}`)
    }
}
export const editUser = async (id, data) => {
    try {

        return await axios.put(`${URL}/edit/${id}`, data);
    } catch (error) {
        console.log(`Error occures geting all users: ${error}`)
    }
}
export const deleteUserbyID = async (id) => {
    try {

        return await axios.delete(`${URL}/delete/${id}`)
    } catch (error) {
        console.log(`Error occures geting all users: ${error}`)
    }
}

export const authenticateUser = async (data) => {
    try {
        console.log("user credential is ",data)
        return await axios.post(`${URL}/login111`, data,{withCredentials: true},{headers: {
            'Content-Type': 'application/json'
             }});
    } catch (error) {
        console.log(`Error occures geting all users: ${error}`)
    }
}

export const checkUserAuth = async()=>{
    try {
        return await axios.get(`${URL}/loogedUser`,{withCredentials: true,},{headers: {
            'Content-Type': 'application/json'
             },});
    } catch (error) {
        console.log(`Session not Found: ${error}`)
    }
}
export const userSignedOff = async()=>{
    try {
        return await axios.get(`${URL}/logout`,{withCredentials: true,},{headers: {
            'Content-Type': 'application/json'
             },});
    } catch (error) {
        console.log(` ${error}`)
    }
}
