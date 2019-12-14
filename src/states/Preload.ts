import Phaser from 'phaser';
import { gameConfig } from '../index';
import stick from '../assets/images/stick.png';
import match from '../assets/images/match.png';

class Preload extends Phaser.Scene {
  constructor() {
    super('Preload');
  }

  preload() {
    this.load.image('stick', stick);
    this.load.image('match', match);

    // show loading screen
    const preloadBar = this.add.image(gameConfig.centerX, gameConfig.centerY, 'preloadbar');
    preloadBar.scale = 3;

    const { x, y, width: w, height: h } = preloadBar;

    // (3) Create a camera to fake a texture crop.
    const camera = this.cameras.add(150, 145, 0, h).setScroll(x, y);

    // (4) Bind the 'progress' event, use its value to stretch the viewport width.
    this.load.on('progress', (n) => camera.setSize(Math.ceil(n * w), h));
  }

  create() {
    this.scene.start('Game');
  }
}

export default Preload;
