import React from 'react'
import { Link, NavLink } from 'react-router-dom'

export default function AdminPolePageMenu() {
	return (
		<ul className='admin-pole-page-menu'>
			<NavLink to='/dashboard/admin/mes-poles/123/infos'><li>Infos générales</li></NavLink>
			<NavLink to='/dashboard/admin/mes-poles/123/declarations'><li>Déclarations</li></NavLink>
			<NavLink to='/dashboard/admin/mes-poles/123/specialites'><li>Spécialités</li></NavLink>
			<NavLink to='/dashboard/admin/mes-poles/123/analyse'><li>Analyse</li></NavLink>
		</ul>
	)
}
