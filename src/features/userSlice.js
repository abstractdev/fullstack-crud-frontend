import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiPaths from "../apiPaths";
const paths = apiPaths();

export const getUser = createAsyncThunk("user/getUser", async () => {
  const res = await fetch(paths.userGet, {
    method: "GET",
    credentials: "include",
  });
  const userData = await res.json();
  return userData;
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
    isLoggedin: false,
    loading: false,
    isSuccess: true,
  },
  reducers: {
    setIsLoggedin: (state) => {
      state.isLoggedin ? (state.isLoggedin = false) : (state.isLoggedin = true);
    },
    setName: (state, action) => {
      state.user.name = action.payload;
    },
  },
  extraReducers: {
    [getUser.pending]: (state) => {
      state.loading = true;
    },
    [getUser.fulfilled]: (state, { payload }) => {
      if ("id" in payload) {
        state.isLoggedin = true;
      }
      state.loading = false;
      state.user = payload;
      state.isSuccess = true;
    },
    [getUser.rejected]: (state) => {
      state.loading = false;
      state.isSucceses = false;
    },
  },
});

export const { setIsLoggedin, setName } = userSlice.actions;
export default userSlice.reducer;
