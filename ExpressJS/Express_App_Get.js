const express = require('express')
const app = express()
const port = 5000

app.get('/',(req,res)=>{
    // app.status(200).
    res.send("Home Page")
})
app.get('/about',(req,res)=>{
    res.send("About Page")
})
app.get('/contact',(req,res)=>{
    res.send("Contact Page")
})


app.listen(5000,()=>{
    console.log(`Server listening the port on ${port}`)
})


//app.use
//app.get
//app.post
//app.put
//app.delete
//app.listen
//app.all