import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../Reducer/Auth';
import { NavLink, useNavigate } from 'react-router-dom';

function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();  
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
  });
  const [cPassword, setCPassword] = useState('');
  const [errors, setErrors] = useState({});
  const error = useSelector((state) => state.auth.error);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };


  const validate = () => {
    const newErrors = {};
    if (!data.name.trim()){
     newErrors.name = 'Name is required';
    }else if(!data.email.trim()){
        newErrors.email = 'Email is required';
    }else if (!data.password.trim()){
        newErrors.password = 'Password is required';
    }else if (!data.address.trim()){ newErrors.address = 'Address is required';
    }else if (cPassword !== data.password){
        newErrors.cPassword = 'Passwords do not match';
    } 
    return newErrors;
  };

  const handleRegister = () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      dispatch(register(data))
      .unwrap()
      .then(() => {
        navigate("/");
       })
      .catch((err) => {
        console.log("Register failed");
        return;
      });
    }
  };

  
  let token =localStorage.getItem("token");
  let userData = JSON.parse(localStorage.getItem("user"));
 
  useEffect(()=>{
    if(token){
       navigate(`/user/${userData._id}`)
    }  
 },[])


  return (
    <div className="container mt-1">
      <h1 className="text-center mb-4">Sign Up</h1>
      {error && <p className="text-danger mt-3">{error}</p>}
      <div className="card p-4 shadow-sm">
        <div className="form-group mb-3">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
            id="name"
            name="name"
            value={data.name}
            onChange={handleChange}
            placeholder="Enter Name"
          />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>
        <div className="form-group mb-3">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            id="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            placeholder="Enter email"
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>
        <div className="form-group mb-3">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            className={`form-control ${errors.address ? 'is-invalid' : ''}`}
            id="address"
            name="address"
            value={data.address}
            onChange={handleChange}
            placeholder="Enter Your Address"
          />
          {errors.address && <div className="invalid-feedback">{errors.address}</div>}
        </div>
        <div className="form-group mb-3">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            id="password"
            name="password"
            value={data.password}
            onChange={handleChange}
            placeholder="Enter password"
          />
          {errors.password && <div className="invalid-feedback">{errors.password}</div>}
        </div>
        <div className="form-group mb-3">
          <label htmlFor="cPassword">Confirm Password</label>
          <input
            type="password"
            className={`form-control ${errors.cPassword ? 'is-invalid' : ''}`}
            id="cPassword"
            value={cPassword}
            onChange={(e) => setCPassword(e.target.value)}
            placeholder="Enter Confirm Password"
          />
          {errors.cPassword && <div className="invalid-feedback">{errors.cPassword}</div>}
        </div>
        <button className="btn btn-primary btn-block" onClick={handleRegister}>
          Sign Up
        </button>
        <p className='text-center mt-4'>I have Already an Account <NavLink to={"/"}>Login?</NavLink></p>

      </div>
    
    </div>
  );
}

export default SignUp;
