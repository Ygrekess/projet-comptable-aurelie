import mongoose from 'mongoose';

/* const chargesMensPraticien = {
	loyer: {
		repartition: { type: String, required: true },
		montant: { type: Number, required: true }
	},
	electricite: {
		repartition: { type: String, required: true },
		montant: { type: Number, required: true }
	},
	eau: {
		repartition: { type: String, required: true },
		montant: { type: Number, required: true }
	},
	fournAdmin: {
		repartition: { type: String, required: true },
		montant: { type: Number, required: true }
	},
	fournEntr: {
		repartition: { type: String, required: true },
		montant: { type: Number, required: true }
	},
	menage: {
		repartition: { type: String, required: true },
		montant: { type: Number, required: true }
	},
	assurance: {
		repartition: { type: String, required: true },
		montant: { type: Number, required: true }
	},
	honoraires: {
		repartition: { type: String, required: true },
		montant: { type: Number, required: true }
	},
	annoncesInsertions: {
		repartition: { type: String, required: true },
		montant: { type: Number, required: true }
	},
	fraisPostaux: {
		repartition: { type: String, required: true },
		montant: { type: Number, required: true }
	},
	internetTelephone: {
		repartition: { type: String, required: true },
		montant: { type: Number, required: true }
	},
	fraisBancaires: {
		repartition: { type: String, required: true },
		montant: { type: Number, required: true }
	},
	cfe: {
		repartition: { type: String, required: true },
		montant: { type: Number, required: true }
	},
	receptionDeplacement: {
		repartition: { type: String, required: true },
		montant: { type: Number, required: true }
	},
	fraisFonctMensuel: {
		repartition: { type: String, required: true },
		montant: { type: Number, required: true }
	},
	petitEquipement: {
		repartition: { type: String, required: true },
		montant: { type: Number, required: true }
	}
}; */

const poleSanteSchema = new mongoose.Schema({
	name: { type: String, required: true },
	address: { type: String, required: true },
	postalCode: { type: Number, required: true },
	city: { type: String, required: true },
/* 	specialites: [specialiteSchema],
	chargesMensuelles: chargesMensPole,
 */	surfaceTotale: { type: Number, required: true },
	loyerAnnuel: { type: Number, required: true },
	loyerMensuelm2: { type: Number },
	date: {
		type: Date,
		default: Date.now
	}
});


const poleSanteModel = mongoose.model('poleSante', poleSanteSchema);
export default poleSanteModel;