let mysql = require("mysql");
let connData={
    host:"localhost",
    user:"root",
    password:"",
    database: "sqltest",
};
let express =require ("express")
let app =express()
app.use(express.json())
app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin","*")
    res.header("Access-Control-Allow-Methods",
    "GET,POST,OPTIONS,PUT,PATCH,DELETE,HEAD")
    res.header("Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept")
    next()
})
var port=process.env.PORT||2410
app.listen(port,()=>console.log(`Listening on port ${port}!`))

function showRivers(){
    let connection = mysql.createConnection(connData)
    let sql="SELECT * FROM rivers "
    let data=[]
    connection.query(sql,function(err,result){
        if(err)
            data=err.message
        else {
            console.log(result,"sql")
            data=result}
    })
    console.log(data,"sql")
    return data
}
function showRiversByName(name){
    let connection = mysql.createConnection(connData)
    let sql="SELECT * FROM rivers WHERE river_name=?"
    connection.query(sql,name,function(err,result){
        let data=[]
            if(err)
                data=err.message
            else data=result
        })
        console.log(data)
        return data
}
function insertRiver(river){
    let connection = mysql.createConnection(connData)
    let sql="INSERT INTO rivers(river_name, state_name) VALUES (?,?)"
    connection.query(sql,river,function(err,result){
        let data=[]
        if(err)
            data=err.message
        else data=result
    })
    console.log(data)
    return data
}
function updatedRiver(river_name,newName){
    let connection = mysql.createConnection(connData)
    let sql="UPDATE rivers SET river_name=? WHERE river_name=?"
    connection.query(sql,[newName,river_name],function(err,result){
        let data=[]
            if(err)
                data=err.message
            else data=result
        })
        console.log(data)
        return data
}
function deleteRiver(river_name){
    let connection = mysql.createConnection(connData)
    let sql="DELETE FROM `rivers` WHERE river_name=?"
    connection.query(sql,river_name,function(err,result){
        let data=[]
            if(err)
                data=err.message
            else data=result
        })
        console.log(data)
        return data
}
function insertMultipleRivers(multipleriver){
    let connection = mysql.createConnection(connData)
    let sql="INSERT INTO rivers(river_name, state_name) VALUES ?"
    connection.query(sql,river,function(err,result){
        if(err)
            console.log(err.message)
        else {
            console.log(result)
            showRivers()
        }
    })
}
//showRiversByName("Ganga")
//insertMultipleRivers ([["r2","s2"],["r3","s3"]])
//insertRiver(["Torsha","hasimara"])
//updatedRiver("Torsha","Tista")
//deleteRiver("Tista")



app.get("/rivers",function(req,res){
    let connection = mysql.createConnection(connData)
    let sql="SELECT * FROM rivers "
    connection.query(sql,function(err,result){
        if(err)
            {
                res.status(404).send(err)
            }
        else {
            console.log(result,"sql")
            res.send(result)}
    })
    
})

app.get("/rivers/:name",function(req,res){
    let name=req.params.name
     let connection = mysql.createConnection(connData)
    let sql="SELECT * FROM rivers WHERE river_name=?"
    connection.query(sql,name,function(err,result){
        if(err)
        {
            res.status(404).send(err)
        }
        else {
            console.log(result,"sql")
            res.send(result)}
        })
        
})

app.post("/rivers",function(req,res){
    let body =req.body
    let river_name=body.river_name
    let state_name=body.state_name
    let connection = mysql.createConnection(connData)
    let sql="INSERT INTO rivers(river_name, state_name) VALUES (?,?)"
    connection.query(sql,[river_name,state_name],function(err,result){
        if(err)
        {
            res.status(404).send(err)
        }
        else {
            console.log(result,"sql")
            res.send(result)}
    })
    
})

app.put("/rivers/:name",function(req,res){
    let name=req.params.name
    let river_name=req.body.river_name
    let state_name=req.body.state_name
    console.log(river_name,state_name,"put")
    let connection = mysql.createConnection(connData)
    let sql="UPDATE rivers SET river_name=?,state_name=? WHERE river_name=?"
    connection.query(sql,[river_name,state_name,name],function(err,result){
        if(err)
        {
            res.status(404).send(err)
        }
        else {
            console.log(result,"sql")
            res.send(result)}
    })
})

app.delete("/rivers/:name",function(req,res){
    let name=req.params.name
    let connection = mysql.createConnection(connData)
    let sql="DELETE FROM `rivers` WHERE river_name=?"
    connection.query(sql,name,function(err,result){
        if(err)
        {
            res.status(404).send(err)
        }
        else {
            console.log(result,"sql")
            res.send(result)}
        })
})


