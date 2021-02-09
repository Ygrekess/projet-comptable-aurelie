import React from 'react'
import { Link } from 'react-router-dom'

export default function PoleItem() {
	return (
		<Link to='/dashboard/admin/mes-poles/123' className='pole-item'>
			<h3>Pole Santé Patate</h3>
		</Link>
	)
}
