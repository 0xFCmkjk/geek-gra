import { Scene } from 'phaser';
import { EventBus } from '../EventBus';
import { typewriteText } from '../TypeWriter';
import { disableNarrator } from '../DisableNarrator';
export class Task8 extends Scene
{
    constructor ()
    {
        super('Task8');
    }

    preload ()
    {
        this.load.setPath('assets');
        
        this.load.image('task1', 'task1.png');
        this.load.image('ziom', 'ziom.png');
    }

    create ()
    {
        const taskInfo = `Quick lesson about social engineering in cybersecurity and a adorable quiz.`;
        this.add.image(0, 0, 'task1').setOrigin(0, 0);
        this.ziom = this.add.image(320, 530, 'ziom').setScale(1.25, 1.25).setVisible(false);
           
        this.quizText = this.add.text(850, 425, 'Start Quiz', {
            fontFamily: '"Pixelify Sans"',
            fontSize: '36px',
            color: '#ffffff',
            align: 'center',
            backgroundColor: '#3F414F'
        }).setOrigin(0.5)
            .setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                EventBus.emit('start-quiz', 2);
            })
        this.quizText.setVisible(false);

        this.add.text(390, 108, 'Back', {
            fontFamily: '"Pixelify Sans"',
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
                    this.scene.stop('Task8');
                });
            })

        this.resumeButton = this.add.text(500, 650, 'Continue', { 
            fontFamily: '"Pixelify Sans"', 
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

        this.skipButton = this.add.text(500, 600, 'Skip', { 
            fontFamily: '"Pixelify Sans"', 
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

        this.narrator = this.add.text(320, 400, '', {
            fontFamily: '"Pixelify Sans"',
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
                localStorage.setItem('Task8Completed', 'true');
            }
        });

        if (!localStorage.getItem('task8-first-run')) {
            this.skipButton.setVisible(false);
            localStorage.setItem('task8-first-run', 'false');
        }

        // pass on the scene, emit an event that taskInfo has been updated
        EventBus.emit('task-info-updated', taskInfo);
        EventBus.emit('current-scene-ready', this);
        this.ziom.setVisible(true);
        typewriteText(this, 
`The time has come for action in practice. The previous two
tasks were designed to make you aware of existing threats,
but now it was time to look your opponent in the eye.~
Let's start with the most important thing: wide-open
eyes - no tool can replace your intuition. Secondly,
the two-step authentication method, the best tool will
be the “Authy” phone app.~ If you have spare funds, you may
also be interested in a physical 2FA key.~ Going further,
a password manager - “Bitwarden” or “KeePass” will work best
and are free.~ A matter worth nothing is also “dirty” accounts in
various services (email, etc.). If, for example, you need to
log on to email at school or the library, it is best to have a
dedicated account for these situations.~ Losing such an account
certainly hurts less than the head mailbox to which we have all
our services and social networks hooked up. Of course, the risk
decreases as we begin to use security and have our eyes open.~
As always, good luck!~`, 
        this.narrator, this.ziom); 
    }
}