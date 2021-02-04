const userRegisterReducer = (state = {}, action) => {
	switch (action.type) {
		case 'USER_REGISTER_REQUEST':
		return { loading: true };
		case 'USER_REGISTER_SUCCESS':
		return { loading: false, success: true };
		case 'USER_REGISTER_FAIL':
		return { loading: false, error: action.payload };
		default: return state;
	}
}

const userLoginReducer = (state = {}, action) => {
	switch (action.type) {
		case 'USER_LOGIN_REQUEST':
		return { loading: true };
		case 'USER_LOGIN_SUCCESS':
		return { loading: false, success: true, userInfos: action.payload };
		case 'USER_LOGIN_FAIL':
		return { loading: false, error: action.payload };
		case 'USER_LOGOUT':
		return {};
		default: return state;
	}
}

export {
	userRegisterReducer,
	userLoginReducer
};