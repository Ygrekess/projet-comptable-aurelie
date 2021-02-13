import mongoose from "mongoose";

const specialiteSchema = new mongoose.Schema({
  pole: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "poleSante",
    required: true,
  },
  name: { type: String, required: true },
  honoraires: { type: Number, required: true },
  nombre: { type: Number, required: true },
  surfPropreProf: { type: Number, required: true },
  surfCommuns: { type: Number, required: true },
  surfPraticien: { type: Number, required: true },
  coefSurfPraticienLoyer: { type: Number, required: true },
  coefSurfPraticienAutresCharge: { type: Number, required: true },
  numbSalariesETP: { type: Number, required: true },
  salaireBrut: { type: Number, required: true },
});

const specialiteModel = mongoose.model("specialite", specialiteSchema);
export default specialiteModel;
