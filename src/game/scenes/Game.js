import { Scene } from 'phaser';
import { EventBus } from '../EventBus';
import { typewriteText } from '../TypeWriter';
import { disableNarrator } from '../DisableNarrator';
export class Game extends Scene
{
    constructor ()
    {
        super('Game');
        this.hasRunned = false;
    }

    preload ()
    {
        this.load.setPath('assets');
        
        this.load.spritesheet('robot', 'robot.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('server1', 'objects/server1.png', { frameWidth: 81, frameHeight: 112 });
        this.load.spritesheet('server2', 'objects/server2.png', { frameWidth: 81, frameHeight: 112 });
        this.load.spritesheet('task', 'taskAnim.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('laptop', 'objects/laptop.png', { frameWidth: 22, frameHeight: 17 });
        this.load.spritesheet('taskMeta', 'taskcompleted.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('taskMetaMini', 'taskcompletedmini.png', { frameWidth: 36, frameHeight: 37 });
        this.load.image('ziom', 'ziom.png');
        this.load.image('background', 'bg.png');
        this.load.image('ground', 'ground.png');
        this.load.image('walls1', 'walls1.png');
        this.load.image('walls2', 'walls2.png'); // aka maxwalls
        this.load.image('walls3', 'walls3.png'); // aka greywalls
        this.load.image('objects', 'objects.png');
    }

    create ()
    {
        //TODO: Make the quickstart guide
        //TODO: local storage player cords
        const taskInfo = `Welcome to Nodebreaker, we recommend you walk around and get familiar with the map. Also check out the quickstart guide, where you will learn about basic concepts crucial to beat this game. Have fun!`;

        // add bg and first walls
        this.add.image(1000, 1000, 'background');
        this.add.image(1000, 1000, 'walls1');
        this.add.image(1000, 1000, 'walls2');
        this.add.image(1000, 1000, 'objects');
        this.add.image(1000, 1000, 'walls3');

        // define taskFields, colliders, servers
        var taskFields;
        var collids;
        var servers1;
        var servers2; // phaser colision
        var laptop = this.physics.add.sprite(787, 118, 'laptop');

        // narrator
        this.ziom = this.add.image(475, 518, 'ziom').setScale(0.75, 0.75).setScrollFactor(0).setVisible(false);

        this.narrator = this.add.text(308, 400, '', {
            fontFamily: '"Pixelon"',
            fontSize: '12px',
            color: '#000000',
            align: 'center'
        }).setInteractive().setScrollFactor(0)
        this.narrator.text = '';

        this.resumeButton = this.add.text(550, 560, 'Continue', { 
            fontFamily: '"Pixelon"', 
            fontSize: '20px', 
            color: '#ffffff', 
            backgroundColor: '#3F414F' 
        }).setOrigin(0.5)
          .setScrollFactor(0)
          .setInteractive()
          .setVisible(false) // Hide at first
          .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
              EventBus.emit("resume-typing"); // Resume typing when clicked (listener is in the TypeWriter.js file)
              this.resumeButton.setVisible(false); // button hides itself
          });

        EventBus.on("show-resume-button", () => {
            this.resumeButton.setVisible(true); // TypeWriter.js emits this event after reaching ~ sign in given text
        });

        
        // define taskFields - (single objects)
        var taskField_one;
        var taskField_two;
        var taskField_three;
        var taskField_four;
        var taskField_five;
        var taskField_six;
        var taskField_seven;
        var taskField_eight;
        var mapField;

        // add static groups
        taskFields = this.physics.add.staticGroup();
        collids = this.physics.add.staticGroup();
        servers1 = this.physics.add.staticGroup();
        servers2 = this.physics.add.staticGroup();

        // servers
        let sv1 = servers1.create(50, 76, 'server1').setOrigin(0, 0).refreshBody();
        let sv2 = servers1.create(170, 76, 'server2').setOrigin(0, 0).refreshBody();
        let sv3 = servers1.create(290, 76, 'server2').setOrigin(0, 0).refreshBody();
        let sv4 = servers1.create(410, 76, 'server1').setOrigin(0, 0).refreshBody();
        let sv5 = servers1.create(530, 76, 'server2').setOrigin(0, 0).refreshBody();
        let sv6 = servers1.create(650, 76, 'server2').setOrigin(0, 0).refreshBody();
        let sv7 = servers2.create(50, 265, 'server2').setOrigin(0, 0).refreshBody();
        let sv8 = servers2.create(170, 265, 'server2').setOrigin(0, 0).refreshBody();
        let sv9 = servers2.create(290, 265, 'server1').setOrigin(0, 0).refreshBody();
        let sv10 = servers2.create(410, 265, 'server2').setOrigin(0, 0).refreshBody();
        let sv11 = servers2.create(530, 265, 'server2').setOrigin(0, 0).refreshBody();
        let sv12 = servers2.create(650, 265, 'server1').setOrigin(0, 0).refreshBody();
       
        // Northwest wall
        collids.create(0, 401, 'ground').setOrigin(0, 0).setScale(3.04, 3.52).refreshBody().alpha = 0;
        collids.create(505, 578, 'ground').setOrigin(0, 0).setScale(1.36, 2.80).refreshBody().alpha = 0;
        collids.create(505, 717, 'ground').setOrigin(0, 0).setScale(0.47, 3.42).refreshBody().alpha = 0;
        collids.create(914, 401, 'ground').setOrigin(0, 0).setScale(0.01, 6.3).refreshBody().alpha = 0;

        // Northeast wall
        collids.create(1085, 401, 'ground').setOrigin(0, 0).setScale(3.04, 3.52).refreshBody().alpha = 0;
        collids.create(1085, 578, 'ground').setOrigin(0, 0).setScale(1.36, 2.80).refreshBody().alpha = 0;
        collids.create(1352, 717, 'ground').setOrigin(0, 0).setScale(0.47, 3.42).refreshBody().alpha = 0;
        collids.create(1081, 401, 'ground').setOrigin(0, 0).setScale(0.01, 6.3).refreshBody().alpha = 0;

        // Southwest wall
        collids.create(0, 1360, 'ground').setOrigin(0, 0).setScale(3.04, 3.52).refreshBody().alpha = 0;
        collids.create(506, 1221, 'ground').setOrigin(0, 0).setScale(1.35, 2.80).refreshBody().alpha = 0;
        collids.create(505, 1049, 'ground').setOrigin(0, 0).setScale(0.47, 6).refreshBody().alpha = 0;
        collids.create(914, 1221, 'ground').setOrigin(0, 0).setScale(0.01, 6.3).refreshBody().alpha = 0;

        // Southeast wall
        collids.create(1085, 1360, 'ground').setOrigin(0, 0).setScale(3.04, 3.52).refreshBody().alpha = 0;
        collids.create(1085, 1221, 'ground').setOrigin(0, 0).setScale(1.35, 2.80).refreshBody().alpha = 0;
        collids.create(1354, 1049, 'ground').setOrigin(0, 0).setScale(0.47, 8).refreshBody().alpha = 0;
        collids.create(1085, 1221, 'ground').setOrigin(0, 0).setScale(0.01, 6.3).refreshBody().alpha = 0;

        // pcs north
        collids.create(66, 760, 'ground').setOrigin(0, 0).setScale(0.20, 0.02).refreshBody().alpha = 0;
        collids.create(66, 675, 'ground').setOrigin(0, 0).setScale(0.20, 0.02).refreshBody().alpha = 0;
        collids.create(66, 589, 'ground').setOrigin(0, 0).setScale(0.20, 0.02).refreshBody().alpha = 0;
        collids.create(207, 760, 'ground').setOrigin(0, 0).setScale(0.20, 0.02).refreshBody().alpha = 0;
        collids.create(207, 675, 'ground').setOrigin(0, 0).setScale(0.20, 0.02).refreshBody().alpha = 0;
        collids.create(207, 589, 'ground').setOrigin(0, 0).setScale(0.20, 0.02).refreshBody().alpha = 0;
        collids.create(350, 760, 'ground').setOrigin(0, 0).setScale(0.20, 0.02).refreshBody().alpha = 0;
        collids.create(350, 675, 'ground').setOrigin(0, 0).setScale(0.20, 0.02).refreshBody().alpha = 0;
        collids.create(350, 589, 'ground').setOrigin(0, 0).setScale(0.20, 0.02).refreshBody().alpha = 0;

        // pcs south
        collids.create(70, 1232, 'ground').setOrigin(0, 0).setScale(0.20, 0.02).refreshBody().alpha = 0; 
        collids.create(70, 1147, 'ground').setOrigin(0, 0).setScale(0.20, 0.02).refreshBody().alpha = 0; 
        collids.create(70, 1061, 'ground').setOrigin(0, 0).setScale(0.20, 0.02).refreshBody().alpha = 0; 
        collids.create(211, 1232, 'ground').setOrigin(0, 0).setScale(0.20, 0.02).refreshBody().alpha = 0;
        collids.create(211, 1147, 'ground').setOrigin(0, 0).setScale(0.20, 0.02).refreshBody().alpha = 0;
        collids.create(211, 1061, 'ground').setOrigin(0, 0).setScale(0.20, 0.02).refreshBody().alpha = 0;
        collids.create(354, 1232, 'ground').setOrigin(0, 0).setScale(0.20, 0.02).refreshBody().alpha = 0;
        collids.create(354, 1147, 'ground').setOrigin(0, 0).setScale(0.20, 0.02).refreshBody().alpha = 0;
        collids.create(354, 1061, 'ground').setOrigin(0, 0).setScale(0.20, 0.02).refreshBody().alpha = 0;

        // bushes
        collids.create(870, 696, 'ground').setOrigin(0, 0).setScale(0.08, 0.6).refreshBody().alpha = 0;
        collids.create(1101, 697, 'ground').setOrigin(0, 0).setScale(0.08, 0.6).refreshBody().alpha = 0;
        collids.create(1312, 853, 'ground').setOrigin(0, 0).setScale(0.08, 0.6).refreshBody().alpha = 0;
        collids.create(1317, 1054, 'ground').setOrigin(0, 0).setScale(0.08, 0.6).refreshBody().alpha = 0;
        collids.create(1112, 1168, 'ground').setOrigin(0, 0).setScale(0.08, 0.6).refreshBody().alpha = 0;
        collids.create(876, 1170, 'ground').setOrigin(0, 0).setScale(0.08, 0.6).refreshBody().alpha = 0;
        collids.create(659, 1047, 'ground').setOrigin(0, 0).setScale(0.08, 0.6).refreshBody().alpha = 0;
        collids.create(659, 850, 'ground').setOrigin(0, 0).setScale(0.08, 0.6).refreshBody().alpha = 0;
        collids.create(1095, 345, 'ground').setOrigin(0, 0).setScale(0.08, 0.6).refreshBody().alpha = 0;
        collids.create(876, 343, 'ground').setOrigin(0, 0).setScale(0.08, 0.6).refreshBody().alpha = 0;
        collids.create(467, 608, 'ground').setOrigin(0, 0).setScale(0.08, 0.3).refreshBody().alpha = 0;
        collids.create(455, 1296, 'ground').setOrigin(0, 0).setScale(0.08, 0.3).refreshBody().alpha = 0;

        // north servers
        collids.create(0, 63, 'ground').setOrigin(0, 0).setScale(2.41, 1.54).refreshBody().alpha = 0;

        // bookshelfs
        collids.create(1527, 581, 'ground').setOrigin(0, 0).setScale(0.9, 1).refreshBody().alpha = 0;
        collids.create(1527, 786, 'ground').setOrigin(0, 0).setScale(0.95, 1.17).refreshBody().alpha = 0;
        collids.create(1527, 1056, 'ground').setOrigin(0, 0).setScale(0.95, 1.17).refreshBody().alpha = 0;
        collids.create(1527, 1261, 'ground').setOrigin(0, 0).setScale(0.95, 1.17).refreshBody().alpha = 0;
        collids.create(1832, 604, 'ground').setOrigin(0, 0).setScale(0.25, 0.24).refreshBody().alpha = 0; // laptop

        // south crates
        collids.create(1153, 1555, 'ground').setOrigin(0, 0).setScale(1, 1.7).refreshBody().alpha = 0;
        collids.create(1250, 1680, 'ground').setOrigin(0, 0).setScale(1, 1).refreshBody().alpha = 0;
        collids.create(1273, 1757, 'ground').setOrigin(0, 0).setScale(1, 1).refreshBody().alpha = 0;
        collids.create(1266, 1809, 'ground').setOrigin(0, 0).setScale(1, 4).refreshBody().alpha = 0;
        collids.create(607, 1540, 'ground').setOrigin(0, 0).setScale(0.35, 2.5).refreshBody().alpha = 0;
        collids.create(714, 1624, 'ground').setOrigin(0, 0).setScale(0.18, 0.45).refreshBody().alpha = 0;
        collids.create(573, 1574, 'ground').setOrigin(0, 0).setScale(0.18, 0.2).refreshBody().alpha = 0;
        collids.create(409, 1808, 'ground').setOrigin(0, 0).setScale(0.37, 3).refreshBody().alpha = 0;
        collids.create(521, 1872, 'ground').setOrigin(0, 0).setScale(0.18, 1).refreshBody().alpha = 0;
        collids.create(13, 1873, 'ground').setOrigin(0, 0).setScale(0.18, 1).refreshBody().alpha = 0;
        collids.create(13, 1873, 'ground').setOrigin(0, 0).setScale(0.18, 1).refreshBody().alpha = 0;
        collids.create(42, 1581, 'ground').setOrigin(0, 0).setScale(0.18, 0.3).refreshBody().alpha = 0;
        collids.create(117, 1647, 'ground').setOrigin(0, 0).setScale(0.47, 3.1).refreshBody().alpha = 0;

        // north crates
        collids.create(1191, 79, 'ground').setOrigin(0, 0).setScale(1.23, 1.14).refreshBody().alpha = 0;
        collids.create(1515, 353, 'ground').setOrigin(0, 0).setScale(0.1, 1.14).refreshBody().alpha = 0;
        collids.create(1575, 117, 'ground').setOrigin(0, 0).setScale(0.18, 0.45).refreshBody().alpha = 0;
        collids.create(1765, 299, 'ground').setOrigin(0, 0).setScale(0.35, 3).refreshBody().alpha = 0;
        collids.create(1884, 370, 'ground').setOrigin(0, 0).setScale(0.1, 1).refreshBody().alpha = 0;
        collids.create(1764, 112, 'ground').setOrigin(0, 0).setScale(0.1, 0.01).refreshBody().alpha = 0;
        collids.create(1867, 123, 'ground').setOrigin(0, 0).setScale(0.20, 0.01).refreshBody().alpha = 0;

        // task fields should appear after the previous task had been completed
        taskField_one = taskFields.create(18, 635, 'task').setScale(0.5).refreshBody();
        taskField_two = taskFields.create(380, 783, 'task').setScale(0.5).refreshBody().setVisible(false);
        taskField_three = taskFields.create(310, 1550, 'task').setScale(0.5).refreshBody().setVisible(false);
        taskField_four = taskFields.create(804, 118, 'task').setScale(0.5).refreshBody().setVisible(false);
        taskField_five = taskFields.create(80, 150, 'task').setScale(0.5).refreshBody().setVisible(false);
        taskField_six = taskFields.create(1872, 615, 'task').setScale(0.5).refreshBody().setVisible(false);
        taskField_seven = taskFields.create(388, 1070, 'task').setScale(0.5).refreshBody().setVisible(false);
        taskField_eight = taskFields.create(100, 1250, 'task').setScale(0.5).refreshBody().setVisible(false);

        // map field
        mapField = taskFields.create(813, 730, '').setScale(0).refreshBody();
        
        // add a player
        this.player = this.physics.add.sprite(1000, 1000, 'robot').refreshBody();
        this.player.speed = 250; // Movement speed
        this.player.facing = 'rightAndDown';

        // set world borders and collisions
        this.physics.world.setBounds(0, 90, 2000, 1840);
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, collids);
        this.physics.add.collider(this.player, servers2);

        // turn gravity to 0, add drag to eliminate freaky behaviour
        this.player.body.setGravity(0, 0);
        this.physics.world.gravity.y = 0;
        this.physics.world.gravity.x = 0;
        this.player.setDamping(true);
        this.player.setDrag(1000);

        // enable camera following (background moves dynamically)
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setLerp(0.1, 0.1);
        this.cameras.main.setZoom(1.5, 1.5);

        if (!this.hasRunned) {
            // add taskMeta animations
            this.anims.create({
                key: 'taskMeta_move',
                frames: this.anims.generateFrameNumbers('taskMeta', { start: 0, end: 11 }),
                frameRate: 15,
                repeat: -1
            });
            //add taskMetaMini animations
            this.anims.create({
                key: 'taskMetaMini_move',
                frames: this.anims.generateFrameNumbers('taskMetaMini', { start: 0, end: 11 }),
                frameRate: 15,
                repeat: -1
            });

            // add laptop animations
            this.anims.create({
                key: 'laptop',
                frames: this.anims.generateFrameNumbers('laptop', { start: 0, end: 2 }),
                frameRate: 10,
                repeat: -1
            });

            // add task animations
            this.anims.create({
                key: 'task_move',
                frames: this.anims.generateFrameNumbers('task', { start: 0, end: 7 }),
                frameRate: 15,
                repeat: -1
            });

            // add server animations
            this.anims.create({
                key: 'blink_s1',
                frames: this.anims.generateFrameNumbers('server1', { start: 0, end: 2 }),
                frameRate: 3,
                repeat: -1
            });

            this.anims.create({
                key: 'blink_s2',
                frames: this.anims.generateFrameNumbers('server2', { start: 0, end: 2 }),
                frameRate: 3,
                repeat: -1
            });

            // add player animations
            this.anims.create({
                key: 'leftUp',
                frames: this.anims.generateFrameNumbers('robot', { start: 9, end: 11 }),
                frameRate: 10
            });

            this.anims.create({
                key: 'left',
                frames: this.anims.generateFrameNumbers('robot', { start: 3, end: 5 }),
                frameRate: 10
            });

            this.anims.create({
                key: 'rightAndDown',
                frames: this.anims.generateFrameNumbers('robot', { start: 0, end: 2 }),
                frameRate: 10
            });

            this.anims.create({
                key: 'up',
                frames: this.anims.generateFrameNumbers('robot', { start: 6, end: 8 }),
                frameRate: 10
            });
            this.hasRunned = true;
        }
        
        // track if scene is already changing
        this.sceneChanging = false;

        this.events.on('shutdown', () => {
            EventBus.off("resume-typing");
            EventBus.off("show-resume-button");
        });

        EventBus.on("resume-game", () => {
            if (this.physics.world) {
                this.physics.resume();
            }
        });

        // INTERSECTIONS WITH TASKFIELDS
        this.physics.add.overlap(this.player, taskField_one, () => {
            if (!this.sceneChanging) {  // Check if transition is already happening
                this.sceneChanging = true; // Set flag to prevent multiple triggers
                disableNarrator(this);
                this.cameras.main.fadeOut(500, 0, 0, 0);
                this.time.delayedCall(500, () => {
                    this.scene.start('Task1');
                });
            }
        }, null, this);

        var taskFieldTwoCollider = this.physics.add.overlap(this.player, taskField_two, () => {
            if (!this.sceneChanging) {  
                this.sceneChanging = true; 
                disableNarrator(this);
                this.cameras.main.fadeOut(500, 0, 0, 0);
                this.time.delayedCall(500, () => {
                    this.scene.start('Task2');
                });
            }
        }, null, this);

        var taskFieldThreeCollider = this.physics.add.overlap(this.player, taskField_three, () => {
            if (!this.sceneChanging) {  
                this.sceneChanging = true; 
                disableNarrator(this);
                this.cameras.main.fadeOut(500, 0, 0, 0);
                this.time.delayedCall(500, () => {
                    this.scene.start('Task3');
                });
            }
        }, null, this);

        var taskFieldFourCollider = this.physics.add.overlap(this.player, taskField_four, () => {
            if (!this.sceneChanging) {  
                this.sceneChanging = true; 
                disableNarrator(this);
                this.time.removeEvent(this.narrator.typingEvent);
                this.cameras.main.fadeOut(500, 0, 0, 0);
                this.time.delayedCall(500, () => {
                    this.scene.start('Task4');
                });
            }
        }, null, this);

        var taskFieldFiveCollider = this.physics.add.overlap(this.player, taskField_five, () => {
            if (!this.sceneChanging) {  
                this.sceneChanging = true; 
                disableNarrator(this);
                this.cameras.main.fadeOut(500, 0, 0, 0);
                this.time.delayedCall(500, () => {
                    this.scene.start('Task5');
                });
            }
        }, null, this);
        
        var taskFieldSixCollider = this.physics.add.overlap(this.player, taskField_six, () => {
            if (!this.sceneChanging) {  
                this.sceneChanging = true; 
                disableNarrator(this);
                this.cameras.main.fadeOut(500, 0, 0, 0);
                this.time.delayedCall(500, () => {
                    this.scene.start('Task6');
                });
            }
        }, null, this);

        var taskFieldSevenCollider = this.physics.add.overlap(this.player, taskField_seven, () => {
            if (!this.sceneChanging) {  
                this.sceneChanging = true; 
                disableNarrator(this);
                this.cameras.main.fadeOut(500, 0, 0, 0);
                this.time.delayedCall(500, () => {
                    this.scene.start('Task7');
                });
            }
        }, null, this);

        var taskFieldEightCollider = this.physics.add.overlap(this.player, taskField_eight, () => {
            if (!this.sceneChanging) {  
                this.sceneChanging = true; 
                disableNarrator(this);
                this.cameras.main.fadeOut(500, 0, 0, 0);
                this.time.delayedCall(500, () => {
                    this.scene.start('Task8');
                });
            }
        }, null, this);

        // map overlap
        this.physics.add.overlap(this.player, mapField, () => {
            EventBus.emit('map');
            this.player.body.setVelocity(0,0);
            this.player.body.y= 740;
            this.physics.pause();
            }, null, this);

        // create cursors for keyboard input
        this.cursors = this.input.keyboard.createCursorKeys();
        
        // Track pause state
        this.isPaused = false; 

        // Listen for the pause event from the console
        this.events.on('toggle-pause', (shouldPause) => {
            if (this.physics.world) {
                if (shouldPause) {
                    this.physics.pause();
                    this.input.keyboard.enabled = false;
                    window.addEventListener('keydown', preventPhaserInput, true);
                } else {
                    this.physics.resume();
                    this.input.keyboard.enabled = true;
                    window.removeEventListener('keydown', preventPhaserInput, true);
                }
            }
        });

        function preventPhaserInput(event) {
            // Allow these keys inside the console
            if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Backspace', 'Delete', 'Enter', ' '].includes(event.key)) {
                event.stopPropagation(); // Stop Phaser from capturing the event
            }
        }

