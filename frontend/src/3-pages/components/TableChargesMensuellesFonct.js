import React, { Fragment, useEffect, useRef, useState } from "react";
import {
  calculRepartitionCharge,
  calculRepartitionSalaire,
  calculRepartitionTaxeSalaire,
  calculRepartitionRefSisa,
  repartitionName,
  calculRepartitionSurface,
  calculRepartitionSurfaceNonRep,
  formatDate,
} from "../../utils";
import { useReactToPrint } from "react-to-print";

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

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    documentTitle: `${pole.name}`,
    content: () => componentRef.current,
  });
  return (
    <Fragment>
      <div className="table-container" ref={componentRef}>
        <div className="header-print">
          <h3>{pole.name}</h3>
          <h4>{pole.address}</h4>
          <h4>{pole.postalCode}</h4>
          <h4>{pole.city}</h4>
          <h1>Déclaration du {formatDate(declarationChoosed.date)}</h1>
        </div>
        <div className="button-print">
          <button onClick={() => handlePrint()}>Télécharger</button>
        </div>
        <table>
          <thead>
            <tr>
              <th className="column-name"> </th>
              <th className="column-total"> Total </th>
              <th className="column-repartition"> Mode de répartition </th>
              {specialites.map((specialite, i) => (
                <th className="column-praticien" key={i}>
                  {specialite.name}
                </th>
              ))}
              <th className="column-total-annuel">Total annuel</th>
              <th className="column-fixe">Fixe</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th className="column-name"> Nombre </th>
              <td className="column-total">
                {specialites.reduce((totalValue, currentValue) => {
                  return totalValue + currentValue.nombre;
                }, 0)}
              </td>
              <td> </td>
              {specialites.map((specialite, i) => (
                <td key={i}>{specialite.nombre}</td>
              ))}
              <td className="column-total-annuel"></td>
              <td></td>
            </tr>
            <tr>
              <th className="column-name"> Recettes annuelles stat. </th>
              <td className="column-total">
                {Math.ceil(
                  specialites.reduce((totalValue, currentValue) => {
                    return (
                      totalValue + currentValue.honoraires * currentValue.nombre
                    );
                  }, 0)
                )}
              </td>
              <td> Pour 1 praticien </td>
              {specialites.map((specialite, i) => (
                <td key={i}>{specialite.honoraires}</td>
              ))}
              <td className="column-total-annuel"></td>
              <td></td>
            </tr>
            <tr>
              <th className="column-name"> Surface propre prof. </th>
              <td className="column-total">
                {Math.ceil(
                  specialites.reduce((totalValue, currentValue) => {
                    return totalValue + currentValue.surfPropreProf;
                  }, 0)
                )}
              </td>
              <td> Par corps de métier </td>
              {specialites.map((specialite, i) => (
                <td key={i}>{specialite.surfPropreProf}</td>
              ))}
              <td className="column-total-annuel"></td>
              <td></td>
            </tr>
            <tr>
              <th className="column-name"> Surface communs </th>
              <td className="column-total">
                {" "}
                {Math.ceil(pole.surfaceCommuns)}{" "}
              </td>
              <td> {repartitionName(pole.repartitionSurfCommuns)} </td>
              {specialites.map((specialite, i) => (
                <td key={i}>
                  {calculRepartitionSurface(
                    pole.repartitionSurfCommuns,
                    pole.surfaceCommuns,
                    specialite.surfPropreProf,
                    Math.ceil(pole.surfaceTotale - pole.surfaceCommuns),
                    specialite.honoraires,
                    specialites.reduce((totalValue, currentValue) => {
                      return (
                        totalValue +
                        currentValue.honoraires * currentValue.nombre
                      );
                    }, 0),
                    specialites.reduce((totalValue, currentValue) => {
                      return totalValue + currentValue.nombre;
                    }, 0),
                    specialite.nombre
                  )}
                </td>
              ))}
              <td className="column-total-annuel"></td>
              <td></td>
            </tr>
            <tr>
              <th className="column-name">
                {" "}
                Surface profession non représentée{" "}
              </th>
              <td className="column-total">
                {" "}
                {Math.ceil(pole.surfaceProfNonRepr)}{" "}
              </td>
              <td> {repartitionName(pole.repartitionSurfaceProfNonRepr)} </td>
              {specialites.map((specialite, i) => (
                <td key={i}>
                  {calculRepartitionSurfaceNonRep(
                    pole.repartitionSurfaceProfNonRepr,
                    specialite.surfaceCommuns,
                    specialite.surfPropreProf,
                    pole.surfaceProfNonRepr,
                    pole.surfaceTotale,
                    specialite.honoraires,
                    specialites.reduce((totalValue, currentValue) => {
                      return (
                        totalValue +
                        currentValue.honoraires * currentValue.nombre
                      );
                    }, 0),
                    specialites.reduce((totalValue, currentValue) => {
                      return totalValue + currentValue.nombre;
                    }, 0),
                    specialite.name,
                    specialite.nombre
                  )}
                </td>
              ))}
              <td className="column-total-annuel"></td>
              <td></td>
            </tr>
            <tr>
              <th className="column-name"> Surface totale </th>
              <td className="column-total">
                {" "}
                {Math.ceil(pole.surfaceTotale)}{" "}
              </td>
              <td> Par corps de métier </td>
              {specialites.map((specialite, i) => (
                <td key={i}>
                  {(specialite.surfPropreProf + specialite.surfCommuns).toFixed(
                    2
                  )}
                </td>
              ))}
              <td className="column-total-annuel"></td>
              <td></td>
            </tr>
            <tr>
              <th className="column-name"> Surface par praticien </th>
              <td className="column-total"></td>
              <td> Pour 1 praticien </td>
              {specialites.map((specialite, i) => (
                <td key={i}>{specialite.surfPraticien.toFixed(2)}</td>
              ))}
              <td className="column-total-annuel">
                {specialites
                  .reduce((totalValue, currentValue, i) => {
                    return (
                      totalValue +
                      currentValue.surfPraticien * currentValue.nombre
                    );
                  }, 0)
                  .toFixed(2)}
              </td>
              <td></td>
            </tr>
            <tr>
              <th className="column-name">
                Coef. surface par praticien pr répartition des loyers
              </th>
              <td className="column-total"></td>
              <td></td>
              {specialites.map((specialite, i) => (
                <td key={i}>
                  {(specialite.coefSurfPraticienLoyer * 100).toFixed(2) + "%"}
                </td>
              ))}
              <td className="column-total-annuel">
                {specialites
                  .reduce((totalValue, currentValue, i) => {
                    return (
                      totalValue +
                      currentValue.coefSurfPraticienLoyer * currentValue.nombre
                    );
                  }, 0)
                  .toFixed(2)}
              </td>
              <td></td>
            </tr>
            <tr>
              <th className="column-name">
                Coef. surface par praticien//surface facturée pr rép. autres
                charges
              </th>
              <td className="column-total"></td>
              <td></td>
              {specialites.map((specialite, i) => (
                <td key={i}>
                  {(specialite.coefSurfPraticienAutresCharge * 100).toFixed(2) +
                    "%"}
                </td>
              ))}
              <td className="column-total-annuel">
                {specialites
                  .reduce((totalValue, currentValue, i) => {
                    return (
                      totalValue +
                      currentValue.coefSurfPraticienAutresCharge *
                        currentValue.nombre
                    );
                  }, 0)
                  .toFixed(2)}
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
        <table>
          <caption> </caption>
          <thead>
            <tr>
              <th className="column-name">
                Charges mensuelles de fonctionnement par praticien
              </th>
              <th className="column-total">Total</th>
              <th className="column-repartition">Mode de répartition</th>
              {specialites.map((specialite, i) => (
                <th key={i} className="column-praticien">
                  {specialite.name}
                </th>
              ))}
              <th className="column-total-annuel">Total annuel</th>
              <th className="column-fixe">Dont fixe</th>
            </tr>
          </thead>
          <tbody>
            {allCharges.map((charge, i) => (
              <tr key={i}>
                <th className="column-name"> {charge.title} </th>
                <td className="column-total">{charge.total}</td>
                <td>{repartitionName(charge.repartition)}</td>
                {specialites.map((specialite, i) => (
                  <td key={i}>{charge.name[i]}</td>
                ))}
                <td className="column-total-annuel">
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
              <th className="column-name"> Frais de fonctionnement mensuel </th>
              <td className="column-total">
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
              <td className="column-total-annuel">{totalAnnuel}</td>
              <td></td>
            </tr>
          </tbody>
        </table>
        <table>
          <caption> </caption>
          <thead>
            <tr>
              <th className="column-name">
                Charges mensuelles de personnel accueil et secrétariat par
                praticien
              </th>
              <th className="column-total">Total</th>
              <th className="column-repartition">Mode de répartition</th>
              {specialites.map((specialite, i) => (
                <th key={i} className="column-praticien">
                  {specialite.name}
                </th>
              ))}
              <th className="column-total-annuel">Total annuel</th>
              <th className="column-fixe">Dont fixe</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th className="column-name"> Nombre salariés en ETP </th>
              <td className="column-total">{salarieETP}</td>
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
              <td className="column-total-annuel">
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
              <th className="column-name"> Salaire brut </th>
              <td className="column-total">{totalSalaireBrut}</td>
              <td>{repartitionName(pole.repartitionSalaire)}</td>
              {specialites.map((specialite, i) => (
                <td key={i}>{salaireBrut[i]}</td>
              ))}
              <td className="column-total-annuel">
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
              <th className="column-name"> Charges patronales </th>
              <td className="column-total">
                {(totalSalaireBrut * (pole.chargesSociales / 100)).toFixed(2)}
              </td>
              <td></td>
              {specialites.map((specialite, i) => (
                <td key={i}>
                  {(salaireBrut[i] * (pole.chargesSociales / 100)).toFixed(2)}
                </td>
              ))}
              <td className="column-total-annuel">
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
              <th className="column-name"> Taxe sur les salaires </th>
              <td className="column-total">
                {(1467.1 * (salarieETP / 12)).toFixed(2)}
              </td>
              <td>{repartitionName(pole.repartitionTaxeSalaires)}</td>
              {specialites.map((specialite, i) => (
                <td key={i}>{taxeSalaireBrut[i]}</td>
              ))}
              <td className="column-total-annuel">
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
                      ((1467.1 * (salarieETP / 12)).toFixed(2) /
                        numbTotalPrat) *
                      2
                    ).toFixed(2)
                  : ""}
              </td>
            </tr>
            <tr>
              <th className="column-name"> Coût salarial </th>
              <td className="column-total">
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
              <td className="column-total-annuel">
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

            <tr>
              <th className="column-name">
                {" "}
                Refacturation charges à la SISA (forfaitaire){" "}
              </th>
              <td className="column-total">{200 * 12}</td>
              <td>{repartitionName(pole.repartitionRefChargeSisa)}</td>
              {specialites.map((specialite, i) => (
                <td key={i}>{refSisa[i]}</td>
              ))}
              <td className="column-total-annuel">
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
        <table>
          <caption> </caption>
          <thead>
            <tr>
              <th className="column-name"></th>
              <th className="column-total">Total</th>
              <th className="column-repartition">Mode de répartition</th>
              {specialites.map((specialite, i) => (
                <th key={i} className="column-praticien">
                  {specialite.name}
                </th>
              ))}
              <th className="column-total-annuel">Total annuel</th>
              <th className="column-fixe">Dont fixe</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th className="column-name"> Coût total mensuel net </th>
              <td className="column-total">
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
              <td className="column-total-annuel">
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
              <th className="column-name"> Coût total annuel net </th>
              <td className="column-total">
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
              <td className="column-total-annuel">
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
              <th className="column-name"> Répartition des charges en % </th>
              <td className="column-total">
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
                        Number(
                          totalSalaireBrut * (pole.chargesSociales / 100)
                        ) +
                        Number(1467.1 * (salarieETP / 12)) +
                        allCharges.reduce((totalValue, currentValue, i) => {
                          return totalValue + Number(currentValue.total);
                        }, 0)) *
                        12)) *
                    100
                  ).toFixed(2) + "%"}
                </td>
              ))}
              <td className="column-total-annuel"></td>
              <td></td>
            </tr>
            <tr>
              <th className="column-name"> % Charges/Recettes </th>
              <td className="column-total">
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
              <td className="column-total-annuel"></td>
              <td></td>
            </tr>
            <tr>
              <th className="column-name"> Résultat </th>
              <td className="column-total">
                {(
                  Math.ceil(
                    specialites.reduce((totalValue, currentValue) => {
                      return (
                        totalValue +
                        currentValue.honoraires * currentValue.nombre
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
      </div>
    </Fragment>
  );
}
