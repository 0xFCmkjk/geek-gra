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
        this.load.image('ground', 'ground.png');
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
        
        var platforms;
        platforms = this.physics.add.staticGroup();
        platforms.create(500, 500, 'ground').setScale(2).refreshBody();

        this.player = this.physics.add.sprite(450, 300, 'star');
        //this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);

        this.player.body.setGravity(0, 0);
        this.physics.world.gravity.y = 0;
        //this.player.allowGravity(false);
        this.player.setDamping(true);
        this.player.setDrag(1000);

        this.physics.add.collider(this.player, platforms);
        
        this.cursors = this.input.keyboard.createCursorKeys();

        EventBus.emit('current-scene-ready', this);
    }

    update (){
        let speed = 300; // Movement speed
        // Reset velocity before applying movement
        this.player.setVelocity(0);

        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-speed);
        } 
        else if (this.cursors.right.isDown) {
            this.player.setVelocityX(speed);
        }

        if (this.cursors.up.isDown) {
            this.player.setVelocityY(-speed);
        } 
        else if (this.cursors.down.isDown) {
            this.player.setVelocityY(speed);
        }
    }
}
