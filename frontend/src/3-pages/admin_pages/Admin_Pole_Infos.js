import React, { useEffect } from 'react'
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { resetPole, updatePole } from '../../2-actions/poleActions';
import LoadingSpinner from '../components/LoadingSpinner';

export default function Admin_Pole_Infos() {

	const poleSelected = useSelector(state => state.poleSelected)
	const { pole } = poleSelected;
	
	const poleUpdated = useSelector(state => state.poleUpdated)
	const { loading, error } = poleUpdated;

	const { register, handleSubmit, errors } = useForm();
	const dispatch = useDispatch()

	const onSubmit = data => {
		const poleUpdated = {
			name: data.name,
			address: data.address,
			postalCode: data.postalCode,
			city: data.city,
			surfaceTotale: data.surfaceTotale,
			loyerAnnuel: data.loyerAnnuel,
			loyerMensuelm2: ((Number(data.loyerAnnuel) / Number(data.surfaceTotale))/12).toFixed(2),
		}
		dispatch(updatePole(pole._id, poleUpdated))
	}

	useEffect(() => {
		return () => {
			dispatch(resetPole())
		}
	}, [])

	return (
		<div className='pole-infos-page'>
			<form id='pole-infos-form' className='pole-infos-form' onSubmit={handleSubmit(onSubmit)}>
				<h2>Infos genérales</h2>
				<div>
					<label>Nom</label>
					<input name="name" className={errors.name && 'error'} defaultValue={pole.name} ref={register} />
				</div>
				<div>
					<label>Adresse</label>
					<input name="address" className={errors.address && 'error'} defaultValue={pole.address} ref={register} />
				</div>
				<div>
					<label>Code postal</label>
					<input name="postalCode" className={errors.postalCode && 'error'} defaultValue={pole.postalCode} ref={register} />
				</div>
				<div>
					<label>Ville</label>
					<input name="city" className={errors.city && 'error'} defaultValue={pole.city} ref={register} />
				</div>
				<div>
					<label>Surface totale</label>
					<input name="surfaceTotale" className={errors.surfaceTotale && 'error'} defaultValue={pole.surfaceTotale} ref={register} />
				</div>
				<div>
					<label>Loyer annuel</label>
					<input name="loyerAnnuel" className={errors.loyerAnnuel && 'error'} defaultValue={pole.loyerAnnuel} ref={register} />
				</div>
				<div>
					<label>Prix mensuel au m2 (€)</label>
					<input disabled name="loyerMensuelm2" className={errors.loyerMensuelm2 && 'error'} defaultValue={pole.loyerMensuelm2} ref={register} />
				</div>
				<button type="submit" form='pole-infos-form' value=''>Valider les modifications</button>
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
