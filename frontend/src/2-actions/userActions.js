import axios from 'axios';
import Cookie from 'js-cookie';

const register = (name, email, password) => async (dispatch) => {
	dispatch({ type: 'USER_REGISTER_REQUEST' });
    try {
		const { data } = await axios.post('http://localhost:5000/api/auth/register', { name: name, email: email, password: password });
		dispatch({ type: 'USER_REGISTER_SUCCESS', payload: data });
		dispatch(login(data.email, password));
	} catch (error) {
		dispatch({ type: 'USER_REGISTER_FAIL', payload: error.response.data });
    }
}

const login = (email, password) => async (dispatch) => {
	dispatch({ type: 'USER_LOGIN_REQUEST' });
    try {
		const { data } = await axios.post('http://localhost:5000/api/auth/login', { email: email, password: password });
		dispatch({ type: 'USER_LOGIN_SUCCESS', payload: data });
		Cookie.set('userInfos', { id: data._id, name: data.name, email: data.email, token: data.token})
	} catch (error) {
		dispatch({ type: 'USER_LOGIN_FAIL', payload: error.response.data });
    }
}
export {
	register,
	login
}