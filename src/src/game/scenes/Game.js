import { Scene } from 'phaser';
import { EventBus } from '../EventBus';
export class Game extends Scene
{
    constructor ()
    {
        super('Game');
    }

    preload ()
    {
        this.load.setPath('assets');
        
        this.load.image('star', 'star.png');
        this.load.image('background', 'bg.png');
        this.load.image('logo', 'logo.png');
    }

    create ()
    {
        this.add.image(512, 384, 'background');
        document.fonts.ready.then(() => {
            this.add.text(512, 30, 'NAME OF THE GAME', {
                fontFamily: '"Pixelon"',
                fontSize: '38px',
                color: '#ffffff',
                align: 'center'
            }).setOrigin(0.5);
        });
        
        EventBus.emit('current-scene-ready', this);

    }
}
