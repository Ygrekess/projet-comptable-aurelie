import React from 'react'
import { useForm } from "react-hook-form";
import { IoMdArrowRoundBack } from 'react-icons/io'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

export default function Test_page() {

	const schema = yup.object().shape({
		loyer: yup.number().required(),
		electricite: yup.number().required(),
		eau: yup.number().required(),
		fournAdmin: yup.number().required(),
		fournEntr: yup.number().required(),
		menage: yup.number().required(),
		assurance: yup.number().required(),
		honoraires: yup.number().required(),
		annoncesInsertions: yup.number().required(),
		fraisPostaux: yup.number().required(),
		internetTelephone: yup.number().required(),
		fraisBancaires: yup.number().required(),
		cfe: yup.number().required(),
		receptionDeplacement: yup.number().required(),
		petitEquipement: yup.number().required(),
	});
	
	const { register, handleSubmit, errors } = useForm({
		resolver: yupResolver(schema)
	});

	const onSubmit = data => console.log(data);

	return (
		<div className='test' style={{width:'40vw', height: '100vh'}}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div style={{ border: '2px solid #ffff' }}>
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
						<input name="loyerMensuelm2" className={errors.loyerMensuelm2 && 'error'} defaultValue={''} ref={register} />
						{ errors.loyerMensuelm2 ? errors.loyerMensuelm2.type === 'typeError' ? <span className='danger'>Merci de saisir un nombre.</span> : <span className='danger'>Ce champ est requis.</span> : ''}
					</div>
				</div>
				<div style={{ border: '2px solid #ffff' }}>
					<div>
						<label>Loyer (€)</label>
						<input name="loyer" className={errors.loyer && 'error'} defaultValue={''} ref={register} />
						{ errors.loyer ? errors.loyer.type === 'typeError' ? <span className='danger'>Merci de saisir un nombre.</span> : <span className='danger'>Ce champ est requis.</span> : ''}
					</div>
					<div>
						<label>Electricité (€)</label>
						<input name="electricite" className={errors.electricite && 'error'} defaultValue={''} ref={register} />
						{ errors.electricite ? errors.electricite.type === 'typeError' ? <span className='danger'>Merci de saisir un nombre.</span> : <span className='danger'>Ce champ est requis.</span> : ''}
					</div>
					<div>
						<label>Eau (€)</label>
						<input name="eau" className={errors.eau && 'error'} defaultValue={''} ref={register} />
						{ errors.eau ? errors.eau.type === 'typeError' ? <span className='danger'>Merci de saisir un nombre.</span> : <span className='danger'>Ce champ est requis.</span> : ''}
					</div>
					<div>
						<label>Fournitures administratives (€)</label>
						<input name="fournAdmin" className={errors.fournAdmin && 'error'} defaultValue={''} ref={register} />
						{ errors.fournAdmin ? errors.fournAdmin.type === 'typeError' ? <span className='danger'>Merci de saisir un nombre.</span> : <span className='danger'>Ce champ est requis.</span> : ''}
					</div>
					<div>
						<label>Fournitures entretien (€)</label>
						<input name="fournEntr" className={errors.fournEntr && 'error'} defaultValue={''} ref={register} />
						{ errors.fournEntr ? errors.fournEntr.type === 'typeError' ? <span className='danger'>Merci de saisir un nombre.</span> : <span className='danger'>Ce champ est requis.</span> : ''}
					</div>
					<div>
						<label>Ménage/entretien et réparations (€)</label>
						<input name="menage" className={errors.menage && 'error'} defaultValue={''} ref={register} />
						{ errors.menage ? errors.menage.type === 'typeError' ? <span className='danger'>Merci de saisir un nombre.</span> : <span className='danger'>Ce champ est requis.</span> : ''}
					</div>
					<div>
						<label>Assurance (€)</label>
						<input name="assurance" className={errors.assurance && 'error'} defaultValue={''} ref={register} />
						{ errors.assurance ? errors.assurance.type === 'typeError' ? <span className='danger'>Merci de saisir un nombre.</span> : <span className='danger'>Ce champ est requis.</span> : ''}
					</div>
					<div>
						<label>Honoraires (€)</label>
						<input name="honoraires" className={errors.honoraires && 'error'} defaultValue={''} ref={register} />
						{ errors.honoraires ? errors.honoraires.type === 'typeError' ? <span className='danger'>Merci de saisir un nombre.</span> : <span className='danger'>Ce champ est requis.</span> : ''}
					</div>
					<div>
						<label>Annonces et insertions (€)</label>
						<input name="annoncesInsertions" className={errors.annoncesInsertions && 'error'} defaultValue={''} ref={register} />
						{ errors.annoncesInsertions ? errors.annoncesInsertions.type === 'typeError' ? <span className='danger'>Merci de saisir un nombre.</span> : <span className='danger'>Ce champ est requis.</span> : ''}
					</div>
					<div>
						<label>Frais postaux (€)</label>
						<input name="fraisPostaux" className={errors.fraisPostaux && 'error'} defaultValue={''} ref={register} />
						{ errors.fraisPostaux ? errors.fraisPostaux.type === 'typeError' ? <span className='danger'>Merci de saisir un nombre.</span> : <span className='danger'>Ce champ est requis.</span> : ''}
					</div>
					<div>
						<label>Internet et téléphone (€)</label>
						<input name="internetTelephone" className={errors.internetTelephone && 'error'} defaultValue={''} ref={register} />
						{ errors.internetTelephone ? errors.internetTelephone.type === 'typeError' ? <span className='danger'>Merci de saisir un nombre.</span> : <span className='danger'>Ce champ est requis.</span> : ''}
					</div>
					<div>
						<label>Frais bancaires (€)</label>
						<input name="fraisBancaires" className={errors.fraisBancaires && 'error'} defaultValue={''} ref={register} />
						{ errors.fraisBancaires ? errors.fraisBancaires.type === 'typeError' ? <span className='danger'>Merci de saisir un nombre.</span> : <span className='danger'>Ce champ est requis.</span> : ''}
					</div>
					<div>
						<label>CFE (€)</label>
						<input name="cfe" className={errors.cfe && 'error'} defaultValue={''} ref={register} />
						{ errors.cfe ? errors.cfe.type === 'typeError' ? <span className='danger'>Merci de saisir un nombre.</span> : <span className='danger'>Ce champ est requis.</span> : ''}
					</div>
					<div>
						<label>Reception/déplacement (€)</label>
						<input name="receptionDeplacement" className={errors.receptionDeplacement && 'error'} defaultValue={''} ref={register} />
						{ errors.receptionDeplacement ? errors.receptionDeplacement.type === 'typeError' ? <span className='danger'>Merci de saisir un nombre.</span> : <span className='danger'>Ce champ est requis.</span> : ''}
					</div>
					<div>
						<label>Petit équipement (€)</label>
						<input name="petitEquipement" className={errors.petitEquipement && 'error'} defaultValue={''} ref={register} />
						{ errors.petitEquipement ? errors.petitEquipement.type === 'typeError' ? <span className='danger'>Merci de saisir un nombre.</span> : <span className='danger'>Ce champ est requis.</span> : ''}
					</div>
				</div>
				<div className=''>
					<button type="submit" form='declaration-page-form' value=''>Valider</button>
				</div>
			</form>
		</div>
	)
}
