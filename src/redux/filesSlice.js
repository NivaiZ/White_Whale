import { createSlice } from '@reduxjs/toolkit'

const filesSlice = createSlice({
  name: 'files',
  initialState: {
    user: null,
    files: [],
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logoutUser: (state) => {
      state.user = null;
    },
    setFiles: (state, action) => {
      state.files = action.payload;
    },
  },
});

export const { setUser, logoutUser, setFiles } = filesSlice.actions;
export const selectUser = (state) => state.files.user;
export const selectFiles = (state) => state.files.files;

export default filesSlice.reducer;
