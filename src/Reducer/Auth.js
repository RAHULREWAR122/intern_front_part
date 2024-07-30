import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useNavigate } from "react-router-dom";

let api = "https://intern-backend-part.onrender.com"
// let api = "http://localhost:4000"

const initialState = {
  user: null,
  msg: "",
  error: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post(`${api}/user/login`, credentials);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.result));
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (userInfo, thunkAPI) => {
    try {
      const response = await axios.post(`${api}/user/register`, userInfo);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);


export const fetchUserData = createAsyncThunk(
  "auth/fetchUserData",
  async (_id, thunkAPI) => {
    try {
      const response = await axios.get(`${api}/user/${_id}`);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const updateUserData = createAsyncThunk(
    "auth/updateUserData",
    async (userData, thunkAPI) => {
      try {
        const response = await axios.put(`${api}/user/update/${userData._id}`, userData);
        return response.data;
      } catch (err) {
        console.log( "error is ",err.response || err.message)
        return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
      }
    }
);



const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.msg = "";
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload;
        state.msg = "";
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(updateUserData.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = null;
      })
      .addCase(updateUserData.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
