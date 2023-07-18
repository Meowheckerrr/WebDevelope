
https://www.youtube.com/watch?v=SnoAwLP1a-0&list=PL4cUxeGkcC9iqqESP8335DA5cRFp8loyp

gitHub 
https://github.com/iamshaunjp/node-express-jwt-auth/tree/lesson-1

[TOC]



# Introduction & SetUp


Json web token ->　Authentication systems management (驗證系統管理)


```
USER@DESKTOP-QGJ2K9H MINGW64 ~/Desktop/NQUCS/Web/jwtAuth (master)
$ git clone --branch lesson-1 https://github.com/iamshaunjp/node-express-jwt-auth.git

```

## ejs
(embedded javascript) -> 模板 data embeding 到 前端
據動態數據生成frontend內容


## Express

可以把EXPRESS -> 想成Frame work 主架構
基於路由的方式來 處理HTTP請求


## package.json 

```json
{
  "name": "node-express-jwt-auth",
  "version": "1.0.0",
  "description": "",
  "main": "app.js",
  "dependencies": {
    "ejs": "^3.1.3",
    "express": "^4.17.1",
    "mongoose": "^5.9.23"
  },
  "devDependencies": {},
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/iamshaunjp/node-express-jwt-auth.git"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/iamshaunjp/node-express-jwt-auth/issues"
  },
  "homepage": "https://github.com/iamshaunjp/node-express-jwt-auth#readme"
}

```

Install packages 

```
npm install

```



可以即時跟新對web 修改
```
npm install nodemon -g
```


Run web application 
```
nodemon app
```


## MongoDB 設定

### 在Windows上安裝 MongoDB
```
`C:\> wmic os get osarchitecture`

```

MongoDB Download
https://www.mongodb.com/try/download/community

確定computer archi 


創建 MongoDB 帳戶

到 Security 
Create 一個 user Account 

加入自己的IP


