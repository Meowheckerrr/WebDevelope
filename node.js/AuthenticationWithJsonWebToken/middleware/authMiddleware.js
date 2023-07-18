const jsonwebtoken = require('jsonwebtoken')
const User = require('../models/User')

//middleware (next)
const requireAuthToken = (request, response , next)=>{

    //get the request Token 
    const token = request.cookies.JWT // cookies."cookie Name" 

    //have token ?
    if (token){
        //verify the token 
        const authToken = jsonwebtoken.verify(token,'meowheckerPrivateKey',(errors,decodedToken)=>{
            if (errors){
                response.redirect("/login")
            }else {
                console.log(decodedToken)
                next()  // verify successfully
            }
        })

    }else{
        //if not ->do>
        response.redirect('/login')
    }
}

// middleware (next)
const injectUserDataToview =  (request,response,next)=>{
    const token = request.cookies.JWT
    console.log(3)
    if(token){
        //verify the token 
        console.log(2)
        const authToken = jsonwebtoken.verify(token,'meowheckerPrivateKey',async (errors,decodedToken)=>{
           if (errors){
                console.log(errors.message)
                response.locals.user = null
                next()
           }else {
               console.log(decodedToken)
               let user = await User.findById(decodedToken.userId) //grab user data from user
               console.log(decodedToken.userId)
               console.log(1)
               response.locals.user = user
               next()  // verify successfully
           }
        })
    }else{
        response.locals.user = null
        console.log(4)
        next()
    }

}

//export 
module.exports={requireAuthToken,injectUserDataToview}