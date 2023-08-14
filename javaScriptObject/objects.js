
//Lession 1~4
    // var userOne = {
    //     email: 'meowhecker@gmail.com',
    //     name: 'meowhecker',

    //     // ode Fucntion
    //     meowFunction: function(){
    //         console.log("meow")
    //     },

    //     login(){
    //         console.log(this.email, 'has logged in');
    //     },
    //     logout(){
    //         console.log(this.email, 'has logged out');
    //     }
    // };

    // userOne.name
    // userOne.login()
    // userOne.logout()
    // userOne.meowFunction()

//Lession 5~6 /class

    // class User{
    //     constructor(name,password){
    //         //Hard code 
    //             //this.name = "mewohecker"
    //             //this.password="mewohecker"
    //         //dynamic
    //             this.name=name
    //             this.password=password
    //             this.score = 0
    //     }
    //     login(){
    //         console.log(this.name,"just logged in")
    //         return this;
    //     }
    //     logout(){
    //         console.log(this.name, "just logged out")
    //         return this;
    //     }
    //     methodChain(){
    //         this.score++
    //         console.log(this.name,'Now Score is ',this.score)
    //         return this; //return the INstance for using the methodCHain.
    //     }
    // }

    // var user1 = new User('meowhecker','mewohecker123')
    // var user2 = new User('mewomewo','weommoew')

    // console.log(user1)
    // console.log(user2)

    // user1.login().methodChain().methodChain().logout()


// lession 7 /class inheritance




    // class User{
    //     constructor(name,password){
    //         //Hard code 
    //             //this.name = "mewohecker"
    //             //this.password="mewohecker"
    //         //dynamic
    //             this.name=name
    //             this.password=password
    //             this.score = 0
    //     }
    //     login(){
    //         console.log(this.name,"just logged in")
    //         return this;
    //     }
    //     logout(){
    //         console.log(this.name, "just logged out")
    //         return this;
    //     }
    //     methodChain(){
    //         this.score++
    //         console.log(this.name,'Now Score is ',this.score)
    //         return this; //return the INstance for using the methodCHain.
    //     }
    // }

    // class Admin extends User{ // inheritance all property from original Class
    //     deleteUser(user){
    //         users = users.filter(u=>{
    //             return u.name != user.name
    //         })
    //     }

    // }

    // var user1 = new User('meowhecker','mewohecker123')
    // var user2 = new User('mewomewo','weommoew')
    // var admin1 = new Admin("meowHacker",'mewohe997')

    // var users = [user1,user2,admin1]

    // admin1.deleteUser(user2)

    // console.log(users)

// lession 8 constructor (under the hood)

// function User(email,name){
//     this.email=email
//     this.name=name
//     this.login = function(){
//         console.log(`${this.name} has logged in !!!`)
//     }
// }

// var user1 = new User('meowhecker','mewohecker123@gggg')
// var user2 = new User('mewomewo','weommoew@mewre')

// user1.login()
// user2.login()

// lession 8 prototype 


function User(email,name){
    this.email=email
    this.name=name
    this.online = false
 
}

User.prototype.login = function(){
    this.online=true
    console.log(`${this.name} has logged in !!!`)
}

User.prototype.logout = function(){
    this.online=false
    console.log(`${this.name} has logged out !!!`)
}

function Admin(...args){  // ... pass the parameter as Array 
    //inherite user attribute
    User.apply(this,args) //"this:pass the admin Insntace" 
    this.role = "super admin"
}

Admin.prototype = Object.create(User.prototype)


Admin.prototype.deleteUser = function(user){
    users = users.filter(u=>{
        return u.email != user.email
    })
}

var user1 = new User('meowhecker','mewohecker123@gggg')
var user2 = new User('mewomewo','weommoew@mewre')
var admin = new Admin('adminmeow','mewohe@wrew')
var users = [user1,user2,admin]
user1.login()
user1.logout()