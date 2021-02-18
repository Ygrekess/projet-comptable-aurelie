const repartitionName = (repartition) => {
  switch (repartition) {
    case "partsEgales":
      return "Parts égales";
    case "surfacePropre":
      return "Surface propre";
    case "bailleur":
      return "100% bailleur";
    case "recettes":
      return "% Recettes";
    case "coefSurface":
      return "Coef. surface";
    case "ponderation":
      return "Pondération";
    case "libre":
      return "Libre";
    case "mg":
      return "100% MG";
    default:
      break;
  }
};

const calculRepartitionSurface = (
  repartition = null,
  surfaceCommuns = null,
  surfacePropreProf = null,
  surfacePropreTotal = null,
  recettesAnnuellesPrat = null,
  recettesAnnuellesTotal = null,
  totalPrat = null,
  nombrePrat = null
) => {
  /*   console.log(
    repartition,
    surfaceCommuns,
    surfacePropreProf,
    surfacePropreTotal,
    recettesAnnuellesPrat,
    recettesAnnuellesTotal,
    totalPrat,
    nombrePrat
  ); */
  switch (repartition) {
    case "partsEgales":
      const partEgales = (surfaceCommuns / totalPrat) * nombrePrat;
      return partEgales.toFixed(2);
    case "surfacePropre":
      const surfacePropre =
        (surfacePropreProf / surfacePropreTotal) * surfaceCommuns;
      return surfacePropre.toFixed(2);
    case "recettes":
      const recettes =
        ((recettesAnnuellesPrat * nombrePrat) / recettesAnnuellesTotal) *
        surfaceCommuns;
      return recettes.toFixed(2);
    default:
      return "Erreur";
  }
};

const calculRepartitionSurfaceNonRep = (
  repartition = null,
  surfaceCommunsProf = null,
  surfacePropreProf = null,
  surfaceProfNonRep = null,
  surfaceTotale = null,
  recettesAnnuellesPrat = null,
  recettesAnnuellesTotal = null,
  totalPrat = null,
  pratName = null,
  nombrePrat = null
) => {
  switch (repartition) {
    case "partsEgales":
      const partEgales = (surfaceProfNonRep / totalPrat) * nombrePrat;
      return partEgales.toFixed(2);
    case "surfacePropre":
      const surfacePropre =
        nombrePrat === 0
          ? 0
          : ((surfacePropreProf + surfaceCommunsProf) /
              (surfaceTotale - surfaceProfNonRep)) *
            surfaceProfNonRep;
      return surfacePropre.toFixed(2);
    case "recettes":
      const recettes =
        ((recettesAnnuellesPrat * nombrePrat) / recettesAnnuellesTotal) *
        surfaceProfNonRep;
      return recettes.toFixed(2);
    case "bailleur":
      return 0;
    case "mg":
      const mg =
        pratName === "Médecin"
          ? (surfaceProfNonRep * nombrePrat) / nombrePrat
          : 0;
      return mg.toFixed(2);
    default:
      return "Erreur";
  }
};

const calculRepartitionCharge = (
  chargeName,
  repartition,
  chargeTotale,
  fixe = null,
  nombrePrat,
  recettesAnnuellesPrat,
  totalRecettesAnnuelles,
  coefSurfaceL = null,
  coefSurfaceC = null
) => {
  switch (repartition) {
    case "partsEgales":
      return Number(chargeTotale / nombrePrat).toFixed(2);
    case "recettes":
      return Number(
        (chargeTotale * recettesAnnuellesPrat) / totalRecettesAnnuelles
      ).toFixed(2);
    case "coefSurface":
      return Number(
        chargeTotale * (chargeName !== "Loyer" ? coefSurfaceC : coefSurfaceL)
      ).toFixed(2); /* (chargeName !== "Loyer" ? coefSurfaceC : coefSurfaceL) */
    case "ponderation":
      const ponde =
        Number(fixe) +
        (chargeTotale - Number(fixe) * nombrePrat) *
          (1 / (1 + 1)) *
          coefSurfaceC +
        (chargeTotale - Number(fixe) * nombrePrat) *
          (1 / (1 + 1)) *
          (recettesAnnuellesPrat / totalRecettesAnnuelles);
      return Number(ponde).toFixed(2);
    default:
      break;
  }
};

