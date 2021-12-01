import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import react from "../../img/cards/platforms/react.svg";
import js_prime from "../../img/card suite/primary-javascript.svg";
import rose from "../../img/card suite/tomas_arad_red_rose.svg";
import { UserType } from "../../types/user";
import { useActions } from "../../hooks/useActions";

const schema = yup
  .object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email(),
    suite: yup.string().required(),
    difficulty: yup.string().required(),
  })
  .required();

const Form = () => {
  const { getUser } = useActions();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserType>({ resolver: yupResolver(schema) });

  return (
    <>
      <form
        onSubmit={handleSubmit((data) => {
          console.log(data);
          getUser(data);
        })}
      >
        <div>
          <label htmlFor="firstName">First Name</label>
          <input
            {...register("firstName", { required: "This is required" })}
            type="text"
            id="firstName"
          />
          <span style={{ color: "red" }}> {errors.firstName?.message}</span>
        </div>
        <div>
          <label htmlFor="surName">Last name</label>
          <input {...register("lastName", { required: true })} type="text" />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input {...register("email", { required: true })} type="text" />
        </div>
        <select {...register("difficulty", { required: true })} id="game_difficulty">
          <option value="easy">easy</option>
          <option value="medium">medium</option>
          <option value="hard">hard</option>
        </select>
        <div>
          <label htmlFor="cards_suite">Which suite?</label>
          <img src={react} alt="" width="100" height="100" />
          <input type="radio" {...register("suite", { required: true })} value={react} />
          <img src={js_prime} alt="" width="100" height="100" />
          <input type="radio" {...register("suite", { required: true })} value={js_prime} />
          <img src={rose} alt="" width="100" height="100" />
          <input type="radio" {...register("suite", { required: true })} value={rose} />
        </div>

        <input type="submit" />
      </form>
    </>
  );
};

export default Form;
