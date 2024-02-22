const express = require('express');
// import session from "express-session";
// import { v4 as uuidv4 } from 'uuid';      
const userSchemaModel = require("../schema/user-schema.js");
const bcrypt = require("bcrypt");
const categorySchemaModel = require('../schema/category-schema.js');
const productSchemaModel = require('../schema/product-schema.js');

const getDataFromCollection = async (collection) => {
     try {
          let data;
          switch (collection) {
               case 'user':
                    data = await userSchemaModel.find({});
                    break;
               case 'editproduct':
                    data = await productSchemaModel.updateOne({_id:id});
                    break;
               case 'fetchproduct':
                    data = await productSchemaModel.find({});
                    break;
               case 'fetchcategories':
                    data = await categorySchemaModel.find({});
                    break;
               default:
                    throw new Error('Invalid collection name');
          }
          return data;
     } catch (error) {
          console.error('Error fetching data:', error);
          throw error;
     }
}

const createUser = async (request, response) => {
     try {
          const userdata = await userSchemaModel(request.body)
          request.session.user = userdata._id
          await userdata.save()
          response.status(201).json(userdata);
     } catch (error) {
          response.status(401).json({ message: error })
     }
}

const getDataFromDB = async (request, response) => {
     try {
          const getType=request.query.type
          const users = await getDataFromCollection(getType);
          console.log(">>>>>>>>>>>>>>>>",users)   
          // const users = await userSchemaModel.find({});
          response.status(200).json(users);

     } catch (error) {
          response.status(400).json({ message: error.message })
     }
}

const checkAdmin = () => {

}
const getUserToAuthenticate = async (request, response, next) => {
     try {

          const users = await userSchemaModel.findOne({ email: request.body.email });
          const isValid = await bcrypt.compare(request.body.password, users.password);
          if (isValid) {
               request.session.user = await users
               request.session.userEmail = users.email;
               request.session.userID = users._id;
               let sessEmail = request.session.userEmail;
               let sessID = request.session.userID
               // request.session.id = users._id;
               console.log(`users data : ${request.session.userID}`)
               request.session.save();

               if (users.email === "test1@gmail.com") {
                    response.send(`${JSON.stringify({ sessEmail, sessID, isAdmin: true })}`)
               }
               else {
                    response.send(`${JSON.stringify({ sessEmail, sessID, isAdmin: false })}`)
               }
          }
     } catch (error) {
          response.status(400).json({ message: error.message })
     }
}

const getUserById = async (request, response) => {
     try {
          const user = await userSchemaModel.findById(request.params.id);
          response.status(200).json(user)
     } catch (error) {
          response.status(400).json({ message: error.message })
     }
}
const editUserbyID = async (request, response) => {
     try {
          const user = await userSchemaModel.updateOne({ _id: request.params.id },
               {
                    name: request.body.name,
                    email: request.body.email,
                    phoneno: request.body.phoneno,
                    password: request.body.password
               });
          response.status(200).json(user)
     } catch (error) {
          response.status(400).json({ message: error.message })
     }
}

const deleteUserBYID = async (request, response) => {
     try {
          const deletedUser = await userSchemaModel.findOneAndDelete(request.params.id);
          console.log(`Deleted User ID is ${deletedUser}`)
          response.status(200).json(deletedUser)
     } catch (error) {
          response.status(400).json({ message: error.message })
     }
}

const checkUserLogged = (request, response) => {
     try {
          let SesEmail = request.session.userEmail
          let SesID = request.session.userID
          if (SesEmail) {
               response.status(201).json({ SesEmail, SesID, isAdmin: SesEmail === "test1@gmail.com" ? true : false })
          }
          else {
               response.status(201).json({ message: "No Auth Found" })
          }
     } catch (error) {
          response.status(400).json({ message: error.message })
     }
}
const logout = async (request, response) => {
     try {
          await request.session.destroy(function (err) {
          })
          await response.status(201).json({ message: "Session Out" })
     } catch (error) {
          response.status(400).json({ message: error.message })
     }
}



module.exports = {
     createUser,
     getDataFromDB,
     getUserToAuthenticate,
     getUserById,
     editUserbyID,
     deleteUserBYID,
     checkUserLogged,
     logout,
}

//Request  : It is what you want to send from Front End to youer backend/sever
//Response : It is what you want to send from backend/server to Front End

//If we write request.body only then it will  show us undefined.
//So thats why,Here we have to install the one package name as "bodyParser" by using npm i body-parser.
//Because the express server can not handle the post api body .

