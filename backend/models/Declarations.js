import mongoose from "mongoose";

const declarationSchema = new mongoose.Schema({
  pole: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "poleSante",
    required: true,
  },
  loyer: {
    type: Number,
    required: false,
  },
  electricite: {
    type: Number,
    required: false,
  },
  eau: {
    type: Number,
    required: false,
  },
  fournAdmin: {
    type: Number,
    required: false,
  },
  fournEntr: {
    type: Number,
    required: false,
  },
  menage: {
    type: Number,
    required: false,
  },
  assurance: {
    type: Number,
    required: false,
  },
  honoraires: {
    type: Number,
    required: false,
  },
  annoncesInsertions: {
    type: Number,
    required: false,
  },
  fraisPostaux: {
    type: Number,
    required: false,
  },
  internetTelephone: {
    type: Number,
    required: false,
  },
  fraisBancaires: {
    type: Number,
    required: false,
  },
  cfe: {
    type: Number,
    required: false,
  },
  receptionDeplacement: {
    type: Number,
    required: false,
  },
  petitEquipement: {
    type: Number,
    required: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const declarationModel = mongoose.model("declaration", declarationSchema);
export default declarationModel;
