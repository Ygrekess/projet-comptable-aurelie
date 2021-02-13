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

const calculRepartitionCharge = (
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
      return (chargeTotale / nombrePrat).toFixed(2);
    case "recettes":
      return (
        (chargeTotale * recettesAnnuellesPrat) /
        totalRecettesAnnuelles
      ).toFixed(2);
    case "coefSurface":
      return (chargeTotale * coefSurfaceL).toFixed(2);
    case "ponderation":
      const ponde =
        Number(fixe) +
        (chargeTotale - Number(fixe) * nombrePrat) *
          (1 / (1 + 1)) *
          coefSurfaceC +
        (chargeTotale - Number(fixe) * nombrePrat) *
          (1 / (1 + 1)) *
          (recettesAnnuellesPrat / totalRecettesAnnuelles);
      return ponde.toFixed(2);
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

export { repartitionName, calculRepartitionCharge, formatDate };
