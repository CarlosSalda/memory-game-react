import PropTypes from "prop-types";

const Card = ({ card, handleCardClick }) => {
  const styleMovement = () => {
    return card.flipped ? "[transform rotateY(10deg)]" : "bg-white";
  };

  const styleImgMovement = () => {
    if (!card.flipped) {
      return "[transform:rotateY(180deg)] [backface-visibility:hidden] transition-all duration-1000";
    }

    return "";
  };

  return (
    <div
      className={`drop-shadow-md flex items-center justify-center cursor-pointer  hover:scale-105 
                   hover:border-red-500 hover:border hover:bg-blue-200
                     rounded-xl transition-all duration-1000 ${styleMovement()}
                     md:h-12 md:w-12 lg:h-16 lg:w-16`}
      onClick={() => handleCardClick(card.id)}
    >
      <div>
        <img
          src={card.img}
          alt={card.alt}
          className={`h-16 scale-110 ${styleImgMovement()}`}
        />
      </div>
    </div>
  );
};

Card.propTypes = {
  card: PropTypes.shape({
    img: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    flipped: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
    matched: PropTypes.bool.isRequired,
  }).isRequired,
  handleCardClick: PropTypes.func.isRequired,
};

export default Card;
