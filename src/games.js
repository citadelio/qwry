import Drag from "./assets/game_images/draging.png";
import Meditation from "./assets/game_images/meditation.png";
import MobileLogin from "./assets/game_images/mobile_login.png";
import Mouth from "./assets/game_images/mouth.png";
import Typing from "./assets/game_images/typing.png";

export default {
  games: [
    {
      id: 1,
      title: "Speed Typing",
      image_path: Typing,
      description:
        "Test how fast you can type, You'll be presented with a word and be required to type out the word from the buttons provided. The twist however is the the buttons are scrambled and will be reshuffled each time you type. try to beat the time and advance to the next stage"
    },
    {
      id: 2,
      title: "Pick the Synonym",
      image_path: MobileLogin,
      description:
        "Once a game start, You'll be shown a word and also presented with four options, You are to choose from the options the one that is closely related to the given word. You have a target to hit within a given period and the target increases with level"
    },
    {
      id: 3,
      title: "What's the Meaning",
      image_path: Mouth,
      description:
        "When this game begins, The meaning of a word will be presented to you, Your task is to try to get correctly the word that has that meaning, Once you know the word, Just qucikly type it out."
    },
    {
      id: 4,
      title: "Test your Memory",
      image_path: Meditation,
      description:
        "How well can you concentrate, This game will test your memory and concentration level (still developing...)"
    }
  ]
};
