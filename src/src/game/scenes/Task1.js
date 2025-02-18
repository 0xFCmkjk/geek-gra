import { Scene } from 'phaser';
import { EventBus } from '../EventBus';
export class Task1 extends Scene
{
    constructor ()
    {
        super('Task1');
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
        const taskInfo = `Welcome to the first task of this game!~In this task you have to make a program doing XYZ!
        Good luck! Click me to close.`;

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
                    this.scene.start('Game');
                    this.scene.stop('Task1');
                });
            })
        
        this.add.text(1550, 50, 'Task Info', {
            fontFamily: '"Pixelon"',
            fontSize: '36px',
            color: '#ffffff',
            align: 'center',
            backgroundColor: '#3F414F'
        }).setOrigin(0.5)
            .setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                this.narrator.text = "";
                this.narrator.setVisible(true);
                this.typewriteText(taskInfo);
            })

        this.narrator = this.add.text(1000, 200, "", {
            fontFamily: '"Pixelon"',
            fontSize: '36px',
            color: '#ffffff',
            align: 'center',
            backgroundColor: '#3F414F'
        }).setOrigin(0.5)
            .setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                this.narrator.setVisible(false);
                this.time.removeEvent(this.narrator.typingEvent);
                this.narrator.text = "";
                this.narrator.isTyping = false;
            })
        
        this.narrator.isTyping = false;

        // pass on the scene????
        EventBus.emit('current-scene-ready', this);
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
