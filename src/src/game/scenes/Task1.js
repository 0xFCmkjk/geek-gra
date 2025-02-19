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
        const taskInfo = `Welcome to the first task of this game!~In this task you have to make a program doing XYZ!
        Good luck! Click me to close.`;

        this.add.image(512, 364, 'background');
        this.add.text(100, 50, 'Back', {
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

        // pass on the scene????
        EventBus.emit('task-info-updated', taskInfo);
        EventBus.emit('current-scene-ready', this);
    }
}

