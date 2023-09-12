import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { id: "0", name: "User 1" },
  { id: "1", name: "User 2" },
  { id: "2", name: "User 3" },
];

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
});

export const fetchAllUsers = (state) => state.users;
export const {} = userSlice.actions;
export default userSlice.reducer;
