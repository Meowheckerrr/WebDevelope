const User = require('../models/User')
const jsonwebtoken = require('jsonwebtoken')

const handleErrors = (errorObj)=>{
    //console.log(errorObj.message,errorObj.code)
    
    let errorsMessages ={username:'',password:''}

    console.log(errorObj.message)

    //Username is not exist 
    if (errorObj.message === "Incorrect Username"){
        errorsMessages.username = "that username is not Incroorect"
    }
    // password in not Incroorect
    if (errorObj.message === "Incorrect Password"){
        errorsMessages.password = "that password is not Incroorect"
    }

    //duplication error code 
    if (errorObj.code === 11000){
        errorsMessages.username = "that username is already registred!!"
        return errorsMessages
    }

    // validation errors
    if(errorObj.message.includes('user validation failed')){
        Object.values(errorObj.errors).forEach(({properties}) => {
            console.log(properties)
            errorsMessages[properties.path] = properties.message
            
        })
    }
    //console.log(errorsMessages)
    return errorsMessages  // return error with json form 
}

//JWT 

//Create JWt token 

const maxAge = 3 * 24 * 60 *60 // 3day
const createJWT = (userId)=>{
    const token = jsonwebtoken.sign({userId},"meowheckerPrivateKey",{
        expiresIn:maxAge
    } ) //payload,private key, token attributes
    return token
}



module.exports.signupGet = (request,response) => {
    response.render('signup')

}
module.exports.signupPost = async (request,response) => {

    const {username,password} = request.body
    try {
        const user = await User.create({username,password}) // this function is async, it's will get a promise 
        
        //setting jwt token -> cookie 
        const jwtToken = createJWT(user._id) //console.log(user._id)
        
        response.cookie('JWT',jwtToken,{httpOnly:true,maxAge:3 * 24 * 60 * 60 *1000})
        
        response.status(201).json({userId:user._id}) // response to Browser 
        //response.send('new sighup!!')
  
    }
    catch(error){
        const errorsMessages = handleErrors(error)  //return javascript Object 
        console.log(errorsMessages)
        response.status(400).json({errorsMessages})
    }
}
module.exports.loginGet = (request,response) => {
    response.render('login')
}

module.exports.loginPost = async (request,response) => {
   
    //拆成不同變數
    const {username, password} = request.body //variable Name 要跟json key 一樣
    try{
        const user = await User.login(username,password) //user variable, getting from the database

        //Create JWT token After login 
        const jwtToken = createJWT(user._id) //console.log(user._id)
        response.cookie('JWT',jwtToken,{httpOnly:true,maxAge:3 * 24 * 60 * 60 *1000})

        response.status(200).json({userId:user._id})        
    }catch(error){
        const errors = handleErrors(error)
        response.status(400).json({errors})
    }

}

module.exports.logout = (request,response)=>{
    
    response.cookie('JWT','',{maxAge:1,httpOnly:true})
    response.redirect('/')

}