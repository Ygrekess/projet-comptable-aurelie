import React, { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { CgDanger } from "react-icons/cg";
import {
  getInfos,
  updateInfos,
  userSuccessReset,
} from "../../2-actions/userActions";
import LoadingSpinner from "./LoadingSpinner";

export default function FormUser({ userLogin }) {
  const [successUpdate, setSuccessUpdate] = useState("");
  const [errorUpdate, setErrorUpdate] = useState("");
  const userUpdate = useSelector((state) => state.userUpdate);
  const { success, error: userUpdateError } = userUpdate;

  const userInfos = useSelector((state) => state.userInfos);
  const { loading, user, error } = userInfos;

  const dispatch = useDispatch();

  const { register, handleSubmit, errors } = useForm();

  const submitInfos = (data) => {
    const userUpdate = {
      _id: userLogin._id,
      lastname: data.lastname,
      firstname: data.firstname,
      phone: data.phone,
      email: data.email,
    };
    dispatch(updateInfos(userUpdate, userLogin.token));
  };

  useEffect(() => {
    if (success) {
      setTimeout(() => setSuccessUpdate(""), 2000);
      setSuccessUpdate("Votre profil a été mis à jour !");
      dispatch(getInfos(userLogin._id, userLogin.token));
      dispatch(userSuccessReset());
    }
    if (userUpdateError) {
      setErrorUpdate(userUpdateError);
    }
    return () => {};
  }, [success, userUpdateError, user]);

  return (
    <form
      id="form-user-infos"
      className="form-user-infos"
      onSubmit={handleSubmit(submitInfos)}
      onChange={() => setErrorUpdate("")}
    >
      <h2>Infos perso</h2>
      <Fragment>
        <div>
          <label htmlFor="lastname" className="">
            Nom
          </label>
          <input
            name="lastname"
            placeholder=""
            defaultValue={loading ? "" : user.lastname}
            ref={register()}
          />
        </div>
        <div>
          <label htmlFor="firstname" className="">
            Prénom
          </label>
          <input
            name="firstname"
            placeholder=""
            defaultValue={loading ? "" : user.firstname}
            ref={register()}
          />
        </div>
        <div>
          <label htmlFor="phone" className="">
            Téléphone
          </label>
          <input
            name="phone"
            placeholder=""
            defaultValue={loading ? "" : user.phone}
            ref={register()}
          />
        </div>
        <div>
          <label htmlFor="email" className="">
            Email<span className="">*</span>
          </label>
          <input
            className={+(errors.email ? "" : "")}
            name="email"
            placeholder=""
            ref={register({
              validate: (value) => value !== "",
            })}
            defaultValue={loading ? "" : user.email}
          />
          {errors.email && (
            <div className="">
              <CgDanger size={20} />
              <p className="">Merci de renseigner votre nom.</p>
            </div>
          )}
        </div>
      </Fragment>
      <div className="form-button-user-infos">
        <button form="form-user-infos">Mettre à jour</button>
      </div>
      {errorUpdate ? <p className="danger">{errorUpdate}</p> : ""}
      {successUpdate ? <p className="success">{successUpdate}</p> : ""}
    </form>
  );
}
