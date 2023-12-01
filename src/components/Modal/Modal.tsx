import React from "react";
import { useNavigate } from "react-router";
import styles from "./Modal.module.css";
import classNames from "classnames/bind";
import useTypedSelector from "../../hooks";

const cx = classNames.bind(styles);

interface Props {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  message: string;
  restart: () => void;
  moves: number;
  time: number;
}

const Modal: React.FC<Props> = (props) => {
  const navigate = useNavigate();
  const { theme } = useTypedSelector((state) => state.theme);

  return (
    <div
      className={cx({
        modal: true,
        active: props.active,
      })}
    >
      <div
        className={cx({
          modalContent: true,
          active: props.active,
          modalContentDark: theme,
        })}
        onClick={(e) => e.stopPropagation}
      >
        <div
          className={cx({
            modalTitle: true,
            modalTitleDark: theme,
          })}
        >
          {props.message}
        </div>
        <div
          className={cx({
            modalBody: true,
            modalBodyDark: theme,
          })}
        >
          <p>You WON! with {props.moves} moves.</p>
          <span
            className={cx({
              digits: true,
              digitsDark: theme,
            })}
          >
            Your time {("0" + Math.floor((props.time / 60000) % 60)).slice(-2)}:
          </span>
          <span
            className={cx({
              digits: true,
              digitsDark: theme,
            })}
          >
            {("0" + Math.floor((props.time / 1000) % 60)).slice(-2)}.
          </span>
          <span
            className={cx({
              digits: true,
              digitsDark: true,
            })}
          >
            {("0" + ((props.time / 10) % 100)).slice(-2)} !
          </span>
        </div>

        <button
          className={styles.modalButton}
          onClick={() => {
            navigate(`/leaderboard`, { replace: true });
            props.restart();
          }}
        >
          Leaderboard
        </button>
        <p></p>
        <button className={styles.modalButton} onClick={props.restart}>
          Restart
        </button>
      </div>
    </div>
  );
};

export default React.memo(Modal);
