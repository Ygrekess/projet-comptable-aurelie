import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
	loyer: {
		type: Number,
		required: true,
	},
	electricite: {
		type: Number,
		required: true,
	},
	eau: {
		type: Number,
		required: true,
	},
	fournAdmin: {
		type: Number,
		required: true,
	},
	fournEntr: {
		type: Number,
		required: true,
	},
	menage: {
		type: Number,
		required: true,
	},
	assurance: {
		type: Number,
		required: true,
	},
	honoraires: {
		type: Number,
		required: true,
	},
	annoncesInsertions: {
		type: Number,
		required: true,
	},
	fraisPostaux: {
		type: Number,
		required: true,
	},
	internetTelephone: {
		type: Number,
		required: true,
	},
	fraisBancaires: {
		type: Number,
		required: true,
	},
	cfe: {
		type: Number,
		required: true,
	},
	receptionDeplacement: {
		type: Number,
		required: true,
	},
	petitEquipement: {
		type: Date,
		default: Date.now
	}
});

const userModel = mongoose.model('users', userSchema);
export default userModel;