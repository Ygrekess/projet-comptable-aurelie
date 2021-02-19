import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  getInfos,
  updatePassword,
  userSuccessReset,
} from "../../2-actions/userActions";

export default function FormUpdatePassword({ userLogin }) {
  const [successUpdate, setSuccessUpdate] = useState("");
  const [errorUpdate, setErrorUpdate] = useState("");
  const dispatch = useDispatch();

  const userUpdatePassword = useSelector((state) => state.userUpdatePassword);
  const { success, error } = userUpdatePassword;

  const { register, handleSubmit, reset, errors } = useForm();
  const submitPassword = (data) => {
    const password = {
      _id: userLogin._id,
      password: data.password,
      newpassword1: data.newpassword1,
      newpassword2: data.newpassword2,
    };
    console.log(password);
    dispatch(updatePassword(password, userLogin.token));
  };

  useEffect(() => {
    if (success) {
      setTimeout(() => setSuccessUpdate(""), 2000);
      setSuccessUpdate("Votre mot de passe a été mis à jour.");
      dispatch(getInfos(userLogin._id, userLogin.token));
      dispatch(userSuccessReset());
      reset({});
    }
    if (error) {
      setErrorUpdate(error);
    }
    return () => {};
  }, [success, error]);

  return (
    <form
      id="form-update-password"
      className="form-update-password"
      onSubmit={handleSubmit(submitPassword)}
      onChange={() => setErrorUpdate("")}
    >
      <h2>Modifier mon mot de passe</h2>
      <div>
        <label htmlFor="password" className="">
          Mot de passe actuel<span className="">*</span>
        </label>
        <input
          className={errors.password ? "" : ""}
          name="password"
          placeholder=""
          ref={register()}
        />
      </div>
      <div>
        <label htmlFor="newpassword1" className="">
          Nouveau mot de passe<span className="">*</span>
        </label>
        <input
          className={errors.newpassword1 ? "" : ""}
          name="newpassword1"
          placeholder=""
          ref={register()}
        />
      </div>
      <div>
        <label htmlFor="newpassword2" className="">
          Confirmation du nouveau mot de passe<span className="">*</span>
        </label>
        <input
          className={errors.newpassword2 ? "" : ""}
          name="newpassword2"
          placeholder=""
          ref={register()}
        />
      </div>
      <div className="form-button-update-password">
        <button form="form-update-password">Modifier mon mot de passe</button>
      </div>
      {errorUpdate ? <p className="danger">{errorUpdate}</p> : ""}
      {successUpdate ? <p className="success">{successUpdate}</p> : ""}
    </form>
  );
}
