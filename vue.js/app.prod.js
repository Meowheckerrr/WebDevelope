//console.log("vue")


// // create Vue appliciation Opbject 
// const app = Vue.createApp({
//     // templeate 可以插入HTML Code 
//     template:'<h2>template (insert someThing )</h2>'
// })


// // mount 到 某個 div or element 
// app.mount('#app')

//--- 

// Dynamic output  
    // create Vue appliciation Opbject 
    const app = Vue.createApp({
       data(){
        return{
            title: "Meowhecker Website",
            auther: "Meowhecker",
            age:20
        }
       },
       // we could write donw some function on here
       methods:{
        chageTheTitle(){
            this.title = "The website title was be modified !!!!!"
        }
       }
    })

    // mount 到 某個 div or element 
    app.mount('#app')