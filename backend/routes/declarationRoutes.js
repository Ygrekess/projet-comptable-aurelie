import express from "express";
import Declaration from "../models/Declarations.js";
const router = express.Router();

router.get("/all/:poleId", async (req, res) => {
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
    const declaration = await Declaration.findById(req.params.id);
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
    loyer: {
      total: req.body.declaration.loyer.total,
      repartition: req.body.declaration.loyer.repartition,
    },
    electricite: {
      total: req.body.declaration.electricite.total,
      repartition: req.body.declaration.electricite.repartition,
    },
    eau: {
      total: req.body.declaration.eau.total,
      repartition: req.body.declaration.eau.repartition,
    },
    fournAdmin: {
      total: req.body.declaration.fournAdmin.total,
      repartition: req.body.declaration.fournAdmin.repartition,
    },
    fournEntr: {
      total: req.body.declaration.fournEntr.total,
      repartition: req.body.declaration.fournEntr.repartition,
    },
    menage: {
      total: req.body.declaration.menage.total,
      repartition: req.body.declaration.menage.repartition,
    },
    assurance: {
      total: req.body.declaration.assurance.total,
      repartition: req.body.declaration.assurance.repartition,
    },
    honoraires: {
      total: req.body.declaration.honoraires.total,
      repartition: req.body.declaration.honoraires.repartition,
    },
    annoncesInsertions: {
      total: req.body.declaration.annoncesInsertions.total,
      repartition: req.body.declaration.annoncesInsertions.repartition,
    },
    fraisPostaux: {
      total: req.body.declaration.fraisPostaux.total,
      repartition: req.body.declaration.fraisPostaux.repartition,
    },
    internetTelephone: {
      total: req.body.declaration.internetTelephone.total,
      repartition: req.body.declaration.internetTelephone.repartition,
    },
    fraisBancaires: {
      total: req.body.declaration.fraisBancaires.total,
      repartition: req.body.declaration.fraisBancaires.repartition,
    },
    cfe: {
      total: req.body.declaration.cfe.total,
      repartition: req.body.declaration.cfe.repartition,
    },
    receptionDeplacement: {
      total: req.body.declaration.receptionDeplacement.total,
      repartition: req.body.declaration.receptionDeplacement.repartition,
    },
    petitEquipement: {
      total: req.body.declaration.petitEquipement.total,
      repartition: req.body.declaration.petitEquipement.repartition,
    },
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
  try {
    const declaration = await Declaration.findById(req.params.id);
    declaration.pole = req.body.pole;
    declaration.loyer = {
      total: req.body.loyer.total,
      repartition: req.body.loyer.repartition,
    };
    declaration.electricite = {
      total: req.body.electricite.total,
      repartition: req.body.electricite.repartition,
    };
    declaration.eau = {
      total: req.body.eau.total,
      repartition: req.body.eau.repartition,
    };
    declaration.fournAdmin = {
      total: req.body.fournAdmin.total,
      repartition: req.body.fournAdmin.repartition,
    };
    declaration.fournEntr = {
      total: req.body.fournEntr.total,
      repartition: req.body.fournEntr.repartition,
    };
    declaration.menage = {
      total: req.body.menage.total,
      repartition: req.body.menage.repartition,
    };
    declaration.assurance = {
      total: req.body.assurance.total,
      repartition: req.body.assurance.repartition,
    };
    declaration.honoraires = {
      total: req.body.honoraires.total,
      repartition: req.body.honoraires.repartition,
    };
    declaration.annoncesInsertions = {
      total: req.body.annoncesInsertions.total,
      repartition: req.body.annoncesInsertions.repartition,
    };
    declaration.fraisPostaux = {
      total: req.body.fraisPostaux.total,
      repartition: req.body.fraisPostaux.repartition,
    };
    declaration.internetTelephone = {
      total: req.body.internetTelephone.total,
      repartition: req.body.internetTelephone.repartition,
    };
    declaration.fraisBancaires = {
      total: req.body.fraisBancaires.total,
      repartition: req.body.fraisBancaires.repartition,
    };
    declaration.cfe = {
      total: req.body.cfe.total,
      repartition: req.body.cfe.repartition,
    };
    declaration.receptionDeplacement = {
      total: req.body.receptionDeplacement.total,
      repartition: req.body.receptionDeplacement.repartition,
    };
    declaration.petitEquipement = {
      total: req.body.petitEquipement.total,
      repartition: req.body.petitEquipement.repartition,
    };

    const updatedDeclaration = declaration.save();
    res.status(200).send(updatedDeclaration);
  } catch (error) {
    res.status(400).send({
      message: "Erreur lors de la modification de la déclaration.",
    });
  }
});

export default router;
