import { Game as MainGame } from './scenes/Game';
import { Task1} from './scenes/Task1';
import { AUTO, Game } from 'phaser';

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config = {
    type: AUTO,
    // TODO: change game resolution to a bigger one
    width: 1700,
    height: 850,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            fixedStep: false,
            debug: false
        }
    },
    parent: 'game-container',
    backgroundColor: '#028af8',
    scene: [
        MainGame,
        Task1
    ]
};

const StartGame = (parent) => {
    return new Game({ ...config, parent });
}

export default StartGame;

