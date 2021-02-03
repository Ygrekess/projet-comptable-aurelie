import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../2-actions/userActions';

export default function SigninForm() {

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [signinError, setSigninError] = useState('');

	const userLogin = useSelector(state => state.userLogin);
	const { loading, error } = userLogin;

	const dispatch = useDispatch()

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(login(email, password))
	}

	useEffect(() => {
		if (error) {
			setSigninError(error)
		}
		return () => {
		}
	}, [error])

	return (
		<div>
			<form className='form signin' onSubmit={submitHandler}>
				<h2>Connexion</h2>
				<div>
					<input placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
				</div>
				<div>
					<input placeholder='Mot de passe' value={password} onChange={(e) => setPassword(e.target.value)}/>
				</div>
				<div>
					<button>Valider</button>
				</div>
				<div className='error-container'>
				{
					signinError &&
					<h6 className='danger'>{signinError}</h6>
				}
				</div>
			</form>
		</div>
	)
}
