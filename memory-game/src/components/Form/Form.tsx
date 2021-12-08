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
import styles from "./Form.module.css";

// validation function
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
        <div className={styles.firstName}>
          <label htmlFor="firstName">First Name</label>
          <input
            {...register("firstName", { required: "This is required" })}
            type="text"
            id="firstName"
            placeholder="Your first name ..."
          />
          <span className={styles.error}> {errors.firstName?.message}</span>
        </div>
        <div className={styles.lastName}>
          <label htmlFor="surName">Last name</label>
          <input
            {...register("lastName", { required: true })}
            type="text"
            placeholder="Your last name..."
          />
          <span className={styles.error}> {errors.lastName?.message}</span>
        </div>
        <div className={styles.email}>
          <label htmlFor="email">Email</label>
          <input
            {...register("email", { required: true })}
            type="text"
            placeholder="Your email..."
          />
          <span className={styles.error}> {errors.email?.message}</span>
        </div>
        <div className={styles.select}>
          <label htmlFor="select">Choose difficulty </label>
          <select
            className={styles.selectDifficulty}
            {...register("difficulty", { required: true })}
            id="game_difficulty"
            defaultValue=""
            onChange={handleSelect}
          >
            <option disabled value="">
              Choose difficulty
            </option>
            <option value="easy">Easy (14 cards)</option>
            <option value="medium">Medium (20 cards)</option>
            <option value="hard">Hard (32 cards)</option>
          </select>
          <span className={styles.error}> {errors.difficulty?.message}</span>
        </div>

        <div className={styles.suitesSelect}>
          <label htmlFor="cards_suite">Which suite?</label>
          <div className={styles.suites}>
            <div className={styles.suite}>
              <img src={react} alt="" width="100" height="100" />
              <input type="radio" {...register("suite", { required: true })} value={react} />
            </div>
            <div className={styles.suite}>
              <img src={js_prime} alt="" width="100" height="100" />
              <input type="radio" {...register("suite", { required: true })} value={js_prime} />
            </div>
            <div className={styles.suite}>
              <img src={rose} alt="" width="100" height="100" />
              <input type="radio" {...register("suite", { required: true })} value={rose} />
            </div>
          </div>
          <span className={styles.error}> {errors.suite?.message}</span>
        </div>

        <input type="submit" value="Submit" className={styles.submitButton} />
      </form>
    </>
  );
};

export default Form;