        // play server animations 
        sv1.anims.play('blink_s1', true);
        sv2.anims.play('blink_s2', true);
        sv3.anims.play('blink_s2', true);
        sv4.anims.play('blink_s1', true);
        sv5.anims.play('blink_s2', true);
        sv6.anims.play('blink_s2', true);
        sv7.anims.play('blink_s2', true);
        sv8.anims.play('blink_s2', true);
        sv9.anims.play('blink_s1', true);
        sv10.anims.play('blink_s2', true);
        sv11.anims.play('blink_s2', true);
        sv12.anims.play('blink_s1', true);

        // play laptop animations
        laptop.anims.play('laptop', true);

        // play task animations
        taskField_one.anims.play('task_move', true);
        taskField_two.anims.play('task_move', true);
        taskField_three.anims.play('task_move', true);
        taskField_four.anims.play('task_move', true);
        taskField_five.anims.play('task_move', true);
        taskField_six.anims.play('task_move', true);
        taskField_seven.anims.play('task_move', true);
        taskField_eight.anims.play('task_move', true);

        taskFieldTwoCollider.active = false;
        taskFieldThreeCollider.active = false;
        taskFieldFourCollider.active = false;
        taskFieldFiveCollider.active = false;
        taskFieldSixCollider.active = false;
        taskFieldSevenCollider.active = false;
        taskFieldEightCollider.active = false;

