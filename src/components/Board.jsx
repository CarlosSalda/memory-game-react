import { useState } from "react";
import { imgs } from "../data";
import { useEffect } from "react";
import Card from "./Card";
import Modal from "./Modal";

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
};

const Board = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const createBoard = () => {
    const duplicate_cards = imgs.flatMap((img) => {
      const duplicate = {
        ...img,
        id: img.id + imgs.length,
      };
      return [img, duplicate];
    });
    const new_cards = shuffleArray(duplicate_cards);

    const cards = new_cards.map((card) => {
      return {
        ...card,
        flipped: false,
        matched: false,
      };
    });

    setCards(cards);
  };

  useEffect(() => {
    createBoard();
  }, []);

  const modifyFlipped = ({ current_card }) => {
    const new_flippedCards = [...flippedCards, current_card];
    setFlippedCards(new_flippedCards);

    if (new_flippedCards.length === 2) {
      setIsDisabled(true);
      const [firstCard, secondCard] = new_flippedCards;

      if (firstCard.img === secondCard.img) {
        firstCard.matched = true;
        secondCard.matched = true;
        setIsDisabled(false);
      } else {
        setTimeout(() => {
          firstCard.flipped = false;
          secondCard.flipped = false;
          setCards(cards);
          setIsDisabled(false);
        }, 1100);
      }

      setFlippedCards([]);
      setMoves(moves + 1);
    }
  };

  const handleCardClick = (id) => {
    if (isDisabled) return;
    const current_card = cards.find((card) => card.id === id);
    console.log(current_card, cards);

    if (!current_card.flipped && !current_card.matched) {
      current_card.flipped = true;
      modifyFlipped({ current_card });
      setCards(cards);
    }

    if (cards.every((card) => card.matched)) {
      setGameOver(true);
      setIsDisabled(true);
    }
  };

  const handleNewGame = () => {
    console.log("sdasadfsafsa")
    setCards([]);
    setFlippedCards([]);
    setMoves(0);
    setGameOver(false);
    setIsDisabled(false);
    createBoard();
  };

  return (
    <>
      {gameOver && (
        <div className="fixed inset-0 bg-black opacity-50 z-10"></div>
      )}
      <div className="relative h-screen flex items-center bg-gray-100">
        <div className="mx-auto flex flex-col justify-center items-center">
          <h1
            className="md:leading-tight font-bold text-4xl my-8 text-center text-transparent bg-clip-text bg-gradient-to-r
                          from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 transition duration-500
                          transform hover:-translate-y-1 hover:scale-110 md:text-3xl max-sm:leading-tight"
            style={{ textShadow: "1px 1px 1px rgba(0, 0, 0, 0.1)" }}
          >
            Juego de Memoria
          </h1>
          <div className="grid grid-cols-4 gap-3 justify-center items-center px-3 py-5 my-3">
            {cards.map((card) => (
              <Card
                card={card}
                key={card.id}
                handleCardClick={handleCardClick}
              />
            ))}
          </div>
          <button
            className="bg-black font-semibold text-white rounded-md px-5 py-1 hover:bg-yellow-500 hover:text-black
                            transition-all mb-3"
            onClick={handleNewGame}
          >
            Nuevo Juego
          </button>
        </div>

        <Modal
          gameOver={gameOver}
          setGameOver={setGameOver}
          moves={moves}
          handleNewGame={handleNewGame}
        ></Modal>
      </div>
    </>
  );
};

export default Board;
