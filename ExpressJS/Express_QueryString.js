import express from 'express'
const app = express()
import path from'path'
import {Users,Product} from './SampleJson.js';  // Ensure the correct relative path



// app.get('/',(req,res)=>{
//     res.json([{"Name":"Siva"} , {"Age":22}])
// })

// // Ex:2

// // app.get('/',(req,res)=>{
// //     res.json(Users)
// // })

// // Ex: 3

// app.get('/',(req,res)=>{
//     const filterUser = Users.map((prod)=>{
//         const {id,Name,Age} = prod
//         return {id,Name,Age}
//     })

//     res.json(filterUser)
// })

// Default Page as a Home Page

// app.get('/',(req,res)=>{
//     res.send('<h1>Welcome to our Page</h1> </br> <a href="/api/product/1">CLick here</a>')
// })


// // Ex : 4  ---> Just we have get the single value


// app.get('/api/product/1',(req,res)=>{
//     console.log(req)
//     console.log(req.params);

//     const filterUser = Users.find((user)=>{
//         const finded = user.id == 1
//         return finded
//     })

//     res.json(filterUser)
// })



// // Ex: 5 ---> Params Concept

// app.get('/api/product/:pID',(req,res)=>{
//     console.log(req)
//     console.log(req.params);
    
//     const {pID} = req.params

//     const filterUser = Users.find((user)=>{
//         const finded = user.id == Number(pID)
//         return finded
//     })

//     if(!filterUser){
//         return res.status(404).send("Page not found")
//     }

//     res.json(filterUser)
// })


// Query String Examples

app.get('/api/view/query',(req,res)=>{
    // console.log(req.query);
    const {search,limit} = req.query
    let staticProducts = [...Users]
    // console.log(staticProducts.Name);
    

    if(search){
        staticProducts = staticProducts.filter(prod=>{
            return prod.Name.startsWith(search.toUpperCase())
        })
    }

    if(limit){
        staticProducts= staticProducts.slice(0,Number(limit))
    }

    // if(staticProducts.length > 1){
    //     // return res.send("No values matched")
    //     return res.json([{data:0,values:""}])
    // }

    res.status(200).json(staticProducts)
})

app.listen(5000,()=>{
    console.log('server listening on port 5000...');
})