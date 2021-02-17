import express from "express";
import PoleSante from "../models/PoleSante.js";
import { poleValidation } from "../utils/validation.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const poles = await PoleSante.find();
    res.status(200).send(poles);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const pole = await PoleSante.findById(req.params.id);
    res.status(200).send(pole);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/ajouter", async (req, res) => {
  const { error } = poleValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const poleSante = new PoleSante({
    name: req.body.name,
    address: req.body.address,
    postalCode: req.body.postalCode,
    city: req.body.city,
    surfaceTotale: req.body.surfaceTotale,
    surfaceCommuns: req.body.surfaceCommuns,
    repartitionSurfCommuns: req.body.repartitionSurfCommuns,
    surfaceProfNonRepr: req.body.surfaceProfNonRepr,
    repartitionSurfaceProfNonRepr: req.body.repartitionSurfaceProfNonRepr,
    loyerAnnuel: req.body.loyerAnnuel,
    loyerMensuelm2: req.body.loyerMensuelm2,
    salaire: req.body.salaire,
    chargesSociales: req.body.chargesSociales,
    repartitionSalaire: req.body.repartitionSalaire,
    repartitionTaxeSalaires: req.body.repartitionTaxeSalaires,
    repartitionRefChargeSisa: req.body.repartitionRefChargeSisa,
  });
  try {
    const savedPole = await poleSante.save();
    res.status(200).send(savedPole);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.put("/update/:id", async (req, res) => {
  const { error } = poleValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  try {
    const pole = await PoleSante.findById(req.params.id);

    pole.name = req.body.name;
    pole.address = req.body.address;
    pole.postalCode = req.body.postalCode;
    pole.city = req.body.city;
    pole.surfaceTotale = req.body.surfaceTotale;
    pole.surfaceCommuns = req.body.surfaceCommuns;
    pole.repartitionSurfCommuns = req.body.repartitionSurfCommuns;
    pole.surfaceProfNonRepr = req.body.surfaceProfNonRepr;
    pole.repartitionSurfaceProfNonRepr = req.body.repartitionSurfaceProfNonRepr;
    pole.loyerAnnuel = req.body.loyerAnnuel;
    pole.loyerMensuelm2 = req.body.loyerMensuelm2;
    pole.salaire = req.body.salaire;
    pole.chargesSociales = req.body.chargesSociales;
    pole.repartitionSalaire = req.body.repartitionSalaire;
    pole.repartitionTaxeSalaires = req.body.repartitionTaxeSalaires;
    pole.repartitionRefChargeSisa = req.body.repartitionRefChargeSisa;

    const updatedPole = await pole.save();
    res.status(200).send(updatedPole);
  } catch (error) {
    res.status(400).send(error);
  }
});

export default router;
