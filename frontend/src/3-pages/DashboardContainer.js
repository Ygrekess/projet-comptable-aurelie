import React, { useEffect } from "react";
import Admin_Dashboard from "./admin_pages/Admin_Dashboard";
import User_Dashboard from "./user_pages/User_Dashboard";
import "../4-css/Dashboard.css";
import { Route } from "react-router-dom";
import UserInfos_Page from "./user_pages/UserInfos_Page";
import Admin_Pole_Dashboard from "./admin_pages/Admin_Pole_Dashboard";
import Admin_Pole_Page from "./admin_pages/Admin_Pole_Page";
import { useDispatch, useSelector } from "react-redux";
import { getInfos } from "../2-actions/userActions";
import Admin_Infos_Page from "./admin_pages/Admin_Infos_Page";

export default function DashboardContainer(props) {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfos: userLoginInfos } = userLogin;

  const userInfos = useSelector((state) => state.userInfos);
  const { loading, user, error } = userInfos;

  useEffect(() => {
    if (!userLoginInfos) {
      props.history.push("/connexion");
    }
    if (userLoginInfos) {
      if (!user) {
        dispatch(getInfos(userLoginInfos._id, userLoginInfos.token));
      }
    }
    return () => {};
  }, [userLoginInfos]);

  return userLoginInfos ? (
    <div className="dashboard-container">
      <Route path="/dashboard" exact component={User_Dashboard} />
      <Route path="/dashboard/admin" exact component={Admin_Dashboard} />
      <Route path="/dashboard/admin/mon-compte" component={Admin_Infos_Page} />
      <Route path="/dashboard/mon-compte" component={UserInfos_Page} />
      <Route
        path="/dashboard/admin/mes-poles"
        exact
        component={Admin_Pole_Dashboard}
      />
      <Route
        path="/dashboard/admin/mes-poles/:id"
        component={Admin_Pole_Page}
      />
    </div>
  ) : null;
}
