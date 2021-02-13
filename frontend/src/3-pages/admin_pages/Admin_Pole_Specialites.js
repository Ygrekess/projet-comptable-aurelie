import React, { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import ModalAddSpecialite from "../components/ModalAddSpecialite";
import ReactModal from "react-modal";
import SpecialiteItem from "../components/SpecialiteItem";
import ModalUpdateSpecialite from "../components/ModalUpdateSpecialite";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../components/LoadingSpinner";
import { getAllSpecialites } from "../../2-actions/specialiteActions";

export default function Admin_Pole_Specialites() {
  const poleSelected = useSelector((state) => state.poleSelected);
  const { pole } = poleSelected;

  const specialiteUpdated = useSelector((state) => state.specialiteUpdated);
  const { success } = specialiteUpdated;

  const allSpecialitesGet = useSelector((state) => state.allSpecialitesGet);
  const { loading, specialites, error } = allSpecialitesGet;

  const [addSpecialite, setAddSpecialite] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!specialites) {
      dispatch(getAllSpecialites(pole._id));
    }
    return () => {};
  }, [success]);

  return loading ? (
    <LoadingSpinner />
  ) : error ? (
    <p className="danger">{error}</p>
  ) : (
    <div className="admin-pole-specialites-page">
      <h2>Liste spécialités</h2>
      <ReactModal
        isOpen={addSpecialite}
        className="Modal-add-specialite"
        ariaHideApp={false}
        overlayClassName="Overlay-add-specialite"
        onRequestClose={() => setAddSpecialite(!addSpecialite)}
      >
        <ModalAddSpecialite />
      </ReactModal>
      <div className="pole-specialites-items-container">
        {specialites.map((specialite, i) => (
          <SpecialiteItem key={i} specialite={specialite} pole={pole} />
        ))}

        <div
          className="add-specialite-item"
          onClick={() => setAddSpecialite(!addSpecialite)}
        >
          <FiPlus size={80} />
        </div>
      </div>
    </div>
  );
}
