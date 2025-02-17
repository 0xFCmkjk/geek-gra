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
        
        this.load.spritesheet('robot', 'robot.png', { frameWidth: 64, frameHeight: 64 });
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
        var taskFields;

        platforms = this.physics.add.staticGroup();
        taskFields = this.physics.add.staticGroup();
        
        platforms.create(500, 500, 'ground').setScale(2).refreshBody();
        taskFields.create(100, 100, 'ground').setScale(0.5).refreshBody();

        // add a player
        this.player = this.physics.add.sprite(450, 300, 'robot');
        this.player.speed = 300; // Movement speed

        // add player animations

        this.anims.create({
            key: 'leftUp',
            frames: this.anims.generateFrameNumbers('robot', { start: 9, end: 11 }),
            frameRate: 10
        });

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('robot', { start: 3, end: 5 }),
            frameRate: 10
        });
        
        this.anims.create({
            key: 'rightAndDown',
            frames: this.anims.generateFrameNumbers('robot', { start: 0, end: 2 }),
            frameRate: 10
        });

        this.anims.create({
            key: 'up',
            frames: this.anims.generateFrameNumbers('robot', { start: 6, end: 8 }),
            frameRate: 10
        });

        this.anims.create({
            key: 'staticLeftUp',
            frames: [ { key: 'robot', frame: 9 } ],
            frameRate: 10
        });
        
        this.anims.create({
            key: 'staticRightUp',
            frames: [ { key: 'robot', frame: 6 } ],
            frameRate: 10
        });

        this.anims.create({
            key: 'staticLeftDown',
            frames: [ { key: 'robot', frame: 3 } ],
            frameRate: 10
        });
        
        this.anims.create({
            key: 'staticRightDown',
            frames: [ { key: 'robot', frame: 0 } ],
            frameRate: 10
        });
        
        this.sceneChanging = false;
        // Detecting intersections with taskFields
        this.physics.add.overlap(this.player, taskFields, () => {
            if (!this.sceneChanging) {  // Check if transition is already happening
                this.sceneChanging = true; // Set flag to prevent multiple triggers
                
                this.cameras.main.fadeOut(500, 0, 0, 0);
                this.time.delayedCall(500, () => {
                    this.scene.start('Task1');
                });
            }
        }, null, this);

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
        
        // New variable to track pause state
        this.isPaused = false; 

        // Listen for the pause event from the console
        this.events.on('toggle-pause', (shouldPause) => {
            if (shouldPause) {
                this.physics.pause();
                this.input.keyboard.enabled = false;
                window.addEventListener('keydown', preventPhaserInput, true);
            } else {
                this.physics.resume();
                this.input.keyboard.enabled = true;
                window.removeEventListener('keydown', preventPhaserInput, true);
            }
        });

        function preventPhaserInput(event) {
            // Allow these keys inside the console
            if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Backspace', 'Delete', 'Enter', ' '].includes(event.key)) {
                event.stopPropagation(); // Stop Phaser from capturing the event
            }
        }

        // pass on the scene????
        EventBus.emit('current-scene-ready', this);
    }

    update (){
        // if the game is paused dont update anything
        if(this.isPaused) return;

        // Reset velocity before applying movement
        this.player.setVelocity(0);

        if (this.cursors.left.isDown && this.cursors.up.isDown) {
            this.player.setVelocityX(-this.player.speed);
            this.player.setVelocityY(-this.player.speed);
            this.player.anims.play('leftUp', true);
            return;
        }
        else if (this.cursors.right.isDown && this.cursors.up.isDown){
            this.player.setVelocityX(this.player.speed);
            this.player.setVelocityY(-this.player.speed);
            this.player.anims.play('up', true);
            return;
        }
        else if (this.cursors.right.isDown && this.cursors.down.isDown){
            this.player.setVelocityX(this.player.speed);
            this.player.setVelocityY(this.player.speed);
            this.player.anims.play('rightAndDown', true);
            return;
        }
        else if (this.cursors.left.isDown && this.cursors.down.isDown){
            this.player.setVelocityX(-this.player.speed);
            this.player.setVelocityY(this.player.speed);
            this.player.anims.play('left', true);
            return;
        }
        
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-this.player.speed);
            this.player.anims.play('left', true);
        } 
        else if (this.cursors.right.isDown) {
            this.player.setVelocityX(this.player.speed);
            this.player.anims.play('rightAndDown', true);
        }
        else if (this.cursors.up.isDown) {
            this.player.setVelocityY(-this.player.speed);
            this.player.anims.play('up', true);
        } 
        else if (this.cursors.down.isDown) {
            this.player.setVelocityY(this.player.speed);
            this.player.anims.play('rightAndDown', true);
        }
    }
}
