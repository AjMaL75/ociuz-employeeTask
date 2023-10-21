import React, { useEffect, useState } from "react";
import { message } from "antd";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

function Emplist() {
  const [empdata, setEmpdata] = useState([]);
  const [id, setId] = useState("");
  
  

  const addId=(val)=>{
    setId(val)
  }

  const deleteemployee = async (event) => {
    event.preventDefault()
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/deleteemp/${id}`
      );
      if (response.data.success) {
        message.success(response.data.message);
      } else {
        message.error("we cannot delete this employee");
      }
    } catch (error) {
      console.log(error);
    }
  };
 
  useEffect(() => {
    const getEmployee = async () => {
        try {
          const response = await axios.get(
            "http://localhost:8000/api/getemployee/"
          );
          setEmpdata(response.data.result);
          console.log(empdata);
          
        } catch (error) {
          console.log(error);
        }
      };
      getEmployee()
      console.log(id);
  }, []);

  return (
    <div>
      <div className="container w-50 mt-5">
        <div className="text-end"><Link to={'/'}><button className="btn btn-danger">Back</button></Link></div>
        <table className="table table-dark mt-4">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>phone</th>
              <th>Designation</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {empdata.map((data) => (
              <tr key={data.empphone}>
                <td>{data.empname}</td>
                <td>{data.empemail}</td>
                <td>{data.empphone}</td>
                <td>{data.empdesig}</td>
                <td>{data.empaddress}</td>
                <td>
                  <Link to={`/empedit/${data.empphone}`}><button className="btn btn-info">Edit</button></Link>
                  <button
                    className="ms-3 btn btn-danger"
                    onClick={deleteemployee}
                    onMouseOver={()=>addId(data.empphone)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Emplist;
