import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../../4-css/Dashboard.css";
import { VscAccount } from "react-icons/vsc";
import { BsPencilSquare } from "react-icons/bs";
import { getInfos, logout } from "../../2-actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Admin_Dashboard(props) {
  const userInfos = useSelector((state) => state.userInfos);
  const { loading, user, error } = userInfos;

  useEffect(() => {
    return () => {};
  }, []);
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout());
  };
  return loading ? (
    <LoadingSpinner />
  ) : error ? (
    <p className="danger">{error.message}</p>
  ) : (
    <div className="admin-dashboard page">
      <div className="userInfos-page-header">
        <h1>Mon compte</h1>
        <button onClick={() => logoutHandler()}>Logout</button>
      </div>{" "}
      <div className="menu-container">
        <div className="menu-item">
          <Link to="/dashboard/admin/mon-compte">
            <div className="icon-title">
              <VscAccount size={80} />
              <h6>Infos compte</h6>
            </div>
          </Link>
        </div>
        <div className="menu-item">
          <Link to="/dashboard/admin/mes-poles">
            <div className="icon-title">
              <BsPencilSquare size={80} />
              <h6>Mes pôles santé</h6>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
