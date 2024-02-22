// Here we are adding the end points of the URL which we are passing to the api.js under service folder.


const express=require('express');
const {checkUserLogged, createUser,deleteUserBYID,editUserbyID,getUserById,getDataFromDB, getUserToAuthenticate, logout} =require('../controller/user-controller.js');
const { addProduct, uploadImageToFolder, editProductInfo } = require('../controller/productController.js');
const { addCategory } = require('../controller/categoryController.js');
const multer = require('multer');
const path = require('path');
var sessionChecker = (req, res, next) => {    
    console.log(`Session Checker: ${req.session}`);
    console.log(req.session);
    if (req.session.user) {
        console.log(`Found User Session`);
    } else {
        console.log(`No User Session Found`);
        // res.redirect('/login');
    }
    next()
};
// Storage configuration for Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, 'product-images/')) // Destination folder
    },
    filename: function (req, file, cb) {
      // Generate a unique filename to prevent duplicates
      const uniqueFilename = `${Date.now()}_${file.originalname}`;
      cb(null, uniqueFilename);
    }
    
  });

  // Initialize Multer with the storage configuration
  const upload = multer({ 
    storage: storage,
    // Set overwrite to true to overwrite existing files with the same name
    limits: { fileSize: 10 * 1024 * 1024 },
    overwrite: true
  });

const router=express.Router();

router.post("/add",createUser)
router.get("/all",getDataFromDB) 
router.get("/oneuser/:id",getUserById)
router.delete("/delete/:id",deleteUserBYID)
router.post("/login111",getUserToAuthenticate)
router.get("/loogedUser",checkUserLogged)
router.get("/logout",logout)
router.post("/addProduct",addProduct);
router.get("/fetchAllProduct",getDataFromDB) 
router.put("/editProduct",editProductInfo)
router.post("/addCategory",addCategory)
router.get("/getCategory",getDataFromDB)
router.post("/uploadProductImg",upload.single("image"),uploadImageToFolder);




module.exports= router
