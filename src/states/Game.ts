import Phaser from 'phaser';
import { gameConfig } from '../index';
import { Interface } from 'readline';

class Game extends Phaser.Scene {
  constructor() {
    super('Game');

    // @ts-ignore
    this.score = 0;
    // @ts-ignore
    this.matches = [];
  }

  init() {}

  preload() {
    console.log(this);
  }

  create() {
    //  Our Text object to display the Score
    let info = this.add.text(10, 10, 'Score: 0', { font: '48px Arial', fill: '#ffffff' });

    //  Grab a reference to the Game Scene
    // let ourGame = this.scene.get('GameScene');

    //  Listen for events from it
    this.events.on(
      'addScore',
      function() {
        this.score += 10;

        info.setText('Score: ' + this.score);
      },
      this
    );

    // this.add.image(gameConfig.width, gameConfig.height, 'bg');

    for (let i = 0; i < 64; i++) {
      let x = Phaser.Math.Between(50, gameConfig.width - 50);
      let y = Phaser.Math.Between(100, gameConfig.height - 50);

      const stick = this.physics.add.sprite(x, y, 'match').setInteractive();
      stick.angle = Phaser.Math.Between(-180, 180);
      // @ts-ignore
      this.matches.push(stick);
    }
    // @ts-ignore

    console.log(this.matches);
    this.input.on('gameobjectup', this.clickHandler, this);
  }

  clickHandler(pointer, box) {
    // @ts-ignore

    const index = this.matches.findIndex((e) => e === box);
    // @ts-ignore
    const collided = this.physics.add.collider(box, this.matches[index + 1], console.log('collided'));
    debugger;

    //  Disable our box
    box.input.enabled = false;
    box.setVisible(false);

    //  Dispatch a Scene event
    this.events.emit('addScore');
  }

  update() {
    // console.log(this);
  }

  render() {
    // this.game.debug.text(this.game.time.fps || '--', 20, 70, "#00ff00", "40px Courier");
  }
}

export default Game;
