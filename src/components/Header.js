import "../styles/Header.css"

const Header = ({shuffleCards, turns, gameComplete, gameOver, turnLimit}) => {
    const remainingTurns = turnLimit - turns;
    const isGameActive = !gameComplete && !gameOver;
    
    return ( 
        <div className="container">
            <h1>Memory Game</h1>
            <div className="game-info">
                <p className="turns">Turns: {turns}/{turnLimit}</p>
                {isGameActive && (
                    <p className="remaining-turns">
                        {remainingTurns > 0 ? `${remainingTurns} turns left!` : 'Last turn!'}
                    </p>
                )}
                {gameComplete && (
                    <div className="game-complete">
                        <div className="son-image-container">
                            <img 
                                src="/images/winner.jpg" 
                                alt="Happy son" 
                                className="son-image"
                            />
                        </div>
                        <h2>🎉 Congratulations! 🎉</h2>
                        <p>You completed the game in {turns} turns!</p>
                        {turns <= turnLimit && (
                            <p className="success-message">Excellent! You beat the {turnLimit}-turn challenge!</p>
                        )}
                        <p className="son-message">Great job! You're amazing! 🌟</p>
                    </div>
                )}
                {gameOver && (
                    <div className="game-over">
                        <div className="son-image-container">
                            <img 
                                src="/images/loser.jpg" 
                                alt="Encouraging son" 
                                className="son-image"
                            />
                        </div>
                        <h2>💥 Game Over! 💥</h2>
                        <p>You used {turns} turns. Try to complete it in {turnLimit} turns or less!</p>
                        <p className="pairs-found">Pairs found: {Math.floor(turns / 2)}/{turnLimit / 2}</p>
                        <p className="son-message">Don't worry! You can do it! Try again! 💪</p>
                    </div>
                )}
            </div>
            <button onClick={shuffleCards} className="button">
                {gameComplete || gameOver ? 'Play Again' : 'New Game'}
            </button>
        </div>
     );
}

export default Header;