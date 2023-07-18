const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const {isEmail} = require('validator')

//table form 
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,'Please enter an username'], 
        unique:true,
        lowercase:true,
        //validate:[isEmail,'please enter a valid email']
    },
    password:{
        type:String,
        required:[true,'Please enter a password'],
        minlength:[6,'Minimum password length is 6 characters']
    }
})


// Mongoose Hook 

//passwor Hashing

userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
    next()
})


//Static Method to login user

userSchema.statics.login = async function(username,password){

    const user = await this.findOne({username:username})
    if (user){ //check UserName exist?
        const authPassword = await bcrypt.compare(password, user.password) // hash(password) compare DB hashing password! 
        if (authPassword){ // check password 
            return user
        }
        throw Error("Incorrect Password")
    }
    throw Error("Incorrect Username")

}


   
// // fire a function after data save to database(testing)   
// userSchema.post('save', function(doc, next){ //doc -> the data already save in DB
//     //function -> hungry function -> 會等待next() 
//     console.log('new user created & saved',doc);
//     next() 

// })
// // fire a function Before data save to database(testing)
// userSchema.pre('save', function(next){
//     //this (local instance, controller User 那個變數) 
//     console.log('new user about created & saved',this)
//     next() 
// })

    

const User = mongoose.model('user',userSchema)

module.exports = User