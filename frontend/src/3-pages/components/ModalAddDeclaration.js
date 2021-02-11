import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { IoMdArrowRoundBack } from "react-icons/io";
import {
  addDeclaration,
  getAllDeclarations,
  resetSuccessDeclaration,
} from "../../2-actions/declarationActions";
import { useDispatch, useSelector } from "react-redux";
import Notifications, { notify } from "react-notify-toast";

export default function ModalAddDeclaration({ pole }) {
  const { register, handleSubmit, reset, errors } = useForm({});

  const declarationAdd = useSelector((state) => state.declarationAdd);
  const { loading, success, error } = declarationAdd;

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    const declaration = {
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
    dispatch(addDeclaration(pole._id, declaration));
  };

  useEffect(() => {
    if (success) {
      notify.show(
        "La déclaration a bien été créée !",
        "success",
        2000,
        "#0E1717"
      );
      reset({});
      dispatch(resetSuccessDeclaration());
      dispatch(getAllDeclarations(pole._id));
    }
    return () => {};
  }, [success]);

  return (
    <div className="modal-add-declaration">
      <form
        id="form-add-declaration"
        className="form-add-declaration"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2>Déclaration</h2>
        <div>
          <label>Loyer (€)</label>
          <input
            name="loyer"
            className={errors.loyer && "error"}
            defaultValue={""}
            ref={register}
          />
        </div>
        <div>
          <label>Electricité (€)</label>
          <input
            name="electricite"
            className={errors.electricite && "error"}
            defaultValue={""}
            ref={register}
          />
        </div>
        <div>
          <label>Eau (€)</label>
          <input
            name="eau"
            className={errors.eau && "error"}
            defaultValue={""}
            ref={register}
          />
        </div>
        <div>
          <label>Fournitures administratives (€)</label>
          <input
            name="fournAdmin"
            className={errors.fournAdmin && "error"}
            defaultValue={""}
            ref={register}
          />
        </div>
        <div>
          <label>Fournitures entretien (€)</label>
          <input
            name="fournEntr"
            className={errors.fournEntr && "error"}
            defaultValue={""}
            ref={register}
          />
        </div>
        <div>
          <label>Ménage/entretien et réparations (€)</label>
          <input
            name="menage"
            className={errors.menage && "error"}
            defaultValue={""}
            ref={register}
          />
        </div>
        <div>
          <label>Assurance (€)</label>
          <input
            name="assurance"
            className={errors.assurance && "error"}
            defaultValue={""}
            ref={register}
          />
        </div>
        <div>
          <label>Honoraires (€)</label>
          <input
            name="honoraires"
            className={errors.honoraires && "error"}
            defaultValue={""}
            ref={register}
          />
        </div>
        <div>
          <label>Annonces et insertions (€)</label>
          <input
            name="annoncesInsertions"
            className={errors.annoncesInsertions && "error"}
            defaultValue={""}
            ref={register}
          />
        </div>
        <div>
          <label>Frais postaux (€)</label>
          <input
            name="fraisPostaux"
            className={errors.fraisPostaux && "error"}
            defaultValue={""}
            ref={register}
          />
        </div>
        <div>
          <label>Internet et téléphone (€)</label>
          <input
            name="internetTelephone"
            className={errors.internetTelephone && "error"}
            defaultValue={""}
            ref={register}
          />
        </div>
        <div>
          <label>Frais bancaires (€)</label>
          <input
            name="fraisBancaires"
            className={errors.fraisBancaires && "error"}
            defaultValue={""}
            ref={register}
          />
        </div>
        <div>
          <label>CFE (€)</label>
          <input
            name="cfe"
            className={errors.cfe && "error"}
            defaultValue={""}
            ref={register}
          />
        </div>
        <div>
          <label>Réception/déplacement (€)</label>
          <input
            name="receptionDeplacement"
            className={errors.receptionDeplacement && "error"}
            defaultValue={""}
            ref={register}
          />
        </div>
        <div>
          <label>Petit équipement (€)</label>
          <input
            name="petitEquipement"
            className={errors.petitEquipement && "error"}
            defaultValue={""}
            ref={register}
          />
        </div>
        <button type="submit" form="form-add-declaration" value="">
          Valider
        </button>
      </form>
    </div>
  );
}
