import Joi from 'joi';

const registerValidation = (data) => {
	const schemaRegister = Joi.object(
		{
			name: Joi.string()
				.min(6)
				.required()
				.messages({
					"string.base": `Merci de saisir un nom valide.`,
					"string.empty": `Merci de saisir un nom.`,
					"string.min": `Votre nom doit contenir au moins 6 caractères.`,
					"any.required": `Merci de saisir un nom.`
				}),
			email: Joi.string()
				.required()
				.email()
				.messages({
					"string.base": `Merci de saisir une adresse email valide.`,
					"string.empty": `Merci de saisir votre adresse email.`,
					"string.email": `Merci de saisir une adresse email valide.`,
					"any.required": `Merci de saisir votre adresse email.`
				}),
			password: Joi.string()
				.min(6)
				.required()
				.messages({
					"string.empty": `Merci de saisir un mot de passe.`,
					"string.min": `Votre mot de passe doit contenir au moins 6 caractères.`,
					"any.required": `Merci de saisir un mot de passe.`
				}),
		}
	)
	return schemaRegister.validate(data)
}

const loginValidation = (data) => {
	const schemaRegister = Joi.object(
		{
			email: Joi.string()
				.required()
				.email()
				.messages({
					"string.empty": `Merci de saisir votre adresse email.`,
					"string.base": `Merci de saisir une adresse email valide.`,
					"string.email": `Merci de saisir une adresse email valide.`,
					"any.required": `Merci de saisir votre adresse email.`
				}),
			password: Joi.string()
				.min(6)
				.required()
				.messages({
					"string.empty": `Merci de saisir votre mot de passe.`,
					"string.min": `Votre mot de passe doit contenir au moins 6 caractères.`,
					"any.required": `Merci de saisir votre mot de passe.`
				}),
		}
	)
	return schemaRegister.validate(data)
}

export { registerValidation, loginValidation };