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
        
        this.load.image('storageTask', 'task3.png');
        this.load.image('ziom', 'ziom.png');
    }

    create ()
    {
        
        this.years = [1970, 1600, 1636, 2024, 2020, 2100]
        this.isLeap = [false, true, true, true, true, false]
        const taskInfo = `Welcome to another task, you have to make a isYearLeap function which checks if the year is leap. In JavaScript functions are usually defined with a function keyword, for example:\n\nfunction abc(parameter) {\n\tlogic here\n}\n\nFunctions can use parameters that are given to them, also they can return things.\nHint: Years that are divisible by 4, are leap, BUT if the year is divisible by 100 it also has to be divisible by 400.\nIf you find the solution, pass function name: scene.asnwer(isYearLeap)`;

        this.add.image(850, 425, 'storageTask');
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
                    EventBus.emit('back-button-pressed');
                    this.scene.start('Game');
                    this.scene.stop('Task3');
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
          .on('pointerdown', () => {
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
                event.stopPropagation(); 
            }
        }

        EventBus.emit('task-info-updated', taskInfo);
        EventBus.emit('current-scene-ready', this);
        this.ziom.setVisible(true);
        typewriteText(this, "Check Task Info!~", this.narrator, this.ziom);
    }

    answer(ans) {
        const narratorText = `Congrats! Another task completed!`;
        var truthTable = [];
        
        for (let i = 0; i < this.years.length; i++) {
            console.log("------------");
            console.log("Year", this.years[i]);
            console.log("Is leap? (user function): ", ans(this.years[i]));
            console.log("Is leap? (task's table): ", this.isLeap[i]);
            truthTable[i] = ans(this.years[i]);
        }

        console.log("Your function output after a for loop:", truthTable);

        if (truthTable.toString() == this.isLeap.toString()) {
            this.ziom.setVisible(true);
            this.narrator.text = typewriteText(this, narratorText, this.narrator, this.ziom);
            console.log("Correct answer!");
            localStorage.setItem('Task3Completed', 'true');
        }
        else {
            console.log("Wrong answer!");
        }
    }
}

