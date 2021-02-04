import React, { useEffect, useState } from 'react'
import RegisterForm from './components/RegisterForm'
import '../4-css/Auth_Page.css'
import { useSelector } from 'react-redux'
import SigninForm from './components/SigninForm'

export default function Auth_Page(props) {

	const [form, setForm] = useState('register');

	const userLogin = useSelector(state => state.userLogin);
	const { userInfos } = userLogin;

	useEffect(() => {
		if (userInfos) {
			props.history.push('/dashboard');
		}
		return () => {
		}
	}, [userInfos])

	return (
		<div className='auth_page'>
			<div className={'form-container ' + form}>
				<RegisterForm props={props} />
						<div className='btn-signin'>
							<label>Déjà un compte ?</label>
							<button className='' onClick={() => setForm('signin')}>Me connecter</button>
						</div>

						<div className='btn-register'>
							<label>Pas encore de compte ?</label>
							<button className='' onClick={() => setForm('register')}>M'inscrire</button>
						</div>	
				<SigninForm props={props}/>
			</div>
		</div>
	)
}
