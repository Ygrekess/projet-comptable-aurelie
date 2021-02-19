import React from "react";
import "../../4-css/Dashboard.css";
import { VscAccount } from "react-icons/vsc";
import { BsPencilSquare, BsFileText } from "react-icons/bs";
import { RiLineChartLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../2-actions/userActions";

export default function User_Dashboard() {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <div className="user-dashboard page">
      <div className="userInfos-page-header">
        <h1>Mon compte</h1>
        <button onClick={() => logoutHandler()}>Logout</button>
      </div>
      <div className="menu-container">
        <div className="menu-item">
          <Link to="/dashboard/mon-compte">
            <div className="icon-title">
              <VscAccount size={80} />
              <h6>Infos compte</h6>
            </div>
          </Link>
        </div>
        <div className="menu-item">
          <Link to="/dashboard/declaration">
            <div className="icon-title">
              <BsPencilSquare size={80} />
              <h6>Saisir ma déclaration</h6>
            </div>
          </Link>
        </div>
        <div className="menu-item">
          <Link to="#">
            <div className="icon-title">
              <BsFileText size={80} />
              <h6>Mes déclarations</h6>
            </div>
          </Link>
        </div>
        <div className="menu-item">
          <Link to="#">
            <div className="icon-title">
              <RiLineChartLine size={80} />
              <h6>Analyse</h6>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
