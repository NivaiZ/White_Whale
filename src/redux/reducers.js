import { LOGOUT_USER, SET_FILES, SET_USER } from './actions'

const initialState = {
	user: null,
	files: [],
}

const rootReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_USER:
			return { ...state, user: action.payload }
		case LOGOUT_USER:
			return { ...state, user: null }
		case SET_FILES:
			return { ...state, files: action.payload }
		default:
			return state
	}
}

export default rootReducer
