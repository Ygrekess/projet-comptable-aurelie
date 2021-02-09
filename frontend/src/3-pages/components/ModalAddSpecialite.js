import React from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

export default function ModalAddSpecialite() {

	const schema = yup.object().shape({
	});
	
	const { register, handleSubmit, errors } = useForm({
		resolver: yupResolver(schema)
	});

	const onSubmit = data => console.log(data);

	return (
		<div className='modal-add-specialite'>
			<form id='form-add-specialite' className='form-add-specialite' onSubmit={handleSubmit(onSubmit)}>
				<h2>Ajouter une spécialité</h2>
				<div>
					<label>Type</label>
					<input name="name" className={errors.name && 'error'} defaultValue={''} ref={register} />
					{ errors.name&&  <span className='danger'>Merci de saisir une valeur.</span>}
				</div>
				<div>
					<label>Nombre</label>
					<input name="nombre" className={errors.nombre && 'error'} defaultValue={''} ref={register} />
					{ errors.nombre&&  <span className='danger'>Merci de saisir une valeur.</span>}
				</div>
				<div>
					<label>Honoraires (€)</label>
					<input name="honoraires" className={errors.honoraires && 'error'} defaultValue={''} ref={register} />
					{ errors.honoraires&&  <span className='danger'>Merci de saisir une valeur.</span>}
				</div>
				<div>
					<label>Surface propre par spécialité (m²)</label>
					<input name="surfPropreProf" className={errors.surfPropreProf && 'error'} defaultValue={''} ref={register} />
					{ errors.surfPropreProf&&  <span className='danger'>Merci de saisir une valeur.</span>}
				</div>
				<div>
					<label>Surface communs (m²)</label>
					<input name="surfCommuns" className={errors.surfCommuns && 'error'} defaultValue={''} ref={register} />
					{ errors.surfCommuns && <span className='danger'>Merci de saisir une valeur.</span>}
				</div>
				<div>
					<label>Surface par praticien (m²)</label>
					<input name="surfPraticien" className={errors.surfPraticien && 'error'} defaultValue={''} ref={register} />
					{ errors.surfPraticien&&  <span className='danger'>Merci de saisir une valeur.</span>}
				</div>
				<div className=''>
					<button type="submit" form='form-add-specialite' value=''>Valider</button>
				</div>
			</form>
		</div>
	)
}
