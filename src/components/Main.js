import { useState, useEffect } from 'react'
import Header from "../components/Header"
import Grid from "../components/Grid"

const cardImages = [
    {"src": "/images/lama.png"},
    {"src": "/images/lego.png"},
    {"src": "/images/monster.jpg"},
    {"src": "/images/poodle.jpg"},
    {"src": "/images/shield.png"},
    {"src": "/images/soccer.png"}
]

const TURN_LIMIT = 16; // Maximum turns allowed

const Main = () => {
    // store the shuffled Cards into a state
    const [cards, setCards] = useState([])
    //create turn state
    const [turns, setTurns] = useState(0)
    // track flipped cards
    const [choiceOne, setChoiceOne] = useState(null)
    const [choiceTwo, setChoiceTwo] = useState(null)
    // track if cards are disabled during matching
    const [disabled, setDisabled] = useState(false)
    // track matched pairs
    const [matchedPairs, setMatchedPairs] = useState(0)
    // track game completion
    const [gameComplete, setGameComplete] = useState(false)
    // track game over (exceeded turn limit)
    const [gameOver, setGameOver] = useState(false)

    // Start the game when component mounts
    useEffect(() => {
        shuffleCards()
    }, [])

    // Check if choices match
    useEffect(() => {
        if (choiceOne && choiceTwo) {
            setDisabled(true)
            if (choiceOne.src === choiceTwo.src) {
                // Cards match - keep them flipped
                setCards(prevCards => {
                    return prevCards.map(card => {
                        if (card.src === choiceOne.src) {
                            return { ...card, matched: true }
                        } else {
                            return card
                        }
                    })
                })
                setMatchedPairs(prev => prev + 1)
                resetTurn()
            } else {
                // Cards don't match - flip them back after delay
                setTimeout(() => resetTurn(), 1000)
            }
        }
    }, [choiceOne, choiceTwo])

    // Check for game completion or game over
    useEffect(() => {
        if (matchedPairs === cardImages.length) {
            setGameComplete(true)
        }
    }, [matchedPairs])

    // Check for game over (exceeded turn limit)
    useEffect(() => {
        if (turns >= TURN_LIMIT && !gameComplete) {
            setGameOver(true)
        }
    }, [turns, gameComplete])

    // Reset choices & turn
    const resetTurn = () => {
        setChoiceOne(null)
        setChoiceTwo(null)
        setTurns(prevTurns => prevTurns + 1)
        setDisabled(false)
        
        // Unflip cards that don't match
        setCards(prevCards => {
            return prevCards.map(card => {
                if (!card.matched) {
                    return { ...card, flipped: false }
                } else {
                    return card
                }
            })
        })
    }

    // Handle card choice
    const handleChoice = (card) => {
        // Don't allow clicks if game is over or complete
        if (gameOver || gameComplete) return;
        
        // Update the card to show it's flipped
        setCards(prevCards => {
            return prevCards.map(c => {
                if (c.id === card.id) {
                    return { ...c, flipped: true }
                } else {
                    return c
                }
            })
        })
        
        choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
    }

    // shuffle cards
    const shuffleCards = () => {
        // Duplicate the cards
        const shuffledCards = [...cardImages, ...cardImages]
            .sort(() => Math.random() - 0.5)
            .map((card, index) => ({ ...card, id: index, matched: false, flipped: false }))

        //update the state
        setCards(shuffledCards)
        setTurns(0)
        setChoiceOne(null)
        setChoiceTwo(null)
        setMatchedPairs(0)
        setGameComplete(false)
        setGameOver(false)
    }

    return ( 
        <div className="main-container">
            <Header 
                shuffleCards={shuffleCards} 
                turns={turns} 
                gameComplete={gameComplete}
                gameOver={gameOver}
                turnLimit={TURN_LIMIT}
            />
            <Grid 
                cards={cards} 
                handleChoice={handleChoice}
                disabled={disabled || gameOver || gameComplete}
            />
        </div>
    );
}

export default Main;