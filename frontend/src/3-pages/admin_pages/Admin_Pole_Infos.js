import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  getOnePole,
  resetSuccessPoleUpdate,
  updatePole,
} from "../../2-actions/poleActions";
import LoadingSpinner from "../components/LoadingSpinner";
import Notifications, { notify } from "react-notify-toast";

export default function Admin_Pole_Infos(props) {
  const poleSelected = useSelector((state) => state.poleSelected);
  const { pole } = poleSelected;

  const poleUpdated = useSelector((state) => state.poleUpdated);
  const { loading, error } = poleUpdated;

  const { register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    console.log(data);
    const poleUpdated = {
      name: data.name,
      address: data.address,
      postalCode: data.postalCode,
      city: data.city,
      surfaceTotale: data.surfaceTotale,
      surfaceCommuns: data.surfaceCommuns,
      repartitionSurfCommuns: data.repartitionSurfCommuns,
      surfaceProfNonRepr: data.surfaceProfNonRepr,
      repartitionSurfaceProfNonRepr: data.repartitionSurfaceProfNonRepr,
      loyerAnnuel: data.loyerAnnuel,
      loyerMensuelm2: (
        Number(data.loyerAnnuel / data.surfaceTotale) / 12
      ).toFixed(2),
      salaire: data.salaire,
      chargesSociales: data.chargesSociales,
      repartitionSalaire: data.repartitionSalaire,
      repartitionTaxeSalaires: data.repartitionTaxeSalaires,
      repartitionRefChargeSisa: data.repartitionRefChargeSisa,
    };
    dispatch(updatePole(pole._id, poleUpdated));
  };

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <div className="pole-infos-page">
      <Notifications />
      <form
        id="pole-infos-form"
        className="pole-infos-form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2>Infos genérales</h2>
        <div>
          <label>Nom</label>
          <input
            name="name"
            className={errors.name && "error"}
            defaultValue={pole.name}
            ref={register}
          />
        </div>
        <div>
          <label>Adresse</label>
          <input
            name="address"
            className={errors.address && "error"}
            defaultValue={pole.address}
            ref={register}
          />
        </div>
        <div>
          <label>Code postal</label>
          <input
            name="postalCode"
            className={errors.postalCode && "error"}
            defaultValue={pole.postalCode}
            ref={register}
          />
        </div>
        <div>
          <label>Ville</label>
          <input
            name="city"
            className={errors.city && "error"}
            defaultValue={pole.city}
            ref={register}
          />
        </div>
        <hr />
        <h2>Surface</h2>
        <div>
          <label>Surface totale (m²)</label>
          <input
            name="surfaceTotale"
            className={errors.surfaceTotale && "error"}
            defaultValue={pole.surfaceTotale}
            ref={register}
          />
        </div>
        <div>
          <label>Loyer annuel (€)</label>
          <input
            name="loyerAnnuel"
            defaultValue={pole.loyerAnnuel}
            className={errors.loyerAnnuel && "error"}
            ref={register}
          />
        </div>
        <div>
          <label>Surface communs (m²)</label>
          <input
            name="surfaceCommuns"
            className={errors.surfaceCommuns && "error"}
            defaultValue={pole.surfaceCommuns}
            ref={register}
          />
        </div>
        <div>
          <label htmlFor="repartitionSurfCommuns">
            Répartition surface communs
          </label>
          <select
            name="repartitionSurfCommuns"
            id="repartitionSurfCommuns"
            ref={register}
            defaultValue={pole.repartitionSurfCommuns}
          >
            <option value="partsEgales">Parts égales</option>
            <option value="surfacePropre">% Surface propre</option>
            <option value="recettes">% Recettes</option>
            <option value="bailleur">100% Bailleur</option>
            <option value="mg">100% MG</option>
          </select>
        </div>
        <div>
          <label>Surface profession non représentée (m²)</label>
          <input
            name="surfaceProfNonRepr"
            className={errors.surfaceProfNonRepr && "error"}
            defaultValue={pole.surfaceProfNonRepr}
            ref={register}
          />
        </div>
        <div>
          <label htmlFor="repartitionSurfaceProfNonRepr">
            Répartition surface profession non représentée
          </label>
          <select
            name="repartitionSurfaceProfNonRepr"
            id="repartitionSurfaceProfNonRepr"
            defaultValue={pole.repartitionSurfaceProfNonRepr}
            ref={register}
          >
            <option value="partsEgales">Parts égales</option>
            <option value="surfacePropre">% Surface propre</option>
            <option value="recettes">% Recettes</option>
            <option value="bailleur">100% Bailleur</option>
            <option value="mg">100% MG</option>
          </select>
        </div>
        <hr />
        <h2>Employés</h2>
        <div>
          <label>Salaire brut (€)</label>
          <input
            name="salaire"
            className={errors.salaire && "error"}
            defaultValue={pole.salaire}
            ref={register}
          />
        </div>
        <div>
          <label htmlFor="repartitionSalaire">Répartition des salaires</label>
          <select
            name="repartitionSalaire"
            id="repartitionSalaire"
            defaultValue={pole.repartitionSalaire}
            ref={register}
          >
            <option value="partsEgales">Parts égales</option>
            <option value="ponderation">Pondération</option>
            <option value="coefSurface">Coef surface</option>
            <option value="recettes">% recettes</option>
            <option value="libre">Libre</option>
          </select>
        </div>
        <div>
          <label htmlFor="repartitionTaxeSalaires">
            Répartition taxe sur salaires
          </label>
          <select
            name="repartitionTaxeSalaires"
            id="repartitionTaxeSalaires"
            defaultValue={pole.repartitionTaxeSalaires}
            ref={register}
          >
            <option value="partsEgales">Parts égales</option>
            <option value="ponderation">Pondération</option>
            <option value="coefSurface">Coef surface</option>
            <option value="recettes">% recettes</option>
            <option value="libre">Libre</option>
          </select>
        </div>
        <div>
          <label>Charges sociales (%)</label>
          <input
            name="chargesSociales"
            className={errors.chargesSociales && "error"}
            defaultValue={pole.chargesSociales}
            ref={register}
          />
        </div>

        <div>
          <label htmlFor="repartitionRefChargeSisa">
            Refacturation charges à la SISA (forfaitaire)
          </label>
          <select
            name="repartitionRefChargeSisa"
            id="repartitionRefChargeSisa"
            defaultValue={pole.repartitionRefChargeSisa}
            ref={register}
          >
            <option value="partsEgales">Parts égales</option>
            <option value="ponderation">Pondération</option>
            <option value="coefSurface">Coef surface</option>
            <option value="recettes">% recettes</option>
            <option value="libre">Libre</option>
          </select>
        </div>

        <button type="submit" form="pole-infos-form" value="">
          Valider les modifications
        </button>
      </form>
      {loading && <LoadingSpinner />}
      {error && <p className="danger">{error}</p>}
    </div>
  );
}
