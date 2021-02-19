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
      loyer: {
        total: data.loyer,
        repartition: data.loyerRep,
      },
      electricite: {
        total: data.electricite,
        repartition: data.electriciteRep,
      },
      eau: {
        total: data.eau,
        repartition: data.eauRep,
      },
      fournAdmin: {
        total: data.fournAdmin,
        repartition: data.fournAdminRep,
      },
      fournEntr: {
        total: data.fournEntr,
        repartition: data.fournEntrRep,
      },
      menage: {
        total: data.menage,
        repartition: data.menageRep,
      },
      assurance: {
        total: data.assurance,
        repartition: data.assuranceRep,
      },
      honoraires: {
        total: data.honoraires,
        repartition: data.honorairesRep,
      },
      annoncesInsertions: {
        total: data.annoncesInsertions,
        repartition: data.annoncesInsertionsRep,
      },
      fraisPostaux: {
        total: data.fraisPostaux,
        repartition: data.fraisPostauxRep,
      },
      internetTelephone: {
        total: data.internetTelephone,
        repartition: data.internetTelephoneRep,
      },
      fraisBancaires: {
        total: data.fraisBancaires,
        repartition: data.fraisBancairesRep,
      },
      cfe: {
        total: data.cfe,
        repartition: data.cfeRep,
      },
      receptionDeplacement: {
        total: data.receptionDeplacement,
        repartition: data.receptionDeplacementRep,
      },
      petitEquipement: {
        total: data.petitEquipement,
        repartition: data.petitEquipementRep,
      },
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
      <Notifications />
      <form
        id="form-add-declaration"
        className="form-add-declaration"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2>Déclaration</h2>
        <div>
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
            <label htmlFor="loyerRep">Mode de répartition</label>
            <select
              name="loyerRep"
              id="loyerRep"
              defaultValue="coefSurface"
              ref={register}
            >
              <option value="coefSurface">Coef surface</option>
              <option value="partsEgales">Parts égales</option>
              <option value="ponderation">Pondération</option>
              <option value="recettes">% recettes</option>
              <option value="libre">Libre</option>
            </select>
          </div>
        </div>
        <div>
          <div>
            <label>Electricité (€)</label>
            <input
              name="electricite"
              className={errors.electricite && "error"}
              ref={register}
            />
          </div>
          <div>
            <label htmlFor="electriciteRep">Mode de répartition</label>
            <select
              name="electriciteRep"
              id="electriciteRep"
              ref={register}
              defaultValue="ponderation"
            >
              <option value="coefSurface">Coef surface</option>
              <option value="partsEgales">Parts égales</option>
              <option value="ponderation">Pondération</option>
              <option value="recettes">% recettes</option>
              <option value="libre">Libre</option>
            </select>
          </div>
        </div>
        <div>
          <div>
            <label>Eau (€)</label>
            <input
              name="eau"
              className={errors.eau && "error"}
              ref={register}
            />
          </div>
          <div>
            <label htmlFor="eauRep">Mode de répartition</label>
            <select
              name="eauRep"
              id="eauRep"
              ref={register}
              defaultValue="ponderation"
            >
              <option value="coefSurface">Coef surface</option>
              <option value="partsEgales">Parts égales</option>
              <option value="ponderation">Pondération</option>
              <option value="recettes">% recettes</option>
              <option value="libre">Libre</option>
            </select>
          </div>
        </div>

        <div>
          <div>
            <label>Fournitures administratives (€)</label>
            <input
              name="fournAdmin"
              className={errors.fournAdmin && "error"}
              ref={register}
            />
          </div>
          <div>
            <label htmlFor="fournAdminRep">Mode de répartition</label>
            <select
              name="fournAdminRep"
              id="fournAdminRep"
              ref={register}
              defaultValue="ponderation"
            >
              <option value="coefSurface">Coef surface</option>
              <option value="partsEgales">Parts égales</option>
              <option value="ponderation">Pondération</option>
              <option value="recettes">% recettes</option>
              <option value="libre">Libre</option>
            </select>
          </div>
        </div>

        <div>
          <div>
            <label>Fournitures entretien (€)</label>
            <input
              name="fournEntr"
              className={errors.fournEntr && "error"}
              ref={register}
            />
          </div>
          <div>
            <label htmlFor="fournEntrRep">Mode de répartition</label>
            <select
              name="fournEntrRep"
              id="fournEntrRep"
              ref={register}
              defaultValue="ponderation"
            >
              <option value="coefSurface">Coef surface</option>
              <option value="partsEgales">Parts égales</option>
              <option value="ponderation">Pondération</option>
              <option value="recettes">% recettes</option>
              <option value="libre">Libre</option>
            </select>
          </div>
        </div>

        <div>
          <div>
            <label>Ménage/entretien et réparations (€)</label>
            <input
              name="menage"
              className={errors.menage && "error"}
              ref={register}
            />
          </div>
          <div>
            <label htmlFor="menageRep">Mode de répartition</label>
            <select
              name="menageRep"
              id="menageRep"
              ref={register}
              defaultValue="ponderation"
            >
              <option value="coefSurface">Coef surface</option>
              <option value="partsEgales">Parts égales</option>
              <option value="ponderation">Pondération</option>
              <option value="recettes">% recettes</option>
              <option value="libre">Libre</option>
            </select>
          </div>
        </div>

        <div>
          <div>
            <label>Assurance (€)</label>
            <input
              name="assurance"
              className={errors.assurance && "error"}
              ref={register}
            />
          </div>
          <div>
            <label htmlFor="assuranceRep">Mode de répartition</label>
            <select
              name="assuranceRep"
              id="assuranceRep"
              ref={register}
              defaultValue="ponderation"
            >
              <option value="coefSurface">Coef surface</option>
              <option value="partsEgales">Parts égales</option>
              <option value="ponderation">Pondération</option>
              <option value="recettes">% recettes</option>
              <option value="libre">Libre</option>
            </select>
          </div>
        </div>
        <div>
          <div>
            <label>Honoraires (€)</label>
            <input
              name="honoraires"
              className={errors.honoraires && "error"}
              ref={register}
            />
          </div>
          <div>
            <label htmlFor="honorairesRep">Mode de répartition</label>
            <select
              name="honorairesRep"
              id="honorairesRep"
              ref={register}
              defaultValue="ponderation"
            >
              <option value="coefSurface">Coef surface</option>
              <option value="partsEgales">Parts égales</option>
              <option value="ponderation">Pondération</option>
              <option value="recettes">% recettes</option>
              <option value="libre">Libre</option>
            </select>
          </div>
        </div>

        <div>
          <div>
            <label>Annonces et insertions (€)</label>
            <input
              name="annoncesInsertions"
              className={errors.annoncesInsertions && "error"}
              ref={register}
            />
          </div>
          <div>
            <label htmlFor="annoncesInsertionsRep">Mode de répartition</label>
            <select
              name="annoncesInsertionsRep"
              id="annoncesInsertionsRep"
              ref={register}
              defaultValue="ponderation"
            >
              <option value="coefSurface">Coef surface</option>
              <option value="partsEgales">Parts égales</option>
              <option value="ponderation">Pondération</option>
              <option value="recettes">% recettes</option>
              <option value="libre">Libre</option>
            </select>
          </div>
        </div>

        <div>
          <div>
            <label>Frais postaux (€)</label>
            <input
              name="fraisPostaux"
              className={errors.fraisPostaux && "error"}
              ref={register}
            />
          </div>
          <div>
            <label htmlFor="fraisPostauxRep">Mode de répartition</label>
            <select
              name="fraisPostauxRep"
              id="fraisPostauxRep"
              ref={register}
              defaultValue="ponderation"
            >
              <option value="coefSurface">Coef surface</option>
              <option value="partsEgales">Parts égales</option>
              <option value="ponderation">Pondération</option>
              <option value="recettes">% recettes</option>
              <option value="libre">Libre</option>
            </select>
          </div>
        </div>

        <div>
          <div>
            <label>Internet et téléphone (€)</label>
            <input
              name="internetTelephone"
              className={errors.internetTelephone && "error"}
              ref={register}
            />
          </div>
          <div>
            <label htmlFor="internetTelephoneRep">Mode de répartition</label>
            <select
              name="internetTelephoneRep"
              id="internetTelephoneRep"
              ref={register}
              defaultValue="ponderation"
            >
              <option value="coefSurface">Coef surface</option>
              <option value="partsEgales">Parts égales</option>
              <option value="ponderation">Pondération</option>
              <option value="recettes">% recettes</option>
              <option value="libre">Libre</option>
            </select>
          </div>
        </div>

        <div>
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
            <label htmlFor="fraisBancairesRep">Mode de répartition</label>
            <select
              name="fraisBancairesRep"
              id="fraisBancairesRep"
              ref={register}
              defaultValue="ponderation"
            >
              <option value="coefSurface">Coef surface</option>
              <option value="partsEgales">Parts égales</option>
              <option value="ponderation">Pondération</option>
              <option value="recettes">% recettes</option>
              <option value="libre">Libre</option>
            </select>
          </div>
        </div>

        <div>
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
            <label htmlFor="cfeRep">Mode de répartition</label>
            <select
              name="cfeRep"
              id="cfeRep"
              ref={register}
              defaultValue="ponderation"
            >
              <option value="coefSurface">Coef surface</option>
              <option value="partsEgales">Parts égales</option>
              <option value="ponderation">Pondération</option>
              <option value="recettes">% recettes</option>
              <option value="libre">Libre</option>
            </select>
          </div>
        </div>

        <div>
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
            <label htmlFor="receptionDeplacementRep">Mode de répartition</label>
            <select
              name="receptionDeplacementRep"
              id="receptionDeplacementRep"
              ref={register}
              defaultValue="ponderation"
            >
              <option value="coefSurface">Coef surface</option>
              <option value="partsEgales">Parts égales</option>
              <option value="ponderation">Pondération</option>
              <option value="recettes">% recettes</option>
              <option value="libre">Libre</option>
            </select>
          </div>
        </div>

        <div>
          <div>
            <label>Petit équipement (€)</label>
            <input
              name="petitEquipement"
              className={errors.petitEquipement && "error"}
              defaultValue={""}
              ref={register}
            />
          </div>
          <div>
            <label htmlFor="petitEquipementRep">Mode de répartition</label>
            <select
              name="petitEquipementRep"
              id="petitEquipementRep"
              ref={register}
              defaultValue="ponderation"
            >
              <option value="coefSurface">Coef surface</option>
              <option value="partsEgales">Parts égales</option>
              <option value="ponderation">Pondération</option>
              <option value="recettes">% recettes</option>
              <option value="libre">Libre</option>
            </select>
          </div>
        </div>

        <button type="submit" form="form-add-declaration" value="">
          Valider
        </button>
      </form>
    </div>
  );
}
