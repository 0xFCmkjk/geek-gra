import { Scene } from 'phaser';
import { EventBus } from '../EventBus';
import { typewriteText } from '../TypeWriter';
import { disableNarrator } from '../DisableNarrator';
export class Task4 extends Scene
{
    constructor ()
    {
        super('Task4');
    }

    preload ()
    {
        this.load.setPath('assets');
        
        this.load.image('task4', 'task4.png');
        this.load.spritesheet('robot', 'robot.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('taskMeta', 'taskcompleted.png', { frameWidth: 64, frameHeight: 64 });
        this.load.image('ground', 'ground.png');
        this.load.image('ziom', 'ziom.png');
    }

    create ()
    {
        const taskInfo = `This time you have a opportunity to play the role of a hacker. You have to reach the top, but your character doesn't jump high enough. Change proper parameter. Remember that you can use Phaser Documentation and API Reference. Hint: Which physical phenomenon attracts bodies to the ground? Change it to 0, but only for the player body and Y axis.\nAs usually, you have to reference Phaser.Scene as scene, also you can reference the player object with scene.player.`;

        this.add.image(850, 425, 'task4');
        
        var platforms;
        platforms = this.physics.add.staticGroup();
        platforms.create(131, 765, "ground").setOrigin(0, 0).setScale(4.79, 0.5).refreshBody();
        platforms.create(500, 600, "ground").refreshBody();
        platforms.create(800, 350, "ground").refreshBody();
        platforms.create(350, 300, "ground").refreshBody();
        
        this.ziom = this.add.image(256, 594, 'ziom').setVisible(false);
        this.taskMeta = this.physics.add.sprite(350, 190, 'taskMeta');
        this.player = this.physics.add.sprite(300, 700, 'robot').setVisible(false);
        this.player.speed = 200;

        // physics
        this.physics.world.setBounds(127, 57, 1440, 850);
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, platforms);
        this.physics.add.collider(this.taskMeta, platforms);
        this.player.body.setGravityY(300);
        this.player.setBounce(0.2);
        
        this.physics.add.overlap(this.player, this.taskMeta, () => {
            if (!this.sceneChanging) {  // Check if transition is already happening
                this.sceneChanging = true; // Set flag to prevent multiple triggers
                this.cameras.main.fadeOut(500, 0, 0, 0);
                this.time.delayedCall(500, () => {
                    disableNarrator(this);
                    EventBus.emit('back-button-pressed');
                    localStorage.setItem('Task4Completed', 'true');
                    this.scene.start('Game');
                    this.scene.stop('Task4');
                });
            }
        }, null, this);

        this.add.text(137, 62, 'Back', {
            fontFamily: '"Pixelon"',
            fontSize: '36px',
            color: '#ffffff',
            align: 'center',
            backgroundColor: '#3F414F'
        }).setOrigin(0, 0)
            .setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                EventBus.emit('back-button-pressed');
                this.cameras.main.fadeOut(500, 0, 0, 0);
                this.time.delayedCall(500, () => {
                    disableNarrator(this);
                    this.scene.start('Game');
                    this.scene.stop('Task4');
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
              this.player.setVisible(true);
          });
        
        EventBus.on("show-resume-button", () => {
            this.resumeButton.setVisible(true);
        });

        this.cursors = this.input.keyboard.createCursorKeys();
        
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

        this.taskMeta.anims.play('taskMeta_move', true);

        EventBus.emit('task-info-updated', taskInfo);
        EventBus.emit('current-scene-ready', this);
        this.ziom.setVisible(true);
        typewriteText(this, "Check Task Info!~", this.narrator, this.ziom);
    }

    update (){
        // if the game is paused dont update anything
        if(this.isPaused) return;

        if (this.cursors.left.isDown && this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityX(-this.player.speed);
            this.player.setVelocityY(-this.player.speed * 2);
            this.player.anims.play('left', true);
            return;
        }
        else if (this.cursors.right.isDown && this.cursors.up.isDown && this.player.body.touching.down){
            this.player.setVelocityX(this.player.speed);
            this.player.setVelocityY(-this.player.speed * 2);
            this.player.anims.play('rightAndDown', true);
            return;
        }
        
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-this.player.speed);
            this.player.anims.play('left', true);
        } 
        else if (this.cursors.right.isDown) {
            this.player.setVelocityX(this.player.speed);
            this.player.anims.play('rightAndDown', true);
        }
        else if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-this.player.speed * 2);
        }
        else {
            this.player.setVelocityX(0);
        }
    }
}

