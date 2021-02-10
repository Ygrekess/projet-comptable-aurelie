import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import ReactModal from 'react-modal'
import ModalUpdateDeclaration from './ModalUpdateDeclaration'

export default function DeclarationItem() {

	const [updateDeclaration, setUpdateDeclaration] = useState(false)

	return (
		<Fragment>
			<ReactModal
				isOpen={updateDeclaration}
				className="Modal-update-declaration"
				ariaHideApp={false}
				overlayClassName="Overlay-update-declaration"
				onRequestClose={() => setUpdateDeclaration(!updateDeclaration)}
			>
				<ModalUpdateDeclaration/>
			</ReactModal>
			<Link to='/dashboard/admin/mes-poles/123/declarations/123' className='declaration-item' onClick={() => setUpdateDeclaration(!updateDeclaration)}>
				<h3>Déclaration 12/03/2020</h3>
			</Link>
		</Fragment>
	)
}
