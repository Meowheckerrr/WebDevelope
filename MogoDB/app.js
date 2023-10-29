const express = require('express')
const app = express()

//import DB 
const {connectToDB,getDB} = require('./db')
const { ObjectId } = require('mongodb')


//Connect to DataBase 
let mongoDB
connectToDB((err)=>{
    if (!err){
        app.listen(3000,()=>{
            console.log("meowhecker")
        })
        mongoDB = getDB() // mongoDB = db(gunShop)
    }
})


app.get('/gunshops',(req,res)=>{
    let guns=[]
    // Find method will return a cursors . we have to use ForeEach to enumrate them(property)
    mongoDB.collection('handgun')
    .find()
    .sort({price:1})
    .forEach(gun => {
        guns.push(gun)
    }).then(()=>{
        res.status(200).json(guns)
    }).catch(()=>{
        res.status(500).json({error:"Could not to fetch documents"})
    })
    
    //res.json({"message":"gun shop api"})
})

app.get('/gunshops/:id', (req, res) => {

    if(ObjectId.isValid(req.params.id)){
        console.log(req.params.id);
        const objectId = new ObjectId(req.params.id); 
        mongoDB.collection('handgun')
            .find({ _id: objectId }) 
            .toArray() 
            .then((guns) => {
                res.status(200).json(guns);
            })
            .catch(() => {
                res.status(500).json({ "error": "Could not fetch the data" });
            });
    }else {
        res.status(500).json({"error":"could not found the doc"})
    }

 
});