import React from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

export default function Admin_Pole_Infos() {

	const schema = yup.object().shape({
	});
	
	const { register, handleSubmit, errors } = useForm({
		resolver: yupResolver(schema)
	});

	const onSubmit = data => console.log(data);

	return (
		<div className='pole-infos-page'>
			<form className='pole-infos-form' onSubmit={handleSubmit(onSubmit)}>
				<h2>Infos genérales</h2>
				<div>
					<label>Nom</label>
					<input name="name" className={errors.name && 'error'} defaultValue={''} ref={register} />
					{ errors.name ? errors.name.type === 'typeError' ? <span className='danger'>Merci de saisir un nombre.</span> : <span className='danger'>Ce champ est requis.</span> : ''}
				</div>
				<div>
					<label>Adresse</label>
					<input name="address" className={errors.address && 'error'} defaultValue={''} ref={register} />
					{ errors.address ? errors.address.type === 'typeError' ? <span className='danger'>Merci de saisir un nombre.</span> : <span className='danger'>Ce champ est requis.</span> : ''}
				</div>
				<div>
					<label>Code postal</label>
					<input name="postalCode" className={errors.postalCode && 'error'} defaultValue={''} ref={register} />
					{ errors.postalCode ? errors.postalCode.type === 'typeError' ? <span className='danger'>Merci de saisir un nombre.</span> : <span className='danger'>Ce champ est requis.</span> : ''}
				</div>
				<div>
					<label>Ville</label>
					<input name="city" className={errors.city && 'error'} defaultValue={''} ref={register} />
					{ errors.city ? errors.city.type === 'typeError' ? <span className='danger'>Merci de saisir un nombre.</span> : <span className='danger'>Ce champ est requis.</span> : ''}
				</div>
				<div>
					<label>Surface totale</label>
					<input name="surfaceTotale" className={errors.surfaceTotale && 'error'} defaultValue={''} ref={register} />
					{ errors.surfaceTotale ? errors.surfaceTotale.type === 'typeError' ? <span className='danger'>Merci de saisir un nombre.</span> : <span className='danger'>Ce champ est requis.</span> : ''}
				</div>
				<div>
					<label>Loyer annuel</label>
					<input name="loyerAnnuel" className={errors.loyerAnnuel && 'error'} defaultValue={''} ref={register} />
					{ errors.loyerAnnuel ? errors.loyerAnnuel.type === 'typeError' ? <span className='danger'>Merci de saisir un nombre.</span> : <span className='danger'>Ce champ est requis.</span> : ''}
				</div>
				<div>
					<label>Prix m2</label>
					<input disabled name="loyerMensuelm2" className={errors.loyerMensuelm2 && 'error'} defaultValue={''} ref={register} />
					{ errors.loyerMensuelm2 ? errors.loyerMensuelm2.type === 'typeError' ? <span className='danger'>Merci de saisir un nombre.</span> : <span className='danger'>Ce champ est requis.</span> : ''}
				</div>
				<button type="submit" form='pole-infos-form' value=''>Modifier</button>
			</form>
		</div>
	)
}
