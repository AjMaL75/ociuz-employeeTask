const express = require("express");
const db = require("./queries.js");
const cors=require("cors")
const bodyparser=require("body-parser")

const app = express();

app.use(express.json());
app.use(cors())
// app.use(bodyparser.json())
// app.use(bodyparser.urlencoded({extended:true}))

//for all the employees
app.get("/api/getemployee", db.getemployees);

//to add the new employee
app.post("/api/addemployee", db.addemployees);

//to update the existing employee
app.put("/api/editemp/:id", db.updateemployee);

//to delete the existing employee from database
app.delete("/api/deleteemp/:id", db.deleteemployee);

//to get individual employee from database
app.get('/api/getemp/:id',db.getEmployee)

app.listen(8000, () => {
  console.log("server has starting on 8000 port");
});
