import { Scene } from 'phaser';
import { EventBus } from '../EventBus';
import { typewriteText } from '../TypeWriter';
import { disableNarrator } from '../DisableNarrator';
export class Task2 extends Scene
{
    constructor ()
    {
        super('Task2');
    }

    preload ()
    {
        this.load.setPath('assets');
        
        this.load.image('task1', 'task1.png');
        this.load.image('ziom', 'ziom.png');
    }

    create ()
    {
        const taskInfo = `This time you have to use a for loop to add 5 to all the values in scene.taskData (it is an array, so if you change its values, you have to reload the task). For example, scene.taskData: [1,2,4], so output array should look like this: [6,7,9]. For loops in JS have similar syntax to C for loops.\n\nfor (executed_once; condition; after_codeblock) {\n\tcodeblock\n}\n\nGood luck! Pass array with the answers: scene.answer(array)`;
        this.taskData = [1, 3, 5, 7, 13, 19];

        this.add.image(850, 425, 'task1');
        this.ziom = this.add.image(256, 594, 'ziom').setVisible(false);
        
        this.add.text(430, 130, 'Back', {
            fontFamily: '"Pixelon"',
            fontSize: '36px',
            color: '#ffffff',
            align: 'center',
            backgroundColor: '#3F414F'
        }).setOrigin(0.5)
            .setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                EventBus.emit('back-button-pressed');
                this.cameras.main.fadeOut(500, 0, 0, 0);
                this.time.delayedCall(500, () => {
                    disableNarrator(this);
                    this.scene.start('Game');
                    this.scene.stop('Task2');
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
          .setVisible(false)
          .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
              EventBus.emit("resume-typing");
              this.resumeButton.setVisible(false);
          });
        
        EventBus.on("show-resume-button", () => {
            this.resumeButton.setVisible(true);
        });
        
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
            if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Backspace', 'Delete', 'Enter', ' '].includes(event.key)) {
                event.stopPropagation(); // Stop Phaser from capturing the event
            }
        }

        EventBus.emit('task-info-updated', taskInfo);
        EventBus.emit('current-scene-ready', this);
        this.ziom.setVisible(true);
        typewriteText(this, "Check Task Info!~", this.narrator, this.ziom);
    }

    answer(params) {
        const answer = [6, 8, 10, 12, 18, 24];
        const narratorText = `Congrats! Another task completed!`;
        if (params.toString() == answer.toString()) {
            this.resumeButton.setVisible(false);
            this.ziom.setVisible(true);
            this.narrator.text = typewriteText(this, narratorText, this.narrator, this.ziom);
            console.log("Correct answer!");
            localStorage.setItem('Task2Completed', 'true');
        }
        else {
            console.log("Wrong answer!");
        }
    }
}

