const express = require('express');
const productSchemaModel = require('../schema/product-schema.js');
const multer = require('multer');
const path = require('path');
let UploadedImage;

const addProduct = async (request, response) => {
     try {
          const productData = await productSchemaModel({ ...request.body, productImg: UploadedImage });
          console.log("--------------------------------------------------------------")
          await productData.save()
          response.status(201).json(productData);
     } catch (error) {
          response.status(401).json({ message: error })
     }
}
const editProductInfo = async (request, response) => {
     try {
          console.log(request.body)
          const productData = await productSchemaModel.findByIdAndUpdate({ _id: request.body._id }, {

               productName: request.body.productName,
               productImg: request.body.productImg,
               productPrice: request.body.productPrice,
               productCategory: request.body.productCategory,
               productBrand: request.body.productBrand,
               productDesc: request.body.productDesc
          }, { new: true });
          console.log("--------------------------------------------------------------", productData)

          await productData.save()
          response.status(201).json(productData);
     } catch (error) {
          response.status(401).json({ message: error })
     }
}
const uploadImageToFolder = async (request, response) => {
     try {
          // const prodImage = upload.single("image");{}
          if (request.file) {
               const { filename, path } = request.file;
               UploadedImage = filename;
               const image = { filename, path };
               await image.save
               response.status(200).json({ Status: true, message: "Image uploaded successfully" });
          }

     } catch (error) {
          console.error(error);
          response.status(500).json({ Status: false, error: "Failed to upload image" });
     }

}


module.exports = {
     addProduct,
     uploadImageToFolder,
     editProductInfo
}
