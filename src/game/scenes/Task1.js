import { Scene } from 'phaser';
import { EventBus } from '../EventBus';
import { typewriteText } from '../TypeWriter';
export class Task1 extends Scene
{
    constructor ()
    {
        super('Task1');
    }

    preload ()
    {
        this.load.setPath('assets');
        
        this.load.image('task1', 'task1.png');
        this.load.image('ground', 'ground.png');
        this.load.image('ziom', 'ziom.png');
    }

    create ()
    {
        const taskInfo = `Welcome to the first task of this game! In this task you have to find out name of the texture used to render the narrator.\n\nHint: In the Phaser API reference you should check "Phaser.Scene.Children", also you can access the scene object via "scene" variable in the console, eg.: "console.log(scene.children)". Good Luck!\n\nAfter finding the solution, pass it through scene.answer() command, eg.: "scene.answer("TEXTURE NAME")".`;
        
        this.add.image(850, 425, 'task1');

        // add the narrator as an image
        var ziom;
        ziom = this.add.image(256, 594, 'ziom').setVisible(false);
        
        this.add.text(390, 108, 'Back', {
            fontFamily: '"Pixelon"',
            fontSize: '36px',
            color: '#ffffff',
            align: 'center',
            backgroundColor: '#3F414F'
        }).setOrigin(0, 0)
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
        
        // add text for the narrator (ziom)
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
        const answer = "ziom";
        const narratorText = `Congrats! Task completed!\nGo back to the main menu\nwith the "Back" button.`;
        if (params.toString() == answer) {
            ziom.setVisible(true);
            this.narrator.text = typewriteText(this, narratorText, this.narrator, ziom);
            console.log("Correct answer!");
            localStorage.setItem('Task1Completed', 'true');
        }
        else {
            console.log("Wrong answer!");
        }
    }
}

