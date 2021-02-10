import axios from 'axios';

const getAllPole = () => async (dispatch) => {
	dispatch({type: 'POLES_GET_REQUEST'})
	try {
		const { data } = await axios.get('/api/poles/')
		dispatch({type: 'POLES_GET_SUCCESS', payload : data})
	} catch (error) {
		dispatch({type: 'POLES_GET_FAIL', payload : error.response.data})
	}
}

const getOnePole = (poleId) => async (dispatch) => {
	dispatch({type: 'POLE_GET_REQUEST'})
	try {
		const { data } = await axios.get(`/api/poles/${poleId}`)
		
		dispatch({type: 'POLE_GET_SUCCESS', payload : data})
	} catch (error) {
		console.log(error.response)
		dispatch({type: 'POLE_GET_FAIL', payload : error.response.data})
	}
}

const addPole = (pole) => async (dispatch) => {
	dispatch({type: 'POLE_ADD_REQUEST'})
	try {
		const { data } = await axios.post('/api/poles/ajouter', pole)
		dispatch({type: 'POLE_ADD_SUCCESS', payload : data})
	} catch (error) {
		dispatch({type: 'POLE_ADD_FAIL', payload : error.response.data})
	}
}

const updatePole = (poleId, pole) => async (dispatch) => {
	dispatch({type: 'POLE_UPDATE_REQUEST'})
	try {
		const { data } = await axios.put(`/api/poles/update/${poleId}`, pole)
		dispatch({type: 'POLE_UPDATE_SUCCESS', payload : data})
	} catch (error) {
		dispatch({type: 'POLE_UPDATE_FAIL', payload : error.response.data})
	}	
}

const resetPole = () => async (dispatch) => {
	dispatch({type: 'POLE_UPDATE_RESET'})
}

export { getAllPole, getOnePole, addPole, updatePole, resetPole };