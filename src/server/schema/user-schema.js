const mongoose =require("mongoose")
const bcrypt =require("bcrypt");
const userSchema = mongoose.Schema({
    //front end.
    email: String,
    password: String,
    cPassword:String

})
userSchema.pre("save", async function (next) {
    try {
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(this.password, salt) 
        this.password = hashPassword;
        console.log("hash password",this.password)
        next()
    } catch (error) {
        // next(error)
        console.log(error)
    }
})

const userSchemaModel = mongoose.model("user", userSchema);
module.exports= userSchemaModel;

