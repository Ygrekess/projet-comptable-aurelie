import React, { useState } from 'react'
import { RiSubtractLine } from 'react-icons/ri'
import { BsCircle } from 'react-icons/bs'
import '../../4-css/StepsChecker.css'

export default function StepsChecker() {
	
	const [steps, setSteps] = useState(1);

	return (
		<div className='steps-checker'>
			<div className={'step ' + (steps >= 1 ? 'active' : '')}><RiSubtractLine size={30}/><RiSubtractLine size={30}/><BsCircle size={30}/></div>
			<div className={'step ' + (steps >= 2 ? 'active' : '')}><RiSubtractLine size={30}/><RiSubtractLine size={30}/><BsCircle size={30}/></div>
			<div className={'step ' + (steps >= 3 ? 'active' : '')}><RiSubtractLine size={30}/><RiSubtractLine size={30}/><BsCircle size={30}/></div>
			<div className={'step ' + (steps >= 4 ? 'active' : '')}><RiSubtractLine size={30}/><RiSubtractLine size={30}/><BsCircle size={30}/></div>
		</div>
	)
}
