import React from "react";
import { useNavigate } from "react-router";

const Greeting = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Hi!</h1>
      <div>
        <h2>Instructions to play memory</h2>
        <p>
          Test your memory with this memory game. First select the difficulty level. The higher the
          number, the more cards are in the memo game. On the game board, there are always two
          identical images. Start the game by flipping a card. Then try to find another card that
          has the same image as the first. If you can't find a pair, the flipped cards will be
          flipped back with the face down. Try to remember these images as it becomes easier to find
          pairs the longer you play. When you find a pair they are removed from the board and when
          you find all the pairs in this memory, you have completed the level.
        </p>
      </div>
      <div>
        <h2>Memory and children</h2>
        <p>
          Children should periodically return to this memory until they are easily capable of
          solving at least the most basic levels. It is common that the child will make significant
          progress by developing memory strategies. In order for children to remember the strategies
          in this memory game, it is good if the children are encouraged to go back here on several
          occasions and not only played once. Appropriate moments can be on weekends and school
          holidays!
        </p>
      </div>
      <button onClick={() => navigate(`/home`, { replace: true })}>Next</button>
    </div>
  );
};

export default Greeting;
