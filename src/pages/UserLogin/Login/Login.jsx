import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import api from "../../../services/api";
import { LOGIN } from "../../../utils/ApiMethods";

function Login() {
  let navigate = useNavigate();
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [errorMsg, setErrorMsg] = useState("");

  const doLogin = (values) => {
    api
      .post(LOGIN.VALIDATELOGIN, values)
      .then((response) => {
        let UserData = response.data.data.data[0];
        let { status, message } = response.data.data.data[0];
        if (status === 1) {
          localStorage.setItem("UserData", JSON.stringify(UserData));
          navigate("/ccadmin/App");
        } else {
          setErrorMsg(message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="mb-3">
      <h1 className="mb-3">Welcome</h1>
      <form onSubmit={handleSubmit(doLogin)}>
        <div className="form-group login-form">
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              id="userName"
              {...register("userName", {
                required: "Please enter the username.",
              })}
            />
            <label htmlFor="userName">Username</label>
            {errors.userName && (
              <span className="text-danger">{errors.userName.message}</span>
            )}
          </div>
          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              {...register("password", {
                required: "Please enter the password.",
              })}
            />
            <label htmlFor="password">Password</label>
            {errors.password && (
              <span className="text-danger">{errors.password.message}</span>
            )}
          </div>
          <p className="text-success">{LOGIN.LOGENV}</p>
          {errorMsg && (
            <div className="form-floation mb-3">
              <span className="text-danger">{errorMsg}</span>
            </div>
          )}
          <div className="form-floating mb-3">
            <input
              type="submit"
              name="btnLogin"
              className="btn btn-lg btn-login btn-danger"
              value="Submit"
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
