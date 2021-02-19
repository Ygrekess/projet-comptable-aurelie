import React from "react";
import { useForm } from "react-hook-form";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export default function UserInfos_Page(props) {
  const schema = yup.object().shape({
    poleSante: yup.string().required(),
    specialite: yup.string().required(),
    lastName: yup.string().required(),
    firstName: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
  });

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => console.log(data);

  return (
    <div className="userInfos-page">
      <div className="userInfos-page-header">
        <Link to={"#"} onClick={() => props.history.goBack()}>
          <IoMdArrowRoundBack className="arrow-back" size={40} />
        </Link>
        <h1>Mon compte</h1>
      </div>
      <div className="userInfos-page-content">
        <form
          id="userInfos-page-form"
          className="userInfos-page-form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <label>Pôle santé</label>
            <select
              name="poleSante"
              className={errors.poleSante && "error"}
              ref={register}
            >
              <option value="female">female</option>
              <option value="male">male</option>
              <option value="other">other</option>
            </select>
            {errors.poleSante ? (
              <span className="danger">Merci de saisir un Pôle Santé.</span>
            ) : (
              ""
            )}
          </div>
          <div>
            <label>Spécialité</label>
            <select
              name="specialite"
              className={errors.specialite && "error"}
              ref={register}
            >
              <option value="female">female</option>
              <option value="male">male</option>
              <option value="other">other</option>
            </select>
            {errors.specialite ? (
              <span className="danger">Merci de saisir une spécialité.</span>
            ) : (
              ""
            )}
          </div>
          <div>
            <label>Nom</label>
            <input
              name="lastName"
              className={errors.lastName && "error"}
              defaultValue={""}
              ref={register}
            />
            {errors.lastName ? (
              <span className="danger">Merci de saisir votre nom.</span>
            ) : (
              ""
            )}
          </div>
          <div>
            <label>Prénom</label>
            <input
              name="firstName"
              className={errors.firstName && "error"}
              defaultValue={""}
              ref={register}
            />
            {errors.firstName ? (
              <span className="danger">Merci de saisir votre prénom.</span>
            ) : (
              ""
            )}
          </div>
          <div>
            <label>Email</label>
            <input
              name="email"
              className={errors.email && "error"}
              defaultValue={""}
              ref={register}
            />
            {errors.email ? (
              <span className="danger">Merci de saisir votre email.</span>
            ) : (
              ""
            )}
          </div>
          <div>
            <label>Mot de passe</label>
            <input
              name="password"
              className={errors.password && "error"}
              defaultValue={""}
              ref={register}
            />
            {errors.password ? (
              <span className="danger">Merci de saisir un mot de passe.</span>
            ) : (
              ""
            )}
          </div>
        </form>
      </div>
      <div className="userInfos-page-footer">
        <button type="submit" form="userInfos-page-form" value="">
          Valider
        </button>
      </div>
    </div>
  );
}
