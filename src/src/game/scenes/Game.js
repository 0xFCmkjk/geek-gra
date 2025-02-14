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
        // add bg
        this.add.image(600, 781, 'background');
        // make sure the fonts are ready, then add the game title 
        // TODO: make the title above the game contener not in the game contener
        
        /*
        document.fonts.ready.then(() => {
            this.add.text(512, 30, 'NAME OF THE GAME', {
                fontFamily: '"Pixelon"',
                fontSize: '38px',
                color: '#ffffff',
                align: 'center'
            }).setOrigin(0.5);
        }); */
        
        // add platforms, they have to be declared first
        var platforms;
        platforms = this.physics.add.staticGroup();
        platforms.create(500, 500, 'ground').setScale(2).refreshBody();

        // add a player
        this.player = this.physics.add.sprite(450, 300, 'star');
        
        // set world borders and collisions
        this.physics.world.setBounds(0,0,1200,1562);
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, platforms);

        // make the character walk like in undertale
        this.player.body.setGravity(0, 0);
        this.physics.world.gravity.y = 0;
        this.player.setDamping(true);
        this.player.setDrag(1000);

        // enable camera following (background moves dynamically)
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setLerp(0.1, 0.1);
        
        // create cursors for keyboard input
        this.cursors = this.input.keyboard.createCursorKeys();

        // pass on the scene????
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
