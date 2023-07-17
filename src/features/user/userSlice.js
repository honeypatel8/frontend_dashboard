import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  role: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setRoll: (state, action) => {
      state.role = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.role = null;
    },
  },
});

export const { setUser, setRoll, logout } = userSlice.actions;

export default userSlice.reducer;
