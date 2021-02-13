import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import ReactModal from "react-modal";
import ModalUpdateDeclaration from "./ModalUpdateDeclaration";
import { formatDate } from "../../utils";

export default function DeclarationItem({ declaration, pole }) {
  const [updateDeclaration, setUpdateDeclaration] = useState(false);
  return (
    <Fragment>
      <ReactModal
        isOpen={updateDeclaration}
        className="Modal-update-declaration"
        ariaHideApp={false}
        overlayClassName="Overlay-update-declaration"
        onRequestClose={() => setUpdateDeclaration(!updateDeclaration)}
      >
        <ModalUpdateDeclaration declaration={declaration} pole={pole} />
      </ReactModal>
      <Link
        to={`/dashboard/admin/mes-poles/${pole._id}/declarations/${declaration._id}`}
        className="declaration-item"
        onClick={() => setUpdateDeclaration(!updateDeclaration)}
      >
        <h3>Déclaration</h3>
        <h6>{formatDate(declaration.date)}</h6>
      </Link>
    </Fragment>
  );
}
