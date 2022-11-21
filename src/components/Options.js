import RockImg from "../assets/icon-rock.svg";
import PaperImg from "../assets/icon-paper.svg";
import ScissorsImg from "../assets/icon-scissors.svg";
import classes from "./Options.module.css";

export const Rock = ({ handleSelection, status, animate}) => {
  return (
    <div
      onClick={() => handleSelection("Rock")}
      className={`${classes.option} ${classes.rock}  ${status === "active" && classes.active} ${animate && classes.animate}`}
    >
      <div className={classes.container}>
        <img src={RockImg} alt="Rock" />
      </div>
    </div>
  );
};

export const Paper = ({ handleSelection, status, animate }) => {
  return (
    <div
      onClick={() => handleSelection("Paper")}
      className={`${classes.option} ${classes.paper} ${status === "active" && classes.active} ${animate && classes.animate}`}
    >
      <div className={classes.container}>
        <img src={PaperImg} alt="Paper" />
      </div>
    </div>
  );
};

export const Scissors = ({ handleSelection, status, animate}) => {
  return (
    <div
      onClick={() => handleSelection("Scissors")}
      className={`${classes.option} ${classes.scissors} ${status === "active" && classes.active} ${animate && classes.animate}`}
    >
      <div className={classes.container}>
        <img src={ScissorsImg} alt="Scissors" />
      </div>
    </div>
  );
};
