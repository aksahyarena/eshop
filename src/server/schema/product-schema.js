const mongoose =require("mongoose");
const productSchema = mongoose.Schema({
productName:String,
productImg:String,//images name
productPrice:Number,
productCategory:String,
productBrand:String,
productDesc:String

})

const productSchemaModel =mongoose.model("product",productSchema)
module.exports=productSchemaModel