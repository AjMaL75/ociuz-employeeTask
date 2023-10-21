import { message } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import regSchema from '../validation';
import { useFormik } from 'formik';
import { useNavigate, useParams } from 'react-router';

function Empedit() {
    const[id,setId]=useState('')
    const[empdata,setempdata]=useState('')
    const params=useParams()
    const paramsdata=params.id
    const navigate=useNavigate()

    // const getemployee=async()=>{
    //     try {
    //         const response=await axios.get(`http://localhost:8000/api/getemp/${id}`)
    //         setempdata(response.data.result)
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
    const formik = useFormik({
        initialValues: {
          empname: "",
          empemail: "",
          empdesig: "",
          empaddress: "",
        },
        validationSchema: regSchema,
        onSubmit: async (values) => {
          try {
            console.log(values);
            const response=await axios.put(`http://localhost:8000/api/editemp/${paramsdata}`, values)
            if(response.data.success)
            {
                message.success(response.data.message)
                navigate('/emplist')
            }
            else{
                message.error("something went wrong")
            }
          } catch (error) {
            console.log(error);
          }
        },
      });
      useEffect(()=>{
        // const response=axios.get(`http://localhost:8000/api/getemp/${params.id}`)
        // setempdata(response.data.result)
        // console.log(empdata);
        
      },[])
  return (
    <div className="w-50 p-5">
        <h2 className='text-center mb-5'>Edit Employee</h2>
      <form
        action=""
        className="bg-warning rounded p-4"
        onSubmit={formik.handleSubmit}
      >
        <label htmlFor="empname">Name </label>
        <input
          type="text"
          name="empname"
          placeholder="Ente the employee name"
          className="form-control"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.empname}
        />
        {formik.errors.empname || formik.touched.empname ? (
          <p className="text-danger">{formik.errors.empname}</p>
        ) : (
          ""
        )}
        <br />
        <br />
        <label htmlFor="empemail"> Email</label>
        <input
          type="email"
          name="empemail"
          placeholder="Enter employee email"
          className="form-control"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.empemail}
        />
        {formik.errors.empemail || formik.touched.empemail ? (
          <p className="text-danger">{formik.errors.empemail}</p>
        ) : (
          ""
        )}
        <br />
        <br />
        <label htmlFor="empdesig">Designation</label>
        <input
          type="text"
          name="empdesig"
          placeholder="Enter the designation"
          className="form-control"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.empdesig}
        />
        {formik.errors.empdesig || formik.touched.empdesig ? (
          <p className="text-danger">{formik.errors.empdesig}</p>
        ) : (
          ""
        )}
        <br />
        <br />
        <label htmlFor="empaddress">Address</label>
        <textarea
          name="empaddress"
          id="empaddress"
          cols="30"
          rows="10"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.empaddress}
        ></textarea>
        {formik.errors.empaddress || formik.touched.empaddress ? (
          <p className="text-danger">{formik.errors.empaddress}</p>
        ) : (
          ""
        )}
        <div className="text-center">
          <button type="submit" className="btn btn-dark mt-3">
            Update
          </button>
        </div>
      </form>
    </div>
  )
}

export default Empedit