import Logo from "../assets/logo.svg"
import classes from "./ScoreBox.module.css";

const ScoreBox = ({score}) => {
  return <div className={classes.header}>
    <img  className={classes.logo} src={Logo} alt="Rock Paper Scissors"/> 
    <div className={classes.scoreBox}>
      <p className={classes.scoreText}>Score</p>
      <p className={classes.scoreNum}>{score}</p>
    </div>
  </div>;
};

export default ScoreBox;
