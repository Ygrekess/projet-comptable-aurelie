import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import ReactModal from "react-modal";
import ModalUpdateSpecialite from "./ModalUpdateSpecialite";

export default function SpecialiteItem({ specialite, pole }) {
  const [updateSpecialite, setUpdateSpecialite] = useState(false);

  return (
    <Fragment>
      <ReactModal
        isOpen={updateSpecialite}
        className="Modal-update-specialite"
        ariaHideApp={false}
        overlayClassName="Overlay-update-specialite"
        onRequestClose={() => setUpdateSpecialite(!updateSpecialite)}
      >
        <ModalUpdateSpecialite specialite={specialite} pole={pole} />
      </ReactModal>
      <Link
        to={`/dashboard/admin/mes-poles/${pole._id}/specialites/${specialite._id}`}
        className="specialite-item"
        onClick={() => setUpdateSpecialite(!updateSpecialite)}
      >
        <h3>{specialite.name}</h3>
        <h6>Total : {specialite.nombre}</h6>
      </Link>
    </Fragment>
  );
}
