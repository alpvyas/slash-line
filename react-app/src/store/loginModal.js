const LOGIN_ACTIVATE = "LOGIN/activate";
const LOGIN_DEACTIVATE = "LOGIN/deactivate";
export const activateLoginModal = () => {
	return {
		type: LOGIN_ACTIVATE,
	};
};
export const deactivateLoginModal = () => {
	return {
		type: LOGIN_DEACTIVATE,
	};
};
const initialState = { status: false };
const loginModalReducer = (state = initialState, action) => {
	let newState;
	switch (action.type) {
		case LOGIN_ACTIVATE:
			newState = Object.assign({}, state, { status: true });
			return newState;
		case LOGIN_DEACTIVATE:
			newState = Object.assign({}, state, { status: false });
			return newState;
		default:
			return state;
	}
};
export default loginModalReducer;