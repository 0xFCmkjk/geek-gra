import { Scene } from 'phaser';
import { EventBus } from '../EventBus';
export class Game extends Scene
{
    constructor ()
    {
        super('Game');
    }

    preload ()
    {
        this.load.setPath('assets');
        
        this.load.spritesheet('robot', 'robot.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('server1', 'objects/server1.png', { frameWidth: 81, frameHeight: 112 });
        this.load.spritesheet('server2', 'objects/server2.png', { frameWidth: 81, frameHeight: 112 });
        this.load.spritesheet('task', 'taskAnim.png', { frameWidth: 32, frameHeight: 32 });
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
        const taskInfo = `Welcome to Nodebreaker, we recommend you walk around and get familiar with all the tasks.\nAlso check out the quickstart guide, where you will learn about basic concept crucial to beat this game. Have fun!`;

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

        // define taskFields - (single objects)
        var taskField_one;
        var taskField_two;
        var taskField_three;
        var taskField_four;
        var taskField_five;
        var taskField_six;

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

        // north servers
        collids.create(0, 63, 'ground').setOrigin(0, 0).setScale(2.41, 1.54).refreshBody().alpha = 0;

        // task fields should appear after the previous task had been completed
        taskField_one = taskFields.create(18, 635, 'task').setScale(0.5).refreshBody();
        taskField_two = taskFields.create(380, 783, 'task').setScale(0.5).refreshBody().setVisible(false);
        taskField_three = taskFields.create(262, 1087, 'task').setScale(0.5).refreshBody().setVisible(false);
        taskField_four = taskFields.create(686, 152, 'task').setScale(0.5).refreshBody().setVisible(false);
        taskField_five = taskFields.create(1250, 150, 'task').setScale(0.5).refreshBody().setVisible(false);
        taskField_six = taskFields.create(1450, 150, 'task').setScale(0.5).refreshBody().setVisible(false);
        
        // add a player
        this.player = this.physics.add.sprite(1000, 1000, 'robot').refreshBody();
        this.player.speed = 250; // Movement speed

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

        // TODO: make the robot take static position after a move
        // TODO: fix the warning about creating anims again
        
        // track if scene is already changing
        this.sceneChanging = false;

        // INTERSECTIONS WITH TASKFIELDS
        this.physics.add.overlap(this.player, taskField_one, () => {
            if (!this.sceneChanging) {  // Check if transition is already happening
                this.sceneChanging = true; // Set flag to prevent multiple triggers
                
                this.cameras.main.fadeOut(500, 0, 0, 0);
                this.time.delayedCall(500, () => {
                    this.scene.start('Task1');
                });
            }
        }, null, this);

        var taskFieldTwoCollider = this.physics.add.overlap(this.player, taskField_two, () => {
            if (!this.sceneChanging) {  
                this.sceneChanging = true; 
                
                this.cameras.main.fadeOut(500, 0, 0, 0);
                this.time.delayedCall(500, () => {
                    this.scene.start('Task2');
                });
            }
        }, null, this);

        var taskFieldThreeCollider = this.physics.add.overlap(this.player, taskField_three, () => {
            if (!this.sceneChanging) {  
                this.sceneChanging = true; 
                
                this.cameras.main.fadeOut(500, 0, 0, 0);
                this.time.delayedCall(500, () => {
                    this.scene.start('Task3');
                });
            }
        }, null, this);

        var taskFieldFourCollider = this.physics.add.overlap(this.player, taskField_four, () => {
            if (!this.sceneChanging) {  
                this.sceneChanging = true; 
                
                this.cameras.main.fadeOut(500, 0, 0, 0);
                this.time.delayedCall(500, () => {
                    this.scene.start('Task4');
                });
            }
        }, null, this);

        var taskFieldFiveCollider = this.physics.add.overlap(this.player, taskField_five, () => {
            if (!this.sceneChanging) {  
                this.sceneChanging = true; 
                
                this.cameras.main.fadeOut(500, 0, 0, 0);
                this.time.delayedCall(500, () => {
                    this.scene.start('Task5');
                });
            }
        }, null, this);
        
        var taskFieldSixCollider = this.physics.add.overlap(this.player, taskField_six, () => {
            if (!this.sceneChanging) {  
                this.sceneChanging = true; 
                
                this.cameras.main.fadeOut(500, 0, 0, 0);
                this.time.delayedCall(500, () => {
                    this.scene.start('Task6');
                });
            }
        }, null, this);
        
        // create cursors for keyboard input
        this.cursors = this.input.keyboard.createCursorKeys();
        
        // Track pause state
        this.isPaused = false; 

        // Listen for the pause event from the console
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

        // play task animations
        taskField_one.anims.play('task_move', true);
        taskField_two.anims.play('task_move', true);
        taskField_three.anims.play('task_move', true);
        taskField_four.anims.play('task_move', true);
        taskField_five.anims.play('task_move', true);
        taskField_six.anims.play('task_move', true);

        taskFieldTwoCollider.active = false;
        taskFieldThreeCollider.active = false;
        taskFieldFourCollider.active = false;
        taskFieldFiveCollider.active = false;
        taskFieldSixCollider.active = false;

        if (localStorage.getItem('Task1Completed') === 'true') {
            taskField_two.setVisible(true);
            taskFieldTwoCollider.active = true;
        }
        if (localStorage.getItem('Task2Completed') === 'true') {
            taskField_three.setVisible(true);
            taskFieldThreeCollider.active = true;
        }
        if (localStorage.getItem('Task3Completed') === 'true') {
            taskField_four.setVisible(true);
            taskFieldFourCollider.active = true;
        }
        if (localStorage.getItem('Task4Completed') === 'true') {
            taskField_five.setVisible(true);
            taskFieldFiveCollider.active = true;
        }
        if (localStorage.getItem('Task5Completed') === 'true') {
            taskField_six.setVisible(true);
            taskFieldSixCollider.active = true;
        }
        
        //localStorage.removeItem('Task1Completed');
        
        // pass on the scene????
        EventBus.emit('task-info-updated', taskInfo); // for taskinfo
        EventBus.emit('current-scene-ready', this); // for console
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
            return;
        }
        else if (this.cursors.right.isDown && this.cursors.up.isDown){
            this.player.setVelocityX(this.player.speed);
            this.player.setVelocityY(-this.player.speed);
            this.player.anims.play('up', true);
            return;
        }
        else if (this.cursors.right.isDown && this.cursors.down.isDown){
            this.player.setVelocityX(this.player.speed);
            this.player.setVelocityY(this.player.speed);
            this.player.anims.play('rightAndDown', true);
            return;
        }
        else if (this.cursors.left.isDown && this.cursors.down.isDown){
            this.player.setVelocityX(-this.player.speed);
            this.player.setVelocityY(this.player.speed);
            this.player.anims.play('left', true);
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
        else if (this.cursors.up.isDown) {
            this.player.setVelocityY(-this.player.speed);
            this.player.anims.play('up', true);
        } 
        else if (this.cursors.down.isDown) {
            this.player.setVelocityY(this.player.speed);
            this.player.anims.play('rightAndDown', true);
        }
    }
}
