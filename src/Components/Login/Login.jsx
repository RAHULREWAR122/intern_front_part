import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../Reducer/Auth';
import { NavLink, useNavigate } from 'react-router-dom';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const error = useSelector((state) => state.auth.error);
  const user = useSelector((state) => state.auth.user);
 
  const handleLogin = () => {
    dispatch(login({ email, password }))
      .unwrap()
      .then((user) => {
        navigate(`/user/${user.result._id}`);
       })
      .catch((err) => {
        console.log("Login failed" , err);
        return
        
      });
  };
 
  let token =localStorage.getItem("token");
  let userData = JSON.parse(localStorage.getItem("user"));
 
  useEffect(()=>{
    if(token){
       navigate(`/user/${userData._id}`)
    }  
 },[])
   

  return (
    <div className="container mt-5">
      <h1 className="text-center absolute  mb-4">Login</h1>
      {error && <p className="text-danger mt-3">{error}</p>}
      <div className="card p-4 shadow-sm">
        <div className="form-group mb-3">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
        </div>
        <button className="btn btn-primary btn-block" onClick={handleLogin}>
          Login
        </button>
        <p className='text-center mt-4'>Not a Member?
         <NavLink to={"/register"}> Register</NavLink>
       </p>
    
      </div>
    </div>
  );
}

export default Login;