        if (localStorage.getItem('Task1Completed') === 'true') {
            taskField_two.setVisible(true);
            taskFieldTwoCollider.active = true;
            taskField_one.anims.play('taskMetaMini_move', true);
            this.ziom.setVisible(true);
        }
        if (localStorage.getItem('Task2Completed') === 'true') {
            taskField_three.setVisible(true);
            taskFieldThreeCollider.active = true;
            taskField_two.anims.play('taskMetaMini_move', true);
        }
        if (localStorage.getItem('Task3Completed') === 'true') {
            taskField_four.setVisible(true);
            taskFieldFourCollider.active = true;
            taskField_three.anims.play('taskMetaMini_move', true);
        }
        if (localStorage.getItem('Task4Completed') === 'true') {
            taskField_five.setVisible(true);
            taskFieldFiveCollider.active = true;
            taskField_four.anims.play('taskMetaMini_move', true);
        }
        if (localStorage.getItem('Task5Completed') === 'true') {
            taskField_six.setVisible(true);
            taskFieldSixCollider.active = true;
            taskField_five.anims.play('taskMetaMini_move', true);
        }
        if (localStorage.getItem('Task6Completed') === 'true') {
            taskField_seven.setVisible(true);
            taskFieldSevenCollider.active = true;
            taskField_six.anims.play('taskMetaMini_move', true);
        }
        if (localStorage.getItem('Task7Completed') === 'true') {
            taskField_eight.setVisible(true);
            taskFieldEightCollider.active = true;
            taskField_seven.anims.play('taskMetaMini_move', true);
        }
        if (localStorage.getItem('Task8Completed') === 'true') {
            taskField_eight.setVisible(true);
            taskFieldEightCollider.active = true;
            taskField_eight.anims.play('taskMetaMini_move', true);
        }

