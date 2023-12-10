import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
// const API = "http://localhost:4000/";
const API="https://xero-code-rq3z-73z19uvd8-rachit2323.vercel.app/";
let initialState = {
  token: "",
  loading: false,
  errorsignup: "",
  errorsignin: "",
  successsignin: false,
  successsignup: false,
  signupdata:"",
  gitdata:"",
  userdata:{},
};

export const signupUser = createAsyncThunk("signupuser", async (body) => {
  try {

    const result = await fetch(`${API}users/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await result.json();
    const { token } = data;

    localStorage.setItem("token", token);

    return data;
  } catch (error) {
    return { error: error.message };
  }
});

export const signinUser = createAsyncThunk("signinuser", async (body) => {
  try {
    const result = await fetch(`${API}users/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await result.json();
    const { token } = data;

    localStorage.setItem("token", token);

    return data;
  } catch (error) {
    return { error: error.message }; 
  }
});

export const signinGoogle = createAsyncThunk("signinGoogle", async (token) => {

  try {
   console.log('token',token)
    const response = await fetch(`${API}users/gsignin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });
 
    const data = await response.json();
 
    if (!response.ok) {
      return { error: data.message };
    }
    // console.log(data,data.token);s
   localStorage.setItem("token", data.token);
      console.log("check");
    return data;
  } catch (error) {
    return { error: error.message };
  }
 });

 export const gitsign = createAsyncThunk("gitsign", async (code) => {

  try {
    const response = await fetch(`${API}users/getaccess?code=`+code, {
      method: "GET",
   
    });
 
    const data = await response.json();

    if (!response.ok) {
      return { error: data.message };
    }

    return data;
  } catch (error) {
    return { error: error.message };
  }
 });

 export const userdetails = createAsyncThunk("userdetails", async () => {

  try {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API}users/userdetail`, {
      method: "GET",
      headers:{
        Authorization: `Bearer ${token}`,
      }

    });

    const data = await response.json();
    
    

    if (!response.ok) {
      return { error: data.message };
    }

    return data;
  } catch (error) {
    return { error: error.message };
  }
 });


 export const gitdataUser= createAsyncThunk("gitdataUser", async () => {
  try {
    const response = await fetch(`${API}users/getUser`, {
      method: "GET",
      headers: {
        "Authorization": "Bearer "+localStorage.getItem('accesstoken'),
      },
    });
 
    const data = await response.json();
    // console.log(data);
    if (!response.ok) {
      return { error: data.message };
    }
    localStorage.setItem("token", data.token);
    //  console.log(data);
    return data;
  } catch (error) {
    return { error: error.message };
  }
 });

 export const typeidata= createAsyncThunk("typeidata", async (values) => {

  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API}users/type`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ values }),
    });
 
    const data = await response.json();
 
    if (!response.ok) {
      return { error: data.message };
    }
    // console.log(data,data.token);
    return data;
  } catch (error) {
    return { error: error.message };
  }
 });


 export const carddata= createAsyncThunk("carddata", async (values) => {

  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API}users/card`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ values }),
    });
 
    const data = await response.json();  
 
    if (!response.ok) {
      return { error: data.message };
    }
    // console.log(data,data.token);
    return data;
  } catch (error) {
    return { error: error.message };
  }
 });
 



const authReducer = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.successsignup = false;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
 
        if (action.payload.error) {

          state.successsignup = action.payload.success;
        } else {
          state.errorsignup = action.payload.message;
          state.successsignup = action.payload.success;
          state.signupdata=action.payload.data;

        }
      })
      .addCase(signupUser.rejected, (state) => {
        state.loading = false;
        state.successsignup = false;
      })
 
      .addCase(signinUser.pending, (state) => {
        state.loading = true;
        state.successsignin = false;
      })
      .addCase(signinUser.fulfilled, (state, action) => {
        state.loading = false;
 
        if (action.payload.error) {
          state.errorsignin = action.payload.error;
          state.successsignin = action.payload.success;
        } else {

          state.errorsignin = action.payload.message;
          state.successsignin = action.payload.success;
        }
      })
      .addCase(signinUser.rejected, (state) => {
        state.loading = false;
        state.successsignin = false;
      })
      .addCase(signinGoogle.pending, (state) => {
        state.loading = true;
        state.successsignin = false;
      })
      .addCase(signinGoogle.fulfilled, (state, action) => {
        state.loading = false;
        state.successsignup = action.payload.success;
        state.token = action.payload.token;
      })
      .addCase(signinGoogle.rejected, (state, action) => {
        state.loading = false;
        state.errorsignin = action.payload.error;
        state.successsignin = action.payload.success;
      })
      .addCase(gitsign.pending, (state) => {
        state.loading = true;
        // state.successsignin = false;
      })
      .addCase(gitsign.fulfilled, (state, action) => {
        state.loading = false;
        // console.log(action.payload.access_token);
        state.successsignup = action.payload.success;
        state.gitdata = action.payload.access_token;
      })
      .addCase(gitsign.rejected, (state, action) => {
        state.loading = false;
        // state.errorsignin = action.payload.error;
        // state.successsignin = action.payload.success;
      })
      .addCase(gitdataUser.pending, (state) => {
        state.loading = true;
        // state.successsignin = false;
      })
      .addCase(gitdataUser.fulfilled, (state, action) => {
        state.loading = false;
        // console.log(action.payload.access_token);
        state.successsignup = action.payload.success;
        state.gitdata = action.payload.access_token;
      })
      .addCase(gitdataUser.rejected, (state, action) => {
        state.loading = false;
        // state.errorsignin = action.payload.error;
        state.successsignin = action.payload.success;
      })
      .addCase(userdetails.pending, (state) => {
        state.loading = true;
        // state.successsignin = false;
      })
      .addCase(userdetails.fulfilled, (state, action) => {
        state.loading = false;

        state.userdata=action.payload.user;
        state.successsignup = action.payload.success;

      })
      .addCase(userdetails.rejected, (state, action) => {
        state.loading = false;
        // state.errorsignin = action.payload.error;
        state.successsignin = action.payload.success;
      });
  },
 });
 
 export default authReducer.reducer;
