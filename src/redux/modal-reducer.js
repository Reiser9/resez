const SET_QUIT_MODAL = 'SET_QUIT_MODAL';
const SET_DELETE_MODAL = 'SET_DELETE_MODAL';

const initialState = {
	quitModal: false,
	deleteModal: false
}

const modalReducer = (state = initialState, action) => {
	switch(action.type){
		case SET_QUIT_MODAL:
			return{
				...state,
				quitModal: action.value
			}
		case SET_DELETE_MODAL:
			return{
				...state,
				deleteModal: action.value
			}
        default:
            return state;
    }
}

export const setQuitModal = (value) => {
	return{
		type: SET_QUIT_MODAL,
		value
	}
}
export const setDeleteModal = (value) => {
	return{
		type: SET_DELETE_MODAL,
		value
	}
}

export default modalReducer;