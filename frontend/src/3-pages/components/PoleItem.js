import React from 'react'
import { Link } from 'react-router-dom'

export default function PoleItem({ pole }) {

	return (
		<Link to={`/dashboard/admin/mes-poles/${pole._id}/infos`} className='pole-item'>
			<h3>{ pole.name }</h3>
		</Link>
	)
}
