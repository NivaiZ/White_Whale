export const SET_USER = 'SET_USER'
export const LOGOUT_USER = 'LOGOUT_USER'
export const SET_FILES = 'SET_FILES'

export const setUser = user => ({ type: SET_USER, payload: user })
export const logoutUser = () => ({ type: LOGOUT_USER })
export const setFiles = files => ({ type: SET_FILES, payload: files })
