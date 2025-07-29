import "../styles/Header.css"

const Header = ({shuffleCards}) => {
    return ( 
        <div className="container">
            <h1>Memory Game</h1>
            <button onClick={shuffleCards} className="button"> New Game</button>
        </div>
     );
}
 
export default Header;