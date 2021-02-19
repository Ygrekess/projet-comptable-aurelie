import React from "react";
import { Link } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import "../../4-css/GoBack.css";
export default function GoBack({ link, pageName }) {
  return (
    <div className="goback-page-header">
      <Link to={link}>
        <IoMdArrowRoundBack className="arrow-back" size={40} />
      </Link>
      <h1>{pageName}</h1>
    </div>
  );
}
