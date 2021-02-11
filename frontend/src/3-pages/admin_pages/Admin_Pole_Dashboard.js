import React, { Fragment, useEffect, useState } from "react";
import PoleItem from "../components/PoleItem";
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import ModalAddPole from "../components/ModalAddPole";
import ReactModal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { getAllPole } from "../../2-actions/poleActions";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Admin_Pole_Dashboard(props) {
  const [addPole, setAddPole] = useState(false);
  const dispatch = useDispatch();

  const allPolesGet = useSelector((state) => state.allPolesGet);
  const { loading, poles, error } = allPolesGet;

  const poleAdd = useSelector((state) => state.poleAdd);
  const { success } = poleAdd;

  useEffect(() => {
    dispatch(getAllPole());
    return () => {};
  }, [success]);

  return (
    <div className="admin-pole-dashboard">
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <p className="danger">{error}</p>
      ) : (
        <Fragment>
          <ReactModal
            isOpen={addPole}
            className="Modal-add-pole"
            ariaHideApp={false}
            overlayClassName="Overlay-add-pole"
            onRequestClose={() => setAddPole(!addPole)}
          >
            <ModalAddPole />
          </ReactModal>
          <div className="arrow-header">
            <Link to={"/dashboard/admin/"}>
              <IoMdArrowRoundBack className="arrow-back" size={40} />
            </Link>
            <h1>Liste des pôles</h1>
          </div>
          <div className="admin-pole-items-container">
            {poles.map((pole, i) => (
              <PoleItem key={i} pole={pole} />
            ))}
            <div className="add-pole-item" onClick={() => setAddPole(!addPole)}>
              <FiPlus size={80} />
            </div>
          </div>
        </Fragment>
      )}
    </div>
  );
}
