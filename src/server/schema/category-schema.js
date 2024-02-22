const mongoose = require("mongoose");
const categorySchema = mongoose.Schema({
    category: String

})

const categorySchemaModel = mongoose.model("category", categorySchema)
module.exports = categorySchemaModel