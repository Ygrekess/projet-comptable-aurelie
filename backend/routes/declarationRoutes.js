import express from "express";
import Declaration from "../models/Declarations.js";
const router = express.Router();

router.get("/all/:poleId", async (req, res) => {
  console.log(req.params);
  try {
    const declarations = await Declaration.find({ pole: req.params.poleId });
    res.status(200).send(declarations);
  } catch (error) {
    res.status(400).send({
      message:
        "Erreur lors de la récupération des déclarations. Veuillez réessayer.",
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const declaration = await Declaration.findById(req.body.id);
    res.status(200).send(declaration);
  } catch (error) {
    res.status(400).send({
      message:
        "Erreur lors de la récupération de la déclaration. Veuillez réessayer.",
    });
  }
});

router.post("/", async (req, res) => {
  const declaration = new Declaration({
    pole: req.body.poleId,
    loyer: req.body.declaration.loyer,
    electricite: req.body.declaration.electricite,
    eau: req.body.declaration.eau,
    fournAdmin: req.body.declaration.fournAdmin,
    fournEntr: req.body.declaration.fournEntr,
    menage: req.body.declaration.menage,
    assurance: req.body.declaration.assurance,
    honoraires: req.body.declaration.honoraires,
    annoncesInsertions: req.body.declaration.annoncesInsertions,
    fraisPostaux: req.body.declaration.fraisPostaux,
    internetTelephone: req.body.declaration.internetTelephone,
    fraisBancaires: req.body.declaration.fraisBancaires,
    cfe: req.body.declaration.cfe,
    receptionDeplacement: req.body.declaration.receptionDeplacement,
    petitEquipement: req.body.declaration.petitEquipement,
  });
  try {
    const savedDeclaration = await declaration.save();
    res.status(200).send(savedDeclaration);
  } catch (error) {
    res.status(400).send({
      message: "Erreur lors de la sauvegarde de la déclaration.",
    });
  }
});

router.put("/:id", async (req, res) => {
  console.log(req.body);
  try {
    const declaration = await Declaration.findById(req.params.id);
    console.log(declaration);
    declaration.pole = req.body.pole;
    declaration.loyer = req.body.loyer;
    declaration.electricite = req.body.electricite;
    declaration.eau = req.body.eau;
    declaration.fournAdmin = req.body.fournAdmin;
    declaration.fournEntr = req.body.fournEntr;
    declaration.menage = req.body.menage;
    declaration.assurance = req.body.assurance;
    declaration.honoraires = req.body.honoraires;
    declaration.annoncesInsertions = req.body.annoncesInsertions;
    declaration.fraisPostaux = req.body.fraisPostaux;
    declaration.internetTelephone = req.body.internetTelephone;
    declaration.fraisBancaires = req.body.fraisBancaires;
    declaration.cfe = req.body.cfe;
    declaration.receptionDeplacement = req.body.receptionDeplacement;
    declaration.petitEquipement = req.body.petitEquipement;

    const updatedDeclaration = declaration.save();
    res.status(200).send(updatedDeclaration);
  } catch (error) {
    res.status(400).send({
      message: "Erreur lors de la modification de la déclaration.",
    });
  }
});

export default router;
