import Button from "../../components/Button";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useHistory } from "react-router-dom";

import "./styles.css";
import { useState } from "react";

const RegisterForm = ({ setUser }) => {
  const history = useHistory();

  const formSchema = yup.object().shape({
    name: yup.string().required("Nome obrigatório"),
    email: yup.string().required("Email obrigatório").email("Email inválido"),
    password: yup
      .string()
      .required("Senha obrigatória")
      .min(8, "Senha muito curta, deve conter 8 caracters")
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])(?:([0-9a-zA-Z$*&@#])(?!\1)){8,}$/,
        "Sua senha deve conter: um caracter especial (ex.: !@#$), uma letra maiúscula, um número e uma letra minúscula"
      ),
    confirm_password: yup
      .string()
      .oneOf([yup.ref("password")], "Senhas diferentes"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const handleRegister = (data) => {
    delete data.confirm_password;
    setUser(data);
    setTimeout(() => history.push(`/success/${data.name}`), 1000);
  };

  const [isActiveName, setIsActiceName] = useState(false);
  const [isActiveEmail, setIsActiceEmail] = useState(false);
  const [isActivePassword, setIsActicePassword] = useState(false);
  const [isActiveConfirmPassword, setIsActiveConfirmPassword] = useState(false);

  return (
    <div className="flex">
      <form onSubmit={handleSubmit(handleRegister)}>
        <div className="input-data">
          <input
            {...register("name")}
            type="text"
            onInput={(e) => {
              e.target.value === ""
                ? setIsActiceName(false)
                : setIsActiceName(true);
            }}
          />
          <label className={isActiveName ? "Active" : ""}>Nome</label>
        </div>
        <div className="invalid-feedback">{errors.name?.message}</div>

        <div className="input-data">
          <input
            {...register("email")}
            type="text"
            onInput={(e) => {
              e.target.value === ""
                ? setIsActiceEmail(false)
                : setIsActiceEmail(true);
            }}
          />
          <label className={isActiveEmail ? "Active" : ""}>E-mail</label>
        </div>
        <div className="invalid-feedback">{errors.email?.message}</div>

        <div className="input-data">
          <input
            {...register("password")}
            type="text"
            onInput={(e) => {
              e.target.value === ""
                ? setIsActicePassword(false)
                : setIsActicePassword(true);
            }}
          />
          <label className={isActivePassword ? "Active" : ""}>Senha</label>
        </div>
        <div className="invalid-feedback">{errors.password?.message}</div>

        <div className="input-data">
          <input
            {...register("confirm_password")}
            type="text"
            onInput={(e) => {
              e.target.value === ""
                ? setIsActiveConfirmPassword(false)
                : setIsActiveConfirmPassword(true);
            }}
          />
          <label className={isActiveConfirmPassword ? "Active" : ""}>
            Confirmar Senha
          </label>
        </div>
        <div className="invalid-feedback">
          {errors.confirm_password?.message}
        </div>

        <Button>Cadastrar</Button>
      </form>
    </div>
  );
};
export default RegisterForm;
