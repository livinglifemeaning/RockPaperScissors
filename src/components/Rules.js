import { useState } from "react";
import RulesImage from "../assets/image-rules.svg";
import CloseModal from "../assets/icon-close.svg";
import Click from "../assets/click.wav"
import classes from "./Rules.module.css";

const RuleModal = ({ setRulesOpen }) => {
  return (
    <>
      <div className={classes.modal}>
        <p>Rules</p>
        <img
          src={RulesImage}
          alt="Paper beats rock, rock beats scissors, and scissors beats paper"
        />
        <span className={classes.close} onClick={() => setRulesOpen(false)}>
          <img src={CloseModal} alt="Close modal" />
        </span>
      </div>
      <div onClick={() => setRulesOpen(false)} className={classes.bg} />
    </>
  );
};

const Rules = () => {
  const [rulesOpen, setRulesOpen] = useState(false);
  const handleClick = () => {
    new Audio(Click).play(); 
    setRulesOpen(true)
  }
  return (
    <>
      <button onClick={handleClick } className={classes.btn}>
        Rules
      </button>

      {rulesOpen && <RuleModal setRulesOpen={setRulesOpen} />}
    </> 
  );
};

export default Rules;
