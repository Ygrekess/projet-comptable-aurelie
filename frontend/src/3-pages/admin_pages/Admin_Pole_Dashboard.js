import React from 'react'
import PoleItem from '../components/PoleItem'
import { FiPlus } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { IoMdArrowRoundBack } from 'react-icons/io'

export default function Admin_Pole_Dashboard(props) {
	return (
		<div className='admin-pole-dashboard'>
			<div className='arrow-header'>
				<Link to={'#'} onClick={() => props.history.goBack()}><IoMdArrowRoundBack className='arrow-back' size={40}/></Link>
				<h1>Liste des pôles</h1>
			</div>
			<div className='admin-pole-items-container'>
				<PoleItem />
				<PoleItem />
				<PoleItem />
				<PoleItem />
				<div className='add-pole-item'>
					<FiPlus size={80}/>
				</div>
			</div>
		</div>
	)
}
