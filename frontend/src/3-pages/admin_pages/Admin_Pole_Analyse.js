import React, { Fragment, useEffect, useRef, useState } from "react";
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
import { useReactToPrint } from "react-to-print";
import { useForm } from "react-hook-form";

export default function Admin_Pole_Analyse(props) {
  const [errorMessage, setErrorMessage] = useState("");
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

  const { register, handleSubmit, reset, errors } = useForm({});

  /*   const [declarationRadio, setDeclarationRadio] = useState(null);
   */
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    console.log(data.declaration);
    setErrorMessage("");
    if (data.declaration !== "aucun") {
      dispatch(getOneDeclaration(data.declaration));
    }
  };

  useEffect(() => {
    if (errorDeclarations) {
      setErrorMessage(errorDeclarations.message);
    }
    if (error) {
      setErrorMessage(error.message);
    }
    if (errorDeclaration) {
      setErrorMessage(errorDeclaration.message);
    }
    if (!specialites) {
      dispatch(getAllSpecialites(pole._id));
    }
    if (!declarations) {
      dispatch(getAllDeclarations(pole._id));
    }
    return () => {};
  }, [declarationChoosed, error, errorDeclarations, errorDeclaration]);

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    documentTitle: `${pole.name}`,
    content: () => componentRef.current,
    copyStyles: true,
  });

  return (
    <div className="admin-pole-table">
      <h2>Tableau d'analyse</h2>
      {declarations && (
        <form>
          <select
            name="declaration"
            defaultValue={declarationChoosed ? declarationChoosed._id : "aucun"}
            onChange={handleSubmit(onSubmit)}
            ref={register}
          >
            <option value={"aucun"}>Sélectionnez la déclaration</option>
            {declarations.map((declaration, i) => (
              <option value={`${declaration._id}`} key={i}>
                Déclaration du {formatDate(declaration.date)}
              </option>
            ))}
          </select>
        </form>
      )}
      {loading || loadingDeclarations || loadingDeclaration ? (
        <LoadingSpinner />
      ) : errorMessage ? (
        <p className="danger">{errorMessage}</p>
      ) : declarationChoosed ? (
        <div>
          <TableChargesMensuellesFonct
            pole={pole}
            specialites={specialites}
            declarationChoosed={declarationChoosed}
          />
        </div>
      ) : null}
    </div>
  );
}
