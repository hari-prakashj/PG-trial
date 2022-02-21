const client = require('./connection.js')
const express = require('express');
const app = express();

app.use(express.json());

app.listen(3300,()=>{
    console.log("Server is now listening at port 3000");
})

client.connect();
console.log("==================================")


app.get('/users',(req,res)=>{
    client.query(`Select * from stafflist`,(err,result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})

// app.post("/add", (req, res) => {
//     let id = req.body.id;
//     let name = req.body.name;
//     let gender = req.body.gender;
//     let location = req.body.location;
//     let qry =
//     'INSERT INTO public.stafflist(id, name, gender, location)VALUES ("'+id+'", "'+name+'", "'+gender+'", "'+location+'")';
//     console.log(qry);
  
//     client.query(qry, (err, result) => {
//       if (err) {
//         console.log(err);
//       }
//       console.log(result);
//       if (result.affectedRows == 1) {
//         res.send({ status: true, msg: "sucess", data: result });
//       } else {
//         res.send({ status: false, msg: "failed" });
//       }
//     });
//   });

app.post('/add',(req,res)=>{
    let id = req.body.id;
    let name = req.body.name;
    let gender = req.body.gender;
    let location = req.body.location;
    let qry = `insert into stafflist(id,name,gender,location) values('${id}','${name}','${gender}','${location}')`;
    console.log(qry)
    client.query(qry,(err,result)=>{
        if(!err){
            res.send('Insertion was successful');
            res.send(result);
        }
        else{console.log(err.message)}
    })
    client.end;
})



