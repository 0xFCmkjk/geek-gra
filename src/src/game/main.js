import { Game as MainGame } from './scenes/Game';
import { Task1 } from './scenes/Task1';
import { Task2 } from './scenes/Task2';
import { Task3 } from './scenes/Task3';
import { Task4 } from './scenes/Task4';
import { Task5 } from './scenes/Task5';
import { Task6 } from './scenes/Task6';
import { AUTO, Game } from 'phaser';

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config = {
    type: AUTO,
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
        Task1,
        Task2,
        Task3,
        Task4,
        Task5,
        Task6
    ]
};

const StartGame = (parent) => {
    return new Game({ ...config, parent });
}

export default StartGame;

