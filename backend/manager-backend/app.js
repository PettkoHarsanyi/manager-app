#!/usr/bin/env node

const express = require("express");
const app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
const port = process.env.PORT || "3000";

app.use(cors())
app.use(bodyParser.json());       // to support JSON-encoded bodies

var users = [{name:"Figy Elek", birth:1999, team:"Feisbuk"},{name:"Patta Nóra", birth:2000, team:"Gogli"},{name:"Vak Cina", birth:1566, team:"Fájzer"}];

app.get("/users", (req,res) => {res.send({users})});

app.post('/adduser', (req, res) => {
  var user = req.body;
  users.push(user);
  res.send({users});
})

app.put("/modifyuser", (req,res) => {
  users[users.findIndex(person=>(person.name===req.body.from.name))] = req.body.to
  res.send({users});
})

app.put("/deleteuser", (req,res) => {
  users = users.filter(person=>person.name!==req.body.name)
  res.send({users})
})

app.listen(port, ()=> console.log('Example app listening on port',port))