import React, { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./Login.css";
import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { yupResolver } from "@hookform/resolvers/yup";

import { useUserLoginMutation } from "../../../redux/reducers/api/authSlice";
import { userlogin } from "../../../types/login/loginApi";
import PreLoader from "../../../components/PreLoader/PreLoader";
import axios from "axios";
import { setToken } from "../../../redux/reducers/api/authSlice";

type Props={
  formSubmit:SubmitHandler<userlogin>
}

function Login({formSubmit}:Props) {

  
  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<userlogin>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  return (
    <div className="box container-1">
      <div className="top">
        <span className="loginSpan">
          <b>Have an account?</b>
        </span>
        <header>LOGIN</header>
      </div>
      <form onSubmit={handleSubmit(formSubmit)}>
        <div className="input-field">
          <input
            type="email"
            className="input"
            placeholder="email"
            id="email"
            {...register("email")}
          />
          <i className="bx bx-user icon"></i>
          <p className="error">{errors.email?.message}</p>
        </div>

        <div className="input-field">
          <input
            type="Password"
            className="input"
            placeholder="Password"
            id="password"
            {...register("password")}
          />
          <i className="bx bx-lock-alt icon"></i>
          <p className="error">{errors.password?.message}</p>
        </div>
        <div className="submitbutton">
          <div className="styleDiv">
            <button type="submit" className="custom-btn btn-16">
              Login
            </button>
          </div>
        </div>
      </form>

      <div className="two-col">
        <div className="two">
          <label className="forgotPassword">
            <a href="#">Forgot password? </a>
          </label>
        </div>
      </div>
    </div>
  );
}

export default Login;
