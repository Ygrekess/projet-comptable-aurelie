import React from 'react'
import '../../4-css/User_Dashboard.css'
import { VscAccount } from 'react-icons/vsc'
import { BsPencilSquare, BsFileText } from 'react-icons/bs'
import { RiLineChartLine } from 'react-icons/ri'
import { Link } from 'react-router-dom'

export default function User_Dashboard() {
	return (
		<div className='user-dashboard page'>
			<h1>Bonjour Youssef</h1>
			<div className='menu-container'>
				<div className='menu-item'>
					<Link to='/dashboard/moncompte'>
						<div className='icon-title'>
							<VscAccount size={80}/>
							<h6>Infos compte</h6>
						</div>
					</Link>
				</div>
				<div className='menu-item'>
					<Link to='/dashboard/declaration'>
					<div className='icon-title'>
						<BsPencilSquare size={80}/>
						<h6>Saisir ma déclaration</h6>
					</div>
					</Link>
				</div>
				<div className='menu-item'>
					<Link to='#'>
						<div className='icon-title'>
							<BsFileText size={80}/>
							<h6>Historique</h6>
						</div>
					</Link>
				</div>
				<div className='menu-item'>
					<Link to='#'>
						<div className='icon-title'>
							<RiLineChartLine size={80}/>
							<h6>Analyse</h6>
						</div>
					</Link>
				</div>
			</div>
		</div>
	)
}
