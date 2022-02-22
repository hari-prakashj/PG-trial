const client = require("./connection.js");
const express = require("express");
const app = express();

app.use(express.json());

app.listen(3300, () => {
  console.log("Server is now listening at port 3000");
});

client.connect();
console.log("==================================");


app.get("/:id", (req, res) => {
  let id = req.params.id;
  let qry = 'SELECT * FROM `stafflist` WHERE id="' + id + '"';

  client.query(qry, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result);
    if (result==true ) {
      res.send({ status: true, msg: "sucess", data: result });
    } else {
      res.send({ status: false, msg: "failed" });
    }
  });
});

// app.get("/users", (req, res) => {
//   client.query(`Select * from stafflist`, (err, result) => {
//     if (!err) {
//       res.send(result.rows);
//     }
//   });
//   client.end;
// });

app.post("/add", (req, res) => {
  let id = req.body.id;
  let name = req.body.name;
  let gender = req.body.gender;
  let location = req.body.location;
  let qry =`insert into stafflist(id,name,gender,location) values('${id}','${name}','${gender}','${location}')`;
  console.log(qry);

  client.query(qry, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result);
    if (result.rowCount > 0) {
      res.send({ status: true, msg: "sucess", data: result });
    } else {
      res.send({ status: false, msg: "failed" });
    }
  });
});

// app.post('/add',(req,res)=>{
//     let id = req.body.id;
//     let name = req.body.name;
//     let gender = req.body.gender;
//     let location = req.body.location;
//     let qry =`insert into stafflist(id,name,gender,location) values('${id}','${name}','${gender}','${location}')`;
//     console.log(qry)
//     client.query(qry,(err,result)=>{
//         if(!err){
//             res.send('Insertion was successful');
//             res.send(result);
//         }
//         else{console.log(err.message)}
//     })
//     client.end;
// })


app.put("/:id", (req, res) => {
  let id = req.params.id;
  let qry = "UPDATE stafflist SET location= 'pudukottai' WHERE id='" + id + "'";
  console.log(qry);

  client.query(qry, (err, result) => {
    if (err) {
      console.log(err);
    }
    if (result.rowCount>0) {
      res.send({ status: true, msg: "sucess", data: result });
    } else {
     res.send({ status: false, msg: "failed" });
   }
  });
});


app.delete("/:id", (req, res) => {
  let id = req.params.id;
  let qry =  `delete from stafflist where id=${id}`

  console.log(qry);

  client.query(qry, (err, result) => {
    if(err){
      console.log(err);
    }
    console.log(result);
    if(result.affectedRows ==1) {
      res.send({ status: true, msg: "sucess", data: result });
    } else {
      res.send({ status: false, msg: "failed" });
    }
  });
  });

// app.delete('/:id', (req, res)=> {
// let id = req.params.id;
//   let qry = `delete from stafflist where id=${id}`

//   console.log("qry");

//   client.query(qry, (err, result)=>{
//       if(!err){
//           res.send('Deletion was successful')
//       }
//       else{ console.log(err.message) }
//   })
//   client.end;
// })


