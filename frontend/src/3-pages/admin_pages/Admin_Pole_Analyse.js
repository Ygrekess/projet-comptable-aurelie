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
import { set } from "mongoose";
import TableChargesMensuellesFonct from "../components/TableChargesMensuellesFonct";

export default function Admin_Pole_Analyse(props) {
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

  const declarationSelected = useSelector((state) => state.declarationSelected);
  const {
    loading: loadingDeclaration,
    declaration: declarationChoosed,
    error: errorDeclaration,
  } = declarationSelected;

  const [declarationRadio, setDeclarationRadio] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!specialites) {
      dispatch(getAllSpecialites(pole._id));
    }
    if (!declarations) {
      dispatch(getAllDeclarations(pole._id));
    }
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

          <TableChargesMensuellesFonct
            pole={pole}
            specialites={specialites}
            declarationChoosed={declarationChoosed}
          />
        </Fragment>
      ) : null}
    </div>
  );
}
