import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData, updateUserData } from '../../Reducer/Auth';
import { useNavigate, useParams } from 'react-router-dom';
import { FaPencilAlt } from 'react-icons/fa';

function UserDetails() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [edit, setEdit] = useState(false);
  const [data, setData] = useState({
    name: '',
    email: '',
    address: '',
    password: ''
  });

  const user = useSelector((state) => state.auth.user);
  const { id } = useParams();
  

  let token = localStorage.getItem('token');
  useEffect(() => {
    if (!token) {
      navigate('/');
    } else {
      dispatch(fetchUserData(id));
    }
  }, [dispatch, id, token, navigate]);

  useEffect(() => {
    if (user) {
      setData({
        id: user._id,
        name: user.name,
        email: user.email,
        address: user.address,
        password: user.password
      });
    }
  }, [user]);

  if (!user) {
    return <h3>Loading...</h3>;
  }

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleEdit = () => {
    setEdit(!edit);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSave = () => {
    dispatch(updateUserData(data));
    setTimeout(() => {
      setEdit(false);
    }, 2500);

  };



  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">User Details</h1>
      <div className="card p-4 shadow-sm position-relative">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <button className="btn btn-secondary" onClick={handleEdit}>
            <FaPencilAlt /> {edit ? "Cancel" : "Edit"}
          </button>
        </div>
        {edit ? (
          <>
            <div className="form-group mb-3">
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={data.name}
                onChange={handleChange}
              />
            </div>
            <div className="form-group mb-3">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={data.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group mb-3">
              <label>Address</label>
              <input
                type="text"
                className="form-control"
                name="address"
                value={data.address}
                onChange={handleChange}
              />
            </div>
            <div className="form-group mb-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={data.password}
                onChange={handleChange}
              />
            </div>
            <button type='submit' onClick={handleSave} className="btn btn-primary" >Save</button>
          </>
        ) : (
          <>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Address:</strong> {user.address}</p>
            <p><strong>Password:</strong> {user.password}</p>
          </>
        )}
        <div className='mt-5' style={{ width: "100%", display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
          <button
            className="btn btn-danger"
            style={{ width: "100px" }}
            onClick={handleLogOut}
          >
            LogOut
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserDetails;