        this.ziom.setToTop();
        this.narrator.setToTop();
        this.resumeButton.setToTop();

        EventBus.emit('task-info-updated', taskInfo); // for taskinfo
        EventBus.emit('current-scene-ready', this); // for console
        if (!localStorage.getItem('first-run')) {
            this.ziom.setVisible(true);
            typewriteText(this, 
`Welcome! We are happy you've decided to give our game
a go! It's untypical game since it will show you how 
cybersecurity really works in an unusual way. It's way
harder than other games, because you will have to 
search for information on diffrent sites 
and use it to solve tasks.~
Always check task info and use debugging console to
your advantage while working on the tasks 
(Hint: work smart, not hard). Some of them are pretty hard, 
so be prepared for quite a challenge! Also, check out
the map next to the clock, it will help 
you to get to the tasks quicker. Your first task waits 
for you in the office!~`, this.narrator, this.ziom);
            localStorage.setItem('first-run', 'false');
        } 
        else if(!localStorage.getItem('task1CompletedNarrator') && localStorage.getItem('Task1Completed')=== 'true'){
            this.ziom.setVisible(true);
            typewriteText(this, 
            `Great! You've finished your first task! 
            Another one showed up next to it!~`, this.narrator, this.ziom);
            localStorage.setItem('task1CompletedNarrator', 'false');
        }
        else if(!localStorage.getItem('task2CompletedNarrator') && localStorage.getItem('Task2Completed')=== 'true'){
            this.ziom.setVisible(true);
            typewriteText(this, 
            `You are getting better at this. 
            Now let's try something harder. 
            It awaits for you in the storage room!~`, this.narrator, this.ziom);
            localStorage.setItem('task2CompletedNarrator', 'false');
        }
        else if(!localStorage.getItem('task3CompletedNarrator') && localStorage.getItem('Task3Completed')=== 'true'){
            this.ziom.setVisible(true);
            typewriteText(this, 
            `Now you are ready to understand the basics of 
            cybertechnology and it's time for you to "hack" 
            something in the server room.~`, this.narrator, this.ziom);
            localStorage.setItem('task3CompletedNarrator', 'false');
        }
        else if(!localStorage.getItem('task4CompletedNarrator') && localStorage.getItem('Task4Completed')=== 'true'){
            this.ziom.setVisible(true);
            typewriteText(this, 
            `Awesome. Now try the last hacking task. 
            It's avaible on one of the servers. ~`, this.narrator, this.ziom);
            localStorage.setItem('task4CompletedNarrator', 'false');
        }
        else if(!localStorage.getItem('task5CompletedNarrator') && localStorage.getItem('Task5Completed')=== 'true'){
            this.ziom.setVisible(true);
            typewriteText(this, 
            `Okay. You got the practice. 
            Now it's time for some theory. 
            Go to the library for more info.~`, this.narrator, this.ziom);
            localStorage.setItem('task5CompletedNarrator', 'false');
        }
        else if(!localStorage.getItem('task6CompletedNarrator') && localStorage.getItem('Task6Completed')=== 'true'){
            this.ziom.setVisible(true);
            typewriteText(this, 
            `You thought that is your first and last quiz?
            I've got more for you in the office :D ~`, this.narrator, this.ziom);
            localStorage.setItem('task6CompletedNarrator', 'false');
        }
        else if(!localStorage.getItem('task7CompletedNarrator') && localStorage.getItem('Task7Completed')=== 'true'){
            this.ziom.setVisible(true);
            typewriteText(this, 
            `Alright... now this will be your LAST quiz. 
            I promise. It's in the office too.~`, this.narrator, this.ziom);
            localStorage.setItem('task7CompletedNarrator', 'false');
        }
        else if(!localStorage.getItem('task8CompletedNarrator') && localStorage.getItem('Task8Completed')=== 'true'){
            this.ziom.setVisible(true);
            typewriteText(this, 
            `You have managed to make it! 
            I hope you enjoyed my game!~`, this.narrator, this.ziom);
            localStorage.setItem('task8CompletedNarrator', 'false');
        } else {
            disableNarrator(this);
        }
    }

    update (){
        // if the game is paused dont update anything
        if(this.isPaused) return;

        // Reset velocity before applying movement
        this.player.setVelocity(0);

        if (this.cursors.left.isDown && this.cursors.up.isDown) {
            this.player.setVelocityX(-this.player.speed);
            this.player.setVelocityY(-this.player.speed);
            this.player.anims.play('leftUp', true);
            this.player.facing = 'leftUp';
            return;
        }
        else if (this.cursors.right.isDown && this.cursors.up.isDown){
            this.player.setVelocityX(this.player.speed);
            this.player.setVelocityY(-this.player.speed);
            this.player.anims.play('up', true);
            this.player.facing = 'up';
            return;
        }
        else if (this.cursors.right.isDown && this.cursors.down.isDown){
            this.player.setVelocityX(this.player.speed);
            this.player.setVelocityY(this.player.speed);
            this.player.anims.play('rightAndDown', true);
            this.player.facing = 'rightAndDown';
            return;
        }
        else if (this.cursors.left.isDown && this.cursors.down.isDown){
            this.player.setVelocityX(-this.player.speed);
            this.player.setVelocityY(this.player.speed);
            this.player.anims.play('left', true);
            this.player.facing = 'left';
            return;
        }
        
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-this.player.speed);
            this.player.anims.play('left', true);
            this.player.facing = 'left';
        } 
        else if (this.cursors.right.isDown) {
            this.player.setVelocityX(this.player.speed);
            this.player.anims.play('rightAndDown', true);
            this.player.facing = 'rightAndDown';
        }
        else if (this.cursors.up.isDown) {
            this.player.setVelocityY(-this.player.speed);
            this.player.anims.play('up', true);
            this.player.facing = 'up';
        } 
        else if (this.cursors.down.isDown) {
            this.player.setVelocityY(this.player.speed);
            this.player.anims.play('rightAndDown', true);
            this.player.facing = 'rightAndDown';
        }
        else {
            this.player.anims.play(this.player.facing, false);
        }
    }

    quizBackdoor (num) {
        EventBus.emit('start-quiz', num);
    }
}
