const mongoose =require("mongoose") //
const Connection = (username,password) => {
    try {
        const URL = `mongodb://localhost:27017/eShop`;
        mongoose.set("strictQuery", false);
        mongoose.connect(URL, { useUnifiedTopology: true, useNewUrlParser: true})

        console.log("Database Connected")

    } catch (error) {
        console.log(`Error wile connecting with the database ${error}`)
    }
}

module.exports= Connection