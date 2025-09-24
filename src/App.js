import React, {useState} from 'react';
import './App.css';
import LetterGlitch from './LetterGlitch';

function App() {
  const [gameResult, setGameResult] = useState("");
  const [playerResult, setPlayerResult] = useState(0);
  const [computerResult, setComputerResult] = useState(0);
  const [playerPicked, setPlayerPicked] = useState("");
  const [computerPicked, setComputerPicked] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);

  //Emoji for visuals
  const getEmoji = (choice) => {
    if (choice === "Rock") return "✊";      
    if (choice === "Paper") return "✋";     
    if (choice === "Scissors") return "✌️";  
    return "❓";
  }

  // function for player and computer choice
  const selectChoices = (choice) => {
  const choices = ["Rock", "Paper", "Scissors"];
  const randomIndex = Math.floor(Math.random() * 3);
  const computerChose = choices[randomIndex];

    setIsAnimating(true);
    setPlayerPicked(choice);
    setComputerPicked(computerChose);

    console.log("Player chose: " + choice);
    console.log("Computer chose: " + computerChose);

    // win/lose logic
    if (choice === "Rock" && computerChose === "Scissors") {
      setGameResult("You Win!")
      setPlayerResult(playerResult + 1)
    } 
    else if (choice === "Paper" && computerChose === "Rock") {
      setGameResult("You Win!")
      setPlayerResult(playerResult + 1)
    }
    else if (choice === "Scissors" && computerChose === "Paper") {
      setGameResult("You Win!")
      setPlayerResult(playerResult + 1)
    }
    else if (choice === computerChose) {
      setGameResult("It's a tie!")
    }
    else {
      setGameResult("Computer Wins!")
      setComputerResult(computerResult + 1)
    }

    //set timeout so that player can't spam button
    setTimeout(() => {
      setIsAnimating(false);
    }, 1000);
  }

  //for the animation of emoji bouncing
  let playerClass = "animated-emoji";
  let computerClass = "animated-emoji";

  //animation for winner getting big
  if (gameResult === "You Win!") {
    playerClass = "winner-emoji";
  } else if (gameResult === "Computer Wins!") {
    computerClass = "winner-emoji"
  }

  return (
    <div className="App">
      <div className="full-bg-center">
        {/* Animated bg from React Bit */}
        <LetterGlitch
          glitchSpeed={50}
          centerVignette={true}
          outerVignette={true}
          smooth={true}
        />
        <header className="App-header">
          <h1>Jack en Poy</h1>
          <h3>(Rock ✊ Paper ✋ Scissors ✌️ Game)</h3>
          {/* Scoreboard */}
          <p className="game-result">Player: {playerResult} | Computer: {computerResult}</p>  
          {/* Here appears the emoji of what the player and computer picked */}
          <div>
            <span key={`player-${playerPicked}`} className={playerClass}>{getEmoji(playerPicked)}</span>
            <span className="vs-text">VS</span>
            <span key={`computer-${computerPicked}`} className={computerClass}>{getEmoji(computerPicked)}</span>
          </div>
          {/* Buttons for choices */}
          <div className="choice-btn">
          <button disabled={isAnimating} className="game-button" onClick={() => selectChoices("Rock")}>🪨 Rock</button>
          <button disabled={isAnimating} className="game-button" onClick={() => selectChoices("Paper")}>📄 Paper</button>
          <button disabled={isAnimating} className="game-button" onClick={() => selectChoices("Scissors")}>✂️ Scissors</button>
          </div>
          {/* Declare who wins */}
          <div>
            <h2>{gameResult}</h2>
          </div>
        </header>
      </div>
    </div>
  );
}

export default App;

