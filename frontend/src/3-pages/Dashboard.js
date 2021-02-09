import React from 'react'
import Admin_Dashboard from './admin_pages/Admin_Dashboard'
import User_Dashboard from './user_pages/User_Dashboard'
import '../4-css/Dashboard.css'
import { Route } from 'react-router-dom'
import UserInfos_Page from './user_pages/UserInfos_Page'
import Admin_Pole_Dashboard from './admin_pages/Admin_Pole_Dashboard'
import Admin_Pole_Page from './admin_pages/Admin_Pole_Page'
/* import Declaration_Page from '../5-brouillon/Declaration_Page'
import Test_page from '../5-brouillon/Test_page' */

export default function Dashboard() {
	return (
		<div className='dashboard-container'>
			<Route path='/dashboard' exact component={User_Dashboard} />
			<Route path='/dashboard/admin' exact component={Admin_Dashboard} />
			<Route path='/dashboard/mon-compte' component={UserInfos_Page} />
			<Route path='/dashboard/admin/mes-poles' exact component={Admin_Pole_Dashboard} />
			<Route path='/dashboard/admin/mes-poles/:id' component={Admin_Pole_Page} />
{/* 			<Route path='/dashboard/declaration' component={Declaration_Page} />
			<Route path='/dashboard/test' component={Test_page} /> */}
		</div>
	)
}
