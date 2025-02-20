import { Scene } from 'phaser';
import { EventBus } from '../EventBus';
import { typewriteText } from '../TypeWriter';

export class Task3 extends Scene
{
    constructor ()
    {
        super('Task3');
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
        
        this.years = [1970, 1600, 1636, 2024, 2020, 2100]
        this.isLeap = [false, true, true, true, true, false]
        const taskInfo = `Welcome to another task, you have to make a isYearLeap function which checks if the year is leap. In JavaScript functions are usually defined with a function keyword, for example:\n\nfunction abc(parameter) {\n\tlogic here\n}\n\nFunctions can use parameters that are given to them.\nHint: Years that are divisible by 4, are leap, BUT if the year is divisible by 100 it also has to be divisible by 400.\nIf you find the solution, pass function name: scene.asnwer(isYearLeap)`;

        this.add.image(512, 364, 'background');
        this.ziom = this.add.image(256, 594, 'ziom').setVisible(false);
        
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

    answer(ans) {
        const narratorText = `Congrats! Another task completed!`;
        var truthTable = [];
        
        for (let i = 0; i < this.years.length; i++) {
            console.log("------------");
            console.log("Year", this.years[i]);
            console.log("Is leap? (user function): ", ans(this.years[i]));
            truthTable[i] = ans(this.years[i]);
        }

        console.log("Your function output after a for loop:", truthTable);

        if (truthTable.toString() == this.isLeap.toString()) {
            this.ziom.setVisible(true);
            this.narrator.text = typewriteText(this, narratorText, this.narrator);
            console.log("Correct answer!");
        }
        else {
            console.log("Wrong answer!");
        }
    }
}

