import { createSlice ,createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
  user : {},
  status: "idle",
  error: null
}

const baseUrl = import.meta.env.VITE_REACT_API_URL;

export const getUserData = createAsyncThunk("user/getUserData", async () => {
        const response = axios({
          method: 'get',
          url: `${baseUrl}/user`,
          withCredentials: true
        });
        return response.data;    
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUser: (state) => {
        state = initialState;
       }
  },
  extraReducers (builder) {
    builder
        .addCase(getUserData.pending, (state,action) => {
            state.status = "loading";
            state.error = null;
            state.user = {};
        })
        .addCase(getUserData.fulfilled, (state,action) => {
            state.status = "succeeded";
            state.user = action.payload;
            state.error = null;
        })
        .addCase(getUserData.rejected, (state,action) => {
            state.status = "failed";
            state.error = action.error.message;
            state.user = {};
        })
  }
})


export const { clearUser } = userSlice.actions ;

export const selectUser = (state) => state.user.user ;

export const getUserStatus = (state) => state.user.status ;

export const getUserError = (state) => state.user.error ;

export default userSlice.reducer