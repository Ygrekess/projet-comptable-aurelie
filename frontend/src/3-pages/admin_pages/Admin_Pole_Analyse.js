import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllDeclarations,
  getOneDeclaration,
} from "../../2-actions/declarationActions";
import { getAllSpecialites } from "../../2-actions/specialiteActions";
import {
  repartitionName,
  calculRepartitionCharge,
  calculRepartitionSurface,
  calculRepartitionSurfaceNonRep,
} from "../../utils";
import LoadingSpinner from "../components/LoadingSpinner";
import { formatDate } from "../../utils";

export default function Admin_Pole_Analyse(props) {
  const [electricite, setElectricite] = useState(0);
  const poleSelected = useSelector((state) => state.poleSelected);
  const { pole } = poleSelected;

  const allSpecialitesGet = useSelector((state) => state.allSpecialitesGet);
  const { loading, specialites, error } = allSpecialitesGet;

  const allDeclarationsGet = useSelector((state) => state.allDeclarationsGet);
  const {
    loading: loadingDeclarations,
    declarations,
    error: errorDeclarations,
  } = allDeclarationsGet;

  const [declarationRadio, setDeclarationRadio] = useState(null);

  const declarationSelected = useSelector((state) => state.declarationSelected);
  const {
    loading: loadingDeclaration,
    declaration: declarationChoosed,
    error: errorDeclaration,
  } = declarationSelected;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllSpecialites(pole._id));
    dispatch(getAllDeclarations(pole._id));
    if (declarationRadio) {
      dispatch(getOneDeclaration(declarationRadio));
    }

    return () => {};
  }, [declarationRadio]);

  return loading || loadingDeclarations || loadingDeclaration ? (
    <LoadingSpinner />
  ) : error || errorDeclarations || errorDeclaration ? (
    <p className="danger">{error || errorDeclarations || errorDeclaration}</p>
  ) : (
    <div>
      Analyse
      <form>
        {declarations.map((declaration, i) => (
          <Fragment key={i}>
            <input
              type="radio"
              name="declaration"
              value={`${declaration._id}`}
              checked={
                declarationRadio &&
                declarationChoosed &&
                declaration._id === declarationChoosed._id
                  ? true
                  : false
              }
              onChange={() => setDeclarationRadio(declaration._id)}
            />
            <label htmlFor="declaration">
              Déclaration du {formatDate(declaration.date)}
            </label>
          </Fragment>
        ))}
      </form>
      {declarationRadio && declarationChoosed ? (
        <Fragment>
          <table border="1">
            <thead>
              <tr>
                <th className="vide"> </th>
                <th> Total </th>
                <th> Mode de répartition </th>
                {specialites.map((specialite, i) => (
                  <th key={i}>{specialite.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <th> Nombre </th>
                <td>
                  {specialites.reduce((totalValue, currentValue) => {
                    return totalValue + currentValue.nombre;
                  }, 0)}
                </td>
                <td className="vide"> </td>
                {specialites.map((specialite, i) => (
                  <th key={i}>{specialite.nombre}</th>
                ))}
              </tr>
              <tr>
                <th> Recettes annuelles stat. </th>
                <td>
                  {Math.ceil(
                    specialites.reduce((totalValue, currentValue) => {
                      return (
                        totalValue +
                        currentValue.honoraires * currentValue.nombre
                      );
                    }, 0)
                  )}
                </td>
                <td> Pour 1 praticien </td>
                {specialites.map((specialite, i) => (
                  <th key={i}>{specialite.honoraires}</th>
                ))}
              </tr>
              <tr>
                <th> Surface propre prof. </th>
                <td>
                  {Math.ceil(
                    specialites.reduce((totalValue, currentValue) => {
                      return totalValue + currentValue.surfPropreProf;
                    }, 0)
                  )}
                </td>
                <td> Par corps de métier </td>
                {specialites.map((specialite, i) => (
                  <th key={i}>{specialite.surfPropreProf}</th>
                ))}
              </tr>
              <tr>
                <th> Surface communs </th>
                <td> {Math.ceil(pole.surfaceCommuns)} </td>
                <td> {repartitionName(pole.repartitionSurfCommuns)} </td>
                {specialites.map((specialite, i) => (
                  <th key={i}>
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
                  </th>
                ))}
              </tr>
              <tr>
                <th> Surface profession non représentée </th>
                <td> {Math.ceil(pole.surfaceProfNonRepr)} </td>
                <td> {repartitionName(pole.repartitionSurfaceProfNonRepr)} </td>
                {specialites.map((specialite, i) => (
                  <th key={i} className="vide">
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
                  </th>
                ))}
              </tr>
              <tr>
                <th> Surface totale </th>
                <td> {Math.ceil(pole.surfaceTotale)} </td>
                <td> Par corps de métier </td>
                {specialites.map((specialite, i) => (
                  <th key={i}>
                    {(
                      specialite.surfPropreProf + specialite.surfCommuns
                    ).toFixed(2)}
                  </th>
                ))}
              </tr>
              <tr>
                <th> Surface par praticien </th>
                <td className="vide"></td>
                <td> Pour 1 praticien </td>
                {specialites.map((specialite, i) => (
                  <th key={i}>{specialite.surfPraticien.toFixed(2)}</th>
                ))}
              </tr>
              <tr>
                <th> Coef. surface par praticien pr répartition des loyers </th>
                <td className="vide"></td>
                <td className="vide"></td>
                {specialites.map((specialite, i) => (
                  <th key={i}>
                    {(specialite.coefSurfPraticienLoyer * 100).toFixed(2) + "%"}
                  </th>
                ))}
              </tr>
              <tr>
                <th>
                  Coef. surface par praticien//surface facturée pr rép. autres
                  charges
                </th>
                <td className="vide"></td>
                <td className="vide"></td>
                {specialites.map((specialite, i) => (
                  <th key={i}>
                    {(specialite.coefSurfPraticienAutresCharge * 100).toFixed(
                      2
                    ) + "%"}
                  </th>
                ))}
              </tr>
            </tbody>
          </table>
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
              <tr>
                <th> Loyer </th>
                <td>{declarationChoosed.loyer.total}</td>
                <td>{repartitionName(declarationChoosed.loyer.repartition)}</td>
                {specialites.map((specialite, i) => (
                  <td key={i}>
                    {calculRepartitionCharge(
                      declarationChoosed.loyer.repartition,
                      declarationChoosed.loyer.total,
                      (
                        (declarationChoosed.loyer.total /
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
                          totalValue +
                          currentValue.honoraires * currentValue.nombre
                        );
                      }, 0),
                      specialite.coefSurfPraticienLoyer,
                      specialite.coefSurfPraticienAutresCharge
                    )}
                  </td>
                ))}
                <td></td>
                <td>
                  {declarationChoosed.loyer.repartition === "ponderation"
                    ? (
                        (declarationChoosed.loyer.total /
                          specialites.reduce((totalValue, currentValue) => {
                            return totalValue + currentValue.nombre;
                          }, 0)) *
                        2
                      ).toFixed(2)
                    : ""}
                </td>
              </tr>
              <tr>
                <th> Electricité </th>
                <td>{declarationChoosed.electricite.total}</td>
                <td>
                  {repartitionName(declarationChoosed.electricite.repartition)}
                </td>

                {specialites.map((specialite, i) => (
                  <td key={i} className="charge">
                    {calculRepartitionCharge(
                      declarationChoosed.electricite.repartition,
                      declarationChoosed.electricite.total,
                      (
                        (declarationChoosed.electricite.total /
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
                          totalValue +
                          currentValue.honoraires * currentValue.nombre
                        );
                      }, 0),
                      specialite.coefSurfPraticienLoyer,
                      specialite.coefSurfPraticienAutresCharge
                    )}
                  </td>
                ))}
                <td>{electricite}</td>
                <td>
                  {declarationChoosed.electricite.repartition === "ponderation"
                    ? (
                        (declarationChoosed.electricite.total /
                          specialites.reduce((totalValue, currentValue) => {
                            return totalValue + currentValue.nombre;
                          }, 0)) *
                        2
                      ).toFixed(2)
                    : ""}
                </td>
              </tr>

              <tr>
                <th> Eau </th>
                <td>{declarationChoosed.eau.total}</td>
                <td> {repartitionName(declarationChoosed.eau.repartition)}</td>
                {specialites.map((specialite, i) => (
                  <td key={i}>
                    {calculRepartitionCharge(
                      declarationChoosed.eau.repartition,
                      declarationChoosed.eau.total,
                      (
                        (declarationChoosed.eau.total /
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
                          totalValue +
                          currentValue.honoraires * currentValue.nombre
                        );
                      }, 0),
                      specialite.coefSurfPraticienLoyer,
                      specialite.coefSurfPraticienAutresCharge
                    )}
                  </td>
                ))}
                <td>
                  {declarationChoosed.eau.repartition === "ponderation"
                    ? (
                        (declarationChoosed.eau.total /
                          specialites.reduce((totalValue, currentValue) => {
                            return totalValue + currentValue.nombre;
                          }, 0)) *
                        2
                      ).toFixed(2)
                    : ""}
                </td>
              </tr>

              <tr>
                <th> Fourn. administratives </th>
                <td>{declarationChoosed.fournAdmin.total}</td>
                <td>
                  {repartitionName(declarationChoosed.fournAdmin.repartition)}
                </td>
                {specialites.map((specialite, i) => (
                  <td key={i}>
                    {calculRepartitionCharge(
                      declarationChoosed.fournAdmin.repartition,
                      declarationChoosed.fournAdmin.total,
                      (
                        (declarationChoosed.fournAdmin.total /
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
                          totalValue +
                          currentValue.honoraires * currentValue.nombre
                        );
                      }, 0),
                      specialite.coefSurfPraticienLoyer,
                      specialite.coefSurfPraticienAutresCharge
                    )}
                  </td>
                ))}
                <td>
                  {declarationChoosed.fournAdmin.repartition === "ponderation"
                    ? (
                        (declarationChoosed.fournAdmin.total /
                          specialites.reduce((totalValue, currentValue) => {
                            return totalValue + currentValue.nombre;
                          }, 0)) *
                        2
                      ).toFixed(2)
                    : ""}
                </td>
              </tr>

              <tr>
                <th> Fourn. Entretien </th>
                <td>{declarationChoosed.fournEntr.total}</td>
                <td>
                  {repartitionName(declarationChoosed.fournEntr.repartition)}
                </td>
                {specialites.map((specialite, i) => (
                  <td key={i}>
                    {calculRepartitionCharge(
                      declarationChoosed.fournEntr.repartition,
                      declarationChoosed.fournEntr.total,
                      (
                        (declarationChoosed.fournEntr.total /
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
                          totalValue +
                          currentValue.honoraires * currentValue.nombre
                        );
                      }, 0),
                      specialite.coefSurfPraticienLoyer,
                      specialite.coefSurfPraticienAutresCharge
                    )}
                  </td>
                ))}
                <td>
                  {declarationChoosed.fournEntr.repartition === "ponderation"
                    ? (
                        (declarationChoosed.fournEntr.total /
                          specialites.reduce((totalValue, currentValue) => {
                            return totalValue + currentValue.nombre;
                          }, 0)) *
                        2
                      ).toFixed(2)
                    : ""}
                </td>
              </tr>

              <tr>
                <th> Ménage/entretien et réparations </th>
                <td>{declarationChoosed.menage.total}</td>
                <td>
                  {repartitionName(declarationChoosed.menage.repartition)}
                </td>
                {specialites.map((specialite, i) => (
                  <td key={i}>
                    {calculRepartitionCharge(
                      declarationChoosed.menage.repartition,
                      declarationChoosed.menage.total,
                      (
                        (declarationChoosed.menage.total /
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
                          totalValue +
                          currentValue.honoraires * currentValue.nombre
                        );
                      }, 0),
                      specialite.coefSurfPraticienLoyer,
                      specialite.coefSurfPraticienAutresCharge
                    )}
                  </td>
                ))}
                <td>
                  {declarationChoosed.menage.repartition === "ponderation"
                    ? (
                        (declarationChoosed.menage.total /
                          specialites.reduce((totalValue, currentValue) => {
                            return totalValue + currentValue.nombre;
                          }, 0)) *
                        2
                      ).toFixed(2)
                    : ""}
                </td>
              </tr>

              <tr>
                <th> Assurance </th>
                <td>{declarationChoosed.assurance.total}</td>
                <td>
                  {repartitionName(declarationChoosed.assurance.repartition)}
                </td>
                {specialites.map((specialite, i) => (
                  <td key={i}>
                    {calculRepartitionCharge(
                      declarationChoosed.assurance.repartition,
                      declarationChoosed.assurance.total,
                      (
                        (declarationChoosed.assurance.total /
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
                          totalValue +
                          currentValue.honoraires * currentValue.nombre
                        );
                      }, 0),
                      specialite.coefSurfPraticienLoyer,
                      specialite.coefSurfPraticienAutresCharge
                    )}
                  </td>
                ))}
                <td>
                  {declarationChoosed.assurance.repartition === "ponderation"
                    ? (
                        (declarationChoosed.assurance.total /
                          specialites.reduce((totalValue, currentValue) => {
                            return totalValue + currentValue.nombre;
                          }, 0)) *
                        2
                      ).toFixed(2)
                    : ""}
                </td>
              </tr>

              <tr>
                <th> Honoraires </th>
                <td>{declarationChoosed.honoraires.total}</td>
                <td>
                  {repartitionName(declarationChoosed.honoraires.repartition)}
                </td>
                {specialites.map((specialite, i) => (
                  <td key={i}>
                    {calculRepartitionCharge(
                      declarationChoosed.honoraires.repartition,
                      declarationChoosed.honoraires.total,
                      (
                        (declarationChoosed.honoraires.total /
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
                          totalValue +
                          currentValue.honoraires * currentValue.nombre
                        );
                      }, 0),
                      specialite.coefSurfPraticienLoyer,
                      specialite.coefSurfPraticienAutresCharge
                    )}
                  </td>
                ))}
                <td>
                  {declarationChoosed.honoraires.repartition === "ponderation"
                    ? (
                        (declarationChoosed.honoraires.total /
                          specialites.reduce((totalValue, currentValue) => {
                            return totalValue + currentValue.nombre;
                          }, 0)) *
                        2
                      ).toFixed(2)
                    : ""}
                </td>
              </tr>

              <tr>
                <th>Annonces et insertions</th>
                <td>{declarationChoosed.annoncesInsertions.total}</td>
                <td>
                  {repartitionName(
                    declarationChoosed.annoncesInsertions.repartition
                  )}
                </td>
                {specialites.map((specialite, i) => (
                  <td key={i}>
                    {calculRepartitionCharge(
                      declarationChoosed.annoncesInsertions.repartition,
                      declarationChoosed.annoncesInsertions.total,
                      (
                        (declarationChoosed.annoncesInsertions.total /
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
                          totalValue +
                          currentValue.honoraires * currentValue.nombre
                        );
                      }, 0),
                      specialite.coefSurfPraticienLoyer,
                      specialite.coefSurfPraticienAutresCharge
                    )}
                  </td>
                ))}
                <td>
                  {declarationChoosed.annoncesInsertions.repartition ===
                  "ponderation"
                    ? (
                        (declarationChoosed.annoncesInsertions.total /
                          specialites.reduce((totalValue, currentValue) => {
                            return totalValue + currentValue.nombre;
                          }, 0)) *
                        2
                      ).toFixed(2)
                    : ""}
                </td>
              </tr>

              <tr>
                <th>Frais postaux</th>
                <td>{declarationChoosed.fraisPostaux.total}</td>
                <td>
                  {repartitionName(declarationChoosed.fraisPostaux.repartition)}
                </td>
                {specialites.map((specialite, i) => (
                  <td key={i}>
                    {calculRepartitionCharge(
                      declarationChoosed.fraisPostaux.repartition,
                      declarationChoosed.fraisPostaux.total,
                      (
                        (declarationChoosed.fraisPostaux.total /
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
                          totalValue +
                          currentValue.honoraires * currentValue.nombre
                        );
                      }, 0),
                      specialite.coefSurfPraticienLoyer,
                      specialite.coefSurfPraticienAutresCharge
                    )}
                  </td>
                ))}
                <td>
                  {declarationChoosed.fraisPostaux.repartition === "ponderation"
                    ? (
                        (declarationChoosed.fraisPostaux.total /
                          specialites.reduce((totalValue, currentValue) => {
                            return totalValue + currentValue.nombre;
                          }, 0)) *
                        2
                      ).toFixed(2)
                    : ""}
                </td>
              </tr>

              <tr>
                <th>Internet et téléphone</th>
                <td>{declarationChoosed.internetTelephone.total}</td>
                <td>
                  {repartitionName(
                    declarationChoosed.internetTelephone.repartition
                  )}
                </td>
                {specialites.map((specialite, i) => (
                  <td key={i}>
                    {calculRepartitionCharge(
                      declarationChoosed.internetTelephone.repartition,
                      declarationChoosed.internetTelephone.total,
                      (
                        (declarationChoosed.internetTelephone.total /
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
                          totalValue +
                          currentValue.honoraires * currentValue.nombre
                        );
                      }, 0),
                      specialite.coefSurfPraticienLoyer,
                      specialite.coefSurfPraticienAutresCharge
                    )}
                  </td>
                ))}
                <td>
                  {declarationChoosed.internetTelephone.repartition ===
                  "ponderation"
                    ? (
                        (declarationChoosed.internetTelephone.total /
                          specialites.reduce((totalValue, currentValue) => {
                            return totalValue + currentValue.nombre;
                          }, 0)) *
                        2
                      ).toFixed(2)
                    : ""}
                </td>
              </tr>

              <tr>
                <th>Frais bancaires</th>
                <td>{declarationChoosed.fraisBancaires.total}</td>
                <td>
                  {repartitionName(
                    declarationChoosed.fraisBancaires.repartition
                  )}
                </td>
                {specialites.map((specialite, i) => (
                  <td key={i}>
                    {calculRepartitionCharge(
                      declarationChoosed.fraisBancaires.repartition,
                      declarationChoosed.fraisBancaires.total,
                      (
                        (declarationChoosed.fraisBancaires.total /
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
                          totalValue +
                          currentValue.honoraires * currentValue.nombre
                        );
                      }, 0),
                      specialite.coefSurfPraticienLoyer,
                      specialite.coefSurfPraticienAutresCharge
                    )}
                  </td>
                ))}
                <td>
                  {declarationChoosed.fraisBancaires.repartition ===
                  "ponderation"
                    ? (
                        (declarationChoosed.fraisBancaires.total /
                          specialites.reduce((totalValue, currentValue) => {
                            return totalValue + currentValue.nombre;
                          }, 0)) *
                        2
                      ).toFixed(2)
                    : ""}
                </td>
              </tr>

              <tr>
                <th>CFE</th>
                <td>{declarationChoosed.cfe.total}</td>
                <td> {repartitionName(declarationChoosed.cfe.repartition)}</td>
                {specialites.map((specialite, i) => (
                  <td key={i}>
                    {calculRepartitionCharge(
                      declarationChoosed.cfe.repartition,
                      declarationChoosed.cfe.total,
                      (
                        (declarationChoosed.cfe.total /
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
                          totalValue +
                          currentValue.honoraires * currentValue.nombre
                        );
                      }, 0),
                      specialite.coefSurfPraticienLoyer,
                      specialite.coefSurfPraticienAutresCharge
                    )}
                  </td>
                ))}
                <td>
                  {declarationChoosed.cfe.repartition === "ponderation"
                    ? (
                        (declarationChoosed.cfe.total /
                          specialites.reduce((totalValue, currentValue) => {
                            return totalValue + currentValue.nombre;
                          }, 0)) *
                        2
                      ).toFixed(2)
                    : ""}
                </td>
              </tr>

              <tr>
                <th>Réception/déplacement</th>
                <td>{declarationChoosed.receptionDeplacement.total}</td>
                <td>
                  {repartitionName(
                    declarationChoosed.receptionDeplacement.repartition
                  )}
                </td>
                {specialites.map((specialite, i) => (
                  <td key={i}>
                    {calculRepartitionCharge(
                      declarationChoosed.receptionDeplacement.repartition,
                      declarationChoosed.receptionDeplacement.total,
                      (
                        (declarationChoosed.receptionDeplacement.total /
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
                          totalValue +
                          currentValue.honoraires * currentValue.nombre
                        );
                      }, 0),
                      specialite.coefSurfPraticienLoyer,
                      specialite.coefSurfPraticienAutresCharge
                    )}
                  </td>
                ))}
                <td>
                  {declarationChoosed.receptionDeplacement.repartition ===
                  "ponderation"
                    ? (
                        (declarationChoosed.receptionDeplacement.total /
                          specialites.reduce((totalValue, currentValue) => {
                            return totalValue + currentValue.nombre;
                          }, 0)) *
                        2
                      ).toFixed(2)
                    : ""}
                </td>
              </tr>

              <tr>
                <th>Petit équipement</th>
                <td>{declarationChoosed.petitEquipement.total}</td>
                <td>
                  {repartitionName(
                    declarationChoosed.petitEquipement.repartition
                  )}
                </td>
                {specialites.map((specialite, i) => (
                  <td key={i}>
                    {calculRepartitionCharge(
                      declarationChoosed.petitEquipement.repartition,
                      declarationChoosed.petitEquipement.total,
                      (
                        (declarationChoosed.petitEquipement.total /
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
                          totalValue +
                          currentValue.honoraires * currentValue.nombre
                        );
                      }, 0),
                      specialite.coefSurfPraticienLoyer,
                      specialite.coefSurfPraticienAutresCharge
                    )}
                  </td>
                ))}
                <td>
                  {declarationChoosed.petitEquipement.repartition ===
                  "ponderation"
                    ? (
                        (declarationChoosed.petitEquipement.total /
                          specialites.reduce((totalValue, currentValue) => {
                            return totalValue + currentValue.nombre;
                          }, 0)) *
                        2
                      ).toFixed(2)
                    : ""}
                </td>
              </tr>
            </tbody>
          </table>
        </Fragment>
      ) : null}
    </div>
  );
}
