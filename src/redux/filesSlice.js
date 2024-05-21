// filesSlice.js
import { createSlice } from '@reduxjs/toolkit'

const filesSlice = createSlice({
  name: 'files',
  initialState: {
    user: null,
    files: [], // Инициализация пустым массивом
    fileCount: 0,
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
      state.fileCount = action.payload.length;
    },
    addFiles: (state, action) => {
      state.files = [...state.files, ...action.payload];
      state.fileCount += action.payload.length;
    },
    incrementFileCount: (state, action) => {
      state.fileCount += action.payload;
    },
  },
});

export const { setUser, logoutUser, setFiles, addFiles, incrementFileCount } = filesSlice.actions;

export const selectUser = (state) => state.files.user;
export const selectFiles = (state) => state.files.files;
export const selectFileCount = (state) => state.files.fileCount;

export default filesSlice.reducer;