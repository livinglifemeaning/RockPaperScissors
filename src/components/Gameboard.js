import { useEffect, useState } from "react";
import ScoreBox from "./ScoreBox";
import Rules from "./Rules";
import { Paper, Rock, Scissors } from "./Options";
import Triangle from "../assets/bg-triangle.svg";
import Click from "../assets/click.wav";
import Win from "../assets/win.wav";
import Lose from "../assets/lose.wav";
import classes from "./Gameboard.module.css";

const ActiveBoard = ({ handleSelection }) => {
  return (
    <div className={classes.activeBoard}>
      <img className={classes.triangle} src={Triangle} alt="" />
      <Rock handleSelection={handleSelection} />
      <Paper handleSelection={handleSelection} />
      <Scissors handleSelection={handleSelection} />
    </div>
  );
};

const ResultsBoard = ({
  gameStatus,
  userSelection,
  houseSelection,
  handlePlayAgain,
}) => {
  return (
    <div className={classes.resultsBoard}>
      <div className={classes.choices}>
        <div className={classes.user}>
          {userSelection === "Rock" ? (
            <Rock status={gameStatus === "Win" && "active"} />
          ) : userSelection === "Paper" ? (
            <Paper status={gameStatus === "Win" && "active"} />
          ) : userSelection === "Scissors" ? (
            <Scissors status={gameStatus === "Win" && "active"} />
          ) : (
            ""
          )}
          <p>You Picked</p>
        </div>
        <div className={classes.house}>
          {houseSelection === "Rock" ? (
            <Rock status={gameStatus === "Lose" && "active"} animate={true} />
          ) : houseSelection === "Paper" ? (
            <Paper status={gameStatus === "Lose" && "active"} animate={true} />
          ) : houseSelection === "Scissors" ? (
            <Scissors
              status={gameStatus === "Lose" && "active"}
              animate={true}
            />
          ) : (
            ""
          )}
          <p>The House Picked</p>
        </div>
      </div>

      <div>
        <p className={classes.result}>You {gameStatus}!</p>
        <button onClick={handlePlayAgain} className={classes.btn}>
          Play Again
        </button>
      </div>
    </div>
  );
};

const Gameboard = () => {
  const sessionScore = sessionStorage.getItem("score");
  console.log(sessionScore);
  const [boardActive, setBoardActive] = useState(true);
  const [userSelection, setUserSelection] = useState("");
  const [houseSelection, setHouseSelection] = useState("");
  const [gameStatus, setGameStatus] = useState("");
  const [score, setScore] = useState(sessionScore ? +sessionScore : 0);

  const handleSelection = (userChoice) => {
    setUserSelection(userChoice);
    randomHouseSelection();
  };

  const randomHouseSelection = () => {
    const randomNum = Math.floor(Math.random() * (4 - 1) + 1);
    if (randomNum === 1) {
      setHouseSelection("Rock");
    } else if (randomNum === 2) {
      setHouseSelection("Paper");
    } else if (randomNum === 3) {
      setHouseSelection("Scissors");
    }
  };

  const determineWinner = () => {
    if (userSelection === houseSelection && userSelection !== "") {
      setGameStatus("Tied");
    } else if (userSelection === "Paper" && houseSelection === "Rock") {
      handleWin();
    } else if (userSelection === "Rock" && houseSelection === "Scissors") {
      handleWin();
    } else if (userSelection === "Scissors" && houseSelection === "Paper") {
      handleWin();
    } else {
      setGameStatus("Lose");
      new Audio(Lose).play();
    }
  };

  const handleWin = () => {
    new Audio(Win).play();
    setGameStatus("Win");
  };

  useEffect(() => {
    if (userSelection !== "" && houseSelection !== "") {
      determineWinner();
    }
    if (gameStatus !== "") {
      setBoardActive(false);
    }
    if (gameStatus === "Win") {
      setScore((prevState) => prevState + 1);
      sessionStorage.setItem("score", score + 1);
    }
  }, [gameStatus, userSelection, houseSelection]);

  const handlePlayAgain = () => {
    new Audio(Click).play();
    setGameStatus("");
    setHouseSelection("");
    setUserSelection("");
    setBoardActive(true);
  };
  return (
    <div className={classes.gameboard}>
      <ScoreBox score={score} />
      {boardActive ? (
        <ActiveBoard handleSelection={handleSelection} />
      ) : (
        <ResultsBoard
          gameStatus={gameStatus}
          userSelection={userSelection}
          houseSelection={houseSelection}
          handlePlayAgain={handlePlayAgain}
        />
      )}
      <Rules />
    </div>
  );
};

export default Gameboard;
