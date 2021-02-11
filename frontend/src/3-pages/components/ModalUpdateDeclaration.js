import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  resetSuccessDeclaration,
  updateDeclaration,
} from "../../2-actions/declarationActions";
import Notifications, { notify } from "react-notify-toast";

export default function ModalUpdateDeclaration({ declaration, pole }) {
  const { register, handleSubmit, errors } = useForm({});

  const declarationUpdated = useSelector((state) => state.declarationUpdated);
  const { success } = declarationUpdated;

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    const declarationUpdated = {
      pole: pole._id,
      loyer: data.loyer,
      electricite: data.electricite,
      eau: data.eau,
      fournAdmin: data.fournAdmin,
      fournEntr: data.fournEntr,
      menage: data.menage,
      assurance: data.assurance,
      honoraires: data.honoraires,
      annoncesInsertions: data.annoncesInsertions,
      fraisPostaux: data.fraisPostaux,
      internetTelephone: data.internetTelephone,
      fraisBancaires: data.fraisBancaires,
      cfe: data.cfe,
      receptionDeplacement: data.receptionDeplacement,
      petitEquipement: data.petitEquipement,
    };
    dispatch(updateDeclaration(declaration._id, declarationUpdated));
  };

  useEffect(() => {
    if (success) {
      notify.show(
        "Les modifications ont été enregistrées !",
        "success",
        1000,
        "#0E1717"
      );
      dispatch(resetSuccessDeclaration());
    }
    return () => {};
  }, [success]);
  return (
    <div className="modal-update-declaration">
      <form
        id="form-update-declaration"
        className="form-update-declaration"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Notifications />
        <h2>Déclaration</h2>
        <div>
          <label>Loyer (€)</label>
          <input
            name="loyer"
            className={errors.loyer && "error"}
            defaultValue={declaration.loyer}
            ref={register}
          />
        </div>
        <div>
          <label>Electricité (€)</label>
          <input
            name="electricite"
            className={errors.electricite && "error"}
            defaultValue={declaration.electricite}
            ref={register}
          />
        </div>
        <div>
          <label>Eau (€)</label>
          <input
            name="eau"
            className={errors.eau && "error"}
            defaultValue={declaration.eau}
            ref={register}
          />
        </div>
        <div>
          <label>Fournitures administratives (€)</label>
          <input
            name="fournAdmin"
            className={errors.fournAdmin && "error"}
            defaultValue={declaration.fournAdmin}
            ref={register}
          />
        </div>
        <div>
          <label>Fournitures entretien (€)</label>
          <input
            name="fournEntr"
            className={errors.fournEntr && "error"}
            defaultValue={declaration.fournEntr}
            ref={register}
          />
        </div>
        <div>
          <label>Ménage/entretien et réparations (€)</label>
          <input
            name="menage"
            className={errors.menage && "error"}
            defaultValue={declaration.menage}
            ref={register}
          />
        </div>
        <div>
          <label>Assurance (€)</label>
          <input
            name="assurance"
            className={errors.assurance && "error"}
            defaultValue={declaration.assurance}
            ref={register}
          />
        </div>
        <div>
          <label>Honoraires (€)</label>
          <input
            name="honoraires"
            className={errors.honoraires && "error"}
            defaultValue={declaration.honoraires}
            ref={register}
          />
        </div>
        <div>
          <label>Annonces et insertions (€)</label>
          <input
            name="annoncesInsertions"
            className={errors.annoncesInsertions && "error"}
            defaultValue={declaration.annoncesInsertions}
            ref={register}
          />
        </div>
        <div>
          <label>Frais postaux (€)</label>
          <input
            name="fraisPostaux"
            className={errors.fraisPostaux && "error"}
            defaultValue={declaration.fraisPostaux}
            ref={register}
          />
        </div>
        <div>
          <label>Internet et téléphone (€)</label>
          <input
            name="internetTelephone"
            className={errors.internetTelephone && "error"}
            defaultValue={declaration.internetTelephone}
            ref={register}
          />
        </div>
        <div>
          <label>Frais bancaires (€)</label>
          <input
            name="fraisBancaires"
            className={errors.fraisBancaires && "error"}
            defaultValue={declaration.fraisBancaires}
            ref={register}
          />
        </div>
        <div>
          <label>CFE (€)</label>
          <input
            name="cfe"
            className={errors.cfe && "error"}
            defaultValue={declaration.cfe}
            ref={register}
          />
        </div>
        <div>
          <label>Réception/déplacement (€)</label>
          <input
            name="receptionDeplacement"
            className={errors.receptionDeplacement && "error"}
            defaultValue={declaration.receptionDeplacement}
            ref={register}
          />
        </div>
        <div>
          <label>Petit équipement (€)</label>
          <input
            name="petitEquipement"
            className={errors.petitEquipement && "error"}
            defaultValue={declaration.petitEquipement}
            ref={register}
          />
        </div>
        <button type="submit" form="form-update-declaration" value="">
          Valider
        </button>
      </form>
    </div>
  );
}
