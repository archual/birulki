import './scss/main.scss';
import Phaser from 'phaser';

import makeResizeGame from './utils/resizeGame';
import Boot from './states/Boot';
import Preload from './states/Preload';
import Game from './states/Game';

const gameHeight = 540;
const gameWidth = 960;
export const gameConfig = {
  backgroundColor: 0xcccccc,
  width: gameWidth,
  centerX: gameWidth / 2,
  height: gameHeight,
  centerY: gameHeight / 2,
  scene: [Boot, Preload, Game], // , Title, PreGame, Authors, Game, GameOver],
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: true,
    },
  },
};

window.onload = function() {
  const InfiniteScroller = new Phaser.Game(gameConfig);
  window.focus();
  const resizeGame = makeResizeGame(InfiniteScroller);
  resizeGame();
  window.addEventListener('resize', resizeGame);
};
