import mongoose from "mongoose";

const declarationSchema = new mongoose.Schema({
  pole: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "poleSante",
    required: true,
  },
  loyer: {
    total: { type: Number, required: false },
    repartition: { type: String, required: false },
  },
  electricite: {
    total: { type: Number, required: false },
    repartition: { type: String, required: false },
  },
  eau: {
    total: { type: Number, required: false },
    repartition: { type: String, required: false },
  },
  fournAdmin: {
    total: { type: Number, required: false },
    repartition: { type: String, required: false },
  },
  fournEntr: {
    total: { type: Number, required: false },
    repartition: { type: String, required: false },
  },
  menage: {
    total: { type: Number, required: false },
    repartition: { type: String, required: false },
  },
  assurance: {
    total: { type: Number, required: false },
    repartition: { type: String, required: false },
  },
  honoraires: {
    total: { type: Number, required: false },
    repartition: { type: String, required: false },
  },
  annoncesInsertions: {
    total: { type: Number, required: false },
    repartition: { type: String, required: false },
  },
  fraisPostaux: {
    total: { type: Number, required: false },
    repartition: { type: String, required: false },
  },
  internetTelephone: {
    total: { type: Number, required: false },
    repartition: { type: String, required: false },
  },
  fraisBancaires: {
    total: { type: Number, required: false },
    repartition: { type: String, required: false },
  },
  cfe: {
    total: { type: Number, required: false },
    repartition: { type: String, required: false },
  },
  receptionDeplacement: {
    total: { type: Number, required: false },
    repartition: { type: String, required: false },
  },
  petitEquipement: {
    total: { type: Number, required: false },
    repartition: { type: String, required: false },
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const declarationModel = mongoose.model("declaration", declarationSchema);
export default declarationModel;
