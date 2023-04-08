import axios from 'axios';
import React, { useState } from 'react'
import { Link , useNavigate } from 'react-router-dom';





export default function Regester() {

  let [loading, setLoading] = useState(false)
  let [user, setUser] = useState({

    "userName": "",
    "password": "",
    "cpassword": "",
    "email": ""
  })

  let navigate = useNavigate();
  let goToLogin = () => {
    let path = '/Login'
    navigate(path)
  }

  let [errorList, seterrorList] = useState([])

  let SubmitFormData = async (e) => {
    e.preventDefault();
    /*  let validateResule = validatejoi();
    seterrorList(validateResule.error.details)  
    */
    let { data } = await axios.post("http://localhost:3000/api/v1/auth/signup", user)
    if (data.message == 'success' ) {
      goToLogin();
    } else {
      alert(data.message)

    }
    setLoading(true)
  }

  let getinputvalue = (e) => {
    let myUser = { ...user }
    myUser[e.target.name] = e.target.value;
    setUser(myUser)
  }

  /* 
    let validatejoi = () => {
      let schema = Joi.object({
  
        name: Joi.string().alphanum().min(5).max(30).required(),
        age: Joi.number().min(10).max(70).required(),
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
        password: Joi.number().required(),
      });
      return schema.validate(user, { abortEarly: false })
  
  
    } */
  return (
    <>
      {errorList.map((error, index) =>
        <div className='alert alert-danger w-50' key={index}>{error.message}</div>
      )}

      
      <div className="container text-center my-5">
        <div className="user my-3">
          <i className="fas fa-user-secret user-icon" />
          <h4 className="login">Register</h4>
        </div>


        <div className="card p-5 w-50 m-auto">

          <form  onSubmit={SubmitFormData} method="POST" action="/handleLogin">
            <input onChange={getinputvalue} className="form-control" placeholder="Enter your User Name" type="text" name="userName" />
            <input onChange={getinputvalue} className="form-control my-4" placeholder="Enter your email" type="email" name="email" />
            <input onChange={getinputvalue} className="form-control my-4 " placeholder="Enter your Password" type="password" name="password" />
            <input onChange={getinputvalue} className="form-control my-4 " placeholder="Confirm your Password" type="password" name="cpassword" />

            <button type="submit" className="btn btn-default-outline my-4 w-100 rounded">
              {loading ? <i className="fa-solid fa-spinner fa-spin "></i> : 'Register'}
            </button>

            <p><Link className="text-muted forgot btn" to=''>I Forgot My Password</Link></p>
          </form>
        </div>
      </div>

    </>
  )
}
