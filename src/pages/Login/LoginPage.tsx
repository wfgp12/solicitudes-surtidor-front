// Actions
import { loginAction } from "../../redux/slices/authSlice";

// Libraries
import React from "react";

// Models
import { LoginForm } from "../../models/auth";

// Store - hooks
import { useAppDispatch } from "../../redux/store/hooks";

// Styles
import "./LoginPage.scss";
// import { loginService } from "../../service/auth/auth.service";
import { useForm } from "../../hooks/useForm";

const LoginPage = () => {
  const dispatch = useAppDispatch();

  const {values, handleChange} = useForm<LoginForm>({
    document: "",
    password: ""
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // const response = await loginService(values.email, values.password);
    // if (!response) return;

    // const { user, token } = response;
    dispatch(
      loginAction({
        user : {
          id: 12,
          name: "Wilhen",
          lastName: "Gutiérrez",
          email:"wfgp12@email.com",
          numberPhone: "3059299881",
          role: 'administrador',
          subRole:"administracion"
        },
        token: ""
      })
    );
    return;
  };

  return (
    <div className="LoginPage">
      <div className="LoginPage__header">
        <h1>Inicio de Sesión</h1>
      </div>
      <form id="loginForm" className="LoginPage__form" onSubmit={handleSubmit}>
        <div className="LoginPage__form__field">
          <label className="LoginPage__form__label">email :</label>
          <input
            type="number"
            name="document"
            placeholder="Ingrese su número de documento"
            className="LoginPage__form__input"
            value={values.document}
            onChange={handleChange}
            required
          />
        </div>
        <div className="LoginPage__form__field">
          <label className="LoginPage__form__label">password: </label>
          <input
            type="password"
            name="password"
            placeholder="Ingrese su número de contraseña"
            className="LoginPage__form__input"
            value={values.password}
            onChange={handleChange}
            required
            autoComplete="current-password"
          />
        </div>
        <button className="LoginPage__form__button" type="submit">
          Iniciar sesión
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
