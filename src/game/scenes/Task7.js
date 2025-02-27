import { Scene } from 'phaser';
import { EventBus } from '../EventBus';
import { typewriteText } from '../TypeWriter';
import { disableNarrator } from '../DisableNarrator';
export class Task7 extends Scene
{
    constructor ()
    {
        super('Task7');
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
            fontFamily: '"Pixelon"',
            fontSize: '36px',
            color: '#ffffff',
            align: 'center',
            backgroundColor: '#3F414F'
        }).setOrigin(0.5)
            .setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                EventBus.emit('start-quiz', 1);
            })
        this.quizText.setVisible(false);

        this.add.text(390, 108, 'Back', {
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
                    this.scene.stop('Task7');
                });
            })

        this.resumeButton = this.add.text(500, 650, 'Continue', { 
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

        this.skipButton = this.add.text(500, 600, 'Skip', { 
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

        this.narrator = this.add.text(320, 400, '', {
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
                localStorage.setItem('Task7Completed', 'true');
            }
        });

        if (!localStorage.getItem('task7-first-run')) {
            this.skipButton.setVisible(false);
            localStorage.setItem('task7-first-run', 'false');
        }

        // pass on the scene, emit an event that taskInfo has been updated
        EventBus.emit('task-info-updated', taskInfo);
        EventBus.emit('current-scene-ready', this);
        this.ziom.setVisible(true);
        typewriteText(this, 
`Now let's take a closer look at the situation with the 
previously mentioned “colleague.” The set of techniques 
that serves to achieve the goals of such a person is 
called social engineering.~ We are exposed to marketing
every day, every company wants to convince us to buy its product 
or service. However, social engineering science is more on
the dark side.~ 
An example is Kevin Mitnick, whose fantastic book on 
the subject is titled “The Art of Deception. Controlling 
the Human Element of Security”.~ He describes (also from 
his own experience) how criminals e.g.: only by means
of phone calls gained access to sensitive information. 
They often took advantage of: human empathy, 
the hierarchical structure of the company, 
time pressure or when it came to live meetings: 
elegance and confidence.~ The conclusion? Don't trust
messages asking for sensitive data or logging in 
to some site. We can very easily fall victim to so-called 
phishing (always look for the padlock next to the URL).~
Have you ever received a message from a friend requesting
eg. to vote for him in a contest, but when you click the
link the facebook login page looks somewhat suspicious?
Your friend probably didn't look for the padlock.~
Going forward, let's confirm information with 
several sources. If a colleague, through a message, 
asked you to transfer funds along with a promise to give it 
back to you, call and ask if it's definitely them.~
A half-minute conversation is not much, and can save 
you nerves and money. Now as before you are faced with
a quiz. The rules are also familiar to you. Good luck!~`, 
        this.narrator, this.ziom); 
    }
}