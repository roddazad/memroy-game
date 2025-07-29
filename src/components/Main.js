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

const Main = () => {
    // store the shuffled Cards into a state
    const [cards, setCards] = useState([])

    //create turn state
    const [turns, setTurns] = useState(0)

    // Start the game when component mounts
    useEffect(() => {
        shuffleCards()
    }, [])

   // shuffle cards
   const shuffleCards = () => {
   // Duplicate the cards
   const shuffledCards = [...cardImages, ...cardImages]
   .sort(() => Math.random() - 0.5)
   .map((card)=> ({...card, id: Math.random() }))

   //update the state
   setCards(shuffledCards)
   setTurns(0)

   console.log(cards)
   }
   

    return ( 
        <div className="main-container">
            <Header shuffleCards={shuffleCards}/>
            <Grid cards={cards}/>

        </div>
     );
}
 
export default Main;