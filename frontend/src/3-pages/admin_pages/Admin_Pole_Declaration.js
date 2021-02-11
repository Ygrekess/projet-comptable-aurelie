import React, { useEffect, useState } from "react";
import DeclarationItem from "../components/DeclarationItem";
import { FiPlus } from "react-icons/fi";
import ModalAddDeclaration from "../components/ModalAddDeclaration";
import ReactModal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { getAllDeclarations } from "../../2-actions/declarationActions";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Admin_Pole_Declaration() {
  const allDeclarationsGet = useSelector((state) => state.allDeclarationsGet);
  const { loading, declarations, error } = allDeclarationsGet;

  const poleSelected = useSelector((state) => state.poleSelected);
  const { pole } = poleSelected;

  const declarationUpdated = useSelector((state) => state.declarationUpdated);
  const { success } = declarationUpdated;

  const [addDeclaration, setAddDeclaration] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllDeclarations(pole._id));
    return () => {};
  }, [success]);

  return loading ? (
    <LoadingSpinner />
  ) : error ? (
    <p className="danger">{error}</p>
  ) : (
    <div className="admin-pole-declaration-page">
      <h2>Déclarations</h2>
      {addDeclaration && (
        <ReactModal
          isOpen={addDeclaration}
          className="Modal-add-declaration"
          ariaHideApp={false}
          overlayClassName="Overlay-add-declaration"
          onRequestClose={() => setAddDeclaration(!addDeclaration)}
        >
          <ModalAddDeclaration pole={pole} />
        </ReactModal>
      )}
      <div className="pole-declarations-items-container">
        {declarations.map((declaration, i) => (
          <DeclarationItem key={i} declaration={declaration} pole={pole} />
        ))}
        <div
          className="add-declaration-item"
          onClick={() => setAddDeclaration(!addDeclaration)}
        >
          <FiPlus size={80} />
        </div>
      </div>
    </div>
  );
}
