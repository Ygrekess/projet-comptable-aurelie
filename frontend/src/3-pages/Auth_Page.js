import React, { useEffect, useState } from "react";
import RegisterForm from "./components/RegisterForm";
import "../4-css/Auth_Page.css";
import { useDispatch, useSelector } from "react-redux";
import SigninForm from "./components/SigninForm";
import { getInfos } from "../2-actions/userActions";

export default function Auth_Page(props) {
  const [form, setForm] = useState("register");
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfos: userLoginInfos } = userLogin;

  const userInfos = useSelector((state) => state.userInfos);
  const { loading, user, error } = userInfos;

  useEffect(() => {
    if (userLoginInfos) {
      if (!user) {
        dispatch(getInfos(userLoginInfos._id, userLoginInfos.token));
      }
      if (user) {
        if (!user.isAdmin) {
          props.history.push("/dashboard");
        } else {
          props.history.push("/dashboard/admin");
        }
      }
    }
    return () => {};
  }, [userLoginInfos, user]);

  return (
    <div className="auth_page">
      <div className={"form-container " + form}>
        <RegisterForm props={props} />
        <div className="btn-signin">
          <label>Déjà un compte ?</label>
          <button className="" onClick={() => setForm("signin")}>
            Me connecter
          </button>
        </div>

        <div className="btn-register">
          <label>Pas encore de compte ?</label>
          <button className="" onClick={() => setForm("register")}>
            M'inscrire
          </button>
        </div>
        <SigninForm props={props} />
      </div>
    </div>
  );
}
