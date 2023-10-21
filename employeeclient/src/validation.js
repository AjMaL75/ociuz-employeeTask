import * as yup from "yup"

const emailregexp=''
const phoneregexp=/[0-9]/

const regSchema=yup.object().shape({
    empname:yup.string().required("Name field not be empty"),
    empemail:yup.string().email("please enter correct email format").required('Email field not be empty'),
    empdesig:yup.string().required("Designation field not be empty"),
    empaddress:yup.string().required("Address field not be empty")
    
})

export default regSchema