import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { addPole } from "../../2-actions/poleActions";
import Notifications, { notify } from "react-notify-toast";
import LoadingSpinner from "../components/LoadingSpinner.js";

export default function ModalAddPole() {
  const [surfTotale, setSurfaceTotale] = useState(0);
  const [loyerAnnuel, setLoyerAnnuel] = useState(0);

  const { register, handleSubmit, reset, errors } = useForm({});

  const dispatch = useDispatch();

  const poleAdd = useSelector((state) => state.poleAdd);
  const { loading, success, error } = poleAdd;

  const onSubmit = (data) => {
    console.log(data);
    const pole = {
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
      loyerMensuelm2: (Number(loyerAnnuel / surfTotale) / 12).toFixed(2),
      salaire: data.salaire,
      chargesSociales: data.chargesSociales,
      repartitionSalaire: data.repartitionSalaire,
      repartitionTaxeSalaires: data.repartitionTaxeSalaires,
      repartitionRefChargeSisa: data.repartitionRefChargeSisa,
    };
    dispatch(addPole(pole));
  };

  useEffect(() => {
    if (success) {
      notify.show("Le pôle a bien été ajouté !", "success", 5000, "#0E1717");
      reset({});
    }
    return () => {};
  }, [success]);

  return (
    <div className="modal-add-pole">
      <form
        id="form-add-pole"
        className="form-add-pole"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Notifications />
        <h2>Infos générales</h2>
        <div>
          <label>Nom</label>
          <input
            name="name"
            className={errors.name && "error"}
            defaultValue={""}
            ref={register}
          />
        </div>
        <div>
          <label>Adresse</label>
          <input
            name="address"
            className={errors.address && "error"}
            defaultValue={""}
            ref={register}
          />
        </div>
        <div>
          <label>Code postal</label>
          <input
            name="postalCode"
            className={errors.postalCode && "error"}
            defaultValue={""}
            ref={register}
          />
        </div>
        <div>
          <label>Ville</label>
          <input
            name="city"
            className={errors.city && "error"}
            defaultValue={""}
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
            value={surfTotale}
            onChange={(e) => setSurfaceTotale(e.target.value)}
            ref={register}
          />
        </div>
        <div>
          <label>Loyer annuel (€)</label>
          <input
            name="loyerAnnuel"
            value={loyerAnnuel}
            className={errors.loyerAnnuel && "error"}
            onChange={(e) => {
              setLoyerAnnuel(e.target.value);
            }}
            ref={register}
          />
        </div>
        <div>
          <label>Surface communs (m²)</label>
          <input
            name="surfaceCommuns"
            className={errors.surfaceCommuns && "error"}
            defaultValue={""}
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
            defaultValue={0}
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
            defaultValue={""}
            ref={register}
          />
        </div>
        <div>
          <label htmlFor="repartitionSalaire">Répartition des salaires</label>
          <select
            name="repartitionSalaire"
            id="repartitionSalaire"
            defaultValue="libre"
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
            defaultValue="libre"
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
            defaultValue={20}
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
            defaultValue="ponderation"
            ref={register}
          >
            <option value="partsEgales">Parts égales</option>
            <option value="ponderation">Pondération</option>
            <option value="coefSurface">Coef surface</option>
            <option value="recettes">% recettes</option>
            <option value="libre">Libre</option>
          </select>
        </div>
        <button type="submit" form="form-add-pole" value="">
          Ajouter
        </button>
      </form>
      {loading && <LoadingSpinner />}
      {error && <p className="danger">{error}</p>}
    </div>
  );
}
