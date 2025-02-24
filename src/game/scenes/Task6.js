import { Scene } from 'phaser';
import { EventBus } from '../EventBus';
import { typewriteText } from '../TypeWriter';
export class Task6 extends Scene
{
    constructor ()
    {
        super('Task6');
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
        const taskInfo = `quiz`;
        this.add.image(512, 364, 'background').setScale(2, 1);
        
        this.ziom = this.add.image(256, 594, 'ziom').setVisible(false);
        
        this.cameras.main.setZoom(1.3);
        this.cameras.main.setScroll(-330, 0);
        
        this.add.text(500, 500, 'Start Quiz', {
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
                    EventBus.emit('start-quiz');
                //});
            })
            .active = false

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
        this.isPaused = false;
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
}