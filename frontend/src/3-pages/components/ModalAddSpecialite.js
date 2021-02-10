import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { addSpecialite } from '../../2-actions/specialiteActions';
import LoadingSpinner from './LoadingSpinner';
import Notifications, { notify } from 'react-notify-toast';

export default function ModalAddSpecialite() {

	const poleSelected = useSelector(state => state.poleSelected)
	const { pole } = poleSelected;

	const specialiteAdd = useSelector(state => state.specialiteAdd)
	const { loading, success, error } = specialiteAdd;

	const { register, handleSubmit, reset, errors } = useForm();

	const dispatch = useDispatch()

	const onSubmit = data => {
		const specialite = {
			name: data.name,
			nombre: data.nombre,
			honoraires: data.honoraires,
			surfPropreProf: data.surfPropreProf,
			surfCommuns: data.surfCommuns,
			surfPraticien: data.surfPraticien,
		}
		dispatch(addSpecialite(pole._id, specialite))
	};

	useEffect(() => {
		if (success) {
			notify.show("La spécialité a bien été ajoutée !", "success", 5000, '#0E1717');
			reset({})
		}
		return () => {
		}
	}, [success])

	return (
		<div className='modal-add-specialite'>
			<form id='form-add-specialite' className='form-add-specialite' onSubmit={handleSubmit(onSubmit)}>
				<Notifications />
				<h2>Ajouter une spécialité</h2>
				<div>
					<label>Type</label>
					<input name="name" className={errors.name && 'error'} defaultValue={''} ref={register} />
				</div>
				<div>
					<label>Nombre</label>
					<input name="nombre" className={errors.nombre && 'error'} defaultValue={''} ref={register} />
				</div>
				<div>
					<label>Honoraires (€)</label>
					<input name="honoraires" className={errors.honoraires && 'error'} defaultValue={''} ref={register} />
				</div>
				<div>
					<label>Surface propre par spécialité (m²)</label>
					<input name="surfPropreProf" className={errors.surfPropreProf && 'error'} defaultValue={''} ref={register} />
				</div>
				<div>
					<label>Surface communs (m²)</label>
					<input name="surfCommuns" className={errors.surfCommuns && 'error'} defaultValue={''} ref={register} />
				</div>
				<div>
					<label>Surface par praticien (m²)</label>
					<input name="surfPraticien" className={errors.surfPraticien && 'error'} defaultValue={''} ref={register} />
				</div>
				<div className=''>
					<button type="submit" form='form-add-specialite' value=''>Valider</button>
				</div>
			</form>
			{
				loading &&
				<LoadingSpinner/>
			}
			{
				error &&
				<p className='danger'>{error}</p>
			}
		</div>
	)
}
