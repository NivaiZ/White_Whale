// filesSlice.js
import { createSlice } from '@reduxjs/toolkit'

const filesSlice = createSlice({
  name: 'files',
  initialState: {
    user: null,
    files: [],
    fileCount: 0, // добавляем счетчик в состояние
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logoutUser: (state) => {
      state.user = null;
    },
    setFiles: (state, action) => {
      console.log("Setting files:", action.payload);
      state.files = action.payload;
      state.fileCount = action.payload.length; // обновляем счетчик при установке файлов
    },
    incrementFileCount: (state, action) => {
      state.fileCount += action.payload;
    },
  },
});

export const { setUser, logoutUser, setFiles, incrementFileCount } = filesSlice.actions;

export const selectUser = (state) => state.files.user;
export const selectFiles = (state) => state.files.files;
export const selectFileCount = (state) => state.files.fileCount;

export default filesSlice.reducer;
