
import cover from '../assets/images/cover.png'
import './SingleCard.css'

export const SingleCard = ({ card, handleChoice, flipped, disabled }) => {

    const handleClick = () => {
        if (!disabled) {
            handleChoice(card)
        }
    }

    return (
        <div className='card'>
            <div className={flipped ? 'flipped' : ''}>
                <img src={card.src} className='front' alt='card front' />
                <img
                    src={cover}
                    className='back'
                    alt='card back'
                    onClick={handleClick}
                />
            </div>
        </div>
    )
}