const express = require('express');
const categorySchemaModel = require('../schema/category-schema.js');


const addCategory = async (request, response) => {
    try {
         const categoryData = await categorySchemaModel(request.body)
         console.log("--------------------------------------------------------------")
         await categoryData.save()
         response.status(201).json(categoryData);
    } catch (error) {
         response.status(401).json({ message: error })
    }
}

module.exports = {
    addCategory
}
