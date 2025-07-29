import '../styles/Grid.css'

const Grid = ({cards}) => {
    return ( 
    
    <div className="card-grid">
        {
            cards.map((card) => (
                <div className="card" key={card.id}>
                    <div>
                        <img className="front" src={card.src} alt="front Image" />
                        <img className="cover" src="/images/cover.jpg" alt="cover Image" />
                    </div>

                </div>
            ))
        }
    </div>
);
}
 
export default Grid;