取得 Node js appplication (DB 連結)
![](https://hackmd.io/_uploads/BkjDpg6tn.png)


### 創建Database (on cloud) and user Table 

![](https://hackmd.io/_uploads/H138bN6t3.png)

Clicking on Browse Collection. 

Add My own Data

![](https://hackmd.io/_uploads/BJtVMN6F3.png)



設定 Package.json

```
PS C:\Users\USER\Desktop\NQUCS\Web\nodeJsConnetToDB> npm init
```

entry point -> main program (入口)
```
package name: (nodejsconnettodb) connect_to_db
version: (1.0.0)
description: meow
entry point: (index.js) server.js
test command:
git repository:
keywords:
author: MeowHacker
license: (ISC) MIT
```

安裝Mongo DB driver 跟 Express 

```
npm install express 
npm install mongoose --save
```


### server.js (Verify)


```

//basic set up, 
//import lib 

const express = require("express");
const mongoose = require("mongoose");
const server = express();

const DBurl = "mongodb+srv://<userName>:<password>@cluster0.3zudqmo.mongodb.net/nodeAuth" 

async function connetToMongoDB () {
    try{
        await mongoose.connect(DBurl)
        console.log("Connect to mogoDB !!")
    } catch(error){
        console.error(error)
    }
}

connetToMongoDB();

server.listen(8000,()=>{

    console.log("Server started on the port 8000")

});



```

## Run app.js

```javascript
const express = require('express');
const mongoose = require('mongoose');

const app = express();

// middleware
app.use(express.static('public'));

// view engine
app.set('view engine', 'ejs');

// database connection 要記得url 設定DB name
const DBurl = "mongodb+srv://<account>:<password>@cluster0.3zudqmo.mongodb.net/nodeAuth" 

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
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));
```

MiddleWare

中間件（Middleware）是在請求（Request）和回應（Response）處理之間執行的函式

靜態資源伺服器

可以根據請求的 URL 路徑將(Request)映射到相應的靜態檔案，並將其發送(Response)給客戶端

使我們Run COde 比較不會錯
```
useNewUrlParser: true, 
useUnifiedTopology: true, 
useCreateIndex:true
```
async  -> 完成或return promise 

Promis -> 表示Function 未來狀態

Promise 可以有三種狀態：
- 等待（pending）、
- 已實現（fulfilled）
- 已拒絕（rejected）


Promise 提供了 `then()` 方法，使我們能夠在 Promise 被解決後執行相應的處理邏輯
`then()` 來鏈接多個 Promise

e.g. 
```javascript
const myPromise = new Promise((resolve, reject) => {
  // 非同步操作
  // 成功時調用 resolve(value)
  // 失敗時調用 reject(error)
});

myPromise.then((value) => {
  // 當 Promise 成功解決時執行的處理邏輯
}).catch((error) => {
  // 當 Promise 拒絕時執行的錯誤處理邏輯
});
```

```javascript
connetToMongoDB.then((value)=>{ //function return resolve
    server.listen(8000)
    console.log("Server started on the port 8000")
}).ecath((error)=>{ // funcition return reject
    console.error(error)
})
```

## localhost:8001

### FireWall (disable for the DB Connection )

Attension: 連到Cloud server 防火牆 要關
![](https://hackmd.io/_uploads/SkHwBfat2.png)


```
PS C:\Users\USER\Desktop\NQUCS\web\jwtAuth\node-express-jwt-auth-1> node .\app.js
app started on the port 8001
Connect to mogoDB !!
```


# Auth Routes & 

MVC Model (model,view,controller)

![](https://hackmd.io/_uploads/HJ1u4NpK2.png)


Router (獨立一個 Folder)

```javascript
const {Router} = require('express')

const router = Router()

router.get('/signup', ()=>{})
router.post('/signup', ()=>{})
router.get('/login', ()=>{})
router.post('/login', ()=>{})
router.get('/logout', ()=>{})

module.exports = router
```

---

Controller 

```javascript
module.exports.signupGet = ((request,response) => {
    response.render('signup')
})
module.exports.signupPost = ((request,response) => {
    response.send('new sighup!!')
})
module.exports.loginGet = ((request,response) => {
    response.render('login')
})
module.exports.loginPost = ((request,response) => {
    response.send('user Login ')
})
```

Render -> 會去Views 下找 ejs 來用 


---

把Controller 跟 Router 合起來

```javascript
const {Router} = require('express')
const authController = require('../controllers/authController')


const router = Router()

router.get('/signup', authController.signupGet)
router.post('/signup', authController.signupPost)
router.get('/login', authController.loginGet)
router.post('/login', authController.loginPost)
router.get('/logout', ()=>{})

module.exports = router
```


再把創好的Router 放到 Express 來執行

![](https://hackmd.io/_uploads/S1eYREpKh.png)


# Testing Routing & Handling Post Request 

Post man 有點像 burtSuite 的Repeter module

![](https://hackmd.io/_uploads/BkSioI0K3.png)


也能測試 Post request 請求

![](https://hackmd.io/_uploads/HkRDn80Yh.png)


## Post reqeust (json handle)

node.js 要處理 Post request 中的 json 需要有middleware(javascrpt object) 幫忙 並在js 程序中使用 client 傳過來的json 資料

```
// middleware
app.use(express.static('public'));
//parse json data 
app.use(express.json())
```

controller 
```
module.exports.loginPost = ((request,response) => {
    console.log(request.body)
    //拆成不同變數
    const {userName, password} = request.body //variable Name 要跟json key 一樣
    console.log (userName,password)  
    response.send('user Login ')
})
```

Post Request 
![](https://hackmd.io/_uploads/HJLfeDAth.png)


Result 
![](https://hackmd.io/_uploads/ry-zeD0Kn.png)



# User Model

這裡的Model -> 有點像是 定義 table 表

提供給controller 來做動作(Action)


## Defind User table 

```javascript=

const mongoose = require('mongoose')

//table form 
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true,
        minLength:6
    }
})


const User = mongoose.model('user',userSchema)

module.exports = User
```


## Create New user 


他是async function 
User.create({username,password}) 會回傳promise 


```javascript
module.exports.signupPost = async (request,response) => {

    const {username,password} = request.body
    try {
        const user = await User.create({username,password}) // this function is async, it's will get a promise 
        response.status(201).json(user) // response to Browser 
        response.send('new sighup!!')
    }
    catch(error){
        console.log(error)
        response.status(400).send("error, user not created !! ")
    }
}
```


User Create Controller 
```javascript
module.exports.signupPost = async (request,response) => {

    const {username,password} = request.body
    try {
        const user = await User.create({username,password}) // this function is async, it's will get a promise 
        response.status(201).json(user) // response to Browser 
        response.send('new sighup!!')
    }
    catch(error){
        console.log(error)
        response.status(400).send("error, user not created !! ")
    }
}
```

Post Request 

![](https://hackmd.io/_uploads/ryxcSu0F2.png)


## Mongoose Validation

```
npm install validator
```


```javascript
//table form 
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,'Please enter an email'], 
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

```

可以透過array 來 存Error Message 



![](https://hackmd.io/_uploads/rko7JFCF3.png)

![](https://hackmd.io/_uploads/HyNNktRY2.png)

Error Code = undefined !!


---

Error Handler 
要去提取 property 裡面的error message 

```
console.log(errorObj)
```


![](https://hackmd.io/_uploads/rkcFQYCtn.png)


objectValue(object) -> 把Object 塞進Array -> 來做遍歷

```
const handleErrors = (errorObj)=>{
    //console.log(errorObj.message,errorObj.code)
    
    let errors ={username:"",password:""}

    if(errorObj.message.includes('user validation failed')){
        console.log(Object.values(errorObj.errors))
    }

}
```

![](https://hackmd.io/_uploads/rku_SKRt2.png)

---


在這個 object Array 用forEech 取出property 


```
const handleErrors = (errorObj)=>{
    //console.log(errorObj.message,errorObj.code)
    
    let errors ={username:"",password:""}

    if(errorObj.message.includes('user validation failed')){
        Object.values(errorObj.errors).forEach(error => {
            console.log(error.properties)
        })
    }

}
```


質佳抓 property object 

```
const handleErrors = (errorObj)=>{
    //console.log(errorObj.message,errorObj.code)
    
    let errors ={username:"",password:""}

    if(errorObj.message.includes('user validation failed')){
        Object.values(errorObj.errors).forEach(({properties}) => {
            console.log(properties)
        
        })
    }

}
```



Return ErrorMessage (json)(done)

```javascript
const handleErrors = (errorObj)=>{
    //console.log(errorObj.message,errorObj.code)
    
    let errorsMessages ={username:'',password:''}

    if(errorObj.message.includes('user validation failed')){
        Object.values(errorObj.errors).forEach(({properties}) => {
            console.log(properties)
            errorsMessages[properties.path] = properties.message
            
        })
    }
    //console.log(errorsMessages)
    return errorsMessages  // return error with json form 
}
```

![](https://hackmd.io/_uploads/BJqTdFAt2.png)


(Controller) Return Json form to client 

```javascript
atch(error){
        const errorsMessages = handleErrors(error)  //return javascript Object 
        console.log(errorsMessages)
        response.status(400).json({errorsMessages})
    }
```


---


![](https://hackmd.io/_uploads/SJRvsK0Y2.png)


Check duplication email 

```javascript 
   //duplication error code 
    if (errorObj.code === 11000){
        errorsMessages.email = "that email is already registred!!"
        return errorsMessages
    }

```


----
# Mongoose Hook 

Hook -> 有點像middleware 

能對 資料進行 pre-procses or post-process

## post-process 

post function -> 會處於hungry 等待next() 被執行

```javascript
// Mongoose Hook 

    // fire a function after data save to database         
    userSchema.post('save', function(doc, next){
        //function -> hungry function -> 會等待next() 
        console.log('new user create & save',doc);
        //next() 

    })
```

```
[nodemon] starting `node .\app.js`
app started on the port 8001
Connect to mogoDB !!
new user create & save {
  _id: 64b1b17e9986603164eb87b4,
  username: 'meowhe1ck1err1rr',
  password: 'testwr1e1wrw1123',
  __v: 0
}
```

他在 Response 掛起了

Response 
server --Hook(post-process)--> client
![](https://hackmd.io/_uploads/HJNs6h1q2.png)
他是有傳到DB的

---
有next () 下

```
// fire a function after data save to database         
    userSchema.post('save', function(doc, next){
        //function -> hungry function -> 會等待next() 
        console.log('new user create & save',doc);
        next() 

    })
```

![](https://hackmd.io/_uploads/HJiXRnyq2.png)


## pre-Process

在save to Cloud DB 之前 觸發Funciton 

我們能在取得request 後去做處理

request 
clinet --->Hook--->server 
```javascript
// fire a function Before data save to database 
    userSchema.pre('save', function(next){
        //this (local instance, controller User 那個變數) 
        console.log('new user about created & saved',this)
        next() 
    })
```

```
app started on the port 8001
Connect to mogoDB !!
new user about created & saved {
  _id: 64b1b5cdc020060274a4d95f,
  username: 'meowhe1ck111e1rr1rr',
  password: 'testwr1e1wrw1111323'
}
{
  username: '',
  password: '',
  email: 'that email is already registred!!'
```


# Hashing the password 


bcrypt -> 加密算法


packet JSON
```
npm install bcrypt 
```

![](https://hackmd.io/_uploads/r1qENT19n.png)


![](https://hackmd.io/_uploads/SJhxmpJ5n.png)

![](https://hackmd.io/_uploads/B1aGmpkcn.png)
透過加salt 方式 避免 Ranbow attack 
在登入時 會先將 輸入的password加salt 跟DB中Hash password 做比較喔


## Hash the password 

增加以點security (salt)

```
userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
    next()
})
```
this -> local instance (User)

![](https://hackmd.io/_uploads/rJ0W3T193.png)

![](https://hackmd.io/_uploads/HkVgTT1ch.png)


# Authentication View

Form 
```htmlmixed=
<form>
    <h2>Sign up page</h2>

    <label for="username">UserName</label>
    <input type="text" name="username" required/>
    <div class="username error"></div>

    <label for="password">Password</label>
    <input type="password" name="password" requiere/>
    <div class="password error"></div>

    <button>Sign up</button>
</form>

```

## Grabbing the value from the form

```htmlmixed=

<script>
    const formElement = document.querySelector('form') 

    formElement.addEventListener('submit',(event)=>{ //監聽submit 事件
        event.preventDefault(event) //subit Defaut event -> prevent refresh page (不然會送不了)


        //get the vale from form 

        const username = formElement.username.value
        const password = formElement.password.value
        console.log(username,password)

    })
</script>


```



![](https://hackmd.io/_uploads/SkfuL0kq3.png)

# Cookies 

cookie -> 可以放data 在User 的Browser

跟蹤在internet 上的活動e.g. google analysis 

![](https://hackmd.io/_uploads/HJxBixec2.png)

---

![](https://hackmd.io/_uploads/B16Ssggq3.png)

---

第2次使用website

![](https://hackmd.io/_uploads/rJbwixl5h.png)


cookie 裡面可以有一個(jwt) 來authentication User 身分

vulnerable -> CSRF 


## Set the cookie 

```javascript
app.get('/set-cookies', (request,response)=>{

    response.setHeader('Set-Cookie', 'NewUser=ture')
    response.send("you got the cookies !!")
})
```

![](https://hackmd.io/_uploads/r1u6aex9n.png)

![](https://hackmd.io/_uploads/B13JRll92.png)



## Parse cookie (使用cookie)


packages 
```
npm install cookie-parser
```

![](https://hackmd.io/_uploads/BJKs1Zlcn.png)


middleware 

每個傳送到 Web application 的cookie 都可以讀到 
```
app.use(cookieParser())
```

```
 resonse.cookie("IsEmployee",ture,{maxAge: 1000* 60 * 60 *24, secure:true, httponly:true}) //expire 1 天
```

cookie 可以接 object attribute

secure: 只會在HTTPS 下傳送

httpOnly: 無法使用js Read the cookie 


![](https://hackmd.io/_uploads/HypGmbxc2.png)

如果沒有設定 expire -> close browser, cookie will be removed

```javascript
app.get('/set-cookies', (request,response)=>{

    //response.setHeader('Set-Cookie', 'NewUser=ture') //basic way 
    response.cookie("NewUser",false)
    response.cookie("IsEmployee",true,{maxAge: 1000* 60 * 60 *24, secure:true, httpOnly:true}) //expire 1 天

    response.send("you got the cookies !!") //response body 
})
```

![](https://hackmd.io/_uploads/Bk1GSZxqh.png)


## Read Cookies

```javascript
app.get('/read-cookies',(request,response)=>{

    const cookies = request.cookies
    console.log(cookies)
    console.log(cookies.NewUser)
    console.log(cookies.IsEmployee)

    response.json(cookies) //read the cookie and send back to the browser 

})
```
可以透過 cookies.Keyname -> 來取得cookie 特定的value

```
{ NewUser: 'false', IsEmployee: 'true' }
false
true
```
![](https://hackmd.io/_uploads/BkvWPZg9n.png)


# Json web token 

Client Send account 跟 password 到server 並檢查 跟Database 中的 password(hash) 如果一樣會創建 JWT 給client 存在Client Browser

JWT data (經過身分認證)
會有自身身分(用來識別身分)
他會被進行特殊 Encode or Encrypte

當client 訪問其他需要登入Page時
Server 就會 parser Client 送過來的Cookie 裡的Token 
![](https://hackmd.io/_uploads/ryRX_-Z52.png)


JWT token -> 如果能被Attacker 拿到會有CSRF 問題


## State Change Endpoint

更改端點-> 會對 Web application 進行跟新或更改的URL

狀態更改端點使用 HTTP 方法 e.g. GET、POST、PUT、DELETE 等

## CSRF

Attacke way 1
1.  受害者訪問惡意網站。
2.  惡意網站中的 JavaScript 代碼自動觸發請求到資料更改端點。
3.  該請求中包含攻擊者生成的 JWT，因為 JWT 已存儲在受害者的瀏覽器中（例如，Cookie 中）。
4.  資料更改端點收到請求，驗證 JWT，並認為該請求是合法的，因為 JWT 的簽名是有效的。
5.  資料更改端點執行請求中指定的操作，並將結果返回給攻擊者的網站。
Attacke way 2

透過XSS 來取的Browser Cookie 傳回Server 


## JWT implement

[JWT debugger](https://jwt.io/)

由3個部分組成

### Header

使用什麼算法 encod

### payload

User 一些data 

### signature

確保data 不備竄改

![](https://hackmd.io/_uploads/B1J7n4qrn.png)


![](https://hackmd.io/_uploads/S1OVJGbqn.png)

JWT signing

![](https://hackmd.io/_uploads/BkGK8Mbq3.png)


![](https://hackmd.io/_uploads/rys7vGZ5n.png)



### JWT bypass (加密失效)

我們可以把signature 的alg 改成none -> 去刪signature 
我們在串改 username 就不會被發現


# New User Signup

## Http request to Backend (fetch API)

front-end send the username and password to back-end

前端透過fetch 來做出 request 來與back-end 互動

```javascript=

<script>
    const formElement = document.querySelector('form') 

    formElement.addEventListener('submit',async (event)=>{ //監聽submit 事件
        event.preventDefault(event) //subit Defaut event -> refresh page 

        //get the vale from form 

        const username = formElement.username.value
        const password = formElement.password.value
        //console.log(username,password)

        try{
            // HTTP Request 
            const response = await fetch('/signup',{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({username,password})//JSON.stringify() static method converts a JavaScript value to a JSON string
               
            })
        }catch(error){
            console.log(error)
        }
    })
</script>
```
## JWT  (Theory)

```
npm install jsonwebtoken
```

![](https://hackmd.io/_uploads/Hyk9-XW9n.png)

![](https://hackmd.io/_uploads/HJcxNX-q2.png)


Create JWT token 



sing({payload},private key,token attribute)

```javascript
//Create JWt token 
const maxAge = 3 * 24 * 60 *60 // 3day
const createJWT = (userId)=>{
    const token = jsonwebtoken.sign({userId},"meowheckerPrivateKey",{
        expiresIn:maxAge
    } ) //payload,private key, token attributes
    return token
}
```


Sign up post function 

jwt token 可以放在 signup function 裡面 -> Register 完可以給user 一個token !!

```javascript
 //setting jwt token -> cookie 
        const jwtToken = createJWT(user._id)
        response.cookie('JWT',jwtToken,{httpOnly:true,maxAge:3 * 24 * 60 * 60 *1000})
```

![](https://hackmd.io/_uploads/B1uMbS-cn.png)

![](https://hackmd.io/_uploads/B10dZB-ch.png)


這樣 JWT token setting 就完成了


---




## Client Page 取得 the server json Data


透過fetch function 的return 送給 response varable 
-> await response 

```javascript=
<script>
    const formElement = document.querySelector('form') 

    formElement.addEventListener('submit',async (event)=>{ //監聽submit 事件
        event.preventDefault(event) //subit Defaut event -> refresh page 


        //get the vale from form 

        const username = formElement.username.value
        const password = formElement.password.value
        //console.log(username,password)

        try{
            const response = await fetch('/signup',{
                method:'post',
                body:JSON.stringify({username:username,password:password}), //JSON.stringify() static method converts a JavaScript value to a JSON string
                headers:{'Content-Type':'application/json'}
                }
            )

            //Parse the reponse(from Server) json data
            const data = await response.json()
            console.log(data)

        }catch(error){
            console.log(error)
        }

    })
</script>
```

Case 1 
![](https://hackmd.io/_uploads/HkSGQUM5n.png)

Case 2
![](https://hackmd.io/_uploads/B1Iu78z92.png)


## Show Error Message on signup page 



-> get div class 
document.

```javascript
 //Error Elements 
    const usernameErrorElement = document.querySelector('.usernameError')   //.className   id-> #elementID
    const passwordErrorElement = document.querySelector('.passwordError')
```
---

```javascript
 // Show Error messages on sign page 
            if (data.errorsMessages){ 
                usernameErrorElement.textContent = data.errorsMessages.username
                passwordErrorElement.textContent = data.errorsMessages.password
            }

```


---
### 如果Register Successful -> redirect -> homepage 


```javascript
<script>
    const formElement = document.querySelector('form') 

    //Error Elements 
    const usernameErrorElement = document.querySelector('.usernameError')   //.className   id-> #elementID
    const passwordErrorElement = document.querySelector('.passwordError')

    formElement.addEventListener('submit',async (event)=>{ //監聽submit 事件
        
        event.preventDefault(event) //subit Defaut event -> refresh page(沒寫會出事) 

        // Reset Error Message !! //不然Error message 會在上面
        usernameErrorElement.textContent= ""
        passwordErrorElement.textContent= ""

        //Get the vale from form 

        const username = formElement.username.value
        const password = formElement.password.value

        //console.log(username,password)

        try{
            const response = await fetch('/signup',{
                method:'post',
                body:JSON.stringify({username:username,password:password}), //JSON.stringify() static method converts a JavaScript value to a JSON string
                headers:{'Content-Type':'application/json'}
                }
            )

            //Parse the reponse(from Server) json data
            const data = await response.json()
            //console.log(data)

            // Show Error messages on sign page 
            if (data.errorsMessages){ 
                usernameErrorElement.textContent = data.errorsMessages.username
                passwordErrorElement.textContent = data.errorsMessages.password
            }
            
            //console.log(data)
            if (data.userId){
                location.assign('/')//Navitage to URL
            }
            

        }catch(error){
            console.log(error)
        }

    })
</script>
```


# Loggin User in


this 引用 userSchema login*() function 創建的 Instance 


-> 在Database 下 設定 Statics login Authentication Logic 

ser account unt Account exist 
>比對password 
>return user (findOne)


## Compare password 

model/User.js
```javascript
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
```

## Setting login Action 

authController.js
```javascript
module.exports.loginPost = async (request,response) => {
   
    //拆成不同變數
    const {username, password} = request.body //variable Name 要跟json key 一樣
    try{
        const user = await User.login(username,password) //user variable, getting from the database
        response.status(200).json({userId:user._id})        
    }catch(error){
        response.status(400).json({})
    }

}
```

---


loggin user fornt-end Event Function 
跟 Singn Event Function 相似


login.ejs
```javascript
<script>
    //form Elements
    const formElement = document.querySelector('form') 
    
    //Error Elements 
    const usernameErrorElement = document.querySelector('.usernameError')   //.className   id-> #elementID
    const passwordErrorElement = document.querySelector('.passwordError')


    formElement.addEventListener('submit',async (event)=>{ //監聽submit 事件
    
    event.preventDefault(event) //subit Defaut event -> refresh page(沒寫會出事) 

    // Reset Error Message !! //不然Error message 會在上面
    usernameErrorElement.textContent= ""
    passwordErrorElement.textContent= ""

    //Get the vale from form 

    const username = formElement.username.value
    const password = formElement.password.value

    //console.log(username,password)

    try{
        const response = await fetch('/login ',{
            method:'post',
            body:JSON.stringify({username:username,password:password}), //JSON.stringify() static method converts a JavaScript value to a JSON string
            headers:{'Content-Type':'application/json'}
            }
        )

        //Parse the reponse(from Server) json data
        const data = await response.json()
        //console.log(data)

        // Show Error messages on sign page 
        if (data.errorsMessages){ 
            usernameErrorElement.textContent = data.errorsMessages.username
            passwordErrorElement.textContent = data.errorsMessages.password
        }
        
        //console.log(data)

        console.log(data.userId)
        if (data.userId){
            location.assign('/adminpanel')//Navitage to URL
        }
        

    }catch(error){
        console.log(error)
    }

    })
</script>
```

![](https://hackmd.io/_uploads/S1gAU_z5h.png)


---

## login Error message & create JWT token 


寫在HandlerError


現抓錯誤訊息-> 設定username 跟password ErrorMessage 

AuthCotroller.js
```javascript
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
        errorsMessages.password = "that username is not Incroorect"
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

```


Error 格式

![](https://hackmd.io/_uploads/SJFLkKGq2.png)


login.ejs

```javascript=
// Show Error messages on sign page 
        //console.log(data.errors)
        console.log(data.errors.password)
        
        if (data.errors){ 
            usernameErrorElement.textContent = data.errors.username
            passwordErrorElement.textContent = data.errors.password
        }
        
```


### Create JWT when you login success !!

```javascript=
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
```

![](https://hackmd.io/_uploads/HJLRgFMq2.png)


# Protecting Routes

我們可以透過JWT 對routes 作保護

當User Access URL 會送 cookie 裡的 JWT 給 Server 

我們就能去認JWT exist or be tampered
if 有問題就redirect 到 Login page


## Grab the token from the cookie(request)

透過有沒有抓到token 來判斷要不要處理 Router Reqeust

寫一個 request -->(middleware function (verify Token)) --> render page

middleware/authToken

```javascript
const jsonwebtoken = require('jsonwebtoken')

const requireAuthToken = (request, response , next)=>{

    //get the request Token 
    const token = request.cookies.JWT // cookies."cookie Name" 

    //have token ?
    if (token){
        //verify the token 
        const authToken = jsonwebtoken.verify(token,'meowheckerPrivateKey',(error,decodedToken)=>{
            if (error){
                response.redirect("login")
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

//export 
module.exports={requireAuthToken}
```


```javascript
//import 
const {requireAuthToken} = require('./middleware/authMiddleware')

....
....

//Main web 
app.get('/', (req, res) => res.render('home'));
app.get('/adminpanel', requireAuthToken , (req, res,) => res.render('adminpanel'));

```


![](https://hackmd.io/_uploads/HkHWCjQ92.png)

![](https://hackmd.io/_uploads/BJFGCi792.png)

笑死 有些website 會用URL or Method 來進行 Access Controll 
這些都很好Bypass 



# Loggin Use Out

我們沒辦法直接 delete 創一個新的 replace 他


```
module.exports.logout = (request,response)=>{
    
    response.cookie('JWT','',{maxAge:1,httpOnly:true})
    response.redirect('/')

}
```


## Checking the current User

`response.locals.user` 是一個在 Express 應用程式中使用的特殊變數。它被用於在請求的生命週期中存儲和共享數據。在這裡，它被用於存儲從資料庫中查詢到的用戶數據，以便在後續中間件或路由處理函式中訪問


middleware

```javascript
// middleware (next)
const injectUserDataToview =  (request,response,next)=>{
    const token = request.cookies.JWT

    if(token){
        //verify the token 
        const authToken = jsonwebtoken.verify(token,'meowheckerPrivateKey',async (errors,decodedToken)=>{
           if (errors){
               response.locals.user = null
               next()
           }else {
               console.log(decodedToken)
               let user = await User.findById(decodedToken.id) //grab user data from user
               response.locals.user = user
               next()  // verify successfully
           }
        })
    }else{
        response.locals.user = null
        next()
    }

}
```

app.js

在所有URL router 下應用
```

const {requireAuthToken, injectUserDataToview} = require('./middleware/authMiddleware')

...
...

app.get('*',injectUserDataToview) // middleware (the check factor:JWT token )
```

再經經過這個Router middlware -> 他們透可以使用locals.user 這個變數資料(需JWT auth)


# Condiction Rendering

user = User(models).locals.user

透過 條件式來確認 user 是否存在 
```
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <link rel="stylesheet" href="/styles.css">
</head>
<body>
  <nav>
  
    <h1><a href="/">Meow Hacker!!</a></h1>
    <ul>
      <% if(user) { %>
      <li>Wellcome, <%= user.username %></li>
      <li><a href="/logout" class="btn">Logout</a></li>
      <% }else{ %>
      <li><a href="/signup"class="btn">Sign Up</a></li>
      <li><a href="/login"class="btn">Login</a></li>
      <% } %>
    </ul>
  </nav>
```