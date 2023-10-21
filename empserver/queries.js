const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "employee",
  password: "root",
  port: 8080,
});

pool.connect();
//first we want to add table to our database
// const query=`
// CREATE TABLE empdata (
//     empphone int,
//     empname varchar,
//     empemail varchar,
//     empdesig varchar,
//     empaddress varchar
// );`
// ;
// pool.query(query,(err,res)=>{
//     if(err)
//     {
//         console.error(err);
//         return;
//     }
//     console.log("Table is created successfully");
//     pool.end()
// })

//here we will do crud operation on sql database

const getemployees = (req, res) => {
  pool.query(
    "SELECT * FROM empdata ORDER BY empphone ASC",
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json({ result: results.rows, success: true });
    }
  );
};

const addemployees = (req, res) => {
  try {
    const empPhone = req.body.empphone;
    const empName = req.body.empname;
    const empEmail = req.body.empemail;
    const empDesig = req.body.empdesig;
    const empAddress = req.body.empaddress;

    pool.query(
      "INSERT INTO empdata(empphone,empname,empemail,empdesig,empaddress) VALUES($1,$2,$3,$4,$5) RETURNING * ",
      [empPhone, empName, empEmail, empDesig, empAddress],
      (error, results) => {
        if (error) {
          throw error;
        }
        res
          .status(201)
          .json({
            message: `New employee has been added with phonenumber ${results.rows[0].empphone}`,
            success: true,
          });
      }
    );
  } catch (error) {
    console.log(error);
  }
};

const updateemployee = (req, res) => {
  const empphone = parseInt(req.params.id);

    const empName = req.body.empname;
    const empEmail = req.body.empemail;
    const empDesig = req.body.empdesig;
    const empAddress = req.body.empaddress;
  try {
    pool.query(
      "UPDATE empdata SET  empname=$1,empemail=$2,empdesig=$3,empaddress=$4 WHERE empphone=$5",
      [
        
        empName,
        empEmail,
        empDesig,
        empAddress,
        empphone
      ],
      (err, results) => {
        if (err) {
          throw err;
        }
        res
          .status(200)
          .json({
            message: `Updated this employee data`,
            success: true,
          });
      }
    );
  } catch (error) {
    console.log(error);
  }
};

const deleteemployee = (req, res) => {
  const empphone = parseInt(req.params.id);
  try {
    pool.query(
      "DELETE FROM empdata WHERE empphone=$1",
      [empphone],
      (err, results) => {
        if (err) {
          throw err;
        }
        res
          .status(200)
          .json({
            message: `Deleted this employee from database `,
            success: true,
          });
      }
    );
  } catch (error) {
    console.log(error);
  }
};

const getEmployee=(req,res)=>{
    const empphone=parseInt(req.params.id)
    try {
        pool.query('SELECT * FROM empdata WHERE empphone=$1',[empphone],(err,results)=>{
            if(err)
            {
                throw err
            }
            res.status(200).json({success:true,result:results.rows})
        })
    } catch (error) {
        console.log(error);
    }
}
module.exports = {
  getemployees,
  addemployees,
  updateemployee,
  deleteemployee,
  getEmployee
};
