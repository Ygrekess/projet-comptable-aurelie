import React, { useState } from 'react'
import DeclarationItem from '../components/DeclarationItem'
import { FiPlus } from 'react-icons/fi'
import ModalAddDeclaration from '../components/ModalAddDeclaration'
import ReactModal from 'react-modal'

export default function Admin_Pole_Declaration() {

	const [ addDeclaration, setAddDeclaration ] = useState(false)

	return (
		<div className='admin-pole-declaration-page'>
			<h2>Déclarations</h2>
			{
				addDeclaration && 
				<ReactModal
					isOpen={addDeclaration}
					className="Modal-add-declaration"
					ariaHideApp={false}
					overlayClassName="Overlay-add-declaration"
					onRequestClose={() => setAddDeclaration(!addDeclaration)}
				>
					<ModalAddDeclaration/>
				</ReactModal>
			}
			<div className='pole-declarations-items-container'>
				<DeclarationItem />
				<div className='add-declaration-item' onClick={() => setAddDeclaration(!addDeclaration)}>
					<FiPlus size={80}/>
				</div>
			</div>
		</div>
	)
}
