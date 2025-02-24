import { Scene } from 'phaser';
import { EventBus } from '../EventBus';
import { typewriteText } from '../TypeWriter';
export class Task2 extends Scene
{
    constructor ()
    {
        super('Task2');
    }

    preload ()
    {
        this.load.setPath('assets');
        
        this.load.image('background', 'bg.png');
        this.load.image('ground', 'ground.png');
        this.load.image('ziom', 'ziom.png');
    }

    create ()
    {
        const taskInfo = `This time you have to use a for loop to add 5 to all the values in scene.taskData (it is an array). For loops in JS have similar syntax to C for loops.\n\nfor (executed_once; condition; after_codeblock) {\n\tcodeblock\n}\n\nGood luck! Pass array with the answers: scene.answer(array)`;
        this.taskData = [1, 3, 5, 7, 13, 19];

        //this.add.image(512, 364, 'background');
        var ziom;
        ziom = this.add.image(256, 594, 'ziom').setVisible(false);
        
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
                    // App.jsx listens to this event, when emited it closes the console, so when the character gets back to the main map 
                    // it can walk etc. (physics are resumed)
                    EventBus.emit('back-button-pressed');
                    this.scene.start('Game');
                    this.scene.stop('Task1');
                });
            })
        
        this.narrator = this.add.text(260, 480, '', {
            fontFamily: '"Pixelon"',
            fontSize: '28px',
            color: '#000000',
            align: 'center'
        }).setOrigin(0.5).setInteractive()

        
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
        ziom.setVisible(true);
        typewriteText(this, "Check Task Info!~", this.narrator, ziom);
    }

    answer(params) {
        const answer = [6, 8, 10, 12, 18, 24];
        const narratorText = `Congrats! Another task completed!`;
        if (params.toString() == answer.toString()) {
            ziom.setVisible(true);
            this.narrator.text = typewriteText(this, narratorText, this.narrator, ziom);
            console.log("Correct answer!");
        }
        else {
            console.log("Wrong answer!");
        }
    }
}

