import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../2-actions/userActions';
import LoadingSpinner from './LoadingSpinner';
import MessageBox from './MessageBox';

export default function SigninForm() {

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [signinError, setSigninError] = useState('');

	const userLogin = useSelector(state => state.userLogin);
	const { loading, error, success } = userLogin;

	const dispatch = useDispatch()

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(login(email, password))
	}

	useEffect(() => {
		if (error) {
			setSigninError(error)
		}
		if (success) {
			setEmail('')
			setPassword('')
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
				<div className='validate-btn'>
					{
						loading ? 
							<LoadingSpinner />
						:
							<div>
								<button>Valider</button>
							</div>
					}
				</div>
				<div className='message-container'>
				{
					signinError &&
					<MessageBox style='danger' message={signinError}/>
				}
				{
					success &&
					<MessageBox style='success' message='Vous êtes connecté.'/>
				}
				</div>
			</form>
		</div>
	)
}
