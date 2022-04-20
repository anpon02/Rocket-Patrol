class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }
    preload() {
        //load images/tile sprites
        this.load.image('newBoarder', './assets/newBoarder.png' );
        this.load.image('newRocket', './assets/newRocket.png' );
        this.load.image('newRocket2', './assets/newRocket2.png');
        this.load.image('newShip', './assets/newShip.png');
        this.load.image('SmallShip', './assets/SmallShip.png');
        this.load.image('newStars', './assets/newStars.png');
        this.load.image('testStartwo', './assets/testStartwo.png');
        this.load.spritesheet('Explosion2', './assets/Explosion2.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
        
    }

    create() {
        //place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'newStars').setOrigin(0, 0);
        this.starfield2 = this.add.tileSprite(0, 0, 640, 480, 'testStartwo').setOrigin(0, 0);

        //add spaceships (x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'newShip', 0, 30).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'newShip', 0, 20).setOrigin(0, 0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'newShip', 0, 10).setOrigin(0, 0);

        //green UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0);

        //white borders
        // this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        // this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        // this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        // this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);

        this.newboarder = this.add.tileSprite(0, 0, 640, 480, 'newBoarder').setOrigin(0, 0);

        //add rocekt (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'newRocket').setOrigin(0.5, 0);
        //add rocekt (p2)
        this.p2Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'newRocket').setOrigin(0.5, 0);
    

        //define keys
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

        this.p1Rocket.fireKey = keyUP;
        this.p1Rocket.leftKey = keyLEFT;
        this.p1Rocket.rightKey = keyRIGHT;

        this.p2Rocket.fireKey = keyW;
        this.p2Rocket.leftKey = keyA;
        this.p2Rocket.rightKey = keyD;

        //animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('Explosion2', {start: 0, end: 9, first: 0}),
            frameRate: 30
        });

        // initialize score
        this.p1Score = 0;
        this.p2Score = 0;

        // display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '24px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 70
        }

        // fire text
        let playConfig = {
            fontFamily: 'Courier',
            fontSize: '24px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        //FIRE UI text
        this.fireText = this.add.text(game.config.width/2.20, game.config.height/2 - borderUISize*4.95 - borderPadding, 'FIRE', playConfig).setOrigin(0.5);
        this.compuText = this.add.text(game.config.width/1.85, game.config.height/2.15 - borderUISize*4.95 - borderPadding, 'COMPUTER', playConfig);//.setOrigin(0.5);

        //display scores 
        this.scoreRight = this.add.text(borderUISize + borderPadding*2, borderUISize + borderPadding*2, this.p1Score, scoreConfig);
        this.scoreLeft = this.add.text(borderUISize*15.80 + borderPadding, borderUISize + borderPadding*2, this.p2Score, scoreConfig);

        
        //game over flag
        this.gameOver = false;

        //60 second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or <- for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);
    }

    update() {
        //check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }
        
        this.starfield.tilePositionX -= 4;
        this.starfield2.tilePositionX -= 2;
        
        if (!this.gameOver) {
            //update the rocket
            this.p1Rocket.update();
            this.p2Rocket.update();

            //update the spaceships
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
        }
        

        //check collisions
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
        }
        if(this.checkCollision(this.p2Rocket, this.ship03)) {
            this.p2Rocket.reset();
            this.shipExplode2(this.ship03);
        }
        if(this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if(this.checkCollision(this.p2Rocket, this.ship02)) {
            this.p2Rocket.reset();
            this.shipExplode2(this.ship02);
        }
        if(this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }
        if(this.checkCollision(this.p2Rocket, this.ship01)) {
            this.p2Rocket.reset();
            this.shipExplode2(this.ship01);
        }
    }

    checkCollision(rocket, ship) {
        //simple AABB checking
        if (rocket.x < ship.x + ship.width &&
            rocket.x + rocket.width > ship.x &&
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship.y) {
                return true;
        }
        else {
            return false;
        }
    }

    shipExplode(ship) {
        //temporarily hide ship
        ship.alpha = 0;
        //create explosion at ships position
        let boom = this.add.sprite(ship.x, ship.y, 'Explosion2').setOrigin(0, 0);
        boom.anims.play('explode');
        boom.on('animationcomplete', () => {
            ship.reset();
            ship.alpha = 1;
            boom.destroy();
        });

        //scpre add and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;

        this.sound.play('sfx_explosion');
    }

    shipExplode2(ship) {
        //temporarily hide ship
        ship.alpha = 0;
        //create explosion at ships position
        let boom = this.add.sprite(ship.x, ship.y, 'Explosion2').setOrigin(0, 0);
        boom.anims.play('explode');
        boom.on('animationcomplete', () => {
            ship.reset();
            ship.alpha = 1;
            boom.destroy();
        });

        //scpre add and repaint
        this.p2Score += ship.points;
        this.scoreRight.text = this.p2Score;

        this.sound.play('sfx_explosion');
    }
}