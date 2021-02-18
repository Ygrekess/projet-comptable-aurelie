import React, { Fragment, useEffect, useState } from "react";
import {
  calculRepartitionCharge,
  calculRepartitionSalaire,
  calculRepartitionTaxeSalaire,
  calculRepartitionRefSisa,
  repartitionName,
} from "../../utils";

export default function TableChargesMensuellesFonct({
  pole,
  specialites,
  declarationChoosed,
}) {
  /* State globaux */
  const [numbTotalPrat, setNumbTotalPrat] = useState(
    specialites.reduce((totalValue, currentValue, i) => {
      return totalValue + Number(currentValue.nombre);
    }, 0)
  );
  /* Charge fonctionnement state */
  const [loading, setLoading] = useState(true);
  const [loyer, setLoyer] = useState([]);
  const [electricite, setElectricite] = useState([]);
  const [eau, setEau] = useState([]);
  const [fournAdmin, setFournAdmin] = useState([]);
  const [fournEntr, setFournEntr] = useState([]);
  const [menage, setMenage] = useState([]);
  const [assurance, setAssurance] = useState([]);
  const [honoraires, setHonoraires] = useState([]);
  const [annoncesInsertions, setAnnoncesInsertions] = useState([]);
  const [fraisPostaux, setFraisPostaux] = useState([]);
  const [internetTelephone, setInternetTelephone] = useState([]);
  const [fraisBancaires, setFraisBancaires] = useState([]);
  const [cfe, setCfe] = useState([]);
  const [receptionDeplacement, setReceptionDeplacement] = useState([]);
  const [petitEquipement, setPetitEquipement] = useState([]);
  const [allCharges, setAllCharges] = useState([
    {
      title: "Loyer",
      name: loyer,
      repartition: declarationChoosed.loyer.repartition,
      total: declarationChoosed.loyer.total,
      fntState: setLoyer,
    },
    {
      title: "Electricité",
      name: electricite,
      repartition: declarationChoosed.electricite.repartition,
      total: declarationChoosed.electricite.total,
      fntState: setElectricite,
    },
    {
      title: "Eau",
      name: eau,
      repartition: declarationChoosed.eau.repartition,
      total: declarationChoosed.eau.total,
      fntState: setEau,
    },
    {
      title: "Fournitures administratives",
      name: fournAdmin,
      repartition: declarationChoosed.fournAdmin.repartition,
      total: declarationChoosed.fournAdmin.total,
      fntState: setFournAdmin,
    },
    {
      title: "Fournitures entretien",
      name: fournEntr,
      repartition: declarationChoosed.fournEntr.repartition,
      total: declarationChoosed.fournEntr.total,
      fntState: setFournEntr,
    },
    {
      title: "Ménage",
      name: menage,
      repartition: declarationChoosed.menage.repartition,
      total: declarationChoosed.menage.total,
      fntState: setMenage,
    },
    {
      title: "Assurance",
      name: assurance,
      repartition: declarationChoosed.assurance.repartition,
      total: declarationChoosed.assurance.total,
      fntState: setAssurance,
    },
    {
      title: "Honoraires",
      name: honoraires,
      repartition: declarationChoosed.honoraires.repartition,
      total: declarationChoosed.honoraires.total,
      fntState: setHonoraires,
    },
    {
      title: "Annonces insertions",
      name: annoncesInsertions,
      repartition: declarationChoosed.annoncesInsertions.repartition,
      total: declarationChoosed.annoncesInsertions.total,
      fntState: setAnnoncesInsertions,
    },
    {
      title: "Frais postaux",
      name: fraisPostaux,
      repartition: declarationChoosed.fraisPostaux.repartition,
      total: declarationChoosed.fraisPostaux.total,
      fntState: setFraisPostaux,
    },
    {
      title: "Internet/Téléphone",
      name: internetTelephone,
      repartition: declarationChoosed.internetTelephone.repartition,
      total: declarationChoosed.internetTelephone.total,
      fntState: setInternetTelephone,
    },
    {
      title: "Frais bancaires",
      name: fraisBancaires,
      repartition: declarationChoosed.fraisBancaires.repartition,
      total: declarationChoosed.fraisBancaires.total,
      fntState: setFraisBancaires,
    },
    {
      title: "CFE",
      name: cfe,
      repartition: declarationChoosed.cfe.repartition,
      total: declarationChoosed.cfe.total,
      fntState: setCfe,
    },
    {
      title: "Réception/Déplacement",
      name: receptionDeplacement,
      repartition: declarationChoosed.receptionDeplacement.repartition,
      total: declarationChoosed.receptionDeplacement.total,
      fntState: setReceptionDeplacement,
    },
    {
      title: "Petit équipement",
      name: petitEquipement,
      repartition: declarationChoosed.petitEquipement.repartition,
      total: declarationChoosed.petitEquipement.total,
      fntState: setPetitEquipement,
    },
  ]);
  const [totalAnnuel, setTotalAnnuel] = useState(0);

  /* Charge personnel accueil state */

  const [salarieETP, setSalarieETP] = useState(
    (
      specialites.reduce((totalValue, currentValue, i) => {
        return (
          totalValue +
          Number(currentValue.numbSalariesETP) * Number(currentValue.nombre)
        );
      }, 0) / 35
    ).toFixed(2)
  );
  const [totalSalaireBrut, setTotalSalaireBrut] = useState(
    (
      (specialites.reduce((totalValue, currentValue, i) => {
        return (
          totalValue +
          Number(currentValue.numbSalariesETP) * Number(currentValue.nombre)
        );
      }, 0) /
        35) *
      pole.salaire
    ).toFixed(2)
  );
  const [salaireBrut, setSalaireBrut] = useState([]);
  const [taxeSalaireBrut, setTaxeSalaireBrut] = useState([]);
  const [refSisa, setRefSisa] = useState([]);

  const calculCharge = () => {
    for (let key in allCharges) {
      allCharges[key].fntState(
        specialites.map((specialite, i) =>
          calculRepartitionCharge(
            allCharges[key].title,
            allCharges[key].repartition,
            allCharges[key].total,
            (
              (allCharges[key].total /
                specialites.reduce((totalValue, currentValue) => {
                  return totalValue + currentValue.nombre;
                }, 0)) *
              2
            ).toFixed(2),
            specialites.reduce((totalValue, currentValue) => {
              return totalValue + currentValue.nombre;
            }, 0),
            specialite.honoraires,
            specialites.reduce((totalValue, currentValue) => {
              return totalValue + currentValue.honoraires * currentValue.nombre;
            }, 0),
            specialite.coefSurfPraticienLoyer,
            specialite.coefSurfPraticienAutresCharge
          )
        )
      );
    }
    setLoading(false);
  };

  const annuelCharge = () => {
    let annuel = 0;
    for (let k = 0; k < 15; k++) {
      annuel += specialites
        .map(
          (specialite, i) =>
            calculRepartitionCharge(
              allCharges[k].title,
              allCharges[k].repartition,
              allCharges[k].total,
              (
                (allCharges[k].total /
                  specialites.reduce((totalValue, currentValue) => {
                    return totalValue + currentValue.nombre;
                  }, 0)) *
                2
              ).toFixed(2),
              specialites.reduce((totalValue, currentValue) => {
                return totalValue + currentValue.nombre;
              }, 0),
              specialite.honoraires,
              specialites.reduce((totalValue, currentValue) => {
                return (
                  totalValue + currentValue.honoraires * currentValue.nombre
                );
              }, 0),
              specialite.coefSurfPraticienLoyer,
              specialite.coefSurfPraticienAutresCharge
            ) * specialite.nombre
        )
        .reduce((totalValue, currentValue) => {
          return totalValue + Number(currentValue);
        }, 0);

      setTotalAnnuel((annuel * 12).toFixed(2));
    }
  };

  const calculSalaireBrut = () => {
    setSalaireBrut(
      specialites.map((specialite, i) => {
        return calculRepartitionSalaire(
          (
            (specialites.reduce((totalValue, currentValue, i) => {
              return (
                totalValue +
                Number(currentValue.numbSalariesETP) *
                  Number(currentValue.nombre)
              );
            }, 0) /
              35) *
            pole.salaire
          ).toFixed(2),
          pole.repartitionSalaire,
          specialites.reduce((totalValue, currentValue, i) => {
            return totalValue + Number(currentValue.nombre);
          }, 0),
          (
            (
              (specialites.reduce((totalValue, currentValue, i) => {
                return (
                  totalValue +
                  Number(currentValue.numbSalariesETP) *
                    Number(currentValue.nombre)
                );
              }, 0) /
                35) *
              pole.salaire
            ).toFixed(2) /
            specialites.reduce((totalValue, currentValue, i) => {
              return totalValue + Number(currentValue.nombre);
            }, 0)
          ).toFixed(2),
          specialite.honoraires,
          Math.ceil(
            specialites.reduce((totalValue, currentValue) => {
              return totalValue + currentValue.honoraires * currentValue.nombre;
            }, 0)
          ),
          specialite.numbSalariesETP,
          specialites.reduce((totalValue, currentValue, i) => {
            return (
              totalValue +
              Number(currentValue.numbSalariesETP) *
                Number(currentValue.nombre) *
                52
            );
          }, 0),
          specialite.coefSurfPraticienAutresCharge
        );
      })
    );
  };

  const calculTaxeSalaireBrut = () => {
    setTaxeSalaireBrut(
      specialites.map((specialite, i) => {
        return calculRepartitionTaxeSalaire(
          (
            1467.1 *
            (specialites.reduce((totalValue, currentValue, i) => {
              return (
                totalValue +
                Number(currentValue.numbSalariesETP) *
                  Number(currentValue.nombre)
              );
            }, 0) /
              35 /
              12)
          ).toFixed(2),
          pole.repartitionTaxeSalaires,
          specialites.reduce((totalValue, currentValue, i) => {
            return totalValue + Number(currentValue.nombre);
          }, 0),
          (
            (
              (specialites.reduce((totalValue, currentValue, i) => {
                return (
                  totalValue +
                  Number(currentValue.numbSalariesETP) *
                    Number(currentValue.nombre)
                );
              }, 0) /
                35) *
              pole.salaire
            ).toFixed(2) /
            specialites.reduce((totalValue, currentValue, i) => {
              return totalValue + Number(currentValue.nombre);
            }, 0)
          ).toFixed(2),
          specialite.honoraires,
          Math.ceil(
            specialites.reduce((totalValue, currentValue) => {
              return totalValue + currentValue.honoraires * currentValue.nombre;
            }, 0)
          ),
          specialite.numbSalariesETP,
          specialites.reduce((totalValue, currentValue, i) => {
            return (
              totalValue +
              Number(currentValue.numbSalariesETP) *
                Number(currentValue.nombre) *
                52
            );
          }, 0),
          specialite.coefSurfPraticienAutresCharge
        );
      })
    );
  };

  const calculRefSisa = () => {
    setRefSisa(
      specialites.map((specialite, i) => {
        return calculRepartitionRefSisa(
          200 * 12,
          pole.repartitionRefChargeSisa,
          specialites.reduce((totalValue, currentValue, i) => {
            return totalValue + Number(currentValue.nombre);
          }, 0),
          (
            ((200 * 12) /
              specialites.reduce((totalValue, currentValue, i) => {
                return totalValue + Number(currentValue.nombre);
              }, 0)) *
            2
          ).toFixed(2),
          specialite.honoraires,
          Math.ceil(
            specialites.reduce((totalValue, currentValue) => {
              return totalValue + currentValue.honoraires * currentValue.nombre;
            }, 0)
          ),
          specialite.numbSalariesETP,
          specialites.reduce((totalValue, currentValue, i) => {
            return (
              totalValue +
              Number(currentValue.numbSalariesETP) *
                Number(currentValue.nombre) *
                52
            );
          }, 0),
          specialite.coefSurfPraticienAutresCharge
        );
      })
    );
  };

  useEffect(() => {
    if (loading) {
      calculCharge();
    }
    if (!loading) {
      setAllCharges([
        {
          title: "Loyer",
          name: loyer,
          repartition: declarationChoosed.loyer.repartition,
          total: declarationChoosed.loyer.total,
          fntState: setLoyer,
        },
        {
          title: "Electricité",
          name: electricite,
          repartition: declarationChoosed.electricite.repartition,
          total: declarationChoosed.electricite.total,
          fntState: setElectricite,
        },
        {
          title: "Eau",
          name: eau,
          repartition: declarationChoosed.eau.repartition,
          total: declarationChoosed.eau.total,
          fntState: setEau,
        },
        {
          title: "Fournitures administratives",
          name: fournAdmin,
          repartition: declarationChoosed.fournAdmin.repartition,
          total: declarationChoosed.fournAdmin.total,
          fntState: setFournAdmin,
        },
        {
          title: "Fournitures entretien",
          name: fournEntr,
          repartition: declarationChoosed.fournEntr.repartition,
          total: declarationChoosed.fournEntr.total,
          fntState: setFournEntr,
        },
        {
          title: "Ménage",
          name: menage,
          repartition: declarationChoosed.menage.repartition,
          total: declarationChoosed.menage.total,
          fntState: setMenage,
        },
        {
          title: "Assurance",
          name: assurance,
          repartition: declarationChoosed.assurance.repartition,
          total: declarationChoosed.assurance.total,
          fntState: setAssurance,
        },
        {
          title: "Honoraires",
          name: honoraires,
          repartition: declarationChoosed.honoraires.repartition,
          total: declarationChoosed.honoraires.total,
          fntState: setHonoraires,
        },
        {
          title: "Annonces insertions",
          name: annoncesInsertions,
          repartition: declarationChoosed.annoncesInsertions.repartition,
          total: declarationChoosed.annoncesInsertions.total,
          fntState: setAnnoncesInsertions,
        },
        {
          title: "Frais postaux",
          name: fraisPostaux,
          repartition: declarationChoosed.fraisPostaux.repartition,
          total: declarationChoosed.fraisPostaux.total,
          fntState: setFraisPostaux,
        },
        {
          title: "Internet/Téléphone",
          name: internetTelephone,
          repartition: declarationChoosed.internetTelephone.repartition,
          total: declarationChoosed.internetTelephone.total,
          fntState: setInternetTelephone,
        },
        {
          title: "Frais bancaires",
          name: fraisBancaires,
          repartition: declarationChoosed.fraisBancaires.repartition,
          total: declarationChoosed.fraisBancaires.total,
          fntState: setFraisBancaires,
        },
        {
          title: "CFE",
          name: cfe,
          repartition: declarationChoosed.cfe.repartition,
          total: declarationChoosed.cfe.total,
          fntState: setCfe,
        },
        {
          title: "Réception/Déplacement",
          name: receptionDeplacement,
          repartition: declarationChoosed.receptionDeplacement.repartition,
          total: declarationChoosed.receptionDeplacement.total,
          fntState: setReceptionDeplacement,
        },
        {
          title: "Petit équipement",
          name: petitEquipement,
          repartition: declarationChoosed.petitEquipement.repartition,
          total: declarationChoosed.petitEquipement.total,
          fntState: setPetitEquipement,
        },
      ]);
      annuelCharge();
      calculSalaireBrut();
      calculTaxeSalaireBrut();
      calculRefSisa();
    }
    return () => {};
  }, [declarationChoosed, loading]);

  return (
    <Fragment>
      <table border="1">
        <caption> </caption>
        <thead>
          <tr>
            <th className="title">
              Charges mensuelles de fonctionnement par praticien
            </th>
            <th className="">Total</th>
            <th className="">Mode de répartition</th>
            {specialites.map((specialite, i) => (
              <th key={i} className="">
                {specialite.name}
              </th>
            ))}
            <th>Total annuel</th>
            <th>Dont fixe</th>
          </tr>
        </thead>
        <tbody>
          {allCharges.map((charge, i) => (
            <tr key={i}>
              <th> {charge.title} </th>
              <td>{charge.total}</td>
              <td>{repartitionName(charge.repartition)}</td>
              {specialites.map((specialite, i) => (
                <td key={i}>{charge.name[i]}</td>
              ))}
              <td className="total-charge-annuel">
                {(
                  specialites.reduce((totalValue, currentValue, i) => {
                    return totalValue + currentValue.nombre * charge.name[i];
                  }, 0) * 12
                ).toFixed(2)}
              </td>
              <td>
                {charge.repartition === "ponderation"
                  ? (
                      (charge.total /
                        specialites.reduce((totalValue, currentValue) => {
                          return totalValue + currentValue.nombre;
                        }, 0)) *
                      2
                    ).toFixed(2)
                  : ""}
              </td>
            </tr>
          ))}
          <tr>
            <th> Frais de fonctionnement mensuel </th>
            <td>
              {allCharges.reduce((totalValue, currentValue, i) => {
                return totalValue + Number(currentValue.total);
              }, 0)}
            </td>
            <td></td>
            {specialites.map((specialite, i) => (
              <td key={i}>
                {allCharges
                  .reduce((totalValue, currentValue) => {
                    return totalValue + Number(currentValue.name[i]);
                  }, 0)
                  .toFixed(2)}
              </td>
            ))}
            <td>{totalAnnuel}</td>
            <td></td>
          </tr>
        </tbody>
      </table>

      <table border="1">
        <caption> </caption>
        <thead>
          <tr>
            <th className="title">
              Charges mensuelles de personnel accueil et secrétariat par
              praticien
            </th>
            <th className="">Total</th>
            <th className="">Mode de répartition</th>
            {specialites.map((specialite, i) => (
              <th key={i} className="">
                {specialite.name}
              </th>
            ))}
            <th>Total annuel</th>
            <th>Dont fixe</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th> Nombre salariés en ETP </th>
            <td>{salarieETP}</td>
            <td>
              {specialites.reduce((totalValue, currentValue, i) => {
                return (
                  totalValue +
                  Number(currentValue.numbSalariesETP) *
                    Number(currentValue.nombre)
                );
              }, 0) + " heures/semaine à répartir"}
            </td>
            {specialites.map((specialite, i) => (
              <td key={i}>{specialite.numbSalariesETP}</td>
            ))}
            <td>
              {specialites.reduce((totalValue, currentValue, i) => {
                return (
                  totalValue +
                  Number(currentValue.numbSalariesETP) *
                    Number(currentValue.nombre)
                );
              }, 0) * 52}
            </td>
            <td></td>
          </tr>
          <tr>
            <th> Salaire brut </th>
            <td>{totalSalaireBrut}</td>
            <td>{repartitionName(pole.repartitionSalaire)}</td>
            {specialites.map((specialite, i) => (
              <td key={i}>{salaireBrut[i]}</td>
            ))}
            <td>
              {(
                specialites.reduce((totalValue, currentValue, i) => {
                  return (
                    totalValue +
                    Number(currentValue.nombre) * Number(salaireBrut[i])
                  );
                }, 0) * 12
              ).toFixed(2)}
            </td>
            <td>
              {pole.repartitionSalaire === "ponderation"
                ? ((totalSalaireBrut / numbTotalPrat) * 2).toFixed(2)
                : ""}
            </td>
          </tr>
          <tr>
            <th> Charges patronales </th>
            <td>
              {(totalSalaireBrut * (pole.chargesSociales / 100)).toFixed(2)}
            </td>
            <td></td>
            {specialites.map((specialite, i) => (
              <td key={i}>
                {(salaireBrut[i] * (pole.chargesSociales / 100)).toFixed(2)}
              </td>
            ))}
            <td>
              {(
                specialites.reduce((totalValue, currentValue, i) => {
                  return (
                    totalValue +
                    Number(currentValue.nombre) *
                      (Number(salaireBrut[i]) * (pole.chargesSociales / 100))
                  );
                }, 0) * 12
              ).toFixed(2)}
            </td>
            <td></td>
          </tr>
          <tr>
            <th> Taxe sur les salaires </th>
            <td>{(1467.1 * (salarieETP / 12)).toFixed(2)}</td>
            <td>{repartitionName(pole.repartitionTaxeSalaires)}</td>
            {specialites.map((specialite, i) => (
              <td key={i}>{taxeSalaireBrut[i]}</td>
            ))}
            <td>
              {(
                specialites.reduce((totalValue, currentValue, i) => {
                  return (
                    totalValue +
                    Number(currentValue.nombre) * Number(taxeSalaireBrut[i])
                  );
                }, 0) * 12
              ).toFixed(2)}
            </td>
            <td>
              {pole.repartitionTaxeSalaires === "ponderation"
                ? (
                    ((1467.1 * (salarieETP / 12)).toFixed(2) / numbTotalPrat) *
                    2
                  ).toFixed(2)
                : ""}
            </td>
          </tr>
          <tr>
            <th> Coût salarial </th>
            <td>
              {(
                Number(totalSalaireBrut) +
                Number(totalSalaireBrut * (pole.chargesSociales / 100)) +
                Number(1467.1 * (salarieETP / 12))
              ).toFixed(2)}
            </td>
            <td></td>
            {specialites.map((specialite, i) => (
              <td key={i}>
                {(
                  Number(salaireBrut[i]) +
                  Number(salaireBrut[i] * (pole.chargesSociales / 100)) +
                  Number(taxeSalaireBrut[i])
                ).toFixed(2)}
              </td>
            ))}
            <td>
              {(
                specialites.reduce((totalValue, currentValue, i) => {
                  return (
                    totalValue +
                    Number(salaireBrut[i] * currentValue.nombre) +
                    Number(
                      salaireBrut[i] *
                        (pole.chargesSociales / 100) *
                        currentValue.nombre
                    ) +
                    Number(taxeSalaireBrut[i] * currentValue.nombre)
                  );
                }, 0) * 12
              ).toFixed(2)}
            </td>
            <td></td>
          </tr>

          <tr></tr>

          <tr>
            <th> Refacturation charges à la SISA (forfaitaire) </th>
            <td>{200 * 12}</td>
            <td>{repartitionName(pole.repartitionRefChargeSisa)}</td>
            {specialites.map((specialite, i) => (
              <td key={i}>{refSisa[i]}</td>
            ))}
            <td>
              {(
                specialites.reduce((totalValue, currentValue, i) => {
                  return (
                    totalValue +
                    Number(currentValue.nombre) * Number(refSisa[i])
                  );
                }, 0) * 12
              ).toFixed(2)}
            </td>
            <td>
              {pole.repartitionRefChargeSisa === "ponderation"
                ? (
                    ((200 * 12) /
                      specialites.reduce((totalValue, currentValue, i) => {
                        return totalValue + Number(currentValue.nombre);
                      }, 0)) *
                    2
                  ).toFixed(2)
                : ""}
            </td>
          </tr>
        </tbody>
      </table>

      <table border="1">
        <caption> </caption>
        <thead>
          <tr>
            <th className="title"></th>
            <th className="">Total</th>
            <th className="">Mode de répartition</th>
            {specialites.map((specialite, i) => (
              <th key={i} className="">
                {specialite.name}
              </th>
            ))}
            <th>Total annuel</th>
            <th>Dont fixe</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th> Coût total mensuel net </th>
            <td>
              {(
                Number(totalSalaireBrut) +
                Number(totalSalaireBrut * (pole.chargesSociales / 100)) +
                Number(1467.1 * (salarieETP / 12)) +
                allCharges.reduce((totalValue, currentValue, i) => {
                  return totalValue + Number(currentValue.total);
                }, 0)
              ).toFixed(2)}
            </td>
            <td></td>
            {specialites.map((specialite, i) => (
              <td key={i}>
                {Number(
                  allCharges.reduce((totalValue, currentValue) => {
                    return totalValue + Number(currentValue.name[i]);
                  }, 0) +
                    (Number(salaireBrut[i]) +
                      Number(salaireBrut[i] * (pole.chargesSociales / 100)) +
                      Number(taxeSalaireBrut[i])) -
                    refSisa[i]
                ).toFixed(2)}
              </td>
            ))}
            <td>
              {(
                Number(totalAnnuel) +
                Number(
                  specialites.reduce((totalValue, currentValue, i) => {
                    return (
                      totalValue +
                      Number(salaireBrut[i] * currentValue.nombre) +
                      Number(
                        salaireBrut[i] *
                          (pole.chargesSociales / 100) *
                          currentValue.nombre
                      ) +
                      Number(taxeSalaireBrut[i] * currentValue.nombre)
                    );
                  }, 0) * 12
                )
              ).toFixed(2)}
            </td>
            <td></td>
          </tr>
          <tr>
            <th> Coût total annuel net </th>
            <td>
              {(
                (Number(totalSalaireBrut) +
                  Number(totalSalaireBrut * (pole.chargesSociales / 100)) +
                  Number(1467.1 * (salarieETP / 12)) +
                  allCharges.reduce((totalValue, currentValue, i) => {
                    return totalValue + Number(currentValue.total);
                  }, 0)) *
                12
              ).toFixed(2)}
            </td>
            <td></td>
            {specialites.map((specialite, i) => (
              <td key={i}>
                {(
                  (allCharges.reduce((totalValue, currentValue) => {
                    return totalValue + Number(currentValue.name[i]);
                  }, 0) +
                    (Number(salaireBrut[i]) +
                      Number(salaireBrut[i] * (pole.chargesSociales / 100)) +
                      Number(taxeSalaireBrut[i])) -
                    refSisa[i]) *
                  12
                ).toFixed(2)}
              </td>
            ))}
            <td>
              {(
                (Number(totalAnnuel) +
                  Number(
                    specialites.reduce((totalValue, currentValue, i) => {
                      return (
                        totalValue +
                        Number(salaireBrut[i] * currentValue.nombre) +
                        Number(
                          salaireBrut[i] *
                            (pole.chargesSociales / 100) *
                            currentValue.nombre
                        ) +
                        Number(taxeSalaireBrut[i] * currentValue.nombre)
                      );
                    }, 0) * 12
                  )) *
                12
              ).toFixed(2)}
            </td>
            <td></td>
          </tr>
          <tr>
            <th> Répartition des charges en % </th>
            <td>
              {(
                specialites.reduce((totalValue, currentValue, i) => {
                  return (
                    totalValue +
                    Number(
                      (((allCharges.reduce((totalValue, currentValue) => {
                        return totalValue + Number(currentValue.name[i]);
                      }, 0) +
                        (Number(salaireBrut[i]) +
                          Number(
                            salaireBrut[i] * (pole.chargesSociales / 100)
                          ) +
                          Number(taxeSalaireBrut[i])) -
                        refSisa[i]) *
                        12) /
                        ((Number(totalSalaireBrut) +
                          Number(
                            totalSalaireBrut * (pole.chargesSociales / 100)
                          ) +
                          Number(1467.1 * (salarieETP / 12)) +
                          allCharges.reduce((totalValue, currentValue, i) => {
                            return totalValue + Number(currentValue.total);
                          }, 0)) *
                          12)) *
                        currentValue.nombre
                    )
                  );
                }, 0) * 100
              ).toFixed(2) + "%"}
            </td>
            <td></td>
            {specialites.map((specialite, i) => (
              <td key={i}>
                {(
                  (((allCharges.reduce((totalValue, currentValue) => {
                    return totalValue + Number(currentValue.name[i]);
                  }, 0) +
                    (Number(salaireBrut[i]) +
                      Number(salaireBrut[i] * (pole.chargesSociales / 100)) +
                      Number(taxeSalaireBrut[i])) -
                    refSisa[i]) *
                    12) /
                    ((Number(totalSalaireBrut) +
                      Number(totalSalaireBrut * (pole.chargesSociales / 100)) +
                      Number(1467.1 * (salarieETP / 12)) +
                      allCharges.reduce((totalValue, currentValue, i) => {
                        return totalValue + Number(currentValue.total);
                      }, 0)) *
                      12)) *
                  100
                ).toFixed(2) + "%"}
              </td>
            ))}
            <td></td>
            <td></td>
          </tr>
          <tr>
            <th> % Charges/Recettes </th>
            <td>
              {(
                (((Number(totalSalaireBrut) +
                  Number(totalSalaireBrut * (pole.chargesSociales / 100)) +
                  Number(1467.1 * (salarieETP / 12)) +
                  allCharges.reduce((totalValue, currentValue, i) => {
                    return totalValue + Number(currentValue.total);
                  }, 0)) *
                  12) /
                  Math.ceil(
                    specialites.reduce((totalValue, currentValue) => {
                      return (
                        totalValue +
                        currentValue.honoraires * currentValue.nombre
                      );
                    }, 0)
                  )) *
                100
              ).toFixed(2) + "%"}
            </td>
            <td></td>
            {specialites.map((specialite, i) => (
              <td key={i}>
                {(
                  (((allCharges.reduce((totalValue, currentValue) => {
                    return totalValue + Number(currentValue.name[i]);
                  }, 0) +
                    (Number(salaireBrut[i]) +
                      Number(salaireBrut[i] * (pole.chargesSociales / 100)) +
                      Number(taxeSalaireBrut[i])) -
                    refSisa[i]) *
                    12) /
                    specialite.honoraires) *
                  100
                ).toFixed(2) + "%"}
              </td>
            ))}
            <td></td>
            <td></td>
          </tr>
          <tr>
            <th> Résultat </th>
            <td>
              {(
                Math.ceil(
                  specialites.reduce((totalValue, currentValue) => {
                    return (
                      totalValue + currentValue.honoraires * currentValue.nombre
                    );
                  }, 0)
                ) -
                (Number(totalSalaireBrut) +
                  Number(totalSalaireBrut * (pole.chargesSociales / 100)) +
                  Number(1467.1 * (salarieETP / 12)) +
                  allCharges.reduce((totalValue, currentValue, i) => {
                    return totalValue + Number(currentValue.total);
                  }, 0)) *
                  12
              ).toFixed(2)}
            </td>
            <td></td>
            {specialites.map((specialite, i) => (
              <td key={i}>
                {(
                  specialite.honoraires -
                  (allCharges.reduce((totalValue, currentValue) => {
                    return totalValue + Number(currentValue.name[i]);
                  }, 0) +
                    (Number(salaireBrut[i]) +
                      Number(salaireBrut[i] * (pole.chargesSociales / 100)) +
                      Number(taxeSalaireBrut[i])) -
                    refSisa[i]) *
                    12
                ).toFixed(2)}
              </td>
            ))}
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </Fragment>
  );
}
