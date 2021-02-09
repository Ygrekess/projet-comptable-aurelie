import React from 'react';
import { useForm } from "react-hook-form";
import { IoMdArrowRoundBack } from 'react-icons/io'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Link } from 'react-router-dom';
import '../4-css/Declaration_Page.css'

export default function Declaration_Page(props) {

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

	const timeElapsed = Date.now();
	const today = new Date(timeElapsed);
	
	return (
		<div className='declaration-page'>
			<div className='declaration-page-header'>
				<Link to={'#'} onClick={() => props.history.goBack()}><IoMdArrowRoundBack className='arrow-back' size={40}/></Link>
				<h1>Charges mensuelles</h1>
			</div>
			<form id='declaration-page-form' className='declaration-page-form' onSubmit={handleSubmit(onSubmit)}>
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
			</form>
			<div className='declaration-page-footer'>
				<h6>{today.toLocaleDateString()}</h6>
				<button type="submit" form='declaration-page-form' value=''>Valider</button>
			</div>
		</div>
	)
}
