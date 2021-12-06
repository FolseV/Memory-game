import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import react from "../../img/cards/platforms/react.svg";
import js_prime from "../../img/card suite/primary-javascript.svg";
import rose from "../../img/card suite/tomas_arad_red_rose.svg";
import { UserType } from "../../types/user";
import { useActions } from "../../hooks/useActions";
import { useNavigate } from "react-router";

const schema = yup
  .object({
    firstName: yup.string().required("First name is required!"),
    lastName: yup.string().required("Last name is required!"),
    email: yup.string().required("Email is required!").email("Wrong type of email!"),
    suite: yup.string().required("Choose suite!").nullable(),
    difficulty: yup.string().required("Choose difficulty!"),
  })
  .required();

const Form = () => {
  console.log("render form");
  const navigate = useNavigate();
  const { getUser, SetDifEasy, SetDifMedium, SetDifHard } = useActions();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserType>({ resolver: yupResolver(schema) });

  const onSubmit = useCallback(
    (data) => {
      getUser(data);
      navigate(`/memorygame`, { replace: true });

      let items = localStorage.getItem("LeaderBoard");
      let oldItems = JSON.parse(items ? items : "null") || [];

      let newItem = data;

      oldItems.push(newItem);

      localStorage.setItem("LeaderBoard", JSON.stringify(oldItems));
    },
    [getUser, navigate]
  );

  const handleSelect = useCallback(
    (e) => {
      if (e.target.value === "easy") {
        SetDifEasy();
      }
      if (e.target.value === "medium") {
        SetDifMedium();
      }
      if (e.target.value === "hard") {
        SetDifHard();
      }
    },
    [SetDifEasy, SetDifMedium, SetDifHard]
  );
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
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
          <span style={{ color: "red" }}> {errors.lastName?.message}</span>
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input {...register("email", { required: true })} type="text" />
          <span style={{ color: "red" }}> {errors.email?.message}</span>
        </div>
        <select
          {...register("difficulty", { required: true })}
          id="game_difficulty"
          defaultValue="easy"
          onChange={handleSelect}
        >
          <option value="">...</option>
          <option value="easy">easy</option>
          <option value="medium">medium</option>
          <option value="hard">hard</option>
        </select>
        <span style={{ color: "red" }}> {errors.difficulty?.message}</span>

        <div>
          <label htmlFor="cards_suite">Which suite?</label>
          <img src={react} alt="" width="100" height="100" />
          <input type="radio" {...register("suite", { required: true })} value={react} checked />
          <img src={js_prime} alt="" width="100" height="100" />
          <input type="radio" {...register("suite", { required: true })} value={js_prime} />
          <img src={rose} alt="" width="100" height="100" />
          <input type="radio" {...register("suite", { required: true })} value={rose} />
        </div>
        <span style={{ color: "red" }}> {errors.suite?.message}</span>

        <input type="submit" />
      </form>
    </>
  );
};

export default Form;
