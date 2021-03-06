import Joi from "joi";

const registerValidation = (data) => {
  const schemaRegister = Joi.object({
    lastname: Joi.string().min(6).required().messages({
      "string.base": `Merci de saisir un nom valide.`,
      "string.empty": `Merci de saisir un nom.`,
      "string.min": `Votre nom doit contenir au moins 6 caractères.`,
      "any.required": `Merci de saisir un nom.`,
    }),
    email: Joi.string().required().email().messages({
      "string.base": `Merci de saisir une adresse email valide.`,
      "string.empty": `Merci de saisir votre adresse email.`,
      "string.email": `Merci de saisir une adresse email valide.`,
      "any.required": `Merci de saisir votre adresse email.`,
    }),
    password: Joi.string().min(6).required().messages({
      "string.empty": `Merci de saisir un mot de passe.`,
      "string.min": `Votre mot de passe doit contenir au moins 6 caractères.`,
      "any.required": `Merci de saisir un mot de passe.`,
    }),
  });
  return schemaRegister.validate(data);
};

const updateValidation = (data) => {
  const schemaUpdate = Joi.object({
    _id: Joi.string(),
    lastname: Joi.string(),
    firstname: Joi.string(),
    phone: Joi.string(),
    email: Joi.string().required().email().messages({
      "string.base": `Merci de saisir une adresse email valide.`,
      "string.empty": `Merci de saisir votre adresse email.`,
      "string.email": `Merci de saisir une adresse email valide.`,
      "any.required": `Merci de saisir votre adresse email.`,
    }),
  });
  return schemaUpdate.validate(data);
};

const updatePasswordValidation = (data) => {
  const schemaUpdatePassword = Joi.object({
    _id: Joi.string(),
    password: Joi.string().required().messages({
      "string.empty": `Merci de saisir votre mot de passe.`,
    }),
    newpassword1: Joi.string().min(6).required().messages({
      "string.empty": `Merci de saisir votre nouveau mot de passe.`,
      "string.min": `Votre nouveau mot de passe doit contenir au moins 6 caractères.`,
      "any.required": `Merci de saisir votre nouveau mot de passe.`,
    }),
    newpassword2: Joi.string().min(6).required().messages({
      "string.empty": `Merci de confirmer votre mot de passe.`,
      "string.min": `Votre nouveau mot de passe doit contenir au moins 6 caractères.`,
      "any.required": `Merci de confirmer votre mot de passe.`,
    }),
  });
  return schemaUpdatePassword.validate(data);
};

const loginValidation = (data) => {
  const schemaRegister = Joi.object({
    email: Joi.string().required().email().messages({
      "string.empty": `Merci de saisir votre adresse email.`,
      "string.base": `Merci de saisir une adresse email valide.`,
      "string.email": `Merci de saisir une adresse email valide.`,
      "any.required": `Merci de saisir votre adresse email.`,
    }),
    password: Joi.string().min(6).required().messages({
      "string.empty": `Merci de saisir votre mot de passe.`,
      "string.min": `Votre mot de passe doit contenir au moins 6 caractères.`,
      "any.required": `Merci de saisir votre mot de passe.`,
    }),
  });
  return schemaRegister.validate(data);
};

const poleValidation = (data) => {
  const schemaRegister = Joi.object({
    name: Joi.string().required().messages({
      "string.empty": `Merci de saisir le nom du pôle.`,
      "string.base": `Merci de saisir un nom valide.`,
      "any.required": `Merci de saisir le nom du pôle.`,
    }),
    address: Joi.string().required().messages({
      "string.empty": `Merci de saisir une adresse.`,
      "string.base": `Merci de saisir une adresse valide.`,
      "any.required": `Merci de saisir une adresse.`,
    }),
    postalCode: Joi.number().required().messages({
      "number.empty": `Merci de saisir un code postal.`,
      "number.base": `Merci de saisir un code postal valide.`,
      "any.required": `Merci de saisir un code postal.`,
    }),
    city: Joi.string().required().messages({
      "string.empty": `Merci de saisir une ville.`,
      "string.base": `Merci de saisir un nom de ville cohérent.`,
      "any.required": `Merci de saisir une ville.`,
    }),
    surfaceTotale: Joi.number().required().messages({
      "number.empty": `Merci de saisir la surface totale du pôle.`,
      "number.base": `Merci de saisir une surface totale cohérente.`,
      "any.required": `Merci de saisir la surface totale du pôle.`,
    }),
    surfaceCommuns: Joi.number().required().messages({
      "number.empty": `Merci de saisir la surface communs du pôle.`,
      "number.base": `Merci de saisir une surface communs cohérente.`,
      "any.required": `Merci de saisir la surface communs du pôle.`,
    }),
    repartitionSurfCommuns: Joi.string().required().messages({
      "string.empty": `Merci de saisir la surface ttcommuns du pôle.`,
      "string.base": `Merci de saisir une surface communs cohérente.`,
      "any.required": `Merci de saisir la surface oocommuns du pôle.`,
    }),
    surfaceProfNonRepr: Joi.number().required().messages({
      "number.empty": `Merci de saisir la surface de profession non représentée du pôle.`,
      "number.base": `Merci de saisir une surface de profession non représentée cohérente.`,
      "any.required": `Merci de saisir la surface de profession non représentée du pôle.`,
    }),
    repartitionSurfaceProfNonRepr: Joi.string().required().messages({
      "string.empty": `Merci de saisir la surface de profession non représentée du pôle.`,
      "string.base": `Merci de saisir une surface de profession non représentée cohérente.`,
      "any.required": `Merci de saisir la surface de profession non représentée du pôle.`,
    }),
    repartitionSalaire: Joi.string().required().messages({
      "string.empty": `Merci de saisir la répartition du salaire.`,
      "string.base": `Merci de saisir la répartition du salaire.`,
      "any.required": `Merci de saisir la répartition du salaire.`,
    }),
    repartitionTaxeSalaires: Joi.string().required().messages({
      "string.empty": `Merci de saisir la répartition de taxe sur salaires.`,
      "string.base": `Merci de saisir la répartition de taxe sur salaires.`,
      "any.required": `Merci de saisir la répartition de taxe sur salaires.`,
    }),
    repartitionRefChargeSisa: Joi.string().required().messages({
      "string.empty": `Merci de saisir la refacturation de charges à la SISA.`,
      "string.base": `Merci de saisir la refacturation de charges à la SISA.`,
      "any.required": `Merci de saisir la refacturation de charges à la SISA.`,
    }),
    loyerAnnuel: Joi.number().required().messages({
      "number.empty": `Merci de saisir le loyer annuel du pôle.`,
      "number.base": `Merci de saisir un loyer annuel cohérent.`,
      "any.required": `Merci de saisir le loyer annuel du pôle.`,
    }),
    loyerMensuelm2: Joi.number(),
    salaire: Joi.number().required(),
    chargesSociales: Joi.number().required(),
  });
  return schemaRegister.validate(data);
};

export {
  registerValidation,
  loginValidation,
  poleValidation,
  updateValidation,
  updatePasswordValidation,
};