const calculRepartitionSalaire = (
  totalSalaire = null,
  repartition,
  nombreTotalPrat = null,
  fixe = null,
  recettesAnnuellesPrat = null,
  totalRecettesAnnuelles = null,
  nombreHeuresSalarie = null,
  totalHeuresSalarie = null,
  coefSurfaceC = null
) => {
  switch (repartition) {
    case "partsEgales":
      return (totalSalaire / nombreTotalPrat).toFixed(2);
    case "ponderation":
      const ponde =
        Number(fixe) +
        (totalSalaire - Number(fixe) * nombreTotalPrat) *
          (1 / (1 + 1)) *
          coefSurfaceC +
        (totalSalaire - Number(fixe) * nombreTotalPrat) *
          (1 / (1 + 1)) *
          (recettesAnnuellesPrat / totalRecettesAnnuelles);
      return Number(ponde).toFixed(2);
    case "coefSurface":
      return Number(totalSalaire * coefSurfaceC).toFixed(2);
    case "recettes":
      return Number(
        (totalSalaire * recettesAnnuellesPrat) / totalRecettesAnnuelles
      ).toFixed(2);
    case "libre":
      return Number(
        (totalSalaire * nombreHeuresSalarie * 52) / totalHeuresSalarie
      ).toFixed(2);
    default:
      break;
  }
};

const calculRepartitionTaxeSalaire = (
  totalTaxe = null,
  repartition,
  nombreTotalPrat = null,
  fixe = null,
  recettesAnnuellesPrat = null,
  totalRecettesAnnuelles = null,
  nombreHeuresSalarie = null,
  totalHeuresSalarie = null,
  coefSurfaceC = null
) => {
  switch (repartition) {
    case "partsEgales":
      return (totalTaxe / nombreTotalPrat).toFixed(2);
    case "ponderation":
      const ponde =
        Number(fixe) +
        (totalTaxe - Number(fixe) * nombreTotalPrat) *
          (1 / (1 + 1)) *
          coefSurfaceC +
        (totalTaxe - Number(fixe) * nombreTotalPrat) *
          (1 / (1 + 1)) *
          (recettesAnnuellesPrat / totalRecettesAnnuelles);
      return Number(ponde).toFixed(2);
    case "coefSurface":
      return Number(totalTaxe * coefSurfaceC).toFixed(2);
    case "recettes":
      return Number(
        (totalTaxe * recettesAnnuellesPrat) / totalRecettesAnnuelles
      ).toFixed(2);
    case "libre":
      return Number(
        (totalTaxe * nombreHeuresSalarie * 52) / totalHeuresSalarie
      ).toFixed(2);
    default:
      break;
  }
};

const calculRepartitionRefSisa = (
  totalRefSisa = null,
  repartition,
  nombreTotalPrat = null,
  fixe = null,
  recettesAnnuellesPrat = null,
  totalRecettesAnnuelles = null,
  nombreHeuresSalarie = null,
  totalHeuresSalarie = null,
  coefSurfaceC = null
) => {
  console.log(
    totalRefSisa,
    repartition,
    nombreTotalPrat,
    fixe,
    recettesAnnuellesPrat,
    totalRecettesAnnuelles,
    (nombreHeuresSalarie = null),
    (totalHeuresSalarie = null),
    coefSurfaceC
  );
  switch (repartition) {
    case "partsEgales":
      return (totalRefSisa / nombreTotalPrat).toFixed(2);
    case "ponderation":
      const ponde =
        Number(fixe) +
        (totalRefSisa - Number(fixe) * nombreTotalPrat) *
          (1 / (1 + 1)) *
          coefSurfaceC +
        (totalRefSisa - Number(fixe) * nombreTotalPrat) *
          (1 / (1 + 1)) *
          (recettesAnnuellesPrat / totalRecettesAnnuelles);
      return Number(ponde).toFixed(2);
    case "coefSurface":
      return Number(totalRefSisa * coefSurfaceC).toFixed(2);
    case "recettes":
      return Number(
        (totalRefSisa * recettesAnnuellesPrat) / totalRecettesAnnuelles
      ).toFixed(2);
    default:
      break;
  }
};

const formatDate = (date) => {
  const dateT = date.split("T")[0];
  const day =
    dateT.split("-")[2] + "-" + dateT.split("-")[1] + "-" + dateT.split("-")[0];
  return day;
};

export {
  repartitionName,
  calculRepartitionCharge,
  calculRepartitionSurface,
  calculRepartitionSurfaceNonRep,
  calculRepartitionSalaire,
  calculRepartitionTaxeSalaire,
  calculRepartitionRefSisa,
  formatDate,
};
