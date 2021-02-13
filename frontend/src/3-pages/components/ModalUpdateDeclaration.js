import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllDeclarations,
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
      loyer: {
        total: data.loyer,
        fixe: data.loyerFixe,
        repartition: data.loyerRep,
      },
      electricite: {
        total: data.electricite,
        fixe: data.electriciteFixe,
        repartition: data.electriciteRep,
      },
      eau: {
        total: data.eau,
        fixe: data.eauFixe,
        repartition: data.eauRep,
      },
      fournAdmin: {
        total: data.fournAdmin,
        fixe: data.fournAdmin,
        repartition: data.fournAdminRep,
      },
      fournEntr: {
        total: data.fournEntr,
        fixe: data.fournEntrFixe,
        repartition: data.fournEntrRep,
      },
      menage: {
        total: data.menage,
        fixe: data.menageFixe,
        repartition: data.menageRep,
      },
      assurance: {
        total: data.assurance,
        fixe: data.assuranceFixe,
        repartition: data.assuranceRep,
      },
      honoraires: {
        total: data.honoraires,
        fixe: data.honorairesFixe,
        repartition: data.honorairesRep,
      },
      annoncesInsertions: {
        total: data.annoncesInsertions,
        fixe: data.annoncesInsertionsFixe,
        repartition: data.annoncesInsertionsRep,
      },
      fraisPostaux: {
        total: data.fraisPostaux,
        fixe: data.fraisPostauxFixe,
        repartition: data.fraisPostauxRep,
      },
      internetTelephone: {
        total: data.internetTelephone,
        fixe: data.internetTelephoneFixe,
        repartition: data.internetTelephoneRep,
      },
      fraisBancaires: {
        total: data.fraisBancaires,
        fixe: data.fraisBancairesFixe,
        repartition: data.fraisBancairesRep,
      },
      cfe: {
        total: data.cfe,
        fixe: data.cfeFixe,
        repartition: data.cfeRep,
      },
      receptionDeplacement: {
        total: data.receptionDeplacement,
        fixe: data.receptionDeplacementFixe,
        repartition: data.receptionDeplacementRep,
      },
      petitEquipement: {
        total: data.petitEquipement,
        fixe: data.petitEquipementFixe,
        repartition: data.petitEquipementRep,
      },
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
      dispatch(getAllDeclarations(pole._id));
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
          <div>
            <label>Loyer (€)</label>
            <input
              name="loyer"
              className={errors.loyer && "error"}
              defaultValue={declaration.loyer.total}
              ref={register}
            />
          </div>
          <div>
            <label>Dont fixe (€)</label>
            <input
              name="loyerFixe"
              className={errors.loyerFixe && "error"}
              defaultValue={declaration.loyer.fixe}
              ref={register}
            />
          </div>
          <div>
            <label htmlFor="loyerRep">Mode de répartition</label>
            <select
              name="loyerRep"
              id="loyerRep"
              defaultValue={declaration.loyer.repartition}
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
              defaultValue={declaration.electricite.total}
              ref={register}
            />
          </div>
          <div>
            <label>Dont fixe (€)</label>
            <input
              name="electriciteFixe"
              className={errors.electriciteFixe && "error"}
              defaultValue={declaration.electricite.fixe}
              ref={register}
            />
          </div>
          <div>
            <label htmlFor="electriciteRep">Mode de répartition</label>
            <select
              name="electriciteRep"
              id="electriciteRep"
              ref={register}
              defaultValue={declaration.electricite.repartition}
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
              defaultValue={declaration.eau.total}
              ref={register}
            />
          </div>
          <div>
            <label>Dont fixe (€)</label>
            <input
              name="eauFixe"
              className={errors.eauFixe && "error"}
              defaultValue={declaration.eau.fixe}
              ref={register}
            />
          </div>
          <div>
            <label htmlFor="eauRep">Mode de répartition</label>
            <select
              name="eauRep"
              id="eauRep"
              ref={register}
              defaultValue={declaration.eau.repartition}
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
              defaultValue={declaration.fournAdmin.total}
              ref={register}
            />
          </div>
          <div>
            <label>Dont fixe (€)</label>
            <input
              name="fournAdminFixe"
              className={errors.fournAdminFixe && "error"}
              defaultValue={declaration.fournAdmin.fixe}
              ref={register}
            />
          </div>
          <div>
            <label htmlFor="fournAdminRep">Mode de répartition</label>
            <select
              name="fournAdminRep"
              id="fournAdminRep"
              ref={register}
              defaultValue={declaration.fournAdmin.repartition}
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
              defaultValue={declaration.fournEntr.total}
              ref={register}
            />
          </div>
          <div>
            <label>Dont fixe (€)</label>
            <input
              name="fournEntrFixe"
              className={errors.fournEntrFixe && "error"}
              defaultValue={declaration.fournEntr.fixe}
              ref={register}
            />
          </div>
          <div>
            <label htmlFor="fournEntrRep">Mode de répartition</label>
            <select
              name="fournEntrRep"
              id="fournEntrRep"
              ref={register}
              defaultValue={declaration.fournEntr.repartition}
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
              defaultValue={declaration.menage.total}
              ref={register}
            />
          </div>
          <div>
            <label>Dont fixe (€)</label>
            <input
              name="menageFixe"
              className={errors.menageFixe && "error"}
              defaultValue={declaration.menage.fixe}
              ref={register}
            />
          </div>
          <div>
            <label htmlFor="menageRep">Mode de répartition</label>
            <select
              name="menageRep"
              id="menageRep"
              ref={register}
              defaultValue={declaration.menage.repartition}
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
              defaultValue={declaration.assurance.total}
              ref={register}
            />
          </div>
          <div>
            <label>Dont fixe (€)</label>
            <input
              name="assuranceFixe"
              className={errors.assuranceFixe && "error"}
              defaultValue={declaration.assurance.fixe}
              ref={register}
            />
          </div>
          <div>
            <label htmlFor="assuranceRep">Mode de répartition</label>
            <select
              name="assuranceRep"
              id="assuranceRep"
              ref={register}
              defaultValue={declaration.assurance.repartition}
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
              defaultValue={declaration.honoraires.total}
              ref={register}
            />
          </div>
          <div>
            <label>Dont fixe (€)</label>
            <input
              name="honorairesFixe"
              className={errors.honorairesFixe && "error"}
              defaultValue={declaration.honoraires.fixe}
              ref={register}
            />
          </div>
          <div>
            <label htmlFor="honorairesRep">Mode de répartition</label>
            <select
              name="honorairesRep"
              id="honorairesRep"
              ref={register}
              defaultValue={declaration.honoraires.repartition}
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
              defaultValue={declaration.annoncesInsertions.total}
              ref={register}
            />
          </div>
          <div>
            <label>Dont fixe (€)</label>
            <input
              name="annoncesInsertionsFixe"
              className={errors.annoncesInsertionsFixe && "error"}
              defaultValue={declaration.annoncesInsertions.fixe}
              ref={register}
            />
          </div>
          <div>
            <label htmlFor="annoncesInsertionsRep">Mode de répartition</label>
            <select
              name="annoncesInsertionsRep"
              id="annoncesInsertionsRep"
              ref={register}
              defaultValue={declaration.annoncesInsertions.repartition}
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
              defaultValue={declaration.fraisPostaux.total}
              ref={register}
            />
          </div>
          <div>
            <label>Dont fixe (€)</label>
            <input
              name="fraisPostauxFixe"
              className={errors.fraisPostauxFixe && "error"}
              defaultValue={declaration.fraisPostaux.fixe}
              ref={register}
            />
          </div>
          <div>
            <label htmlFor="fraisPostauxRep">Mode de répartition</label>
            <select
              name="fraisPostauxRep"
              id="fraisPostauxRep"
              ref={register}
              defaultValue={declaration.fraisPostaux.repartition}
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
              defaultValue={declaration.internetTelephone.total}
              ref={register}
            />
          </div>
          <div>
            <label>Dont fixe (€)</label>
            <input
              name="internetTelephoneFixe"
              className={errors.internetTelephoneFixe && "error"}
              defaultValue={declaration.internetTelephone.fixe}
              ref={register}
            />
          </div>
          <div>
            <label htmlFor="internetTelephoneRep">Mode de répartition</label>
            <select
              name="internetTelephoneRep"
              id="internetTelephoneRep"
              ref={register}
              defaultValue={declaration.internetTelephone.repartition}
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
              defaultValue={declaration.fraisBancaires.total}
              ref={register}
            />
          </div>
          <div>
            <label>Dont fixe (€)</label>
            <input
              name="fraisBancairesFixe"
              className={errors.fraisBancairesFixe && "error"}
              defaultValue={declaration.fraisBancaires.fixe}
              ref={register}
            />
          </div>
          <div>
            <label htmlFor="fraisBancairesRep">Mode de répartition</label>
            <select
              name="fraisBancairesRep"
              id="fraisBancairesRep"
              ref={register}
              defaultValue={declaration.fraisBancaires.repartition}
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
              defaultValue={declaration.cfe.total}
              ref={register}
            />
          </div>
          <div>
            <label>Dont fixe (€)</label>
            <input
              name="cfeFixe"
              className={errors.cfeFixe && "error"}
              defaultValue={declaration.cfe.fixe}
              ref={register}
            />
          </div>
          <div>
            <label htmlFor="cfeRep">Mode de répartition</label>
            <select
              name="cfeRep"
              id="cfeRep"
              ref={register}
              defaultValue={declaration.cfe.repartition}
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
              defaultValue={declaration.receptionDeplacement.total}
              ref={register}
            />
          </div>
          <div>
            <label>Dont fixe (€)</label>
            <input
              name="receptionDeplacementFixe"
              className={errors.receptionDeplacementFixe && "error"}
              defaultValue={declaration.receptionDeplacement.fixe}
              ref={register}
            />
          </div>
          <div>
            <label htmlFor="receptionDeplacementRep">Mode de répartition</label>
            <select
              name="receptionDeplacementRep"
              id="receptionDeplacementRep"
              ref={register}
              defaultValue={declaration.receptionDeplacement.repartition}
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
              defaultValue={declaration.petitEquipement.total}
              ref={register}
            />
          </div>
          <div>
            <label>Dont fixe (€)</label>
            <input
              name="petitEquipementFixe"
              className={errors.petitEquipementFixe && "error"}
              defaultValue={declaration.petitEquipement.fixe}
              ref={register}
            />
          </div>
          <div>
            <label htmlFor="petitEquipementRep">Mode de répartition</label>
            <select
              name="petitEquipementRep"
              id="petitEquipementRep"
              ref={register}
              defaultValue={declaration.petitEquipement.repartition}
            >
              <option value="coefSurface">Coef surface</option>
              <option value="partsEgales">Parts égales</option>
              <option value="ponderation">Pondération</option>
              <option value="recettes">% recettes</option>
              <option value="libre">Libre</option>
            </select>
          </div>
        </div>
        <button type="submit" form="form-update-declaration" value="">
          Valider les modifications
        </button>
      </form>
    </div>
  );
}
