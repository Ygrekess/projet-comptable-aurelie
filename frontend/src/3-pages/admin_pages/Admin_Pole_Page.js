import React, { Fragment, useEffect, useState } from "react";
import { Link, Route } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import AdminPolePageMenu from "../components/AdminPolePageMenu";
import Admin_Pole_Infos from "./Admin_Pole_Infos";
import Admin_Pole_Specialites from "./Admin_Pole_Specialites";
import Admin_Pole_Analyse from "./Admin_Pole_Analyse";
import Admin_Pole_Declaration from "./Admin_Pole_Declaration";
import { useDispatch, useSelector } from "react-redux";
import { getOnePole, resetSuccessPole } from "../../2-actions/poleActions";
import LoadingSpinner from "../components/LoadingSpinner";
import Notifications, { notify } from "react-notify-toast";
import tableTest from "./tableTest";
import GoBack from "../components/GoBack";

export default function Admin_Pole_Page(props) {
  let [compteur, setCompteur] = useState(0);

  const poleSelected = useSelector((state) => state.poleSelected);
  const { loading, pole, error } = poleSelected;

  const poleUpdated = useSelector((state) => state.poleUpdated);
  const { success: poleUpdatedSuccess } = poleUpdated;

  const dispatch = useDispatch();

  useEffect(() => {
    if (poleUpdatedSuccess) {
      notify.show(
        "Les modifications ont été enregistrées !",
        "success",
        2500,
        "#0E1717"
      );
      dispatch(getOnePole(props.match.params.id));
      dispatch(resetSuccessPole());
    }
    if (compteur < 1) {
      dispatch(getOnePole(props.match.params.id));
    }
    setCompteur(compteur + 1);
    return () => {};
  }, [poleUpdatedSuccess]);
  return (
    <div className="admin-pole-page">
      <Notifications />
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <p className="danger">{error}</p>
      ) : (
        <Fragment>
          {/*           <GoBack link={"/dashboard/admin"} pageName={"Mon compte"} />
           */}
          <div className="admin-pole-page-body">
            <AdminPolePageMenu pole={pole} />
            <Route
              path="/dashboard/admin/mes-poles/:id/infos"
              component={Admin_Pole_Infos}
            />
            <Route
              path="/dashboard/admin/mes-poles/:id/declarations"
              component={Admin_Pole_Declaration}
            />
            <Route
              path="/dashboard/admin/mes-poles/:id/specialites"
              component={Admin_Pole_Specialites}
            />
            <Route
              path="/dashboard/admin/mes-poles/:id/analyse/:declarationId?"
              component={Admin_Pole_Analyse}
            />
          </div>
        </Fragment>
      )}
    </div>
  );
}
