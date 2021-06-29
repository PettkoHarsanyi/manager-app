const express = require("express");
var request = require("request");
var bodyParser = require('body-parser');
const { ViewArrayTwoTone } = require("@material-ui/icons");


const app = express();
const port = 5000;

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
app.use(express.json()); 

var users = [{name:"Figy Elek", birth:1999, team:"Feisbuk"},{name:"Patta Nóra", birth:2000, team:"Gogli"},{name:"Vak Cina", birth:1566, team:"Fájzer"}];

app.get("/api/users", (req,res) => res.send({users}));

app.post('/api/adduser', (req, res) => {
  var user = req.body;
  users.push(user);
  res.send({users});
})

app.put("/api/modifyuser", (req,res) => {
  users[users.findIndex(person=>(person.name===req.body.from.name))] = req.body.to
  res.send({users});
})

app.put("/api/deleteuser", (req,res) => {
  users = users.filter(person=>person.name!==req.body.name)
  res.send({users})
})

app.listen(port, ()=> console.log('Example app listening on port',port))