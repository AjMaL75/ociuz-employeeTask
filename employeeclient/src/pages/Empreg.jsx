import React from 'react'
import regSchema from "../validation";
import axios from "axios";
import {message} from "antd"
import { useFormik } from "formik";
import { Link } from 'react-router-dom';

function Empreg() {
    const formik = useFormik({
        initialValues: {
          empname: "",
          empemail: "",
          empphone: "",
          empdesig: "",
          empaddress: "",
        },
        validationSchema: regSchema,
        onSubmit: async (values) => {
          try {
            console.log(values);
            const response=await axios.post("http://localhost:8000/api/addemployee", values)
            if(response.data.success)
            {
                message.success(response.data.message)
            }
            else{
                message.error("something went wrong")
            }
          } catch (error) {
            console.log(error);
          }
        },
      });
  return (
    <div className="w-50 p-5">
        <h3 className='fw-bold mb-5 text-center'>Employee Registration</h3>
       <div className='text-end'> <Link to={'/emplist'}><button className='btn btn-success float-right'>Employee list</button></Link></div>
      <form
        action=""
        className="bg-info rounded p-4 mt-3"
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
        <label htmlFor="empphone">Phone</label>
        <input
          type="text"
          name="empphone"
          placeholder="Enter employee phone"
          className="form-control"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.empphone}
        />
        {formik.errors.empphone || formik.touched.empphone ? (
          <p className="text-danger">{formik.errors.empphone}</p>
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
            Register
          </button>
        </div>
      </form>
    </div>
)}

export default Empreg