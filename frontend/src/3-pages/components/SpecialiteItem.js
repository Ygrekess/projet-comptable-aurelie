import React from 'react'
import { Link } from 'react-router-dom'

export default function SpecialiteItem() {
	return (
		<Link to='/dashboard/admin/mes-poles/123/specialites/123' className='specialite-item'>
			<h3>Médecin</h3>
		</Link>
	)
}
