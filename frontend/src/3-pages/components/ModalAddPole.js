import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { addPole } from "../../2-actions/poleActions";
import Notifications, { notify } from "react-notify-toast";
import LoadingSpinner from "../components/LoadingSpinner.js";

export default function ModalAddPole() {
  const { register, handleSubmit, reset, errors } = useForm({});

  const dispatch = useDispatch();

  const poleAdd = useSelector((state) => state.poleAdd);
  const { loading, success, error } = poleAdd;

  const onSubmit = (data) => {
    const pole = {
      name: data.name,
      address: data.address,
      postalCode: data.postalCode,
      city: data.city,
      surfaceTotale: data.surfaceTotale,
      loyerAnnuel: data.loyerAnnuel,
      loyerMensuelm2: (
        Number(data.loyerAnnuel) /
        Number(data.surfaceTotale) /
        12
      ).toFixed(2),
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
        <h2>Ajouter un pôle</h2>
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
        <div>
          <label>Surface totale</label>
          <input
            name="surfaceTotale"
            className={errors.surfaceTotale && "error"}
            defaultValue={""}
            ref={register}
          />
        </div>
        <div>
          <label>Loyer annuel</label>
          <input
            name="loyerAnnuel"
            className={errors.loyerAnnuel && "error"}
            defaultValue={""}
            ref={register}
          />
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
