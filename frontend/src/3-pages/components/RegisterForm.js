import React, { useEffect, useState } from 'react'
import { register } from '../../2-actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import MessageBox from './MessageBox';
import LoadingSpinner from './LoadingSpinner';

export default function RegisterForm({ props }) {

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [registerError, setRegisterError] = useState('');

	const userRegister = useSelector(state => state.userRegister);
	const { loading, success, error } = userRegister;

	const dispatch = useDispatch()

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(register(name, email, password));
	}

	useEffect(() => {
		if (error) {
			setRegisterError(error)
		}
		if (success) {
			setName('');
			setEmail('');
			setPassword('');
		}
		return () => {
		}
	}, [error, success])

	return (
		<div>
			<form onChange={() => setRegisterError('')} className='form register' onSubmit={submitHandler}>
				<h2>Inscription</h2>
				<div>
					<input placeholder='Nom' value={name} onChange={(e) => setName(e.target.value)} />
				</div>
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
					registerError &&
					<MessageBox style='danger' message={registerError}/>
				}
				{
					success &&
					<MessageBox style='success' message='Votre compte a été créé.'/>
				}
				</div>
			</form>
		</div>
	)
}
