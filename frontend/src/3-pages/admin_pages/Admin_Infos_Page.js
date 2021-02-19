import React, { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import "../../4-css/User_Infos.css";

import GoBack from "../components/GoBack";
import FormUser from "../components/FormUser";
import FormUpdatePassword from "../components/FormUpdatePassword";

export default function Admin_Infos_Page() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfos: userLoginInfos } = userLogin;

  return (
    <div className="user-infos-component">
      <Fragment>
        <GoBack link={"/dashboard/admin"} pageName={"Mon compte"} />
        <FormUser userLogin={userLoginInfos} />
        <FormUpdatePassword userLogin={userLoginInfos} />
      </Fragment>
    </div>
  );
}
