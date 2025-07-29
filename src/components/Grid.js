import '../styles/Grid.css'

const Grid = ({cards, handleChoice, disabled}) => {
    const handleClick = (card) => {
        if (!disabled && !card.flipped && !card.matched) {
            handleChoice(card)
        }
    }

    return ( 
        <div className="card-grid">
            {
                cards.map((card) => {
                    const isFlipped = card.flipped || card.matched
                    
                    return (
                        <div 
                            className={`card ${isFlipped ? 'flipped' : ''} ${card.matched ? 'matched' : ''}`} 
                            key={card.id}
                            onClick={() => handleClick(card)}
                        >
                            <div>
                                <img className="front" src={card.src} alt="card front" />
                                <img className="cover" src="/images/cover.jpg" alt="card back" />
                            </div>
                        </div>
                    )
                })
            }
        </div>
    );
}

export default Grid;