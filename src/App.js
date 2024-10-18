

import helmet from './assets/images/helmet-1.png'
import sword from './assets/images/sword-1.png'
import ring from './assets/images/ring-1.png'
import potion from './assets/images/potion-1.png'
import scroll from './assets/images/scroll-1.png'
import shield from './assets/images/shield-1.png'
import { useEffect, useState } from 'react';
import './App.css';
import { SingleCard } from './components/SingleCard'

const cardImages = [
  { src: helmet, matched: false },
  { src: sword, matched: false },
  { src: shield, matched: false },
  { src: scroll, matched: false },
  { src: ring, matched: false },
  { src: potion, matched: false },
]

function App() {

  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map(card => ({ ...card, id: Math.random() }))
      setChoiceOne(null)
      setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(0)
  }

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  // compare 2 selected cards (if they are selected)
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true)
      if (choiceOne.src === choiceTwo.src) {
        console.log('match!');
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true }
            } else {
              return card
            }
          })
        })
        handleTurns()

      } else {
        setTimeout(() => handleTurns(), 800)

      }
    }
  }, [choiceOne, choiceTwo])


  // reset choices and increase turn
  const handleTurns = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prev => prev + 1)
    setDisabled(false)
  }

  useEffect(() => {
    shuffleCards()
  }, [])

  return (
    <div className="App">
      <h1>memory game</h1>
      <button onClick={shuffleCards}>new game</button>

      <div className='card-grid'>
        {cards.map(card => (
          <SingleCard
            card={card}
            key={card.id}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p>turns: {turns}</p>
    </div>
  );
}

export default App;
