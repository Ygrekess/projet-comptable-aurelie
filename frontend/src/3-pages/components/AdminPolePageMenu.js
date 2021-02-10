import React from 'react'
import { Link, NavLink } from 'react-router-dom'

export default function AdminPolePageMenu({pole}) {
	return (
		<ul className='admin-pole-page-menu'>
			<NavLink to={`/dashboard/admin/mes-poles/${pole._id}/infos`}><li>Infos générales</li></NavLink>
			<NavLink to={`/dashboard/admin/mes-poles/${pole._id}/declarations`}><li>Déclarations</li></NavLink>
			<NavLink to={`/dashboard/admin/mes-poles/${pole._id}/specialites`}><li>Spécialités</li></NavLink>
			<NavLink to={`/dashboard/admin/mes-poles/${pole._id}/analyse`}><li>Analyse</li></NavLink>
		</ul>
	)
}
