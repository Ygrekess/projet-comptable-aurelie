import React from 'react'
import '../../4-css/UserInfos_Page.css'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { Link } from 'react-router-dom'

export default function UserInfos_Page(props) {
	return (
		<div className='userInfos-page'>
			<div className='userInfos-page-header'>
				<Link to={'#'} onClick={() => props.history.goBack()}><IoMdArrowRoundBack className='arrow-back' size={40}/></Link>
				<h1>Mon compte</h1>
			</div>
			<div className='userInfos-page-content'>

			</div>
		</div>
	)
}
