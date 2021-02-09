import React from 'react'
import { Link } from 'react-router-dom'

export default function DeclarationItem() {
	return (
		<Link to='/dashboard/admin/mes-poles/123/declarations/123' className='declaration-item'>
			<h3>Déclaration 12/03/2020</h3>
		</Link>
	)
}
