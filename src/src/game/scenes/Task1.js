import { Scene } from 'phaser';
import { EventBus } from '../EventBus';
export class Task1 extends Scene
{
    constructor ()
    {
        super('Task1');
    }

    preload ()
    {
        this.load.setPath('assets');
        
        this.load.image('star', 'star.png');
        this.load.image('background', 'bg.png');
        this.load.image('ground', 'ground.png');
    }

    create ()
    {
        this.add.image(600, 781, 'background');
        this.add.text(200, 50, 'BACK TO THE MAP', {
            fontFamily: '"Pixelon"',
            fontSize: '36px',
            color: '#ffffff',
            align: 'center',
            backgroundColor: '#3F414F'
        }).setOrigin(0.5)
            .setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                this.cameras.main.fadeOut(500, 0, 0, 0);
                this.time.delayedCall(500, () => {
                    this.scene.start('Game');
                    this.scene.stop('Task1');
                });
            })
        
        /*
        document.fonts.ready.then(() => {
            this.add.text(512, 30, 'NAME OF THE GAME', {
                fontFamily: '"Pixelon"',
                fontSize: '38px',
                color: '#ffffff',
                align: 'center'
            }).setOrigin(0.5);
        }); */

        // pass on the scene????
        EventBus.emit('current-scene-ready', this);
    }
}
