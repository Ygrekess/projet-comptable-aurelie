import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Notifications, { notify } from "react-notify-toast";
import {
  getAllSpecialites,
  resetSuccessSpecialite,
  updateSpecialite,
} from "../../2-actions/specialiteActions";

export default function ModalUpdateSpecialite({ specialite, pole }) {
  const { register, handleSubmit, errors } = useForm();

  const specialiteUpdated = useSelector((state) => state.specialiteUpdated);
  const { success } = specialiteUpdated;

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    const specialiteUpdated = {
      pole: pole._id,
      name: data.name,
      nombre: data.nombre,
      honoraires: data.honoraires,
      surfPropreProf: data.surfPropreProf,
      surfCommuns: data.surfCommuns,
      surfPraticien: data.surfPraticien,
    };
    dispatch(updateSpecialite(specialite._id, specialiteUpdated));
  };

  useEffect(() => {
    if (success) {
      notify.show(
        "Les modifications ont été enregistrées !",
        "success",
        5000,
        "#0E1717"
      );
      dispatch(resetSuccessSpecialite());
      dispatch(getAllSpecialites(pole._id));
    }
    return () => {};
  }, [success]);
  return (
    <div className="modal-update-specialite">
      <form
        id="form-update-specialite"
        className="form-update-specialite"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Notifications />
        <h2>{specialite.name}</h2>
        <div>
          <label>Type</label>
          <input
            name="name"
            className={errors.name && "error"}
            defaultValue={specialite.name}
            ref={register}
          />
          {errors.name && (
            <span className="danger">Merci de saisir une valeur.</span>
          )}
        </div>
        <div>
          <label>Nombre</label>
          <input
            name="nombre"
            className={errors.nombre && "error"}
            defaultValue={specialite.nombre}
            ref={register}
          />
          {errors.nombre && (
            <span className="danger">Merci de saisir une valeur.</span>
          )}
        </div>
        <div>
          <label>Honoraires (€)</label>
          <input
            name="honoraires"
            className={errors.honoraires && "error"}
            defaultValue={specialite.honoraires}
            ref={register}
          />
          {errors.honoraires && (
            <span className="danger">Merci de saisir une valeur.</span>
          )}
        </div>
        <div>
          <label>Surface propre par spécialité (m²)</label>
          <input
            name="surfPropreProf"
            className={errors.surfPropreProf && "error"}
            defaultValue={specialite.surfPropreProf}
            ref={register}
          />
          {errors.surfPropreProf && (
            <span className="danger">Merci de saisir une valeur.</span>
          )}
        </div>
        <div>
          <label>Surface communs (m²)</label>
          <input
            name="surfCommuns"
            className={errors.surfCommuns && "error"}
            defaultValue={specialite.surfCommuns}
            ref={register}
          />
          {errors.surfCommuns && (
            <span className="danger">Merci de saisir une valeur.</span>
          )}
        </div>
        <div>
          <label>Surface par praticien (m²)</label>
          <input
            name="surfPraticien"
            className={errors.surfPraticien && "error"}
            defaultValue={specialite.surfPraticien}
            ref={register}
          />
          {errors.surfPraticien && (
            <span className="danger">Merci de saisir une valeur.</span>
          )}
        </div>
        <button type="submit" form="form-update-specialite" value="">
          Valider les modifications
        </button>
      </form>
    </div>
  );
}
