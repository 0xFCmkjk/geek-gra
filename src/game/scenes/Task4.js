import { Scene } from 'phaser';
import { EventBus } from '../EventBus';
import { typewriteText } from '../TypeWriter';
export class Task4 extends Scene
{
    constructor ()
    {
        super('Task4');
    }

    preload ()
    {
        this.load.setPath('assets');
        
        this.load.image('background', 'bg.png');
        this.load.spritesheet('robot', 'robot.png', { frameWidth: 64, frameHeight: 64 });
        this.load.image('star', 'star.png');
        this.load.image('ground', 'ground.png');
        this.load.image('ziom', 'ziom.png');
    }

    create ()
    {
        const taskInfo = `You have to reach the top, but your character doesn't jump high enough. Change proper parameter. Remember that you can use Phaser Documentation and API Reference. Hint: Which physical phenomenon attracts bodies to the ground?\nAs usually, you have to reference Phaser.Scene as scene.`;

        this.add.image(512, 364, 'background').setScale(2, 1);
        this.ziom = this.add.image(256, 594, 'ziom').setVisible(false);
        
        var platforms;
        platforms = this.physics.add.staticGroup();
        platforms.create(300, 728, "ground").setScale(6, 1).refreshBody();
        platforms.create(500, 500, "ground").refreshBody();
        platforms.create(800, 300, "ground").refreshBody();
        platforms.create(350, 250, "ground").refreshBody();

        this.star = this.physics.add.image(350, 190, 'star');

        this.player = this.physics.add.sprite(300, 500, 'robot')
        this.player.speed = 200;

        // physics
        this.physics.world.setBounds(0, 0);
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, platforms);
        this.physics.add.collider(this.star, platforms);
        this.player.body.setGravityY(300);
        this.player.setBounce(0.2);

        // camera
        this.cameras.main.setZoom(1.3);
        this.cameras.main.setScroll(-330, 0);
        
        this.physics.add.overlap(this.player, this.star, () => {
            if (!this.sceneChanging) {  // Check if transition is already happening
                this.sceneChanging = true; // Set flag to prevent multiple triggers
                //this.cameras.main.fadeOut(500, 0, 0, 0);
                //this.time.delayedCall(500, () => {
                    EventBus.emit('back-button-pressed');
                    this.scene.start('Game');
                    this.scene.stop('Task1');
                //});
            }
        }, null, this);

        this.add.text(-80, 130, 'Back', {
            fontFamily: '"Pixelon"',
            fontSize: '36px',
            color: '#ffffff',
            align: 'center',
            backgroundColor: '#3F414F'
        }).setOrigin(0.5)
            .setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                //this.cameras.main.fadeOut(500, 0, 0, 0);
                //this.time.delayedCall(500, () => {
                    // App.jsx listens to this event, when emited it closes the console, so when the character gets back to the main map 
                    // it can walk etc. (physics are resumed)
                    EventBus.emit('back-button-pressed');
                    this.scene.start('Game');
                    this.scene.stop('Task1');
                //});
            })

        
        this.resumeButton = this.add.text(400, 650, 'Continue', { 
            fontFamily: '"Pixelon"', 
            fontSize: '36px', 
            color: '#ffffff', 
            backgroundColor: '#3F414F' 
        }).setOrigin(0.5)
          .setInteractive()
          .setVisible(false) // Hide at first
          .on('pointerdown', () => {
              EventBus.emit("resume-typing"); // Resume typing when clicked
              this.resumeButton.setVisible(false);
          });
        
        EventBus.on("show-resume-button", () => {
            this.resumeButton.setVisible(true);
        });

        // create cursors for keyboard input
        this.cursors = this.input.keyboard.createCursorKeys();
        
        // CONSOLE ARROWS FIX
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

        // pass on the scene, emit an event that taskInfo has been updated
        EventBus.emit('task-info-updated', taskInfo);
        EventBus.emit('current-scene-ready', this);
    }

    update (){
        // if the game is paused dont update anything
        if(this.isPaused) return;

        // Reset velocity before applying movement
        //this.player.setVelocity(0);

        if (this.cursors.left.isDown && this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityX(-this.player.speed);
            this.player.setVelocityY(-this.player.speed * 2);
            this.player.anims.play('leftUp', true);
            return;
        }
        else if (this.cursors.right.isDown && this.cursors.up.isDown && this.player.body.touching.down){
            this.player.setVelocityX(this.player.speed);
            this.player.setVelocityY(-this.player.speed * 2);
            this.player.anims.play('up', true);
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
        else if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-this.player.speed * 2);
        }
        else {
            this.player.setVelocityX(0);
        }
    }
}

