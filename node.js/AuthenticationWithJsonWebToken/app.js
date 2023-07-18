const express = require('express') 
const mongoose = require('mongoose') 
const authRouters = require('./routers/authRouters')

const cookieParser = require('cookie-parser') // middleware 
const {requireAuthToken, injectUserDataToview} = require('./middleware/authMiddleware')

const app = express();

// middleware
app.use(express.static('public'));
//parse json data 
app.use(express.json())
//cookie (set/read)
app.use(cookieParser())

// view engine
app.set('view engine', 'ejs');

// database connection
// const dbURI = 'mongodb+srv://meowhecker:meowhecker@cluster0.3zudqmo.mongodb.net/node-auth';
// mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
//   .then((result) => app.listen(3000))
//   .catch((err) => console.log(err));

const DBurl = "mongodb+srv://meowhecker:mfbamKhtAfZ9zjkn@cluster0.3zudqmo.mongodb.net/nodeAuth" 

async function connetToMongoDB () {
    try{
        await mongoose.connect(DBurl, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
        console.log("Connect to mogoDB !!")
    } catch(error){
        console.error(error)
    }
}

connetToMongoDB()
app.listen(8001,()=>{

  console.log("app started on the port 8001")

});


// routes

//Main web 
app.get('*',injectUserDataToview) // middleware (the check factor:JWT token )
app.get('/', (req, res) => res.render('home'));
app.get('/adminpanel', requireAuthToken , (req, res,) => res.render('adminpanel'));

//auth routers
app.use(authRouters) // authRouter 直接寫也可以喔

//cookies

// app.get('/set-cookies', (request,response)=>{

//     //response.setHeader('Set-Cookie', 'NewUser=ture') //basic way 
//     response.cookie("NewUser",false)
//     response.cookie("IsEmployee",true,{maxAge: 1000* 60 * 60 *24, secure:false, httpOnly:true}) //expire 1 天

//     response.send("you got the cookies !!") //response body 
// })

// app.get('/read-cookies',(request,response)=>{

//     const cookies = request.cookies
//     console.log(cookies)
//     console.log(cookies.NewUser)
//     console.log(cookies.IsEmployee)

//     response.json(cookies) //read the cookie and send back to the browser 

// })