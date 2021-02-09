import React, { useState } from 'react'
import { FiPlus } from 'react-icons/fi'
import ModalAddSpecialite from '../components/ModalAddSpecialite'
import ReactModal from 'react-modal'
import SpecialiteItem from '../components/SpecialiteItem'

export default function Admin_Pole_Specialites() {

	const [addSpecialite, setAddSpecialite] = useState(false)
	
	return (
		<div className='admin-pole-specialites-page'>
			<h2>Liste spécialités</h2>
			{
				addSpecialite && 
				<ReactModal
					isOpen={addSpecialite}
					className="Modal-add-specialite"
					ariaHideApp={false}
					overlayClassName="Overlay-add-specialite"
					onRequestClose={() => setAddSpecialite(!addSpecialite)}
				>
					<ModalAddSpecialite/>
				</ReactModal>
			}
			<div className='pole-specialites-items-container'>
				<SpecialiteItem />
				<div className='add-specialite-item' onClick={() => setAddSpecialite(!addSpecialite)}>
					<FiPlus size={80}/>
				</div>
			</div>
		</div>
	)
}
