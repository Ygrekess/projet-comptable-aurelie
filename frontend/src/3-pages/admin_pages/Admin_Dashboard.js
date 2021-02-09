import React from 'react'
import { Link } from 'react-router-dom'
import '../../4-css/Dashboard.css'
import { VscAccount } from 'react-icons/vsc'
import { BsPencilSquare, BsFileText } from 'react-icons/bs'
import { RiLineChartLine } from 'react-icons/ri'

export default function Admin_Dashboard() {
	return (
		<div className='admin-dashboard page'>
			<h1>Bonjour Youssef</h1>
			<div className='menu-container'>
				<div className='menu-item'>
					<Link to='/dashboard/admin/mon-compte'>
						<div className='icon-title'>
							<VscAccount size={80}/>
							<h6>Infos compte</h6>
						</div>
					</Link>
				</div>
				<div className='menu-item'>
					<Link to='/dashboard/admin/mes-poles'>
					<div className='icon-title'>
						<BsPencilSquare size={80}/>
						<h6>Mes pôles santé</h6>
					</div>
					</Link>
				</div>
			</div>
		</div>
	)
}
