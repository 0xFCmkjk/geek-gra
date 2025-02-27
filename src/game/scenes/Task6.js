import { Scene } from 'phaser';
import { EventBus } from '../EventBus';
import { typewriteText } from '../TypeWriter';
import { disableNarrator } from '../DisableNarrator';
export class Task6 extends Scene
{
    constructor ()
    {
        super('Task6');
    }

    preload ()
    {
        this.load.setPath('assets');
        
        this.load.image('task6', 'task6.png');
        this.load.image('ziom', 'ziom.png');
    }

    create ()
    {
        const taskInfo = `Quick lesson about human factor in cybersecurity and a lovely quiz.`;
        this.add.image(0, 0, 'task6').setOrigin(0, 0);
        this.ziom = this.add.image(451, 474, 'ziom').setScale(1.25, 1.25).setVisible(false);
           
        this.quizText = this.add.text(850, 425, 'Start Quiz', {
            fontFamily: '"Pixelon"',
            fontSize: '36px',
            color: '#ffffff',
            align: 'center',
            backgroundColor: '#3F414F'
        }).setOrigin(0.5)
            .setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                EventBus.emit('start-quiz', 0);
            })
        this.quizText.setVisible(false);

        this.add.text(137, 64, 'Back', {
            fontFamily: '"Pixelon"',
            fontSize: '36px',
            color: '#ffffff',
            align: 'center',
            backgroundColor: '#3F414F'
        }).setOrigin(0, 0)
            .setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                EventBus.emit('exit-quiz');
                EventBus.emit('back-button-pressed');
                this.cameras.main.fadeOut(500, 0, 0, 0);
                this.time.delayedCall(500, () => {
                    disableNarrator(this);
                    this.scene.start('Game');
                    this.scene.stop('Task6');
                });
            })

        this.resumeButton = this.add.text(560, 650, 'Continue', { 
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

        this.skipButton = this.add.text(560, 600, 'Skip', { 
            fontFamily: '"Pixelon"', 
            fontSize: '36px', 
            color: '#ffffff', 
            backgroundColor: '#3F414F' 
        }).setOrigin(0.5)
          .setInteractive()
          .setVisible(true)
          .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
              typewriteText(this, "~" , this.narrator, this.ziom);
              this.narrator.setVisible(false);
              this.quizText.setVisible(true);
              this.skipButton.setVisible(false);
              disableNarrator(this);
        });

        this.narrator = this.add.text(451, 335, '', {
            fontFamily: '"Pixelon"',
            fontSize: '18px',
            color: '#000000',
            align: 'center'
        }).setOrigin(0.5).setInteractive()
        
        EventBus.on("show-resume-button", () => {
            this.resumeButton.setVisible(true);
        });

        EventBus.on('end-of-text', () => {
            this.quizText.setVisible(true);
            this.skipButton.setVisible(false);
        })

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
            if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Backspace', 'Delete', 'Enter', ' '].includes(event.key)) {
                event.stopPropagation();
            }
        }
        
        EventBus.on('quiz-end', (score) => {
            if (score > 80) {
                localStorage.setItem('Task6Completed', 'true');
            }
        });

        if (!localStorage.getItem('task6-first-run')) {
            this.skipButton.setVisible(false);
            localStorage.setItem('task6-first-run', 'false');
        }

        // pass on the scene, emit an event that taskInfo has been updated
        EventBus.emit('task-info-updated', taskInfo);
        EventBus.emit('current-scene-ready', this);
        this.ziom.setVisible(true);
        typewriteText(this, 
`What are the requirements for a strong password?
Don't use related sequences of characters. Use special
characters, lowercase and uppercase letters.~
I'm sure you know that. But imagine a situation in which
Ms. Ania from the local office has a strong password that
complies with all the requirements, but it is written on a small
innocent piece of paper placed next to her coffee mug.~
What if the system is secured by the book,
the antivirus works, the system is always updated, but when
Ms. Ania goes out to fill her cup she does not lock the screen.
And when a “colleague from another department” calls,
she gives him the sensitive data he asked about without
a second thought.~
Keep in mind that hardware security is very important,
but when you let a thief into your home yourself,
you should not be surprised that you have been robbed.
This also applies to cracked software.~
Even these days, some people trust crackers.~
You are now in for a quick quiz to test your knowledge 
of the basics of everyday cyber security. 
A score above 80% counts the task as done. Good luck!~`, 
        this.narrator, this.ziom); 
    }
}