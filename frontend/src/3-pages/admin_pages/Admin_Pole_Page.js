import React from 'react'
import { Link, Route } from 'react-router-dom'
import { IoMdArrowRoundBack } from 'react-icons/io'
import AdminPolePageMenu from '../components/AdminPolePageMenu'
import Admin_Pole_Infos from './Admin_Pole_Infos'
import Admin_Pole_Specialites from './Admin_Pole_Specialites'
import Admin_Pole_Analyse from './Admin_Pole_Analyse'
import Admin_Pole_Declaration from './Admin_Pole_Declaration'

export default function Admin_Pole_Page(props) {
	return (
		<div className='admin-pole-page'>
			<div className='arrow-header'>
				<Link to={'#'} onClick={() => props.history.goBack()}><IoMdArrowRoundBack className='arrow-back' size={40}/></Link>
				<h1>Nom du pôle</h1>
			</div>
			<div className='admin-pole-page-body'>
				<AdminPolePageMenu />
				<Route path='/dashboard/admin/mes-poles/:id/infos' component={Admin_Pole_Infos} />
				<Route path='/dashboard/admin/mes-poles/:id/declarations' component={Admin_Pole_Declaration} />
				<Route path='/dashboard/admin/mes-poles/:id/specialites' component={Admin_Pole_Specialites} />
				<Route path='/dashboard/admin/mes-poles/:id/analyse' component={Admin_Pole_Analyse}/>
			</div>
		</div>
	)
}
