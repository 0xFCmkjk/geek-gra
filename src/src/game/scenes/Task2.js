import { Scene } from 'phaser';
import { EventBus } from '../EventBus';
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
    }

    create ()
    {
        const taskInfo = `This time you have to use a for loop to add 5 to all the values in scene.taskData. Good luck! Pass the array to the scene.answer()`;
        this.taskData = [1, 3, 5, 7, 13, 19];

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
                    // App.jsx listens to this event, when emited it closes the console, so when the character gets back to the main map 
                    // it can walk etc. (physics are resumed)
                    EventBus.emit('back-button-pressed');
                    this.scene.start('Game');
                    this.scene.stop('Task1');
                });
            })
        
        this.narrator = this.add.text(800, 50, '', {
            fontFamily: '"Pixelon"',
            fontSize: '36px',
            color: '#ffffff',
            align: 'center',
            backgroundColor: '#3F414F'
        }).setOrigin(0.5).setInteractive()
        
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

    answer(params) {
        const answer = [6, 8, 10, 12, 18, 24];
        const narratorText = `Congrats! Another task completed!`;
        if (params.toString() == answer.toString()) {
            this.narrator.text = this.typewriteText(narratorText);
            console.log("Correct answer!");
        }
        else {
            console.log("Wrong answer!");
        }
    }

    typewriteText(text) {
        const length = text.length;
        
        // Stop any ongoing typing effect
        if (this.narrator.isTyping) {
            this.time.removeEvent(this.narrator.typingEvent);
            this.narrator.isTyping = false;
            return; 
        }
    
        if (!this.narrator.isTyping) {
            this.narrator.isTyping = true;
            this.narrator.text = ""; 
    
            let i = 0;
            this.narrator.typingEvent = this.time.addEvent({
                callback: () => {
                    if (text[i] != "~"){
                        this.narrator.text += text[i];
                        ++i;
                        if (i === length) {
                            this.narrator.isTyping = false; // Mark typing as finished inside the callback function
                        }
                    }
                    else {
                        this.narrator.text = "";
                        ++i;
                    }
                },
                repeat: length - 1,
                delay: 75
            });
        }
    }
}

